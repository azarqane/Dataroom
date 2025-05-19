import React, { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={scrollToTop}
        className={`w-10 h-10 rounded-full bg-teal-600 hover:bg-teal-700 flex items-center justify-center shadow-lg transition-opacity ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        aria-label="Retour en haut"
      >
        <ChevronUp className="h-5 w-5 text-white" />
      </button>
    </div>
  );
};