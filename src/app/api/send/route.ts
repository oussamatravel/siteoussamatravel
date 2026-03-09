import { Resend } from 'resend';
import { NextRequest } from 'next/server';

// La clé API doit être configurée dans les variables d'environnement
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting simple en mémoire
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

// Anti-XSS: Échapper les caractères HTML spéciaux
function escapeHtml(unsafe: string): string {
  return String(unsafe)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: NextRequest) {
  // Vérification de la configuration
  if (!process.env.RESEND_API_KEY) {
    return new Response(JSON.stringify({ error: 'Service email non configuré.' }), { status: 503 });
  }

  // Rate limiting par IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
  const now = Date.now();
  const rl = rateLimit.get(ip);
  if (rl) {
    if (now < rl.resetAt) {
      if (rl.count >= RATE_LIMIT_MAX) {
        return new Response(JSON.stringify({ error: 'Trop de requêtes. Veuillez patienter.' }), { status: 429 });
      }
      rl.count++;
    } else {
      rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    }
  } else {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  }

  try {
    const body = await req.json();
    const { name, email, phone, service, message } = body;

    // Validation des champs requis
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Champs requis manquants.' }), { status: 400 });
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Format email invalide.' }), { status: 400 });
    }

    // Limiter la taille des champs pour éviter les abus
    if (name.length > 100 || message.length > 2000 || (phone && phone.length > 20)) {
      return new Response(JSON.stringify({ error: 'Données trop longues.' }), { status: 400 });
    }

    // Échapper toutes les variables avant injection dans le HTML (Anti-XSS)
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Non renseigné');
    const safeService = escapeHtml(service || 'Non spécifié');
    const safeMessage = escapeHtml(message);

    const data = await resend.emails.send({
      from: 'Oussama Travel <onboarding@resend.dev>',
      to: ['directeur.ota@gmail.com'],
      subject: `Nouveau Dossier : ${safeService} - ${safeName}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333; line-height: 1.6;">
          <h2 style="color: #f59e0b;">Nouveau Formulaire Oussama Travel</h2>
          <hr />
          <p><strong>Client :</strong> ${safeName}</p>
          <p><strong>Email :</strong> ${safeEmail}</p>
          <p><strong>Téléphone :</strong> ${safePhone}</p>
          <p><strong>Service demandé :</strong> ${safeService}</p>
          <p><strong>Message :</strong></p>
          <div style="background: #f4f4f4; padding: 15px; border-radius: 10px; white-space: pre-wrap;">
            ${safeMessage}
          </div>
          <hr />
          <p style="font-size: 11px; color: #999;">Envoyé depuis le site Oussama Travel</p>
        </div>
      `,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    // Ne jamais exposer les détails d'erreur internes
    console.error('[API/send] Error:', error);
    return new Response(JSON.stringify({ error: 'Une erreur est survenue. Veuillez réessayer.' }), { status: 500 });
  }
}

