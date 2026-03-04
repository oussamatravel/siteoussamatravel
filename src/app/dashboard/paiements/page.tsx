"use client";

import { motion } from "framer-motion";
import {
    CreditCard,
    Download,
    CheckCircle2,
    Clock,
    AlertCircle,
    ArrowUpRight,
    Wallet,
    Building2,
    Receipt,
    ShieldCheck,
    ChevronRight,
    HandCoins
} from "lucide-react";
import { useState } from "react";

export default function PaiementsPage() {
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

    const invoices = [
        {
            id: "FACT-2024-042",
            service: "Visa Études Canada (Frais Agence)",
            amount: "15,000 DA",
            date: "12 Mars 2024",
            status: "Payé",
            statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100"
        },
        {
            id: "FACT-2024-045",
            service: "Accompagnement Admission",
            amount: "8,500 DA",
            date: "15 Mars 2024",
            status: "En Attente",
            statusColor: "text-amber-600 bg-amber-50 border-amber-100"
        }
    ];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Mes Paiements & Factures</h1>
                    <p className="text-slate-500 font-medium font-bold uppercase text-[10px] tracking-widest">Gérez vos transactions et téléchargez vos justificatifs fiscaux.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" />
                        <span className="text-xs font-black text-emerald-700 uppercase tracking-tighter">Paiements Sécurisés</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left: Summary & Payment Methods */}
                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-slate-950 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 blur-3xl rounded-full"></div>
                        <Wallet className="w-10 h-10 text-amber-400 mb-6" />
                        <div className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Montant total dû</div>
                        <div className="text-4xl font-black mb-6 tracking-tighter">8,500 DA</div>
                        <button className="w-full py-4 bg-amber-400 text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl shadow-amber-400/20 active:scale-95">
                            Régler maintenant
                        </button>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm space-y-6">
                        <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-sky-500" />
                            Modes de Paiement
                        </h3>
                        <div className="space-y-3">
                            {[
                                { name: "Virement Bancaire (CCP)", desc: "Validation sous 24h", icon: <Building2 className="w-4 h-4" /> },
                                { name: "Carte Edahabia / CIB", icon: <CreditCard className="w-4 h-4" /> },
                                { name: "Paiement à l'agence", desc: "Espèces uniquement", icon: <HandCoins className="w-4 h-4" /> }
                            ].map((method, i) => (
                                <div key={i} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 group-hover:text-sky-500 transition-colors">
                                            {method.icon}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-slate-900 leading-none mb-1">{method.name}</div>
                                            {method.desc && <div className="text-[10px] font-bold text-slate-400 uppercase">{method.desc}</div>}
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right: History Table */}
                <div className="lg:col-span-2 space-y-6">
                    <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 px-2">
                        <Receipt className="w-6 h-6 text-amber-500" />
                        Historique des Factures
                    </h3>

                    <div className="bg-white border border-slate-100 rounded-[2.5rem] shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                                    <tr>
                                        <th className="px-8 py-5">Référence</th>
                                        <th className="px-8 py-5">Service</th>
                                        <th className="px-8 py-5">Montant</th>
                                        <th className="px-8 py-5">État</th>
                                        <th className="px-8 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {invoices.map((inv, i) => (
                                        <motion.tr
                                            key={inv.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="hover:bg-slate-50/50 transition-colors group"
                                        >
                                            <td className="px-8 py-6">
                                                <span className="font-black text-slate-900 text-sm">{inv.id}</span>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase">{inv.date}</div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-sm font-black text-slate-700">{inv.service}</div>
                                            </td>
                                            <td className="px-8 py-6 font-black text-slate-950 text-base">
                                                {inv.amount}
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${inv.statusColor}`}>
                                                    {inv.status === "Payé" ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                                                    {inv.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <button className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-sky-600 hover:border-sky-100 hover:shadow-lg transition-all group-hover:scale-110 active:scale-95">
                                                    <Download className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-8 bg-slate-50/50 text-center">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-2">
                                <AlertCircle className="w-4 h-4 text-amber-500" />
                                Besoin d'un devis personnalisé ? Contactez l'administration.
                            </p>
                        </div>
                    </div>

                    {/* Security Footnote */}
                    <div className="p-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] flex flex-col items-center justify-center text-center">
                        <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-4">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <h4 className="text-base font-black text-slate-900 mb-2 uppercase tracking-tighter">Protection des données financières</h4>
                        <p className="text-sm text-slate-500 max-w-md leading-relaxed">
                            Vos données bancaires ne sont jamais stockées sur nos serveurs. Nous utilisons des protocoles TLS 1.3 hautement sécurisés pour chaque transaction.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
