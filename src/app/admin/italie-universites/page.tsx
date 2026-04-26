"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    GraduationCap,
    Plus,
    Search,
    Loader2,
    Calendar,
    Link as LinkIcon,
    Youtube,
    Euro,
    FileText,
    CheckCircle2,
    XCircle,
    MoreVertical,
    X,
    Trash2,
    Save,
    Power
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminItalieUniversites() {
    const [universities, setUniversities] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUni, setEditingUni] = useState<any>(null);

    const supabase = createClient();

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        application_link: "",
        tutorial_link: "",
        admission_fee: "Gratuit",
        english_requirements: "",
        deadline: "",
        status: "ferme",
        cgpa_requirement: ""
    });

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('italian_universities')
            .select('*')
            .order('name', { ascending: true });

        if (!error) setUniversities(data || []);
        setIsLoading(false);
    };

    const handleOpenModal = (uni: any = null) => {
        if (uni) {
            setEditingUni(uni);
            setFormData({
                name: uni.name,
                application_link: uni.application_link || "",
                tutorial_link: uni.tutorial_link || "",
                admission_fee: uni.admission_fee || "Gratuit",
                english_requirements: uni.english_requirements || "",
                deadline: uni.deadline || "",
                status: uni.status || "ferme",
                cgpa_requirement: uni.cgpa_requirement || ""
            });
        } else {
            setEditingUni(null);
            setFormData({
                name: "",
                application_link: "",
                tutorial_link: "",
                admission_fee: "Gratuit",
                english_requirements: "",
                deadline: "",
                status: "ferme",
                cgpa_requirement: ""
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsActionLoading(true);

        try {
            if (editingUni) {
                const { error } = await supabase
                    .from('italian_universities')
                    .update({ ...formData, updated_at: new Date().toISOString() })
                    .eq('id', editingUni.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('italian_universities')
                    .insert(formData);
                if (error) throw error;
            }

            setIsModalOpen(false);
            fetchUniversities();
        } catch (err: any) {
            alert("Erreur : " + err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const toggleStatus = async (uni: any) => {
        const newStatus = uni.status === 'ouvert' ? 'ferme' : 'ouvert';
        try {
            const { error } = await supabase
                .from('italian_universities')
                .update({ status: newStatus, updated_at: new Date().toISOString() })
                .eq('id', uni.id);
            if (error) throw error;
            fetchUniversities();
        } catch (err: any) {
            alert("Erreur : " + err.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Supprimer cette université ?")) return;
        try {
            const { error } = await supabase
                .from('italian_universities')
                .delete()
                .eq('id', id);
            if (error) throw error;
            fetchUniversities();
        } catch (err: any) {
            alert("Erreur : " + err.message);
        }
    };

    const filteredUnis = universities.filter(u =>
        u.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8 font-sans pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Universités Italiennes</h1>
                    <p className="text-slate-500 font-medium">Gérez la liste des universités publiques, leurs prix et leur statut d'ouverture.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="px-6 py-3 bg-slate-950 text-white rounded-2xl font-black text-sm hover:bg-slate-800 transition-all shadow-lg flex items-center gap-2"
                >
                    <Plus className="w-5 h-5 text-amber-500" />
                    Ajouter une Université
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative group max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-sky-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Rechercher une université..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-4 focus:ring-sky-500/10 focus:border-sky-500 transition-all font-medium"
                />
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                <th className="px-8 py-5">Université</th>
                                <th className="px-8 py-5">Frais / CGPA</th>
                                <th className="px-8 py-5">Deadline</th>
                                <th className="px-8 py-5">Statut</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-sky-500 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Chargement des universités...</p>
                                    </td>
                                </tr>
                            ) : filteredUnis.map((uni) => (
                                <tr key={uni.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-amber-500">
                                                <GraduationCap className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm">{uni.name}</div>
                                                <div className="flex gap-2 mt-1">
                                                    {uni.application_link && (
                                                        <a href={uni.application_link} target="_blank" className="text-[10px] font-black text-sky-600 hover:underline uppercase tracking-tight flex items-center gap-1">
                                                            <LinkIcon className="w-3 h-3" /> Portail
                                                        </a>
                                                    )}
                                                    {uni.tutorial_link && (
                                                        <a href={uni.tutorial_link} target="_blank" className="text-[10px] font-black text-red-600 hover:underline uppercase tracking-tight flex items-center gap-1">
                                                            <Youtube className="w-3 h-3" /> Tuto
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-black text-slate-700">{uni.admission_fee}</div>
                                        <div className="text-[10px] text-slate-400 font-bold">Min CGPA: {uni.cgpa_requirement || 'N/A'}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-600">
                                            <Calendar className="w-4 h-4 text-slate-400" />
                                            {uni.deadline ? new Date(uni.deadline).toLocaleDateString('fr-FR') : 'Non définie'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <button
                                            onClick={() => toggleStatus(uni)}
                                            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all flex items-center gap-2 ${
                                                uni.status === 'ouvert'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                                                    : 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100'
                                            }`}
                                        >
                                            <Power className="w-3 h-3" />
                                            {uni.status === 'ouvert' ? 'Ouvert' : 'Fermé'}
                                        </button>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleOpenModal(uni)}
                                                className="p-2 bg-slate-100 text-slate-600 hover:bg-slate-900 hover:text-white rounded-xl transition-all"
                                            >
                                                <FileText className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(uni.id)}
                                                className="p-2 bg-red-50 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isActionLoading && setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-950 text-white">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-amber-500 text-slate-950 rounded-2xl flex items-center justify-center shadow-lg">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black tracking-tight">{editingUni ? "Modifier l'université" : "Ajouter une université"}</h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Informations publiques italiennes</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Nom de l'université</label>
                                        <input
                                            required
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-500 focus:bg-white outline-none transition-all font-bold text-slate-900"
                                            placeholder="Ex: University of Milan"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Lien Portail Admission</label>
                                        <input
                                            type="url"
                                            value={formData.application_link}
                                            onChange={(e) => setFormData({ ...formData, application_link: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-sky-500 focus:bg-white outline-none transition-all text-sm font-medium"
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Lien Tutoriel (YouTube)</label>
                                        <input
                                            type="url"
                                            value={formData.tutorial_link}
                                            onChange={(e) => setFormData({ ...formData, tutorial_link: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-red-500 focus:bg-white outline-none transition-all text-sm font-medium"
                                            placeholder="https://youtube.com/..."
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Frais d'Admission</label>
                                        <input
                                            type="text"
                                            value={formData.admission_fee}
                                            onChange={(e) => setFormData({ ...formData, admission_fee: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-emerald-500 focus:bg-white outline-none transition-all font-bold"
                                            placeholder="Ex: 30€ ou Gratuit"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Date Limite (Deadline)</label>
                                        <input
                                            type="date"
                                            value={formData.deadline}
                                            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-500 focus:bg-white outline-none transition-all font-bold"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Exigences Anglais</label>
                                        <input
                                            type="text"
                                            value={formData.english_requirements}
                                            onChange={(e) => setFormData({ ...formData, english_requirements: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium"
                                            placeholder="Ex: IELTS 6.0, TOEFL, MOI..."
                                        />
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">CGPA Minimum</label>
                                        <input
                                            type="text"
                                            value={formData.cgpa_requirement}
                                            onChange={(e) => setFormData({ ...formData, cgpa_requirement: e.target.value })}
                                            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-indigo-500 focus:bg-white outline-none transition-all text-sm font-medium"
                                            placeholder="Ex: 2.5/4.0 ou 12/20"
                                        />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest block mb-2 px-1">Statut Initial</label>
                                        <div className="flex gap-4">
                                            {['ouvert', 'ferme'].map((s) => (
                                                <button
                                                    key={s}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, status: s })}
                                                    className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] border-2 transition-all ${
                                                        formData.status === s
                                                            ? (s === 'ouvert' ? 'bg-emerald-50 border-emerald-500 text-emerald-700' : 'bg-red-50 border-red-500 text-red-700')
                                                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                                                    }`}
                                                >
                                                    {s === 'ouvert' ? 'Ouvert' : 'Fermé'}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        disabled={isActionLoading}
                                        className="w-full py-5 bg-slate-950 text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-slate-900 transition-all flex items-center justify-center gap-3"
                                    >
                                        {isActionLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : <><Save className="w-5 h-5 text-amber-500" /> Enregistrer l'Université</>}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
