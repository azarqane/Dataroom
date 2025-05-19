import React from 'react';
import { Button } from './Button';
import { Shield, CheckCircle } from 'lucide-react';

export const Hero = () => {
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
                <span className="w-2 h-2 rounded-full bg-teal-500 mr-2"></span>
                <span className="text-sm font-medium text-teal-700">Solution RGPD-compliant</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight mb-6">
                La Data Room <span className="text-teal-600">sécurisée</span> pour tous vos documents sensibles
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl">
                Partagez, collaborez et sécurisez vos documents confidentiels avec notre solution de Data Room ultra-sécurisée et intuitive.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <Button variant="primary" size="lg">
                  Démarrer l'essai gratuit
                </Button>
                <Button variant="outline" size="lg">
                  Demander une démo
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                  <span className="text-gray-700">Chiffrement AES-256</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                  <span className="text-gray-700">Conforme RGPD</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2" />
                  <span className="text-gray-700">Support 24/7</span>
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
                      <span className="text-xs text-gray-400">neutvault.fr</span>
                    </div>
                  </div>
                  <div className="relative w-full h-72 bg-gray-100">
                    <img 
                      src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Interface de la data room" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-6 w-6 text-teal-500" />
                        <span className="text-white font-medium">Document Center</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white/90 p-2 rounded text-xs text-center">
                          Fichiers sécurisés
                        </div>
                        <div className="bg-white/90 p-2 rounded text-xs text-center">
                          Contrôle d'accès
                        </div>
                        <div className="bg-white/90 p-2 rounded text-xs text-center">
                          Activité en temps réel
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -right-4 -bottom-8 bg-white rounded-xl shadow-lg p-4 w-40 border border-gray-100 animate-float">
                  <div className="flex items-center justify-center w-8 h-8 bg-teal-100 rounded-full mb-2">
                    <Shield className="h-4 w-4 text-teal-600" />
                  </div>
                  <p className="text-xs font-medium text-gray-800">Documents chiffrés de bout en bout</p>
                </div>
                
                <div className="absolute -left-6 top-1/3 bg-white rounded-xl shadow-lg p-4 w-44 border border-gray-100 animate-float animation-delay-1000">
                  <div className="flex items-center space-x-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-gray-800">Protection 24/7</span>
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