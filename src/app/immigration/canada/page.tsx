"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    Clock,
    ShieldCheck,
    Users,
    Globe,
    FileText,
    Zap,
    MapPin,
    GraduationCap,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CRSCalculator from "@/components/CRSCalculator";

export default function CanadaImmigration() {
    const [isCalcOpen, setIsCalcOpen] = useState(false);
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const programs = [
        {
            title: "Entrée Express (Express Entry)",
            desc: "Le système de sélection phare du Canada pour les travailleurs qualifiés. Basé sur un système de points (CRS), il permet d'obtenir la résidence permanente en moins de 6 mois.",
            subcategories: ["Federal Skilled Worker (FSW)", "Canadian Experience Class (CEC)", "Federal Skilled Trades (FST)"],
            icon: <Zap className="w-6 h-6 text-amber-500" />
        },
        {
            title: "Programmes des Candidats des Provinces (PCP/PNP)",
            desc: "Chaque province canadienne a ses propres besoins. Nous vous aidons à obtenir une désignation provinciale qui vous garantit quasiment l'invitation à la résidence permanente.",
            subcategories: ["Ontario (OINP)", "Québec (Arrima)", "Colombie-Britannique", "Nouveau-Brunswick"],
            icon: <MapPin className="w-6 h-6 text-red-500" />
        },
        {
            title: "Regroupement Familial",
            desc: "Parrainez votre conjoint(e), vos enfants ou vos parents pour qu'ils vous rejoignent au Canada en tant que résidents permanents.",
            subcategories: ["Époux/Conjoint de fait", "Enfants à charge", "Parents et Grands-parents"],
            icon: <Users className="w-6 h-6 text-sky-500" />
        }
    ];

    const requirements = [
        { label: "Âge Idéal", value: "18 - 35 ans", desc: "Pour maximiser les points du profil.", icon: <Clock /> },
        { label: "Éducation", value: "Bac +3 min.", desc: "Évaluation des diplômes (EDE) requise.", icon: <GraduationCap /> },
        { label: "Langues", value: "IELTS / TEF", desc: "Un excellent score est crucial.", icon: <Globe /> },
        { label: "Expérience", value: "1 an min.", desc: "Dans un domaine qualifié (CNP).", icon: <Briefcase /> }
    ];

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* ─── Hero Canada ─── */}
            <section className="relative pt-56 pb-32 px-4 overflow-hidden bg-red-950">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-30"
                        alt="Canada Landscape"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-red-950/80 via-red-950 to-white" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-black text-[10px] uppercase tracking-[0.2em] mb-10 backdrop-blur-sm"
                    >
                        <img src="https://flagcdn.com/w40/ca.png" className="w-5" alt="Canada Flag" />
                        Destination Canada : Résidence Permanente
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
                    >
                        VOTRE AVENIR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-200 italic uppercase">
                            AU CANADA.
                        </span>
                    </motion.h1>

                    <p className="text-xl text-red-100/70 max-w-2xl font-medium leading-relaxed mb-12">
                        Le Canada est à la recherche de talents. Nous ne nous contentons pas de remplir des formulaires ; nous construisons votre stratégie de points pour garantir votre succès.
                    </p>

                    <Link href="/auth/register">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-white text-red-950 rounded-full font-black text-lg transition-all flex items-center gap-3 shadow-2xl"
                        >
                            Démarrer mon Évaluation Gratuite
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* ─── Key Figures ─── */}
            <section className="py-24 bg-white relative z-20 -mt-10">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { val: "6 Mois", label: "Délai Moyen Express Entry", icon: <Clock className="text-red-500" /> },
                            { val: "80+", label: "Programmes Disponibles", icon: <FileText className="text-red-500" /> },
                            { val: "99%", label: "Taux de Satisfaction", icon: <ShieldCheck className="text-red-500" /> }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 flex items-center gap-6"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-red-500">
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-3xl font-black text-slate-900 tracking-tighter">{stat.val}</div>
                                    <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Programs Detail ─── */}
            <section className="py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">Les Voies de <span className="text-red-600 italic">Succès.</span></h2>
                        <p className="text-lg text-slate-500 max-w-2xl font-medium">Nous maîtrisons l'intégralité du spectre migratoire canadien pour vous offrir la solution la plus rapide.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {programs.map((prog, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-12 rounded-[4rem] bg-white border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8">
                                    {prog.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{prog.title}</h3>
                                <p className="text-slate-500 font-medium mb-8 leading-relaxed">{prog.desc}</p>
                                <div className="space-y-3">
                                    {prog.subcategories.map((sub, j) => (
                                        <div key={j} className="flex items-center gap-3 text-sm font-bold text-slate-400">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Requirements Section ─── */}
            <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 blur-[120px] rounded-full" />

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Êtes-vous <span className="text-red-500 italic">Éligible ?</span></h2>
                        <p className="text-slate-400 max-w-xl mx-auto font-medium">L'élégibilité se calcule sur un barème strict. Voici les piliers de votre profil.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {requirements.map((req, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="p-10 rounded-[3rem] bg-white/5 border border-white/10 text-center"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-6">
                                    {req.icon}
                                </div>
                                <div className="text-2xl font-black mb-2">{req.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">{req.label}</div>
                                <p className="text-xs text-slate-400 leading-relaxed">{req.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCalcOpen(true)}
                            className="px-12 py-6 bg-red-600 hover:bg-red-500 rounded-full font-black text-lg transition-all shadow-2xl shadow-red-600/20 text-white"
                        >
                            Calculer mon score CRS maintenant
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* ─── CTA Footer ─── */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 leading-tight">
                        Plus que de simples formulaires, <br />
                        <span className="text-red-600">votre projet de vie commence ici.</span>
                    </h2>
                    <p className="text-lg text-slate-500 mb-10 font-medium leading-relaxed">
                        Notre équipe à Béjaïa vous accompagne à chaque étape, de la préparation des tests de langue jusqu'à l'obtention de votre visa, en s'appuyant sur une solide expérience du terrain.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link href="/contact">
                            <button className="px-8 py-4 bg-slate-100 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">
                                Parler à notre équipe
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <CRSCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
        </div>
    );
}
