import React from 'react';
import { Building2, FileCheck, Shield, Users, Search, Activity } from 'lucide-react';
import { Button } from '../Button';

export const RealEstate = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Solutions Immobilières</h1>
          <p className="text-xl text-gray-600">
            Gérez vos transactions immobilières et documents sensibles avec notre Data Room spécialisée.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Building2 className="h-6 w-6 text-teal-600" />,
              title: "Gestion de patrimoine",
              description: "Centralisez tous les documents liés à vos biens immobiliers."
            },
            {
              icon: <FileCheck className="h-6 w-6 text-teal-600" />,
              title: "Documentation technique",
              description: "Organisez plans, diagnostics et documents réglementaires."
            },
            {
              icon: <Shield className="h-6 w-6 text-teal-600" />,
              title: "Sécurité des données",
              description: "Protégez les informations sensibles des biens et des transactions."
            },
            {
              icon: <Users className="h-6 w-6 text-teal-600" />,
              title: "Collaboration",
              description: "Facilitez les échanges entre agents, notaires et clients."
            },
            {
              icon: <Search className="h-6 w-6 text-teal-600" />,
              title: "Due diligence",
              description: "Simplifiez les processus de vérification immobilière."
            },
            {
              icon: <Activity className="h-6 w-6 text-teal-600" />,
              title: "Suivi des transactions",
              description: "Surveillez l'avancement des dossiers immobiliers."
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
                  "Vente d'immeubles",
                  "Gestion locative",
                  "Investissements immobiliers",
                  "Développement de projets",
                  "Audits immobiliers",
                  "Gestion de copropriété"
                ].map((useCase, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 text-white">
                    {useCase}
                  </div>
                ))}
              </div>
              <Button variant="primary" className="bg-white text-blue-900 hover:bg-teal-50">
                Découvrir nos solutions immobilières
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};