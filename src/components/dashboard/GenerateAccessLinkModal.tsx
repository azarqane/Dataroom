import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../lib/supabase'; // adapte le chemin si besoin

interface GenerateAccessLinkModalProps {
  isOpen: boolean;
  room?: any;
  onClose: () => void;
  onCreated: (link: string) => void;
}

const defaultExpiration = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7); // +7 jours par défaut
  return d.toISOString().slice(0, 16);
};

const GenerateAccessLinkModal: React.FC<GenerateAccessLinkModalProps> = ({
  isOpen, room, onClose, onCreated,
}) => {
  const [email, setEmail] = useState('');
  const [expiration, setExpiration] = useState(defaultExpiration());
  const [usageLimit, setUsageLimit] = useState(1);
  const [creating, setCreating] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !room) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setLink(null);

    if (!email.trim()) {
      setError("L'email du destinataire est requis.");
      setCreating(false);
      return;
    }

    // Génération du token
    const token = uuidv4();
    // Création dans Supabase
    const { error: dbError } = await supabase
      .from('access_links')
      .insert({
        dataroom_id: room.id,
        email,
        token,
        expires_at: expiration,
        usage_limit: usageLimit,
      });
    if (dbError) {
      setError("Erreur lors de la création du lien : " + dbError.message);
      setCreating(false);
      return;
    }
    // Construction de l'URL sécurisée
    const accessUrl = `http://localhost:5173/access/${token}`;

    setLink(accessUrl);
    onCreated(accessUrl);
    setCreating(false);
  };

  const handleCopy = async () => {
  if (link) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(link);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch (e) {
        setCopied(false);
        alert("Erreur lors de la copie dans le presse-papier.");
      }
    } else {
      // Fallback : sélection du texte, demande de faire Ctrl+C
      const input = document.getElementById('access-link-input') as HTMLInputElement | null;
      if (input) {
        input.select();
        input.setSelectionRange(0, 99999);
        alert("Votre navigateur ne supporte pas la copie automatique. Sélectionnez le lien et faites Ctrl+C pour copier.");
      }
    }
  }
};



  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white border-2 border-teal-100 rounded-xl shadow-2xl p-8 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-teal-500 text-white px-5 py-2 rounded-full font-bold shadow-lg hover:bg-teal-700 transition"
          title="Fermer"
        >
          Fermer
        </button>

        <h3 className="text-lg font-bold mb-4 text-gray-900">
          Générer un lien d'accès sécurisé
        </h3>
        <form onSubmit={handleCreate}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Email du destinataire <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              placeholder="nom@domaine.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={creating}
              required
            />
          </div>
          <div className="mb-3 flex gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Expiration
              </label>
              <input
                type="datetime-local"
                className="block w-full border border-gray-300 rounded-md px-3 py-2"
                value={expiration}
                onChange={e => setExpiration(e.target.value)}
                disabled={creating}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Limite d'usages
              </label>
              <input
                type="number"
                className="block w-full border border-gray-300 rounded-md px-3 py-2"
                min={1}
                value={usageLimit}
                onChange={e => setUsageLimit(Number(e.target.value))}
                disabled={creating}
              />
            </div>
          </div>
          {error && (
            <div className="text-red-600 text-sm mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-2 rounded-xl font-semibold shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 transition-all duration-150"
            disabled={creating}
          >
            Générer le lien
          </button>
        </form>

        {link && (
          <div className="mt-6 bg-teal-50 rounded-xl p-4">
            <div className="text-xs text-gray-500 mb-2">
              Lien généré pour <span className="font-semibold">{email}</span> :
            </div>
            <div className="flex items-center gap-2">
              <input
  id="access-link-input"
  type="text"
  className="flex-1 border border-gray-200 rounded px-2 py-1 text-sm bg-white"
  value={link}
  readOnly
/>

              <button
                onClick={handleCopy}
                className={`px-3 py-1 ${copied ? 'bg-green-600' : 'bg-teal-600'} text-white rounded hover:bg-teal-700 text-sm transition`}
                type="button"
              >
                {copied ? "Copié !" : "Copier"}
              </button>
            </div>
            <button
              className="mt-4 w-full flex items-center justify-center gap-2 bg-gray-200 text-gray-500 py-2 rounded-xl font-semibold shadow hover:bg-gray-300 transition-all"
              type="button"
              disabled
              title="Envoi d'email à configurer (SMTP, SendGrid...)"
            >
              Envoyer par email (à venir)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateAccessLinkModal;
