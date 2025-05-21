import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { ClipboardCopy, X, Trash2, Info } from "lucide-react";
import { toast } from "react-hot-toast";
import countryList from 'react-select-country-list';
type ThumbBubbleProps = {
  value: number | string;
  unit?: string;
  style?: React.CSSProperties;
};
// Pour la bulle d’info curseur
const ThumbBubble: React.FC<ThumbBubbleProps> = ({ value, unit = '', style = {} }) => (
  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 border border-gray-200 shadow-md rounded-xl px-3 py-1 text-xs font-bold text-teal-600 pointer-events-none select-none transition"
       style={style}>
    {value}{unit}
  </div>
);
type AccessLink = {
  id: string;
  email: string | null;
  expires_at: string | null;
  usage_limit: number | null;
  token: string;
  country_restriction?: string | null;
  first_name?: string | null;
  last_name?: string | null;
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
const [tab, setTab] = useState<"general" | "share">(
  () => (typeof window !== "undefined" && sessionStorage.getItem("settingsTab") as "general" | "share") || "general"
);

function switchTab(newTab: "general" | "share") {
  setTab(newTab);
  if (typeof window !== "undefined") {
    sessionStorage.setItem("settingsTab", newTab);
  }
}
 // Général
  const [roomName, setRoomName] = useState(room.name);
  const [description, setDescription] = useState(room.description || "");
  const [validity, setValidity] = useState<number>(room.valid_until ? getRemainingDays(room.valid_until) : 30);
  const [isSaving, setIsSaving] = useState(false);

  // Partage
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [usageLimit, setUsageLimit] = useState("1");
  const [creating, setCreating] = useState(false);
  const [expiresDays, setExpiresDays] = useState<number>(7);
  const [geoRestricted, setGeoRestricted] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [links, setLinks] = useState<AccessLink[]>([]);
  const [error, setError] = useState("");
  // Pour la bulle d’info curseur
  const [showValidityBubble, setShowValidityBubble] = useState(false);
  const [showUsageBubble, setShowUsageBubble] = useState(false);
  const [showExpireBubble, setShowExpireBubble] = useState(false);

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
  function getExpireDate(days: number) {
    const d = addDays(new Date(), days);
    return d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
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

    if (!firstName.trim() || !lastName.trim()) {
      setError("Le nom et prénom de l'invité sont obligatoires.");
      setCreating(false);
      return;
    }
    if (!email.trim()) {
      setError("L'adresse email est obligatoire.");
      setCreating(false);
      return;
    }
    if (!usageLimit || isNaN(Number(usageLimit)) || Number(usageLimit) < 1) {
      setError("Le nombre d’utilisations doit être renseigné et supérieur à 0.");
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
        first_name: firstName.trim(),
        last_name: lastName.trim(),
      });
    if (error) setError(error.message);
    else {
      setEmail("");
      setFirstName("");
      setLastName("");
      setUsageLimit("1");
      setExpiresDays(7);
      setGeoRestricted(false);
      setSelectedCountry(null);
      toast.success("Lien généré !");
      // Reload links (reste sur l’onglet actuel)
      const { data } = await supabase
        .from("access_links")
        .select("*")
        .eq("dataroom_id", room.id)
        .order("created_at", { ascending: false });
      setLinks((data ?? []) as AccessLink[]);
      // Surtout NE PAS changer de tab ici !
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-teal-100/80 via-white/90 to-blue-100/80 overflow-auto">
      <div className="relative bg-white/95 rounded-3xl shadow-2xl p-8 w-full max-w-3xl min-h-[580px] transition-all"
        style={{ backdropFilter: "blur(10px)" }}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-teal-500 text-white px-5 py-2 rounded-full font-bold shadow-xl hover:bg-teal-700 active:scale-95 transition"
        >Fermer</button>

        <div className="flex border-b-2 mb-7 gap-1">
          {TABS.map(t => (
  <button
    key={t.key}
    className={`py-2 px-6 font-bold text-lg border-b-4 rounded-t-xl bg-white/90 transition-all duration-200
      ${tab === t.key
        ? "border-teal-600 text-teal-800 shadow"
        : "border-transparent text-gray-500 hover:text-teal-500 hover:bg-teal-100/30"}`}
    onClick={() => switchTab(t.key as "general" | "share")}
  >
    {t.label}
  </button>
))}


        </div>

        {/* PARAMÈTRES DATA ROOM */}
        {tab === "general" && (
          <div className="space-y-4">
            <label className="block font-bold mb-1">Nom</label>
            <input
              className="block w-full mb-3 px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base font-semibold"
              value={roomName}
              onChange={e => setRoomName(e.target.value)}
            />

            <label className="block font-bold mb-1">Description</label>
            <textarea
              className="block w-full mb-3 px-4 py-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
            />

            <div>
              <label className="block font-bold mb-1 flex items-center gap-2">
                Validité de la data room
<span title="Ta description tooltip" className="inline-flex">
  <Info className="w-4 h-4 text-teal-500" />
</span>
              </label>
              <div className="flex items-center gap-3 relative group mb-2">
                <div className="relative w-full">
                  <input
                    type="range"
                    min={1}
                    max={365}
                    value={validity}
                    onChange={e => setValidity(Number(e.target.value))}
                    className="w-full accent-teal-600 h-2 rounded-full bg-teal-200"
                    onMouseDown={() => setShowValidityBubble(true)}
                    onMouseUp={() => setShowValidityBubble(false)}
                    onMouseLeave={() => setShowValidityBubble(false)}
                  />
                  {showValidityBubble && (
                    <ThumbBubble value={validity} unit="j" />
                  )}
                </div>
                <span className="text-base font-semibold text-teal-700 w-24 text-right">
                  {validity} jours
                  <br />
                  <span className="text-xs text-gray-500">
                    Expire&nbsp;: {getExpireDate(validity)}
                  </span>
                </span>
              </div>
            </div>

            <div className="flex justify-between gap-3 pt-4">
              <button
                onClick={handleSaveGeneral}
                disabled={isSaving}
                className="flex-1 bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-teal-600 hover:to-teal-800 transition"
              >{isSaving ? "Enregistrement..." : "Enregistrer"}</button>
              <button
                onClick={handleDeleteRoom}
                className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:from-red-600 hover:to-pink-600 transition"
              ><Trash2 className="inline-block w-5 h-5 mr-2 -mt-1" /> Supprimer la Data Room</button>
            </div>
          </div>
        )}

        {/* PARAMÈTRES PARTAGE */}
        {tab === "share" && (
          <div className="space-y-8">
            <div>
              <h3 className="font-bold text-teal-700 mb-3 text-lg">Créer un lien d’accès</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label>Nom invité <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Prénom"
                    className="block w-full mt-1 mb-2 px-3 py-2 border rounded-xl bg-gray-50"
                    value={firstName}
                    onChange={e => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label>Prénom invité <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Nom"
                    className="block w-full mt-1 mb-2 px-3 py-2 border rounded-xl bg-gray-50"
                    value={lastName}
                    onChange={e => setLastName(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label>Email invité <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    required
                    placeholder="Email invité"
                    className="block w-full mt-1 mb-2 px-3 py-2 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 mb-1">
                Validité du lien d'accès&nbsp;
<span title="Ta description tooltip" className="inline-flex">
  <Info className="w-4 h-4 text-teal-500" />
</span>
                <span className="font-bold text-teal-700 ml-2">{expiresDays} jours</span>
              </label>
              <div className="flex items-center gap-3 relative group mb-2">
                <div className="relative w-full">
                  <input
                    type="range"
                    min={1}
                    max={60}
                    value={expiresDays}
                    onChange={e => setExpiresDays(Number(e.target.value))}
                    className="w-full accent-blue-600 h-2 rounded-full bg-blue-100"
                    onMouseDown={() => setShowExpireBubble(true)}
                    onMouseUp={() => setShowExpireBubble(false)}
                    onMouseLeave={() => setShowExpireBubble(false)}
                  />
                  {showExpireBubble && (
                    <ThumbBubble value={expiresDays} unit="j" />
                  )}
                </div>
                <span className="w-40 text-right text-base text-blue-700">
                  {expiresDays} jours<br />
                  <span className="text-xs text-gray-500">
                    Expire&nbsp;: {getExpireDate(expiresDays)}
                  </span>
                </span>
              </div>

              <label className="mb-1">Nombre d’utilisations <span className="text-red-500">*</span></label>
              <div className="flex items-center gap-3 relative group mb-2">
                <div className="relative w-full">
                  <input
                    type="range"
                    min={1}
                    max={30}
                    value={usageLimit}
                    onChange={e => setUsageLimit(e.target.value)}
                    className="w-full accent-violet-600 h-2 rounded-full bg-violet-100"
                    onMouseDown={() => setShowUsageBubble(true)}
                    onMouseUp={() => setShowUsageBubble(false)}
                    onMouseLeave={() => setShowUsageBubble(false)}
                  />
                  {showUsageBubble && (
                    <ThumbBubble value={usageLimit} unit="x" />
                  )}
                </div>
                <span className="w-24 text-right text-violet-700 font-semibold text-base">
                  {usageLimit} fois
                </span>
              </div>

              <label className="inline-flex items-center mt-2 mb-2 cursor-pointer select-none gap-2">
                <input
                  type="checkbox"
                  checked={geoRestricted}
                  onChange={() => setGeoRestricted(!geoRestricted)}
                  className="form-checkbox accent-blue-600 border-2 border-blue-200 h-5 w-5 rounded-md"
                />
                Restreindre géographiquement
              </label>
              {geoRestricted && (
                <select
                  className="block w-full mb-2 px-3 py-2 border rounded-xl bg-gray-50"
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
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-2xl font-bold shadow-lg hover:from-blue-600 hover:to-blue-800 active:scale-95 transition mt-4"
              >{creating ? "Création..." : "Générer un accès invité"}</button>
              {error && <div className="text-red-500 mt-3 text-base font-semibold">{error}</div>}
            </div>

            <hr className="my-5 border-t-2 border-dashed border-gray-200" />

            <h4 className="font-bold mb-3 text-teal-700 text-lg">Liens existants</h4>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.id} className="flex items-center justify-between text-base border-b pb-2 gap-4">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold text-teal-700">{l.first_name} {l.last_name}</span>
                    <span className="text-xs text-gray-600">{l.email || "—"}</span>
                    <span className="text-xs text-gray-500">
                      {l.expires_at
                        ? <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-xl">Expire {new Date(l.expires_at).toLocaleDateString()} à {new Date(l.expires_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                        : <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-xl">Illimité</span>}
                      <span className="ml-2 bg-violet-100 text-violet-700 px-2 py-0.5 rounded-xl">
                        Limite&nbsp;{l.usage_limit ?? "—"}
                      </span>
                      {l.country_restriction && (
                        <span className="ml-2 bg-blue-100 text-blue-700 px-2 py-0.5 rounded-xl">
                          {l.country_restriction}
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CopyAccessLinkButton token={l.token} />
                    <button
                      className="flex items-center gap-1 text-xs px-3 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 font-semibold shadow"
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

// --- Composant bouton de copie (inchangé, mais stylisé)
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
          className="text-xs px-2 py-1 border rounded-xl bg-gray-50"
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
      className="flex items-center gap-1 text-xs px-3 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold shadow"
      onClick={handleCopy}
      title="Copier le lien"
    >
      <ClipboardCopy className="w-4 h-4" /> Copier
    </button>
  );
};

export default SettingsModal;
