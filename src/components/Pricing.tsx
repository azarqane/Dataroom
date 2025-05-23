import React from 'react';
import { CheckCircle, Mail } from 'lucide-react';
import { Button } from './Button';

const plans = [
  {
    name: "Essentiel",
    description: "Créez et gérez vos Data Rooms selon vos besoins.",
    monthlyPrice: 39,
    yearlyPrice: 390,
    features: [
      "1 Data Room active",
      "50 Go de stockage",
      "Partage sécurisé de documents",
      "Contrôle granulaire des accès",
      "Support email (réponse sous 48h)"
    ],
    popular: false,
  },
  {
    name: "Business",
    description: "Augmentez votre capacité de stockage à la demande.",
    monthlyPrice: 99,
    yearlyPrice: 990,
    features: [
      "5 Data Rooms actives",
      "500 Go de stockage",
      "Filigranes dynamiques sur documents",
      "Support prioritaire (email & live chat)",
      "Accès API & journal d'activité complet"
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    description: "Gérez les accès et permissions en détail.",
    monthlyPrice: null,
    yearlyPrice: null,
    features: [
      "Data Rooms illimitées",
      "Stockage personnalisé",
      "SSO, délégation, gestion avancée",
      "Gestionnaire de compte dédié",
      "Support 24/7",
      "Intégrations avancées"
    ],
    popular: false,
    note: "Contactez notre équipe commerciale pour discuter de vos besoins spécifiques en matière de Data Rooms."
  }
];

export const Pricing = () => (
  <section className="min-h-screen py-14 px-2 bg-gradient-to-tr from-gray-950 to-gray-800 flex flex-col items-center">
    <div className="max-w-2xl text-center mb-10">
      <h1 className="text-4xl font-extrabold text-teal-400 mb-2 tracking-tight">Tarifs NeutVault</h1>
      <p className="text-gray-400 text-lg">
        Choisissez le plan qui correspond à votre utilisation des Data Rooms.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
      {plans.map((plan, idx) => (
        <div
          key={plan.name}
          className={`
            flex flex-col bg-gray-900 rounded-2xl border border-gray-800 shadow-xl p-8 relative
            ${plan.popular ? "ring-2 ring-teal-400 scale-105 z-10" : ""}
            transition-transform duration-200
          `}
        >
          {plan.popular && (
            <span className="absolute top-0 right-0 bg-teal-500 text-white text-xs font-bold px-4 py-1 rounded-br-2xl rounded-tl-2xl shadow-lg tracking-wide">
              Populaire
            </span>
          )}
          <h2 className="text-2xl font-bold text-teal-400 mb-1">{plan.name}</h2>
          <p className="mb-4 text-gray-400 text-base">{plan.description}</p>

          {plan.yearlyPrice !== null ? (
            <div className="mb-6">
              <span className="text-4xl font-extrabold text-white">{plan.monthlyPrice}€</span>
              <span className="text-gray-400 font-semibold"> /mois</span>
              <div className="text-sm text-gray-400 mt-1">
                Soit {Math.round((plan.yearlyPrice || 0) / 12)}€ /mois, facturé annuellement
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <span className="text-3xl font-bold text-white">Sur devis</span>
            </div>
          )}

          <ul className="mb-8 space-y-3">
            {plan.features.map((f, fi) => (
              <li key={fi} className="flex items-center text-gray-200">
                <CheckCircle className="w-5 h-5 text-teal-400 mr-2" />
                <span>{f}</span>
              </li>
            ))}
            {plan.note && (
              <li className="text-xs text-teal-400 mt-4">{plan.note}</li>
            )}
          </ul>

          {plan.yearlyPrice !== null ? (
            <Button
              size="lg"
              className={`w-full mt-auto font-bold ${plan.popular ? "bg-gradient-to-tr from-teal-600 to-teal-400" : ""}`}
              variant="primary"
              onClick={() => {/* gestion de l'abonnement */}}
            >
              Commencer l’essai gratuit
            </Button>
          ) : (
            <a
              href="mailto:contact@neutvault.com"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-teal-700 text-white font-bold hover:bg-teal-600 transition-all shadow-lg mt-auto"
            >
              <Mail className="w-5 h-5" /> Contacter l’équipe commerciale
            </a>
          )}
        </div>
      ))}
    </div>

    <div className="w-full max-w-xl mx-auto mt-14 bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center shadow-lg">
      <h3 className="text-xl font-bold text-white mb-2">Des besoins vraiment sur-mesure ?</h3>
      <p className="text-gray-400 mb-4 text-center">
        Notre équipe peut concevoir la solution parfaitement adaptée à votre entreprise, même à grande échelle.
      </p>
      <a
        href="mailto:contact@neutvault.com"
        className="flex items-center gap-2 py-3 px-8 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 text-white font-bold shadow-md hover:brightness-110 transition-all"
      >
        <Mail className="w-5 h-5" /> Contact personnalisé
      </a>
    </div>
  </section>
);
