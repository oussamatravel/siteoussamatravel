"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Eye, Lock, FileKey } from "lucide-react";

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-50 pt-48 pb-24 px-4 font-sans text-slate-900">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className="w-16 h-16 bg-sky-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Lock className="w-8 h-8 text-sky-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Politique de Confidentialité</h1>
                    <p className="text-lg text-slate-500 font-medium tracking-tight uppercase">Sûreté & Transparence des Données</p>
                </motion.div>

                <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-sm space-y-12">
                    <section>
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                <Eye className="w-4 h-4 text-emerald-500" />
                            </div>
                            Collecte des Données
                        </h2>
                        <p className="text-slate-600 font-medium leading-relaxed mb-6">
                            Dans le cadre de nos services d'obtention de visas, d'admissions universitaires et de traitement d'immigration, nous collectons les informations suivantes via notre Espace Client :
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Identité (Nom, Prénom, Sexe, Date de Naissance)",
                                "Documents d'identité (Passeports, Cartes nationales)",
                                "Informations de contact (Email, Téléphone, Adresse)",
                                "Informations financières (Preuves de fonds pour visas)",
                                "Parcours académique (Diplômes, Relevés de notes)",
                                "Données de navigation (Cookies, Adresse IP)"
                            ].map((item, i) => (
                                <div key={i} className="flex gap-3 p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
                                    <div className="w-2 h-2 rounded-full bg-sky-500 mt-2"></div>
                                    <p className="text-sm font-bold text-slate-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="border-t border-slate-50 pt-12">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center">
                                <ShieldCheck className="w-4 h-4 text-sky-500" />
                            </div>
                            Utilisation & Conservation
                        </h2>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Vos données sont utilisées exclusivement pour la préparation de vos dossiers consulaires et l'envoi de mises à jour sur vos procédures en cours.
                            Elles sont conservées pendant une durée de <strong>5 ans</strong> après la clôture de votre dossier, conformément aux régulations légales en vigueur en Algérie.
                        </p>
                    </section>

                    <section className="border-t border-slate-50 pt-12">
                        <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
                                <FileKey className="w-4 h-4 text-amber-500" />
                            </div>
                            Sécurité & Partage
                        </h2>
                        <p className="text-slate-600 font-medium leading-relaxed mb-6">
                            Nous appliquons des standards de sécurité bancaire pour protéger vos informations :
                        </p>
                        <ul className="space-y-4">
                            <li className="flex gap-4 p-5 bg-sky-50 text-sky-900 rounded-3xl border border-sky-100 font-bold text-sm">
                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm font-black text-sky-500 text-[10px]">01</div>
                                Chiffrement SSL/TLS pour tous les transferts de fichiers.
                            </li>
                            <li className="flex gap-4 p-5 bg-emerald-50 text-emerald-900 rounded-3xl border border-emerald-100 font-bold text-sm">
                                <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm font-black text-emerald-500 text-[10px]">02</div>
                                Stockage sur serveurs redondants et sécurisés (AES-256).
                            </li>
                            <li className="flex gap-4 p-5 bg-slate-900 text-white rounded-3xl border border-slate-800 font-bold text-sm">
                                <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0 shadow-sm font-black text-amber-400 text-[10px]">03</div>
                                AUCUN partage avec des tiers à des fins commerciales. Seules les autorités consulaires et académiques reçoivent vos données pour le traitement de vos demandes.
                            </li>
                        </ul>
                    </section>

                    <section className="border-t border-slate-50 pt-12">
                        <h2 className="text-2xl font-black mb-6">Vos Droits</h2>
                        <p className="text-slate-600 font-medium leading-relaxed">
                            Conformément à la loi 18-07 relative à la protection des personnes physiques dans le traitement des données à caractère personnel, vous disposez d'un droit d'accès, de rectification et d'effacement de vos données.
                            Toutes ces actions peuvent être effectuées directement depuis votre <strong>Espace Client</strong> ou par simple demande par mail.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
