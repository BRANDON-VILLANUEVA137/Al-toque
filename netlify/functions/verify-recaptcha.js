// Netlify Function para verificar reCAPTCHA v3 con Google
// GET  → devuelve la Site Key (pública) desde variable de entorno
// POST → verifica el token con Google usando la Secret Key

exports.handler = async (event) => {
  // ─── GET: devolver Site Key pública ───
  if (event.httpMethod === 'GET') {
    const siteKey = process.env.RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'RECAPTCHA_SITE_KEY no configurada' })
      };
    }
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ siteKey })
    };
  }

  // ─── POST: verificar token ───
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { token } = JSON.parse(event.body || '{}');
  const secretKey = process.env.RECAPTCHA_SECRET;

  if (!token) {
    return {
      statusCode: 400,
      body: JSON.stringify({ success: false, error: 'Token no recibido' })
    };
  }

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET no está configurado');
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Servidor no configurado' })
    };
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`
    });

    const data = await response.json();

    // Google reCAPTCHA v3 devuelve un score 0.0–1.0
    if (data.success && data.score >= 0.5) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, score: data.score })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({
          success: false,
          error: 'reCAPTCHA falló',
          score: data.score
        })
      };
    }
  } catch (error) {
    console.error('Error verificando reCAPTCHA:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: 'Error al verificar' })
    };
  }
};