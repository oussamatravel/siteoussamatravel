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
    AlertCircle,
    Phone
} from "lucide-react";
import Link from "next/link";

interface CRSCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CRSCalculator({ isOpen, onClose }: CRSCalculatorProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        age: "",
        education: "",
        officialLanguage: "", // CLB Level
        workExperience: "", // Foreign years
        canadianWorkExperience: "",
        jobOffer: false,
        nomination: false,
        siblingInCanada: false
    });
    const [score, setScore] = useState(0);

    const calculateScore = () => {
        let total = 0;

        // 1. Age (Simple logic)
        const age = parseInt(formData.age);
        if (age >= 20 && age <= 29) total += 110;
        else if (age >= 30 && age <= 44) total += Math.max(0, 110 - (age - 29) * 5);
        else if (age >= 18 && age <= 19) total += 95;

        // 2. Education
        if (formData.education === "PHD") total += 150;
        else if (formData.education === "MASTER") total += 135;
        else if (formData.education === "BACHELOR") total += 120;
        else if (formData.education === "DIPLOMA") total += 98;

        // 3. Official Language (First Language)
        if (formData.officialLanguage === "CLB9") total += 136; // 34*4
        else if (formData.officialLanguage === "CLB8") total += 92; // 23*4
        else if (formData.officialLanguage === "CLB7") total += 68; // 17*4

        // 4. Work Experience (Foreign)
        const exp = parseInt(formData.workExperience);
        if (exp >= 3) total += 50;
        else if (exp === 2) total += 25;
        else if (exp === 1) total += 13;

        // 5. Additional Points
        if (formData.nomination) total += 600;
        if (formData.jobOffer) total += 50;
        if (formData.siblingInCanada) total += 15;

        setScore(total);
    };

    useEffect(() => {
        if (step === 5) calculateScore();
    }, [step]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const isEligible = score >= 480; // Threshold for decent chance

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-red-600 p-8 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Calculator className="w-6 h-6" />
                                <h2 className="text-xl font-black uppercase tracking-tight">Simulateur Score CRS</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-10">
                            {step < 5 ? (
                                <div className="space-y-8">
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4].map(s => (
                                            <div
                                                key={s}
                                                className={`h-1.5 flex-grow rounded-full transition-colors ${s <= step ? 'bg-red-600' : 'bg-slate-100'}`}
                                            />
                                        ))}
                                    </div>

                                    {step === 1 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Quel est votre âge ?</label>
                                            <input
                                                type="number"
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                placeholder="Ex: 28"
                                                className="w-full text-4xl font-black text-slate-900 bg-slate-50 border-none p-6 rounded-3xl focus:ring-2 focus:ring-red-500"
                                            />
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Niveau d'études le plus élevé ?</label>
                                            <div className="grid gap-3">
                                                {[
                                                    { id: "PHD", label: "Doctorat (Ph.D)" },
                                                    { id: "MASTER", label: "Maîtrise / Master" },
                                                    { id: "BACHELOR", label: "Baccalauréat / Licence" },
                                                    { id: "DIPLOMA", label: "Diplôme Post-Secondaire (2-3 ans)" }
                                                ].map(edu => (
                                                    <button
                                                        key={edu.id}
                                                        onClick={() => setFormData({ ...formData, education: edu.id })}
                                                        className={`p-6 rounded-3xl text-left font-bold transition-all ${formData.education === edu.id ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                                    >
                                                        {edu.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Niveau de langue (IELTS ou TEF) ?</label>
                                            <div className="grid gap-3">
                                                {[
                                                    { id: "CLB9", label: "CLB 9+ (Excellent/Expert)", desc: "Ex: IELTS 8.0L, 7.0R, 7.0W, 7.0S" },
                                                    { id: "CLB8", label: "CLB 8 (Très bon)", desc: "Ex: IELTS 7.5L, 6.5R, 6.5W, 6.5S" },
                                                    { id: "CLB7", label: "CLB 7 (Bon/Standard)", desc: "Ex: IELTS 6.0 partout" }
                                                ].map(lang => (
                                                    <button
                                                        key={lang.id}
                                                        onClick={() => setFormData({ ...formData, officialLanguage: lang.id })}
                                                        className={`p-6 rounded-3xl text-left transition-all ${formData.officialLanguage === lang.id ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                                    >
                                                        <div className="font-bold">{lang.label}</div>
                                                        <div className={`text-xs ${formData.officialLanguage === lang.id ? 'text-white/70' : 'text-slate-400'}`}>{lang.desc}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 4 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Expérience professionnelle (années) ?</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {[
                                                    { id: "0", label: "Aucune" },
                                                    { id: "1", label: "1 an" },
                                                    { id: "2", label: "2 ans" },
                                                    { id: "3", label: "3 ans ou +" }
                                                ].map(e => (
                                                    <button
                                                        key={e.id}
                                                        onClick={() => setFormData({ ...formData, workExperience: e.id })}
                                                        className={`p-6 rounded-3xl font-bold transition-all ${formData.workExperience === e.id ? 'bg-red-600 text-white' : 'bg-slate-50 text-slate-600'}`}
                                                    >
                                                        {e.label}
                                                    </button>
                                                ))}
                                            </div>
                                            <div className="mt-8 space-y-4">
                                                <button
                                                    onClick={() => setFormData({ ...formData, siblingInCanada: !formData.siblingInCanada })}
                                                    className={`w-full flex items-center justify-between p-4 rounded-2xl border ${formData.siblingInCanada ? 'border-red-600 bg-red-50 text-red-600' : 'border-slate-100'}`}
                                                >
                                                    <span className="text-sm font-bold">Frère/Sœur au Canada ?</span>
                                                    {formData.siblingInCanada ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border border-slate-200" />}
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="flex justify-between pt-10">
                                        {step > 1 ? (
                                            <button onClick={handleBack} className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-slate-900 transition-colors">
                                                <ChevronLeft className="w-4 h-4" /> Retour
                                            </button>
                                        ) : <div />}
                                        <button
                                            onClick={handleNext}
                                            disabled={(step === 1 && !formData.age) || (step === 2 && !formData.education) || (step === 3 && !formData.officialLanguage) || (step === 4 && !formData.workExperience)}
                                            className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-red-600 transition-all"
                                        >
                                            {step === 4 ? "Calculer mon score" : "Continuer"}
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                    <div className="mb-10">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Votre Score Estimé</div>
                                        <div className="text-8xl font-black text-red-600 tracking-tighter mb-4">{score}</div>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[10px] font-black uppercase text-slate-500">
                                            Points CRS
                                        </div>
                                    </div>

                                    <div className={`p-8 rounded-[2rem] mb-12 flex items-start gap-4 text-left ${isEligible ? 'bg-emerald-50 border border-emerald-100' : 'bg-amber-50 border border-amber-100'}`}>
                                        {isEligible ? <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" /> : <AlertCircle className="w-8 h-8 text-amber-500 shrink-0" />}
                                        <div>
                                            <h4 className={`text-lg font-black uppercase tracking-tight mb-2 ${isEligible ? 'text-emerald-900' : 'text-amber-900'}`}>
                                                {isEligible ? "Excellent Profil !" : "Profil à Optimiser"}
                                            </h4>
                                            <p className={`text-sm font-medium leading-relaxed ${isEligible ? 'text-emerald-700' : 'text-amber-700'}`}>
                                                {isEligible
                                                    ? "Votre score est supérieur à la moyenne des derniers tirages. Vous avez de fortes chances d'obtenir une Invitation à Présenter une Demande (ITA) rapidement."
                                                    : "Votre score est un peu juste pour les tirages actuels. Ne vous découragez pas : il existe des leviers (amélioration de l'anglais, nomination provinciale) pour booster vos points."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Link href="/contact" className="block">
                                            <button className="w-full py-6 bg-red-600 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-red-700 shadow-xl shadow-red-600/20 transition-all">
                                                {isEligible ? "Commencer ma Procédure" : "Optimiser mon Score avec nous"}
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => setStep(1)}
                                            className="w-full py-6 bg-slate-50 text-slate-400 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all"
                                        >
                                            Refaire le test
                                        </button>
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
