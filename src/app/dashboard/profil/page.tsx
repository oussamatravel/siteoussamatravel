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
import { createClient } from "@/lib/supabase/client";

export default function ProfilPage() {
    const [mounted, setMounted] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    // Form States
    const [profileData, setProfileData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        city: "",
        birth_date: "",
        avatar_url: null as string | null
    });

    useEffect(() => {
        setMounted(true);
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (profile) {
                setProfileData({
                    first_name: profile.first_name || "",
                    last_name: profile.last_name || "",
                    email: user.email || "",
                    phone: profile.phone || "",
                    city: profile.city || "",
                    birth_date: profile.birth_date || "",
                    avatar_url: profile.avatar_url || null
                });
            }
        }
    };

    const handleSave = async () => {
        setIsSaving(true);
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return;

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    first_name: profileData.first_name,
                    last_name: profileData.last_name,
                    phone: profileData.phone,
                    city: profileData.city,
                    birth_date: profileData.birth_date || null,
                })
                .eq('id', user.id);

            if (error) throw error;

            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (err: any) {
            alert("Erreur lors de la mise à jour : " + err.message);
        } finally {
            setIsSaving(false);
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsSaving(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Non authentifié");

            // 1. Upload to Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}/${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file, { upsert: true });

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            // 3. Update Profile
            const { error: updateError } = await supabase
                .from('profiles')
                .update({ avatar_url: publicUrl })
                .eq('id', user.id);

            if (updateError) throw updateError;

            setProfileData({ ...profileData, avatar_url: publicUrl });
            alert("Photo de profil mise à jour !");
        } catch (err: any) {
            alert("Erreur avatar : " + err.message);
        } finally {
            setIsSaving(false);
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
                        <div className="w-32 h-32 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden relative">
                            {profileData.avatar_url ? (
                                <img src={profileData.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <UserCircle className="w-20 h-20" />
                            )}
                            {isSaving && (
                                <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                                </div>
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
                            disabled={isSaving}
                            className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full border-4 border-white hover:scale-110 transition-transform shadow-lg disabled:opacity-50"
                        >
                            <Camera className="w-4 h-4" />
                        </button>
                    </div>

                    <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{profileData.first_name || "Utilisateur"} {profileData.last_name}</h2>
                    <p className="text-gray-500 font-medium mb-6">Client Oussama Travel</p>

                    <div className="w-full space-y-3">
                        <div className="flex items-center gap-3 p-3 bg-emerald-50 text-emerald-700 font-bold text-sm rounded-xl border border-emerald-100">
                            <ShieldCheck className="w-5 h-5" />
                            Compte Vérifié
                        </div>
                        {profileData.city && (
                            <div className="flex items-center gap-3 p-3 bg-slate-50 text-slate-600 font-bold text-sm rounded-xl border border-slate-100">
                                <MapPin className="w-5 h-5" />
                                {profileData.city}
                            </div>
                        )}
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
                                <label className="block text-sm font-bold text-gray-700 mb-2">Prénom</label>
                                <input
                                    type="text"
                                    value={profileData.first_name}
                                    onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all font-medium text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Nom</label>
                                <input
                                    type="text"
                                    value={profileData.last_name}
                                    onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all font-medium text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Email (Non modifiable)</label>
                                <input
                                    type="email"
                                    disabled
                                    value={profileData.email}
                                    className="w-full px-4 py-3 bg-slate-100 border border-slate-100 rounded-xl font-medium text-gray-400 cursor-not-allowed"
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
                                <label className="block text-sm font-bold text-gray-700 mb-2">Ville</label>
                                <input
                                    type="text"
                                    value={profileData.city}
                                    onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
                                    placeholder="Ex: Alger"
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-none transition-all font-medium text-gray-900"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Date de naissance</label>
                                <input
                                    type="date"
                                    value={profileData.birth_date}
                                    onChange={(e) => setProfileData({ ...profileData, birth_date: e.target.value })}
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
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

