// App.tsx
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import { AuthProvider, useAuth } from './contexts/AuthContext';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Chargement...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

function AppWrapper() {
  const location = useLocation();
  const { user } = useAuth();

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
      {!user && location.pathname === '/' && <Navbar />}
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
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        } />
      </Routes>
      {!user && location.pathname === '/' && <Footer />}
      <ScrollToTop />
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