import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, XCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const CandidateStatus = () => {
    const navigate = useNavigate();
    const [application, setApplication] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const applicationId = sessionStorage.getItem('candidateId');

    useEffect(() => {
        if (!applicationId) {
            navigate('/candidate-login');
            return;
        }
        fetchStatus();
    }, [applicationId]);

    const fetchStatus = async () => {
        try {
            const { data, error } = await supabase
                .from('applications')
                .select('*, jobs(title)')
                .eq('id', applicationId)
                .single();

            if (error) throw error;
            setApplication(data);
        } catch (error) {
            console.error("Error fetching status:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
    }

    if (!application) return null;

    const getStatusContent = () => {
        switch (application.status) {
            case 'Communication Round Completed':
                return {
                    icon: <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />,
                    title: "Communication Assessment Complete",
                    description: "Thank you for completing the communication round. Our team will review your submission and notify you about the next steps via email.",
                    color: "text-green-500"
                };
            case 'Technical Round':
                return {
                    icon: <Clock className="w-16 h-16 text-blue-500 mb-4" />,
                    title: "Technical Round Invitation",
                    description: "You have been invited to the Technical Round. Please proceed to the assessment.",
                    action: (
                        <Button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/technical-assessment')}>
                            Start Technical Assessment
                        </Button>
                    )
                };
            case 'Technical Round Completed':
                return {
                    icon: <CheckCircle2 className="w-16 h-16 text-green-500 mb-4" />,
                    title: "Technical Assessment Submitted",
                    description: "Your technical submission has been received. We are currently reviewing your code and video presentation. You will hear from us soon!",
                    color: "text-green-500"
                };
            case 'Final Interview':
                return {
                    icon: <CheckCircle2 className="w-16 h-16 text-purple-500 mb-4" />,
                    title: "Congratulations!",
                    description: "You have been selected for the Final Interview. Check your email for scheduling details.",
                    color: "text-purple-500"
                };
            case 'Rejected':
                return {
                    icon: <XCircle className="w-16 h-16 text-red-500 mb-4" />,
                    title: "Application Status",
                    description: "Thank you for your interest in RootedAI. Unfortunately, we have decided not to proceed with your application at this time.",
                    color: "text-red-500"
                };
            default:
                return {
                    icon: <Clock className="w-16 h-16 text-white/40 mb-4" />,
                    title: "Application Under Review",
                    description: `Current Status: ${application.status}`,
                    color: "text-white"
                };
        }
    };

    const content = getStatusContent();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="z-10 w-full max-w-md text-center">
                <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs tracking-widest uppercase text-white/60 mb-8">
                    {application.jobs?.title}
                </div>

                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                    <CardContent className="p-8 flex flex-col items-center">
                        {content.icon}
                        <h2 className="text-2xl font-bold mb-4">{content.title}</h2>
                        <p className="text-white/60 leading-relaxed">
                            {content.description}
                        </p>
                        {content.action}
                    </CardContent>
                </Card>

                <Button variant="link" className="mt-8 text-white/40 hover:text-white" onClick={() => {
                    sessionStorage.removeItem('candidateId');
                    navigate('/');
                }}>
                    Back to Home
                </Button>
            </div>
        </div>
    );
};

export default CandidateStatus;
