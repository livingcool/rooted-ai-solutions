import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Webcam from 'react-webcam';
import { Mic, MicOff, Video, VideoOff, Send, MessageSquare } from 'lucide-react';

const AIInterviewRoom = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState('Checking permissions...');
    const [isRecording, setIsRecording] = useState(false);
    const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([]);
    const [aiThinking, setAiThinking] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const webcamRef = useRef<Webcam>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);

    useEffect(() => {
        if (!token) {
            setStatus("Invalid Interview Token.");
            return;
        }
        setStatus("Ready. Click 'Start Answer' to speak.");

        // Initial Greeting
        setMessages([{ role: 'ai', text: "Hello! I'm the AI Founder. I've reviewed your project. I'd like to ask you a few questions about your technical choices. When you're ready, please start recording your answer." }]);
    }, [token]);

    const startRecording = () => {
        setStatus("Recording...");
        setIsRecording(true);
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            mediaRecorder.start();

            const chunks: Blob[] = [];
            mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(chunks, { type: 'audio/webm' });
                handleSubmission(audioBlob);
            };
        });
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
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

            // TTS (Browser Native)
            const utterance = new SpeechSynthesisUtterance(data.reply);
            window.speechSynthesis.speak(utterance);

            if (data.is_interview_complete) {
                setStatus("Interview Complete. Thank you!");
            } else {
                setStatus("Your turn.");
            }

        } catch (error) {
            console.error(error);
            setStatus("Error interacting with AI. Please try again.");
        } finally {
            setAiThinking(false);
        }
    };

    if (!token) return <div className="p-10 text-center text-red-500">Missing Interview Token</div>;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Visuals */}
                <div className="space-y-4">
                    <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-black aspect-video">
                        <Webcam
                            ref={webcamRef}
                            audio={false}
                            screenshotFormat="image/jpeg"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1 rounded text-xs text-green-400 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Live Vision Analysis Active
                        </div>
                    </div>

                    <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 text-center">
                        <div className="text-xl font-semibold mb-2">AI Founder Agent</div>
                        <div className="text-slate-400 text-sm mb-4">Listening & Observing...</div>

                        <div className="flex justify-center gap-4">
                            {!isRecording ? (
                                <button
                                    onClick={startRecording}
                                    disabled={aiThinking}
                                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-full font-medium transition-all disabled:opacity-50"
                                >
                                    <Mic size={20} /> Start Answer
                                </button>
                            ) : (
                                <button
                                    onClick={stopRecording}
                                    className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-6 py-3 rounded-full font-medium animate-pulse transition-all"
                                >
                                    <MicOff size={20} /> Stop & Send
                                </button>
                            )}
                        </div>
                        <p className="mt-4 text-sm text-slate-400">{status}</p>
                    </div>
                </div>

                {/* Chat Log */}
                <div className="bg-slate-800 rounded-xl border border-slate-700 flex flex-col h-[500px]">
                    <div className="p-4 border-b border-slate-700 font-medium flex items-center gap-2">
                        <MessageSquare size={18} className="text-blue-400" /> Interview Transcript
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] p-3 rounded-lg text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {aiThinking && (
                            <div className="flex justify-start">
                                <div className="bg-slate-700 text-slate-400 p-3 rounded-lg text-xs italic animate-pulse">
                                    AI is thinking...
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AIInterviewRoom;
