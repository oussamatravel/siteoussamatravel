"use client";

import { motion } from "framer-motion";
import { User, Mail, Key, ArrowRight, CheckCircle2, ShieldCheck, Phone, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Validation côté client : force du mot de passe
        if (password.length < 8) {
            setError("Le mot de passe doit contenir au moins 8 caractères.");
            setLoading(false);
            return;
        }
        if (!/[A-Z]/.test(password)) {
            setError("Le mot de passe doit contenir au moins une lettre majuscule.");
            setLoading(false);
            return;
        }
        if (!/[0-9]/.test(password)) {
            setError("Le mot de passe doit contenir au moins un chiffre.");
            setLoading(false);
            return;
        }

        // Validation nom/prénom
        if (firstName.trim().length < 2 || lastName.trim().length < 2) {
            setError("Veuillez entrer un prénom et un nom valides.");
            setLoading(false);
            return;
        }

        const getURL = () => {
            let url =
                process?.env?.NEXT_PUBLIC_SITE_URL ??
                process?.env?.NEXT_PUBLIC_VERCEL_URL ??
                'https://www.oussamatravel.com';

            url = url.includes('http') ? url : `https://${url}`;
            url = url.endsWith('/') ? url : `${url}/`;
            return url;
        };

        try {
            const { error: signUpError } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        first_name: firstName.trim(),
                        last_name: lastName.trim(),
                        phone: phone.trim(),
                    },
                    emailRedirectTo: `${getURL()}auth/callback`,
                },
            });

            if (signUpError) {
                // Ne pas exposer les détails techniques - messages génériques
                if (signUpError.message.includes('already registered') || signUpError.message.includes('already exists')) {
                    throw new Error("Un compte avec cet email existe déjà. Veuillez vous connecter.");
                }
                throw new Error("Inscription impossible. Veuillez vérifier vos informations et réessayer.");
            }

            alert("Compte créé avec succès ! Veuillez vérifier votre boîte email pour valider votre inscription.");
            router.push("/auth/login");
        } catch (err: any) {
            setError(err.message || "Une erreur est survenue lors de l'inscription.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-[540px] z-10"
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
                    <h1 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Rejoignez-nous</h1>
                    <p className="text-gray-500 font-medium tracking-tight">Créez votre compte pour lancer vos premières démarches d'immigration et d'études.</p>
                </div>

                <div className="bg-white border border-slate-100 p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-blue-500/5 mb-8">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 shrink-0" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest px-1">Prénom</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="Prénom"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all font-medium text-gray-900"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest px-1">Nom</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                                    <input
                                        type="text"
                                        required
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Nom"
                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all font-medium text-gray-900"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest px-1">Email Personnel</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="votre@email.com"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest px-1">Téléphone Mobile (+213...)</label>
                            <div className="relative group">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                                <input
                                    type="tel"
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="05 55 00 00 00"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest px-1">Choisir un Mot de passe</label>
                            <div className="relative group">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500/50 transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="pt-4 space-y-3">
                            <div className="flex items-center gap-3 px-1 text-xs text-gray-500 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                J'accepte les conditions d'utilisation et la politique de données.
                            </div>
                            <div className="flex items-center gap-3 px-1 text-xs text-gray-500 font-medium">
                                <ShieldCheck className="w-4 h-4 text-sky-500" />
                                Mes documents d'identité seront chiffrés et protégés.
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-amber-400 text-gray-900 font-black text-lg rounded-2xl hover:bg-amber-500 shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>
                                    Créer Mon Compte
                                    <ArrowRight className="w-6 h-6" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="text-center font-bold text-gray-500 tracking-tight">
                    Vous avez déjà un compte ?
                    <Link href="/auth/login" className="ml-2 text-sky-600 hover:text-sky-700 font-extrabold underline underline-offset-4 tracking-tighter">Connectez-vous ici</Link>
                </div>

                <div className="mt-10 text-center text-xs font-bold text-slate-300 uppercase tracking-[0.2em]">
                    Oussama Travel • 2024
                </div>
            </motion.div>
        </div>
    );
}
