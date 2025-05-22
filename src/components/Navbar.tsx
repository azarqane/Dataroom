import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import Logo from "./Logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => document.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                } else {
                  navigate('/');
                }
              }}
              className="cursor-pointer flex items-center flex-shrink-0 mr-6 md:mr-10 group"
            >
              <Logo size={28} textSize="text-lg md:text-xl" />
            </div>

            <nav className="hidden md:flex space-x-6">
              <button 
                onClick={() => handleNavigation('features')} 
                className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
              >
                Fonctionnalités
              </button>
              <button 
                onClick={() => handleNavigation('security')} 
                className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
              >
                Sécurité
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-teal-600 font-medium transition-colors">
                  <span>Cas d'usage</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute left-0 w-64 mt-2 bg-white rounded-xl shadow-lg py-3 z-10 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 transform origin-top-left">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Professions juridiques & financières</span>
                  </div>
                  <button 
                    onClick={() => handleNavigation('solutions')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                  >
                    Avocats
                  </button>
                  <button 
                    onClick={() => handleNavigation('solutions')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                  >
                    Experts-comptables
                  </button>
                  
                  <div className="px-4 py-2 border-b border-gray-100 mt-2">
                    <span className="text-xs font-semibold text-gray-500 uppercase">Créatifs & Design</span>
                  </div>
                  <button 
                    onClick={() => handleNavigation('solutions')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                  >
                    Architectes
                  </button>
                  <button 
                    onClick={() => handleNavigation('solutions')} 
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors"
                  >
                    Designers
                  </button>
                </div>
              </div>
              <button 
                onClick={() => handleNavigation('pricing')} 
                className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
              >
                Tarifs
              </button>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/auth" 
              className="text-gray-700 hover:text-teal-600 font-medium transition-colors"
            >
              Connexion
            </Link>
            <Button 
              variant="primary" 
              onClick={() => handleNavigation('trial')}
            >
              Essai gratuit
            </Button>
          </div>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-teal-600 focus:outline-none"
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}
      >
        <div className="bg-white shadow-lg rounded-b-lg px-4 pt-2 pb-4 space-y-2">
          <button 
            onClick={() => handleNavigation('features')} 
            className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
          >
            Fonctionnalités
          </button>
          <button 
            onClick={() => handleNavigation('security')} 
            className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
          >
            Sécurité
          </button>
          
          <div className="py-2">
            <div className="px-3 py-2 text-sm font-medium text-gray-500">Cas d'usage</div>
            <div className="pl-6 space-y-2">
              <div className="py-2">
                <div className="text-xs font-semibold text-gray-500 uppercase px-3 mb-1">
                  Professions juridiques & financières
                </div>
                <button 
                  onClick={() => handleNavigation('solutions')} 
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                >
                  Avocats
                </button>
                <button 
                  onClick={() => handleNavigation('solutions')} 
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                >
                  Experts-comptables
                </button>
              </div>
              <div className="py-2">
                <div className="text-xs font-semibold text-gray-500 uppercase px-3 mb-1">
                  Créatifs & Design
                </div>
                <button 
                  onClick={() => handleNavigation('solutions')} 
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                >
                  Architectes
                </button>
                <button 
                  onClick={() => handleNavigation('solutions')} 
                  className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
                >
                  Designers
                </button>
              </div>
            </div>
          </div>
          
          <button 
            onClick={() => handleNavigation('pricing')} 
            className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors"
          >
            Tarifs
          </button>
          
          <div className="pt-4 border-t border-gray-200 flex flex-col space-y-3">
            <Link 
              to="/auth" 
              className="text-gray-700 hover:text-teal-600 font-medium px-3 py-2 rounded-md"
            >
              Connexion
            </Link>
            <Button 
              variant="primary" 
              className="w-full" 
              onClick={() => handleNavigation('trial')}
            >
              Essai gratuit
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};