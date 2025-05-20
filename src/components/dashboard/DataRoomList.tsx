import React from 'react';

interface DataRoomListProps {
  datarooms: any[];
  onDelete: (room: any) => void;
}

export const DataRoomList: React.FC<DataRoomListProps> = ({ datarooms, onDelete }) => {
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
              className="flex items-center gap-1 px-4 py-1.5 rounded-lg font-semibold bg-red-50 text-red-700 border border-red-200 shadow-sm hover:bg-gradient-to-r hover:from-red-600 hover:to-pink-500 hover:text-white focus:ring-2 focus:ring-red-500 transition-all duration-150"
              onClick={() => onDelete(room)}
              title="Supprimer la data room"
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                <path d="M6 8h8m-8 0v6a2 2 0 002 2h4a2 2 0 002-2V8m-8 0V6a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Supprimer</span>
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default DataRoomList;
