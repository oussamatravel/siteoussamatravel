"use client";

import { motion } from "framer-motion";
import {
    CalendarDays,
    CheckCircle2,
    ArrowRight,
    Globe2,
    Zap,
    ShieldCheck,
    Clock,
    FileText,
} from "lucide-react";
import Link from "next/link";

export default function Tourisme() {
    return (
        <div className="min-h-screen bg-slate-950 font-sans">

            {/* ─── Hero ─── */}
            <section className="relative pt-48 pb-40 px-4 overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-25"
                        alt="Travel background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950" />
                    {/* Glow blobs */}
                    <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-sky-500/10 blur-[120px] rounded-full" />
                    <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-5xl mx-auto relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md text-sky-300 text-xs font-black uppercase tracking-widest mb-8 border border-white/15"
                    >
                        <Globe2 className="w-3.5 h-3.5" />
                        Oussama Travel · Béjaïa · 23 ans d&apos;expertise
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.88] mb-8"
                    >
                        Voyagez{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200 italic">
                            Sans Limites.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-14 font-medium leading-relaxed"
                    >
                        Visas électroniques express ou dossiers consulaires complets.
                        Choisissez votre service, nous faisons le reste.
                    </motion.p>

                    {/* Stats bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-wrap justify-center gap-8"
                    >
                        {[
                            { val: "22", label: "Destinations E-Visa" },
                            { val: "24", label: "Pays RDV Visa" },
                            { val: "24h", label: "Traitement Express" },
                            { val: "100%", label: "Service en ligne" },
                        ].map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl font-black text-white">{s.val}</div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ─── 2 Services ─── */}
            <section className="py-24 px-4">
                <div className="max-w-7xl mx-auto">

                    {/* Section title */}
                    <div className="text-center mb-16">
                        <p className="text-[10px] font-black text-sky-400 uppercase tracking-[0.3em] mb-4">Nos Services</p>
                        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                            Deux solutions, <span className="text-amber-400 italic">zéro stress.</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* ── Service 1 : E-Visa ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="relative rounded-[3rem] overflow-hidden group"
                        >
                            {/* BG image */}
                            <img
                                src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=900&auto=format&fit=crop"
                                alt="E-Visa"
                                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-sky-900 via-slate-900/95 to-slate-950" />

                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-sky-400/15 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                            <div className="relative z-10 p-10 md:p-14 flex flex-col h-full min-h-[550px]">
                                {/* Badge */}
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-sky-500/20 border border-sky-400/30 rounded-full">
                                        <Zap className="w-3.5 h-3.5 text-sky-400" />
                                        <span className="text-sky-300 text-xs font-black uppercase tracking-widest">Service Express</span>
                                    </div>
                                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs font-black uppercase tracking-widest">
                                        100% En ligne
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Globe2 className="w-8 h-8 text-sky-400" />
                                </div>

                                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter leading-tight">
                                    Visas Électroniques<br />&amp; Résidences
                                </h3>
                                <p className="text-slate-400 font-medium leading-relaxed mb-8 text-lg">
                                    Envoyez vos documents, récupérez votre visa. Nous traitons les e-visas pour 22 destinations dont certaines en seulement 24h ouvrables.
                                </p>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-3 mb-10">
                                    {[
                                        { icon: <Zap className="w-4 h-4" />, label: "Certains en 24h" },
                                        { icon: <Globe2 className="w-4 h-4" />, label: "22 destinations" },
                                        { icon: <FileText className="w-4 h-4" />, label: "Dossier simplifié" },
                                        { icon: <ShieldCheck className="w-4 h-4" />, label: "100% sécurisé" },
                                    ].map((f, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-sm font-bold text-slate-300 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
                                            <span className="text-sky-400">{f.icon}</span>
                                            {f.label}
                                        </div>
                                    ))}
                                </div>

                                {/* Countries preview */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {["🇹🇭 Thaïlande", "🇹🇷 Turquie", "🇪🇬 Égypte", "🇶🇦 Qatar", "🇸🇦 Arabie Saoudite", "🇨🇳 Chine"].map((c, i) => (
                                        <span key={i} className="text-xs font-bold text-sky-300 bg-sky-500/10 border border-sky-500/20 px-3 py-1.5 rounded-full">
                                            {c}
                                        </span>
                                    ))}
                                    <span className="text-xs font-bold text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                        + 16 autres...
                                    </span>
                                </div>

                                <div className="mt-auto">
                                    <Link href="/tourisme/evisa">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex items-center gap-3 px-8 py-4 bg-sky-500 hover:bg-sky-400 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all shadow-lg shadow-sky-500/20"
                                        >
                                            Voir les 22 destinations
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                        {/* ── Service 2 : RDV Visa ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="relative rounded-[3rem] overflow-hidden group"
                        >
                            {/* BG image */}
                            <img
                                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=900&auto=format&fit=crop"
                                alt="RDV Visa"
                                className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-900/80 via-slate-900/95 to-slate-950" />

                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/15 blur-[80px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />

                            <div className="relative z-10 p-10 md:p-14 flex flex-col h-full min-h-[550px]">
                                {/* Badge */}
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-400/30 rounded-full">
                                        <CalendarDays className="w-3.5 h-3.5 text-amber-400" />
                                        <span className="text-amber-300 text-xs font-black uppercase tracking-widest">Dossier Clé en Main</span>
                                    </div>
                                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-white/50 text-xs font-black uppercase tracking-widest">
                                        VFS · TLS
                                    </div>
                                </div>

                                {/* Icon */}
                                <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <CalendarDays className="w-8 h-8 text-amber-400" />
                                </div>

                                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter leading-tight">
                                    RDV Visa &amp;<br />Traitement
                                </h3>
                                <p className="text-slate-400 font-medium leading-relaxed mb-8 text-lg">
                                    De la prise de rendez-vous VFS/TLS jusqu'au dossier complet, nous gérons tout pour vos visas Schengen, USA, Canada et UK.
                                </p>

                                {/* Features */}
                                <div className="grid grid-cols-2 gap-3 mb-10">
                                    {[
                                        { icon: <CalendarDays className="w-4 h-4" />, label: "RDV VFS / TLS" },
                                        { icon: <FileText className="w-4 h-4" />, label: "Montage dossier" },
                                        { icon: <ShieldCheck className="w-4 h-4" />, label: "Vérification" },
                                        { icon: <Clock className="w-4 h-4" />, label: "Suivi en temps réel" },
                                    ].map((f, i) => (
                                        <div key={i} className="flex items-center gap-2.5 text-sm font-bold text-slate-300 bg-white/5 border border-white/10 px-4 py-3 rounded-2xl">
                                            <span className="text-amber-400">{f.icon}</span>
                                            {f.label}
                                        </div>
                                    ))}
                                </div>

                                {/* Types */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {["🏖️ Tourisme", "💼 Affaires", "👨‍👩‍👧 Famille"].map((t, i) => (
                                        <span key={i} className="text-sm font-black text-amber-300 bg-amber-500/10 border border-amber-400/20 px-4 py-2 rounded-full">
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                {/* Countries preview */}
                                <div className="flex flex-wrap gap-2 mb-10">
                                    {["🇫🇷 France", "🇪🇸 Espagne", "🇩🇪 Allemagne", "🇮🇹 Italie", "🇺🇸 USA", "🇨🇦 Canada"].map((c, i) => (
                                        <span key={i} className="text-xs font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full">
                                            {c}
                                        </span>
                                    ))}
                                    <span className="text-xs font-bold text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                                        + 18 autres...
                                    </span>
                                </div>

                                <div className="mt-auto">
                                    <Link href="/tourisme/rdv-visa">
                                        <motion.button
                                            whileHover={{ scale: 1.03 }}
                                            whileTap={{ scale: 0.97 }}
                                            className="flex items-center gap-3 px-8 py-4 bg-amber-500 hover:bg-amber-400 rounded-2xl font-black text-sm uppercase tracking-widest text-white transition-all shadow-lg shadow-amber-500/20"
                                        >
                                            Voir les 24 pays
                                            <ArrowRight className="w-4 h-4" />
                                        </motion.button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3.5rem] overflow-hidden bg-gradient-to-br from-sky-600 to-blue-800 p-12 md:p-20 text-center"
                    >
                        <div className="absolute inset-0 opacity-10">
                            <img src="https://images.unsplash.com/photo-1500835556837-99ac94a94552?q=80&w=1200" className="w-full h-full object-cover" alt="" />
                        </div>
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="relative z-10">
                            <p className="text-[10px] font-black text-sky-200 uppercase tracking-[0.3em] mb-4">Agence à Béjaïa</p>
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white mb-6">
                                Prêt pour le <span className="text-amber-300 italic">Grand Départ ?</span>
                            </h2>
                            <p className="text-xl text-sky-100/80 mb-12 font-medium max-w-xl mx-auto leading-relaxed">
                                Créez votre dossier en ligne. Notre équipe à Béjaïa vous contacte dans les 24h ouvrables.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Link href="/auth/register">
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="px-10 py-5 bg-white text-blue-900 rounded-full font-black text-lg hover:bg-blue-50 transition-all flex items-center gap-3 shadow-2xl"
                                    >
                                        Ouvrir mon dossier
                                        <ArrowRight className="w-5 h-5" />
                                    </motion.button>
                                </Link>
                                <Link href="/contact">
                                    <motion.button
                                        whileHover={{ scale: 1.04 }}
                                        whileTap={{ scale: 0.96 }}
                                        className="px-10 py-5 bg-white/15 border border-white/25 text-white rounded-full font-black text-lg hover:bg-white/25 transition-all backdrop-blur-sm"
                                    >
                                        Nous contacter
                                    </motion.button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

        </div>
    );
}
