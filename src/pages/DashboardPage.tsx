import React, { useState } from 'react';
import { Shield, Search, Bell, User, FileText, Users, Settings, LogOut, Database, Plus, ChevronDown, BarChart2, Activity, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const DashboardPage = () => {
  const location = useLocation();
  const [currentSection, setCurrentSection] = useState('dashboard');

  const navigation = [
    { icon: Database, label: 'Dashboard', id: 'dashboard' },
    { icon: FileText, label: 'Data Rooms', id: 'datarooms' },
    { icon: Users, label: 'Utilisateurs', id: 'users' },
    { icon: Settings, label: 'Paramètres', id: 'settings' },
  ];

  const renderContent = () => {
    switch (currentSection) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Vue d'ensemble</h2>
              <button className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                Nouvelle Data Room
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Database className="h-6 w-6 text-teal-600" />
                  </div>
                  <span className="text-sm font-medium text-teal-600">+12.5%</span>
                </div>
                <h3 className="text-sm font-medium text-gray-500">Data Rooms actives</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">12</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>4 créées ce mois</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-blue-600">+8.1%</span>
                </div>
                <h3 className="text-sm font-medium text-gray-500">Utilisateurs</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">48</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>12 actifs aujourd'hui</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <span className="text-sm font-medium text-purple-600">+23.4%</span>
                </div>
                <h3 className="text-sm font-medium text-gray-500">Documents</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <Activity className="h-4 w-4 mr-1" />
                  <span>28 ajoutés cette semaine</span>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <BarChart2 className="h-6 w-6 text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-orange-600">+15.2%</span>
                </div>
                <h3 className="text-sm font-medium text-gray-500">Espace utilisé</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">2.4 GB</p>
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Activité récente</h3>
                    <button className="text-gray-500 hover:text-gray-700">
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-start">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Activity className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-medium text-gray-900">
                            Nouveau document ajouté dans "Projet Alpha"
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            Il y a 2 heures par John Doe
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Data Rooms récentes</h3>
                    <button className="text-gray-500 hover:text-gray-700">
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-teal-100 rounded-lg">
                            <Database className="h-4 w-4 text-teal-600" />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">Projet Alpha</p>
                            <p className="text-sm text-gray-500">23 documents</p>
                          </div>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>Il y a 2h</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'datarooms':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Data Rooms</h2>
              <button className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                Nouvelle Data Room
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Database className="h-6 w-6 text-teal-600" />
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      <ChevronDown className="h-5 w-5" />
                    </button>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Projet Alpha</h3>
                  <p className="text-sm text-gray-500 mt-1">23 documents • 5 utilisateurs</p>
                  <div className="mt-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((_, j) => (
                        <div key={j} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                          <User className="h-4 w-4 text-gray-600" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>Dernière activité il y a 2h</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'users':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Utilisateurs</h2>
              <button className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                <Plus className="h-5 w-5 mr-2" />
                Inviter un utilisateur
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rôle</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Rooms</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <tr key={i}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">John Doe</div>
                            <div className="text-sm text-gray-500">john@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          Administrateur
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        3 Data Rooms
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Actif
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-gray-500 hover:text-gray-700">
                          <ChevronDown className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Paramètres</h2>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Paramètres généraux</h3>
                <p className="mt-1 text-sm text-gray-500">Gérez les paramètres de base de votre compte</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nom de l'organisation</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                      defaultValue="Mon Organisation"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Fuseau horaire</label>
                    <select
                      className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
                    >
                      <option>Europe/Paris</option>
                      <option>Europe/London</option>
                      <option>America/New_York</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">Sécurité</h3>
                <p className="mt-1 text-sm text-gray-500">Gérez les paramètres de sécurité de votre compte</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Authentification à deux facteurs</h4>
                    <p className="text-sm text-gray-500 mt-1">Ajoutez une couche de sécurité supplémentaire</p>
                  </div>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Activer
                  </button>
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Sessions actives</h4>
                    <p className="text-sm text-gray-500 mt-1">Gérez vos appareils connectés</p>
                  </div>
                  <button className="text-teal-600 hover:text-teal-700 font-medium">
                    Voir les sessions
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-teal-600" />
            <span className="ml-3 text-xl font-bold text-gray-900">NeutVault</span>
          </div>
        </div>
        
        <nav className="mt-6">
          <div className="px-3 space-y-1">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${
                  currentSection === item.id
                    ? 'bg-teal-50 text-teal-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <button className="flex items-center px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full">
            <LogOut className="h-5 w-5 mr-3" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              
              <button className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-600" />
                </div>
                <span className="text-sm font-medium text-gray-700">John Doe</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;