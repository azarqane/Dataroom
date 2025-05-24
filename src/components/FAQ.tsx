import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, Send } from 'lucide-react';
import { Button } from './Button';
import { useTranslation } from 'react-i18next';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ = () => {
  const { t, i18n } = useTranslation();
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'general'
  });

  // Questions/réponses multilingues depuis la traduction
  const FAQItems: FAQItem[] = [
    {
      question: t('faq_q1'),
      answer: t('faq_a1')
    },
    {
      question: t('faq_q2'),
      answer: t('faq_a2')
    },
    {
      question: t('faq_q3'),
      answer: t('faq_a3')
    },
    {
      question: t('faq_q4'),
      answer: t('faq_a4')
    },
    {
      question: t('faq_q5'),
      answer: t('faq_a5')
    },
    {
      question: t('faq_q6'),
      answer: t('faq_a6')
    },
    {
      question: t('faq_q7'),
      answer: t('faq_a7')
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(openItems.includes(index)
      ? openItems.filter(i => i !== index)
      : [...openItems, index]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, tu pourrais envoyer le formulaire à un backend
    console.log('Form submitted:', formData);
    setFormData({
      name: '',
      email: '',
      message: '',
      subject: 'general'
    });
  };

  return (
    <section className="py-20 bg-gray-50" id="faq">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t("faq_title")}</h2>
          <p className="text-xl text-gray-600">{t("faq_subtitle")}</p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 lg:p-8">
          <div className="divide-gray-200">
            {FAQItems.map((item, index) => (
              <div className="border-b border-gray-200 py-5" key={index}>
                <button
                  onClick={() => toggleItem(index)}
                  className="flex justify-between items-center w-full text-left focus:outline-none"
                >
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  <span className="ml-6 flex-shrink-0 text-gray-500">
                    {openItems.includes(index)
                      ? <ChevronUp className="h-5 w-5" />
                      : <ChevronDown className="h-5 w-5" />}
                  </span>
                </button>
                <div className={`mt-2 transition-all duration-300 ease-in-out overflow-hidden ${openItems.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-base text-gray-600">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-gray-600 mb-4">{t("faq_no_answer")}</p>
            <a href="#contact" className="text-teal-600 hover:text-teal-700 font-medium">
              {t("faq_contact_link")}
            </a>
          </div>
        </div>
        
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900 to-teal-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-8 lg:p-12">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t("faq_cta_title")}
                </h3>
                <p className="text-blue-100 mb-8">{t("faq_cta_subtitle")}</p>
                <div className="space-y-4">
                  <button className="w-full bg-white text-blue-900 hover:bg-teal-100 px-6 py-3 rounded-lg font-medium transition-colors">
                    {t("faq_cta_trial")}
                  </button>
                </div>
              </div>
              <div className="w-full lg:w-1/2 bg-white p-8 lg:p-12" id="contact">
                <h4 className="text-xl font-semibold text-gray-900 mb-6">{t("faq_contact_title")}</h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("faq_form_name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("faq_form_email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("faq_form_subject")}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    >
                      <option value="general">{t("faq_form_subject_general")}</option>
                      <option value="sales">{t("faq_form_subject_sales")}</option>
                      <option value="support">{t("faq_form_subject_support")}</option>
                      <option value="partnership">{t("faq_form_subject_partnership")}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      {t("faq_form_message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      required
                    ></textarea>
                  </div>
                  <Button type="submit" variant="primary" className="w-full">
                    <Send className={`w-4 h-4 ${i18n.language === "ar" ? "ml-2" : "mr-2"}`} />
                    {t("faq_form_send")}
                  </Button>
                </form>
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Mail className={`h-5 w-5 text-teal-600 ${i18n.language === "ar" ? "ml-3" : "mr-3"}`} />
                      <span className="text-gray-600">contact@neutvault.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className={`h-5 w-5 text-teal-600 ${i18n.language === "ar" ? "ml-3" : "mr-3"}`} />
                      <span className="text-gray-600">+33 1 23 45 67 89</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
