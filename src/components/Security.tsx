import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileCheck, 
  UserCheck, 
  RefreshCw 
} from 'lucide-react';

export const Security = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  const securityFeatures = [
    {
      icon: <Lock className="h-6 w-6 text-teal-600" />,
      title: "Chiffrement de bout en bout",
      description: "Toutes les données sont chiffrées avec AES-256 bits pendant le stockage et le transit."
    },
    {
      icon: <Shield className="h-6 w-6 text-teal-600" />,
      title: "Conformité RGPD",
      description: "100% conforme aux réglementations européennes sur la protection des données."
    },
    {
      icon: <Eye className="h-6 w-6 text-teal-600" />,
      title: "Authentification multi-facteurs",
      description: "Sécurisez les accès avec une authentification à plusieurs niveaux."
    },
    {
      icon: <FileCheck className="h-6 w-6 text-teal-600" />,
      title: "Horodatage et signature",
      description: "Signatures électroniques certifiées et horodatage légal des documents."
    }
  ];
  
  const tabContent = [
    {
      title: "Protection des données",
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Protection de vos données sensibles</h4>
            <p className="text-gray-600 mb-6">
              Notre infrastructure est conçue avec les standards de sécurité les plus élevés pour garantir l'intégrité et la confidentialité de vos données.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                  <Lock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">Chiffrement AES-256</h5>
                  <p className="text-gray-600">Vos documents sont protégés par un chiffrement militaire pendant le stockage et le transit.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                  <RefreshCw className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">Clés de chiffrement uniques</h5>
                  <p className="text-gray-600">Chaque fichier est chiffré avec sa propre clé, limitant l'impact en cas de compromission.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                  <Shield className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">Centres de données sécurisés</h5>
                  <p className="text-gray-600">Hébergement dans des centres de données avec surveillance 24/7.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Contrôle d'accès",
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Gestion des droits et permissions</h4>
            <p className="text-gray-600 mb-6">
              Définissez précisément qui peut accéder à quels documents et ce qu'ils peuvent faire avec eux.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                  <UserCheck className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">Permissions granulaires</h5>
                  <p className="text-gray-600">Contrôlez précisément les droits de lecture, écriture, téléchargement ou impression.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                  <Eye className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">Filigranes dynamiques</h5>
                  <p className="text-gray-600">Les documents affichent automatiquement l'identité de l'utilisateur pour prévenir les fuites.</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                  <Lock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">Expiration automatique</h5>
                  <p className="text-gray-600">Définissez des accès limités dans le temps pour les collaborateurs externes.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <div className="text-lg font-medium text-gray-900 mb-2">Rôle administrateur</div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Contrôle total
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <div className="text-lg font-medium text-gray-900 mb-2">Rôle éditeur</div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Peut modifier
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <div className="text-lg font-medium text-gray-900 mb-2">Rôle lecteur</div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 mr-1.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    Lecture seule
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Conformité légale",
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">Respect des réglementations</h4>
            <p className="text-gray-600 mb-6">
              Notre solution répond aux exigences légales les plus strictes en matière de protection des données.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="h-4 w-4 text-teal-600" />
                  </div>
                  <h5 className="text-lg font-medium text-gray-900">RGPD</h5>
                </div>
                <p className="text-sm text-gray-600">Entièrement conforme au Règlement Général sur la Protection des Données de l'Union européenne.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                    <Shield className="h-4 w-4 text-teal-600" />
                  </div>
                  <h5 className="text-lg font-medium text-gray-900">eIDAS</h5>
                </div>
                <p className="text-sm text-gray-600">Respecte le règlement européen sur l'identification électronique et les services de confiance.</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-lg font-medium text-gray-900">Hébergement des données</h5>
                <p className="text-gray-600">Centres de données situés en France et dans l'Union européenne.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="py-20" id="security">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Sécurité et conformité de premier ordre</h2>
          <p className="text-xl text-gray-600">
            Notre plateforme est conçue avec les normes de sécurité les plus strictes pour protéger vos données confidentielles.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-2xl p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row mb-8">
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0 lg:pr-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Infrastructure sécurisée de bout en bout</h3>
              <p className="text-gray-600 mb-8">
                Notre architecture de sécurité multicouche protège vos données à chaque niveau, du stockage à la transmission en passant par l'accès utilisateur.
              </p>
              
              <div className="space-y-2">
                {tabContent.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTab(index)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      activeTab === index 
                        ? 'bg-teal-600 text-white' 
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {tab.title}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="w-full lg:w-2/3">
              {tabContent[activeTab].content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};