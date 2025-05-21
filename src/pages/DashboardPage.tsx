import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import {
  LayoutDashboard,
  Folder,
  FileText,
  Settings,
  LogOut,
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
      setCreateError("Erreur lors de la création : " + error.message);
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
    if (!deleteModal.room) return;
    if (confirmName.trim() !== deleteModal.room.name) {
      setDeleteError("Le nom saisi ne correspond pas.");
      return;
    }
    setDeleteLoading(true);
    const { error } = await supabase
      .from('datarooms')
      .delete()
      .eq('id', deleteModal.room.id);
    setDeleteLoading(false);
    if (error) {
      setDeleteError("Erreur lors de la suppression : " + error.message);
      return;
    }
    setDeleteModal({open: false, room: undefined});
    setConfirmName('');
    setDeleteError(null);
    fetchDataRooms();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">

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


      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <Logo size={32} textSize="text-xl" />
        </div>
        <nav className="mt-8">
          <ul>
            <li>
              <button
                className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
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
                className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
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
                className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
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
                className={`flex items-center w-full px-6 py-3 text-sm font-medium ${
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
            <li className="mt-12">
              <button
                className="flex items-center w-full px-6 py-3 text-sm font-medium text-red-700 hover:bg-red-100"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 mr-3" />
                Déconnexion
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            {currentSection === 'dashboard'
              ? 'Tableau de bord'
              : currentSection === 'datarooms'
              ? 'Mes Data Rooms'
              : currentSection === 'files'
              ? 'Mes Fichiers'
              : 'Paramètres'}
          </h1>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white font-bold text-lg">
              {user?.user_metadata?.name
                ? user.user_metadata.name[0].toUpperCase()
                : user?.email
                ? user.email[0].toUpperCase()
                : 'U'}
            </div>
            <span className="text-sm font-medium text-gray-700">
              {user?.user_metadata?.name || user?.email || "Mon Compte"}
            </span>
          </div>
        </div>
        {currentSection === 'dashboard' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Bienvenue sur votre tableau de bord, {user?.user_metadata?.name || user?.email} !</h2>
            <p className="text-gray-600">Commencez par créer une data room, déposer des fichiers ou gérer vos accès.</p>
          </div>
        )}
        {currentSection === 'datarooms' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Mes Data Rooms</h2>
              <button
                className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 transition-all duration-150"
                onClick={() => {
                  setShowCreateModal(true);
                  setNewRoomName('');
                  setCreateError(null);
                }}
              >
                <span className="inline-flex items-center justify-center rounded-full bg-teal-700/30 w-6 h-6">
                  <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5"><path d="M10 5v10m5-5H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                </span>
                Créer une Data Room
              </button>
            </div>
            {loadingDatarooms ? (
              <p>Chargement…</p>
            ) : datarooms.length === 0 ? (
              <div className="text-gray-500">Aucune data room pour le moment.</div>
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
        {currentSection === 'files' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Gestion des Fichiers</h2>
            <p className="text-gray-600">À venir : affichage et gestion de vos fichiers.</p>
          </div>
        )}
        {currentSection === 'settings' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Paramètres du compte</h2>
            <p className="text-gray-600">Fonctionnalités de modification du profil et de gestion de la sécurité à venir.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
