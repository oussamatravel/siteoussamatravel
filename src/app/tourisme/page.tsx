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
    Sparkles,
    Compass,
    User
} from "lucide-react";
import Link from "next/link";

export default function Tourisme() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
            
            {/* ─── HERO SECTION (LIGHT & ADVENTUROUS) ─── */}
            <section className="relative pt-44 pb-24 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-sky-50/50 to-transparent rounded-full blur-[120px] -z-10" />
                
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-sky-50 text-sky-600 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border border-sky-100 shadow-sm"
                    >
                        <Compass className="w-4 h-4" />
                        Explorez le Monde avec Oussama Travel
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10 text-slate-950 uppercase"
                    >
                        Le Voyage <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-500 to-amber-500 italic">Sans Frontières.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto font-medium mb-16 leading-relaxed"
                    >
                        Visas touristiques, E-visas express et dossiers consulaires. <br />
                        <span className="text-slate-900 font-bold underline decoration-sky-400 decoration-4 underline-offset-8">Simplicité maximale.</span>
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <Link href="/auth/register">
                            <button className="px-12 py-6 bg-slate-950 text-white rounded-[2rem] font-black text-lg hover:bg-sky-600 transition-all shadow-2xl shadow-sky-900/10 flex items-center gap-3 group">
                                Ouvrir mon dossier
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </Link>
                        <div className="flex items-center gap-8">
                            {[
                                { val: "22", label: "E-Visas" },
                                { val: "24h", label: "Express" },
                            ].map((s, i) => (
                                <div key={i} className="text-left border-l border-slate-200 pl-6">
                                    <div className="text-3xl font-black text-slate-950">{s.val}</div>
                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── SERVICES ─── */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    
                    {/* E-Visa Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group bg-slate-50 rounded-[4rem] p-10 md:p-16 border border-slate-100 hover:bg-white hover:shadow-3xl hover:shadow-sky-100 transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/5 blur-[80px] rounded-full" />
                        <div className="w-20 h-20 rounded-3xl bg-sky-500 text-white flex items-center justify-center mb-10 shadow-2xl shadow-sky-200 group-hover:scale-110 transition-transform">
                            <Zap className="w-10 h-10" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-950 mb-6 tracking-tighter uppercase leading-none">Visas <br />Électroniques</h3>
                        <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">
                            Thaïlande, Turquie, Égypte, Arabie Saoudite... Obtenez votre visa 100% en ligne en un temps record.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {["22 Pays", "Dès 24h", "Zéro Papier", "100% Succès"].map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs font-black text-slate-900 uppercase tracking-widest bg-white border border-slate-100 p-4 rounded-2xl">
                                    <CheckCircle2 className="w-4 h-4 text-sky-500" />
                                    {f}
                                </div>
                            ))}
                        </div>

                        <Link href="/tourisme/evisa">
                            <button className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-sky-600 transition-all flex items-center justify-center gap-3 shadow-xl">
                                Voir les destinations <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </motion.div>

                    {/* Consulaire Card */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="group bg-amber-50 rounded-[4rem] p-10 md:p-16 border border-amber-100 hover:bg-white hover:shadow-3xl hover:shadow-amber-100 transition-all duration-500 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[80px] rounded-full" />
                        <div className="w-20 h-20 rounded-3xl bg-amber-500 text-white flex items-center justify-center mb-10 shadow-2xl shadow-amber-200 group-hover:scale-110 transition-transform">
                            <CalendarDays className="w-10 h-10" />
                        </div>
                        <h3 className="text-4xl md:text-5xl font-black text-slate-950 mb-6 tracking-tighter uppercase leading-none">Dossiers <br />Consulaires</h3>
                        <p className="text-slate-500 text-lg font-medium mb-10 leading-relaxed">
                            Schengen (France, Espagne...), USA, Canada. Prise de RDV VFS/TLS et montage de dossier complet.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {["RDV VFS/TLS", "Aide Bancaire", "Réservations", "Vérification"].map((f, i) => (
                                <div key={i} className="flex items-center gap-3 text-xs font-black text-slate-900 uppercase tracking-widest bg-white border border-amber-100 p-4 rounded-2xl">
                                    <Sparkles className="w-4 h-4 text-amber-500" />
                                    {f}
                                </div>
                            ))}
                        </div>

                        <Link href="/tourisme/rdv-visa">
                            <button className="w-full py-6 bg-slate-950 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-amber-600 transition-all flex items-center justify-center gap-3 shadow-xl">
                                Liste des pays <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </motion.div>

                </div>
            </section>

            {/* ─── PROCESS ─── */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] mb-4">Comment ça marche</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase">Le voyage en <span className="text-sky-600 italic">3 étapes.</span></h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { step: "01", title: "Inscription", desc: "Créez votre compte et choisissez votre destination.", icon: <User className="w-6 h-6" /> },
                            { step: "02", title: "Documents", desc: "Uploadez vos pièces justificatives en ligne.", icon: <FileText className="w-6 h-6" /> },
                            { step: "03", title: "Validation", desc: "Nos experts valident et déposent votre demande.", icon: <ShieldCheck className="w-6 h-6" /> },
                        ].map((item, i) => (
                            <div key={i} className="relative text-center">
                                <div className="text-8xl font-black text-slate-200 absolute -top-10 left-1/2 -translate-x-1/2 opacity-50 z-0 tracking-tighter">
                                    {item.step}
                                </div>
                                <div className="relative z-10">
                                    <h4 className="text-xl font-black text-slate-950 uppercase tracking-widest mb-4 mt-10">{item.title}</h4>
                                    <p className="text-slate-500 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FINAL CTA ─── */}
            <section className="py-32 px-4 text-center">
                <div className="max-w-4xl mx-auto bg-slate-950 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden shadow-3xl shadow-sky-900/20">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/20 blur-[100px] rounded-full" />
                    <div className="relative z-10">
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight mb-8 uppercase">
                            Partez l'esprit <br /> <span className="text-sky-400 italic">tranquille.</span>
                        </h2>
                        <p className="text-slate-400 text-xl font-medium mb-12 max-w-lg mx-auto">
                            Confiez votre projet à l'agence de référence à Béjaïa.
                        </p>
                        <Link href="/contact">
                            <button className="px-12 py-7 bg-white text-slate-950 rounded-full font-black text-xl hover:bg-sky-50 transition-all flex items-center gap-4 mx-auto">
                                Prendre Rendez-vous <ArrowRight className="w-6 h-6" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}

