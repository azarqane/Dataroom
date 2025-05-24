import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-teal-600" />,
      title: t("features_security_title"),
      description: t("features_security_desc")
    },
    {
      icon: <Fingerprint className="h-6 w-6 text-teal-600" />,
      title: t("features_proof_title"),
      description: t("features_proof_desc")
    },
    {
      icon: <Ban className="h-6 w-6 text-teal-600" />,
      title: t("features_copyprotection_title"),
      description: t("features_copyprotection_desc")
    },
    {
      icon: <Camera className="h-6 w-6 text-teal-600" />,
      title: t("features_watermark_title"),
      description: t("features_watermark_desc")
    },
    {
      icon: <History className="h-6 w-6 text-teal-600" />,
      title: t("features_history_title"),
      description: t("features_history_desc")
    },
    {
      icon: <Lock className="h-6 w-6 text-teal-600" />,
      title: t("features_accesscontrol_title"),
      description: t("features_accesscontrol_desc")
    }
  ];
  
  const useCases = [
    {
      icon: <Scale className="h-6 w-6 text-teal-600" />,
      title: t("usecase_lawyers_title"),
      features: [
        t("usecase_lawyers_feat1"),
        t("usecase_lawyers_feat2"),
        t("usecase_lawyers_feat3"),
        t("usecase_lawyers_feat4")
      ]
    },
    {
      icon: <FileCheck className="h-6 w-6 text-teal-600" />,
      title: t("usecase_accountants_title"),
      features: [
        t("usecase_accountants_feat1"),
        t("usecase_accountants_feat2"),
        t("usecase_accountants_feat3"),
        t("usecase_accountants_feat4")
      ]
    },
    {
      icon: <Building2 className="h-6 w-6 text-teal-600" />,
      title: t("usecase_architects_title"),
      features: [
        t("usecase_architects_feat1"),
        t("usecase_architects_feat2"),
        t("usecase_architects_feat3"),
        t("usecase_architects_feat4")
      ]
    },
    {
      icon: <Brush className="h-6 w-6 text-teal-600" />,
      title: t("usecase_designers_title"),
      features: [
        t("usecase_designers_feat1"),
        t("usecase_designers_feat2"),
        t("usecase_designers_feat3"),
        t("usecase_designers_feat4")
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="features">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("features_title")}</h2>
          <p className="text-xl text-gray-600">
            {t("features_subtitle")}
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
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">{t("solutions_title")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {useCases.map((useCase, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center ml-4">
                      {useCase.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{useCase.title}</h4>
                  </div>
                  <ul className="space-y-3">
                    {useCase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Activity className="h-5 w-5 text-teal-600 ml-2 flex-shrink-0 mt-1" />
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
                {t("cta_title")}
              </h3>
              <p className="text-blue-100 mb-8">
                {t("cta_subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button 
                  onClick={() => navigate('/auth')} 
                  className="bg-white text-blue-900 hover:bg-teal-50 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {t("cta_free_trial")}
                </button>
                <button 
                  onClick={() => navigate('/auth')}
                  className="bg-transparent border border-white text-white hover:bg-blue-800 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {t("cta_demo")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
