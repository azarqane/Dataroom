import React from 'react';
import { FolderOpen, Link as LinkIcon, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DataRoomListProps {
  datarooms: any[];
  onDelete: (room: any) => void;
  onGenerateLink: (room: any) => void;
}

const DataRoomList: React.FC<DataRoomListProps> = ({ datarooms, onDelete, onGenerateLink }) => {
  const navigate = useNavigate();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {datarooms.map((room: any) => (
        <li
          key={room.id}
          className="group bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100/50 hover:border-primary-100 transition-all duration-200"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary-700 transition-colors line-clamp-1">
                  {room.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Créée le {new Date(room.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-shrink-0 ml-4">
                <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                  <FolderOpen className="w-5 h-5 text-primary-600" />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-sm text-gray-500">Documents</div>
                <div className="text-lg font-semibold text-gray-900">0</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <div className="text-sm text-gray-500">Accès</div>
                <div className="text-lg font-semibold text-gray-900">0</div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => navigate(`/dataroom/${room.id}`)}
                className="btn w-full bg-primary-600 text-white hover:bg-primary-700 group-hover:shadow-md transition-all"
              >
                <FolderOpen className="w-4 h-4 mr-2" />
                Ouvrir
              </button>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onGenerateLink(room)}
                  className="btn flex-1 bg-secondary-600 text-white hover:bg-secondary-700"
                  title="Générer un lien d'accès"
                >
                  <LinkIcon className="w-4 h-4 mr-2" />
                  Lien d'accès
                </button>
                
                <button
                  onClick={() => onDelete(room)}
                  className="btn bg-red-100 text-red-600 hover:bg-red-200"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DataRoomList;