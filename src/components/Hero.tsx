import React from 'react';
import { Button } from './Button';
import { Shield, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Rocket, Calendar } from "lucide-react"; // Ajoute en haut du fichier
export const Hero = ({ onOpenSignup }: { onOpenSignup: () => void }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden" id="hero">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 z-0"></div>
      <div className="absolute right-0 top-1/4 w-1/3 h-64 bg-teal-100 rounded-full filter blur-3xl opacity-20"></div>
      <div className="absolute left-0 bottom-1/3 w-1/4 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
            <div className="max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-500 ml-2"></span>
                <span className="text-sm font-medium text-teal-700">
                  {t("hero_compliance")}
                </span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
                {t("hero_title")} <span className="text-teal-600">{t("hero_title_highlight")}</span> {t("hero_title_end")}
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
                {t("hero_desc")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
  {/* Essai gratuit / démarrer */}
  <button
    onClick={onOpenSignup}
    className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-700 shadow-xl text-white text-xl font-extrabold tracking-tight transition-all duration-200 focus:ring-4 focus:ring-teal-200 focus:outline-none active:scale-95 animate-fadein"
    style={{ minWidth: 180 }}
  >
    <Rocket className="w-6 h-6 -ml-1" />
    {t("hero_cta_trial")}
  </button>
  {/* Démo */}
  <button
    onClick={onOpenSignup}
    className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white border-2 border-teal-400 text-teal-600 hover:bg-teal-50 hover:border-teal-600 shadow-lg text-xl font-extrabold tracking-tight transition-all duration-200 focus:ring-4 focus:ring-teal-100 focus:outline-none active:scale-95 animate-fadein"
    style={{ minWidth: 180 }}
  >
    <Calendar className="w-6 h-6 -ml-1" />
    {t("hero_cta_demo")}
  </button>
</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-teal-600 ml-2" />
                  <span className="text-gray-700">{t("hero_feature1")}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-teal-600 ml-2" />
                  <span className="text-gray-700">{t("hero_feature2")}</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-teal-600 ml-2" />
                  <span className="text-gray-700">{t("hero_feature3")}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
              <div className="absolute -bottom-8 right-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 -left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
              
              <div className="relative">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-4 border-white">
                  <div className="bg-gray-800 h-12 flex items-center px-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-gray-400">neutvault.com</span>
                    </div>
                  </div>
                  <div className="relative w-full h-72 bg-gray-100">
                    <img 
                      src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt={t("hero_img_alt")}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-6 w-6 text-teal-500" />
                        <span className="text-white font-medium">{t("hero_img_title")}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/90 p-2 rounded text-xs text-center">
                          {t("hero_img_feat1")}
                        </div>
                        <div className="bg-white/90 p-2 rounded text-xs text-center">
                          {t("hero_img_feat2")}
                        </div>
                        <div className="bg-white/90 p-2 rounded text-xs text-center">
                          {t("hero_img_feat3")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 -bottom-8 bg-white rounded-xl shadow-lg p-4 w-40 border border-gray-100 animate-float">
                  <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full mb-2">
                    <Shield className="h-4 w-4 text-teal-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-800">{t("hero_card1")}</p>
                </div>
                
                <div className="absolute -left-6 top-1/3 bg-white rounded-xl shadow-lg p-4 w-44 border border-gray-100 animate-float animation-delay-1000">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-gray-800">{t("hero_card2")}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full w-11/12"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
