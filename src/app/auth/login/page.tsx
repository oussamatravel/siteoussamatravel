"use client";

import { motion } from "framer-motion";
import { Mail, Key, ArrowRight, Chrome, ShieldCheck, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: loginError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (loginError) throw loginError;

            router.push("/dashboard");
            router.refresh(); // Pour forcer la mise à jour des Server Components
        } catch (err: any) {
            setError(err.message || "Identifiants invalides ou erreur de connexion.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[480px] z-10"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 mb-8">
                        <img
                            src="/logo.png"
                            alt="Oussama Travel Logo"
                            className="h-16 w-auto object-contain"
                            style={{ minWidth: '180px' }}
                        />
                    </Link>
                    <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Espace Client</h1>
                    <p className="text-gray-500 font-medium tracking-tight">Veuillez vous authentifier pour accéder à vos dossiers.</p>
                </div>

                <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 mb-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest px-1">Email Personnel</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500/50 transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-bold text-gray-700 uppercase tracking-widest px-1">Mot de passe</label>
                                <Link href="#" className="text-xs font-bold text-sky-600 hover:text-sky-700 uppercase tracking-widest">Oublié ?</Link>
                            </div>
                            <div className="relative group">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-sky-500 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500/50 transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-sky-600 text-white font-black text-lg rounded-2xl hover:bg-sky-700 shadow-xl shadow-sky-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Connexion
                                    <ArrowRight className="w-6 h-6" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-10 flex items-center justify-center">
                        <div className="absolute inset-x-0 h-px bg-slate-100"></div>
                        <span className="relative z-10 bg-white px-4 text-xs font-black text-slate-300 uppercase tracking-widest">Ou continuer avec</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-3 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm tracking-wide text-gray-700 hover:bg-slate-100 transition-all">
                            <Chrome className="w-5 h-5 text-red-500" />
                            Google
                        </button>
                        <button className="flex items-center justify-center gap-3 py-4 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm tracking-wide text-gray-700 hover:bg-slate-100 transition-all">
                            <ShieldCheck className="w-5 h-5 text-sky-600" />
                            Face ID
                        </button>
                    </div>
                </div>

                <div className="text-center font-bold text-gray-500 tracking-tight">
                    Vous n'avez pas encore de compte ?
                    <Link href="/auth/register" className="ml-2 text-amber-500 hover:text-amber-600 font-extrabold underline underline-offset-4">Inscrivez-vous ici</Link>
                </div>
            </motion.div>
        </div>
    );
}
