'use client';

import { useState, useEffect } from 'react';
import { Bell, BellOff, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function PushNotificationManager() {
    const [isSupported, setIsSupported] = useState(false);
    const [subscription, setSubscription] = useState<PushSubscription | null>(null);
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        console.log("PushNotificationManager check:", {
            serviceWorker: 'serviceWorker' in navigator,
            PushManager: 'PushManager' in window
        });

        if ('serviceWorker' in navigator && 'PushManager' in window) {
            setIsSupported(true);
            checkSubscription();
        }
    }, []);

    const checkSubscription = async () => {
        try {
            const registration = await navigator.serviceWorker.ready;
            const sub = await registration.pushManager.getSubscription();
            setSubscription(sub);
        } catch (err) {
            console.error("Erreur checkSubscription:", err);
        }
    };

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const subscribe = async () => {
        try {
            setErrorMessage(null);
            setStatus('loading');

            const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
            console.log("VAPID Key check:", vapidKey ? "Present" : "MISSING");

            if (!vapidKey) {
                throw new Error("Clé VAPID publique manquante (NEXT_PUBLIC_VAPID_PUBLIC_KEY).");
            }

            const registration = await navigator.serviceWorker.ready;
            console.log("Service Worker ready.");

            const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(vapidKey)
            });

            console.log("Subscription successful:", sub);

            const supabase = createClient();
            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                throw new Error('Vous devez être connecté');
            }

            const response = await fetch('/api/push/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify(sub)
            });

            if (!response.ok) throw new Error('Erreur lors de l\'enregistrement');

            setSubscription(sub);
            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (err: any) {
            console.error('Erreur souscription push:', err);
            setErrorMessage(err.message || "Erreur inconnue");
            setStatus('error');
        }
    };

    const unsubscribe = async () => {
        try {
            setStatus('loading');
            if (subscription) {
                await subscription.unsubscribe();
                setSubscription(null);
            }
            setStatus('idle');
        } catch (err) {
            setStatus('error');
        }
    };

    if (!isSupported) {
        return (
            <div className="bg-rose-500/10 border border-rose-500/20 rounded-2xl p-4 mb-8 text-rose-400 text-xs italic">
                ⚠️ Les notifications vibrantes ne sont pas supportées par ce navigateur ou cette connexion (nécessite HTTPS et Chrome/Safari/Edge récent).
                Note: Assurez-vous de ne pas être dans un navigateur "Interne" (comme celui de WhatsApp ou Facebook).
            </div>
        );
    }

    return (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${subscription ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                        {subscription ? <Bell className="w-6 h-6" /> : <BellOff className="w-6 h-6" />}
                    </div>
                    <div>
                        <h3 className="text-white font-bold">Notifications Vibrantes</h3>
                        <p className="text-white/60 text-sm">
                            {subscription
                                ? "Votre téléphone vibrera pour les mises à jour importantes."
                                : "Recevez une alerte sonore et vibrante lors d'un message ou changement de statut."}
                        </p>
                    </div>
                </div>

                <button
                    onClick={subscription ? unsubscribe : subscribe}
                    disabled={status === 'loading'}
                    className={`px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all
            ${subscription
                            ? "bg-white/10 text-white hover:bg-white/20"
                            : "bg-amber-400 text-sky-950 hover:bg-white shadow-lg shadow-amber-500/20"
                        } disabled:opacity-50`}
                >
                    {status === 'loading' ? 'Action...' : subscription ? 'Désactiver' : 'Activer'}
                </button>
            </div>

            {status === 'success' && (
                <div className="mt-4 flex items-center gap-2 text-green-400 text-xs font-bold animate-bounce">
                    <CheckCircle2 className="w-4 h-4" />
                    Notifications activées avec succès !
                </div>
            )}

            {errorMessage && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-[10px] font-medium font-mono">
                    ERREUR: {errorMessage}
                </div>
            )}
        </div>
    );
}

function urlBase64ToUint8Array(base64String: string) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}
