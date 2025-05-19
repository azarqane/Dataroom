import React from 'react';
import { Scale, FileCheck, Shield, Users, Lock, Clock } from 'lucide-react';
import { Button } from '../Button';

export const Legal = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Solutions juridiques sécurisées</h1>
          <p className="text-xl text-gray-600">
            Une Data Room dédiée aux professionnels du droit pour gérer et partager des documents confidentiels en toute sécurité.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Scale className="h-6 w-6 text-teal-600" />,
              title: "Gestion des affaires",
              description: "Organisez vos dossiers juridiques avec un accès sécurisé pour les clients et collaborateurs."
            },
            {
              icon: <FileCheck className="h-6 w-6 text-teal-600" />,
              title: "Documents légaux",
              description: "Stockez et partagez contrats, actes et documents juridiques de manière sécurisée."
            },
            {
              icon: <Shield className="h-6 w-6 text-teal-600" />,
              title: "Confidentialité client",
              description: "Protégez les informations sensibles de vos clients avec un chiffrement avancé."
            },
            {
              icon: <Users className="h-6 w-6 text-teal-600" />,
              title: "Collaboration d'équipe",
              description: "Facilitez le travail collaboratif entre avocats, experts et clients."
            },
            {
              icon: <Lock className="h-6 w-6 text-teal-600" />,
              title: "Contrôle d'accès",
              description: "Gérez finement les permissions d'accès aux documents sensibles."
            },
            {
              icon: <Clock className="h-6 w-6 text-teal-600" />,
              title: "Suivi des délais",
              description: "Surveillez les échéances et dates importantes des dossiers."
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100">
              <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-teal-800 rounded-2xl overflow-hidden shadow-xl">
          <div className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Cas d'usage courants</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  "Contentieux complexes",
                  "Arbitrage international",
                  "Dossiers réglementaires",
                  "Contrats commerciaux",
                  "Propriété intellectuelle",
                  "Droit des sociétés"
                ].map((useCase, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 text-white">
                    {useCase}
                  </div>
                ))}
              </div>
              <Button variant="primary" className="bg-white text-blue-900 hover:bg-teal-50">
                Découvrir nos solutions juridiques
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};