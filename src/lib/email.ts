export async function sendEmail({
    to,
    subject,
    html,
    text
}: {
    to: string;
    subject: string;
    html: string;
    text?: string;
}) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (!RESEND_API_KEY) {
        console.error("RESEND_API_KEY n'est pas configurée.");
        return { error: 'RESEND_API_KEY manquante' };
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Oussama Travel <notifications@oussamatravel.com>', // À adapter selon le domaine vérifié
                to: [to],
                subject: subject,
                html: html,
                text: text || "Veuillez activer l'affichage HTML dans votre client de messagerie.",
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(JSON.stringify(errorData));
        }

        const data = await response.json();
        return { data };

    } catch (error) {
        console.error('Erreur (Resend):', error);
        return { error };
    }
}
