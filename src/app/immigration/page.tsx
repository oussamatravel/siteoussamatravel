"use client";

import { motion } from "framer-motion";
import {
    FileText,
    ArrowRight,
    ShieldCheck,
    Scale,
    FileCheck,
    Users,
    Landmark,
    Briefcase,
    CheckCircle2,
    Lock,
    Globe2,
    Calendar
} from "lucide-react";
import Link from "next/link";

export default function Immigration() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const programmes = [
        {
            title: "Entrée Express Canada",
            desc: "Le moyen le plus rapide d'immigrer pour les travailleurs qualifiés. Profil, points (CRS) et invitation (ITA).",
            icon: <Briefcase className="w-8 h-8 text-amber-500" />,
            color: "border-amber-100 bg-amber-50",
            status: "Haute Priorité"
        },
        {
            title: "Parrainage Familial",
            desc: "Réunissez votre famille au Canada. Nous vous assistons pour parrainer votre conjoint, parents ou enfants.",
            icon: <Users className="w-8 h-8 text-sky-500" />,
            color: "border-sky-100 bg-sky-50",
            status: "Services Plus"
        },
        {
            title: "Résidence Permanente",
            desc: "Accompagnement complet pour obtenir le statut de résident permanent et tous ses avantages sociaux.",
            icon: <Landmark className="w-8 h-8 text-emerald-500" />,
            color: "border-emerald-100 bg-emerald-50",
            status: "Expertise OTA"
        },
        {
            title: "Passeport Talent - France",
            desc: "Pour les profils hautement qualifiés, artistes ou investisseurs souhaitant s'installer en France.",
            icon: <FileText className="w-8 h-8 text-blue-600" />,
            color: "border-blue-100 bg-blue-50",
            status: "Nouveau"
        },
        {
            title: "Regroupement Familial",
            desc: "Procédure d'immigration parrainée pour réunir les familles séparées par les frontières.",
            icon: <Users className="w-8 h-8 text-rose-500" />,
            color: "border-rose-100 bg-rose-50",
            status: "Accompagnement"
        }
    ];

    const timeline = [
        {
            step: "01",
            title: "Évaluation Profile",
            desc: "Analyse de vos points, diplômes et expérience.",
            icon: <Calendar className="w-5 h-5" />
        },
        {
            step: "02",
            title: "Constitution",
            desc: "Collecte rigoureuse des documents certifiés.",
            icon: <FileCheck className="w-5 h-5" />
        },
        {
            step: "03",
            title: "Soumission Dossier",
            desc: "Envoi officiel via les portails gouvernementaux.",
            icon: <Globe2 className="w-5 h-5" />
        },
        {
            step: "04",
            title: "Confirmation",
            desc: "Réception de votre visa de résidence.",
            icon: <ShieldCheck className="w-5 h-5" />
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <section className="pt-48 pb-32 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-10"
                        alt="Immigration background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-50"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 backdrop-blur-md text-amber-300 font-black text-xs uppercase tracking-widest mb-8 border border-white/10"
                    >
                        <Scale className="w-4 h-4" />
                        <span>Experts en droit de l'immigration certifiés</span>
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
                    >
                        Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 uppercase italic">Nouvelle Vie</span> <br />
                        Commence Ici.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        L'immigration est un projet de vie. Nous ne gérons pas des dossiers, nous gérons vos rêves de futur avec une rigueur administrative absolue.
                    </motion.p>

                    <Link href="/auth/register">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-amber-400 text-slate-900 rounded-full font-black text-lg hover:bg-amber-300 transition-all shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-3 mx-auto"
                        >
                            Évaluer mon Éligibilité
                            <ArrowRight className="w-5 h-5 font-black" />
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Programmes Grid */}
            <section className="py-24 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programmes.map((prog, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-slate-100 p-10 flex flex-col h-full"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-all">
                                    {prog.icon}
                                </div>
                                <div className="space-y-4 flex-grow">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-amber-500">{prog.status}</span>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">{prog.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">
                                        {prog.desc}
                                    </p>
                                </div>
                                <div className="pt-8 mt-8 border-t border-slate-50 flex items-center justify-between">
                                    <span className="text-xs font-black text-slate-400">En savoir plus</span>
                                    <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Process */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Un Parcours Sécurisé.</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                            Nous avons décomposé le processus d'immigration en étapes simples, suivies en temps réel depuis votre espace client.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 z-0"></div>

                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative z-10 text-center space-y-6"
                            >
                                <div className="w-24 h-24 rounded-[2.5rem] bg-white border-4 border-slate-50 shadow-xl flex items-center justify-center mx-auto transition-transform hover:scale-110">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-xl">
                                        {item.step}
                                    </div>
                                </div>
                                <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100">
                                    <div className="flex justify-center mb-4 text-amber-500">{item.icon}</div>
                                    <h3 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-widest">{item.title}</h3>
                                    <p className="text-xs text-slate-500 font-bold leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proof Section */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <div className="w-16 h-16 rounded-2xl bg-amber-400 text-slate-900 flex items-center justify-center mb-8 shadow-xl shadow-amber-400/20">
                                    <Lock className="w-8 h-8" />
                                </div>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                                    L'Expertise qui <br />
                                    <span className="text-sky-400">fait la différence.</span>
                                </h2>
                                <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
                                    Pour l'immigration, la moindre erreur peut causer des années de retard ou un refus définitif. C'est pourquoi nous auditons chaque document avant de le soumettre.
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    {["Vérification IRCC", "Traduction certifiée", "Suivi quotidien", "Support juridique"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-3 text-white font-black text-[10px] uppercase tracking-widest bg-white/5 p-4 rounded-xl border border-white/10">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[4rem] text-center">
                                <FileText className="w-20 h-20 text-sky-400 mx-auto mb-8 shadow-2xl" />
                                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">Évaluation Gratuite</h3>
                                <p className="text-slate-300 font-medium mb-10 leading-relaxed">Calculez vos chances de réussite pour le Canada dès maintenant en créant votre espace client.</p>
                                <Link href="/auth/register">
                                    <button className="w-full py-6 bg-white text-slate-900 rounded-full font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3 shadow-2xl">
                                        Lancer mon Dossier
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
