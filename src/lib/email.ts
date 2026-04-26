const EMAIL_SIGNATURE = `
<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; font-family: sans-serif;">
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
        <div style="width: 2px; height: 40px; background-color: #f59e0b;"></div>
        <div>
            <p style="margin: 0; font-weight: 900; color: #0f172a; font-size: 18px; letter-spacing: -0.5px;">OUSSAMA TRAVEL</p>
            <p style="margin: 0; color: #64748b; font-size: 12px; font-weight: bold; text-transform: uppercase; tracking: 1px;">Expertise Voyages & Immigration</p>
        </div>
    </div>
    <div style="font-size: 13px; color: #475569; line-height: 1.5;">
        <p style="margin: 2px 0;">📍 <strong>Bureau :</strong> Coopérative Scala, Béjaïa, Algérie</p>
        <p style="margin: 2px 0;">🌐 <strong>Site :</strong> <a href="https://www.oussamatravel.com" style="color: #3b82f6; text-decoration: none;">www.oussamatravel.com</a></p>
        <p style="margin: 2px 0;">📧 <strong>Contact :</strong> <a href="mailto:directeur@oussamatravel.com" style="color: #3b82f6; text-decoration: none;">directeur@oussamatravel.com</a></p>
    </div>
    <p style="margin-top: 15px; font-size: 11px; color: #94a3b8; font-style: italic;">
        Ce message et ses pièces jointes sont confidentiels. Si vous n'en êtes pas le destinataire, merci de le supprimer.
    </p>
</div>
`;

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

    // Injection automatique de la signature
    const finalHtml = `${html}${EMAIL_SIGNATURE}`;
    const finalInfo = text ? `${text}\n\n---\nOUSSAMA TRAVEL\nCoopérative Scala, Béjaïa\nwww.oussamatravel.com` : undefined;

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Oussama Travel <directeur@oussamatravel.com>',
                to: [to],
                subject: subject,
                html: finalHtml,
                text: finalInfo || "Veuillez activer l'affichage HTML dans votre client de messagerie.",
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
