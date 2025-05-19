import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, Send, Check, HelpCircle, Shield, Database, Users } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';

interface PlanFeature {
  text: string;
  available: boolean;
  tooltip?: string;
}

interface Plan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PlanFeature[];
  cta: ReactNode;
  popular?: boolean;
  icon: React.ReactNode;
  highlights: string[];
}

export const Pricing = () => {
  const navigate = useNavigate();
  const [annual, setAnnual] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'general'
  });

  const plans: Plan[] = [
    {
      name: "Offre Start",
      description: "Pour les freelances, indépendants et petits projets",
      monthlyPrice: 49,
      yearlyPrice: 490, // 2 mois offerts
      icon: <Database className="h-6 w-6 text-gray-500" />,
      highlights: [
        "1 Data Room active",
        "10 Go de stockage sécurisé",
        "Jusqu'à 2 administrateurs",
      ],
      features: [
        { text: "Support email standard (jours ouvrés)", available: true },
        { text: "Essai gratuit 14 jours sans carte bancaire", available: true },
        { text: "Rapports d'activité simples (accès récents)", available: true },
        { text: "Journalisation blockchain", available: false },
        { text: "Filigrane personnalisé", available: false },
        { text: "Support prioritaire", available: false },
      ],
      cta: "Commencer l'essai",
    },
    {
      name: "Offre Essentielle",
      popular: true,
      description: "Pour les indépendants, petites équipes, professions libérales",
      monthlyPrice: 99,
      yearlyPrice: 990, // 2 mois offerts
      icon: <Database className="h-6 w-6 text-blue-600" />,
      highlights: [
        "10 Data Rooms actives",
        "50 Go de stockage sécurisé",
        "Jusqu'à 5 administrateurs",
      ],
      features: [
        { text: "Journalisation blockchain des accès", available: true },
        { text: "Filigrane dynamique anti-capture d'écran", available: true },
        { text: "Support email local (9h-18h, jours ouvrés)", available: true },
        { text: "Essai gratuit 14 jours sans carte bancaire", available: true },
        { text: "Rapports d'activité basiques", available: false },
        { text: "Support prioritaire", available: false },
      ],
      cta: "Souscrire maintenant",
    },
    {
      name: "Offre Business",
      description: "Pour bureaux d'études, cabinets d'architectes, groupes multi-sites",
      monthlyPrice: 249,
      yearlyPrice: 2490,
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      highlights: [
        "Data Rooms illimitées",
        "500 Go de stockage sécurisé",
        "Jusqu'à 30 administrateurs",
      ],
      features: [
        { text: "Visualiseur sécurisé (plans, PDF, CAO)", available: true },
        { text: "Anti-capture d'écran et verrouillage export", available: true },
        { text: "Watermarking personnalisé", available: true },
        { text: "Archivage légal 10 ans", available: true },
        { text: "Support premium 24/7 dédié", available: true },
        { text: "Rapports d'activité avancés", available: true },
      ],
      cta: "Obtenir un devis",
    },
  ];

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Des forfaits adaptés à vos besoins</h2>
          <p className="text-xl text-gray-600 mb-8">
            Choisissez le plan qui correspond à votre utilisation des Data Rooms.
          </p>
          <div className="flex items-center justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-full inline-flex">
              <button
                onClick={() => setAnnual(false)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  !annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
                aria-pressed={!annual}
              >
                Mensuel
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
                aria-pressed={annual}
              >
                Annuel <span className="text-teal-600 font-semibold">(2 mois offerts)</span>
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl overflow-hidden transition-all ${
                plan.popular
                  ? 'border-2 border-teal-600 shadow-xl scale-105 md:-mt-4 z-10'
                  : 'border border-gray-200 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-teal-600 text-white text-center text-sm font-medium py-1">
                  Le plus populaire
                </div>
              )}

              <div className={`bg-white p-8 ${plan.popular ? 'pt-10' : ''}`}>
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                      plan.popular ? 'bg-teal-100' : 'bg-gray-100'
                    }`}
                  >
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-500 text-sm">{plan.description}</p>
                  </div>
                </div>

                <div className="my-6">
                  <div className="flex items-end">
                    <span className="text-4xl font-bold text-gray-900">
                      {annual ? plan.yearlyPrice : plan.monthlyPrice}€
                    </span>
                    <span className="text-gray-500 ml-2 pb-1">{annual ? '/an' : '/mois'}</span>
                  </div>
                  {annual && (
                    <p className="text-sm text-gray-500 mt-1">
                      soit {Math.round(plan.yearlyPrice / 12)}€ par mois, facturé annuellement
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  {plan.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 mb-2 last:mb-0">
                      <Check className="h-5 w-5 text-teal-600 mr-2" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.popular ? 'primary' : 'outline'} 
                  className="w-full mb-6"
                  onClick={() => navigate('/auth')}
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {feature.available ? (
                          <Check className="h-5 w-5 text-teal-600" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border border-gray-300"></div>
                        )}
                      </div>
                      <div className="ml-3 flex items-center">
                        <span className={feature.available ? 'text-gray-700' : 'text-gray-400'}>
                          {feature.text}
                        </span>
                        {feature.tooltip && (
                          <div className="relative group ml-1">
                            <HelpCircle className="h-4 w-4 text-gray-400" />
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
                              {feature.tooltip}
                            </div>
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-4xl mx-auto bg-gray-50 rounded-2xl p-8 border border-gray-200">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/3 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Besoin d'une solution sur mesure ?</h3>
              <p className="text-gray-600">
                Contactez notre équipe commerciale pour discuter de vos besoins spécifiques en matière de Data Rooms.
              </p>
            </div>
            <div className="w-full md:w-1/3 md:text-right">
              <a href="#contact" className="text-teal-600 hover:text-teal-700 font-medium">
                <Button variant="secondary">Contactez-nous</Button>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-lg font-semibold text-gray-900 mb-1">Data Rooms flexibles</div>
              <p className="text-gray-600 text-sm text-center md:text-left">
                Créez et gérez vos Data Rooms selon vos besoins.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-lg font-semibold text-gray-900 mb-1">Stockage évolutif</div>
              <p className="text-gray-600 text-sm text-center md:text-left">
                Augmentez votre capacité de stockage à la demande.
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-lg font-semibold text-gray-900 mb-1">Contrôle granulaire</div>
              <p className="text-gray-600 text-sm text-center md:text-left">
                Gérez les accès et permissions en détail.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};