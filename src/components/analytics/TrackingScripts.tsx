'use client';

import Script from 'next/script';

export default function TrackingScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const linkedinPartnerId = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  return (
    <>
      {/* Google Analytics */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}');
            `}
          </Script>
        </>
      )}

      {/* LinkedIn Insight Tag */}
      {linkedinPartnerId && (
        <Script id="linkedin-insight" strategy="lazyOnload">
          {`
            _linkedin_partner_id = "${linkedinPartnerId}";
            window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
            window._linkedin_data_partner_ids.push(_linkedin_partner_id);
            (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);
            })(window.lintrk);
          `}
        </Script>
      )}

      {/* reCAPTCHA Enterprise */}
      {recaptchaKey && (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${recaptchaKey}`}
          strategy="lazyOnload"
        />
      )}
    </>
  );
}
