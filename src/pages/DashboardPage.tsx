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

const DashboardPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentSection, setCurrentSection] = useState('dashboard');
  const [user, setUser] = useState<any>(null);
  const [loadingUser, setLoadingUser] = useState(true);

  // Exemple : liste des datarooms de l'utilisateur connecté
  const [datarooms, setDatarooms] = useState<any[]>([]);
  const [loadingDatarooms, setLoadingDatarooms] = useState(false);

  // Récupérer l'utilisateur connecté
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user ?? null);
      setLoadingUser(false);
    };
    fetchUser();
  }, []);

  // Redirection si non connecté (après chargement)
  useEffect(() => {
    if (!loadingUser && !user) {
      navigate('/auth');
    }
  }, [user, loadingUser, navigate]);

  // Récupérer les datarooms de l'utilisateur connecté
  useEffect(() => {
    const fetchDataRooms = async () => {
      if (!user) return;
      setLoadingDatarooms(true);
      const { data, error } = await supabase
        .from('datarooms')
        .select('*')
        .eq('owner', user.id);
      setDatarooms(data || []);
      setLoadingDatarooms(false);
    };
    fetchDataRooms();
  }, [user]);

  // Gestion déconnexion
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
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
        {/* Header personnalisé */}
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

        {/* Sections dynamiques */}
        {currentSection === 'dashboard' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Bienvenue sur votre tableau de bord, {user?.user_metadata?.name || user?.email} !</h2>
            <p className="text-gray-600">Commencez par créer une data room, déposer des fichiers ou gérer vos accès.</p>
          </div>
        )}

        {currentSection === 'datarooms' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Mes Data Rooms</h2>
            {loadingDatarooms ? (
              <p>Chargement…</p>
            ) : datarooms.length === 0 ? (
              <p>Aucune data room pour le moment.</p>
            ) : (
              <ul>
                {datarooms.map((room: any) => (
                  <li key={room.id} className="p-4 mb-2 bg-white rounded shadow">
                    <span className="font-bold">{room.name}</span>
                    <span className="ml-3 text-xs text-gray-500">créée le {new Date(room.created_at).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {currentSection === 'files' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Gestion des Fichiers</h2>
            {/* Ici, tu pourras afficher/filtrer les fichiers liés à l'utilisateur */}
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
