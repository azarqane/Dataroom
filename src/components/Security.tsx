import React, { useState } from 'react';
import { Shield, Lock, Eye, FileCheck, UserCheck, RefreshCw } from 'lucide-react';

const securityFeatures = [
  {
    icon: <Lock className="w-10 h-10 text-teal-400" />,
    tab: "Protection",
    title: "Protection de vos données",
    description: (
      <>
        <p className="font-semibold mb-1 text-teal-300">Chiffrement AES-256 & confidentialité</p>
        Vos documents sont toujours chiffrés : au stockage, à la consultation et pendant leur transfert. Chaque fichier a sa propre clé pour une sécurité optimale.
        <ul className="list-disc pl-5 mt-2 text-base text-gray-400 space-y-1">
          <li>Stockage dans des data centers surveillés 24/7 (France & UE)</li>
          <li>Protection contre l'accès non autorisé multi-niveaux</li>
          <li>Journaux d'accès et alerte en temps réel</li>
        </ul>
      </>
    ),
  },
  {
    icon: <UserCheck className="w-10 h-10 text-teal-400" />,
    tab: "Contrôle",
    title: "Contrôle des accès",
    description: (
      <>
        <p className="font-semibold mb-1 text-teal-300">Permissions granulaire & visibilité</p>
        Limitez les droits des utilisateurs, groupes, ou invités : lecture, téléchargement, écriture, impression, expiration automatique de l’accès…
        <ul className="list-disc pl-5 mt-2 text-base text-gray-400 space-y-1">
          <li>Filigrane dynamique au nom de l'utilsateur</li>
          <li>Restriction temporelle des accès</li>
          <li>Invitations externes sécurisées</li>
        </ul>
      </>
    ),
  },
  {
    icon: <FileCheck className="w-10 h-10 text-teal-400" />,
    tab: "Audit",
    title: "Audit & conformité",
    description: (
      <>
        <p className="font-semibold mb-1 text-teal-300">Traçabilité & règlementation</p>
        Notre solution est nativement conforme RGPD et eIDAS. Toutes les actions sont tracées et archivées de façon inaltérable.
        <ul className="list-disc pl-5 mt-2 text-base text-gray-400 space-y-1">
          <li>Audit trail détaillé : qui a vu quoi, quand, comment</li>
          <li>Conservation des logs en France/UE</li>
          <li>Conformité totale RGPD et privacy-by-design</li>
        </ul>
      </>
    ),
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-teal-400" />,
    tab: "Multi-couches",
    title: "Sécurité multicouche",
    description: (
      <>
        <p className="font-semibold mb-1 text-teal-300">Architecture imbriquée</p>
        Des défenses actives sont en place à tous les niveaux : réseau, application, authentification, stockage. Chaque brique est testée continuellement contre les menaces.
        <ul className="list-disc pl-5 mt-2 text-base text-gray-400 space-y-1">
          <li>Anti-intrusion et anti-fuites renforcé</li>
          <li>Authentification multifacteur</li>
          <li>Tests de pénétration réguliers</li>
        </ul>
      </>
    ),
  },
];

export const Security = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative min-h-[660px] py-20 px-2 bg-gradient-to-tl from-gray-950 via-gray-900 to-gray-900 flex flex-col items-center">
      
      {/* Bandeau turquoise moderne */}
      <div className="w-full flex justify-center mb-16">
        <span className="inline-block px-8 py-2 rounded-full bg-gradient-to-r from-teal-500 via-teal-400 to-teal-600 text-white text-lg font-bold shadow-xl tracking-wide drop-shadow-lg backdrop-blur">
          Sécurité & conformité
        </span>
      </div>

      {/* Onglets boutons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 w-full max-w-3xl">
        {securityFeatures.map((feature, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            className={`
              flex items-center gap-2 px-7 py-3 rounded-2xl font-semibold transition-all duration-150 shadow
              text-base
              ${activeTab === idx
                ? "bg-gradient-to-br from-teal-600 to-teal-400 text-white shadow-xl scale-105"
                : "bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 hover:text-teal-300"}
            `}
            style={{ minWidth: 170 }}
          >
            {feature.icon}
            {feature.tab}
          </button>
        ))}
      </div>

      {/* Carte animée centrale */}
      <div className="
        max-w-2xl w-full mx-auto 
        bg-gray-900 border border-teal-800 rounded-3xl shadow-2xl
        px-10 py-12 mt-2 flex flex-col items-center
        transition-all duration-300
        "
      >
        {/* Icône et titre animé */}
        <div className="flex flex-col items-center mb-6">
          <div className="mb-2 animate-fadeIn">
            {securityFeatures[activeTab].icon}
          </div>
          <h3 className="text-2xl font-bold text-teal-300 drop-shadow mb-2 tracking-tight">{securityFeatures[activeTab].title}</h3>
        </div>
        <div className="text-lg text-gray-200 animate-fadeIn">
          {securityFeatures[activeTab].description}
        </div>
      </div>

      {/* Bonus RGPD / légale en bas */}
      <div className="max-w-2xl mx-auto mt-14 text-center">
        <h4 className="text-xl font-bold text-teal-400 mb-2">100% RGPD, France & UE</h4>
        <p className="text-gray-400 mb-1">
          NeutVault est hébergée exclusivement dans l’Union européenne et applique les standards légaux de sécurité numérique : RGPD, eIDAS, Privacy-by-design, logs en Europe.
        </p>
      </div>
    </section>
  );
};
