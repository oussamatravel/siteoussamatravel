"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    UserCircle,
    Mail,
    Phone,
    MapPin,
    ShieldCheck,
    CreditCard,
    Bell,
    Key,
    Save,
    Camera,
    Users,
    Check,
    Loader2
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function ProfilPage() {
    const [mounted, setMounted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Form States
    const [profileData, setProfileData] = useState({
        name: "Oussama Travel",
        email: "oussama@travel.dz",
        phone: "+213 555 12 34 56",
        city: "Alger / Bejaia",
        profilePic: null as string | null
    });

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        // Simulation d'enregistrement
        setTimeout(() => {
            setIsSaving(false);
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        }, 1500);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileData({ ...profileData, profilePic: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    if (!mounted) return null;

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Mon Profil</h1>
                    <p className="text-gray-600">Gérez vos informations personnelles et vos préférences de sécurité.</p>
                </div>

                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-lg shadow-emerald-200 flex items-center gap-2 font-bold"
                        >
                            <Check className="w-5 h-5" />
                            Profil mis à jour !
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                {/* Profile Card Left */}
                <div className="lg:col-span-1 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm flex flex-col items-center text-center sticky top-10">
                    <div className="relative group mb-6">
                        <div className="w-32 h-32 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                            {profileData.profilePic ? (
                                <img src={profileData.profilePic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <UserCircle className="w-20 h-20" />
                            )}
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            className="hidden"
                            accept="image/*"
                        />
                        <button
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full border-4 border-white hover:scale-110 transition-transform shadow-lg"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{profileData.name}</h2>
                    <p className="text-gray-500 font-medium mb-6">Client depuis Janvier 2024</p>

                    <div className="w-full space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-xl border border-emerald-100">
                            <ShieldCheck className="w-5 h-5" />
                            Compte Vérifié
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-sky-50 text-sky-700 font-bold text-sm rounded-xl border border-sky-100">
                            <Users className="w-5 h-5 text-sky-600" />
                            Candidat - Canada
                        </div>
                    </div>
                </div>

                {/* Settings / Forms Right */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Section 1: Informations Perso */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                            <UserCircle className="w-6 h-6 text-amber-500" />
                            Informations Personnelles
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nom Complet</label>
                                <input
                                    type="text"
                                    value={profileData.name}
                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all font-medium text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all font-medium text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Téléphone</label>
                                <input
                                    type="tel"
                                    value={profileData.phone}
                                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all font-medium text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ville de Résidence</label>
                                <input
                                    type="text"
                                    value={profileData.city}
                                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all font-medium text-gray-900"
                                />
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="mt-8 flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-all ml-auto disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Enregistrement...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Enregistrer les modifications
                                </>
                            )}
                        </button>
                    </motion.div>

                    {/* Section 2: Sécurité */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm"
                    >
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 border-b border-slate-50 pb-4">
                            <Key className="w-6 h-6 text-sky-500" />
                            Sécurité du Compte
                        </h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm"><Key className="w-5 h-5 text-gray-400" /></div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">Mot de passe</div>
                                        <div className="text-xs text-gray-500">Dernière modification : il y a 3 mois</div>
                                    </div>
                                </div>
                                <button className="px-4 py-2 border border-slate-200 text-gray-700 font-bold text-xs rounded-lg hover:bg-white transition-all uppercase tracking-wider">Changer</button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 opacity-60 grayscale pointer-events-none">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-white rounded-xl shadow-sm"><Bell className="w-5 h-5 text-gray-400" /></div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-sm">Authentification à 2 Facteurs (2FA)</div>
                                        <div className="text-xs text-red-500 font-bold italic">Désactivé</div>
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-emerald-500 text-white font-bold text-xs rounded-lg hover:bg-emerald-600 transition-all uppercase tracking-wider">Activer</button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

