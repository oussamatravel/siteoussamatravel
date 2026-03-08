"use client";

import { motion } from "framer-motion";
import {
    Users,
    Target,
    Award,
    Globe2,
    History,
    Briefcase,
    Heart,
    CheckCircle2,
    ArrowRight,
    Search,
    FileText,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
    const stats = [
        { label: "Expertise Tourisme", value: "23 Ans", icon: <History className="w-5 h-5 text-sky-400" /> },
        { label: "Visas Études", value: "5 Ans", icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" /> },
        { label: "Pays d'Études", value: "10+", icon: <Globe2 className="w-5 h-5 text-amber-400" /> },
        { label: "Bureau à Béjaïa", value: "Local", icon: <Users className="w-5 h-5 text-rose-400" /> },
    ];

    const countries = [
        { name: "France", flag: "🇫🇷" },
        { name: "Belgique", flag: "🇧🇪" },
        { name: "Espagne", flag: "🇪🇸" },
        { name: "Italie", flag: "🇮🇹" },
        { name: "Rép. Tchèque", flag: "🇨🇿" },
        { name: "Irlande", flag: "🇮🇪" },
        { name: "Lituanie", flag: "🇱🇹" },
        { name: "Lettonie", flag: "🇱🇻" },
        { name: "Pologne", flag: "🇵🇱" },
        { name: "Canada", flag: "🇨🇦" },
        { name: "USA", flag: "🇺🇸" },
        { name: "Russie", flag: "🇷🇺" },
        { name: "Chypre", flag: "🇨🇾" },
        { name: "Turquie", flag: "🇹🇷" },
        { name: "Chine", flag: "🇨🇳" },
        { name: "Allemagne", flag: "🇩🇪" },
        { name: "Malaisie", flag: "🇲🇾" },
    ];

    const steps = [
        { title: "Orientation et choix", desc: "Conseils personnalisés pour votre programme académique.", icon: "🎓" },
        { title: "Candidatures", desc: "Préparation et soumission rigoureuse de vos dossiers.", icon: "📄" },
        { title: "Admissions", desc: "Assistance complète pour les procédures universitaires.", icon: "🏫" },
        { title: "Dossier de Visa", desc: "Construction d'un dossier solide et professionnel.", icon: "📑" },
        { title: "Entretien", desc: "Simulation et coaching pour réussir votre entretien.", icon: "🎤" },
        { title: "Suivi Arrivée", desc: "Accompagnement jusqu'à votre installation sur place.", icon: "✈️" },
    ];

    return (
        <div className="min-h-screen bg-[#020617] font-sans selection:bg-amber-500 selection:text-slate-900 text-slate-300">
            {/* ─── HERO SECTION ─── */}
            <section className="relative pt-48 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[70vh] flex flex-col justify-center">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1523050353063-8862cf31f50a?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-10 mix-blend-overlay"
                        alt="Education and Travel"
                    />
                    <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-500/10 blur-[130px] rounded-full pointer-events-none" />
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-400 font-bold text-[10px] uppercase tracking-widest shadow-2xl mb-8"
                    >
                        <Globe2 className="w-4 h-4" />
                        <span>Votre Partenaire Réussite à Béjaïa</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-white mb-8"
                    >
                        L'Excellence <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-amber-400 italic">
                            Oussama Travel.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed"
                    >
                        Spécialistes de l'accompagnement étudiant, de l'immigration et des services de voyage. Nous façonnons votre avenir international depuis notre siège en Algérie, avec la précision et la rigueur d'une agence experte.
                    </motion.p>
                </div>
            </section>

            {/* ─── DATA & STATS SECTION ─── */}
            <section className="py-12 border-y border-white/5 bg-slate-950/50 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/5">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center px-4 flex flex-col items-center gap-2"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                                    {stat.icon}
                                </div>
                                <div className="text-3xl font-black text-white tracking-tighter">{stat.value}</div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CONTENT (BENTO LAYOUT) ─── */}
            <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left Text Column */}
                    <div className="lg:col-span-7 space-y-10">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                                Plus qu'une agence, <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">Un Architecte de Projets.</span>
                            </h2>
                            <p className="text-lg text-slate-400 font-medium leading-relaxed">
                                Chez Oussama Travel, nous croyons qu'une procédure asymétrique nécessite une stratégie rigoureuse. L'éducation et l'immigration internationales sont des tremplins vitaux conditionnés par un dossier irréprochable.
                            </p>
                        </div>

                        <div className="p-8 bg-slate-900/50 backdrop-blur-md rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 blur-3xl rounded-full"></div>
                            <p className="text-slate-300 font-medium leading-relaxed relative z-10 text-lg">
                                Forts de <strong className="text-white">23 ans d'expertise dans le tourisme</strong> et de plus de <strong className="text-white">5 ans d'hyperspécialisation</strong> dans les études et l'immigration, notre cabinet à Béjaïa vous escorte du premier audit jusqu'à votre installation finale à l'étranger.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {["Béjaïa, Algérie", "23 Ans de Savoir-faire", "Accompagnement VIP", "Protocoles Sécurisés"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-300 font-black text-[10px] uppercase tracking-widest bg-white/5 border border-white/10 p-4 rounded-2xl">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Visual Column (Destinations) */}
                    <div className="lg:col-span-5 relative">
                        <div className="absolute -inset-4 bg-sky-500/10 rounded-[4rem] blur-2xl"></div>
                        <div className="bg-[#0b1120] rounded-[3rem] p-8 md:p-10 shadow-2xl relative border border-slate-700/50 overflow-hidden">
                            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>

                            <h3 className="text-2xl font-black text-white mb-8 border-b border-slate-700/50 pb-4 relative z-10">
                                Un Réseau Global
                            </h3>

                            <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                {countries.map((c, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                                        <span className="text-2xl drop-shadow-md">{c.flag}</span>
                                        <span className="font-bold text-slate-300 text-sm">{c.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ALGORITHM (STEPS) ─── */}
            <section className="py-24 bg-slate-950/50 relative px-4 border-y border-white/5">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.3em]">Méthodologie Pro</h2>
                        <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter">Notre Protocole d'Excellence.</h3>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">Une matrice opérationnelle en 6 phases pour garantir un taux de réussite record sur l'ensemble de vos candidatures.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                        {/* Connection Lines (Desktop Background) */}
                        <div className="hidden lg:block absolute top-16 left-20 right-20 h-0.5 bg-gradient-to-r from-sky-500/20 via-blue-500/20 to-amber-500/20 z-0" />

                        {steps.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-[#0b1120] p-10 rounded-[3rem] shadow-xl border border-slate-800 hover:border-sky-500/30 transition-colors group relative z-10"
                            >
                                <div className="absolute top-0 right-10 w-px h-10 bg-gradient-to-b from-sky-500/0 to-sky-500/50 group-hover:h-16 transition-all duration-500"></div>
                                <div className="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform drop-shadow-lg">
                                    {s.icon}
                                </div>
                                <h4 className="text-xl font-black mb-3 text-white tracking-tighter">0{i + 1}. {s.title}</h4>
                                <p className="text-slate-400 font-medium text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA FINAL ─── */}
            <section className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="bg-sky-600 rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center text-white shadow-[0_0_80px_rgba(2,132,199,0.2)]">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2000&auto=format&fit=crop')] opacity-10 mix-blend-overlay object-cover"></div>
                    <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-slate-900/40 blur-[130px] rounded-full translate-x-1/2 translate-y-1/2"></div>

                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8 relative z-10">
                        Prêt(e) à coder <br />
                        <span className="text-[#020617] italic">votre succès ?</span>
                    </h2>
                    <p className="text-xl text-sky-100 max-w-2xl mx-auto font-medium mb-12 relative z-10">
                        Passez à l'action. Intégrez notre plateforme et laissez nos experts gérer la logistique de vos rêves à Béjaïa et partout ailleurs.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 font-black">
                        <Link href="/auth/register">
                            <button className="px-10 py-5 bg-[#020617] text-white rounded-full hover:scale-105 transition-transform flex items-center gap-3 shadow-2xl">
                                Lancer une procédure
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </Link>
                        <Link href="/contact">
                            <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white/20 transition-colors shadow-xl">
                                Contacter l'agence
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Global style for custom scrollbar */}
            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar {
                   width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                   background: rgba(255, 255, 255, 0.02);
                   border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                   background: rgba(255, 255, 255, 0.1);
                   border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                   background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
