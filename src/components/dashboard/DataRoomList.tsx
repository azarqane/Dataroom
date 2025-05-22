```typescript
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
    <ul className="grid grid-cols-1 gap-4 sm:gap-6">
      {datarooms.map((room: any) => (
        <li
          key={room.id}
          className="group bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl hover:border-primary-100 transition-all duration-200 overflow-hidden"
        >
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg sm:text-xl text-primary-700 group-hover:text-primary-800 transition mb-1 truncate">
                  {room.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Créée le {new Date(room.created_at).toLocaleDateString()}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 sm:flex-nowrap">
                <button
                  onClick={() => onGenerateLink(room)}
                  className="btn btn-secondary flex-1 sm:flex-none text-sm whitespace-nowrap"
                  title="Générer un lien d'accès sécurisé"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 mr-1.5 flex-shrink-0">
                    <circle cx="15" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="5" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="15" cy="15" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M7.8 8.6l4.4-2.2M12.2 13.6l-4.4-2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="hidden sm:inline">Lien accès</span>
                </button>

                <button
                  onClick={() => onDelete(room)}
                  className="btn btn-danger flex-1 sm:flex-none text-sm whitespace-nowrap"
                  title="Supprimer la data room"
                >
                  <svg viewBox="0 0 20 20" fill="none" className="w-4 h-4 mr-1.5 flex-shrink-0">
                    <path d="M4 4l12 12m0-12L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <span className="hidden sm:inline">Supprimer</span>
                </button>

                <button
                  onClick={() => navigate(`/dataroom/${room.id}`)}
                  className="btn btn-primary flex-1 sm:flex-none text-sm whitespace-nowrap"
                  title="Ouvrir la Data Room"
                >
                  <FolderOpen className="w-4 h-4 mr-1.5 flex-shrink-0" />
                  <span className="hidden sm:inline">Ouvrir</span>
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
```