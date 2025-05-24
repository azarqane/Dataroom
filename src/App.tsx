import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
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

function AppWrapper() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

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
            <section id="hero"><Hero /></section>
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
      </Routes>
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

  // *** C’est ici qu’il faut retourner l’app ***
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
