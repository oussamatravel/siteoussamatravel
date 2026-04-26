import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';

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
  // Rate limiting par IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] ?? '127.0.0.1';
  const now = Date.now();
  const rl = rateLimit.get(ip);
  if (rl) {
    if (now < rl.resetAt) {
      if (rl.count >= RATE_LIMIT_MAX) {
        return NextResponse.json({ error: 'Trop de requêtes. Veuillez patienter.' }, { status: 429 });
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
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    // Validation du format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Format email invalide.' }, { status: 400 });
    }

    // Limiter la taille des champs pour éviter les abus
    if (name.length > 100 || message.length > 2000 || (phone && phone.length > 20)) {
      return NextResponse.json({ error: 'Données trop longues.' }, { status: 400 });
    }

    // Échapper toutes les variables avant injection dans le HTML (Anti-XSS)
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || 'Non renseigné');
    const safeService = escapeHtml(service || 'Non spécifié');
    const safeMessage = escapeHtml(message);

    // Utilisation de la fonction centralisée sendEmail
    const result = await sendEmail({
      to: 'directeur@oussamatravel.com',
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
        </div>
      `,
    });

    if (result.error) throw result.error;

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('[API/send] Error:', error);
    return NextResponse.json({ error: 'Une erreur est survenue. Veuillez réessayer.' }, { status: 500 });
  }
}

