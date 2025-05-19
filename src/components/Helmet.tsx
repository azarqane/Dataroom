import React from 'react';

export const Helmet = () => {
  return (
    <React.Fragment>
      {/* This component simulates helmet functionality for meta tags */}
      <title>NeutVault | Data Room Sécurisée pour Entreprises</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      
      {/* Primary Meta Tags */}
      <meta name="title" content="NeutVault | Data Room Sécurisée pour Entreprises" />
      <meta name="description" content="Solution de data room sécurisée pour le partage de documents confidentiels. Conforme RGPD, chiffrement de bout en bout, et contrôle d'accès granulaire." />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.neutvault.fr/" />
      <meta property="og:title" content="NeutVault | Data Room Sécurisée pour Entreprises" />
      <meta property="og:description" content="Solution de data room sécurisée pour le partage de documents confidentiels. Conforme RGPD, chiffrement de bout en bout, et contrôle d'accès granulaire." />
      <meta property="og:image" content="https://www.neutvault.fr/og-image.jpg" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://www.neutvault.fr/" />
      <meta property="twitter:title" content="NeutVault | Data Room Sécurisée pour Entreprises" />
      <meta property="twitter:description" content="Solution de data room sécurisée pour le partage de documents confidentiels. Conforme RGPD, chiffrement de bout en bout, et contrôle d'accès granulaire." />
      <meta property="twitter:image" content="https://www.neutvault.fr/twitter-image.jpg" />
      
      {/* Canonical */}
      <link rel="canonical" href="https://www.neutvault.fr/" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Schema.org markup */}
      <script type="application/ld+json">{`
        {
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "NeutVault",
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Web",
          "offers": {
            "@type": "Offer",
            "price": "29.99",
            "priceCurrency": "EUR"
          },
          "description": "Solution de data room sécurisée pour le partage de documents confidentiels. Conforme RGPD, chiffrement de bout en bout, et contrôle d'accès granulaire."
        }
      `}</script>
    </React.Fragment>
  );
};