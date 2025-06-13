// app/api/verify-captcha/route.js
export async function POST(req) {
  try {
    const { token } = await req.json();

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;

    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();

    if (data.success && data.score >= 0.5 && data.action === 'form_submit') {
      return Response.json({ success: true, score: data.score });
    } else {
      return Response.json({ success: false, score: data.score }, { status: 400 });
    }

  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
