"use client";

import { motion } from "framer-motion";
import { User, Mail, Key, Globe2, ArrowRight, CheckCircle2, ShieldCheck, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
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
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-widest px-1">Prénom</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
                                    <input
                                        type="text"
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
                                    placeholder="05 55 00 00 00"
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
                            type="button"
                            className="w-full py-5 bg-amber-400 text-gray-900 font-black text-lg rounded-2xl hover:bg-amber-500 shadow-xl shadow-amber-500/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest"
                        >
                            Créer Mon Compte
                            <ArrowRight className="w-6 h-6" />
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
