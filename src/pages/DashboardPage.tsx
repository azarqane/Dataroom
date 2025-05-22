import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  Folder,
  FileText,
  Settings,
  LogOut,
  Menu,
  Plus,
  Loader2,
  FolderOpen
} from 'lucide-react';
import Logo from "../components/Logo";
import DataRoomList from "../components/dashboard/DataRoomList";
import CreateDataRoomModal from "../components/dashboard/CreateDataRoomModal";
import DeleteDataRoomModal from "../components/dashboard/DeleteDataRoomModal";
import GenerateAccessLinkModal from "../components/dashboard/GenerateAccessLinkModal";

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [lastAccessLink, setLastAccessLink] = useState<string | null>(null);
  const params = new URLSearchParams(location.search);
  const defaultSection = params.get('section') || 'dashboard';
  const [currentSection, setCurrentSection] = useState(defaultSection);
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const [datarooms, setDatarooms] = useState<any[]>([]);
  const [loadingDatarooms, setLoadingDatarooms] = useState(false);

  // Modal création Data Room
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);

  // Modal suppression Data Room
  const [deleteModal, setDeleteModal] = useState<{open: boolean, room?: any}>({open: false, room: undefined});
  const [confirmName, setConfirmName] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setLoadingUser(false);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!loadingUser && !user) {
      navigate('/auth');
    }
  }, [user, loadingUser, navigate]);

  const fetchDataRooms = async () => {
    if (!user) return;
    setLoadingDatarooms(true);
    const { data } = await supabase
      .from('datarooms')
      .select('*')
      .eq('owner', user.id);
    setDatarooms(data || []);
    setLoadingDatarooms(false);
  };

  useEffect(() => {
    fetchDataRooms();
    // eslint-disable-next-line
  }, [user]);

  // Déconnexion utilisateur
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  // --- Création Data Room ---
  const handleCreateDataRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setCreateError(null);
    if (!newRoomName.trim()) {
      setCreateError("Le nom de la Data Room est requis.");
      setCreating(false);
      return;
    }
    const { error } = await supabase
      .from('datarooms')
      .insert({
        name: newRoomName.trim(),
        owner: user.id
      });
    if (error) {
      setCreateError("Erreur lors de la création : " + error.message);
      setCreating(false);
      return;
    }
    setShowCreateModal(false);
    setNewRoomName('');
    setCreateError(null);
    setCreating(false);
    fetchDataRooms();
  };

  // --- Suppression Data Room ---
  const handleDeleteDataRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    setDeleteError(null);

    // DEBUG SESSION
    const { data: sessionData } = await supabase.auth.getSession();
    const userRole = sessionData.session ? "authenticated" : "anon";
    console.log("Rôle actuel :", userRole, sessionData.session);

    if (userRole === "anon") {
      setDeleteError("Vous n'êtes pas connecté (rôle 'anon'), suppression impossible.");
      setDeleteLoading(false);
      return;
    }

    if (!deleteModal.room) return;
    if (confirmName.trim() !== deleteModal.room.name) {
      setDeleteError("Le nom saisi ne correspond pas.");
      return;
    }
    setDeleteLoading(true);

    try {
      // 1. Récupère tous les fichiers de la data room
      const { data: files, error: filesError } = await supabase
        .from("files")
        .select("id, url")
        .eq("dataroom_id", deleteModal.room.id);
      if (filesError) throw filesError;

      let fileIds: string[] = [];
      if (files && files.length > 0) {
        fileIds = files.map((f: any) => f.id);

        // 2. Supprimer les logs d'accès liés à ces fichiers
        if (fileIds.length > 0) {
          const { error: logsDeleteError } = await supabase
            .from("access_logs")
            .delete()
            .in("file_id", fileIds);
          if (logsDeleteError) throw logsDeleteError;
        }

        // 3. Supprimer du storage
        const fileUrls = files.map((f: any) => f.url);
        const { error: storageError } = await supabase
          .storage
          .from("dataroom-files")
          .remove(fileUrls);
        if (storageError) console.warn("Erreur suppression storage:", storageError);
      }

      // 4. Supprimer les fichiers de la BDD
      const { error: filesDeleteError } = await supabase
        .from("files")
        .delete()
        .eq("dataroom_id", deleteModal.room.id);
      if (filesDeleteError) throw filesDeleteError;

      // 5. Supprimer tous les liens d'accès de la BDD (DEBUG)
      const { data: deletedLinks, error: linksDeleteError } = await supabase
        .from("access_links")
        .delete()
        .eq("dataroom_id", deleteModal.room.id);
      console.log(
        "Suppression access_links (dataroom_id =",
        deleteModal.room.id,
        ") =>",
        deletedLinks,
        linksDeleteError
      );
      if (linksDeleteError) throw linksDeleteError;

      // Vérifier qu'il ne reste plus de liens pour cette room
      const { data: linksAfterDelete } = await supabase
        .from("access_links")
        .select("*")
        .eq("dataroom_id", deleteModal.room.id);

      if (linksAfterDelete && linksAfterDelete.length > 0) {
        setDeleteError(
          "Impossible de supprimer la Data Room car il reste " +
            linksAfterDelete.length +
            " liens d'accès (policy RLS bloquée ou mauvais filtre)."
        );
        setDeleteLoading(false);
        return;
      }

      // 6. Enfin, supprimer la data room
      const { error: roomError } = await supabase
        .from("datarooms")
        .delete()
        .eq("id", deleteModal.room.id);
      if (roomError) throw roomError;

      setDeleteModal({ open: false, room: undefined });
      setConfirmName("");
      setDeleteError(null);
      fetchDataRooms();
    } catch (error: any) {
      setDeleteError("Erreur lors de la suppression : " + (error.message || error));
      console.error(error);
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar - now responsive */}
      <aside className="w-full md:w-64 bg-white shadow-lg">
        <div className="p-4 md:p-6 flex items-center justify-between md:justify-start">
          <Logo size={32} textSize="text-xl" />
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Mobile-friendly navigation */}
        <nav className={`${isOpen ? 'block' : 'hidden'} md:block mt-6`}>
          <ul className="space-y-1">
            <li>
              <button
                className={`flex items-center w-full px-4 md:px-6 py-3 text-sm font-medium transition-colors ${
                  currentSection === 'dashboard'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentSection('dashboard')}
              >
                <LayoutDashboard className="h-5 w-5 mr-3" />
                Tableau de bord
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full px-4 md:px-6 py-3 text-sm font-medium transition-colors ${
                  currentSection === 'datarooms'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentSection('datarooms')}
              >
                <Folder className="h-5 w-5 mr-3" />
                Mes Data Rooms
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full px-4 md:px-6 py-3 text-sm font-medium transition-colors ${
                  currentSection === 'files'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentSection('files')}
              >
                <FileText className="h-5 w-5 mr-3" />
                Fichiers
              </button>
            </li>
            <li>
              <button
                className={`flex items-center w-full px-4 md:px-6 py-3 text-sm font-medium transition-colors ${
                  currentSection === 'settings'
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setCurrentSection('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                Paramètres
              </button>
            </li>
          </ul>
          
          <div className="mt-8 px-4 md:px-6">
            <button
              className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Déconnexion
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content - now responsive */}
      <main className="flex-1 p-4 md:p-8 lg:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {currentSection === 'dashboard'
              ? 'Tableau de bord'
              : currentSection === 'datarooms'
              ? 'Mes Data Rooms'
              : currentSection === 'files'
              ? 'Mes Fichiers'
              : 'Paramètres'}
          </h1>
          
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg">
              {user?.user_metadata?.name
                ? user.user_metadata.name[0].toUpperCase()
                : user?.email
                ? user.email[0].toUpperCase()
                : 'U'}
            </div>
            <span className="text-sm font-medium text-gray-700 hidden sm:inline">
              {user?.user_metadata?.name || user?.email || "Mon Compte"}
            </span>
          </div>
        </div>

        {/* Dashboard Content - now responsive */}
        {currentSection === 'dashboard' && (
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold mb-4">
                Bienvenue, {user?.user_metadata?.name || user?.email} !
              </h2>
              <p className="text-gray-600">
                Commencez par créer une data room, déposer des fichiers ou gérer vos accès.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quick Stats Cards */}
              <div className="card">
                <h3 className="text-lg font-semibold mb-2">Data Rooms</h3>
                <p className="text-3xl font-bold text-teal-600">{datarooms.length}</p>
              </div>
            </div>
          </div>
        )}

        {/* Data Rooms Section - now responsive */}
        {currentSection === 'datarooms' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-semibold">Mes Data Rooms</h2>
              <button
                className="w-full sm:w-auto btn btn-primary"
                onClick={() => {
                  setShowCreateModal(true);
                  setNewRoomName('');
                  setCreateError(null);
                }}
              >
                <Plus className="w-5 h-5 mr-2" />
                Créer une Data Room
              </button>
            </div>

            {loadingDatarooms ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
              </div>
            ) : datarooms.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <FolderOpen className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">Aucune data room pour le moment.</p>
              </div>
            ) : (
              <DataRoomList
                datarooms={datarooms}
                onDelete={room => setDeleteModal({ open: true, room })}
                onGenerateLink={room => {
                  setSelectedRoom(room);
                  setShowLinkModal(true);
                  setLastAccessLink(null);
                }}
              />
            )}
          </div>
        )}

        {/* Files Section - now responsive */}
        {currentSection === 'files' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Gestion des Fichiers</h2>
              <p className="text-gray-600">
                À venir : affichage et gestion de vos fichiers.
              </p>
            </div>
          </div>
        )}

        {/* Settings Section - now responsive */}
        {currentSection === 'settings' && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-semibold mb-4">Paramètres du compte</h2>
              <p className="text-gray-600">
                Fonctionnalités de modification du profil et de gestion de la sécurité à venir.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      <CreateDataRoomModal
        isOpen={showCreateModal}
        loading={creating}
        error={createError}
        name={newRoomName}
        onClose={() => setShowCreateModal(false)}
        onChange={setNewRoomName}
        onSubmit={handleCreateDataRoom}
      />
      <DeleteDataRoomModal
        isOpen={deleteModal.open}
        room={deleteModal.room}
        loading={deleteLoading}
        error={deleteError}
        confirmName={confirmName}
        onClose={() => setDeleteModal({open: false, room: undefined})}
        onChange={setConfirmName}
        onSubmit={handleDeleteDataRoom}
      />
      <GenerateAccessLinkModal
        isOpen={showLinkModal}
        room={selectedRoom}
        onClose={() => {
          setShowLinkModal(false);
          setSelectedRoom(null);
        }}
        onCreated={link => setLastAccessLink(link)}
      />
    </div>
  );
};

export default DashboardPage;