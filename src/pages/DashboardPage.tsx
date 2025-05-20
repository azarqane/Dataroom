import React, { useState } from 'react';
import { Shield, Search, Bell, User, Home, FileText, Users, Settings, LogOut, Plus, Clock, Lock, X, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import ReactSlider from 'react-slider';

interface DataRoom {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  expiresAt: string;
  status: 'active' | 'expired';
  documentsCount: number;
  usersCount: number;
  securityLevel: number;
}

const DashboardPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [dataRooms] = useState<DataRoom[]>([
    {
      id: '1',
      name: 'Due Diligence Projet Alpha',
      description: 'Documents confidentiels pour la fusion avec Alpha Corp',
      createdAt: '2024-02-20',
      expiresAt: '2024-05-20',
      status: 'active',
      documentsCount: 45,
      usersCount: 12,
      securityLevel: 80
    },
    {
      id: '2',
      name: 'Audit Financier 2024',
      description: 'Documentation pour l\'audit annuel',
      createdAt: '2024-01-15',
      expiresAt: '2024-04-15',
      status: 'active',
      documentsCount: 28,
      usersCount: 8,
      securityLevel: 90
    }
  ]);

  const [newDataRoom, setNewDataRoom] = useState({
    name: '',
    description: '',
    expiresAt: new Date(),
    securityLevel: 75,
    watermark: true,
    preventDownload: true,
    preventPrinting: true,
    twoFactorAuth: true,
    accessType: { value: 'email', label: 'Email' },
    notificationFrequency: { value: 'daily', label: 'Quotidien' },
    autoDelete: false,
    maxViewsPerDocument: 0,
    customWatermark: '',
    allowScreenshots: false
  });

  const accessTypeOptions = [
    { value: 'email', label: 'Email' },
    { value: 'domain', label: 'Domaine' },
    { value: 'ip', label: 'Adresse IP' }
  ];

  const notificationOptions = [
    { value: 'realtime', label: 'Temps réel' },
    { value: 'daily', label: 'Quotidien' },
    { value: 'weekly', label: 'Hebdomadaire' }
  ];

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
              { icon: FileText, label: 'Data Rooms', href: '/dashboard/datarooms' },
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
                  placeholder="Rechercher une Data Room..."
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Mes Data Rooms</h1>
            <Button 
              variant="primary" 
              onClick={() => setShowCreateModal(true)}
              className="flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Créer une Data Room
            </Button>
          </div>

          {/* Data Rooms Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dataRooms.map((dataRoom) => (
              <div key={dataRoom.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{dataRoom.name}</h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    dataRoom.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {dataRoom.status === 'active' ? 'Active' : 'Expirée'}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{dataRoom.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    Expire le {new Date(dataRoom.expiresAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Lock className="h-4 w-4 mr-2" />
                    Niveau de sécurité: {dataRoom.securityLevel}%
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <FileText className="h-4 w-4 mr-2" />
                    {dataRoom.documentsCount} documents
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    {dataRoom.usersCount} utilisateurs
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-3">
                  <Button variant="primary" className="flex-1">
                    Accéder
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Paramètres
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Create Data Room Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Créer une nouvelle Data Room</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            
            <form className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom de la Data Room
                </label>
                <input
                  type="text"
                  value={newDataRoom.name}
                  onChange={(e) => setNewDataRoom({...newDataRoom, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Ex: Due Diligence Projet Alpha"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={newDataRoom.description}
                  onChange={(e) => setNewDataRoom({...newDataRoom, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={3}
                  placeholder="Description du projet et objectifs..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'expiration
                </label>
                <DatePicker
                  selected={newDataRoom.expiresAt}
                  onChange={(date: Date) => setNewDataRoom({...newDataRoom, expiresAt: date})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Sélectionnez une date"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Niveau de sécurité
                </label>
                <div className="px-2">
                  <ReactSlider
                    className="w-full h-4 pr-2 my-4"
                    thumbClassName="absolute w-4 h-4 cursor-grab bg-teal-600 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 -top-1"
                    trackClassName="h-2 bg-gray-200 rounded-full"
                    value={newDataRoom.securityLevel}
                    onChange={(value) => setNewDataRoom({...newDataRoom, securityLevel: value})}
                    min={0}
                    max={100}
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Standard</span>
                    <span>Élevé</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type d'accès
                </label>
                <Select
                  value={newDataRoom.accessType}
                  onChange={(option) => setNewDataRoom({...newDataRoom, accessType: option})}
                  options={accessTypeOptions}
                  className="w-full"
                  classNamePrefix="select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fréquence des notifications
                </label>
                <Select
                  value={newDataRoom.notificationFrequency}
                  onChange={(option) => setNewDataRoom({...newDataRoom, notificationFrequency: option})}
                  options={notificationOptions}
                  className="w-full"
                  classNamePrefix="select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filigrane personnalisé
                </label>
                <input
                  type="text"
                  value={newDataRoom.customWatermark}
                  onChange={(e) => setNewDataRoom({...newDataRoom, customWatermark: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Ex: CONFIDENTIEL - {user_email} - {date}"
                />
                <p className="mt-1 text-sm text-gray-500">
                  Variables disponibles: {'{user_email}'}, {'{date}'}, {'{time}'}, {'{ip_address}'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre maximum de vues par document
                </label>
                <input
                  type="number"
                  value={newDataRoom.maxViewsPerDocument}
                  onChange={(e) => setNewDataRoom({...newDataRoom, maxViewsPerDocument: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  min="0"
                  placeholder="0 = illimité"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Paramètres de sécurité avancés
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newDataRoom.watermark}
                      onChange={(e) => setNewDataRoom({...newDataRoom, watermark: e.target.checked})}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Filigrane dynamique sur les documents</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newDataRoom.preventDownload}
                      onChange={(e) => setNewDataRoom({...newDataRoom, preventDownload: e.target.checked})}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Empêcher le téléchargement</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newDataRoom.preventPrinting}
                      onChange={(e) => setNewDataRoom({...newDataRoom, preventPrinting: e.target.checked})}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Empêcher l'impression</span>
                  </label>
                  
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newDataRoom.twoFactorAuth}
                      onChange={(e) => setNewDataRoom({...newDataRoom, twoFactorAuth: e.target.checked})}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Authentification à deux facteurs requise</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newDataRoom.autoDelete}
                      onChange={(e) => setNewDataRoom({...newDataRoom, autoDelete: e.target.checked})}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Suppression automatique après expiration</span>
                  </label>

                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newDataRoom.allowScreenshots}
                      onChange={(e) => setNewDataRoom({...newDataRoom, allowScreenshots: e.target.checked})}
                      className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-600">Autoriser les captures d'écran</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Annuler
                </Button>
                <Button 
                  variant="primary"
                  onClick={(e) => {
                    e.preventDefault();
                    // Logique de création à implémenter
                    setShowCreateModal(false);
                  }}
                >
                  Créer la Data Room
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;