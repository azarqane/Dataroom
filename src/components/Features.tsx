import React from "react";

// (Tu peux importer tes icônes SVG comme d’habitude, ou coller ici les <svg> déjà dans ta page.)

export const Features = () => (
  <section className="py-16 px-4 bg-gradient-to-br from-gray-950 to-gray-900 flex flex-col items-center min-h-[580px]">
    <div className="max-w-2xl text-center mb-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-teal-400 mb-3 tracking-tight">
        Protection et traçabilité blockchain pour vos documents sensibles
      </h2>
      <p className="text-lg text-gray-300 mb-3">
        Sécurisez vos échanges de documents avec une preuve infalsifiable de consultation et une protection contre la copie.
      </p>
    </div>
    <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Sécurité de niveau entreprise */}
      <div className="bg-gray-900 border border-teal-700 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:border-teal-400 transition-all">
        {/* met ici ton icône, par exemple */}
        <svg width="36" height="36" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
          <path d="M18 32s12-6 12-17V9L18 4 6 9v6c0 11 12 17 12 17z" />
        </svg>
        <h3 className="text-xl font-bold text-gray-100 mb-2">Sécurité de niveau entreprise</h3>
        <p className="text-gray-400 text-base">
          Chiffrement AES-256 de bout en bout pour protéger vos documents sensibles avec une traçabilité blockchain.
        </p>
      </div>
      {/* Preuve de consultation */}
      <div className="bg-gray-900 border border-teal-700 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:border-teal-400 transition-all">
        <svg width="36" height="36" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
          <circle cx="18" cy="18" r="16" />
          <path d="M18 12v6l4 4" />
        </svg>
        <h3 className="text-xl font-bold text-gray-100 mb-2">Preuve de consultation</h3>
        <p className="text-gray-400 text-base">
          Journalisation blockchain infalsifiable des consultations de documents avec horodatage certifié.
        </p>
      </div>
      {/* Protection contre la copie */}
      <div className="bg-gray-900 border border-teal-700 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:border-teal-400 transition-all">
        <svg width="36" height="36" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
          <rect x="6" y="6" width="24" height="24" rx="4" />
          <line x1="10" y1="10" x2="26" y2="26" />
        </svg>
        <h3 className="text-xl font-bold text-gray-100 mb-2">Protection contre la copie</h3>
        <p className="text-gray-400 text-base">
          Blocage des captures d'écran et téléchargements non autorisés pour protéger vos documents.
        </p>
      </div>
      {/* Filigranes dynamiques */}
      <div className="bg-gray-900 border border-teal-700 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:border-teal-400 transition-all">
        <svg width="36" height="36" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
          <circle cx="18" cy="18" r="16" />
          <text x="18" y="22" textAnchor="middle" fontSize="10" fill="#14b8a6">ID</text>
        </svg>
        <h3 className="text-xl font-bold text-gray-100 mb-2">Filigranes dynamiques</h3>
        <p className="text-gray-400 text-base">
          Filigranes personnalisés avec les informations de l'utilisateur pour tracer l'origine des fuites.
        </p>
      </div>
      {/* Historique complet */}
      <div className="bg-gray-900 border border-teal-700 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:border-teal-400 transition-all">
        <svg width="36" height="36" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
          <rect x="8" y="8" width="20" height="20" rx="3" />
          <path d="M14 14h8M14 18h8M14 22h8" />
        </svg>
        <h3 className="text-xl font-bold text-gray-100 mb-2">Historique complet</h3>
        <p className="text-gray-400 text-base">
          Suivi détaillé de toutes les interactions avec vos documents, certifié par blockchain.
        </p>
      </div>
      {/* Contrôle d'accès avancé */}
      <div className="bg-gray-900 border border-teal-700 rounded-2xl shadow-lg p-8 flex flex-col items-start hover:border-teal-400 transition-all">
        <svg width="36" height="36" fill="none" stroke="#14b8a6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4">
          <circle cx="18" cy="16" r="6" />
          <path d="M4 30v-2c0-4.418 7.163-6 14-6s14 1.582 14 6v2" />
        </svg>
        <h3 className="text-xl font-bold text-gray-100 mb-2">Contrôle d'accès avancé</h3>
        <p className="text-gray-400 text-base">
          Gestion granulaire des droits d'accès avec authentification forte et révocation instantanée.
        </p>
      </div>
    </div>
  </section>
);
