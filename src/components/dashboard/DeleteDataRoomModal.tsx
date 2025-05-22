import React from 'react';
import { ClipboardCopy, ArrowLeft, X, Trash2, Info, Settings as Gear } from "lucide-react";
interface DeleteDataRoomModalProps {
  isOpen: boolean;
  room?: any;
  loading: boolean;
  error: string | null;
  confirmName: string;
  onClose: () => void;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DeleteDataRoomModal: React.FC<DeleteDataRoomModalProps> = ({
  isOpen, room, loading, error, confirmName, onClose, onChange, onSubmit,
}) => {
  if (!isOpen || !room) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl border-2 border-red-100 shadow-2xl p-8 w-full max-w-md relative">
        <button
  onClick={onClose}
  className="absolute top-3 left-3 bg-white/80 hover:bg-teal-100 text-teal-700 border border-teal-100 rounded-full p-2 shadow transition"
  title="Fermer"
>
  <ArrowLeft className="w-6 h-6" />
</button>

        <div className="flex flex-col items-center mt-2 mb-2">
 
  <h3 className="text-lg font-bold mb-3 text-red-700 text-center" >
    Suppression irréversible
  </h3>
</div>
        <p className="mb-4 text-gray-700">
          Êtes-vous sûr de vouloir supprimer la Data Room <b className="text-teal-700">{room.name}</b> ?<br/>
          <span className="text-sm text-gray-500">Cette opération est <b>définitive</b> et supprimera tous les fichiers associés.</span>
        </p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mb-3"
            placeholder="Retapez le nom exact pour confirmer"
            value={confirmName}
            onChange={e => onChange(e.target.value)}
            disabled={loading}
          />
          {error && (
            <div className="text-red-600 text-sm mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-pink-500 text-white py-2 rounded-xl font-semibold shadow-md hover:from-red-700 hover:to-pink-600 focus:ring-2 focus:ring-red-500 transition-all duration-150"
            disabled={loading || confirmName.trim() !== room.name}
          >
             <Trash2 className="inline-block w-5 h-5 -mt-0.5" />
            {loading ? "Suppression..." : "Supprimer définitivement"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteDataRoomModal;
