"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, FileCheck2, FolderOpen, Plane, PlusCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function DashboardOverview() {
    const stats = [
        { title: "Dossiers Actifs", value: "1", icon: <FolderOpen className="w-6 h-6 text-sky-500" />, bg: "bg-sky-50" },
        { title: "Documents Validés", value: "3/5", icon: <FileCheck2 className="w-6 h-6 text-emerald-500" />, bg: "bg-emerald-50" },
        { title: "Prochain Voyage", value: "À définir", icon: <Plane className="w-6 h-6 text-indigo-500" />, bg: "bg-indigo-50" },
    ];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Bonjour, Oussama 👋</h1>
                    <p className="text-gray-600">Bienvenue sur votre espace client. Voici l'état de vos demandes.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-shadow shadow-lg">
                    <PlusCircle className="w-5 h-5" />
                    Nouvelle demande
                </button>
            </div>

            {/* Alert / Notification Important */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-6 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-4"
            >
                <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                    <h3 className="text-amber-800 font-bold text-lg mb-1">Action Requise : Passeport Manquant</h3>
                    <p className="text-amber-700 font-medium mb-3">Pour finaliser votre dossier de <strong className="font-extrabold">Visa d'Études Canada</strong>, nous avons besoin d'une copie claire de votre passeport.</p>
                    <button className="bg-amber-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-amber-700 transition-colors shadow-md">
                        Téléverser mon Passeport
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
                        className="p-6 border border-slate-100 bg-white rounded-2xl shadow-sm flex items-center gap-4"
                    >
                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg}`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-gray-500 text-sm font-medium mb-1">{stat.title}</div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Active Dossier */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm mb-10">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-6">
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <FolderOpen className="w-6 h-6 text-amber-500" />
                        Dossier en Cours
                    </h2>
                    <span className="px-4 py-1.5 bg-blue-50 text-blue-700 border border-blue-200 font-bold text-sm rounded-full flex items-center gap-2">
                        <Clock className="w-4 h-4" /> En Traitement
                    </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Timeline / Progress */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 text-lg">Visa d'Études - Canada</h3>

                        <div className="relative pl-6 space-y-8 border-l-2 border-slate-100">
                            {/* Step 1: Done */}
                            <div className="relative">
                                <div className="absolute -left-[35px] w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center border-4 border-white">
                                    <CheckCircle2 className="w-3 h-3 text-white" />
                                </div>
                                <h4 className="font-bold text-gray-900">Ouverture du dossier</h4>
                                <p className="text-sm text-gray-500">Formulaire rempli et frais initiaux validés.</p>
                            </div>

                            {/* Step 2: Ongoing (Action Req) */}
                            <div className="relative">
                                <div className="absolute -left-[35px] w-6 h-6 bg-amber-500 rounded-full border-4 border-white shadow-[0_0_0_4px_rgba(245,158,11,0.2)]"></div>
                                <h4 className="font-bold text-amber-600">Analyse des documents</h4>
                                <p className="text-sm font-medium text-gray-600">En attente de votre passeport.</p>
                            </div>

                            {/* Step 3: Pending */}
                            <div className="relative">
                                <div className="absolute -left-[35px] w-6 h-6 bg-slate-200 rounded-full border-4 border-white"></div>
                                <h4 className="font-bold text-gray-400">Soumission consulaire</h4>
                                <p className="text-sm text-gray-400">Prévu après validation documentaire.</p>
                            </div>
                        </div>
                    </div>

                    {/* Document Card Mini */}
                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 text-lg">Documents Récents</h3>
                        <div className="space-y-4">
                            <div className="p-4 border border-slate-100 bg-slate-50 rounded-xl flex items-center justify-between hover:border-blue-200 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <FileCheck2 className="w-8 h-8 text-emerald-500" />
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">Diplôme Universitaire.pdf</h4>
                                        <p className="text-xs text-gray-500">Validé par l'agent le 12 Mars</p>
                                    </div>
                                </div>
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            </div>

                            <div className="p-4 border border-dashed border-slate-300 bg-white rounded-xl flex items-center justify-center hover:bg-slate-50 transition-colors cursor-pointer text-gray-500 py-6">
                                <div className="text-center">
                                    <PlusCircle className="w-6 h-6 mx-auto mb-2 text-sky-500" />
                                    <span className="font-medium text-sm">Ajouter un nouveau document</span>
                                </div>
                            </div>
                        </div>

                        <button className="mt-6 font-bold text-sky-600 flex items-center gap-2 hover:text-sky-700 text-sm">
                            Voir le coffre-fort complet <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}
