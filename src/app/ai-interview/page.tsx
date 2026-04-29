'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Webcam from 'react-webcam';
import { Mic, MicOff, Video, VideoOff, Send, MessageSquare, Clock, LogOut } from 'lucide-react';

function AIInterviewContent() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('Checking permissions...');
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
    const [aiThinking, setAiThinking] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const [isInterviewComplete, setIsInterviewComplete] = useState(false);
    const [turnCount, setTurnCount] = useState(1);
    const [timeLeft, setTimeLeft] = useState(90);
    const [tabViolations, setTabViolations] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const TOTAL_STAGES_ESTIMATE = 8;
    const MAX_ANSWER_TIME = 90;

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabViolations(prev => prev + 1);
                alert("⚠️ Warning: Please stay on this tab during the interview. Switching tabs is monitored.");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        const loadVoices = () => {
            window.speechSynthesis.getVoices();
        };
        loadVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }

        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    useEffect(() => {
        if (!token) {
            setStatus("Invalid Interview Token.");
            return;
        }
        setStatus("Ready. Click 'Start Answer' to speak.");
        setMessages([{ role: 'ai', text: "Hello! I'm the AI Founder. I've reviewed your project. I'd like to ask you a few questions about your technical choices. When you're ready, please start recording your answer." }]);
    }, [token]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRecording) {
            stopRecording();
        }
        return () => clearInterval(interval);
    }, [isRecording, timeLeft]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, aiThinking]);

    const startRecording = async () => {
        setStatus("Recording...");
        setIsRecording(true);
        setTimeLeft(MAX_ANSWER_TIME);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg'];
            const selectedMime = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || '';
            const options = selectedMime ? { mimeType: selectedMime } : undefined;
            const mediaRecorder = new MediaRecorder(stream, options);

            mediaRecorderRef.current = mediaRecorder;
            const chunks: Blob[] = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) chunks.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const type = selectedMime || 'audio/webm';
                const audioBlob = new Blob(chunks, { type });
                stream.getTracks().forEach(track => track.stop());

                if (audioBlob.size > 0) {
                    handleSubmission(audioBlob);
                } else {
                    setStatus("Error: No audio recorded. Check microphone.");
                    setIsRecording(false);
                }
            };

            mediaRecorder.start(1000);
        } catch (err) {
            console.error("Mic Error:", err);
            setStatus("Error: Could not access microphone.");
            setIsRecording(false);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            setStatus("Processing...");
        }
    };

    const handleSubmission = async (audioBlob: Blob) => {
        setAiThinking(true);
        const imageSrc = webcamRef.current?.getScreenshot();

        const formData = new FormData();
        formData.append('interview_token', token || '');
        formData.append('audio', audioBlob, 'recording.webm');
        formData.append('tab_violations', tabViolations.toString());
        if (imageSrc) formData.append('frame', imageSrc);

        try {
            const response = await fetch('https://gtxbxdgnfpaxwxrgcrgz.supabase.co/functions/v1/conduct-ai-interview', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) throw new Error("AI Processing Failed");

            const data = await response.json();
            setMessages(prev => [
                ...prev,
                { role: 'user', text: "(Audio Response)" },
                { role: 'ai', text: data.reply }
            ]);

            setTurnCount(prev => Math.min(prev + 1, TOTAL_STAGES_ESTIMATE));

            const utterance = new SpeechSynthesisUtterance(data.reply);
            const voices = window.speechSynthesis.getVoices();
            const feminineVoice = voices.find(v => v.name.includes("Zira") || v.name.includes("Google US English") || v.name.includes("Samantha"));
            if (feminineVoice) utterance.voice = feminineVoice;
            window.speechSynthesis.speak(utterance);

            if (data.is_interview_complete) {
                setStatus("Interview Complete. Thank you!");
                setIsInterviewComplete(true);
            } else {
                setStatus("Your turn.");
            }
        } catch (error: any) {
            setStatus(`Error: ${error.message || "Unknown error"}`);
        } finally {
            setAiThinking(false);
        }
    };

    const finishEarly = async () => {
        if (confirm("Are you sure you want to end the interview now?")) {
            setStatus("Generating final evaluation...");
            setAiThinking(true);
            const formData = new FormData();
            formData.append('interview_token', token || '');
            formData.append('force_end', 'true');
            formData.append('tab_violations', tabViolations.toString());

            try {
                await fetch('https://gtxbxdgnfpaxwxrgcrgz.supabase.co/functions/v1/conduct-ai-interview', {
                    method: 'POST',
                    body: formData
                });
                window.location.href = '/';
            } catch (e) {
                window.location.href = '/';
            }
        }
    };

    const progressPercentage = Math.min((turnCount / TOTAL_STAGES_ESTIMATE) * 100, 100);

    return (
        <div className="h-screen bg-black text-white flex flex-col font-sans overflow-hidden">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50 backdrop-blur shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-black rounded-full" />
                    </div>
                    <span className="font-semibold text-lg tracking-tight">RootedAI Interview</span>
                </div>
                <button onClick={finishEarly} className="text-zinc-400 hover:text-white flex items-center gap-2 text-sm transition-colors">
                    <LogOut size={16} /> Exit / Submit Early
                </button>
            </div>

            <div className="w-full bg-zinc-900 h-1 shrink-0">
                <div className="bg-white h-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 max-w-7xl mx-auto w-full overflow-hidden">
                <div className="flex-1 flex flex-col gap-6 h-full overflow-y-auto">
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl aspect-video group shrink-0">
                        <Webcam ref={webcamRef} audio={false} screenshotFormat="image/jpeg" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs text-white flex items-center gap-2 border border-white/10">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Vision Active
                        </div>
                    </div>

                    <div className="bg-zinc-900/80 p-8 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center gap-4 shadow-xl backdrop-blur-sm relative overflow-hidden shrink-0">
                        <div className="text-center z-10">
                            <h2 className="text-2xl font-bold text-white mb-1">AI Founder Agent</h2>
                            <p className="text-zinc-400 text-sm">{status}</p>
                            {tabViolations > 0 && <p className="text-red-500 text-xs mt-1">⚠️ Tab Switch Violations: {tabViolations}</p>}
                        </div>

                        <div className="flex items-center gap-6 z-10 w-full justify-center mt-2">
                            {!isInterviewComplete ? (
                                !isRecording ? (
                                    <button onClick={startRecording} disabled={aiThinking} className="flex items-center gap-3 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-white/10 disabled:opacity-50 disabled:scale-100">
                                        <Mic size={24} /> {aiThinking ? "Analyzing..." : "Start Answer"}
                                    </button>
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                        <button onClick={stopRecording} className="flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/20">
                                            <MicOff size={24} /> Stop & Send
                                        </button>
                                        <div className="flex items-center gap-2 text-red-400 font-mono text-sm">
                                            <Clock size={14} /> {timeLeft}s
                                        </div>
                                    </div>
                                )
                            ) : (
                                <button onClick={() => window.location.href = '/'} className="flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/20 animate-bounce">
                                    Assessment Complete
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[400px] bg-zinc-900/80 rounded-2xl border border-zinc-800 flex flex-col shadow-xl backdrop-blur-sm h-[600px] md:h-full overflow-hidden">
                    <div className="p-4 border-b border-zinc-800 font-medium flex items-center justify-between text-zinc-300 bg-zinc-900/50 rounded-t-2xl shrink-0">
                        <div className="flex items-center gap-2">
                            <MessageSquare size={18} /> Transcript
                        </div>
                        <span className="text-xs text-zinc-500">Turn {turnCount}/{TOTAL_STAGES_ESTIMATE}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                                <span className="text-xs text-zinc-500 mb-1 px-1">{msg.role === 'user' ? 'You' : 'AI Agent'}</span>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30 rounded-br-none' : 'bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-bl-none'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {aiThinking && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 px-4 py-2 rounded-full text-xs flex items-center gap-2">
                                    AI is processing...
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function AIInterviewPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AIInterviewContent />
        </Suspense>
    );
}
