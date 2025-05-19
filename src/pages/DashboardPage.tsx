import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { LogOut, FolderPlus, Settings, Users } from 'lucide-react';
import { signOut } from '../lib/auth';

const DashboardPage = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const { error } = await signOut();
    if (!error) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">NeutVault</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{profile?.full_name || user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Mes Data Rooms</h2>
            <Button variant="primary">
              <FolderPlus className="h-4 w-4 mr-2" />
              Nouvelle Data Room
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder pour les data rooms */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Data Room Demo</h3>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-gray-600 mb-4">Une data room de démonstration pour découvrir les fonctionnalités.</p>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Users className="h-4 w-4 text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">3 membres</span>
                </div>
                <Button variant="text" size="sm">Ouvrir</Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;