"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    MapPin,
    Video,
    PlusCircle,
    X,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Send,
    MessageSquare,
    ChevronRight,
    Search
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DashboardRdvPage() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Form State
    const [type, setType] = useState<'en_ligne' | 'physique'>('en_ligne');
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [notes, setNotes] = useState("");

    const supabase = createClient();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase
                .from('appointments')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });
            setAppointments(data || []);
        }
        setLoading(false);
    };

    const handleCreateAppointment = async () => {
        setSubmitting(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            const { error } = await supabase
                .from('appointments')
                .insert([
                    {
                        user_id: user.id,
                        type,
                        preferred_date: date,
                        time_slot: time,
                        client_notes: notes,
                        status: 'en_attente'
                    }
                ]);

            if (error) throw error;

            setIsModalOpen(false);
            resetForm();
            fetchAppointments();
        } catch (err: any) {
            alert("Erreur : " + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    const resetForm = () => {
        setType('en_ligne');
        setDate("");
        setTime("");
        setNotes("");
    };

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'confirme': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'annule': return 'bg-rose-50 text-rose-600 border-rose-100';
            case 'termine': return 'bg-slate-50 text-slate-500 border-slate-100';
            default: return 'bg-amber-50 text-amber-600 border-amber-100';
        }
    };

    const getStatusLabel = (status: string) => {
        switch (status) {
            case 'confirme': return 'Confirmé';
            case 'annule': return 'Annulé';
            case 'termine': return 'Terminé';
            default: return 'En attente';
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Mes Rendez-vous</h1>
                    <p className="text-slate-500 font-medium">Gérez vos consultations avec nos experts.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95 text-sm uppercase tracking-widest"
                >
                    <PlusCircle className="w-5 h-5" />
                    Réserver un créneau
                </button>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
                    <Loader2 className="w-12 h-12 animate-spin mb-4 text-slate-400" />
                    <p className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">Chargement de vos rendez-vous...</p>
                </div>
            ) : appointments.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {appointments.map((rdv) => (
                        <motion.div
                            key={rdv.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${rdv.type === 'en_ligne' ? 'bg-sky-50 text-sky-500' : 'bg-indigo-50 text-indigo-500'}`}>
                                        {rdv.type === 'en_ligne' ? <Video className="w-7 h-7" /> : <MapPin className="w-7 h-7" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(rdv.status)}`}>
                                                {getStatusLabel(rdv.status)}
                                            </span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                                ID: {rdv.id.slice(0, 8)}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-black text-slate-900 tracking-tight">
                                            {rdv.type === 'en_ligne' ? 'Consultation Vidéo' : 'Rendez-vous à l\'Agence'}
                                        </h3>
                                    </div>
                                </div>
                                {rdv.status === 'confirme' && rdv.meeting_link && (
                                    <a
                                        href={rdv.meeting_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-200 animate-pulse"
                                    >
                                        <Video className="w-5 h-5" />
                                    </a>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-8">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                                        <Calendar className="w-3 h-3" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Date</span>
                                    </div>
                                    <p className="font-black text-slate-900 text-sm">
                                        {new Date(rdv.preferred_date).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                                        <Clock className="w-3 h-3" />
                                        <span className="text-[9px] font-black uppercase tracking-widest">Heure / Créneau</span>
                                    </div>
                                    <p className="font-black text-slate-900 text-sm">{rdv.time_slot}</p>
                                </div>
                            </div>

                            {rdv.client_notes && (
                                <div className="mb-8 p-4 bg-amber-50/50 rounded-2xl border border-amber-100/50">
                                    <p className="text-xs font-bold text-slate-500 italic">" {rdv.client_notes} "</p>
                                </div>
                            )}

                            {rdv.admin_notes && (
                                <div className="mb-8 p-6 bg-slate-900 text-white rounded-[2rem] relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-2xl rounded-full" />
                                    <div className="flex items-center gap-2 mb-3 text-sky-400">
                                        <MessageSquare className="w-4 h-4" />
                                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Note de l'Agent</span>
                                    </div>
                                    <p className="text-xs font-medium leading-relaxed text-slate-300">{rdv.admin_notes}</p>
                                </div>
                            )}

                            <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <AlertCircle className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Modifié le {new Date(rdv.updated_at || rdv.created_at).toLocaleDateString()}</span>
                                </div>
                                <button className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em] flex items-center gap-1 group-hover:gap-2 transition-all">
                                    Détails <ChevronRight className="w-3 h-3" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-[3rem] p-20 text-center shadow-sm">
                    <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 grayscale opacity-50">
                        <Calendar className="w-10 h-10 text-slate-300" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-4 italic">Aucun rendez-vous planifié</h2>
                    <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10">
                        Besoin d'un conseil ? Réservez une consultation en ligne ou venez nous voir à l'agence.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-amber-400 text-slate-900 px-10 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-amber-500 transition-all shadow-xl shadow-amber-100"
                    >
                        Prendre mon premier RDV
                    </button>
                </div>
            )}

            {/* Appointment Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-amber-500">
                                        <Calendar className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Réserver un Créneau</h2>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Sélectionnez vos préférences</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-10 overflow-y-auto space-y-8">
                                {/* Type de RDV */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Type de Consultation</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <button
                                            onClick={() => setType('en_ligne')}
                                            className={`p-6 border-2 rounded-3xl flex flex-col items-center gap-3 transition-all ${type === 'en_ligne' ? 'border-sky-500 bg-sky-50 text-sky-700 shadow-inner' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
                                        >
                                            <Video className="w-8 h-8" />
                                            <span className="font-black text-xs uppercase tracking-widest">En Ligne (Visio)</span>
                                        </button>
                                        <button
                                            onClick={() => setType('physique')}
                                            className={`p-6 border-2 rounded-3xl flex flex-col items-center gap-3 transition-all ${type === 'physique' ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-inner' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
                                        >
                                            <MapPin className="w-8 h-8" />
                                            <span className="font-black text-xs uppercase tracking-widest">À l'Agence</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Date et Heure */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Date Souhaitée</label>
                                        <div className="relative">
                                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <input
                                                type="date"
                                                min={new Date().toISOString().split('T')[0]}
                                                value={date}
                                                onChange={(e) => setDate(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Créneau Horaire</label>
                                        <div className="relative">
                                            <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                            <select
                                                value={time}
                                                onChange={(e) => setTime(e.target.value)}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                            >
                                                <option value="" disabled>Choisir une heure</option>
                                                <option value="Matin (09h00 - 12h00)">Matin (09h00 - 12h00)</option>
                                                <option value="Après-midi (14h00 - 17h00)">Après-midi (14h00 - 17h00)</option>
                                                <option value="Fin de journée (17h00 - 19h00)">Fin de journée (17h00 - 19h00)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Motif / Notes */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Motif du Rendez-vous (Optionnel)</label>
                                    <textarea
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        placeholder="Ex: Je souhaite discuter des universités au Canada..."
                                        rows={3}
                                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-medium text-slate-900 resize-none"
                                    />
                                </div>
                            </div>

                            <div className="p-8 border-t border-slate-50 bg-slate-50/50">
                                <button
                                    onClick={handleCreateAppointment}
                                    disabled={submitting || !date || !time}
                                    className="w-full bg-slate-900 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
                                >
                                    {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-5 h-5" /> Confirmer la Demande</>}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
