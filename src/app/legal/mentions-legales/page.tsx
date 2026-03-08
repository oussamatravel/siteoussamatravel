"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Scale, FileText, Info } from "lucide-react";

export default function MentionsLegales() {
    return (
        <div className="min-h-screen bg-slate-50 pt-48 pb-24 px-4 font-sans">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Scale className="w-8 h-8 text-sky-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">Mentions Légales</h1>
                    <p className="text-lg text-slate-500 font-medium tracking-tight uppercase">Oussama Travel Algeria (OTA)</p>
                </motion.div>

                <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-sm space-y-12">
                    <section>
                        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                <Info className="w-4 h-4 text-amber-500" />
                            </div>
                            Éditeur du Site
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-600 font-medium leading-relaxed">
                            <div className="p-6 bg-slate-50 rounded-2xl">
                                <p className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest text-sky-600">Société</p>
                                <p>SARL Oussama Travel Algeria</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl">
                                <p className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest text-sky-600">Adresse Siège</p>
                                <p>Coopérative Scala, en face la gare routière, Béjaïa, Algérie</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl">
                                <p className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest text-sky-600">Capital Social</p>
                                <p>1 000 000,00 DZD</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-2xl">
                                <p className="font-black text-slate-900 mb-2 uppercase text-xs tracking-widest text-sky-600">Numéro RCC</p>
                                <p>24B0123456-00/16</p>
                            </div>
                        </div>
                    </section>

                    <section className="border-t border-slate-50 pt-12">
                        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-sky-500" />
                            </div>
                            Hébergement
                        </h2>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Le site est hébergé par <strong>Vercel Inc.</strong>, situé au 440 N Barranca Ave #4133 Covina, CA 91723.
                            La maintenance technique et le développement sont assurés par les équipes internes de Oussama Travel.
                        </p>
                    </section>

                    <section className="border-t border-slate-50 pt-12">
                        <h2 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-emerald-500" />
                            </div>
                            Propriété Intellectuelle
                        </h2>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Tous les éléments du site (logo, textes, design, images, vidéos) sont la propriété exclusive de SARL Oussama Travel Algeria.
                            Toute reproduction, distribution ou modification sans autorisation préalable est strictement interdite par la loi algérienne et internationale.
                        </p>
                    </section>

                    <section className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <h3 className="text-xl font-black mb-4 flex items-center gap-3">
                            Contact Direction
                        </h3>
                        <p className="text-slate-400 font-medium mb-6">Pour toute réclamation ou question relative à ces mentions légales :</p>
                        <div className="flex flex-col md:flex-row gap-4">
                            <a href="mailto:directeur.ota@gmail.com" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all font-bold text-sm inline-block">directeur.ota@gmail.com</a>
                            <a href="tel:+213770419460" className="px-6 py-3 bg-amber-400 text-slate-900 hover:bg-amber-300 rounded-xl transition-all font-bold text-sm inline-block">+213 770 41 94 60</a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
