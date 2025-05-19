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
import DashboardPage from './pages/admin/DashboardPage';
import AdminLayout from './layouts/AdminLayout';
import { AuthProvider } from './contexts/AuthContext';

function AppWrapper() {
  const location = useLocation();

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
      {location.pathname.startsWith('/admin') ? null : <Navbar />}
      <Routes>
        <Route path="/" element={
          <main>
            <Helmet />
            <Hero />
            <Features />
            <Security />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Footer />
            <ScrollToTop />
          </main>
        } />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
        </Route>
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
}

export default App;