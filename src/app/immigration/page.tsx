"use client";

import { motion, AnimatePresence } from "framer-motion";
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
    Calendar,
    ChevronDown,
    Plus,
    Sparkles,
    Trophy
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Immigration() {
    const [openStep, setOpenStep] = useState<number | null>(null);
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const destinations = [
        {
            code: "ca",
            country: "Canada",
            title: "Terre d'Opportunités",
            desc: "Maîtrisez le système Entrée Express et les Candidats des Provinces (PNP) avec nos experts certifiés.",
            image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800",
            programs: ["Entrée Express", "Candidats Provinces", "Parrainage"]
        },
        {
            code: "fr",
            country: "France",
            title: "Expertise Européenne",
            desc: "Passeport Talent ou Regroupement Familial : une stratégie précise pour votre installation en France.",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800",
            programs: ["Passeport Talent", "Regroupement", "Investisseur"]
        }
    ];

    const timeline = [
        { step: "01", title: "Évaluation", desc: "Audit complet de votre profil et calcul de points." },
        { step: "02", title: "Constitution", desc: "Collecte et vérification de vos documents certifiés." },
        { step: "03", title: "Soumission", desc: "Dépôt officiel via les portails gouvernementaux." },
        { step: "04", title: "Résidence", desc: "Obtention de votre visa et préparation au départ." }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
            
            {/* ─── HERO SECTION (LIGHT & AUTHORITATIVE) ─── */}
            <section className="relative pt-44 pb-24 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-amber-50/50 to-transparent rounded-full blur-[120px] -z-10" />
                
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-50 text-amber-600 font-black text-[10px] uppercase tracking-[0.3em] mb-10 border border-amber-100 shadow-sm"
                    >
                        <ShieldCheck className="w-4 h-4" />
                        Accompagnement Juridique & Certifié
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10 text-slate-950 uppercase"
                    >
                        Immigrez <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-300 italic">Avec Assurance.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium mb-16 leading-relaxed"
                    >
                        Spécialistes de l'immigration vers le Canada et l'Europe. <br />
                        <span className="text-slate-900 font-bold border-b-4 border-amber-400/30">Votre nouvelle vie commence ici.</span>
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/auth/register">
                            <button className="px-12 py-6 bg-slate-950 text-white rounded-[2rem] font-black text-lg hover:bg-amber-600 transition-all shadow-2xl shadow-amber-900/10 flex items-center gap-3 group">
                                Évaluer mon profil
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <div className="flex items-center gap-8">
                            <div className="text-left border-l border-slate-200 pl-6">
                                <div className="text-3xl font-black text-slate-950">98%</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Taux de succès</div>
                            </div>
                            <div className="text-left border-l border-slate-200 pl-6">
                                <div className="text-3xl font-black text-slate-950">1.5k</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Familles installées</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── DESTINATIONS ─── */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {destinations.map((dest, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-white rounded-[4rem] border border-slate-100 p-2 overflow-hidden hover:shadow-3xl hover:shadow-slate-200/50 transition-all duration-500"
                        >
                            <div className="relative h-[450px] rounded-[3.5rem] overflow-hidden mb-8">
                                <img src={dest.image} alt={dest.country} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[30%] group-hover:grayscale-0" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                                <div className="absolute top-8 left-8 flex items-center gap-4">
                                    <div className="w-16 h-10 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                                        <img src={`https://flagcdn.com/w160/${dest.code}.png`} className="w-full h-full object-cover" alt={dest.country} />
                                    </div>
                                    <h3 className="text-3xl font-black text-white tracking-tight uppercase">{dest.country}</h3>
                                </div>
                            </div>

                            <div className="px-10 pb-12 flex flex-col h-full">
                                <p className="text-amber-600 font-black text-xs uppercase tracking-widest mb-4">{dest.title}</p>
                                <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">
                                    {dest.desc}
                                </p>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                                    {dest.programs.map((prog, pIdx) => (
                                        <div key={pIdx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 text-center">
                                            <div className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-none">{prog}</div>
                                        </div>
                                    ))}
                                </div>

                                <Link href={`/immigration/${dest.code === 'ca' ? 'canada' : 'france'}`}>
                                    <button className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center justify-center gap-3 shadow-xl">
                                        Détails des Programmes <ArrowRight className="w-4 h-4" />
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ─── PROCESS ─── */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-7xl font-black text-slate-950 tracking-tighter uppercase leading-[0.9] mb-8">La Rigueur <br /> <span className="text-amber-600 italic">Comme Méthode.</span></h2>
                        <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium">Un accompagnement en quatre étapes pour sécuriser votre futur.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {timeline.map((item, i) => (
                            <motion.div 
                                key={i}
                                {...fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 rounded-[3rem] border border-slate-100 hover:shadow-2xl transition-all group relative"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-8 font-black text-2xl group-hover:bg-amber-600 group-hover:text-white transition-all transform group-hover:-rotate-6">
                                    {item.step}
                                </div>
                                <h3 className="text-sm font-black text-slate-950 mb-3 uppercase tracking-widest">{item.title}</h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-32 px-4 text-center">
                <div className="max-w-5xl mx-auto bg-slate-950 rounded-[5rem] p-12 md:p-24 text-white relative overflow-hidden shadow-3xl shadow-amber-900/20">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 blur-[150px] rounded-full" />
                    <div className="relative z-10">
                        <Trophy className="w-20 h-20 text-amber-400 mx-auto mb-10" />
                        <h2 className="text-4xl md:text-8xl font-black tracking-tighter leading-tight mb-10 uppercase">
                            Votre Destin <br /> <span className="text-amber-400 italic">Est Entre Vos Mains.</span>
                        </h2>
                        <p className="text-slate-400 text-xl font-medium mb-12 max-w-xl mx-auto leading-relaxed">
                            Ne laissez pas la complexité administrative freiner vos rêves d'immigration.
                        </p>
                        <Link href="/auth/register">
                            <button className="px-12 py-7 bg-white text-slate-950 rounded-full font-black text-xl hover:bg-amber-400 hover:text-white transition-all flex items-center gap-4 mx-auto">
                                Commencer l'Aventure <ArrowRight className="w-6 h-6" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}
