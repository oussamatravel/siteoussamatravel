"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Users,
    FileText,
    Star,
    Library,
    Building2,
    Briefcase,
    Globe
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FranceCalculator from "@/components/FranceCalculator";

export default function FranceImmigration() {
    const [isCalcOpen, setIsCalcOpen] = useState(false);
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const categories = [
        {
            title: "Passeport Talent",
            desc: "La voie royale pour les profils qualifiés. Que vous soyez artiste, chercheur, ou salarié hautement qualifié, ce titre de séjour pluriannuel vous offre une grande liberté.",
            sub: ["Salarié Qualifié", "Création d'Entreprise", "Artiste / Interprète"],
            icon: <Star className="w-6 h-6 text-blue-600" />
        },
        {
            title: "Regroupement Familial",
            desc: "Pour les résidents étrangers en France souhaitant faire venir leur famille. Nous gérons la complexité administrative du dossier en préfecture.",
            sub: ["Procédure standard", "Famille de Français", "Famille Accompagnante"],
            icon: <Users className="w-6 h-6 text-rose-500" />
        },
        {
            title: "Visiteur & Retraités",
            desc: "Idéal pour ceux qui souhaitent résider en France sans y travailler, tout en bénéficiant de la qualité de vie européenne.",
            sub: ["Ressources suffisantes", "Assurance santé", "Hébergement"],
            icon: <Library className="w-6 h-6 text-emerald-600" />
        }
    ];

    const stats = [
        { val: "4 Ans", label: "Validité Passeport Talent", desc: "Renouvelable sous conditions." },
        { val: "Expertise", label: "Droit des Étrangers", desc: "Conformité totale aux lois CESEDA." },
        { val: "Direct", label: "Accès Préfecture", desc: "Suivi rigoureux de l'instruction." }
    ];

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* ─── Hero France ─── */}
            <section className="relative pt-56 pb-32 px-4 overflow-hidden bg-blue-950">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-30"
                        alt="Eiffel Tower France"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-950/80 via-blue-950 to-white" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-black text-[10px] uppercase tracking-[0.2em] mb-10 backdrop-blur-sm"
                    >
                        <img src="https://flagcdn.com/w40/fr.png" className="w-5" alt="France Flag" />
                        Accompagnement Immigration : République Française
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
                    >
                        VIVRE EN <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-200 italic uppercase">
                            FRANCE.
                        </span>
                    </motion.h1>

                    <p className="text-xl text-blue-100/70 max-w-2xl font-medium leading-relaxed mb-12">
                        Le système d'immigration français est basé sur le mérite et les liens familiaux. Nous auditons votre situation pour trouver le titre de séjour qui sécurisera votre avenir.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCalcOpen(true)}
                        className="px-10 py-5 bg-white text-blue-950 rounded-full font-black text-lg transition-all flex items-center gap-3 shadow-2xl"
                    >
                        Évaluer ma Situation
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </section>

            {/* ─── Key Stats ─── */}
            <section className="py-24 bg-white relative z-20 -mt-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group"
                            >
                                <div className="text-5xl font-black text-blue-900 tracking-tighter mb-4 group-hover:scale-110 transition-transform">
                                    {s.val}
                                </div>
                                <div className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">{s.label}</div>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Expert Categories ─── */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-[0.9]">
                                Des Solutions <br /> <span className="text-blue-600">Sur-Mesure.</span>
                            </h2>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                De Paris à Marseille, nous vous accompagnons dans toutes les préfectures de France. Notre maîtrise du code de l'entrée et du séjour des étrangers (CESEDA) est votre meilleur atout.
                            </p>
                            <div className="grid grid-cols-2 gap-6 pt-4">
                                {[
                                    { icon: <Building2 className="w-5 h-5" />, label: "Support Préfecture" },
                                    { icon: <Globe className="w-5 h-5" />, label: "Accès Européen" },
                                    { icon: <Briefcase className="w-5 h-5" />, label: "Droit au Travail" },
                                    { icon: <ShieldCheck className="w-5 h-5" />, label: "Protection Juridique" }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 font-bold text-xs uppercase tracking-widest text-slate-400">
                                        <div className="text-blue-600">{item.icon}</div>
                                        {item.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            {categories.map((cat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="p-10 rounded-[3rem] bg-white border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                                >
                                    <div className="flex gap-6 mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0">
                                            {cat.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">{cat.title}</h3>
                                            <p className="text-slate-500 font-medium text-sm leading-relaxed">{cat.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {cat.sub.map((s, j) => (
                                            <span key={j} className="px-4 py-1.5 bg-slate-50 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── Final CTA ─── */}
            <section className="py-24 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-blue-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center">
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                                Sécurisez votre <span className="text-blue-400">Titre de Séjour.</span>
                            </h2>
                            <p className="text-xl text-blue-100/70 mb-12 font-medium max-w-xl mx-auto leading-relaxed">
                                Un dossier mal préparé est un dossier risqué. Bénéficiez de l'expérience Oussama Travel pour un accompagnement serein.
                            </p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsCalcOpen(true)}
                                className="px-12 py-6 bg-white text-blue-900 rounded-full font-black text-xl shadow-2xl flex items-center gap-3 mx-auto"
                            >
                                Lancer mon Audit France
                                <ArrowRight className="w-6 h-6" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            </section>

            <FranceCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
        </div>
    );
}
