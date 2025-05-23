import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Logo from "./Logo";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    // Si on est sur une autre page que la landing
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setIsOpen(false);
      return;
    }
    // Sinon on est déjà sur la landing : scroll en douceur
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Ajuste selon la hauteur de ta navbar
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { label: 'Fonctionnalités', section: 'features' },
    { label: 'Tarifs', section: 'pricing' },
    { label: 'À propos', section: 'about' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all ${
        scrolled
          ? 'bg-gray-900/90 shadow-xl backdrop-blur border-b border-gray-800'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Accueil NeutVault">
          <Logo size={32} textSize="text-xl" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <button
              key={link.section}
              onClick={() => handleNavigation(link.section)}
              className="text-gray-300 hover:text-teal-400 font-medium transition-colors px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              {link.label}
            </button>
          ))}
          <Link to="/auth">
            <Button
              variant="primary"
              size="md"
              className="ml-2 px-6 py-2 rounded-xl font-bold shadow-md"
            >
              Connexion
            </Button>
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-lg bg-gray-800 text-teal-400 hover:bg-teal-700 transition"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-900 w-full px-4 pb-4 pt-2 shadow-xl border-b border-gray-800 animate-fadeIn">
          {navLinks.map(link => (
            <button
              key={link.section}
              onClick={() => handleNavigation(link.section)}
              className="block w-full text-left text-gray-200 py-2 px-2 rounded-lg hover:bg-gray-800 hover:text-teal-400 font-medium transition"
            >
              {link.label}
            </button>
          ))}
          <Link to="/auth">
            <Button
              variant="primary"
              size="md"
              className="w-full mt-3 px-6 py-2 rounded-xl font-bold shadow-md"
            >
              Connexion
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};
