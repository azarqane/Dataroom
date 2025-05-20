import React from 'react';
import { Shield, Search, Bell, User, Home, FileText, Users, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
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
            {[
              { icon: Home, label: 'Accueil', href: '/dashboard' },
              { icon: FileText, label: 'Documents', href: '/dashboard/documents' },
              { icon: Users, label: 'Utilisateurs', href: '/dashboard/users' },
              { icon: Settings, label: 'Paramètres', href: '/dashboard/settings' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100"
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </Link>
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
        <header className="bg-white border-b border-gray-200">
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
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Documents totaux', value: '128' },
              { label: 'Utilisateurs actifs', value: '25' },
              { label: 'Espace utilisé', value: '4.2 GB' }
            ].map((stat) => (
              <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
                <div className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</div>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Activité récente</h2>
            <div className="space-y-4">
              {[
                { user: 'Alice Martin', action: 'a ajouté un document', time: 'Il y a 5 minutes' },
                { user: 'Bob Wilson', action: 'a modifié les permissions', time: 'Il y a 2 heures' },
                { user: 'Carol White', action: 'a supprimé un fichier', time: 'Il y a 4 heures' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;