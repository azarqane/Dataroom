import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { AuthForm } from './components/auth/AuthForm';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Helmet />
        <Navbar />
        <Routes>
          <Route path="/auth" element={<AuthForm />} />
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
        </Routes>
        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;