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
    ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
    const stats = [
        { label: "Expertise Tourisme", value: "23 Ans", icon: <History className="w-5 h-5 text-sky-500" /> },
        { label: "Visas Études", value: "5 Ans", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
        { label: "Pays d'Études", value: "10+", icon: <Globe2 className="w-5 h-5 text-amber-500" /> },
        { label: "Bureau à Béjaïa", value: "Local", icon: <Users className="w-5 h-5 text-rose-500" /> },
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
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="pt-52 pb-24 px-4 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1523050353063-8862cf31f50a?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-20"
                        alt="Education and Travel"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-white"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-sky-300 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border border-white/10"
                    >
                        <Globe2 className="w-4 h-4" />
                        <span>Votre partenaire réussite à Béjaïa</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
                    >
                        Oussama <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 uppercase italic">Travel.</span>
                    </motion.h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium leading-relaxed">
                        Spécialiste de l'accompagnement étudiant et des services de voyage, nous simplifions votre avenir international depuis notre bureau de Béjaïa.
                    </p>
                </div>
            </section>

            {/* Stats Bar */}
            <section className="py-12 -mt-16 relative z-20 px-4">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 text-center flex flex-col items-center gap-3"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center mb-2">
                                {stat.icon}
                            </div>
                            <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-4 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                    <div className="space-y-10 text-center md:text-left">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                                Plus qu'une agence, <br />
                                <span className="text-sky-500">Un Guide.</span>
                            </h2>
                            <p className="text-lg text-slate-600 font-medium leading-relaxed">
                                Chez Oussama Travel, nous croyons que l'éducation internationale est une opportunité unique d'ouvrir de nouvelles perspectives, de développer ses compétences et de construire un avenir meilleur.
                            </p>
                        </div>

                        <div className="space-y-6 text-slate-600 font-medium leading-relaxed">
                            <p>
                                Forts de <strong className="text-slate-900">23 ans d'expérience</strong> dans le tourisme et plus de <strong className="text-slate-900">5 ans spécialisés</strong> dans les visas d'études, nous offrons un service fiable et professionnel adapté aux besoins de chaque étudiant.
                            </p>
                            <p>
                                Basés à Béjaïa, nous vous accompagnons de A à Z : du choix du programme à l'installation dans votre nouveau pays de résidence.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {["Béjaïa, Algérie", "23 Ans de Savoir-faire", "Accompagnement VIP", "Visas Études Experts"].map((item, i) => (
                                <div key={i} className="flex items-center gap-3 text-slate-900 font-black text-[10px] uppercase tracking-widest bg-slate-50 p-4 rounded-2xl">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="absolute -inset-4 bg-sky-500/5 rounded-[4rem] blur-2xl"></div>
                        <div className="bg-white rounded-[4rem] p-8 md:p-12 shadow-2xl relative border border-slate-100">
                            <h3 className="text-2xl font-black text-slate-900 mb-8 border-b pb-4">Destinations Proposées</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {countries.map((c, i) => (
                                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                                        <span className="text-3xl">{c.flag}</span>
                                        <span className="font-bold text-slate-700 tracking-tight">{c.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-24 bg-slate-50 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20 space-y-4">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Notre Accompagnement Étudiant</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Une méthode rigoureuse en 6 étapes pour maximiser vos chances de succès.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {steps.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group"
                            >
                                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">
                                    {s.icon}
                                </div>
                                <h3 className="text-xl font-black mb-3 text-slate-900 uppercase tracking-tighter">{s.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Admission */}
            <section className="py-32 bg-white px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="bg-slate-900 rounded-[5rem] p-12 md:p-24 relative overflow-hidden text-center text-white">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-8 relative z-10">
                            Construisez votre <br />
                            <span className="text-sky-400 italic">Avenir académique.</span>
                        </h2>
                        <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium mb-12 relative z-10">
                            Notre équipe à Béjaïa vous attend pour transformer votre projet en réalité.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 relative z-10 font-black">
                            <Link href="/contact">
                                <button className="px-10 py-5 bg-white text-slate-900 rounded-full hover:bg-slate-100 transition-all flex items-center gap-3 shadow-xl">
                                    Prendre RDV à Béjaïa
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link href="/auth/register">
                                <button className="px-10 py-5 bg-sky-500 text-white rounded-full hover:bg-sky-600 transition-all shadow-xl shadow-sky-500/20">
                                    Lancer ma procédure
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
