import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Security } from './components/Security';
import { Testimonials } from './components/Testimonials';
import { Pricing } from './components/Pricing';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { Helmet } from './components/Helmet';
import { ScrollToTop } from './components/ScrollToTop';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import { Toaster } from 'react-hot-toast';
import DataRoomPage from './pages/DataRoomPage';
import AccessDataRoom from "./pages/access/AccessDataRoom";
import { useTranslation } from 'react-i18next';
import PrivacyPage from "./pages/PrivacyPage";
import { Modal } from "./components/Modal";
import { SignupForm } from "./components/SignupForm";

function AppWrapper() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  function handleSignup(formData: any) {
    setSignupLoading(true);
    setTimeout(() => {
      setSignupLoading(false);
      setSignupOpen(false);
      // Tu peux ajouter un toast ici
    }, 1500);
  }

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        const offset = 100;
        const position = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Helmet />
      {isLanding && <Navbar />}
      <Routes>
        <Route path="/access/:token" element={<AccessDataRoom />} />
        <Route path="/" element={
          <main>
            <section id="hero">
              {/* Passe la fonction d'ouverture à Hero */}
              <Hero onOpenSignup={() => setSignupOpen(true)} />
            </section>
            <section id="features"><Features /></section>
            <section id="security"><Security /></section>
            <section id="Testimonials" className="scroll-mt-24"><Testimonials /></section>
            <section id="pricing"><Pricing /></section>
            <section id="faq"><FAQ /></section>
          </main>
        } />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/dataroom/:id" element={<DataRoomPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
      
      {/* Modale signup centrale */}
      <Modal open={signupOpen} onClose={() => setSignupOpen(false)} title="">
        <SignupForm
          onSubmit={handleSignup}
          loading={signupLoading}
          onClose={() => setSignupOpen(false)}
        />
      </Modal>

      {isLanding && <Footer />}
      <ScrollToTop />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            fontSize: '1.1rem',
            fontWeight: 'bold',
            background: '#14b8a6',
            color: '#fff',
            borderRadius: '1rem',
            boxShadow: '0 4px 32px 0 rgb(0 0 0 / 10%)',
          },
          iconTheme: {
            primary: "#fff",
            secondary: "#14b8a6"
          }
        }}
      />
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.body.classList.add('font-arabic');
    } else {
      document.documentElement.dir = 'ltr';
      document.body.classList.remove('font-arabic');
    }
  }, [i18n.language]);

  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
