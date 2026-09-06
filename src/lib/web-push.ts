import webpush from 'web-push';

const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;

if (publicKey && privateKey) {
    try {
        webpush.setVapidDetails(
            'mailto:contact@oussamatravel.com',
            publicKey,
            privateKey
        );
    } catch (e) {
        console.warn('Failed to configure web-push VAPID details during build. If this is a production environment, check your keys.', e);
    }
}

export default webpush;
