import webpush from './web-push';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function sendPushNotification(userId: string, title: string, body: string, url: string = '/dashboard') {
    try {
        // 1. Récupérer tous les abonnements (appareils) de cet utilisateur
        const { data: subscriptions, error } = await supabase
            .from('push_subscriptions')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        if (!subscriptions || subscriptions.length === 0) {
            console.log(`Aucun abonnement push pour l'utilisateur ${userId}`);
            return;
        }

        // 2. Envoyer la notification à chaque appareil
        const payload = JSON.stringify({ title, body, url });

        const sendPromises = subscriptions.map(sub => {
            const pushConfig = {
                endpoint: sub.endpoint,
                keys: {
                    p256dh: sub.p256dh,
                    auth: sub.auth
                }
            };

            return webpush.sendNotification(pushConfig, payload)
                .catch(err => {
                    if (err.statusCode === 410 || err.statusCode === 404) {
                        // L'abonnement a expiré ou a été supprimé par l'utilisateur du navigateur
                        return supabase.from('push_subscriptions').delete().eq('id', sub.id);
                    }
                    console.error('Erreur sendNotification:', err);
                });
        });

        await Promise.all(sendPromises);
        console.log(`Notification push envoyée à ${subscriptions.length} appareils pour l'utilisateur ${userId}`);
    } catch (err) {
        console.error('Erreur globale sendPushNotification:', err);
    }
}
