import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Testimonial {
  content: string;
  author: string;
  position: string;
  company: string;
  image: string;
}

export const Testimonials = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const testimonials: Testimonial[] = [
    {
      content: t("testimonials_1_content"),
      author: t("testimonials_1_author"),
      position: t("testimonials_1_position"),
      company: t("testimonials_1_company"),
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      content: t("testimonials_2_content"),
      author: t("testimonials_2_author"),
      position: t("testimonials_2_position"),
      company: t("testimonials_2_company"),
      image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      content: t("testimonials_3_content"),
      author: t("testimonials_3_author"),
      position: t("testimonials_3_position"),
      company: t("testimonials_3_company"),
      image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-teal-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">{t("testimonials_title")}</h2>
          <p className="text-xl text-blue-100">
            {t("testimonials_subtitle")}
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="relative">
            <Quote className="absolute top-0 left-0 h-20 w-20 text-teal-500 opacity-20" />
            
            <div className="relative z-10 px-8 pt-10">
              <div className="min-h-[300px] flex flex-col items-center">
                <p className="text-xl md:text-2xl italic mb-8 text-center">
                  {testimonials[currentIndex].content}
                </p>
                
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-teal-400">
                    <img 
                      src={testimonials[currentIndex].image} 
                      alt={testimonials[currentIndex].author}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-semibold text-lg">{testimonials[currentIndex].author}</p>
                    <p className="text-blue-200">{testimonials[currentIndex].position}, {testimonials[currentIndex].company}</p>
                  </div>
                </div>
              </div>
              
              {/* Navigation avec inversion des chevrons en arabe */}
              <div className={`flex justify-center mt-10 ${i18n.language === 'ar' ? 'space-x-reverse' : ''} space-x-4`}>
                <button 
                  onClick={prevTestimonial}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-800 hover:bg-teal-700 transition-colors"
                  aria-label={t("testimonials_prev")}
                >
                  {/* RTL: flèche droite, LTR: flèche gauche */}
                  {i18n.language === 'ar'
                    ? <ChevronRight className="h-5 w-5" />
                    : <ChevronLeft className="h-5 w-5" />
                  }
                </button>
                <div className={`flex ${i18n.language === 'ar' ? 'space-x-reverse' : ''} space-x-2`}>
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full ${
                        index === currentIndex ? 'bg-teal-500' : 'bg-blue-700 hover:bg-blue-600'
                      }`}
                      aria-label={t("testimonials_goto", { num: index + 1 })}
                    />
                  ))}
                </div>
                <button 
                  onClick={nextTestimonial}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-800 hover:bg-teal-700 transition-colors"
                  aria-label={t("testimonials_next")}
                >
                  {/* RTL: flèche gauche, LTR: flèche droite */}
                  {i18n.language === 'ar'
                    ? <ChevronLeft className="h-5 w-5" />
                    : <ChevronRight className="h-5 w-5" />
                  }
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-20 bg-blue-800 bg-opacity-50 rounded-2xl p-8 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">{t("testimonials_cta_title")}</h3>
              <p className="text-blue-100 mb-4">
                {t("testimonials_cta_subtitle")}
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/auth')}
                  className="bg-white text-blue-900 hover:bg-teal-100 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {t("testimonials_cta_demo")}
                </button>
              </div>
            </div>
            <div className="w-full md:w-1/3">
              <div className="bg-white bg-opacity-10 rounded-lg p-4 border border-blue-400 border-opacity-30">
                <div className="text-center">
                  <div className="text-teal-300 font-semibold">{t("testimonials_client_satisfaction")}</div>
                  <div className="text-5xl font-bold my-2">98%</div>
                  <div className="text-blue-200 text-sm">{t("testimonials_recommendation")}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
