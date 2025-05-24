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
      const offset = 72; // Navbar plus raisonnable !
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
    { label: 'Sécurité', section: 'security' },
    { label: 'Tarifs', section: 'pricing' },
    { label: 'Témoignages', section: 'Testimonials' },
    { label: 'FAQ', section: 'faq' },
  ];

  const loginBtnClass =
    "border border-teal-500 text-teal-700 bg-white hover:bg-teal-50 font-bold px-5 py-2 rounded-full transition-all shadow focus:outline-none focus:ring-2 focus:ring-teal-300 text-base";

  const logoTextClass = scrolled ? "text-white" : "text-gray-900";
  const logoIconStroke = scrolled ? "#fff" : "#14b8a6";
  function handleSignup(formData: any) {
  // Ici tu peux mettre la logique réelle d’inscription, ou juste fermer la modale par exemple :
  setSignupLoading(true);
  setTimeout(() => {
    setSignupLoading(false);
    setSignupOpen(false);
    // Tu peux mettre ici un toast ou une action supplémentaire
  }, 1500);
}

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-gray-900/90 shadow-xl backdrop-blur border-b border-gray-800'
          : 'bg-transparent'
      }`}
      style={{ minHeight: 64 }} // NAVBAR MOINS HAUTE
      role="navigation"
      aria-label="Navigation principale"
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between" style={{ minHeight: 64 }}>
        {/* Logo + NeutVault */}
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
              height: 32,
              width: 32,
              minWidth: 32,
              minHeight: 32,
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
              fontSize: "1.4rem",
              letterSpacing: ".01em",
              lineHeight: 1.18,
              fontFamily: "Inter, sans-serif",
            }}
          >
            NeutVault
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <button
              key={link.section}
              onClick={() => handleNavigation(link.section)}
              className={
                (scrolled
                  ? "text-gray-100 hover:text-teal-400"
                  : "text-gray-900 hover:text-teal-600"
                ) +
                " font-semibold text-base transition-colors px-3 py-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
              }
              style={{ fontSize: "1.05rem" }}
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
  className={
    "md:hidden flex items-center justify-center p-2 rounded-lg transition shadow " +
    (scrolled
      ? "bg-gray-800 text-teal-400 hover:bg-teal-700"
      : "bg-white text-teal-500 hover:bg-teal-100 border border-gray-200")
  }
  style={{ fontSize: 22 }}
  onClick={() => setIsOpen(!isOpen)}
  aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
>
  {isOpen ? <X size={24} /> : <Menu size={24} />}
</button>

      </div>

      {/* Mobile menu */}
      {isOpen && (
  <div
    className={
      "md:hidden w-full px-4 pb-4 pt-2 shadow-xl border-b border-gray-200 animate-fadeIn " +
      (scrolled ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200")
    }
  >
    {navLinks.map(link => (
      <button
        key={link.section}
        onClick={() => handleNavigation(link.section)}
        className={
          (scrolled
            ? "text-gray-100 hover:text-teal-400"
            : "text-gray-900 hover:text-teal-600"
          ) +
          " block w-full text-left py-3 px-3 rounded-lg font-semibold text-base transition"
        }
        style={{ fontSize: "1.05rem" }}
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
      <Modal open={signupOpen} onClose={() => setSignupOpen(false)} title="">
  <SignupForm onSubmit={handleSignup} loading={signupLoading} onClose={() => setSignupOpen(false)} />
</Modal>

    </nav>
  );
};
