import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '../../lib/supabase';
import { toast } from 'react-hot-toast';
import countryList from 'react-select-country-list';

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
      <div className="bg-white rounded-xl border-2 border-teal-100 shadow-2xl w-full max-w-lg">
        <div className="p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg hover:bg-teal-700 transition"
            title="Fermer"
          >
            Fermer
          </button>

          <h3 className="text-lg font-bold mb-6 text-gray-900 pr-20">
            Générer un lien d'accès sécurisé
          </h3>

          <form onSubmit={handleCreate} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1 text-gray-700">
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
                <label className="block font-medium mb-1 text-gray-700">
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
              <label className="block font-medium mb-1 text-gray-700">
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

            <div>
              <label className="block font-medium mb-1 text-gray-700">
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
              <label className="block font-medium mb-1 text-gray-700">
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

            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={geoRestricted}
                  onChange={() => setGeoRestricted(!geoRestricted)}
                  className="form-checkbox h-4 w-4 text-teal-600"
                />
                <span className="text-gray-700">Restreindre géographiquement</span>
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
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={creating}
            >
              {creating ? "Génération en cours..." : "Générer le lien"}
            </button>
          </form>

          {link && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Lien d'accès généré :</p>
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
                  {copied ? "Copié !" : "Copier"}
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