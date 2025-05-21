import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import Logo from "../../components/Logo";
import { Shield } from "lucide-react";

const AccessDataRoom = () => {
  const { token } = useParams();
  const [step, setStep] = useState<"email" | "access" | "error">("email");
  const [email, setEmail] = useState("");
  const [accessLink, setAccessLink] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vérifie la validité du lien à chaque affichage ou refresh
  useEffect(() => {
    const fetchLink = async () => {
      setLoading(true);
      setError(null);
      setAccessLink(null);
      const { data, error } = await supabase
        .from("access_links")
        .select("*")
        .eq("token", token)
        .single();
      if (error || !data) {
        setError("Lien invalide ou expiré.");
        setStep("error");
        setLoading(false);
        return;
      }
      // Vérifie usage_limit obligatoire et > 0
      if (typeof data.usage_limit !== "number" || data.usage_limit < 1) {
        setError("Le quota d’utilisations de ce lien est atteint.");
        setStep("error");
        setLoading(false);
        return;
      }
      setAccessLink(data);
      setLoading(false);
      setStep("email");
    };
    fetchLink();
  }, [token]);

  // Soumission email invité
// Soumission email invité
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  if (!email || !accessLink) return;

  // Vérification email (insensible à la casse)
  if (
    accessLink.email &&
    accessLink.email.toLowerCase() !== email.trim().toLowerCase()
  ) {
    setError("Cet email n'est pas autorisé pour ce lien.");
    return;
  }

  // Re-check en temps réel (au cas où le quota a changé)
  const { data: freshLink, error: refreshError } = await supabase
    .from("access_links")
    .select("id, usage_limit")
    .eq("id", accessLink.id)
    .single();
  if (refreshError || !freshLink || typeof freshLink.usage_limit !== "number" || freshLink.usage_limit < 1) {
    setError("Le quota d’utilisations de ce lien est atteint.");
    return;
  }

  // Ajoute le timestamp courant dans l'historique des accès
  const now = new Date().toISOString();

// Récupère l'historique actuel des accès
const { data: linkForUsage } = await supabase
  .from("access_links")
  .select("use_at")
  .eq("id", accessLink.id)
  .single();

let use_at = [];
if (linkForUsage?.use_at) {
  use_at = Array.isArray(linkForUsage.use_at)
    ? [...linkForUsage.use_at, now]
    : [linkForUsage.use_at, now];
} else {
  use_at = [now];
}

// Mets à jour quota, le dernier accès, et l’historique
const { error: updateError } = await supabase
  .from("access_links")
  .update({
    usage_limit: freshLink.usage_limit - 1,
    used_at: now,    // Dernier accès
    use_at: use_at,  // Historique complet
  })
  .eq("id", accessLink.id);

if (updateError) {
  setError("Erreur lors de la mise à jour du quota.");
  return;
}



  setStep("access");
  setShowPopup(true);
};


  if (step === "error") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Logo size={52} />
        <h2 className="mt-6 text-2xl font-bold text-red-600">Erreur</h2>
        <p className="mt-3 text-gray-700">{error || "Lien d'accès invalide."}</p>
      </div>
    );
  }

  // Loader simple
  if (loading || !accessLink)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Logo size={48} />
        <div className="text-lg mt-6 text-teal-700">Chargement…</div>
      </div>
    );

  // Étape email
  if (step === "email")
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-50 to-white">
        <Logo size={48} />
        <h2 className="mt-4 text-2xl font-extrabold text-teal-900">Accès invité à une Data Room</h2>
        <p className="mt-2 text-gray-500 text-center max-w-md">
          Pour consulter les documents, veuillez renseigner votre adresse email.<br />
          <span className="text-xs text-gray-400">Votre accès est personnel et tracé.</span>
        </p>
        <form
          className="mt-8 w-full max-w-sm space-y-4 bg-white p-6 rounded-2xl shadow-xl border"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            required
            placeholder="Votre email (ex : avocat@cabinet.fr)"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-300 outline-none"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {error && <div className="text-red-500">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 bg-teal-600 text-white rounded-lg font-bold shadow hover:bg-teal-700 transition"
          >
            Accéder
          </button>
        </form>
      </div>
    );

  // Étape accès fichiers
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-8">
      <Logo size={40} />
      {/* Pop-up warning */}
      {showPopup && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="bg-white rounded-xl p-8 max-w-md w-full shadow-lg flex flex-col items-center gap-3 relative"
            onClick={e => e.stopPropagation()}
          >
            <Shield className="w-12 h-12 text-teal-500" />
            <h3 className="text-xl font-bold text-teal-800 mb-2">Accès surveillé</h3>
            <p className="text-gray-700 text-center">
              <span className="font-bold">Attention :</span> Il est strictement interdit de copier, télécharger, partager ou imprimer tout document présent dans cette Data Room.<br />
              Toute tentative est tracée et punie par la loi (<span className="underline">art. 323-1 et suivants du Code pénal</span>, propriété intellectuelle, secret professionnel, etc.).
            </p>
            <button
              className="mt-4 px-5 py-2 bg-teal-600 text-white font-bold rounded-lg shadow"
              onClick={() => setShowPopup(false)}
            >
              J'ai compris
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 max-w-2xl w-full bg-teal-50 border-l-4 border-teal-400 px-6 py-4 rounded text-teal-800 shadow">
        Espace sécurisé – Documents à consulter en ligne.
      </div>

      <div className="mt-6 w-full max-w-2xl bg-white rounded-2xl shadow p-6 border">
        <h3 className="text-lg font-bold text-teal-700 mb-4">Documents disponibles</h3>
        <div className="flex flex-col gap-2">
          <div className="text-gray-400 text-center py-4">[Ici s'affichent les fichiers partagés]</div>
        </div>
      </div>
    </div>
  );
};

export default AccessDataRoom;
