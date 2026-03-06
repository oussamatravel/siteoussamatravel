"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { Send, User, Shield, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
    profiles?: {
        first_name: string;
        last_name: string;
        role: string;
    } | null;
}

export default function ApplicationChat({ applicationId, onClose }: { applicationId: string, onClose: () => void }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchMessages();
        const subscribeToMessages = supabase
            .channel(`messages-${applicationId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `application_id=eq.${applicationId}`
            }, async (payload) => {
                const newMessage = payload.new as Message;

                // Fetch basic profile to identify sender role/name in real-time
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('first_name, last_name, role')
                    .eq('id', newMessage.sender_id)
                    .single();

                setMessages(prev => {
                    // Prevent duplicate if already in state (though rare with INSERT only)
                    if (prev.find(m => m.id === newMessage.id)) return prev;
                    return [...prev, { ...newMessage, profiles: profile }];
                });
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscribeToMessages);
        };
    }, [applicationId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            setCurrentUser(user);

            const { data, error } = await supabase
                .from('messages')
                .select(`
                    *,
                    profiles:sender_id (first_name, last_name, role)
                `)
                .eq('application_id', applicationId)
                .order('created_at', { ascending: true });

            if (error) throw error;
            setMessages(data || []);
        } catch (err) {
            console.error("Error fetching messages:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Session expirée. Veuillez vous reconnecter.");

            const { error } = await supabase
                .from('messages')
                .insert({
                    application_id: applicationId,
                    sender_id: user.id,
                    content: newMessage.trim()
                });

            if (error) throw error;
            setNewMessage("");
        } catch (err: any) {
            alert("Erreur d'envoi : " + err.message);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        >
            <div className="bg-white w-full max-w-2xl h-[80vh] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-slate-100">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center">
                            <Shield className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-black text-slate-900 leading-tight">Support Dossier</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Échangez avec votre conseiller Oussama Travel</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition-all"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Messages Body */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
                >
                    {isLoading ? (
                        <div className="h-full flex flex-col items-center justify-center gap-3">
                            <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chargement de la discussion...</p>
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-10">
                            <div className="w-16 h-16 bg-white rounded-3xl shadow-sm flex items-center justify-center mb-6 text-slate-200">
                                <Send className="w-8 h-8" />
                            </div>
                            <h4 className="text-base font-black text-slate-900 mb-2">Aucun message pour le moment</h4>
                            <p className="text-sm text-slate-500 max-w-[280px]">Posez votre question ou demandez des précisions sur votre dossier ici.</p>
                        </div>
                    ) : (
                        messages.map((msg) => {
                            const isMe = msg.sender_id === currentUser?.id;
                            const isStaff = msg.profiles?.role === 'admin';

                            return (
                                <div
                                    key={msg.id}
                                    className={`flex ${isMe ? 'justify-end' : 'justify-start'} items-end gap-3`}
                                >
                                    {!isMe && (
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isStaff ? 'bg-slate-900 text-amber-400' : 'bg-slate-200 text-slate-500'}`}>
                                            <User className="w-4 h-4" />
                                        </div>
                                    )}
                                    <div className="max-w-[80%] space-y-1">
                                        {!isMe && (
                                            <div className="text-[10px] font-black text-slate-400 px-2 uppercase tracking-tighter">
                                                {isStaff ? 'Conseiller Oussama Travel' : (msg.profiles?.first_name ? `${msg.profiles.first_name} ${msg.profiles.last_name}` : 'Utilisateur')}
                                            </div>
                                        )}
                                        <div className={`p-4 rounded-3xl text-sm font-medium shadow-sm border ${isMe
                                            ? 'bg-slate-900 text-white border-slate-900 rounded-br-none'
                                            : 'bg-white text-slate-700 border-slate-100 rounded-bl-none'
                                            }`}>
                                            {msg.content}
                                        </div>
                                        <div className={`text-[9px] font-bold text-slate-300 px-2 ${isMe ? 'text-right' : 'text-left'}`}>
                                            {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Input */}
                <div className="p-6 bg-white border-t border-slate-100">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Tapez votre message ici..."
                            className="flex-1 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all font-medium text-slate-900"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || isSending}
                            className="p-4 bg-amber-400 text-slate-900 rounded-2xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-200 disabled:opacity-50 disabled:grayscale active:scale-95"
                        >
                            {isSending ? <Loader2 className="w-6 h-6 animate-spin" /> : <Send className="w-6 h-6" />}
                        </button>
                    </form>
                </div>
            </div>
        </motion.div>
    );
}
