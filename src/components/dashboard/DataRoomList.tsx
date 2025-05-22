import React from 'react';
import { FolderOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DataRoomListProps {
  datarooms: any[];
  onDelete: (room: any) => void;
  onGenerateLink: (room: any) => void;
}

const DataRoomList: React.FC<DataRoomListProps> = ({ datarooms, onDelete, onGenerateLink }) => {
  const navigate = useNavigate();

  return (
    <ul className="space-y-4">
      {datarooms.map((room: any) => (
        <li
          key={room.id}
          className="group bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-teal-100 transition-all duration-200"
        >
          <div className="p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-extrabold text-xl text-teal-700 group-hover:text-teal-900 transition mb-1">
                  {room.name}
                </div>
                <div className="text-xs text-gray-400">
                  Créée le {new Date(room.created_at).toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  className="btn btn-secondary flex-1 sm:flex-none text-sm"
                  onClick={() => onGenerateLink(room)}
                  title="Générer un lien d'accès sécurisé"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 mr-1.5">
                    <circle cx="15" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="5" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="15" cy="15" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7.8 8.6l4.4-2.2M12.2 13.6l-4.4-2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Lien accès
                </button>

                <button
                  className="btn bg-gradient-to-r from-red-600 to-pink-500 text-white hover:from-red-700 hover:to-pink-600 flex-1 sm:flex-none text-sm"
                  onClick={() => onDelete(room)}
                  title="Supprimer la data room"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 mr-1.5">
                    <path d="M4 4l12 12m0-12L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Supprimer
                </button>

                <button
                  className="btn btn-primary flex-1 sm:flex-none text-sm"
                  onClick={() => navigate(`/dataroom/${room.id}`)}
                  title="Ouvrir la Data Room"
                >
                  <FolderOpen className="w-4 h-4 mr-1.5" />
                  Ouvrir
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