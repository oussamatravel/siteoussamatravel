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
    ArrowRight,
    Search,
    MessageCircle
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ContactPage() {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        service: "Tourisme",
        message: ""
    });
    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            const { error } = await supabase.from('contacts').insert([formData]);
            if (error) throw error;

            setStatus("success");
            setFormData({ name: "", email: "", phone: "", service: "Tourisme", message: "" });
        } catch (err: any) {
            console.error("Erreur d'envoi:", err);
            setStatus("error");
            alert("Une erreur est survenue lors de l'envoi de votre message.");
        }
    };

    const services = [
        "Tourisme & Voyages",
        "Études à l'Étranger",
        "Immigration & Résidence",
        "Assistance Visa Simple"
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Header */}
            <section className="pt-48 pb-12 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-100 text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] mb-8 border border-slate-200"
                    >
                        <MessageSquare className="w-4 h-4" />
                        <span>Contactez nos experts aujourd'hui</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]"
                    >
                        Parlons de votre <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600 uppercase italic">Avenir.</span>
                    </motion.h1>
                    <p className="text-xl text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                        Que ce soit pour des vacances, un diplôme ou une nouvelle vie, nous sommes là pour répondre à toutes vos questions.
                    </p>
                </div>
            </section>

            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
                    {/* Left Column: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white p-10 md:p-16 rounded-[4rem] shadow-sm hover:shadow-2xl transition-all border border-slate-100"
                    >
                        <h2 className="text-3xl font-black text-slate-900 mb-10 tracking-tight">Formulaire de Contact</h2>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nom Complet</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Votre nom"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-black text-slate-900"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Téléphone</label>
                                    <input
                                        type="tel"
                                        required
                                        placeholder="+213..."
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-black text-slate-900"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Email</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="votre@email.com"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-black text-slate-900"
                                />
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Service</label>
                                <div className="grid grid-cols-2 gap-4">
                                    {services.map(s => (
                                        <button
                                            key={s}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, service: s })}
                                            className={`py-4 px-4 rounded-2xl text-[10px] font-black uppercase tracking-tighter border transition-all ${formData.service === s
                                                ? "bg-slate-900 border-slate-900 text-white shadow-xl"
                                                : "bg-white border-slate-200 text-slate-500 hover:border-sky-500"
                                                }`}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Message</label>
                                <textarea
                                    rows={4}
                                    required
                                    placeholder="Décrivez votre demande en quelques mots..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[1.5rem] focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 outline-none transition-all font-black text-slate-900 resize-none"
                                ></textarea>
                            </div>

                            <button
                                disabled={status === "loading"}
                                className="w-full py-6 bg-sky-500 text-white font-black text-lg rounded-full hover:bg-sky-600 transition-all shadow-2xl shadow-sky-500/30 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                            >
                                {status === "loading" ? "Envoi..." : "Envoyer ma demande"}
                                <ArrowRight className="w-6 h-6" />
                            </button>

                            {status === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-[1.5rem] flex items-center gap-4 font-black text-sm"
                                >
                                    <CheckCircle2 className="w-6 h-6" />
                                    <span>Votre message est entre de bonnes mains !</span>
                                </motion.div>
                            )}
                        </form>
                    </motion.div>

                    {/* Right Column: Info & Contact Details */}
                    <div className="space-y-16 py-12">
                        <div className="space-y-12">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Nos Bureaux</h3>

                            <div className="flex gap-8 items-start group">
                                <div className="w-16 h-16 bg-slate-900 text-white rounded-3xl flex items-center justify-center shadow-2xl shrink-0 group-hover:-rotate-6 transition-all">
                                    <Phone className="w-8 h-8" />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Appel Direct</div>
                                    <div className="text-2xl font-black text-slate-900">+213 770 41 94 60</div>
                                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs uppercase">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        Ligne Ouverte (09h - 18h)
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-8 items-start group">
                                <div className="w-16 h-16 bg-amber-400 text-slate-900 rounded-3xl flex items-center justify-center shadow-2xl shrink-0 group-hover:rotate-6 transition-all">
                                    <Mail className="w-8 h-8" />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Email Officiel</div>
                                    <div className="text-2xl font-black text-slate-900">directeur.ota@gmail.com</div>
                                    <div className="text-slate-500 font-bold text-xs uppercase">Réponse en moins de 12h</div>
                                </div>
                            </div>

                            <div className="flex gap-8 items-start group">
                                <div className="w-16 h-16 bg-sky-500 text-white rounded-3xl flex items-center justify-center shadow-2xl shrink-0 group-hover:scale-110 transition-all">
                                    <MapPin className="w-8 h-8" />
                                </div>
                                <div className="space-y-2">
                                    <div className="font-black text-slate-400 text-[10px] uppercase tracking-[0.2em]">Siège Central</div>
                                    <div className="text-2xl font-black text-slate-900">Coopérative Scala</div>
                                    <div className="text-slate-500 font-bold text-xs uppercase">En face la gare routière, Béjaïa, Algérie</div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-12 rounded-[4rem] text-white relative overflow-hidden shadow-3xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/20 blur-3xl rounded-full"></div>
                            <MessageCircle className="w-12 h-12 text-amber-400 mb-8" />
                            <h4 className="text-2xl font-black mb-6 uppercase tracking-widest">Support Prioritaire?</h4>
                            <p className="text-slate-400 text-sm leading-relaxed mb-10 font-bold">
                                Si vous êtes déjà un client Oussama Travel, merci d'utiliser le système de ticket dans votre espace client pour une assistance immédiate.
                            </p>
                            <Link href="/auth/login">
                                <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-black uppercase text-xs tracking-[0.2em] hover:bg-amber-400 transition-all shadow-xl">
                                    Accès Client
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
