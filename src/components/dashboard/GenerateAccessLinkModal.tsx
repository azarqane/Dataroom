import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';
import countryList from 'react-select-country-list';
import { X, Copy, Check, Globe } from 'lucide-react';

interface GenerateAccessLinkModalProps {
  isOpen: boolean;
  room?: any;
  onClose: () => void;
  onCreated: (link: string) => void;
}

const defaultExpiration = () => {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  return d.toISOString().slice(0, 16);
};

const GenerateAccessLinkModal: React.FC<GenerateAccessLinkModalProps> = ({
  isOpen, room, onClose, onCreated,
}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [expiration, setExpiration] = useState(defaultExpiration());
  const [usageLimit, setUsageLimit] = useState(1);
  const [creating, setCreating] = useState(false);
  const [link, setLink] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [geoRestricted, setGeoRestricted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  if (!isOpen || !room) return null;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError(null);
    setLink(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Le nom et prénom de l'invité sont obligatoires.");
      setCreating(false);
      return;
    }

    if (!email.trim()) {
      setError("L'email du destinataire est requis.");
      setCreating(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setError("L'adresse email n'est pas valide.");
      setCreating(false);
      return;
    }

    const token = uuidv4();
    const expires_at = new Date(expiration).toISOString();

    try {
      const { error: dbError } = await supabase
        .from('access_links')
        .insert({
          dataroom_id: room.id,
          email: email.trim(),
          expires_at,
          usage_limit: usageLimit,
          token,
          country_restriction: geoRestricted && selectedCountry ? selectedCountry : null,
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        });

      if (dbError) throw dbError;

      const accessUrl = `${window.location.origin}/access/${token}`;
      setLink(accessUrl);
      onCreated(accessUrl);
      
      setEmail('');
      setFirstName('');
      setLastName('');
      setUsageLimit(1);
      setExpiration(defaultExpiration());
      setGeoRestricted(false);
      setSelectedCountry(null);
      
      toast.success("Lien généré avec succès !");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  const handleCopy = async () => {
    if (!link) return;
    
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Lien copié !");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Impossible de copier le lien automatiquement");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl border-2 border-primary-100 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Générer un lien d'accès sécurisé
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prénom invité <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Prénom"
                  value={firstName}
                  onChange={e => setFirstName(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nom invité <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="input"
                  placeholder="Nom"
                  value={lastName}
                  onChange={e => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email invité <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="input"
                placeholder="email@exemple.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date d'expiration
                </label>
                <input
                  type="datetime-local"
                  className="input"
                  value={expiration}
                  onChange={e => setExpiration(e.target.value)}
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre d'utilisations maximum
                </label>
                <input
                  type="number"
                  className="input"
                  min="1"
                  max="100"
                  value={usageLimit}
                  onChange={e => setUsageLimit(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={geoRestricted}
                  onChange={() => setGeoRestricted(!geoRestricted)}
                  className="form-checkbox h-4 w-4 text-primary-600 rounded"
                />
                <span className="text-sm text-gray-700 flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  Restreindre géographiquement
                </span>
              </label>

              {geoRestricted && (
                <select
                  className="input"
                  value={selectedCountry || ""}
                  onChange={e => setSelectedCountry(e.target.value)}
                >
                  <option value="">-- Sélectionner un pays --</option>
                  {countryList().getData().map(country => (
                    <option key={country.value} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={creating}
            >
              {creating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Génération en cours...
                </span>
              ) : (
                "Générer le lien"
              )}
            </button>
          </form>

          {link && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Lien d'accès généré :
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={link}
                  readOnly
                  className="input flex-1 bg-white text-sm font-mono"
                />
                <button
                  onClick={handleCopy}
                  className="btn btn-secondary whitespace-nowrap"
                >
                  {copied ? (
                    <span className="flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      Copié !
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Copy className="w-4 h-4 mr-1" />
                      Copier
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateAccessLinkModal;