import React, { useState } from "react";
import { X, User, Mail, Building2, Phone } from "lucide-react";

type SignupFormData = {
  nomComplet: string;
  entreprise: string;
  email: string;
  telephone: string;
  agree: boolean;
};

type SignupFormErrors = Partial<Record<keyof SignupFormData, string>>;

function validate(data: SignupFormData): SignupFormErrors {
  const errors: SignupFormErrors = {};
  if (!data.nomComplet?.match(/^[A-Za-zÀ-ÖØ-öø-ÿ\s\-']{2,}$/))
    errors.nomComplet = "Nom complet invalide (lettres et espaces seulement)";
  if (!data.nomComplet) errors.nomComplet = "Champ requis";
  if (!data.entreprise) errors.entreprise = "Champ requis";
  if (!data.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = "Email invalide";
  if (!data.email) errors.email = "Champ requis";
  if (!data.telephone?.match(/^(\+?\d{7,16})$/)) errors.telephone = "Numéro invalide";
  if (!data.telephone) errors.telephone = "Champ requis";
  if (!data.agree) errors.agree = "Vous devez accepter la politique de confidentialité";
  return errors;
}

export function SignupForm({
  onSubmit,
  loading,
  onClose,
}: {
  onSubmit: (data: SignupFormData) => void;
  loading?: boolean;
  onClose?: () => void;
}) {
  const [form, setForm] = useState<SignupFormData>({
    nomComplet: "",
    entreprise: "",
    email: "",
    telephone: "",
    agree: false,
  });
  const [touched, setTouched] = useState<Partial<Record<keyof SignupFormData, boolean>>>({});
  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate({ ...form, [name]: type === "checkbox" ? checked : value }));
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched((t) => ({ ...t, [e.target.name]: true }));
    setErrors(validate(form));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({
      nomComplet: true,
      entreprise: true,
      email: true,
      telephone: true,
      agree: true,
    });
    const currentErrors = validate(form);
    setErrors(currentErrors);
    setSubmitted(true);
    if (Object.keys(currentErrors).length === 0) onSubmit(form);
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-gray-100 p-0 relative animate-fadein">
      {/* Header + croix */}
      <div className="flex items-start justify-between px-16 pt-10 pb-5 border-b border-gray-100">
        <div>
          <h2 className="text-3xl font-extrabold text-teal-600 mb-1">Get started</h2>
          <p className="text-gray-400 font-medium text-lg mb-1">No initial payments needed.</p>
          <p className="text-gray-400 font-medium text-lg">30-days full functionality.</p>
        </div>
        <button
          type="button"
          className="text-gray-400 hover:text-teal-600 transition"
          aria-label="Fermer"
          onClick={onClose}
        >
          <X size={28} />
        </button>
      </div>

      {/* FORMULAIRE */}
      <form className="flex flex-col lg:flex-row gap-12 px-16 py-12" onSubmit={handleSubmit} noValidate>
        <div className="w-full flex flex-col gap-8">
          {/* NOM COMPLET */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Nom complet</label>
            <div className="relative">
              <input
                className={`form-control w-full rounded-xl border px-5 pl-14 py-4 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-xl ${
                  errors.nomComplet && touched.nomComplet ? "border-red-400" : "border-gray-200"
                }`}
                name="nomComplet"
                value={form.nomComplet}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Jean Dupont"
                autoComplete="name"
                required
              />
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 w-7 h-7" />
            </div>
            {errors.nomComplet && touched.nomComplet && (
              <p className="text-xs text-red-500 mt-1">{errors.nomComplet}</p>
            )}
          </div>
          {/* ENTREPRISE */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Entreprise</label>
            <div className="relative">
              <input
                className={`form-control w-full rounded-xl border px-5 pl-14 py-4 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-xl ${
                  errors.entreprise && touched.entreprise ? "border-red-400" : "border-gray-200"
                }`}
                name="entreprise"
                value={form.entreprise}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Apple Inc."
                autoComplete="organization"
                required
              />
              <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 w-7 h-7" />
            </div>
            {errors.entreprise && touched.entreprise && (
              <p className="text-xs text-red-500 mt-1">{errors.entreprise}</p>
            )}
          </div>
          {/* EMAIL */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                className={`form-control w-full rounded-xl border px-5 pl-14 py-4 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-xl ${
                  errors.email && touched.email ? "border-red-400" : "border-gray-200"
                }`}
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="exemple@email.com"
                autoComplete="email"
                required
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 w-7 h-7" />
            </div>
            {errors.email && touched.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          {/* TÉLÉPHONE */}
          <div>
            <label className="block text-xs text-gray-500 mb-1">Téléphone</label>
            <div className="relative">
              <input
                type="tel"
                className={`form-control w-full rounded-xl border px-5 pl-14 py-4 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-400 transition text-xl ${
                  errors.telephone && touched.telephone ? "border-red-400" : "border-gray-200"
                }`}
                name="telephone"
                value={form.telephone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="+33 6 12 34 56 78"
                autoComplete="tel"
                required
              />
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-teal-400 w-7 h-7" />
            </div>
            {errors.telephone && touched.telephone && (
              <p className="text-xs text-red-500 mt-1">{errors.telephone}</p>
            )}
          </div>
          {/* POLITIQUE CONFIDENTIALITÉ */}
          <div className="flex items-start gap-2 mt-2">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="mt-1 accent-teal-500"
              required
            />
            <label className="text-xs text-gray-500">
              En soumettant ce formulaire, j’ai lu et j’accepte la{" "}
              <a href="/privacy" target="_blank" className="underline hover:text-teal-600">
                Politique de confidentialité
              </a>
              .
            </label>
          </div>
          {errors.agree && touched.agree && (
            <p className="text-xs text-red-500">{errors.agree}</p>
          )}
          {/* SUBMIT */}
          <button
            type="submit"
            className="btn btn-primary w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-700 text-white font-bold text-xl py-4 rounded-2xl mt-4 shadow transition-all disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Envoi..." : "Get started"}
          </button>
          {submitted && Object.keys(errors).length === 0 && !loading && (
            <p className="text-green-600 text-center text-base mt-3 animate-fadein">
              Inscription réussie !
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
