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
    Star,
    Building2,
    GraduationCap
} from "lucide-react";
import Link from "next/link";

interface FranceCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function FranceCalculator({ isOpen, onClose }: FranceCalculatorProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        education: "",
        experience: "",
        salary: "",
        project: ""
    });
    const [result, setResult] = useState({ eligible: false, type: "" });

    const evaluate = () => {
        let isEligible = false;
        let type = "Standard";

        // Logic for Passeport Talent
        if (formData.education === "MASTER_PLUS" && parseInt(formData.salary) >= 42406) {
            isEligible = true;
            type = "Passeport Talent (Salarié Qualifié)";
        } else if (formData.project === "BUSINESS" && parseInt(formData.experience) >= 5) {
            isEligible = true;
            type = "Passeport Talent (Créateur d'Entreprise)";
        } else if (formData.education === "PHD") {
            isEligible = true;
            type = "Passeport Talent (Chercheur)";
        }

        setResult({ eligible: isEligible, type });
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
                        <div className="bg-blue-600 p-8 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Star className="w-6 h-6" />
                                <h2 className="text-xl font-black uppercase tracking-tight">Audit Éligibilité France</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                        </div>

                        <div className="p-10">
                            {step < 5 ? (
                                <div className="space-y-8">
                                    <div className="flex gap-2">
                                        {[1, 2, 3, 4].map(s => (
                                            <div key={s} className={`h-1.5 flex-grow rounded-full transition-colors ${s <= step ? 'bg-blue-600' : 'bg-slate-100'}`} />
                                        ))}
                                    </div>

                                    {step === 1 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                                                <GraduationCap className="w-4 h-4" /> Niveau d'études actuel
                                            </label>
                                            <div className="grid gap-3">
                                                {[
                                                    { id: "MASTER_PLUS", label: "Master / MBA / Ph.D" },
                                                    { id: "LICENCE", label: "Licence / Bac +3" },
                                                    { id: "OTHER", label: "Autre / Expérience Pro Seule" }
                                                ].map(item => (
                                                    <button
                                                        key={item.id}
                                                        onClick={() => setFormData({ ...formData, education: item.id })}
                                                        className={`p-6 rounded-3xl text-left font-bold transition-all ${formData.education === item.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
                                                    >
                                                        {item.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 2 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Années d'expérience professionnelle</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {["0-2", "3-5", "5-10", "10+"].map(exp => (
                                                    <button
                                                        key={exp}
                                                        onClick={() => setFormData({ ...formData, experience: exp.replace('+', '') })}
                                                        className={`p-6 rounded-3xl font-bold transition-all ${formData.experience === exp.replace('+', '') ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600'}`}
                                                    >
                                                        {exp} ans
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    {step === 3 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Salaire annuel brut envisagé (€)</label>
                                            <input
                                                type="number"
                                                value={formData.salary}
                                                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                                                placeholder="Ex: 45000"
                                                className="w-full text-4xl font-black text-slate-900 bg-slate-50 border-none p-6 rounded-3xl focus:ring-2 focus:ring-blue-500"
                                            />
                                            <p className="mt-4 text-xs text-slate-400 font-medium italic">Note : Le Passeport Talent requiert souvent un seuil minimal de rémunération.</p>
                                        </motion.div>
                                    )}

                                    {step === 4 && (
                                        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                                            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Type de projet en France</label>
                                            <div className="grid gap-3">
                                                {[
                                                    { id: "SALARY", label: "Salarié dans une entreprise française" },
                                                    { id: "BUSINESS", label: "Création d'entreprise / Investissement" },
                                                    { id: "FAMILY", label: "Rejoindre un membre de ma famille" }
                                                ].map(p => (
                                                    <button
                                                        key={p.id}
                                                        onClick={() => setFormData({ ...formData, project: p.id })}
                                                        className={`p-6 rounded-3xl text-left font-bold transition-all ${formData.project === p.id ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-600'}`}
                                                    >
                                                        {p.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}

                                    <div className="flex justify-between pt-10">
                                        <button onClick={() => setStep(step - 1)} disabled={step === 1} className="text-slate-400 font-bold uppercase text-[10px] tracking-widest disabled:opacity-0 transition-opacity flex items-center gap-2"><ChevronLeft className="w-4 h-4" /> Retour</button>
                                        <button
                                            onClick={() => setStep(step + 1)}
                                            disabled={(step === 1 && !formData.education) || (step === 2 && !formData.experience) || (step === 3 && !formData.salary) || (step === 4 && !formData.project)}
                                            className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all disabled:opacity-30"
                                        >
                                            {step === 4 ? "Voir le Verdict" : "Suivant"} <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                    <div className={`p-8 rounded-[3rem] mb-8 text-left border ${result.eligible ? 'bg-emerald-50 border-emerald-100' : 'bg-amber-50 border-amber-100'}`}>
                                        <h4 className={`text-2xl font-black mb-4 ${result.eligible ? 'text-emerald-900' : 'text-amber-900'}`}>{result.eligible ? "Excellente Nouvelle !" : "Profil en cours d'analyse"}</h4>
                                        <p className="text-sm font-medium leading-relaxed text-slate-600 mb-6">
                                            {result.eligible
                                                ? `Votre profil correspond aux critères du ${result.type}. Cette voie facilite grandement votre installation en France sans passer par le regroupement standard.`
                                                : "Votre situation actuelle nécessite une étude plus approfondie des textes du CESEDA. Nous pouvons explorer d'autres voies comme le visa visiteur ou la recherche d'un employeur spécifique."}
                                        </p>
                                        <div className="flex items-center gap-3 p-4 bg-white/50 rounded-2xl">
                                            <div className={`w-3 h-3 rounded-full ${result.eligible ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Statut estimatif : {result.eligible ? 'Éligible' : 'Audit Requis'}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <Link href="/contact" className="block">
                                            <button className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl shadow-blue-600/20 transition-all">
                                                {result.eligible ? "Déposer mon Dossier France" : "Parler à notre équipe"}
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
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
