import React, { useState } from 'react';
import { Check, HelpCircle, Shield, Database, Users } from 'lucide-react';
import { Button } from './Button';

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
  cta: string;
  popular?: boolean;
  icon: React.ReactNode;
  highlights: string[];
}

export const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  
  const plans: Plan[] = [
    {
      name: "Essentiel",
      description: "Pour les petites équipes avec des besoins basiques",
      monthlyPrice: 49,
      yearlyPrice: 490,
      icon: <Database className="h-6 w-6 text-blue-600" />,
      highlights: [
        "1 Data Room",
        "10 Go de stockage",
        "5 utilisateurs"
      ],
      features: [
        { text: "1 Data Room active", available: true },
        { text: "10 Go d'espace de stockage", available: true },
        { text: "Jusqu'à 5 utilisateurs", available: true },
        { text: "Contrôle d'accès basique", available: true },
        { text: "Chiffrement AES-256", available: true },
        { text: "Support par email", available: true },
        { text: "Historique des accès", available: true },
        { text: "Rapports d'activité", available: false },
        { text: "Support prioritaire", available: false },
      ],
      cta: "Commencer l'essai",
    },
    {
      name: "Business",
      description: "Pour les équipes qui gèrent plusieurs projets",
      monthlyPrice: 149,
      yearlyPrice: 1490,
      icon: <Users className="h-6 w-6 text-teal-600" />,
      popular: true,
      highlights: [
        "5 Data Rooms",
        "50 Go de stockage",
        "25 utilisateurs"
      ],
      features: [
        { text: "5 Data Rooms actives", available: true },
        { text: "50 Go d'espace de stockage", available: true },
        { text: "Jusqu'à 25 utilisateurs", available: true },
        { text: "Contrôle d'accès avancé", available: true },
        { text: "Chiffrement AES-256", available: true },
        { text: "Support prioritaire", available: true },
        { text: "Historique des accès", available: true },
        { text: "Rapports d'activité", available: true },
        { text: "Personnalisation de l'interface", available: true },
      ],
      cta: "Commencer l'essai",
    },
    {
      name: "Enterprise",
      description: "Solution personnalisée pour les grandes organisations",
      monthlyPrice: 399,
      yearlyPrice: 3990,
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      highlights: [
        "Data Rooms illimitées",
        "Stockage illimité",
        "Utilisateurs illimités"
      ],
      features: [
        { text: "Data Rooms illimitées", available: true },
        { text: "Stockage illimité", available: true },
        { text: "Utilisateurs illimités", available: true },
        { text: "Contrôle d'accès personnalisable", available: true },
        { text: "Chiffrement personnalisé", available: true },
        { text: "Support 24/7 dédié", available: true },
        { text: "Historique des accès illimité", available: true },
        { text: "Rapports personnalisés", available: true },
        { text: "Solution sur mesure", available: true },
      ],
      cta: "Contacter les ventes",
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
              >
                Mensuel
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
              >
                Annuel <span className="text-teal-600 font-semibold">-16%</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${
                    plan.popular ? 'bg-teal-100' : 'bg-gray-100'
                  }`}>
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
              <Button variant="secondary">Contactez-nous</Button>
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