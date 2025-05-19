import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, Building2, Settings, CreditCard, Activity, BarChart2 } from 'lucide-react';

const DashboardPage = () => {
  const { user, profile } = useAuth();

  if (!user || !profile || profile.role !== 'admin') {
    return <Navigate to="/auth" replace />;
  }

  const stats = [
    { name: 'Utilisateurs actifs', value: '1,234', change: '+12%', icon: <Users className="h-6 w-6" /> },
    { name: 'Data Rooms', value: '567', change: '+23%', icon: <Building2 className="h-6 w-6" /> },
    { name: 'Revenu mensuel', value: '€45,678', change: '+8%', icon: <CreditCard className="h-6 w-6" /> },
    { name: 'Taux de conversion', value: '3.2%', change: '+2%', icon: <Activity className="h-6 w-6" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Tableau de bord</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          {/* Stats */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="p-5">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white">
                          {stat.icon}
                        </div>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                            <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                              {stat.change}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <BarChart2 className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Croissance des utilisateurs
                        </dt>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4 h-48 bg-gray-50 rounded flex items-center justify-center">
                    <span className="text-gray-500">Graphique de croissance</span>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Activity className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Activité des Data Rooms
                        </dt>
                      </dl>
                    </div>
                  </div>
                  <div className="mt-4 h-48 bg-gray-50 rounded flex items-center justify-center">
                    <span className="text-gray-500">Graphique d'activité</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;