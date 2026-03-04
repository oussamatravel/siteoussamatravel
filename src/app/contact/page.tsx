"use client";

import { motion } from "framer-motion";
import {
    Send,
    Phone,
    Mail,
    MapPin,
    Clock,
    CheckCircle2,
    AlertCircle,
    Users,
    Plane,
    GraduationCap,
    MessageSquare,
    ArrowRight
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "Tourisme",
        message: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", service: "Tourisme", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    const services = [
        { name: "Tourisme & Voyages", icon: <Plane className="w-4 h-4" /> },
        { name: "Études à l'Étranger", icon: <GraduationCap className="w-4 h-4" /> },
        { name: "Immigration & Résidence", icon: <Users className="w-4 h-4" /> }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Navbar Simple */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="font-bold flex items-center gap-2 text-gray-900 tracking-wider">
                            <span className="text-2xl">OUSSAMA</span>
                            <span className="text-3xl text-amber-500" style={{ fontFamily: 'cursive' }}>Travel</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">Accueil</Link>
                        <Link href="/tourisme" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">Tourisme</Link>
                        <Link href="/etudes" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">Études</Link>
                    </div>
                    <Link href="/auth/login">
                        <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-all shadow-lg">
                            Se Connecter
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Hero Header */}
            <section className="pt-32 pb-12 bg-white border-b border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        Comment pouvons-nous vous <span className="text-sky-500 underline underline-offset-8 decoration-amber-400">aider ?</span>
                    </motion.h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
                        Parlez-nous de votre projet. Nos experts vous répondront en moins de 24h ouvrables.
                    </p>
                </div>
            </section>

            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
                    >
                        <h2 className="text-2xl font-black text-slate-900 mb-8 flex items-center gap-3">
                            <MessageSquare className="w-8 h-8 text-amber-500" />
                            Envoyer un message
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest px-1">Nom Complet</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Votre nom"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-medium text-slate-900"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest px-1">Téléphone</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+213..."
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-medium text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest px-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="votre@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-medium text-slate-900"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest px-1">Service Concerné</label>
                                <select
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-bold text-slate-900 appearance-none"
                                    value={formData.service}
                                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                >
                                    {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest px-1">Votre Message</label>
                                <textarea
                                    rows={5}
                                    required
                                    placeholder="Décrivez votre projet..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-medium text-slate-900 resize-none"
                                ></textarea>
                            </div>

                            <button
                                disabled={status === "loading"}
                                className="w-full py-5 bg-sky-600 text-white font-black text-lg rounded-[1.5rem] hover:bg-sky-700 transition-all shadow-xl shadow-sky-500/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                {status === "loading" ? "Envoi en cours..." : "Envoyer ma demande"}
                                <Send className="w-6 h-6" />
                            </button>

                            {status === "success" && (
                                <div className="p-4 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-2xl flex items-center gap-3 font-bold">
                                    <CheckCircle2 className="w-5 h-5" />
                                    Demande envoyée ! Nous vous contacterons sous peu.
                                </div>
                            )}

                            {status === "error" && (
                                <div className="p-4 bg-rose-50 text-rose-700 border border-rose-100 rounded-2xl flex items-center gap-3 font-bold">
                                    <AlertCircle className="w-5 h-5" />
                                    Une erreur est survenue. Veuillez réessayer.
                                </div>
                            )}
                        </form>
                    </motion.div>

                    {/* Right Column: Info & Contact Details */}
                    <div className="space-y-12 py-8">
                        <div className="space-y-8">
                            <h3 className="text-3xl font-black text-slate-900">Coordonnées</h3>

                            <div className="flex gap-6 items-start group">
                                <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shadow-sm border border-amber-100 shrink-0 transform group-hover:-rotate-12 transition-all">
                                    <Phone className="w-7 h-7" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Téléphone & WhatsApp</div>
                                    <div className="text-xl font-bold text-slate-900">+213 555 00 00 00</div>
                                    <div className="text-slate-500">Du Dimanche au Jeudi (09h - 17h)</div>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 shadow-sm border border-sky-100 shrink-0 transform group-hover:rotate-12 transition-all">
                                    <Mail className="w-7 h-7" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Email Support</div>
                                    <div className="text-xl font-bold text-slate-900 underline underline-offset-4 decoration-sky-400 decoration-4">contact@oussamatravel.dz</div>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100 shrink-0 transform group-hover:scale-110 transition-all">
                                    <MapPin className="w-7 h-7" />
                                </div>
                                <div>
                                    <div className="font-bold text-slate-400 text-xs uppercase tracking-widest mb-1">Adresse Bureau</div>
                                    <div className="text-xl font-bold text-slate-900">Centre d'affaires, Alger / Béjaïa</div>
                                    <div className="text-slate-500">Algérie (Réception sur rendez-vous)</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 blur-3xl rounded-full"></div>
                            <Clock className="w-10 h-10 text-amber-400 mb-6" />
                            <h4 className="text-xl font-bold mb-4">Urgence ou Dossier bloqué ?</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium uppercase tracking-wider">
                                Pour les dossiers déjà en cours, nous vous prions d'utiliser votre **Espace Client** pour une réponse prioritaire par nos agents.
                            </p>
                            <Link href="/dashboard">
                                <button className="flex items-center gap-2 group text-sky-400 font-bold hover:text-sky-300">
                                    Accéder au Dashboard
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
