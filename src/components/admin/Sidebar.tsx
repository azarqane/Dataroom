import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react';
import { signOut } from '../../lib/auth';

const Sidebar = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Tableau de bord', href: '/admin', icon: LayoutDashboard },
    { name: 'Utilisateurs', href: '/admin/users', icon: Users },
    { name: 'Data Rooms', href: '/admin/datarooms', icon: Building2 },
    { name: 'Facturation', href: '/admin/billing', icon: CreditCard },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
    { name: 'Support', href: '/admin/support', icon: HelpCircle },
  ];

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <img className="h-8 w-auto" src="/logo.svg" alt="NeutVault" />
          <span className="ml-2 text-xl font-bold text-gray-900">NeutVault</span>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`
                    group flex items-center px-2 py-2 text-sm font-medium rounded-md
                    ${location.pathname === item.href
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                  `}
                >
                  <Icon
                    className={`
                      mr-3 flex-shrink-0 h-6 w-6
                      ${location.pathname === item.href
                        ? 'text-teal-600'
                        : 'text-gray-400 group-hover:text-gray-500'}
                    `}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button
            onClick={handleSignOut}
            className="flex-shrink-0 w-full group block"
          >
            <div className="flex items-center">
              <div>
                <LogOut className="inline-block h-5 w-5 text-gray-400 group-hover:text-gray-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Déconnexion
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;