"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Clock,
    Globe,
    Zap,
    MapPin,
    Crown,
    Landmark,
    Briefcase
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import UKCalculator from "@/components/UKCalculator";

export default function UKImmigration() {
    const [isCalcOpen, setIsCalcOpen] = useState(false);
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const programs = [
        {
            title: "Skilled Worker Visa",
            desc: "Le système à points post-Brexit. Si vous avez une offre d'emploi d'un employeur agréé et que vous maîtrisez l'anglais, c'est votre porte d'entrée principale.",
            sub: ["Points Basés sur le Salaire", "Surcharge Santé (IHS)", "Certificat de Parrainage (CoS)"],
            icon: <Briefcase className="w-6 h-6 text-navy-900" />
        },
        {
            title: "Global Talent Visa",
            desc: "Pour les leaders ou futurs leaders dans les domaines des sciences, des arts ou du numérique. Pas besoin d'offre d'emploi préalable.",
            sub: ["Endossement Royal", "Domaine Académique", "Arts & Culture"],
            icon: <Crown className="w-6 h-6 text-amber-600" />
        },
        {
            title: "Innovator Founder Visa",
            desc: "Pour les entrepreneurs souhaitant créer une entreprise innovante et évolutive au Royaume-Uni.",
            sub: ["Concept Innovant", "Business Plan Audité", "Accès à la Résidence"],
            icon: <Zap className="w-6 h-6 text-sky-600" />
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* ─── Hero UK ─── */}
            <section className="relative pt-56 pb-32 px-4 overflow-hidden bg-[#001b44]">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-20"
                        alt="London UK Bridge"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#001b44]/90 via-[#001b44] to-white" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 border border-white/20 text-white font-black text-[10px] uppercase tracking-[0.2em] mb-10 backdrop-blur-sm"
                    >
                        <Crown className="w-4 h-4 text-amber-400" />
                        IMMIGRATION UK : LE SYSTÈME À POINTS
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
                    >
                        REJOIGNEZ LE <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-200 italic uppercase">
                            ROYAUME-UNI.
                        </span>
                    </motion.h1>

                    <p className="text-xl text-blue-100/70 max-w-2xl font-medium leading-relaxed mb-12">
                        Devenez acteur de l'économie britannique. Nous vous guidons à travers les exigences strictes en matière de parrainage et de santé pour sécuriser votre installation.
                    </p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setIsCalcOpen(true)}
                        className="px-10 py-5 bg-white text-[#001b44] rounded-full font-black text-lg transition-all flex items-center gap-3 shadow-2xl"
                    >
                        Tester mon Éligibilité UK
                        <ArrowRight className="w-5 h-5" />
                    </motion.button>
                </div>
            </section>

            {/* ─── UK Specific Process ─── */}
            <section className="py-24 bg-white px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { label: "Système à Points", val: "70 Points", desc: "Le seuil requis pour le Skilled Worker Visa." },
                        { label: "Exigence Linguistique", val: "B1", desc: "Niveau minimum en anglais (IELTS UKVI)." },
                        { label: "Voie Rapide", val: "Health & Care", desc: "Délais réduits pour les professionnels de santé." }
                    ].map((item, i) => (
                        <div key={i} className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 text-center">
                            <div className="text-4xl font-black text-[#001b44] mb-2">{item.val}</div>
                            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">{item.label}</div>
                            <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Programs Grid ─── */}
            <section className="py-32 px-4 bg-slate-50">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {programs.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-8">
                                    {p.icon}
                                </div>
                                <h3 className="text-2xl font-black text-[#001b44] mb-6">{p.title}</h3>
                                <p className="text-slate-500 font-medium mb-8 leading-relaxed">{p.desc}</p>
                                <div className="space-y-3">
                                    {p.sub.map((s, j) => (
                                        <div key={j} className="flex items-center gap-3 text-sm font-bold text-slate-400">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            {s}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Final CTA ─── */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-5xl mx-auto bg-[#001b44] rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                    <div className="relative z-10">
                        <Landmark className="w-16 h-16 text-amber-400 mx-auto mb-8" />
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                            Le Royaume-Uni <br /> <span className="text-amber-400 italic">vous attend.</span>
                        </h2>
                        <p className="text-xl text-blue-100/70 mb-12 font-medium max-w-xl mx-auto leading-relaxed">
                            Bénéficiez de notre expérience pour votre dépôt de visa (VFS Global) et la préparation de vos tests de langue.
                        </p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCalcOpen(true)}
                            className="px-12 py-6 bg-white text-[#001b44] rounded-full font-black text-xl shadow-2xl flex items-center gap-3 mx-auto"
                        >
                            Commencer ma Démarche UK
                            <ArrowRight className="w-6 h-6" />
                        </motion.button>
                    </div>
                </div>
            </section>

            <UKCalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
        </div>
    );
}
