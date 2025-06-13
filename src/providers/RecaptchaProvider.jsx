'use client';

import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

export default function RecaptchaProvider({ children }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
        nonce: undefined,
      }}
      container={{
        parameters: {
          badge: 'inline',
          theme: 'dark',
        }
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}   