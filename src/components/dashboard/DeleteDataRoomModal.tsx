import React from 'react';
import { ArrowLeft, Trash2 } from "lucide-react";

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl border-2 border-red-100 shadow-2xl w-full max-w-md relative">
        <div className="p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-3 left-3 bg-white/80 hover:bg-teal-100 text-teal-700 border border-teal-100 rounded-full p-2 shadow transition"
            title="Fermer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center mt-2 mb-6">
            <h3 className="text-lg font-bold text-red-700 text-center">
              Suppression irréversible
            </h3>
          </div>
          
          <p className="text-gray-700 mb-6">
            Êtes-vous sûr de vouloir supprimer la Data Room <b className="text-teal-700">{room.name}</b> ?
            <br/>
            <span className="text-sm text-gray-500">
              Cette opération est <b>définitive</b> et supprimera tous les fichiers associés.
            </span>
          </p>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              className="input"
              placeholder="Retapez le nom exact pour confirmer"
              value={confirmName}
              onChange={e => onChange(e.target.value)}
              disabled={loading}
            />
            
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-red-600 to-pink-500 text-white hover:from-red-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || confirmName.trim() !== room.name}
            >
              <Trash2 className="w-5 h-5 mr-2" />
              {loading ? "Suppression..." : "Supprimer définitivement"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteDataRoomModal;