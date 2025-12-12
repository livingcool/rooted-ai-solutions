import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Mic, MicOff, Video, VideoOff, Send, MessageSquare, Clock, LogOut } from 'lucide-react';

const TOTAL_STAGES_ESTIMATE = 8;
const MAX_ANSWER_TIME = 90; // seconds

const AIInterviewRoom = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('Checking permissions...');
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
    const [aiThinking, setAiThinking] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const [isInterviewComplete, setIsInterviewComplete] = useState(false);

    // Turn Counting (Progress)
    const [turnCount, setTurnCount] = useState(1);

    // Timer
    const [timeLeft, setTimeLeft] = useState(MAX_ANSWER_TIME);

    // Proctoring
    const [tabViolations, setTabViolations] = useState(0);

    // Tab Switch Detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                setTabViolations(prev => prev + 1);
                alert("⚠️ Warning: Please stay on this tab during the interview. Switching tabs is monitored.");
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Preload Voices
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

        // Initial Greeting
        setMessages([{ role: 'ai', text: "Hello! I'm the AI Founder. I've reviewed your project. I'd like to ask you a few questions about your technical choices. When you're ready, please start recording your answer." }]);
    }, [token]);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRecording && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isRecording) {
            stopRecording(); // Auto-stop
        }
        return () => clearInterval(interval);
    }, [isRecording, timeLeft]);

    const startRecording = async () => {
        setStatus("Recording...");
        setIsRecording(true);
        setTimeLeft(MAX_ANSWER_TIME);

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

            // Robust MIME type selection
            const mimeTypes = [
                'audio/webm;codecs=opus',
                'audio/webm',
                'audio/mp4',
                'audio/ogg'
            ];
            const selectedMime = mimeTypes.find(type => MediaRecorder.isTypeSupported(type)) || '';

            const options = selectedMime ? { mimeType: selectedMime } : undefined;
            const mediaRecorder = new MediaRecorder(stream, options);

            mediaRecorderRef.current = mediaRecorder;
            const chunks: Blob[] = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data && e.data.size > 0) {
                    chunks.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const type = selectedMime || 'audio/webm';
                const audioBlob = new Blob(chunks, { type });

                // Stop all tracks to release mic
                stream.getTracks().forEach(track => track.stop());

                if (audioBlob.size > 0) {
                    handleSubmission(audioBlob);
                } else {
                    console.error("Recorded audio is empty");
                    setStatus("Error: No audio recorded. Check microphone.");
                    setIsRecording(false);
                }
            };

            mediaRecorder.start(1000); // Collect in 1s chunks
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

        // Capture Video Frame
        const imageSrc = webcamRef.current?.getScreenshot();

        const formData = new FormData();
        formData.append('interview_token', token || '');
        formData.append('audio', audioBlob, 'recording.webm');
        formData.append('tab_violations', tabViolations.toString()); // Send violations
        if (imageSrc) {
            formData.append('frame', imageSrc); // Send base64 frame
        }

        try {
            const response = await fetch('https://gtxbxdgnfpaxwxrgcrgz.supabase.co/functions/v1/conduct-ai-interview', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "AI Processing Failed");
            }

            const data = await response.json();

            // Add interaction to log
            setMessages(prev => [
                ...prev,
                { role: 'user', text: "(Audio Response)" },
                { role: 'ai', text: data.reply }
            ]);

            setTurnCount(prev => Math.min(prev + 1, TOTAL_STAGES_ESTIMATE));

            // TTS (Browser Native) - Feminine Voice
            const utterance = new SpeechSynthesisUtterance(data.reply);

            // Voice Selection Logic
            const voices = window.speechSynthesis.getVoices();
            const feminineVoice = voices.find(v =>
                v.name.includes("Zira") ||
                v.name.includes("Google US English") ||
                v.name.includes("Samantha") ||
                v.name.toLowerCase().includes("female")
            );

            if (feminineVoice) {
                utterance.voice = feminineVoice;
                // Optional: Adjust pitch/rate for more natural feminine tone if needed
                utterance.pitch = 1.0;
                utterance.rate = 1.0;
            }

            window.speechSynthesis.speak(utterance);

            if (data.is_interview_complete) {
                setStatus("Interview Complete. Thank you!");
                setIsInterviewComplete(true);
            } else {
                setStatus("Your turn.");
            }

            if (data.is_face_detected === false) {
                // Enhanced Debug Warning
                console.warn(`Vision Info: ${data.vision_analysis || "No info"}`);
                setStatus("⚠️ Warning: Face not detected. Adjust camera.");
            }

        } catch (error: any) {
            console.error(error);
            setStatus(`Error: ${error.message || "Unknown error"}`);
        } finally {
            setAiThinking(false);
        }
    };

    const progressPercentage = Math.min((turnCount / TOTAL_STAGES_ESTIMATE) * 100, 100);

    const finishEarly = async () => {
        if (confirm("Are you sure you want to end the interview now? We will generate your final evaluation based on the current progress.")) {
            setStatus("Generating final evaluation...");
            setAiThinking(true);

            // Create empty blob or send dummy data if no recording actively happened?
            // handleSubmission expects a blob.
            // We can send an empty blob, but we need to append 'force_end' to formData manually.
            // Let's modify handleSubmission to take optional forceEnd flag or duplicate logic here.
            // Better: update handleSubmission to accept 'forceEnd' boolean.

            // Actually, cleanest way is to just call backend here similar to handleSubmission but with specific flag

            const formData = new FormData();
            formData.append('interview_token', token || '');
            formData.append('force_end', 'true');
            formData.append('tab_violations', tabViolations.toString());
            // No audio, no video frame needed for forced end (or take one if possible)

            try {
                const response = await fetch('https://gtxbxdgnfpaxwxrgcrgz.supabase.co/functions/v1/conduct-ai-interview', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();
                if (data.evaluation) {
                    // Successfully analyzed
                    setStatus("Interview Complete. Redirecting...");
                    setTimeout(() => window.location.href = '/', 2000);
                } else {
                    // Fallback
                    window.location.href = '/';
                }
            } catch (e) {
                console.error("Forced end failed", e);
                window.location.href = '/';
            }
        }
    };

    // Auto-scroll ref
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, aiThinking]);

    if (!token) return <div className="p-10 text-center text-red-500">Missing Interview Token</div>;

    return (
        <div className="h-screen bg-black text-white flex flex-col font-sans overflow-hidden">
            {/* Header */}
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

            {/* Progress Bar */}
            <div className="w-full bg-zinc-900 h-1 shrink-0">
                <div
                    className="bg-white h-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                ></div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row p-6 gap-6 max-w-7xl mx-auto w-full overflow-hidden">

                {/* Left Column: AI Avatar & Controls */}
                <div className="flex-1 flex flex-col gap-6 h-full overflow-y-auto hidden-scrollbar">
                    {/* Video Feed */}
                    <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl aspect-video group shrink-0">
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        />
                        <div className="absolute top-4 left-4 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-xs text-white flex items-center gap-2 border border-white/10">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Vision Active
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="bg-zinc-900/80 p-8 rounded-2xl border border-zinc-800 flex flex-col items-center justify-center gap-4 shadow-xl backdrop-blur-sm relative overflow-hidden shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>

                        <div className="text-center z-10">
                            <h2 className="text-2xl font-bold text-white mb-1">AI Founder Agent</h2>
                            <p className="text-zinc-400 text-sm">{status}</p>
                            {tabViolations > 0 && <p className="text-red-500 text-xs mt-1">⚠️ Tab Switch Violations: {tabViolations}</p>}
                        </div>

                        <div className="flex items-center gap-6 z-10 w-full justify-center mt-2">
                            {!isInterviewComplete ? (
                                !isRecording ? (
                                    <button
                                        onClick={startRecording}
                                        disabled={aiThinking}
                                        className="flex items-center gap-3 bg-white text-black hover:bg-zinc-200 px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-white/10 disabled:opacity-50 disabled:scale-100"
                                    >
                                        <Mic size={24} />
                                        {aiThinking ? "Analyzing..." : "Start Answer"}
                                    </button>
                                ) : (
                                    <div className="flex flex-col items-center gap-4">
                                        {/* Listening Animation */}
                                        <div className="flex items-center gap-1 h-8">
                                            {[...Array(5)].map((_, i) => (
                                                <div key={i} className="w-2 bg-red-500 rounded-full animate-voice-wave" style={{ animationDelay: `${i * 0.1}s`, height: '100%' }}></div>
                                            ))}
                                        </div>

                                        <button
                                            onClick={stopRecording}
                                            className="flex items-center gap-3 bg-red-600 hover:bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-red-500/20"
                                        >
                                            <MicOff size={24} /> Stop & Send
                                        </button>
                                        <div className="flex items-center gap-2 text-red-400 font-mono text-sm">
                                            <Clock size={14} />
                                            {timeLeft}s
                                        </div>
                                    </div>
                                )
                            ) : (
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="flex items-center gap-3 bg-green-500 hover:bg-green-400 text-black px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-green-500/20 animate-bounce"
                                >
                                    <Send size={24} /> Assessment Complete
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Transcript */}
                <div className="w-full md:w-[400px] bg-zinc-900/80 rounded-2xl border border-zinc-800 flex flex-col shadow-xl backdrop-blur-sm h-[600px] md:h-full overflow-hidden">
                    <div className="p-4 border-b border-zinc-800 font-medium flex items-center justify-between text-zinc-300 bg-zinc-900/50 rounded-t-2xl shrink-0">
                        <div className="flex items-center gap-2">
                            <MessageSquare size={18} /> Transcript
                        </div>
                        <span className="text-xs text-zinc-500">Turn {turnCount}/{TOTAL_STAGES_ESTIMATE}</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                                <span className="text-xs text-zinc-500 mb-1 px-1">
                                    {msg.role === 'user' ? 'You' : 'AI Agent'}
                                </span>
                                <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user'
                                    ? 'bg-blue-600/20 text-blue-100 border border-blue-500/30 rounded-br-none'
                                    : 'bg-zinc-800 text-zinc-300 border border-zinc-700 rounded-bl-none'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {aiThinking && (
                            <div className="flex justify-start">
                                <div className="bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 px-4 py-2 rounded-full text-xs flex items-center gap-2">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-0"></div>
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-100"></div>
                                        <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce delay-200"></div>
                                    </div>
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
};

export default AIInterviewRoom;
