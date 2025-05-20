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

function AppWrapper() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

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

  if (isDashboard) {
    return (
      <>
        <DashboardPage />
        <Toaster position="top-right" />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero />
            <Features />
            <Security />
            <Testimonials />
            <Pricing />
            <FAQ />
          </main>
        } />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
      <ScrollToTop />
      <Toaster position="top-right" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;