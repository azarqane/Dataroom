import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Briefcase, Calendar } from 'lucide-react';
import { Button } from './Button';

const testimonials = [
  {
    content: "Grâce à NeutVault, nous avons pu gérer nos audits financiers en toute sécurité, sans jamais nous soucier de la confidentialité des documents. L’expérience utilisateur est aussi intuitive que rassurante !",
    author: "Julie Moreau",
    position: "Directrice Juridique",
    company: "Alphazen"
  },
  {
    content: "La data room NeutVault a révolutionné la façon dont nous partageons des dossiers sensibles avec nos partenaires investisseurs. Facile, rapide, ultra-sécurisé : un must-have !",
    author: "Thomas Lefèvre",
    position: "CFO",
    company: "InnoTech"
  },
  {
    content: "Le support client est d’une réactivité exemplaire, et les fonctionnalités de tracking documentaire sont incomparables. Je recommande à toute structure soucieuse de ses données.",
    author: "Sarah Benali",
    position: "M&A Manager",
    company: "Axima Partners"
  }
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goPrev = () => setCurrentIndex((idx) => idx === 0 ? testimonials.length - 1 : idx - 1);
  const goNext = () => setCurrentIndex((idx) => idx === testimonials.length - 1 ? 0 : idx + 1);

  return (
    <section className="py-16 px-2 min-h-[470px] bg-gradient-to-br from-gray-950 to-gray-900 flex flex-col items-center">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-teal-400 mb-2 tracking-tight">
          Témoignages clients
        </h2>
        <p className="text-lg text-gray-400">
          Découvrez pourquoi les entreprises font confiance à NeutVault pour leurs données sensibles.
        </p>
      </div>

      <div className="relative w-full max-w-xl mx-auto mb-8">
        <div className="bg-gray-900 rounded-2xl border border-gray-800 shadow-2xl p-10 transition-all duration-300 text-gray-200 min-h-[240px] flex flex-col items-center">
          {/* Navigation */}
          <div className="flex justify-between w-full absolute left-0 top-1/2 -translate-y-1/2 px-2 pointer-events-none">
            <button
              onClick={goPrev}
              aria-label="Témoignage précédent"
              className="pointer-events-auto bg-gray-800 hover:bg-teal-700 text-teal-400 p-2 rounded-full transition-all shadow"
              style={{ marginLeft: '-16px' }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goNext}
              aria-label="Témoignage suivant"
              className="pointer-events-auto bg-gray-800 hover:bg-teal-700 text-teal-400 p-2 rounded-full transition-all shadow"
              style={{ marginRight: '-16px' }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          {/* Texte principal */}
          <blockquote className="italic text-xl font-medium text-gray-100 mb-8 mt-4">
            “{testimonials[currentIndex].content}”
          </blockquote>

          {/* Ligne auteur */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-base">
              <User className="w-5 h-5" />
              {testimonials[currentIndex].author}
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Briefcase className="w-4 h-4" />
              <span>{testimonials[currentIndex].position}, {testimonials[currentIndex].company}</span>
            </div>
          </div>
        </div>
        {/* Points bas (pagination) */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Aller au témoignage ${i + 1}`}
              className={`w-3 h-3 rounded-full ${i === currentIndex ? 'bg-teal-400' : 'bg-gray-700'} transition-all`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>

      <div className="max-w-xl mx-auto mt-12 bg-gray-900 border border-gray-800 rounded-2xl p-8 flex flex-col items-center shadow-lg">
        <h3 className="text-xl font-bold text-white mb-2">Envie de voir NeutVault en action ?</h3>
        <p className="text-gray-400 mb-5 text-center">
          Programmez une démo personnalisée avec l'un de nos experts et découvrez comment notre Data Room peut répondre à vos besoins spécifiques.
        </p>
        <Button
          variant="primary"
          size="lg"
          className="px-8 py-3 text-lg shadow-lg"
          onClick={() => window.open("mailto:contact@neutvault.com?subject=Demande de démo NeutVault", "_blank")}
        >
          Programmer une démo
        </Button>
      </div>
    </section>
  );
};
