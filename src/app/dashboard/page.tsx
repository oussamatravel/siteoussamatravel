"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    AlertCircle,
    Clock,
    FileCheck2,
    FolderOpen,
    Plane,
    PlusCircle,
    ArrowRight,
    CheckCircle2,
    X,
    GraduationCap,
    ShieldCheck,
    Globe2,
    Calendar,
    Send
} from "lucide-react";
import { useState, useEffect } from "react";

export default function DashboardOverview() {
    const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
    const [requestStep, setRequestStep] = useState(1);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const stats = [
        { title: "Dossiers Actifs", value: "1", icon: <FolderOpen className="w-6 h-6 text-sky-500" />, bg: "bg-sky-50" },
        { title: "Documents Validés", value: "3/5", icon: <FileCheck2 className="w-6 h-6 text-emerald-500" />, bg: "bg-emerald-50" },
        { title: "Prochain Voyage", value: "À définir", icon: <Plane className="w-6 h-6 text-indigo-500" />, bg: "bg-indigo-50" },
    ];

    const serviceOptions = [
        { id: "etudes", name: "Études à l'étranger", icon: <GraduationCap className="w-6 h-6" />, color: "text-sky-500 bg-sky-50" },
        { id: "tourisme", name: "Visa Touriste / E-Visa", icon: <Plane className="w-6 h-6" />, color: "text-amber-500 bg-amber-50" },
        { id: "immigration", name: "Immigration Express", icon: <ShieldCheck className="w-6 h-6" />, color: "text-emerald-500 bg-emerald-50" },
        { id: "assistance", name: "Assistance Documents", icon: <FolderOpen className="w-6 h-6" />, color: "text-indigo-500 bg-indigo-50" },
    ];

    if (!mounted) return null;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-1">Bonjour, Oussama 👋</h1>
                    <p className="text-gray-500 font-medium tracking-tight">Bienvenue sur votre espace client. Voici l'état de vos demandes.</p>
                </div>
                <button
                    onClick={() => { setIsNewRequestModalOpen(true); setRequestStep(1); }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                    <PlusCircle className="w-5 h-5" />
                    Nouvelle demande
                </button>
            </div>

            {/* Alert / Notification Important */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex items-start gap-5 relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 blur-3xl rounded-full"></div>
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                    <AlertCircle className="w-6 h-6 text-amber-500" />
                </div>
                <div className="flex-1">
                    <h3 className="text-amber-900 font-black text-lg mb-1 uppercase tracking-tighter italic">Action Requise : Passeport Manquant</h3>
                    <p className="text-amber-800/80 font-bold text-sm mb-4 leading-relaxed">
                        Pour finaliser votre dossier de <strong className="text-amber-950 font-black uppercase">Visa d'Études Canada</strong>, nous avons besoin d'une copie claire de votre passeport valide.
                    </p>
                    <button className="bg-amber-500 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-amber-600 transition-all shadow-lg shadow-amber-200 active:scale-95">
                        Transmettre le document
                    </button>
                </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 border border-slate-100 bg-white rounded-[2rem] shadow-sm flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.title}</div>
                            <div className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Active Dossier */}
            <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-sm mb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                            <FolderOpen className="w-7 h-7" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Dossier en Cours</h2>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Référence: OT-2024-001</p>
                        </div>
                    </div>
                    <span className="px-5 py-2 bg-sky-50 text-sky-600 border border-sky-100 font-black text-[10px] uppercase tracking-widest rounded-full flex items-center gap-2 self-start md:self-center">
                        <Clock className="w-3 h-3" /> En Traitement par l'expert
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Timeline / Progress */}
                    <div className="space-y-8">
                        <h3 className="font-black text-slate-900 text-xl tracking-tight italic">Visa d'Études - Canada</h3>

                        <div className="relative pl-8 space-y-10 border-l-2 border-slate-100">
                            {/* Step 1: Done */}
                            <div className="relative">
                                <div className="absolute -left-[41px] w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                                    <CheckCircle2 className="w-4 h-4 text-white" />
                                </div>
                                <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">Ouverture du dossier</h4>
                                <p className="text-xs font-bold text-slate-400 mt-1">Formulaire validé le 12 Mars 2024.</p>
                            </div>

                            {/* Step 2: Ongoing (Action Req) */}
                            <div className="relative">
                                <div className="absolute -left-[41px] w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center border-4 border-white shadow-lg shadow-amber-200">
                                    <Clock className="w-4 h-4 text-white animate-pulse" />
                                </div>
                                <h4 className="font-black text-amber-600 text-sm uppercase tracking-tight italic">Analyse des documents</h4>
                                <p className="text-xs font-bold text-slate-500 mt-1">En attente de votre passeport scanné.</p>
                            </div>

                            {/* Step 3: Pending */}
                            <div className="relative opacity-30 grayscale">
                                <div className="absolute -left-[41px] w-8 h-8 bg-slate-200 rounded-xl flex items-center justify-center border-4 border-white"></div>
                                <h4 className="font-black text-slate-400 text-sm uppercase tracking-tight">Soumission consulaire</h4>
                                <p className="text-xs font-bold text-slate-300 mt-1">Prévu après validation documentaire.</p>
                            </div>
                        </div>
                    </div>

                    {/* Document Card Mini */}
                    <div className="space-y-8">
                        <h3 className="font-black text-slate-900 text-xl tracking-tight italic uppercase">Dernières Pièces</h3>
                        <div className="space-y-4">
                            <div className="p-5 border border-slate-100 bg-slate-50 rounded-2xl flex items-center justify-between hover:shadow-lg hover:bg-white transition-all cursor-pointer group">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:text-emerald-500 transition-colors">
                                        <FileCheck2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h4 className="font-black text-slate-800 text-sm">Diplôme Universitaire.pdf</h4>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Validé par l'agent Oussama</p>
                                    </div>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            </div>

                            <div className="p-5 border-2 border-dashed border-slate-200 bg-white rounded-2xl flex items-center justify-center hover:bg-slate-50 hover:border-sky-400 transition-all cursor-pointer text-slate-400 py-8 group">
                                <div className="text-center">
                                    <PlusCircle className="w-8 h-8 mx-auto mb-2 text-sky-500 group-hover:scale-110 transition-transform" />
                                    <span className="font-black text-xs uppercase tracking-widest">Importer un document</span>
                                </div>
                            </div>
                        </div>

                        <button className="font-black text-sky-600 flex items-center gap-2 hover:text-sky-700 text-xs uppercase tracking-widest pt-4">
                            Accéder au coffre-fort complet <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* New Request Modal */}
            <AnimatePresence>
                {isNewRequestModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsNewRequestModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col"
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-amber-500">
                                        <PlusCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Nouvelle Demande</h2>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Étape {requestStep} sur 2</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsNewRequestModalOpen(false)}
                                    className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-10">
                                {requestStep === 1 ? (
                                    <div className="space-y-8">
                                        <h3 className="text-lg font-black text-slate-900 italic tracking-tight uppercase">Quel service vous intéresse ?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {serviceOptions.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => setRequestStep(2)}
                                                    className="p-6 border border-slate-100 bg-slate-50 rounded-3xl flex flex-col items-center text-center gap-4 hover:shadow-xl hover:bg-white hover:border-amber-400 transition-all group"
                                                >
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${opt.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                                        {opt.icon}
                                                    </div>
                                                    <span className="font-black text-sm text-slate-800 uppercase tracking-tight">{opt.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <h3 className="text-lg font-black text-slate-900 italic tracking-tight uppercase">Dites-nous en plus</h3>
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pays de Destination</label>
                                                <div className="relative group">
                                                    <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <input type="text" placeholder="Ex: Canada, France, Turquie..." className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900" />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Date estimée de départ</label>
                                                <div className="relative group">
                                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <input type="date" className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900 uppercase" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between">
                                {requestStep === 2 ? (
                                    <button onClick={() => setRequestStep(1)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Retour</button>
                                ) : <div />}
                                <button
                                    onClick={() => {
                                        if (requestStep === 1) setRequestStep(2);
                                        else setIsNewRequestModalOpen(false);
                                    }}
                                    className="px-10 py-4 bg-slate-900 text-white font-black text-xs rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 uppercase tracking-widest flex items-center gap-3"
                                >
                                    {requestStep === 1 ? "Suivant" : "Lancer la demande"}
                                    {requestStep === 2 && <Send className="w-4 h-4" />}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
