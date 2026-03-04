import { Resend } from 'resend';

// NOTE: Remplacez 're_your_api_key' par votre clé API Resend réelle (gratuite sur resend.com)
const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    const data = await resend.emails.send({
      from: 'Oussama Travel <onboarding@resend.dev>', // Ou votre domaine vérifié
      to: ['directeur.ota@gmail.com'], // VOTRE EMAIL DE RÉCEPTION
      subject: `Nouveau Dossier : ${service} - ${name}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #f59e0b;">Nouveau Formulaire Oussama Travel</h2>
          <hr />
          <p><strong>Client :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Téléphone :</strong> ${phone}</p>
          <p><strong>Service demandé :</strong> ${service}</p>
          <p><strong>Message :</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 10px;">
            ${message}
          </div>
          <hr />
          <p style="font-size: 11px; color: #999;">Envoyé depuis le site Oussama Travel</p>
        </div>
      `,
    });

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}
