import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  FolderOpen,
  ArrowLeft,
  FileText,
  Settings,
  Link,
  Loader2,
  Trash2,
  Eye,
  User2,
  Info,
  UploadCloud,
} from "lucide-react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const DataRoomPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [room, setRoom] = useState<any>(null);
  const [files, setFiles] = useState<any[]>([]);
  const [links, setLinks] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [user, setUser] = useState<any>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fakeDescription =
    "Partagez et protégez vos documents sensibles. Générer des accès sécurisés à la demande.";

  // Récupération utilisateur
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
    };
    fetchUser();
  }, []);

  // Chargement des données
  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      setError(null);

      const { data: r, error: err } = await supabase
        .from("datarooms")
        .select("*")
        .eq("id", id)
        .single();

      if (err || !r) {
        setError("Data Room introuvable.");
        setLoading(false);
        return;
      }

      setRoom(r);

      const { data: filesData } = await supabase
        .from("files")
        .select("*")
        .eq("dataroom_id", id)
        .order("uploaded_at", { ascending: false });
      setFiles(filesData || []);

      const { data: linksData } = await supabase
        .from("access_links")
        .select("*")
        .eq("dataroom_id", id)
        .order("created_at", { ascending: false });
      setLinks(linksData || []);

      const { data: logsData } = await supabase
        .from("access_logs")
        .select("*")
        .in("file_id", filesData?.map((f) => f.id) || [])
        .order("accessed_at", { ascending: false })
        .limit(5);
      setLogs(logsData || []);

      setLoading(false);
    };

    if (id) fetchRoom();
  }, [id]);

  // Nettoyage nom fichier pour stockage
  const cleanFileName = (filename: string) =>
    filename.trim().replace(/\s+/g, "_").replace(/[^a-zA-Z0-9._-]/g, "");

  // Suppression fichier (storage + base)
  const handleDeleteFile = async (file: any) => {
    if (!room) return;

    if (
      !confirm(
        `Confirmez-vous la suppression du fichier "${file.name}" ? Cette action est irréversible.`
      )
    ) {
      return;
    }

    try {
      setUploading(true);

      const { error: storageError } = await supabase
        .storage
        .from("dataroom-files")
        .remove([file.url]);

      if (storageError) throw storageError;

      const { error: dbError } = await supabase
        .from("files")
        .delete()
        .eq("id", file.id);

      if (dbError) throw dbError;

      setFiles((prevFiles) => prevFiles.filter((f) => f.id !== file.id));
      toast.success(`Fichier "${file.name}" supprimé avec succès.`);
    } catch (err: any) {
      toast.error(`Erreur lors de la suppression : ${err.message || err}`);
    } finally {
      setUploading(false);
    }
  };

  // Upload fichier
  const handleUpload = async (file: File) => {
    if (!room || !user) return;

    try {
      setUploading(true);

      const safeFileName = `${uuidv4()}-${cleanFileName(file.name)}`;
      const storagePath = `${room.id}/${safeFileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from("dataroom-files")
        .upload(storagePath, file, {
          cacheControl: "3600",
          upsert: false,
          metadata: { owner: user.id },
        });

      if (uploadError) throw uploadError;

      const { data: insertData, error: dbError } = await supabase
        .from("files")
        .insert({
          dataroom_id: room.id,
          name: file.name,
          url: storagePath,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      setFiles((prev) => [
        {
          id: insertData.id,
          name: insertData.name,
          url: insertData.url,
          uploaded_at: insertData.uploaded_at || new Date().toISOString(),
        },
        ...prev,
      ]);

      toast.success("Fichier uploadé avec succès !");
    } catch (err: any) {
      toast.error("Erreur lors de l'upload : " + (err.message || err));
    } finally {
      setUploading(false);
    }
  };

  // Sélection via input file
  const handleSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleUpload(file);
      e.target.value = "";
    }
  };

  // Click zone drag-drop déclenche input file
  const handleZoneClick = () => {
    if (!uploading) fileInputRef.current?.click();
  };

  // Gestion drag & drop
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-teal-400" />{" "}
        <span className="ml-2">Chargement...</span>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-red-600 font-semibold text-lg">{error}</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-white flex flex-col items-center py-10">
      {/* RETOUR */}
      <div className="w-full max-w-3xl mb-6">
        <button
          onClick={() => navigate("/dashboard?section=datarooms")}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 font-bold text-sm mb-2 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour à mes Data Rooms
        </button>
      </div>

      <div className="w-full max-w-3xl bg-white border-2 border-teal-100 rounded-3xl shadow-2xl p-8 flex flex-col gap-8">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2">
          <div className="flex items-center gap-3">
            <FolderOpen className="w-9 h-9 text-teal-700" />
            <div>
              <div className="text-2xl font-extrabold text-teal-800">{room.name}</div>
              <div className="text-xs text-gray-400">
                Créée le {new Date(room.created_at).toLocaleDateString()} &middot;{" "}
                {files.length} fichier{files.length > 1 ? "s" : ""} &middot; {links.length} accès généré
                {links.length > 1 ? "s" : ""}
              </div>
            </div>
          </div>
          <button
            onClick={() => alert("Paramètres à venir")}
            className="flex items-center gap-1 text-gray-600 hover:text-teal-700 font-medium px-2 py-1 border rounded-lg"
            title="Paramètres"
          >
            <Settings className="w-4 h-4" /> Paramètres
          </button>
        </div>

        {/* DESCRIPTION */}
        <div className="bg-teal-50 border-l-4 border-teal-400 px-4 py-2 rounded text-teal-800 flex items-center gap-2">
          <Info className="w-5 h-5 text-teal-500" />
          <span>{fakeDescription}</span>
        </div>

        {/* ZONE DRAG & DROP */}
        <div
          className={`w-full flex flex-col items-center justify-center border-2 rounded-2xl border-dashed p-8 transition-all duration-200 bg-white text-center
            ${dragActive ? "border-teal-600 bg-teal-50" : "border-teal-200 bg-white"}
            ${uploading ? "opacity-50 pointer-events-none" : ""}
          `}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            const files = e.dataTransfer.files;
            if (files && files.length > 0) {
              await handleUpload(files[0]);
            }
          }}
          onClick={handleZoneClick}
          style={{ cursor: uploading ? "not-allowed" : "pointer" }}
        >
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleSelectFile}
            disabled={uploading}
          />
          <UploadCloud
            className={`w-12 h-12 mx-auto mb-2 ${
              dragActive ? "text-teal-700" : "text-teal-300"
            }`}
          />
          <div className="text-lg font-semibold text-teal-700 mb-1">
            {uploading ? "Téléversement en cours..." : "Glissez-déposez vos fichiers ici"}
          </div>
          <div className="text-gray-400 text-sm mb-2">
            ou cliquez pour sélectionner un fichier
          </div>
          <button
            className="px-5 py-2 rounded-xl bg-teal-600 text-white font-semibold shadow hover:bg-teal-700 transition"
            onClick={(e) => {
              e.stopPropagation();
              handleZoneClick();
            }}
            disabled={uploading}
          >
            Sélectionner un fichier
          </button>
        </div>

        {/* FICHIERS */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-teal-800 flex items-center gap-1">
            <FileText className="w-5 h-5" /> Fichiers de la Data Room
          </h2>
          {files.length === 0 ? (
            <div className="text-gray-400 py-6 text-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
              Aucun fichier pour l’instant.
            </div>
          ) : (
            <ul className="space-y-2">
              {files.map((file) => (
                <li
                  key={file.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100 shadow"
                >
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-teal-700" />
                    <span className="font-mono text-teal-800">{file.name}</span>
                    <span className="ml-2 text-xs text-gray-500">
                      {file.url?.split(".").pop()?.toUpperCase() || "FICHIER"}
                    </span>
                    <span className="ml-2 text-xs text-gray-400">
                      {file.uploaded_at
                        ? new Date(file.uploaded_at).toLocaleDateString()
                        : ""}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-gray-200 text-teal-700 hover:bg-teal-200 font-semibold"
                      onClick={() => alert("Prévisualisation à venir")}
                      title="Prévisualiser"
                    >
                      <Eye className="w-4 h-4" /> Voir
                    </button>
                    <button
                      className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-red-100 text-red-600 hover:bg-red-200 font-semibold"
                      onClick={() => handleDeleteFile(file)}
                      title="Supprimer"
                      disabled={uploading} // optionnel, bloque pendant suppression
                    >
                      <Trash2 className="w-4 h-4" /> Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* LIENS D’ACCÈS */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-blue-800 flex items-center gap-1">
            <Link className="w-5 h-5" /> Liens d’accès générés
          </h2>
          {links.length === 0 ? (
            <div className="text-gray-400 py-4 text-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
              Aucun accès généré pour cette data room.
            </div>
          ) : (
            <ul className="space-y-2">
              {links.map((l) => (
                <li
                  key={l.id}
                  className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2 border border-gray-100"
                >
                  <div className="flex flex-col">
                    <span className="text-teal-700 text-sm">{l.email}</span>
                    <span className="text-xs text-gray-500">
                      Expire :{" "}
                      {l.expires_at
                        ? new Date(l.expires_at).toLocaleDateString()
                        : "jamais"}{" "}
                      — Usage : {l.usage_limit ?? "illimité"}
                    </span>
                  </div>
                  <button
                    className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 font-semibold"
                    onClick={() =>
                      navigator.clipboard.writeText(
                        window.location.origin + "/access/" + l.token
                      )
                    }
                    title="Copier le lien"
                  >
                    <Link className="w-4 h-4" /> Copier
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* HISTORIQUE */}
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-700 flex items-center gap-1">
            <User2 className="w-5 h-5" /> Derniers accès à cette Data Room
          </h2>
          {logs.length === 0 ? (
            <div className="text-gray-400 py-4 text-center rounded-lg border border-dashed border-gray-200 bg-gray-50">
              Aucun accès enregistré pour le moment.
            </div>
          ) : (
            <ul className="space-y-1">
              {logs.map((log) => (
                <li key={log.id} className="flex items-center gap-2 text-sm">
                  <span className="text-teal-700">{log.user_email}</span>
                  <span className="text-gray-500">
                    {log.accessed_at ? new Date(log.accessed_at).toLocaleString() : ""}
                  </span>
                  {log.ip_address && (
                    <span className="text-xs text-gray-400">({log.ip_address})</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="text-xs text-gray-400 mt-8">
        Page Data Room – propriétaire · Sécurité et partage sans téléchargement.
      </div>
    </div>
  );
};

export default DataRoomPage;
