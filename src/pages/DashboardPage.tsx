import React, { useState, useCallback } from 'react';
import { Shield, Search, Bell, User, Home, FileText, Users, Settings, LogOut, Upload, Eye, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import toast from 'react-hot-toast';

interface Document {
  id: string;
  name: string;
  size: number;
  uploadedAt: Date;
  views: number;
}

const DashboardPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setIsUploading(true);
    
    // Simuler un upload
    setTimeout(() => {
      const newDocs = acceptedFiles.map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        uploadedAt: new Date(),
        views: 0
      }));
      
      setDocuments(prev => [...newDocs, ...prev]);
      setIsUploading(false);
      toast.success(`${acceptedFiles.length} document(s) ajouté(s)`);
    }, 1500);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'video/*': ['.mp4', '.mov']
    }
  });

  const generateSecureLink = (docId: string) => {
    const link = `https://vault.neutvault.fr/view/${docId}`;
    navigator.clipboard.writeText(link);
    toast.success('Lien copié dans le presse-papier');
  };

  const deleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== docId));
    toast.success('Document supprimé');
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
            <h1 className="text-2xl font-bold text-gray-900">Documents sécurisés</h1>
          </div>

          {/* Upload zone */}
          <div 
            {...getRootProps()} 
            className={`mb-8 border-2 border-dashed rounded-xl p-8 text-center ${
              isDragActive ? 'border-teal-500 bg-teal-50' : 'border-gray-300 hover:border-teal-500'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">
              {isDragActive
                ? 'Déposez les fichiers ici...'
                : 'Glissez-déposez vos fichiers ici, ou cliquez pour sélectionner'}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              PDF, images et vidéos acceptés
            </p>
          </div>

          {/* Documents list */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="min-w-full divide-y divide-gray-200">
              <div className="bg-gray-50 px-6 py-3">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-4">Nom</div>
                  <div className="col-span-2">Taille</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-2">Vues</div>
                  <div className="col-span-2">Actions</div>
                </div>
              </div>

              <div className="divide-y divide-gray-200 bg-white">
                {documents.map((doc) => (
                  <div key={doc.id} className="px-6 py-4">
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-4 flex items-center">
                        <FileText className="h-5 w-5 text-gray-400 mr-3" />
                        <span className="text-gray-900">{doc.name}</span>
                      </div>
                      <div className="col-span-2 text-gray-500">
                        {(doc.size / 1024 / 1024).toFixed(1)} MB
                      </div>
                      <div className="col-span-2 text-gray-500">
                        {format(doc.uploadedAt, 'dd MMM yyyy', { locale: fr })}
                      </div>
                      <div className="col-span-2 text-gray-500">
                        {doc.views}
                      </div>
                      <div className="col-span-2 flex space-x-2">
                        <button
                          onClick={() => generateSecureLink(doc.id)}
                          className="p-2 text-gray-600 hover:text-teal-600 hover:bg-gray-100 rounded"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => deleteDocument(doc.id)}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {documents.length === 0 && (
                  <div className="px-6 py-8 text-center text-gray-500">
                    Aucun document pour le moment
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;