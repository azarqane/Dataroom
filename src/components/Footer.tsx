import React from 'react';
import { Shield, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-teal-500 mr-2" />
              <span className="text-xl font-bold">NeutVault</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Solution de Data Room sécurisée pour le partage et la collaboration sur vos documents confidentiels. Conforme RGPD, chiffrement de bout en bout.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-teal-500 mr-3" />
                <a href="mailto:contact@neutvault.fr" className="text-gray-400 hover:text-teal-500 transition-colors">
                  contact@neutvault.fr
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-teal-500 mr-3" />
                <a href="tel:+33123456789" className="text-gray-400 hover:text-teal-500 transition-colors">
                  +33 1 23 45 67 89
                </a>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-teal-500 mr-3 mt-1" />
                <span className="text-gray-400">
                  8 rue de la Paix<br />
                  75002 Paris, France
                </span>
              </div>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4">Produit</h5>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-teal-500 transition-colors">Fonctionnalités</a></li>
              <li><a href="#security" className="text-gray-400 hover:text-teal-500 transition-colors">Sécurité</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-teal-500 transition-colors">Tarifs</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Intégrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4">Solutions</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">M&A et Due Diligence</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Juridique</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Finance</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Immobilier</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Conformité</a></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-semibold mb-4">Entreprise</h5>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">À propos</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Carrières</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Presse</a></li>
              <li><a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} NeutVault. Tous droits réservés.
            </p>
          </div>
          
          <div className="flex space-x-6 mb-4 md:mb-0">
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
          
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors text-sm">
              Confidentialité
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors text-sm">
              Conditions d'utilisation
            </a>
            <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors text-sm">
              Mentions légales
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            NeutVault est une marque déposée. Toutes les autres marques mentionnées sont la propriété de leurs détenteurs respectifs.
          </p>
        </div>
      </div>
    </footer>
  );
};