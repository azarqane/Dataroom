import React from 'react';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Bloc branding/contact */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Shield className={`h-8 w-8 text-teal-500 ${isAr ? "ml-2" : "mr-2"}`} />
              <span className="text-xl font-bold">NeutVault</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              {t("footer_desc")}
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className={`h-5 w-5 text-teal-500 ${isAr ? "ml-3" : "mr-3"}`} />
                <a href="mailto:contact@neutvault.fr" className="text-gray-400 hover:text-teal-500 transition-colors">
                  contact@neutvault.fr
                </a>
              </div>
              <div className="flex items-center">
                <Phone className={`h-5 w-5 text-teal-500 ${isAr ? "ml-3" : "mr-3"}`} />
                <a href="tel:+33123456789" className="text-gray-400 hover:text-teal-500 transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className={`h-5 w-5 text-teal-500 mt-1 ${isAr ? "ml-3" : "mr-3"}`} />
                <span className="text-gray-400">
                  {t("footer_address")}
                </span>
              </div>
            </div>
          </div>

          {/* Produit */}
          <div>
            <h5 className="text-lg font-semibold mb-4">{t("footer_product")}</h5>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_features")}</a></li>
              <li><a href="#security" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_security")}</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_pricing")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_integrations")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_roadmap")}</a></li>
            </ul>
          </div>
          
          {/* Solutions */}
          <div>
            <h5 className="text-lg font-semibold mb-4">{t("footer_solutions")}</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_solutions_ma")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_solutions_legal")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_solutions_finance")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_solutions_realestate")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_solutions_compliance")}</a></li>
            </ul>
          </div>
          
          {/* Entreprise */}
          <div>
            <h5 className="text-lg font-semibold mb-4">{t("footer_company")}</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_about")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_blog")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_careers")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_press")}</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">{t("footer_contact")}</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} NeutVault. {t("footer_copyright")}
            </p>
          </div>
          
          <div className={`flex ${isAr ? "space-x-reverse" : ""} space-x-6 mb-4 md:mb-0`}>
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="Facebook">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="Twitter">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors" aria-label="Instagram">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
          
          <div className={`flex ${isAr ? "space-x-reverse" : ""} space-x-4`}>
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors text-sm">
              {t("footer_privacy")}
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors text-sm">
              {t("footer_terms")}
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors text-sm">
              {t("footer_legal")}
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            {t("footer_trademark")}
          </p>
        </div>
      </div>
    </footer>
  );
};
