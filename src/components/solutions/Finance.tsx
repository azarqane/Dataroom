import React from 'react';
import { Wallet, BarChart3, FileText, Lock, Shield, Users } from 'lucide-react';
import { Button } from '../Button';

export const Finance = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Solutions financières sécurisées</h1>
          <p className="text-xl text-gray-600">
            Protégez vos données financières sensibles avec notre Data Room spécialisée pour le secteur financier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Wallet className="h-6 w-6 text-teal-600" />,
              title: "Gestion d'actifs",
              description: "Sécurisez les rapports d'investissement, analyses de portefeuille et documents réglementaires."
            },
            {
              icon: <BarChart3 className="h-6 w-6 text-teal-600" />,
              title: "Rapports financiers",
              description: "Partagez les états financiers, rapports d'audit et analyses de manière sécurisée."
            },
            {
              icon: <FileText className="h-6 w-6 text-teal-600" />,
              title: "Documentation bancaire",
              description: "Gérez les dossiers de crédit, KYC et documents de conformité en toute sécurité."
            },
            {
              icon: <Lock className="h-6 w-6 text-teal-600" />,
              title: "Conformité réglementaire",
              description: "Assurez la conformité avec les réglementations financières (RGPD, MiFID II, etc.)."
            },
            {
              icon: <Shield className="h-6 w-6 text-teal-600" />,
              title: "Protection des données",
              description: "Sécurisez les informations confidentielles avec un chiffrement de bout en bout."
            },
            {
              icon: <Users className="h-6 w-6 text-teal-600" />,
              title: "Collaboration sécurisée",
              description: "Facilitez la collaboration entre équipes, auditeurs et régulateurs."
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
                  "Levées de fonds et IPO",
                  "Audits financiers",
                  "Rapports réglementaires",
                  "Due diligence financière",
                  "Gestion des investissements",
                  "Documentation de crédit"
                ].map((useCase, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-4 text-white">
                    {useCase}
                  </div>
                ))}
              </div>
              <Button variant="primary" className="bg-white text-blue-900 hover:bg-teal-50">
                Découvrir nos solutions financières
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};