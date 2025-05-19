import React from 'react';
import { 
  Scale, 
  FileCheck, 
  Shield, 
  Users, 
  Activity,
  Building2,
  Brush,
  Fingerprint,
  Camera,
  Ban,
  History,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
  <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100">
    <div className="w-12 h-12 rounded-lg bg-teal-100 flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-teal-600" />,
      title: "Sécurité de niveau entreprise",
      description: "Chiffrement AES-256 de bout en bout pour protéger vos documents sensibles avec une traçabilité blockchain."
    },
    {
      icon: <Fingerprint className="h-6 w-6 text-teal-600" />,
      title: "Preuve de consultation",
      description: "Journalisation blockchain infalsifiable des consultations de documents avec horodatage certifié."
    },
    {
      icon: <Ban className="h-6 w-6 text-teal-600" />,
      title: "Protection contre la copie",
      description: "Blocage des captures d'écran et téléchargements non autorisés pour protéger vos documents."
    },
    {
      icon: <Camera className="h-6 w-6 text-teal-600" />,
      title: "Filigranes dynamiques",
      description: "Filigranes personnalisés avec les informations de l'utilisateur pour tracer l'origine des fuites."
    },
    {
      icon: <History className="h-6 w-6 text-teal-600" />,
      title: "Historique complet",
      description: "Suivi détaillé de toutes les interactions avec vos documents, certifié par blockchain."
    },
    {
      icon: <Lock className="h-6 w-6 text-teal-600" />,
      title: "Contrôle d'accès avancé",
      description: "Gestion granulaire des droits d'accès avec authentification forte et révocation instantanée."
    }
  ];
  
  const useCases = [
    {
      icon: <Scale className="h-6 w-6 text-teal-600" />,
      title: "Cabinets d'avocats",
      features: [
        "Preuve de consultation des documents juridiques",
        "Protection des documents confidentiels",
        "Traçabilité des échanges avec les clients",
        "Horodatage certifié blockchain"
      ]
    },
    {
      icon: <FileCheck className="h-6 w-6 text-teal-600" />,
      title: "Experts-comptables",
      features: [
        "Sécurisation des documents comptables",
        "Preuve de transmission des bilans",
        "Protection des données financières",
        "Suivi des consultations client"
      ]
    },
    {
      icon: <Building2 className="h-6 w-6 text-teal-600" />,
      title: "Architectes",
      features: [
        "Protection des plans et designs",
        "Preuve de validation client",
        "Contrôle des versions",
        "Traçabilité des modifications"
      ]
    },
    {
      icon: <Brush className="h-6 w-6 text-teal-600" />,
      title: "Designers",
      features: [
        "Protection de la propriété intellectuelle",
        "Preuve de présentation des créations",
        "Filigranes personnalisés",
        "Contrôle de la diffusion"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Protection et traçabilité blockchain pour vos documents sensibles</h2>
          <p className="text-xl text-gray-600">
            Sécurisez vos échanges de documents avec une preuve infalsifiable de consultation et une protection contre la copie.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
        
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden" id="solutions">
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Solutions adaptées à votre profession</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                      {useCase.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{useCase.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Activity className="h-5 w-5 text-teal-600 mr-2 flex-shrink-0 mt-1" />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-900 to-teal-800 p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h3 className="text-2xl font-bold text-white mb-4">
                Protégez vos documents sensibles avec une traçabilité blockchain
              </h3>
              <p className="text-blue-100 mb-8">
                Bénéficiez d'une preuve infalsifiable de consultation de vos documents et d'une protection complète contre la copie non autorisée.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => navigate('/auth')} 
                  className="bg-white text-blue-900 hover:bg-teal-50 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Démarrer l'essai gratuit
                </button>
                <button 
                  onClick={() => navigate('/auth')}
                  className="bg-transparent border border-white text-white hover:bg-blue-800 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Demander une démo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};