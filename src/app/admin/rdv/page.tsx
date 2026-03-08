"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    User,
    MapPin,
    Video,
    Search,
    CheckCircle2,
    XCircle,
    Loader2,
    CalendarDays,
    AlertCircle,
    MessageSquare,
    Link as LinkIcon,
    X
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type AppointmentStatus = 'en_attente' | 'confirme' | 'termine' | 'annule';

export default function AdminRdvPage() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedApt, setSelectedApt] = useState<any | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    // Edit form state
    const [editStatus, setEditStatus] = useState<AppointmentStatus>('en_attente');
    const [editTime, setEditTime] = useState("");
    const [editMeetingLink, setEditMeetingLink] = useState("");
    const [editAdminNotes, setEditAdminNotes] = useState("");

    const supabase = createClient();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('appointments')
            .select('*, profiles(first_name, last_name, phone)')
            .order('created_at', { ascending: false });

        if (!error) setAppointments(data || []);
        setIsLoading(false);
    };

    const handleOpenEdit = (rdv: any) => {
        setSelectedApt(rdv);
        setEditStatus(rdv.status || 'en_attente');
        setEditTime(rdv.time_slot || "");
        setEditMeetingLink(rdv.meeting_link || "");
        setEditAdminNotes(rdv.admin_notes || "");
        setIsEditModalOpen(true);
    };

    const handleUpdateAppointment = async () => {
        if (!selectedApt) return;
        setSubmitting(true);
        const { error } = await supabase
            .from('appointments')
            .update({
                status: editStatus,
                time_slot: editTime,
                meeting_link: editStatus === 'confirme' && selectedApt.type === 'en_ligne' ? editMeetingLink : null,
                admin_notes: editAdminNotes,
                updated_at: new Date().toISOString()
            })
            .eq('id', selectedApt.id);

        if (!error) {
            setIsEditModalOpen(false);
            fetchAppointments();
        } else {
            alert("Erreur : " + error.message);
        }
        setSubmitting(false);
    };

    const filteredRdv = appointments.filter(a =>
        (a.profiles?.first_name + " " + a.profiles?.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.client_notes || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (a.type || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'confirme': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'annule': return 'bg-red-50 text-red-600 border-red-100';
            case 'termine': return 'bg-slate-100 text-slate-500 border-slate-200';
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

    const statuses = [
        { id: 'en_attente' as AppointmentStatus, label: 'En attente', color: 'amber' },
        { id: 'confirme' as AppointmentStatus, label: 'Confirmé', color: 'emerald' },
        { id: 'termine' as AppointmentStatus, label: 'Terminé', color: 'slate' },
        { id: 'annule' as AppointmentStatus, label: 'Annulé', color: 'rose' }
    ];

    const statusColorMap: Record<string, string> = {
        amber: 'border-amber-500 bg-amber-50 text-amber-700 ring-amber-500/20',
        emerald: 'border-emerald-500 bg-emerald-50 text-emerald-700 ring-emerald-500/20',
        slate: 'border-slate-400 bg-slate-100 text-slate-600 ring-slate-400/20',
        rose: 'border-rose-500 bg-rose-50 text-rose-700 ring-rose-500/20',
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 font-sans pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestion des Rendez-vous</h1>
                    <p className="text-slate-500 font-medium">Consultez, confirmez et gérez les rendez-vous clients.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="px-4 py-2 bg-amber-50 text-amber-700 border border-amber-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {appointments.filter(a => a.status === 'en_attente').length} En attente
                    </span>
                    <span className="px-4 py-2 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                        {appointments.filter(a => a.status === 'confirme').length} Confirmés
                    </span>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex gap-4 items-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un client, type de RDV..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                <th className="px-8 py-5">Client</th>
                                <th className="px-8 py-5">Type de RDV</th>
                                <th className="px-8 py-5">Date / Créneau</th>
                                <th className="px-8 py-5">Statut</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-sky-500 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Chargement des RDV...</p>
                                    </td>
                                </tr>
                            ) : filteredRdv.map((rdv) => (
                                <tr key={rdv.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                <User className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm">{rdv.profiles?.first_name} {rdv.profiles?.last_name}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{rdv.profiles?.phone}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            {rdv.type === 'en_ligne'
                                                ? <Video className="w-4 h-4 text-sky-500" />
                                                : <MapPin className="w-4 h-4 text-indigo-500" />
                                            }
                                            <span className="text-sm font-black text-slate-700 tracking-tight">
                                                {rdv.type === 'en_ligne' ? 'En ligne (Visio)' : 'À l\'agence'}
                                            </span>
                                        </div>
                                        {rdv.client_notes && (
                                            <p className="text-[10px] text-slate-400 font-medium mt-1 italic truncate max-w-[200px]">"{rdv.client_notes}"</p>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 mb-1">
                                            <CalendarDays className="w-4 h-4 text-amber-500" />
                                            <span className="text-xs font-bold text-slate-600">
                                                {rdv.preferred_date ? new Date(rdv.preferred_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Non précisé'}
                                            </span>
                                        </div>
                                        {rdv.time_slot && (
                                            <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
                                                <Clock className="w-3 h-3" />
                                                {rdv.time_slot}
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyles(rdv.status)}`}>
                                            {getStatusLabel(rdv.status)}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button
                                            onClick={() => handleOpenEdit(rdv)}
                                            className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-700 transition-all shadow-sm"
                                        >
                                            Gérer
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredRdv.length === 0 && !isLoading && (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold">
                                        Aucune demande de rendez-vous trouvée.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Advanced Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && selectedApt && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEditModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-slate-50 w-full max-w-2xl rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-6 bg-white border-b border-slate-100 flex items-center justify-between rounded-t-[2rem]">
                                <div>
                                    <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight">Gestion du Rendez-vous</h2>
                                    <p className="text-xs font-bold text-slate-400 mt-0.5 uppercase tracking-widest">
                                        {selectedApt.profiles?.first_name} {selectedApt.profiles?.last_name}
                                    </p>
                                </div>
                                <button onClick={() => setIsEditModalOpen(false)} className="p-2 rounded-xl hover:bg-slate-100 transition-all">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="overflow-y-auto p-6 space-y-6 flex-1">
                                {/* Client Info Summary */}
                                <div className="bg-white rounded-2xl p-6 border border-slate-100 grid grid-cols-2 gap-4">
                                    <div>
                                        <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                            {selectedApt.type === 'en_ligne' ? <Video className="w-3 h-3 text-sky-500" /> : <MapPin className="w-3 h-3 text-indigo-500" />} Type
                                        </span>
                                        <span className="font-black text-slate-900 text-sm block">
                                            {selectedApt.type === 'en_ligne' ? 'En ligne (Visio)' : 'À l\'agence'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                                            <CalendarDays className="w-3 h-3 text-amber-500" /> Date souhaitée
                                        </span>
                                        <span className="font-black text-slate-900 text-sm block">
                                            {selectedApt.preferred_date ? new Date(selectedApt.preferred_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) : 'Non précisé'}
                                        </span>
                                    </div>
                                    {selectedApt.client_notes && (
                                        <div className="col-span-2">
                                            <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Motif du client</span>
                                            <p className="text-slate-700 italic font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl text-sm">"{selectedApt.client_notes}"</p>
                                        </div>
                                    )}
                                </div>

                                {/* Statut */}
                                <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-4">
                                    <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut de la demande</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {statuses.map(s => (
                                            <button
                                                key={s.id}
                                                onClick={() => setEditStatus(s.id)}
                                                className={`py-3 px-2 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${editStatus === s.id
                                                    ? `${statusColorMap[s.color]} ring-2`
                                                    : 'border-slate-200 bg-white text-slate-400 hover:border-slate-300'
                                                    }`}
                                            >
                                                {s.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Heure exacte */}
                                <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-3">
                                    <label className="text-xs font-black text-slate-700 uppercase flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-amber-500" /> Heure exacte / Créneau validé
                                    </label>
                                    <input
                                        type="text"
                                        value={editTime}
                                        onChange={(e) => setEditTime(e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900"
                                        placeholder="Ex: 14h30 précise"
                                    />
                                </div>

                                {/* Meeting Link — only for confirmed online appointments */}
                                {editStatus === 'confirme' && selectedApt.type === 'en_ligne' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="bg-sky-50 rounded-2xl p-6 border border-sky-100 space-y-3"
                                    >
                                        <label className="text-xs font-black text-sky-700 uppercase flex items-center gap-2">
                                            <LinkIcon className="w-4 h-4 text-sky-500" /> Lien de la Visio (Meet, Zoom...)
                                        </label>
                                        <input
                                            type="url"
                                            value={editMeetingLink}
                                            onChange={(e) => setEditMeetingLink(e.target.value)}
                                            className="w-full p-4 bg-white border border-sky-200 rounded-2xl focus:ring-4 focus:ring-sky-400/10 focus:border-sky-400 transition-all font-bold text-sky-700 placeholder-sky-300"
                                            placeholder="https://meet.google.com/..."
                                        />
                                    </motion.div>
                                )}

                                {/* Admin Notes */}
                                <div className="bg-white rounded-2xl p-6 border border-slate-100 space-y-3">
                                    <label className="text-xs font-black text-slate-700 uppercase flex items-center gap-2">
                                        <MessageSquare className="w-4 h-4 text-slate-400" /> Note visible par le client
                                    </label>
                                    <textarea
                                        value={editAdminNotes}
                                        onChange={(e) => setEditAdminNotes(e.target.value)}
                                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-medium text-slate-800"
                                        placeholder="Ex: N'oubliez pas de préparer vos relevés de notes..."
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3 rounded-b-[2rem]">
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="px-6 py-3 font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-2xl transition-all text-sm"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleUpdateAppointment}
                                    disabled={submitting}
                                    className="px-8 py-3 bg-slate-900 text-white font-black uppercase tracking-widest text-[10px] rounded-2xl hover:bg-slate-800 transition-all flex items-center gap-2 disabled:opacity-50 shadow-xl shadow-slate-900/20"
                                >
                                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle2 className="w-4 h-4" /> Enregistrer</>}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
