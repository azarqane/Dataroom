import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ChevronDown, LogOut } from 'lucide-react';
import { Button } from './Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signOut } from '../lib/auth';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, profile } = useAuth();
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
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  // Si l'utilisateur est sur le tableau de bord ou une page authentifiée
  if (location.pathname === '/dashboard') {
    return (
      <header className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-sm`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div 
                onClick={() => navigate('/dashboard')} 
                className="cursor-pointer flex items-center flex-shrink-0 group"
              >
                <Shield className="h-8 w-8 text-teal-600 group-hover:rotate-12 transition-transform duration-300" />
                <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                  NeutVault
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{profile?.full_name || user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Pour la page d'accueil et autres pages publiques
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-sm py-5'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
              className="cursor-pointer flex items-center flex-shrink-0 mr-10 group"
            >
              <Shield className="h-8 w-8 text-teal-600 group-hover:rotate-12 transition-transform duration-300" />
              <span className="ml-2 text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                NeutVault
              </span>
            </div>
            
            {location.pathname === '/' && (
              <nav className="hidden md:flex space-x-8">
                <button onClick={() => navigate('/#features')} className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                  Fonctionnalités
                </button>
                <button onClick={() => navigate('/#security')} className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                  Sécurité
                </button>
                <button onClick={() => navigate('/#pricing')} className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                  Tarifs
                </button>
              </nav>
            )}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button variant="primary" onClick={() => navigate('/dashboard')}>
                Tableau de bord
              </Button>
            ) : (
              <>
                <Link to="/auth" className="text-gray-700 hover:text-teal-600 font-medium transition-colors">
                  Connexion
                </Link>
                <Button variant="primary" onClick={() => navigate('/auth')}>Essai gratuit</Button>
              </>
            )}
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="p-2 rounded-md text-gray-700 hover:text-teal-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="bg-white shadow-lg rounded-b-lg px-4 pt-2 pb-4 space-y-2">
          {location.pathname === '/' && (
            <>
              <button onClick={() => { navigate('/#features'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors">
                Fonctionnalités
              </button>
              <button onClick={() => { navigate('/#security'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors">
                Sécurité
              </button>
              <button onClick={() => { navigate('/#pricing'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-gray-700 hover:bg-gray-50 hover:text-teal-600 font-medium transition-colors">
                Tarifs
              </button>
            </>
          )}
          
          <div className="pt-4 border-t border-gray-200">
            {user ? (
              <Button variant="primary" className="w-full" onClick={() => { navigate('/dashboard'); setIsOpen(false); }}>
                Tableau de bord
              </Button>
            ) : (
              <>
                <Link 
                  to="/auth" 
                  className="block text-gray-700 hover:text-teal-600 font-medium px-3 py-2 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  Connexion
                </Link>
                <Button 
                  variant="primary" 
                  className="w-full mt-2" 
                  onClick={() => { navigate('/auth'); setIsOpen(false); }}
                >
                  Essai gratuit
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};