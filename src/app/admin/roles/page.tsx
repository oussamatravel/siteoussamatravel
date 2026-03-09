"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldCheck,
    Users,
    Search,
    X,
    Loader2,
    UserCheck,
    UserX,
    Crown,
    Briefcase,
    User,
    ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const ROLES = [
    { value: "admin", label: "Administrateur", color: "bg-amber-50 text-amber-600 border-amber-200", icon: <Crown className="w-4 h-4" /> },
    { value: "employee", label: "Employé", color: "bg-sky-50 text-sky-600 border-sky-200", icon: <Briefcase className="w-4 h-4" /> },
    { value: "client", label: "Client", color: "bg-slate-50 text-slate-600 border-slate-200", icon: <User className="w-4 h-4" /> },
];

export default function AdminRolesPage() {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterRole, setFilterRole] = useState("all");
    const [updatingId, setUpdatingId] = useState<string | null>(null);
    const [currentUserId, setCurrentUserId] = useState<string | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const supabase = createClient();
    const router = useRouter();

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { router.push("/auth/login"); return; }

            const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
            if (!profile || profile.role !== 'admin') {
                router.push("/admin");
                return;
            }
            setCurrentUserId(user.id);
            setIsAdmin(true);
            fetchUsers();
        };
        init();
    }, []);

    const fetchUsers = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('id, first_name, last_name, email, role, created_at')
            .order('created_at', { ascending: false });

        if (!error && data) setUsers(data);
        setIsLoading(false);
    };

    const updateRole = async (userId: string, newRole: string) => {
        if (userId === currentUserId && newRole !== 'admin') {
            alert("Vous ne pouvez pas changer votre propre rôle !");
            return;
        }
        setUpdatingId(userId);
        const { error } = await supabase.from('profiles').update({ role: newRole }).eq('id', userId);
        if (error) { alert("Erreur : " + error.message); }
        else { await fetchUsers(); }
        setUpdatingId(null);
    };

    const getRoleInfo = (role: string) => ROLES.find(r => r.value === role) || ROLES[2];

    const filteredUsers = users.filter(u => {
        const matchesSearch = `${u.first_name} ${u.last_name} ${u.email}`.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === "all" || u.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const stats = {
        admins: users.filter(u => u.role === 'admin').length,
        employees: users.filter(u => u.role === 'employee').length,
        clients: users.filter(u => u.role === 'client').length,
    };

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="text-center space-y-4">
                    <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center mx-auto">
                        <ShieldCheck className="w-10 h-10 text-rose-500" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900">Accès Restreint</h2>
                    <p className="text-slate-500 font-medium">Cette section est réservée aux administrateurs.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto space-y-8 font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center">
                            <Crown className="w-5 h-5 text-amber-500" />
                        </div>
                        Gestion des Rôles
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Attribuez les permissions à chaque membre de l'équipe.</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Administrateurs", count: stats.admins, icon: <Crown className="w-5 h-5 text-amber-500" />, bg: "bg-amber-50", text: "text-amber-600" },
                    { label: "Employés", count: stats.employees, icon: <Briefcase className="w-5 h-5 text-sky-500" />, bg: "bg-sky-50", text: "text-sky-600" },
                    { label: "Clients", count: stats.clients, icon: <User className="w-5 h-5 text-slate-500" />, bg: "bg-slate-100", text: "text-slate-600" },
                ].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.bg}`}>{s.icon}</div>
                        <div>
                            <div className={`text-2xl font-black ${s.text}`}>{s.count}</div>
                            <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Rechercher un utilisateur..."
                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-slate-900 outline-none focus:ring-2 focus:ring-amber-400"
                    />
                </div>
                <div className="flex gap-2">
                    {["all", "admin", "employee", "client"].map(role => (
                        <button key={role} onClick={() => setFilterRole(role)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterRole === role ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                            {role === "all" ? "Tous" : role === "admin" ? "Admin" : role === "employee" ? "Employés" : "Clients"}
                        </button>
                    ))}
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 grid grid-cols-12 gap-4">
                    <div className="col-span-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Utilisateur</div>
                    <div className="col-span-3 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Rôle Actuel</div>
                    <div className="col-span-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Changer le Rôle</div>
                </div>

                <div className="divide-y divide-slate-100">
                    {isLoading ? (
                        <div className="py-16 flex items-center justify-center gap-3 text-slate-400">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <span className="text-xs font-black uppercase tracking-widest">Chargement...</span>
                        </div>
                    ) : filteredUsers.length === 0 ? (
                        <div className="py-16 text-center text-slate-400 text-xs font-black uppercase tracking-widest">
                            Aucun utilisateur trouvé.
                        </div>
                    ) : filteredUsers.map((user, i) => {
                        const roleInfo = getRoleInfo(user.role);
                        const isSelf = user.id === currentUserId;
                        return (
                            <motion.div key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }}
                                className={`px-8 py-5 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors ${isSelf ? 'bg-amber-50/30' : ''}`}>

                                {/* User Info */}
                                <div className="col-span-5 flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xs font-black shrink-0 ${roleInfo.color} border`}>
                                        {(user.first_name?.[0] || "?").toUpperCase()}
                                    </div>
                                    <div className="min-w-0">
                                        <div className="font-black text-slate-900 text-sm truncate">
                                            {user.first_name} {user.last_name}
                                            {isSelf && <span className="ml-2 text-[9px] font-black bg-amber-100 text-amber-600 px-2 py-0.5 rounded-full uppercase tracking-widest">Vous</span>}
                                        </div>
                                        <div className="text-xs text-slate-400 font-medium truncate">{user.email}</div>
                                    </div>
                                </div>

                                {/* Current Role Badge */}
                                <div className="col-span-3">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${roleInfo.color}`}>
                                        {roleInfo.icon}
                                        {roleInfo.label}
                                    </span>
                                </div>

                                {/* Role Changer */}
                                <div className="col-span-4">
                                    {updatingId === user.id ? (
                                        <div className="flex items-center gap-2 text-slate-400">
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span className="text-xs font-bold">Mise à jour...</span>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2 flex-wrap">
                                            {ROLES.filter(r => r.value !== user.role).map(r => (
                                                <button key={r.value} onClick={() => updateRole(user.id, r.value)}
                                                    disabled={isSelf && r.value !== 'admin'}
                                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all hover:shadow-sm disabled:opacity-30 disabled:cursor-not-allowed ${r.color}`}>
                                                    {r.icon}
                                                    {r.value === 'admin' ? 'Admin' : r.value === 'employee' ? 'Employé' : 'Client'}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
