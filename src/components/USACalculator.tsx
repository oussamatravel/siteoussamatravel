"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    Calculator,
    ArrowRight,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    Flag,
    Building2,
    GraduationCap,
    Zap
} from "lucide-react";
import Link from "next/link";

interface USACalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function USACalculator({ isOpen, onClose }: USACalculatorProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        education: "",
        experience: "",
        field: "",
        english: ""
    });
    const [result, setResult] = useState({ score: 0, status: "" });

    const evaluate = () => {
        let score = 0;
        if (formData.education === "MASTER_PHD") score += 40;
        if (formData.experience === "5PLUS") score += 30;
        if (formData.field === "STEM") score += 30;

        let status = "Profil Standard";
        if (score >= 90) status = "Excellent Potentiel (EB-2 NIW / O-1)";
        else if (score >= 60) status = "Candidat H-1B / EB-3 Potentiel";
        else status = "Audit Diversité Requis (DV Lottery)";

        setResult({ score, status });
    };

    useEffect(() => {
        if (step === 5) evaluate();
    }, [step]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl">
                        <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Flag className="w-5 h-5 text-red-500" />
                                <h2 className="text-xl font-black uppercase tracking-tight">Audit Éligibilité USA</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                        </div>

                        <div className="p-10">
                            {step < 5 ? (
                                <div className="space-y-8">
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4].map(s => (
                                            <div key={s} className={`h-1.5 flex-grow rounded-full transition-colors ${s <= step ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                                        ))}
                                    </div>

                                    {step === 1 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Niveau d'études</label>
                                            <div className="grid gap-3">
                                                {[
                                                    { id: "MASTER_PHD", label: "Master ou Doctorat (Ph.D)" },
                                                    { id: "BACHELOR", label: "Bachelor / Licence" },
                                                    { id: "OTHER", label: "Autre" }
                                                ].map(item => (
                                                    <button key={item.id} onClick={() => setFormData({ ...formData, education: item.id })} className={`p-6 rounded-3xl text-left font-bold transition-all ${formData.education === item.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600'}`}>{item.label}</button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Domaine d'activité</label>
                                            <div className="grid gap-3">
                                                {[
                                                    { id: "STEM", label: "STEM (Sciences, Technologie, Ingénierie, Math)" },
                                                    { id: "BUSINESS", label: "Commerce / Management" },
                                                    { id: "ARTS", label: "Arts / Culture / Autre" }
                                                ].map(item => (
                                                    <button key={item.id} onClick={() => setFormData({ ...formData, field: item.id })} className={`p-6 rounded-3xl text-left font-bold transition-all ${formData.field === item.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600'}`}>{item.label}</button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Années d'expérience professionnelle</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {[{ id: "NONE", l: "0-2 ans" }, { id: "MID", l: "3-5 ans" }, { id: "5PLUS", l: "5 ans+" }, { id: "10PLUS", l: "10 ans+" }].map(exp => (
                                                    <button key={exp.id} onClick={() => setFormData({ ...formData, experience: exp.id })} className={`p-6 rounded-3xl font-bold transition-all ${formData.experience === exp.id ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600'}`}>{exp.l}</button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 4 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Niveau d'anglais</label>
                                            <div className="grid gap-3">
                                                {["Courant / Professionnel", "Intermédiaire", "Débutant"].map(lv => (
                                                    <button key={lv} onClick={() => setFormData({ ...formData, english: lv })} className={`p-6 rounded-3xl text-left font-bold transition-all ${formData.english === lv ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-600'}`}>{lv}</button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="flex justify-between pt-10">
                                        <button onClick={() => setStep(step - 1)} disabled={step === 1} className="text-slate-400 font-bold uppercase text-[10px] tracking-widest disabled:opacity-0 flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Retour</button>
                                        <button onClick={() => setStep(step + 1)} disabled={(step === 1 && !formData.education) || (step === 2 && !formData.field) || (step === 3 && !formData.experience) || (step === 4 && !formData.english)} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-indigo-600 transition-all">
                                            {step === 4 ? "Lancer le Diagnostic" : "Suivant"} <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                    <div className="mb-8">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Diagnostic de Profil</div>
                                        <div className="text-3xl font-black text-slate-900 tracking-tighter">{result.status}</div>
                                    </div>

                                    <div className="p-8 rounded-[3rem] bg-slate-50 border border-slate-100 mb-10 text-left">
                                        <p className="text-sm font-medium leading-relaxed text-slate-600">
                                            {result.score >= 90
                                                ? "Votre profil présente un intérêt stratégique pour les USA. Vous pourriez être éligible à des catégories de visas de talent ou d'intérêt national qui accélèrent la Green Card."
                                                : "Votre profil est solide. Pour les USA, le succès dépend souvent de la connexion avec les bons employeurs ou d'une préparation méticuleuse pour la loterie."}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <Link href="/contact" className="block">
                                            <button className="w-full py-6 bg-indigo-600 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl shadow-indigo-600/20 transition-all">Lancer mon Dossier USA <ArrowRight className="w-5 h-5" /></button>
                                        </Link>
                                        <button onClick={() => setStep(1)} className="w-full py-6 bg-slate-50 text-slate-400 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all">Recommencer l'audit</button>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
