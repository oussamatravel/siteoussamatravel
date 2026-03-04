"use client";

import { motion } from "framer-motion";
import { Bell, Clock, CheckCircle2, AlertCircle, Info, MoreHorizontal, Settings } from "lucide-react";

export default function NotificationsPage() {
    const notifications = [
        {
            id: 1,
            type: "Action Requise",
            title: "Passeport manquant pour votre dossier Canada",
            desc: "Nous avons besoin d'une copie de votre passeport pour finaliser votre soumission.",
            time: "Il y a 2 heures",
            icon: <AlertCircle className="w-5 h-5 text-amber-500" />,
            bg: "bg-amber-50 border-amber-100",
            read: false
        },
        {
            id: 2,
            type: "Succès",
            title: "Document validé : Diplôme Bachelor",
            desc: "L'expert Oussama Travel a validé votre diplôme. Votre dossier avance à 60%.",
            time: "Hier à 14:30",
            icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
            bg: "bg-emerald-50 border-emerald-100",
            read: true
        },
        {
            id: 3,
            type: "Info",
            title: "Mise à jour des tarifs Dubaï 2024",
            desc: "Découvrez nos nouveaux packages pour le mois d'Avril dès maintenant.",
            time: "25 Mars 2024",
            icon: <Info className="w-5 h-5 text-sky-500" />,
            bg: "bg-sky-50 border-sky-100",
            read: true
        }
    ];

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Notifications</h1>
                    <p className="text-gray-600">Restez informé de l'avancement de vos demandes en temps réel.</p>
                </div>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-gray-500">
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            <div className="flex gap-4 mb-8">
                <button className="px-6 py-2 bg-slate-900 text-white font-bold rounded-full text-sm">Tout</button>
                <button className="px-6 py-2 bg-white text-gray-600 border border-slate-200 font-bold rounded-full text-sm hover:bg-slate-50">Dossiers</button>
                <button className="px-6 py-2 bg-white text-gray-600 border border-slate-200 font-bold rounded-full text-sm hover:bg-slate-50">Documents</button>
            </div>

            <div className="space-y-4">
                {notifications.map((notif, i) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`p-6 border rounded-3xl transition-all hover:shadow-lg group flex items-start gap-4 cursor-pointer translate-y-0 hover:-translate-y-1 ${notif.read ? "bg-white border-slate-100" : "bg-white border-blue-200 shadow-md ring-2 ring-blue-500/5 shadow-blue-500/10"
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${notif.bg}`}>
                            {notif.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${notif.bg}`}>{notif.type}</span>
                                {!notif.read && (
                                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                                )}
                            </div>
                            <h3 className={`text-lg font-bold mb-1 truncate ${notif.read ? "text-gray-900" : "text-blue-900"}`}>{notif.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">{notif.desc}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                <Clock className="w-3 h-3" />
                                {notif.time}
                            </div>
                        </div>

                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-50 rounded-xl hover:bg-slate-100">
                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                        </button>
                    </motion.div>
                ))}

                {notifications.length === 0 && (
                    <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
                        <Bell className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Tout est à jour !</h3>
                        <p className="text-gray-500">Revenez plus tard pour voir vos activités.</p>
                    </div>
                )}
            </div>

            <div className="mt-10 pt-10 border-t border-slate-100 text-center">
                <button className="text-sm font-bold text-sky-600 hover:text-sky-700 hover:underline transition-all">
                    Marquer tout comme lu
                </button>
            </div>
        </div>
    );
}
