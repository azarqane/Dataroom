import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Phone, Send } from 'lucide-react';
import { Button } from './Button';

const FAQItems = [
  {
    question: "Qu'est-ce qu'une Data Room et pourquoi en ai-je besoin ?",
    answer: "Une Data Room est un espace numérique sécurisé permettant le partage et le stockage de documents confidentiels. Elle est essentielle pour les transactions sensibles comme les fusions-acquisitions, levées de fonds, due diligence, ou le partage de documents juridiques et financiers nécessitant une sécurité renforcée."
  },
  {
    question: "Comment NeutVault assure-t-il la sécurité de mes données ?",
    answer: "NeutVault utilise un chiffrement AES-256 bits de bout en bout, une authentification multifacteur, un contrôle d'accès granulaire, des filigranes dynamiques, et des journaux d'audit complets. Nos centres de données sont certifiés ISO 27001 et notre solution est conforme au RGPD et autres réglementations internationales."
  },
  {
    question: "Puis-je personnaliser les permissions pour différents utilisateurs ?",
    answer: "Absolument. NeutVault vous permet de définir des permissions précises par utilisateur ou groupe d'utilisateurs, en contrôlant ce qu'ils peuvent voir, télécharger, imprimer ou modifier. Vous pouvez également définir des restrictions temporelles pour limiter l'accès dans le temps."
  },
  {
    question: "La plateforme est-elle conforme au RGPD ?",
    answer: "Oui, NeutVault est entièrement conforme au Règlement Général sur la Protection des Données (RGPD). Nous stockons vos données dans des centres de données situés dans l'Union Européenne et mettons en œuvre toutes les mesures techniques et organisationnelles requises par cette réglementation."
  },
  {
    question: "Combien de temps dure la période d'essai gratuit ?",
    answer: "Nous offrons une période d'essai gratuit de 14 jours pour tous nos forfaits. Durant cette période, vous avez accès à toutes les fonctionnalités du plan choisi sans engagement. Si vous décidez de ne pas continuer, aucun frais ne vous sera facturé."
  },
  {
    question: "Comment fonctionne le support client ?",
    answer: "Selon votre forfait, vous bénéficiez d'un support par email, téléphone ou d'un gestionnaire de compte dédié. Le forfait Enterprise inclut un support 24/7. Notre équipe d'experts est disponible pour répondre à toutes vos questions et vous aider à résoudre rapidement tout problème."
  },
  {
    question: "Que se passe-t-il si je change de forfait ?",
    answer: "Vous pouvez facilement passer à un forfait supérieur à tout moment, et les changements prendront effet immédiatement. Si vous souhaitez passer à un forfait inférieur, le changement sera effectif à la fin de votre période de facturation en cours."
  }
];

export const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([0]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'general'
  });

  const toggleItem = (index: number) => {
    setOpenItems(openItems.includes(index)
      ? openItems.filter(i => i !== index)
      : [...openItems, index]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici tu peux ajouter l'envoi du formulaire (API, email, etc.)
    setFormData({
      name: '',
      email: '',
      message: '',
      subject: 'general'
    });
  };

  return (
    <section className="min-h-screen bg-gradient-to-bl from-gray-950 to-gray-900 py-12 px-2 text-gray-200 flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-teal-400 text-center mb-2">Questions fréquentes</h1>
        <p className="text-center text-gray-400 mb-8">Vous avez des questions ? Nous avons des réponses.</p>

        <div className="space-y-3">
          {FAQItems.map((item, index) => (
            <div
              key={index}
              className="rounded-xl bg-gray-800 border border-gray-700 shadow p-4 transition-all"
            >
              <button
                onClick={() => toggleItem(index)}
                className="flex items-center justify-between w-full text-left text-lg font-semibold text-gray-200 focus:outline-none"
              >
                <span>{item.question}</span>
                {openItems.includes(index)
                  ? <ChevronUp className="text-teal-400" />
                  : <ChevronDown className="text-gray-400" />}
              </button>
              {openItems.includes(index) && (
                <div className="mt-2 text-gray-400 text-base leading-relaxed">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Formulaire de contact */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-lg mt-12 p-8">
          <h2 className="text-xl font-semibold text-teal-400 mb-2">Vous ne trouvez pas la réponse à votre question ?</h2>
          <p className="text-gray-400 mb-5">Contactez-nous via le formulaire ci-dessous, notre équipe vous répondra sous 24h.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="faq-name">
                Nom complet
              </label>
              <input
                id="faq-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Votre nom..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="faq-email">
                Email professionnel
              </label>
              <input
                id="faq-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Votre email..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="faq-subject">
                Sujet
              </label>
              <select
                id="faq-subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-200 focus:outline-none focus:border-teal-500"
                required
              >
                <option value="general">Question générale</option>
                <option value="sales">Commercial</option>
                <option value="support">Support technique</option>
                <option value="partnership">Partenariat</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1" htmlFor="faq-message">
                Message
              </label>
              <textarea
                id="faq-message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Votre message..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-teal-500"
                rows={4}
                required
              />
            </div>
            <Button type="submit" variant="primary" className="w-full flex items-center justify-center gap-2 mt-2">
              <Send className="w-5 h-5" />
              Envoyer le message
            </Button>
          </form>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mt-8 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-teal-400" />
              <span>contact@neutvault.fr</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-teal-400" />
              <span>+33 1 23 45 67 89</span>
            </div>
          </div>
        </div>

        {/* Call to action final */}
        <div className="text-center mt-12">
          <h3 className="text-xl font-bold text-teal-400">Prêt à sécuriser vos données sensibles ?</h3>
          <p className="text-gray-400 mb-5">Rejoignez des milliers d'entreprises qui font confiance à NeutVault pour leurs Data Rooms.</p>
          <Button variant="primary" className="px-8 py-3 text-lg shadow-lg">Démarrer l'essai gratuit</Button>
        </div>
      </div>
    </section>
  );
};
