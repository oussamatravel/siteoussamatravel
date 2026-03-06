"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Calendar,
    Clock,
    User,
    MapPin,
    Search,
    CheckCircle2,
    XCircle,
    MoreHorizontal,
    ChevronRight,
    Loader2,
    CalendarDays
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminRdvPage() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const supabase = createClient();

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('appointments')
            .select('*, profiles(first_name, last_name, email)')
            .order('created_at', { ascending: false });

        if (!error) setAppointments(data || []);
        setIsLoading(false);
    };

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        const { error } = await supabase
            .from('appointments')
            .update({ status: newStatus })
            .eq('id', id);

        if (!error) fetchAppointments();
    };

    const filteredRdv = appointments.filter(a =>
        (a.profiles?.first_name + " " + a.profiles?.last_name).toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.destination.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirme': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
            case 'annule': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-amber-50 text-amber-600 border-amber-100';
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 font-sans pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestion des RDV Visa</h1>
                    <p className="text-slate-500 font-medium">Suivez et validez les demandes de rendez-vous consulaires.</p>
                </div>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un client ou pays..."
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
                                <th className="px-8 py-5">Service / Pays</th>
                                <th className="px-8 py-5">Date Souhaitée</th>
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
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{rdv.profiles?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-700 tracking-tight italic">{rdv.service_type}</span>
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">
                                                <MapPin className="w-3 h-3 text-sky-500" />
                                                {rdv.destination}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays className="w-4 h-4 text-amber-500" />
                                            <span className="text-xs font-bold text-slate-600">
                                                {rdv.preferred_date ? new Date(rdv.preferred_date).toLocaleDateString() : 'Non précisé'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(rdv.status)}`}>
                                            {rdv.status.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {rdv.status === 'en_attente' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(rdv.id, 'confirme')}
                                                        className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition-all border border-emerald-100"
                                                        title="Confirmer"
                                                    >
                                                        <CheckCircle2 className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusUpdate(rdv.id, 'annule')}
                                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all border border-red-100"
                                                        title="Annuler"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                        </div>
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
        </div>
    );
}
