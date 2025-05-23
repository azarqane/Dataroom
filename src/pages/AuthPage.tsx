import React, { useState, useEffect, useRef } from 'react';
import { Shield, Mail, Lock, User, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { toast } from 'react-hot-toast';

const inputClass =
  "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-200 placeholder-gray-500 focus:outline-none focus:border-teal-500 transition-all duration-200";
const iconInput =
  "flex items-center gap-2 px-3 py-3 bg-gray-800 border border-gray-700 rounded-xl";
const labelClass =
  "block mb-1 ml-1 text-sm font-medium text-gray-400";
const primaryBtn =
  "w-full py-3 rounded-xl bg-gradient-to-tr from-teal-600 to-teal-400 text-white font-semibold text-lg shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-150";
const secondaryBtn =
  "w-full py-3 rounded-xl border border-teal-600 bg-gray-900 text-gray-200 font-semibold text-lg hover:bg-gray-800 hover:border-teal-400 transition-all duration-150 mt-2";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const loginEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate('/dashboard');
    };
    checkAuth();
  }, [navigate]);

  function validateEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateEmail(formData.email)) {
      setError("L'adresse email n'est pas valide");
      return;
    }
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });
        if (error) setError(error.message);
        else {
          setSuccess("Connexion réussie !");
          setTimeout(() => navigate('/dashboard'), 1200);
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: { data: { name: formData.name } }
        });
        if (error) setError(error.message);
        else {
          toast.success(
            <>
              <b>Inscription réussie !</b><br />
              Un email de confirmation vous a été envoyé.<br />
              Veuillez vérifier votre boîte de réception.
            </>,
            {
              duration: 5000,
              style: {
                background: '#14b8a6',
                color: '#fff',
                padding: '16px',
                borderRadius: '10px',
              },
              icon: '✉️',
            }
          );
          setTimeout(() => {
            setIsLogin(true);
            setFormData({
              email: '',
              password: '',
              confirmPassword: '',
              name: ''
            });
          }, 3000);
        }
      }
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();
    setError(null);
    setSuccess(null);
    if (!validateEmail(forgotEmail)) {
      setError("Adresse email invalide.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(forgotEmail);
    if (error) {
      setError("Erreur : " + error.message);
    } else {
      setSuccess("Un email de réinitialisation a été envoyé.");
      toast.success('Email de réinitialisation envoyé !');
      setShowForgotModal(false);
      setForgotEmail('');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-tr from-gray-950 to-gray-800 px-1 py-12">
      <Logo className="mb-8 h-16" />
      <div className="w-full max-w-md bg-gray-900/95 rounded-2xl shadow-2xl p-10 mx-auto border border-gray-800">
        {!showForgotModal ? (
          <>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4 text-teal-400" />
                      Nom
                    </span>
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Votre nom complet"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClass}
                    required
                  />
                </div>
              )}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-1">
                    <Mail className="w-4 h-4 text-teal-400" />
                    Email
                  </span>
                </label>
                <input
                  ref={loginEmailRef}
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-1">
                    <Lock className="w-4 h-4 text-teal-400" />
                    Mot de passe
                  </span>
                </label>
                <input
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  placeholder="Votre mot de passe"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={inputClass}
                  required
                />
              </div>
              {!isLogin && (
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-teal-400" />
                      Confirmer
                    </span>
                  </label>
                  <input
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirmez le mot de passe"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={inputClass}
                    required
                  />
                </div>
              )}

              {isLogin && (
                <div className="flex items-center justify-between mb-2">
                  <label className="flex items-center text-gray-400 text-sm">
                    <input type="checkbox" className="mr-2 rounded" />
                    Se souvenir de moi
                  </label>
                  <button
                    type="button"
                    className="text-teal-300 hover:text-teal-400 underline text-sm font-medium transition"
                    onClick={() => {
                      setShowForgotModal(true);
                      loginEmailRef.current?.blur();
                    }}
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className={primaryBtn + (loading ? " opacity-70 cursor-not-allowed" : "")}
              >
                {loading ? 'Traitement en cours...' : (isLogin ? 'Se connecter' : "S'inscrire")}
              </button>

              {/* Switch login/signup moderne en dessous */}
              <div className="mt-4 flex flex-col items-center space-y-2">
                <span className="text-sm text-gray-400">
                  {isLogin ? "Nouveau sur NeutVault ?" : "Déjà un compte ?"}
                </span>
                <button
                  type="button"
                  className={secondaryBtn}
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError(null);
                    setSuccess(null);
                    setFormData({
                      email: "",
                      password: "",
                      confirmPassword: "",
                      name: "",
                    });
                  }}
                >
                  {isLogin ? "Créer un nouveau compte" : "Se connecter"}
                </button>
              </div>
              {error && <p className="mt-4 text-center text-sm text-red-400 bg-red-900/30 rounded-lg py-2">{error}</p>}
              {success && <p className="mt-4 text-center text-sm text-green-300 bg-green-900/20 rounded-lg py-2">{success}</p>}
            </form>
          </>
        ) : (
          // MODAL MOT DE PASSE OUBLIÉ
          <div className="relative w-full p-8 bg-gray-900 rounded-2xl shadow-lg animate-fadeIn border border-gray-700">
            <button
              onClick={() => {
                setShowForgotModal(false);
                setForgotEmail('');
                setError(null);
                setSuccess(null);
              }}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-100 transition"
              aria-label="Fermer"
              type="button"
            >
              <XCircle className="w-6 h-6" />
            </button>
            <div className="flex flex-col items-center gap-3 mb-6">
              <Lock className="w-10 h-10 text-teal-400" />
              <h2 className="text-2xl font-bold text-gray-200 text-center">Réinitialiser</h2>
              <p className="text-gray-400 text-center text-sm">
                Renseigne ton email pour recevoir le lien de réinitialisation.
              </p>
            </div>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <label className={labelClass} htmlFor="reset-email">
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-teal-400" />
                  Email
                </span>
              </label>
              <input
                type="email"
                id="reset-email"
                name="reset-password-email"
                autoComplete="off"
                className={inputClass}
                placeholder="Votre email"
                value={forgotEmail}
                onChange={e => setForgotEmail(e.target.value)}
                required
              />
              {error && <p className="text-xs text-red-400">{error}</p>}
              {success && <p className="text-xs text-green-300">{success}</p>}
              <div className="flex flex-col sm:flex-row gap-3 mt-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-tr from-teal-600 to-teal-400 text-white rounded-xl py-2 font-semibold hover:brightness-110 transition-all"
                  disabled={loading}
                >
                  {loading ? "Envoi…" : "Envoyer"}
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-800 text-gray-200 border border-gray-600 rounded-xl py-2 font-semibold hover:bg-gray-700 transition-all"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotEmail('');
                    setError(null);
                    setSuccess(null);
                  }}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
