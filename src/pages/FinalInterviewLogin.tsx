
import React, { useState } from 'react';
import { useNavigate } from 'next/link';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

const FinalInterviewLogin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [passcode, setPasscode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://gtxbxdgnfpaxwxrgcrgz.supabase.co/functions/v1/login-candidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, passcode })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login Failed');
            }

            if (data.token) {
                // Success - Redirect to Interview Room
                navigate(`/final-interview?token=${data.token}`);
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl animate-pulse delay-700"></div>

            <div className="relative z-10 w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-3xl shadow-2xl">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mx-auto flex items-center justify-center mb-4 shadow-lg shadow-blue-500/20">
                        <Lock className="text-white w-8 h-8" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight mb-2">Secure Interview Access</h1>
                    <p className="text-zinc-400 text-sm">Please enter the credentials sent to your email.</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm mb-6 flex items-start gap-3">
                        <AlertCircle size={18} className="mt-0.5 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Login ID (Email)</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-blue-400 transition-colors" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-700 text-white rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all"
                                placeholder="name@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider ml-1">Access Passcode</label>
                        <div className="relative group">
                            <Lock className="absolute left-4 top-3.5 text-zinc-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                            <input
                                type="text"
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                className="w-full bg-zinc-950/50 border border-zinc-700 text-white rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 outline-none transition-all font-mono tracking-wider"
                                placeholder="XXXXXXXX"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-white/10 flex items-center justify-center gap-2 mt-2 disabled:opacity-50 disabled:scale-100"
                    >
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <>
                                Enter Interview Room <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="text-xs text-zinc-500">
                        Protected by RootedAI Security. Attempts are logged.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FinalInterviewLogin;
