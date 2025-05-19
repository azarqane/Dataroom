import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../lib/supabase';
import { Shield } from 'lucide-react';

const AuthPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="flex items-center">
            <Shield className="h-12 w-12 text-teal-600" />
            <span className="ml-3 text-3xl font-bold text-gray-900">NeutVault</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Accédez à votre espace sécurisé
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Gérez vos documents confidentiels en toute sécurité
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0D9488',
                    brandAccent: '#0F766E',
                  },
                },
              },
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: 'Se connecter',
                  loading_button_label: 'Connexion en cours...',
                  link_text: 'Vous avez déjà un compte ? Connectez-vous',
                },
                sign_up: {
                  email_label: 'Adresse email',
                  password_label: 'Mot de passe',
                  button_label: "S'inscrire",
                  loading_button_label: 'Inscription en cours...',
                  link_text: "Vous n'avez pas de compte ? Inscrivez-vous",
                },
                forgotten_password: {
                  button_label: 'Réinitialiser le mot de passe',
                  loading_button_label: 'Envoi en cours...',
                  link_text: 'Mot de passe oublié ?',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;