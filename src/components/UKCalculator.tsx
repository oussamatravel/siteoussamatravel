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
    Crown,
    Landmark,
    Briefcase,
    Check
} from "lucide-react";
import Link from "next/link";

interface UKCalculatorProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UKCalculator({ isOpen, onClose }: UKCalculatorProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        jobOffer: false,
        skillLevel: false,
        english: false,
        salary: false
    });
    const [score, setScore] = useState(0);

    const calculate = () => {
        let pts = 0;
        if (formData.jobOffer) pts += 20;
        if (formData.skillLevel) pts += 20;
        if (formData.english) pts += 10;
        if (formData.salary) pts += 20;
        setScore(pts);
    };

    useEffect(() => {
        if (step === 2) calculate();
    }, [step]);

    const isEligible = score === 70;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative w-full max-w-2xl bg-white rounded-[3rem] overflow-hidden shadow-2xl">
                        <div className="bg-[#001b44] p-8 text-white flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Crown className="w-5 h-5 text-amber-500" />
                                <h2 className="text-xl font-black uppercase tracking-tight">Vérification Points UK</h2>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                        </div>

                        <div className="p-10">
                            {step === 1 ? (
                                <div className="space-y-6">
                                    <p className="text-sm font-medium text-slate-500 mb-8 leading-relaxed">Le système britannique (PBS) exige exactement 70 points pour le Skilled Worker Visa. Cochez les critères que vous remplissez :</p>

                                    {[
                                        { id: "jobOffer", label: "Offre d'emploi d'un sponsor agréé", pts: 20 },
                                        { id: "skillLevel", label: "Emploi au niveau de compétence approprié", pts: 20 },
                                        { id: "english", label: "Anglais niveau B1 ou plus (IELTS UKVI)", pts: 10 },
                                        { id: "salary", label: "Salaire minimal (> £26,200 ou taux du marché)", pts: 20 }
                                    ].map(crit => (
                                        <button
                                            key={crit.id}
                                            onClick={() => setFormData({ ...formData, [crit.id]: !formData[crit.id as keyof typeof formData] })}
                                            className={`w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all ${formData[crit.id as keyof typeof formData] ? 'border-amber-500 bg-amber-50' : 'border-slate-100 hover:border-slate-200'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${formData[crit.id as keyof typeof formData] ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-300'}`}>
                                                    <Check className="w-4 h-4" />
                                                </div>
                                                <span className={`font-bold text-sm ${formData[crit.id as keyof typeof formData] ? 'text-amber-900' : 'text-slate-600'}`}>{crit.label}</span>
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{crit.pts} pts</span>
                                        </button>
                                    ))}

                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full py-6 mt-8 bg-[#001b44] text-white rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-xl"
                                    >
                                        Vérifier mon Total Points <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
                                    <div className="mb-10">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Total des Points</div>
                                        <div className={`text-9xl font-black tracking-tighter mb-4 ${isEligible ? 'text-emerald-500' : 'text-amber-500'}`}>{score}</div>
                                        <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">/ 70 Points Requis</div>
                                    </div>

                                    <div className={`p-8 rounded-[3rem] mb-12 text-left border ${isEligible ? 'bg-emerald-50 border-emerald-100' : 'bg-slate-50 border-slate-100'}`}>
                                        <h4 className={`text-xl font-black mb-2 uppercase tracking-tight ${isEligible ? 'text-emerald-900' : 'text-slate-900'}`}>
                                            {isEligible ? "Visa Prêt au Dépôt" : "Critères à Compléter"}
                                        </h4>
                                        <p className="text-sm font-medium leading-relaxed text-slate-600">
                                            {isEligible
                                                ? "Félicitations ! Vous remplissez les 4 conditions obligatoires pour le Skilled Worker Visa. Oussama Travel peut désormais lancer votre demande de Certificate of Sponsorship (CoS)."
                                                : "Le système britannique est strict : il vous faut 70 points obligatoires. Nous pouvons vous aider à trouver un employeur agréé ou à préparer vos tests d'anglais UKVI."}
                                        </p>
                                    </div>

                                    <div className="space-y-4">
                                        <Link href="/contact" className="block">
                                            <button className="w-full py-6 bg-[#001b44] text-white rounded-3xl font-black text-lg flex items-center justify-center gap-3 hover:bg-[#002b66] transition-all shadow-xl">
                                                {isEligible ? "Démarrer ma Procédure UK" : "Obtenir les Points Manquants"}
                                                <ArrowRight className="w-5 h-5" />
                                            </button>
                                        </Link>
                                        <button onClick={() => setStep(1)} className="w-full py-6 bg-slate-50 text-slate-400 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-slate-100 transition-all">Relancer l'audit</button>
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
