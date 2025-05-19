import React from 'react';
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

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Security />
        <Testimonials />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;