'use client';
import { useEffect, useState } from 'react';

export default function PwaRegister() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            const register = () => {
                navigator.serviceWorker.register('/sw.js').then(
                    (registration) => {
                        console.log('Service Worker enregistré avec succès:', registration.scope);
                    },
                    (err) => {
                        console.error('Echec de l\'enregistrement du Service Worker:', err);
                    }
                );
            };

            if (document.readyState === 'complete') {
                register();
            } else {
                window.addEventListener('load', register);
            }
        }

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Stocker l'événement globalement pour que le bouton puisse l'utiliser
            (window as any).deferredPrompt = e;
            console.log('beforeinstallprompt event captured');
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        };
    }, []);

    return null;
}
