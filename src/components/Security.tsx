import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Eye, 
  FileCheck, 
  UserCheck, 
  RefreshCw 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Security = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { t } = useTranslation();

  const securityFeatures = [
    {
      icon: <Lock className="h-6 w-6 text-teal-600" />,
      title: t("security_feat1_title"),
      description: t("security_feat1_desc")
    },
    {
      icon: <Shield className="h-6 w-6 text-teal-600" />,
      title: t("security_feat2_title"),
      description: t("security_feat2_desc")
    },
    {
      icon: <Eye className="h-6 w-6 text-teal-600" />,
      title: t("security_feat3_title"),
      description: t("security_feat3_desc")
    },
    {
      icon: <FileCheck className="h-6 w-6 text-teal-600" />,
      title: t("security_feat4_title"),
      description: t("security_feat4_desc")
    }
  ];

  const tabContent = [
    {
      title: t("security_tab1_title"),
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">{t("security_tab1_subtitle")}</h4>
            <p className="text-gray-600 mb-6">
              {t("security_tab1_desc")}
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center ml-4">
                  <Lock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">{t("security_tab1_feat1_title")}</h5>
                  <p className="text-gray-600">{t("security_tab1_feat1_desc")}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center ml-4">
                  <RefreshCw className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">{t("security_tab1_feat2_title")}</h5>
                  <p className="text-gray-600">{t("security_tab1_feat2_desc")}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center ml-4">
                  <Shield className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">{t("security_tab1_feat3_title")}</h5>
                  <p className="text-gray-600">{t("security_tab1_feat3_desc")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t("security_tab2_title"),
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">{t("security_tab2_subtitle")}</h4>
            <p className="text-gray-600 mb-6">
              {t("security_tab2_desc")}
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center ml-4">
                  <UserCheck className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">{t("security_tab2_feat1_title")}</h5>
                  <p className="text-gray-600">{t("security_tab2_feat1_desc")}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center ml-4">
                  <Eye className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">{t("security_tab2_feat2_title")}</h5>
                  <p className="text-gray-600">{t("security_tab2_feat2_desc")}</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center ml-4">
                  <Lock className="h-5 w-5 text-teal-600" />
                </div>
                <div>
                  <h5 className="text-lg font-medium text-gray-900">{t("security_tab2_feat3_title")}</h5>
                  <p className="text-gray-600">{t("security_tab2_feat3_desc")}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <div className="text-lg font-medium text-gray-900 mb-2">{t("security_tab2_admin")}</div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 ml-1.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    {t("security_tab2_admin_desc")}
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <div className="text-lg font-medium text-gray-900 mb-2">{t("security_tab2_editor")}</div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 ml-1.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    {t("security_tab2_editor_desc")}
                  </li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded shadow-sm border border-gray-100">
                <div className="text-lg font-medium text-gray-900 mb-2">{t("security_tab2_reader")}</div>
                <ul className="space-y-1 text-sm text-gray-600">
                  <li className="flex items-center">
                    <svg className="w-4 h-4 ml-1.5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    {t("security_tab2_reader_desc")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: t("security_tab3_title"),
      content: (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-6">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">{t("security_tab3_subtitle")}</h4>
            <p className="text-gray-600 mb-6">
              {t("security_tab3_desc")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center ml-3">
                    <Shield className="h-4 w-4 text-teal-600" />
                  </div>
                  <h5 className="text-lg font-medium text-gray-900">{t("security_tab3_rgpd")}</h5>
                </div>
                <p className="text-sm text-gray-600">{t("security_tab3_rgpd_desc")}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center ml-3">
                    <Shield className="h-4 w-4 text-teal-600" />
                  </div>
                  <h5 className="text-lg font-medium text-gray-900">{t("security_tab3_eidas")}</h5>
                </div>
                <p className="text-sm text-gray-600">{t("security_tab3_eidas_desc")}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 p-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="text-lg font-medium text-gray-900">{t("security_tab3_hosting_title")}</h5>
                <p className="text-gray-600">{t("security_tab3_hosting_desc")}</p>
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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("security_title")}</h2>
          <p className="text-xl text-gray-600">
            {t("security_desc")}
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
              <h3 className="text-2xl font-bold text-gray-900 mb-6">{t("security_infra_title")}</h3>
              <p className="text-gray-600 mb-8">
                {t("security_infra_desc")}
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
