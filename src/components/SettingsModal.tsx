import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { v4 as uuidv4 } from "uuid";
import { ClipboardCopy, ArrowLeft, X, Trash2, Info, Settings as Gear } from "lucide-react";
import { toast } from "react-hot-toast";
import countryList from 'react-select-country-list';

type ThumbBubbleProps = {
  value: number | string;
  unit?: string;
  style?: React.CSSProperties;
};
const ThumbBubble: React.FC<ThumbBubbleProps> = ({ value, unit = '', style = {} }) => (
  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/90 border border-gray-200 shadow-lg rounded-2xl px-4 py-1 text-xs font-semibold text-teal-700 pointer-events-none select-none transition font-sans z-30"
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
  { key: "general", label: "Data Room" },
  { key: "share", label: "Partage" },
  { key: "advanced", label: "Avancé" },
];

const countryOptions = countryList().getData();

const SettingsModal: React.FC<Props> = ({ room, onClose, afterChange }) => {
  const [tab, setTab] = useState<"general" | "share" | "advanced">(
    () => (typeof window !== "undefined" && sessionStorage.getItem("settingsTab") as "general" | "share" | "advanced") || "general"
  );
  function switchTab(newTab: "general" | "share" | "advanced") {
    setTab(newTab);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("settingsTab", newTab);
    }
  }

  // States
  const [roomName, setRoomName] = useState(room.name);
  const [description, setDescription] = useState(room.description || "");
  const [validity, setValidity] = useState<number>(room.valid_until ? getRemainingDays(room.valid_until) : 30);
  const [password, setPassword] = useState("");
  const [welcomeMsg, setWelcomeMsg] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [notifyOnAccess, setNotifyOnAccess] = useState(false);
  const [downloadDisabled, setDownloadDisabled] = useState(false);
  const [watermarkEnabled, setWatermarkEnabled] = useState(false);
  const [requireConsent, setRequireConsent] = useState(false);
  const [allowedDomains, setAllowedDomains] = useState<string>("");
  const [maxConcurrentUsers, setMaxConcurrentUsers] = useState<number>(5);

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
  const [showValidityBubble, setShowValidityBubble] = useState(false);
  const [showUsageBubble, setShowUsageBubble] = useState(false);
  const [showExpireBubble, setShowExpireBubble] = useState(false);

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

  // Handler
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
useEffect(() => {
  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "Escape") onClose();
  }
  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [onClose]);
  return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-teal-100/90 via-white/95 to-blue-100/90 font-sans overflow-auto"
    onClick={onClose} // Clic dehors ferme la modale
  >
    <div
      className="relative bg-white/95 rounded-3xl shadow-2xl p-0 w-[950px] h-[970px] flex flex-col transition-all ring-2 ring-teal-100/50"
      style={{ backdropFilter: "blur(10px)" }}
      onClick={e => e.stopPropagation()} // Empêche le clic intérieur de fermer
    >

        {/* Fleche retour */}
        <button
          onClick={onClose}
          className="absolute top-7 left-7 bg-white/80 hover:bg-teal-100 text-teal-700 border border-teal-100 rounded-full p-2 shadow transition z-20"
          title="Fermer"
        >
          <ArrowLeft className="w-7 h-7" />
        </button>

        {/* Engrenage centré */}
        <div className="flex items-center justify-center mt-9 mb-6">
          
        </div>

        {/* Onglets */}
        <div className="flex border-b-2 mb-8 gap-2 justify-center">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`py-3 px-7 font-bold text-lg border-b-4 rounded-t-2xl transition-all duration-200 font-sans
                ${tab === t.key
                  ? "border-teal-700 text-teal-900 bg-teal-100/30 shadow-md"
                  : "border-transparent text-gray-400 hover:text-teal-600 hover:bg-teal-100/40"}`}
              onClick={() => switchTab(t.key as "general" | "share" | "advanced")}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 px-12 pb-8 flex flex-col">
          {/* ----------- DATA ROOM ------------ */}
          {tab === "general" && (
            <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2 text-teal-800 text-base">
                  Nom
                </label>
                <input
                  className="block w-full mb-3 px-4 py-3 border-2 border-teal-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base font-semibold transition"
                  value={roomName}
                  onChange={e => setRoomName(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold mb-2 text-teal-800 text-base">
                  Description
                </label>
                <textarea
                  className="block w-full mb-3 px-4 py-3 border-2 border-teal-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200 text-base transition"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={2}
                />
              </div>
              <div>
                <label className="block font-bold mb-2 text-teal-800 text-base flex items-center gap-2">
                  Validité de la data room
                  <span title="Nombre de jours avant expiration automatique de la room" className="inline-flex">
                    <Info className="w-5 h-5 text-teal-400" />
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
                  <span className="text-base font-semibold text-teal-700 w-28 text-right">
                    {validity} jours
                    <br />
                    <span className="text-xs text-gray-500 font-normal">
                      Expire : {getExpireDate(validity)}
                    </span>
                  </span>
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2 text-teal-800 text-base">
                  Mot de passe d’accès (optionnel)
                </label>
                <input
                  type="password"
                  className="block w-full mb-3 px-4 py-3 border-2 border-teal-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200 transition"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Définir un mot de passe pour accéder à la room"
                />
              </div>
              <div>
                <label className="block font-bold mb-2 text-teal-800 text-base">
                  Message d’accueil personnalisé
                </label>
                <input
                  type="text"
                  className="block w-full mb-3 px-4 py-3 border-2 border-teal-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200 transition"
                  value={welcomeMsg}
                  onChange={e => setWelcomeMsg(e.target.value)}
                  placeholder="Message affiché à l’ouverture de la room"
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-4 pt-5">
                <button
                  onClick={handleSaveGeneral}
                  disabled={isSaving}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-teal-700 text-white py-3 rounded-2xl font-bold shadow-lg hover:from-teal-600 hover:to-teal-800 active:scale-95 transition"
                >{isSaving ? "Enregistrement..." : "Enregistrer"}</button>
                <button
                  onClick={handleDeleteRoom}
                  className="flex-1 bg-gradient-to-r from-red-500 to-pink-500 text-white py-3 rounded-2xl font-bold shadow-lg hover:from-red-600 hover:to-pink-600 active:scale-95 transition flex items-center justify-center gap-2 mt-4 md:mt-0"
                ><Trash2 className="inline-block w-5 h-5 -mt-0.5" /> Supprimer la Data Room</button>
              </div>
            </div>
          )}

          {/* ----------- PARTAGE ------------ */}
          {tab === "share" && (
            <div className="flex flex-col h-full min-h-0">
              {/* Bloc formulaire d'invitation */}
              <div className="mb-7">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className="block font-bold mb-2 text-teal-800 text-base">
                      Nom invité <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Prénom"
                      className="block w-full mb-3 px-4 py-3 border-2 border-teal-100 rounded-2xl bg-gray-50 transition"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-2 text-teal-800 text-base">
                      Prénom invité <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nom"
                      className="block w-full mb-3 px-4 py-3 border-2 border-teal-100 rounded-2xl bg-gray-50 transition"
                      value={lastName}
                      onChange={e => setLastName(e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block font-bold mb-2 text-teal-800 text-base">
                      Email invité <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Email invité"
                      className="block w-full mb-3 px-4 py-3 border-2 border-teal-100 rounded-2xl bg-gray-50 transition"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <label className="block font-bold mb-2 text-teal-800 text-base flex items-center gap-2">
                  Validité du lien d'accès
                  <span title="Durée de validité du lien" className="inline-flex">
                    <Info className="w-5 h-5 text-teal-400" />
                  </span>
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
                  <span className="w-44 text-right text-base text-blue-700">
                    {expiresDays} jours<br />
                    <span className="text-xs text-gray-500 font-normal">
                      Expire : {getExpireDate(expiresDays)}
                    </span>
                  </span>
                </div>
                <label className="block font-bold mb-2 text-teal-800 text-base">
                  Nombre d’utilisations <span className="text-red-500">*</span>
                </label>
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
                  <span className="w-28 text-right text-violet-700 font-semibold text-base">
                    {usageLimit} fois
                  </span>
                </div>
                <label className="inline-flex items-center mt-3 mb-2 cursor-pointer select-none gap-3 text-base font-bold text-teal-800">
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
                    className="block w-full mb-2 px-4 py-3 border-2 border-blue-100 rounded-2xl bg-gray-50"
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
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-2xl font-bold shadow-lg hover:from-blue-600 hover:to-blue-800 active:scale-95 transition mt-6 text-lg"
                >{creating ? "Création..." : "Générer un accès invité"}</button>
                {error && <div className="text-red-500 mt-3 text-base font-semibold">{error}</div>}
              </div>

              {/* Bloc scrollable de la liste des liens */}
              <div className="flex-1 min-h-0 flex flex-col">
                <h4 className="font-bold mb-4 text-teal-700 text-lg">Liens existants</h4>
                <div
                  className="rounded-xl border border-gray-100 bg-white/70 flex-1 min-h-0 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent"
                  style={{ minHeight: "100px", maxHeight: "100%" }}
                >
                  <ul className="space-y-4">
                    {links.map((l) => (
                      <li key={l.id} className="flex flex-col md:flex-row md:items-center justify-between text-base border-b pb-3 gap-3 md:gap-6">
                        <div className="flex flex-col gap-1">
                          <span className="font-semibold text-teal-700">{l.first_name} {l.last_name}</span>
                          <span className="text-xs text-gray-500">{l.email || "—"}</span>
                          <span className="flex flex-wrap gap-2 mt-1">
                            {l.expires_at
                              ? <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-xl text-xs font-semibold">Expire {new Date(l.expires_at).toLocaleDateString()} à {new Date(l.expires_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                              : <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-xl text-xs font-semibold">Illimité</span>}
                            <span className="bg-violet-100 text-violet-700 px-2 py-0.5 rounded-xl text-xs font-semibold">
                              Limite&nbsp;{l.usage_limit ?? "—"}
                            </span>
                            {l.country_restriction && (
                              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-xl text-xs font-semibold">
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
              </div>
            </div>
          )}

          {/* ----------- AVANCÉ ------------ */}
          {tab === "advanced" && (
            <div className="space-y-8">
              <label className="inline-flex items-center gap-3 text-base font-bold text-teal-800">
                <input
                  type="checkbox"
                  checked={notifyOnAccess}
                  onChange={() => setNotifyOnAccess(!notifyOnAccess)}
                  className="h-5 w-5 accent-teal-600 border-2 border-teal-100 rounded-md"
                />
                Notifier l’admin à chaque consultation d’un document
              </label>
              <label className="inline-flex items-center gap-3 text-base font-bold text-teal-800">
                <input
                  type="checkbox"
                  checked={downloadDisabled}
                  onChange={() => setDownloadDisabled(!downloadDisabled)}
                  className="h-5 w-5 accent-teal-600 border-2 border-teal-100 rounded-md"
                />
                Désactiver le téléchargement des documents (lecture seule)
              </label>
              <label className="inline-flex items-center gap-3 text-base font-bold text-teal-800">
                <input
                  type="checkbox"
                  checked={watermarkEnabled}
                  onChange={() => setWatermarkEnabled(!watermarkEnabled)}
                  className="h-5 w-5 accent-teal-600 border-2 border-teal-100 rounded-md"
                />
                Filigrane personnalisé sur tous les documents consultés
              </label>
              <label className="inline-flex items-center gap-3 text-base font-bold text-teal-800">
                <input
                  type="checkbox"
                  checked={requireConsent}
                  onChange={() => setRequireConsent(!requireConsent)}
                  className="h-5 w-5 accent-teal-600 border-2 border-teal-100 rounded-md"
                />
                Consentement obligatoire (CGU/RGPD) à chaque accès
              </label>
              <div>
                <label className="block font-bold mb-2 text-teal-800 text-base">
                  Limiter l’accès à certains domaines email (optionnel)
                </label>
                <input
                  type="text"
                  className="block w-full mb-2 px-4 py-3 border-2 border-teal-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
                  value={allowedDomains}
                  onChange={e => setAllowedDomains(e.target.value)}
                  placeholder="Exemple : moncabinet.fr, societe.com"
                />
                <div className="text-xs text-gray-500 ml-1">
                  Séparer les domaines par une virgule. Laisser vide pour aucune restriction.
                </div>
              </div>
              <div>
                <label className="block font-bold mb-2 text-teal-800 text-base">
                  Limiter le nombre d’utilisateurs simultanés
                </label>
                <input
                  type="number"
                  min={1}
                  max={50}
                  className="block w-full mb-2 px-4 py-3 border-2 border-teal-100 rounded-2xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-200"
                  value={maxConcurrentUsers}
                  onChange={e => setMaxConcurrentUsers(Number(e.target.value))}
                />
                <div className="text-xs text-gray-500 ml-1">
                  (Optionnel) – Par défaut : 5 utilisateurs. Maximum : 50.
                </div>
              </div>
            </div>
          )}
        </div>
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
          className="text-xs px-2 py-1 border rounded-xl bg-gray-50 font-sans"
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
      className="flex items-center gap-1 text-xs px-3 py-2 rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold shadow font-sans transition"
      onClick={handleCopy}
      title="Copier le lien"
    >
      <ClipboardCopy className="w-4 h-4" /> Copier
    </button>
  );
};

export default SettingsModal;
