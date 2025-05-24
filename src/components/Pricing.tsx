import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, Send, Check, HelpCircle, Shield, Database, Users } from 'lucide-react';
import { Button } from './Button';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  const [annual, setAnnual] = useState(true);

  // Si arabe, on utilise MAD, sinon EUR
  const isAr = i18n.language === 'ar';

  // Les plans (prix restent en nombre, seul l'affichage change)
  const plans: Plan[] = [
    {
      name: t("pricing_plan1_name"),
      description: t("pricing_plan1_desc"),
      monthlyPrice: isAr ? 490 : 49,
      yearlyPrice: isAr ? 4900 : 490, // Exemple : prix *10 pour MAD (à ajuster selon ta politique !)
      icon: <Database className="h-6 w-6 text-gray-500" />,
      highlights: [
        t("pricing_plan1_highlight1"),
        t("pricing_plan1_highlight2"),
        t("pricing_plan1_highlight3"),
      ],
      features: [
        { text: t("pricing_plan1_feature1"), available: true },
        { text: t("pricing_plan1_feature2"), available: true },
        { text: t("pricing_plan1_feature3"), available: true },
        { text: t("pricing_plan1_feature4"), available: false },
        { text: t("pricing_plan1_feature5"), available: false },
        { text: t("pricing_plan1_feature6"), available: false },
      ],
      cta: t("pricing_plan1_cta"),
    },
    {
      name: t("pricing_plan2_name"),
      popular: true,
      description: t("pricing_plan2_desc"),
      monthlyPrice: isAr ? 990 : 99,
      yearlyPrice: isAr ? 9900 : 990,
      icon: <Database className="h-6 w-6 text-blue-600" />,
      highlights: [
        t("pricing_plan2_highlight1"),
        t("pricing_plan2_highlight2"),
        t("pricing_plan2_highlight3"),
      ],
      features: [
        { text: t("pricing_plan2_feature1"), available: true },
        { text: t("pricing_plan2_feature2"), available: true },
        { text: t("pricing_plan2_feature3"), available: true },
        { text: t("pricing_plan2_feature4"), available: true },
        { text: t("pricing_plan2_feature5"), available: false },
        { text: t("pricing_plan2_feature6"), available: false },
      ],
      cta: t("pricing_plan2_cta"),
    },
    {
      name: t("pricing_plan3_name"),
      description: t("pricing_plan3_desc"),
      monthlyPrice: isAr ? 2490 : 249,
      yearlyPrice: isAr ? 24900 : 2490,
      icon: <Shield className="h-6 w-6 text-purple-600" />,
      highlights: [
        t("pricing_plan3_highlight1"),
        t("pricing_plan3_highlight2"),
        t("pricing_plan3_highlight3"),
      ],
      features: [
        { text: t("pricing_plan3_feature1"), available: true },
        { text: t("pricing_plan3_feature2"), available: true },
        { text: t("pricing_plan3_feature3"), available: true },
        { text: t("pricing_plan3_feature4"), available: true },
        { text: t("pricing_plan3_feature5"), available: true },
        { text: t("pricing_plan3_feature6"), available: true },
      ],
      cta: t("pricing_plan3_cta"),
    },
  ];

  // Fonction pour afficher le prix au bon format
  const formatPrice = (price: number, perYear: boolean) => {
    if (isAr) {
      return (
        <>
          <span className="text-4xl font-bold text-gray-900">{price} د.م</span>
          <span className="text-gray-500 ml-2 pb-1">{perYear ? '/سنة' : '/شهر'}</span>
        </>
      );
    }
    return (
      <>
        <span className="text-4xl font-bold text-gray-900">{price}€</span>
        <span className="text-gray-500 ml-2 pb-1">{perYear ? '/an' : '/mois'}</span>
      </>
    );
  };

  return (
    <section className="py-20" id="pricing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("pricing_title")}</h2>
          <p className="text-xl text-gray-600 mb-8">
            {t("pricing_subtitle")}
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
                {isAr ? 'شهري' : 'Mensuel'}
              </button>
              <button
                onClick={() => setAnnual(true)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  annual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
                aria-pressed={annual}
              >
                {isAr ? 'سنوي' : 'Annuel'} <span className="text-teal-600 font-semibold">{isAr ? '(شهران مجانا)' : '(2 mois offerts)'}</span>
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
                  {t("pricing_most_popular")}
                </div>
              )}

              <div className={`bg-white p-8 ${plan.popular ? 'pt-10' : ''}`}>
                <div className="flex items-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ml-4 ${
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
                    {formatPrice(annual ? plan.yearlyPrice : plan.monthlyPrice, annual)}
                  </div>
                  {annual && (
                    <p className="text-sm text-gray-500 mt-1">
                      {isAr
                        ? `يعادل تقريبًا ${Math.round(plan.yearlyPrice / 12)} د.م/شهر، تدفع سنويًا`
                        : `soit ${Math.round(plan.yearlyPrice / 12)}€ par mois, facturé annuellement`
                      }
                    </p>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  {plan.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center text-gray-700 mb-2 last:mb-0">
                      <Check className="h-5 w-5 text-teal-600 ml-2" />
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
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{t("pricing_contact_title")}</h3>
              <p className="text-gray-600">
                {t("pricing_contact_desc")}
              </p>
            </div>
            <div className="w-full md:w-1/3 md:text-right">
              <a href="#contact" className="text-teal-600 hover:text-teal-700 font-medium">
                <Button variant="secondary">{t("pricing_contact_cta")}</Button>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center md:items-start">
              <div className="text-lg font-semibold text-gray-900 mb-1">{t("pricing_info1_title")}</div>
              <p className="text-gray-600 text-sm text-center md:text-left">
                {t("pricing_info1_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-lg font-semibold text-gray-900 mb-1">{t("pricing_info2_title")}</div>
              <p className="text-gray-600 text-sm text-center md:text-left">
                {t("pricing_info2_desc")}
              </p>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <div className="text-lg font-semibold text-gray-900 mb-1">{t("pricing_info3_title")}</div>
              <p className="text-gray-600 text-sm text-center md:text-left">
                {t("pricing_info3_desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
