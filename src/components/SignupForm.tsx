// components/SignupForm.tsx
import React, { useState } from "react";

type SignupFormData = {
  nom: string;
  prenom: string;
  entreprise: string;
  email: string;
  telephone: string;
};

type SignupFormErrors = Partial<Record<keyof SignupFormData, string>>;

function validate(data: SignupFormData): SignupFormErrors {
  const errors: SignupFormErrors = {};
  if (!data.nom.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']+$/)) errors.nom = "Nom invalide";
  if (!data.nom) errors.nom = "Champ requis";
  if (!data.prenom.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']+$/)) errors.prenom = "Prénom invalide";
  if (!data.prenom) errors.prenom = "Champ requis";
  if (!data.entreprise) errors.entreprise = "Champ requis";
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Email invalide";
  if (!data.email) errors.email = "Champ requis";
  if (!data.telephone.match(/^(\+?\d{7,16})$/)) errors.telephone = "Numéro invalide";
  if (!data.telephone) errors.telephone = "Champ requis";
  return errors;
}

export function SignupForm({ onSubmit, loading }: { onSubmit: (data: SignupFormData) => void, loading?: boolean }) {
  const [form, setForm] = useState<SignupFormData>({
    nom: "",
    prenom: "",
    entreprise: "",
    email: "",
    telephone: "",
  });
  const [touched, setTouched] = useState<Partial<Record<keyof SignupFormData, boolean>>>({});
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const isValid = Object.keys(validate(form)).length === 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate({ ...form, [e.target.name]: e.target.value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched(t => ({ ...t, [e.target.name]: true }));
    setErrors(validate(form));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      nom: true, prenom: true, entreprise: true, email: true, telephone: true,
    });
    const currentErrors = validate(form);
    setErrors(currentErrors);
    setSubmitted(true);
    if (Object.keys(currentErrors).length === 0) onSubmit(form);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label className="font-semibold text-sm text-gray-700 mb-1 block">Nom</label>
        <input
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
            errors.nom && touched.nom ? "border-red-400" : "border-gray-200"
          }`}
          name="nom" value={form.nom} onChange={handleChange} onBlur={handleBlur} required autoComplete="family-name"
        />
        {errors.nom && touched.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
      </div>
      <div>
        <label className="font-semibold text-sm text-gray-700 mb-1 block">Prénom</label>
        <input
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
            errors.prenom && touched.prenom ? "border-red-400" : "border-gray-200"
          }`}
          name="prenom" value={form.prenom} onChange={handleChange} onBlur={handleBlur} required autoComplete="given-name"
        />
        {errors.prenom && touched.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
      </div>
      <div>
        <label className="font-semibold text-sm text-gray-700 mb-1 block">Entreprise</label>
        <input
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
            errors.entreprise && touched.entreprise ? "border-red-400" : "border-gray-200"
          }`}
          name="entreprise" value={form.entreprise} onChange={handleChange} onBlur={handleBlur} required autoComplete="organization"
        />
        {errors.entreprise && touched.entreprise && <p className="text-red-500 text-xs mt-1">{errors.entreprise}</p>}
      </div>
      <div>
        <label className="font-semibold text-sm text-gray-700 mb-1 block">Email</label>
        <input
          type="email"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
            errors.email && touched.email ? "border-red-400" : "border-gray-200"
          }`}
          name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} required autoComplete="email"
        />
        {errors.email && touched.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="font-semibold text-sm text-gray-700 mb-1 block">Numéro de téléphone</label>
        <input
          type="tel"
          className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-400 transition ${
            errors.telephone && touched.telephone ? "border-red-400" : "border-gray-200"
          }`}
          name="telephone" value={form.telephone} onChange={handleChange} onBlur={handleBlur} required autoComplete="tel"
        />
        {errors.telephone && touched.telephone && <p className="text-red-500 text-xs mt-1">{errors.telephone}</p>}
      </div>
      <button
        type="submit"
        className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-full shadow-md transition-all w-full disabled:opacity-60"
        disabled={loading || !isValid}
      >
        {loading ? "Envoi..." : "Créer mon compte"}
      </button>
      {submitted && isValid && !loading && (
        <p className="text-green-600 text-center text-sm mt-3">Inscription réussie !</p>
      )}
    </form>
  );
}
