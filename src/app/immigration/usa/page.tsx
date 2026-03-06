"use client";

import { motion } from "framer-motion";
import {
    ArrowRight,
    CheckCircle2,
    ShieldCheck,
    Star,
    Zap,
    Flag,
    Building2,
    DollarSign,
    Briefcase,
    Gem
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import USACalculator from "@/components/USACalculator";

export default function USAImmigration() {
    const [isCalcOpen, setIsCalcOpen] = useState(false);
    const fadeIn = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const visas = [
        {
            title: "Visas de Travail (H-1B, L-1)",
            desc: "Pour les professionnels spécialisés ou les transferts intra-entreprise. Nous vous accompagnons dans la complexité du parrainage employeur.",
            sub: ["Spécialités H-1B", "Transfert L-1", "O-1 (Talents Extraord.)"],
            icon: <Briefcase className="w-6 h-6 text-indigo-600" />
        },
        {
            title: "Résidence Permanente (Green Card)",
            desc: "Que ce soit par le travail (EB1, EB2, EB3) ou par l'investissement, obtenez le statut légal permanent aux États-Unis.",
            sub: ["EB-1 (Haut Niveau)", "EB-2 (NIW)", "EB-3 (Professionnels)"],
            icon: <Gem className="w-6 h-6 text-emerald-600" />
        },
        {
            title: "Loterie Diversité (DV Lottery)",
            desc: "Nous auditons votre inscription pour éviter toute erreur éliminatoire et nous vous préparons pour l'entretien consulaire en cas de gain.",
            sub: ["Qualification Photo", "Saisie DS-260", "Préparation Entretien"],
            icon: <Flag className="w-6 h-6 text-red-600" />
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* ─── Hero USA ─── */}
            <section className="relative pt-56 pb-32 px-4 overflow-hidden bg-slate-950">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-30"
                        alt="USA Statue of Liberty"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/80 via-slate-950 to-white" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-[10px] uppercase tracking-[0.2em] mb-10 backdrop-blur-sm"
                    >
                        <Flag className="w-4 h-4" />
                        IMMIGRATION USA : LE RÊVE AMÉRICAIN SÉCURISÉ
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
                    >
                        TRANSFORMEZ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-red-400 italic uppercase">
                            VOTRE AMBITION.
                        </span>
                    </motion.h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
                        Le système américain est sélectif et rigoureux. Oussama Travel vous apporte la clarté et l'expérience nécessaire pour naviguer parmi les centaines de catégories de visas.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsCalcOpen(true)}
                            className="px-10 py-5 bg-indigo-600 text-white rounded-full font-black text-lg transition-all flex items-center gap-3 shadow-xl shadow-indigo-600/20"
                        >
                            Commencer mon Audit USA
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* ─── Highlights ─── */}
            <section className="py-24 bg-white px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Zap />, label: "Rapidité", desc: "Premium Processing disponible pour certains visas." },
                        { icon: <ShieldCheck />, label: "Conformité", desc: "Vérification stricte avant envoi USCIS." },
                        { icon: <Building2 />, label: "Accès Corporate", desc: "Support pour les entreprises algériennes." },
                        { icon: <DollarSign />, label: "Transparence", desc: "Honoraires clairs et sans frais cachés." }
                    ].map((item, i) => (
                        <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 group hover:bg-slate-900 transition-colors duration-500">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                {item.icon}
                            </div>
                            <h4 className="text-lg font-black text-slate-900 group-hover:text-white mb-2 uppercase tracking-tight">{item.label}</h4>
                            <p className="text-sm text-slate-500 group-hover:text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── Visa Deep Dive ─── */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {visas.map((v, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[4rem] p-12 shadow-sm border border-slate-100 flex flex-col h-full"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100">
                                    {v.icon}
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{v.title}</h3>
                                <p className="text-slate-500 font-medium mb-8 leading-relaxed flex-grow">{v.desc}</p>
                                <div className="space-y-4 pt-8 border-t border-slate-50">
                                    {v.sub.map((s, j) => (
                                        <div key={j} className="flex items-center gap-3 text-xs font-black text-slate-400 uppercase tracking-widest">
                                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
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
                <div className="max-w-4xl mx-auto bg-slate-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
                                Votre Green Card <br /> <span className="text-indigo-400 italic text-2xl">est peut-être plus proche que vous ne le pensez.</span>
                            </h2>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                Ne laissez pas de petites erreurs sur vos formulaires ou vos photos briser votre projet. Contactez-nous pour un accompagnement basé sur l'expérience terrain.
                            </p>
                        </div>
                        <motion.button
                            onClick={() => setIsCalcOpen(true)}
                            className="w-full py-6 bg-white text-slate-900 rounded-full font-black text-lg hover:bg-indigo-100 transition-all shadow-2xl flex items-center justify-center gap-3"
                        >
                            Lancer mon Évaluation
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </div>
                </div>
            </section>

            <USACalculator isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} />
        </div>
    );
}
