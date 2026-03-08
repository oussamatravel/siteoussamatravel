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
    GraduationCap,
    Globe2,
    Coins,
    BarChart3
} from "lucide-react";
import Link from "next/link";

interface StudyCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function StudyCalculator({ isOpen, onClose }: StudyCalculatorProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        level: "", // Current level
        targetLevel: "", // Licence, Master
        gpa: "", // Moyenne 0-20
        languageLevel: "", // B1, B2, C1
        budget: "", // Annual budget in €
    });
    const [results, setResults] = useState<any[]>([]);

    const evaluateChances = () => {
        const gpa = parseFloat(formData.gpa);
        const budget = parseInt(formData.budget);
        const lang = formData.languageLevel;

        const options = [
            {
                country: "France",
                chance: gpa >= 12 && lang !== "B1" ? "Haute" : (gpa >= 10 ? "Moyenne" : "Faible"),
                reason: "Campus France privilégie les dossiers réguliers et un bon niveau B2.",
                budgetMatch: budget >= 8000,
                color: "text-blue-600"
            },
            {
                country: "Canada",
                chance: gpa >= 13 && budget >= 15000 ? "Haute" : (gpa >= 11 && budget >= 12000 ? "Moyenne" : "Faible"),
                reason: "Le Canada exige une preuve de fonds solide et une bonne moyenne académique.",
                budgetMatch: budget >= 15000,
                color: "text-red-600"
            },
            {
                country: "Espagne",
                chance: gpa >= 11 ? "Haute" : "Moyenne",
                reason: "L'Espagne offre de bonnes opportunités si vous passez l'homologation UNED.",
                budgetMatch: budget >= 7000,
                color: "text-yellow-600"
            },
            {
                country: "Allemagne",
                chance: gpa >= 12 && lang === "C1" ? "Haute" : (gpa >= 11 ? "Moyenne" : "Faible"),
                reason: "L'Allemagne est gratuite mais exige un niveau de langue (Allemand ou Anglais) élevé.",
                budgetMatch: budget >= 11000,
                color: "text-slate-800"
            }
        ];

        setResults(options);
    };

    useEffect(() => {
        if (step === 5) evaluateChances();
    }, [step]);

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl" />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="bg-blue-600 p-8 text-white flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black uppercase tracking-tight">Analyseur d'Admission</h2>
                                    <p className="text-xs text-blue-100 font-bold uppercase tracking-widest opacity-70">Évaluez vos chances gratuitement</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-all">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-10 overflow-y-auto flex-1 custom-scrollbar">
                            {step < 5 ? (
                                <div className="space-y-10">
                                    {/* Progress */}
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4].map(s => (
                                            <div key={s} className={`h-1.5 flex-grow rounded-full transition-all duration-500 ${s <= step ? 'bg-blue-600' : 'bg-slate-100'}`} />
                                        ))}
                                    </div>

                                    {step === 1 && (
                                        <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <BarChart3 className="w-4 h-4" /> Niveau Actuel & Cible
                                            </label>
                                            <div className="grid gap-4">
                                                <p className="text-xs font-bold text-slate-500">Je souhaite postuler pour un(e) :</p>
                                                {["Licence / Bachelor", "Master / MBA", "Doctorat (PhD)", "Formation Pro / BTS"].map(lvl => (
                                                    <button
                                                        key={lvl}
                                                        onClick={() => setFormData({ ...formData, targetLevel: lvl })}
                                                        className={`p-6 rounded-2xl text-left font-black text-sm transition-all border-2 ${formData.targetLevel === lvl ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-50 bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                                    >
                                                        {lvl}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Moyenne Académique (SUR 20)</label>
                                            <div className="space-y-4">
                                                <input
                                                    type="number"
                                                    step="0.01"
                                                    value={formData.gpa}
                                                    onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                                                    placeholder="Ex: 14.50"
                                                    className="w-full text-5xl font-black text-blue-600 bg-slate-50 border-none p-10 rounded-[2.5rem] focus:ring-0 placeholder:text-slate-200"
                                                />
                                                <p className="text-xs text-slate-400 font-medium italic">Utilisez votre moyenne du dernier diplôme ou de l'année en cours.</p>
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <Globe2 className="w-4 h-4" /> Maîtrise des Langues
                                            </label>
                                            <div className="grid gap-4">
                                                <p className="text-xs font-bold text-slate-500 italic">Meilleur niveau validé (Français ou Anglais) :</p>
                                                {[
                                                    { id: "C1", label: "C1 / C2 (Expert)", desc: "TCF 500+ ou IELTS 7.5+" },
                                                    { id: "B2", label: "B2 (Avancé)", desc: "TCF 400-499 ou IELTS 6.5" },
                                                    { id: "B1", label: "B1 (Intermédiaire)", desc: "TCF 300-399 ou IELTS 5.5" },
                                                    { id: "NONE", label: "Aucun test / Débutant" }
                                                ].map(lang => (
                                                    <button
                                                        key={lang.id}
                                                        onClick={() => setFormData({ ...formData, languageLevel: lang.id })}
                                                        className={`p-6 rounded-2xl text-left transition-all border-2 ${formData.languageLevel === lang.id ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-50 bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                                                    >
                                                        <div className="font-black text-sm uppercase">{lang.label}</div>
                                                        <div className="text-[10px] font-bold text-slate-400">{lang.desc}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 4 && (
                                        <motion.div key="s4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <Coins className="w-4 h-4" /> Budget Annuel Disponible (€)
                                            </label>
                                            <div className="grid grid-cols-2 gap-4">
                                                {[
                                                    { id: "5000", label: "< 7000 €" },
                                                    { id: "8500", label: "8000 - 10000 €" },
                                                    { id: "12000", label: "10000 - 15000 €" },
                                                    { id: "20000", label: "15000 € +" }
                                                ].map(b => (
                                                    <button
                                                        key={b.id}
                                                        onClick={() => setFormData({ ...formData, budget: b.id })}
                                                        className={`p-8 rounded-[2rem] font-black text-sm uppercase transition-all border-2 ${formData.budget === b.id ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-50 bg-slate-50 text-slate-400'}`}
                                                    >
                                                        {b.label}
                                                    </button>
                                                ))}
                                            </div>
                                            <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest">Inclut frais de scolarité + vie</p>
                                        </motion.div>
                                    )}

                                    {/* Navigation */}
                                    <div className="flex justify-between items-center pt-10 border-t border-slate-100">
                                        <button onClick={handleBack} disabled={step === 1} className="text-slate-400 font-bold uppercase text-[10px] tracking-widest hover:text-blue-600 disabled:opacity-0 transition-all flex items-center gap-2">
                                            <ChevronLeft className="w-4 h-4" /> Précédent
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            disabled={
                                                (step === 1 && !formData.targetLevel) ||
                                                (step === 2 && !formData.gpa) ||
                                                (step === 3 && !formData.languageLevel) ||
                                                (step === 4 && !formData.budget)
                                            }
                                            className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 shadow-xl shadow-slate-200 transition-all active:scale-95 disabled:opacity-20"
                                        >
                                            {step === 4 ? "Lancer l'Analyse" : "Continuer"} <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                                    <div className="text-center mb-10">
                                        <h3 className="text-2xl font-black uppercase tracking-tight italic">Votre Verdict Admission</h3>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Basé sur votre profil académique</p>
                                    </div>

                                    <div className="grid gap-4">
                                        {results.map((res, i) => (
                                            <div key={i} className="p-6 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between group hover:bg-white hover:shadow-xl transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center font-black ${res.color}`}>
                                                        {res.country[0]}
                                                    </div>
                                                    <div>
                                                        <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight">{res.country}</h4>
                                                        <p className="text-[10px] text-slate-500 font-medium max-w-[200px] leading-tight">{res.reason}</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${res.chance === 'Haute' ? 'text-emerald-500' : (res.chance === 'Moyenne' ? 'text-amber-500' : 'text-slate-400')}`}>
                                                        Chances : {res.chance}
                                                    </div>
                                                    <div className="flex gap-1 justify-end">
                                                        {[1, 2, 3].map(dot => (
                                                            <div key={dot} className={`w-1.5 h-1.5 rounded-full ${dot <= (res.chance === 'Haute' ? 3 : (res.chance === 'Moyenne' ? 2 : 1)) ? (res.chance === 'Haute' ? 'bg-emerald-500' : 'bg-amber-500') : 'bg-slate-200'}`} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-8 rounded-[2.5rem] bg-indigo-50 border border-indigo-100 flex items-start gap-4">
                                        <AlertCircle className="w-6 h-6 text-indigo-500 shrink-0 mt-1" />
                                        <div>
                                            <p className="text-xs font-bold text-indigo-900 leading-relaxed uppercase tracking-tight">
                                                {parseFloat(formData.gpa) < 11
                                                    ? "Votre moyenne est un peu juste pour les universités publiques. Nous vous conseillons de viser des écoles privées ou des hubs comme la Malaisie ou la Turquie."
                                                    : "Profil solide ! Vous avez de réelles opportunités en Europe et au Canada. Préparez vos tests de langue dès maintenant."}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 pt-4">
                                        <Link href="/contact" className="block">
                                            <button className="w-full py-6 bg-blue-600 text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition-all">
                                                Démarrer mon Dossier Études
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </Link>
                                        <button onClick={() => setStep(1)} className="w-full py-6 bg-slate-50 text-slate-400 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">Relancer l'Audit</button>
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
