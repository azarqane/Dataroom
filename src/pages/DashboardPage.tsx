import React from 'react';
import { Plus, FolderLock } from 'lucide-react';
import { Button } from '../components/Button';

interface DataRoom {
  id: string;
  name: string;
  createdAt: string;
  documentsCount: number;
  usersCount: number;
}

const mockDataRooms: DataRoom[] = [
  {
    id: '1',
    name: 'Projet Acquisition 2024',
    createdAt: '2024-02-20',
    documentsCount: 45,
    usersCount: 8
  },
  {
    id: '2',
    name: 'Due Diligence Client A',
    createdAt: '2024-02-15',
    documentsCount: 23,
    usersCount: 5
  },
  {
    id: '3',
    name: 'Contrats Fournisseurs',
    createdAt: '2024-02-10',
    documentsCount: 12,
    usersCount: 3
  }
];

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Mes Data Rooms</h1>
          <Button variant="primary" className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Nouvelle Data Room
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDataRooms.map((dataRoom) => (
            <div
              key={dataRoom.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center">
                    <FolderLock className="w-5 h-5 text-teal-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-semibold text-gray-900">{dataRoom.name}</h3>
                    <p className="text-sm text-gray-500">Créée le {dataRoom.createdAt}</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <div>
                  <p>{dataRoom.documentsCount} documents</p>
                  <p>{dataRoom.usersCount} utilisateurs</p>
                </div>
                <Button variant="outline" size="sm">
                  Ouvrir
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;