import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SignupButton } from "./SignupButton";
import { Modal } from "./Modal";
import { SignupForm } from "./SignupForm";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setIsOpen(false);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80; // Ajuste si navbar plus haute
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  // ----------- Menu à jour : sections réelles de ta landing -------------
  const navLinks = [
    
    { label: 'Fonctionnalités', section: 'features' },
    { label: 'Sécurité', section: 'security' },
    { label: 'Tarifs', section: 'pricing' },
    { label: 'Témoignages', section: 'Testimonials' },
    { label: 'FAQ', section: 'faq' },
  ];

  function handleSignup(formData: any) {
    setSignupLoading(true);
    setTimeout(() => {
      setSignupLoading(false);
      setSignupOpen(false);
    }, 1800);
  }

  // Bouton Se connecter
  const loginBtnClass =
    "border border-teal-500 text-teal-600 hover:bg-teal-50 font-bold px-6 py-2 rounded-full transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-300";

  // Styles dynamiques pour logo et texte
  const logoTextClass = scrolled ? "text-white" : "text-gray-900";
  const logoIconStroke = scrolled ? "#fff" : "#14b8a6";

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
        {/* Logo + NeutVault bien alignés */}
        <Link
          to="/"
          className="flex items-center gap-2 group"
          style={{ minHeight: 40 }}
          aria-label="Accueil NeutVault"
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: 38,
              width: 38,
              minWidth: 38,
              minHeight: 38,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={32}
              height={32}
              fill="none"
              stroke={logoIconStroke}
              strokeWidth={2.1}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ display: "block", margin: "auto" }}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </span>
          <span
            className={`font-extrabold font-sans ${logoTextClass}`}
            style={{
              fontSize: "1.35rem",
              letterSpacing: ".01em",
              lineHeight: 1.15,
              fontFamily: "Inter, sans-serif",
            }}
          >
            NeutVault
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-5">
          {navLinks.map(link => (
            <button
              key={link.section}
              onClick={() => handleNavigation(link.section)}
              className={
                (scrolled
                  ? "text-gray-100 hover:text-teal-400"
                  : "text-gray-900 hover:text-teal-600"
                ) +
                " font-medium transition-colors px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              }
            >
              {link.label}
            </button>
          ))}
          <div className="flex items-center gap-3 ml-6">
            <Link to="/auth">
              <button className={loginBtnClass} type="button">
                Se connecter
              </button>
            </Link>
            <SignupButton onClick={() => setSignupOpen(true)} />
          </div>
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
          <div className="flex flex-col gap-3 mt-4">
            <Link to="/auth">
              <button className={loginBtnClass + " w-full"} type="button">
                Se connecter
              </button>
            </Link>
            <SignupButton onClick={() => setSignupOpen(true)} />
          </div>
        </div>
      )}

      {/* Modale d'inscription */}
      <Modal open={signupOpen} onClose={() => setSignupOpen(false)} title="Créer votre compte">
        <SignupForm onSubmit={handleSignup} loading={signupLoading} />
      </Modal>
    </nav>
  );
};
