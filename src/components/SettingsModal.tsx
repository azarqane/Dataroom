import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { ClipboardCopy, X, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import countryList from 'react-select-country-list';

type AccessLink = {
  id: string;
  email: string | null;
  expires_at: string | null;
  usage_limit: number | null;
  token: string;
  country_restriction?: string | null;
};

type Props = {
  room: { id: string; name: string; description?: string; valid_until?: string; [key: string]: any };
  onClose: () => void;
  afterChange?: () => void;
};

const TABS = [
  { key: "general", label: "Paramètres Data Room" },
  { key: "share", label: "Paramètres de partage" },
];

const countryOptions = countryList().getData();

const SettingsModal: React.FC<Props> = ({ room, onClose, afterChange }) => {
  const [tab, setTab] = useState<"general" | "share">("general");
  // Général
  const [roomName, setRoomName] = useState(room.name);
  const [description, setDescription] = useState(room.description || "");
  const [validity, setValidity] = useState<number>(room.valid_until ? getRemainingDays(room.valid_until) : 30);
  const [isSaving, setIsSaving] = useState(false);

  // Partage
  const [email, setEmail] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [creating, setCreating] = useState(false);
  const [expiresDays, setExpiresDays] = useState<number>(7); // slider pour lien d'accès
  const [geoRestricted, setGeoRestricted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [links, setLinks] = useState<AccessLink[]>([]);
  const [error, setError] = useState("");

  // Initialisation (liens existants)
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("access_links")
        .select("*")
        .eq("dataroom_id", room.id)
        .order("created_at", { ascending: false });
      setLinks((data ?? []) as AccessLink[]);
    })();
  }, [room]);

  // Helpers
  function getRemainingDays(validUntil: string) {
    const until = new Date(validUntil).getTime();
    const now = Date.now();
    const diff = Math.round((until - now) / (1000 * 3600 * 24));
    return diff > 0 ? diff : 0;
  }
  function addDays(date: Date, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  // -- Save DataRoom general settings
  async function handleSaveGeneral() {
    setIsSaving(true);
    const validUntil = addDays(new Date(), validity);
    const { error } = await supabase
      .from("datarooms")
      .update({
        name: roomName,
        description,
        valid_until: validUntil.toISOString(),
      })
      .eq("id", room.id);
    setIsSaving(false);
    if (error) {
      toast.error("Erreur lors de la sauvegarde");
    } else {
      toast.success("Modifications enregistrées !");
      afterChange?.();
    }
  }

  // -- Suppression data room
  async function handleDeleteRoom() {
    if (!window.confirm("Suppression définitive de la Data Room ?")) return;
    const { error } = await supabase.from("datarooms").delete().eq("id", room.id);
    if (!error) {
      toast.success("Data Room supprimée.");
      onClose();
      afterChange?.();
    } else {
      toast.error("Erreur lors de la suppression");
    }
  }

  // -- Création lien d'accès avec paramètres avancés
  async function handleCreateLink() {
  setCreating(true);
  setError("");

  // Email obligatoire
  if (!email.trim()) {
    setError("L'adresse email est obligatoire.");
    setCreating(false);
    return;
  }

  // Usage_limit obligatoire et > 0
  if (!usageLimit || isNaN(Number(usageLimit)) || Number(usageLimit) < 1) {
    setError("Le nombre d’utilisations doit être renseigné et supérieur à 0.");
    setCreating(false);
    return;
  }

  // Email format...
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    setError("L'adresse email n'est pas valide.");
    setCreating(false);
    return;
  }

  const token = uuidv4();
  const expires_at = addDays(new Date(), expiresDays).toISOString();
  const { error } = await supabase
    .from("access_links")
    .insert({
      dataroom_id: room.id,
      email: email.trim(),
      expires_at,
      usage_limit: Number(usageLimit),
      token,
      country_restriction: geoRestricted && selectedCountry ? selectedCountry : null,
    });
  if (error) setError(error.message);
  else {
    setEmail("");
    setUsageLimit("");
    setExpiresDays(7);
    setGeoRestricted(false);
    setSelectedCountry(null);
    toast.success("Lien généré !");
    // Reload links
    const { data } = await supabase
      .from("access_links")
      .select("*")
      .eq("dataroom_id", room.id)
      .order("created_at", { ascending: false });
    setLinks((data ?? []) as AccessLink[]);
    afterChange?.();
  }
  setCreating(false);
}


  async function handleDeleteLink(linkId: string) {
    await supabase.from("access_links").delete().eq("id", linkId);
    const { data } = await supabase
      .from("access_links")
      .select("*")
      .eq("dataroom_id", room.id)
      .order("created_at", { ascending: false });
    setLinks((data ?? []) as AccessLink[]);
    afterChange?.();
    toast.success("Lien révoqué !");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 overflow-auto">
      <div className="relative bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full max-w-2xl">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-teal-500 text-white px-5 py-2 rounded-full font-bold shadow-lg hover:bg-teal-700 transition"
        >Fermer</button>

        <div className="flex border-b mb-6">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`py-2 px-4 font-semibold text-base border-b-2 transition 
                ${tab === t.key ? "border-teal-600 text-teal-700" : "border-transparent text-gray-500 hover:text-teal-500"}`}
              onClick={() => setTab(t.key as "general" | "share")}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* PARAMÈTRES DATA ROOM */}
        {tab === "general" && (
          <div>
            <label className="block font-bold mb-1">Nom</label>
            <input
              className="block w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-teal-200"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
            />

            <label className="block font-bold mb-1">Description</label>
            <textarea
              className="block w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-teal-200"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />

            <label className="block font-bold mb-1">Validité de la data room</label>
            <div className="flex items-center gap-3 mb-4">
              <input
                type="range"
                min={1}
                max={365}
                value={validity}
                onChange={e => setValidity(Number(e.target.value))}
                className="w-full"
              />
              <span className="w-20 text-right text-gray-700">{validity} jours</span>
            </div>

            <div className="flex justify-between gap-3">
              <button
                onClick={handleSaveGeneral}
                disabled={isSaving}
                className="flex-1 bg-gradient-to-r from-teal-500 to-teal-700 text-white py-2 rounded-xl font-semibold shadow-md hover:from-teal-600 hover:to-teal-800 transition"
              >{isSaving ? "Enregistrement..." : "Enregistrer"}</button>
              <button
                onClick={handleDeleteRoom}
                className="flex-1 bg-gradient-to-r from-red-600 to-pink-500 text-white py-2 rounded-xl font-semibold shadow-md hover:from-red-700 hover:to-pink-600 transition"
              ><Trash2 className="inline-block w-4 h-4 mr-1" /> Supprimer la Data Room</button>
            </div>
          </div>
        )}

        {/* PARAMÈTRES PARTAGE */}
        {tab === "share" && (
          <div>
            <div className="mb-6">
              <h3 className="font-bold text-teal-700 mb-2">Créer un lien d’accès</h3>
              <div className="mb-2">
                <label>Email invité <span className="text-red-500">*</span></label>

                <input
                  type="email"
                  required
                  placeholder="Email invité"
                  className="block w-full mt-1 mb-2 px-3 py-2 border rounded"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <label>Validité du lien d'accès : <span className="font-bold text-teal-700">{expiresDays} jours</span></label>
              <div className="flex items-center gap-3 mb-3">
                <input
                  type="range"
                  min={1}
                  max={60}
                  value={expiresDays}
                  onChange={e => setExpiresDays(Number(e.target.value))}
                  className="w-full"
                />
                <span className="w-16 text-right text-gray-700">{expiresDays}j</span>
              </div>

              <label>Nombre d’utilisations <span className="text-red-500">*</span></label>
<input
  type="number"
  className="block w-full mt-1 mb-2 px-3 py-2 border rounded"
  min={1}
  required
  value={usageLimit}
  onChange={e => setUsageLimit(e.target.value)}
/>


              <label className="inline-flex items-center mt-2 mb-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={geoRestricted}
                  onChange={() => setGeoRestricted(!geoRestricted)}
                  className="form-checkbox mr-2"
                />
                Restreindre géographiquement
              </label>
              {geoRestricted && (
                <select
  className="block w-full mb-2 px-3 py-2 border rounded"
  value={selectedCountry || ""}
  onChange={e => setSelectedCountry(e.target.value)}
>
  <option value="">-- Choisir un pays --</option>
  {countryOptions.map((country: { label: string; value: string }) => (
    <option key={country.value} value={country.label}>{country.label}</option>
  ))}
</select>
              )}

              <button
                onClick={handleCreateLink}
                disabled={creating}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2 rounded-xl font-semibold shadow-md hover:from-blue-600 hover:to-blue-800 transition"
              >{creating ? "Création..." : "Générer un accès invité"}</button>
              {error && <div className="text-red-500 mt-2">{error}</div>}
            </div>

            <hr className="my-4" />
            <h4 className="font-bold mb-2">Liens existants</h4>
            <ul className="space-y-2">
  {links.map((l) => (
    <li key={l.id} className="flex items-center justify-between text-sm border-b pb-2">
      <div>
        <span className="text-teal-700">{l.email || "—"}</span>
        <span className="text-xs text-gray-500 ml-2">
          {l.expires_at
            ? ("Expire " + new Date(l.expires_at).toLocaleDateString())
            : "Jamais"}
        </span>
        <span className="text-xs text-gray-400 ml-2">
          {l.usage_limit ? ("Limite " + l.usage_limit) : "Illimité"}
        </span>
        {l.country_restriction && (
          <span className="text-xs ml-2 rounded bg-blue-100 text-blue-700 px-2 py-1">
            {l.country_restriction}
          </span>
        )}
      </div>
      <div className="flex gap-2 items-center">
        <CopyAccessLinkButton token={l.token} />
        <button
          className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 font-semibold"
          onClick={() => handleDeleteLink(l.id)}
          title="Révoquer"
        >
          <X className="w-4 h-4" /> Révoquer
        </button>
      </div>
    </li>
  ))}
</ul>

          </div>
        )}
      </div>
    </div>
  );
};
const CopyAccessLinkButton: React.FC<{ token: string }> = ({ token }) => {
  const [showInput, setShowInput] = useState(false);
  const url = `${window.location.origin}/access/${token}`;

  const handleCopy = async () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success("Lien copié !");
      } catch (e) {
        setShowInput(true);
        toast.error("Impossible de copier automatiquement. Copiez manuellement.");
      }
    } else {
      setShowInput(true);
      toast.error("Impossible de copier automatiquement. Copiez manuellement.");
    }
  };

  if (showInput) {
    return (
      <div className="flex gap-1 items-center">
        <input
          type="text"
          value={url}
          readOnly
          className="text-xs px-2 py-1 border rounded bg-gray-50"
          style={{ width: "190px" }}
          onFocus={e => e.target.select()}
        />
        <button
          className="text-blue-600 underline text-xs px-2"
          onClick={() => setShowInput(false)}
        >
          Cacher
        </button>
      </div>
    );
  }

  return (
    <button
      className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold"
      onClick={handleCopy}
      title="Copier le lien"
    >
      <ClipboardCopy className="w-4 h-4" /> Copier
    </button>
  );
};

export default SettingsModal;
