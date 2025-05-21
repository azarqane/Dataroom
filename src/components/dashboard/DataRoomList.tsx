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
          className="group p-5 bg-white rounded-2xl shadow-lg flex items-center justify-between border border-gray-100 hover:shadow-xl hover:border-teal-100 transition-all duration-200"
        >
          <div>
            <div className="font-extrabold text-xl text-teal-700 group-hover:text-teal-900 transition">{room.name}</div>
            <div className="text-xs text-gray-400 mt-1">
              Créée le {new Date(room.created_at).toLocaleDateString()}
            </div>
          </div>
          <div className="flex items-center gap-2">
<button
  className="
    relative overflow-hidden flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold
    bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md
    hover:from-blue-600 hover:to-blue-800
    focus:ring-2 focus:ring-blue-500 transition-all duration-150
    before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1/2
    before:bg-gradient-to-b before:from-white/20 before:to-transparent
  "
  onClick={() => onGenerateLink(room)}
  title="Générer un lien d'accès sécurisé"
>
<svg viewBox="0 0 20 20" fill="none" className="w-4 h-4">
  <circle cx="15" cy="5" r="3" stroke="currentColor" strokeWidth="2"/>
  <circle cx="5" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
  <circle cx="15" cy="15" r="3" stroke="currentColor" strokeWidth="2"/>
  <path d="M7.8 8.6l4.4-2.2M12.2 13.6l-4.4-2.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
</svg>

  <span>Lien accès</span>
</button>


            <button
  className="
    relative overflow-hidden flex items-center gap-1 px-4 py-1.5 rounded-lg font-semibold
    bg-gradient-to-r from-red-600 to-pink-500 text-white shadow-md
    hover:from-red-700 hover:to-pink-600
    focus:ring-2 focus:ring-red-500 transition-all duration-150
    before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1/2
    before:bg-gradient-to-b before:from-white/25 before:to-transparent
  "
  onClick={() => onDelete(room)}
  title="Supprimer la data room"
>
<svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
  <line x1="6" y1="6" x2="14" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  <line x1="14" y1="6" x2="6" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
</svg>

  <span>Supprimer</span>
</button>

            <button
  className="
    relative overflow-hidden flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold
    bg-gradient-to-r from-teal-500 to-teal-700 text-white shadow-md
    hover:from-teal-600 hover:to-teal-800
    focus:ring-2 focus:ring-teal-500 transition-all duration-150
    before:content-[''] before:absolute before:inset-x-0 before:top-0 before:h-1/2
    before:bg-gradient-to-b before:from-white/20 before:to-transparent
  "
  onClick={() => navigate(`/dataroom/${room.id}`)}
  title="Ouvrir la Data Room"
>
  <FolderOpen className="w-4 h-4 mr-1" />
  Ouvrir
</button>

          </div>
        </li>
      ))}
    </ul>
  );
};

export default DataRoomList;
