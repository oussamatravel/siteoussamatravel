"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageCircle,
    X,
    Phone,
    Mail,
    MessageSquare,
    ChevronUp
} from "lucide-react";

export default function ChatSupport() {
    const [isOpen, setIsOpen] = useState(false);

    const contactMethods = [
        {
            name: "WhatsApp",
            icon: <MessageCircle className="w-5 h-5" />,
            color: "bg-emerald-500",
            label: "Discuter en direct",
            action: () => window.open("https://wa.me/213770419460", "_blank")
        },
        {
            name: "Appel",
            icon: <Phone className="w-5 h-5" />,
            color: "bg-sky-500",
            label: "+213 770 41 94 60",
            action: () => window.open("tel:+213770419460")
        },
        {
            name: "Email",
            icon: <Mail className="w-5 h-5" />,
            color: "bg-slate-900",
            label: "Envoyer un message",
            action: () => window.open("mailto:directeur.ota@gmail.com")
        }
    ];

    return (
        <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end gap-4 font-sans">
            {/* Expanded Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-6 w-72 mb-2 overflow-hidden relative"
                    >
                        {/* Header */}
                        <div className="mb-6 relative z-10">
                            <h3 className="text-xl font-black text-slate-900 leading-tight">Besoin d'aide ?</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Nous répondons en 15 min</p>
                        </div>

                        {/* Options */}
                        <div className="space-y-3 relative z-10">
                            {contactMethods.map((method, i) => (
                                <button
                                    key={i}
                                    onClick={() => { method.action(); setIsOpen(false); }}
                                    className="w-full flex items-center gap-4 p-4 rounded-2xl border border-slate-50 hover:border-slate-200 hover:bg-slate-50 transition-all group text-left"
                                >
                                    <div className={`w-10 h-10 ${method.color} text-white rounded-xl flex items-center justify-center shadow-lg shadow-${method.color.split('-')[1]}-200/50`}>
                                        {method.icon}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black text-slate-900">{method.name}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{method.label}</div>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Bottom decorative wave */}
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-sky-500/5 blur-3xl rounded-full"></div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Toggle Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl relative ${isOpen ? "bg-white text-slate-900 border border-slate-100" : "bg-sky-500 text-white shadow-sky-500/30"
                    } transition-colors cursor-pointer group`}
            >
                {/* Visual indicator (Pulsing ring) */}
                {!isOpen && (
                    <span className="absolute inset-0 rounded-full bg-sky-500 animate-ping opacity-20"></span>
                )}

                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                        >
                            <X className="w-8 h-8 font-black" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="open"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                        >
                            <MessageSquare className="w-8 h-8" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}
