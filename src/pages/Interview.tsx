import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Mic, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Interview = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [application, setApplication] = useState<any>(null);
    const [recording, setRecording] = useState(false);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    // Get ID from session
    const applicationId = sessionStorage.getItem('candidateId');

    const QUESTIONS = [
        "Tell us about yourself and your background.",
        "What are your greatest professional strengths?",
        "Describe a challenging situation you faced and how you handled it.",
        "What is your biggest weakness and how are you working on it?",
        "Where do you see yourself in 5 years?",
        "Why do you want to work for RootedAI?",
        "Do you have any questions for us?"
    ];

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60); // 1 minute per question

    useEffect(() => {
        if (!applicationId) {
            navigate('/candidate-login');
            return;
        }
        fetchApplication();
    }, [applicationId]);

    // Timer Logic
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (recording && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && recording) {
            stopRecording();
        }
        return () => clearInterval(interval);
    }, [recording, timeLeft]);

    const fetchApplication = async () => {
        if (!applicationId) return;
        try {
            const { data, error } = await supabase
                .from('applications' as any)
                .select('*, jobs(title)')
                .eq('id', applicationId)
                .single();

            if (error) throw error;
            setApplication(data);
        } catch (error) {
            console.error("Error fetching application:", error);
            toast({
                title: "Error",
                description: "Failed to load interview details.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                setAudioUrl(URL.createObjectURL(blob));
            };

            mediaRecorderRef.current.start();
            setRecording(true);
            setTimeLeft(60); // Reset timer
        } catch (error) {
            console.error("Error accessing microphone:", error);
            toast({
                title: "Error",
                description: "Could not access microphone. Please check permissions.",
                variant: "destructive",
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && recording) {
            mediaRecorderRef.current.stop();
            setRecording(false);
            // Stop all tracks
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleNext = async () => {
        if (!audioBlob) return;
        setSubmitting(true);

        try {
            // Upload Audio
            const fileName = `${applicationId}/${Date.now()}_q${currentQuestionIndex + 1}.webm`;
            const { error: uploadError } = await supabase.storage
                .from('interview-recordings')
                .upload(fileName, audioBlob);

            if (uploadError) throw uploadError;

            // Save to Database
            const { data, error: dbError } = await supabase
                .from('interviews' as any)
                .insert({
                    application_id: applicationId,
                    question: QUESTIONS[currentQuestionIndex],
                    audio_url: fileName,
                    ai_score: 0, // Initial score, will be updated by AI
                    ai_feedback: "AI analysis pending..."
                })
                .select()
                .single();

            if (dbError) throw dbError;

            // Trigger AI Analysis
            supabase.functions.invoke('analyze-interview', {
                body: {
                    interviewId: (data as any).id,
                    audioUrl: fileName,
                    question: QUESTIONS[currentQuestionIndex]
                }
            });

            if (dbError) throw dbError;

            toast({
                title: "Answer Saved",
                description: "Proceeding to next question...",
            });

            // Reset for next question
            setAudioBlob(null);
            setAudioUrl(null);

            if (currentQuestionIndex < QUESTIONS.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setTimeLeft(60);
            } else {
                // Finished
                toast({
                    title: "Assessment Complete",
                    description: "Thank you for completing the interview!",
                });
                // Update application status
                await supabase.from('applications' as any).update({ status: 'Communication Round Completed' }).eq('id', applicationId);
                navigate('/'); // Or a success page
            }

        } catch (error: any) {
            console.error("Error saving answer:", error);
            toast({
                title: "Error",
                description: "Failed to save answer. Please try again.",
                variant: "destructive",
            });
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        );
    }

    if (!application) return null;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Monochrome Background Effect */}
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="z-10 w-full max-w-2xl space-y-8">
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs tracking-widest uppercase text-white/60 mb-4">
                        Communication Assessment
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight">Question {currentQuestionIndex + 1} of {QUESTIONS.length}</h1>
                    <div className="h-1 w-full bg-white/10 rounded-full mt-6 overflow-hidden">
                        <div
                            className="h-full bg-white transition-all duration-500 ease-out"
                            style={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Question Card */}
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardContent className="p-8 text-center space-y-8">
                        <div className="space-y-4">
                            <h2 className="text-2xl font-medium leading-relaxed">
                                "{QUESTIONS[currentQuestionIndex]}"
                            </h2>
                            <p className="text-white/40 text-sm">
                                Please record your answer. You have 60 seconds.
                            </p>
                        </div>

                        {/* Timer & Visualizer Placeholder */}
                        <div className="flex justify-center items-center h-24">
                            {recording ? (
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 justify-center">
                                        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                                        <span className="font-mono text-2xl font-bold">{formatTime(timeLeft)}</span>
                                    </div>
                                    <div className="flex gap-1 items-end h-8 justify-center">
                                        {[...Array(5)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="w-1 bg-white/60 animate-bounce"
                                                style={{
                                                    height: `${Math.random() * 100}%`,
                                                    animationDelay: `${i * 0.1}s`
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ) : audioUrl ? (
                                <audio controls src={audioUrl} className="w-full max-w-md" />
                            ) : (
                                <div className="text-white/20 font-mono text-xl">01:00</div>
                            )}
                        </div>

                        {/* Controls */}
                        <div className="flex justify-center gap-4">
                            {!recording && !audioUrl && (
                                <Button
                                    size="lg"
                                    className="bg-white text-black hover:bg-white/90 rounded-full px-8"
                                    onClick={startRecording}
                                >
                                    <Mic className="w-4 h-4 mr-2" />
                                    Start Recording
                                </Button>
                            )}

                            {recording && (
                                <Button
                                    size="lg"
                                    variant="destructive"
                                    className="rounded-full px-8"
                                    onClick={stopRecording}
                                >
                                    <Square className="w-4 h-4 mr-2" />
                                    Stop Recording
                                </Button>
                            )}

                            {audioUrl && (
                                <div className="flex gap-4">
                                    <Button
                                        variant="outline"
                                        className="border-white/20 hover:bg-white/10 text-white rounded-full"
                                        onClick={() => {
                                            setAudioUrl(null);
                                            setAudioBlob(null);
                                        }}
                                    >
                                        Retake
                                    </Button>
                                    <Button
                                        className="bg-white text-black hover:bg-white/90 rounded-full px-8"
                                        onClick={handleNext}
                                        disabled={submitting}
                                    >
                                        {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : (currentQuestionIndex === QUESTIONS.length - 1 ? "Submit Assessment" : "Next Question")}
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Interview;
