```typescript
import React from 'react';
import { ArrowLeft, Trash2, AlertTriangle } from "lucide-react";

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
            className="absolute top-3 left-3 bg-white/80 hover:bg-primary-100 text-primary-700 border border-primary-100 rounded-full p-2 shadow transition"
            title="Retour"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center mt-2 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-red-600 text-center">
              Suppression irréversible
            </h3>
          </div>
          
          <div className="bg-red-50 rounded-lg p-4 mb-6">
            <p className="text-red-800">
              Êtes-vous sûr de vouloir supprimer la Data Room <b>"{room.name}"</b> ?
              <br/>
              <span className="text-sm opacity-75">
                Cette opération est <b>définitive</b> et supprimera tous les fichiers associés.
              </span>
            </p>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tapez le nom exact de la Data Room pour confirmer
              </label>
              <input
                type="text"
                className="input"
                placeholder={room.name}
                value={confirmName}
                onChange={e => onChange(e.target.value)}
                disabled={loading}
              />
            </div>
            
            {error && (
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-red-600 to-pink-500 text-white hover:from-red-700 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || confirmName.trim() !== room.name}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Suppression en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Trash2 className="w-5 h-5 mr-2" />
                  Supprimer définitivement
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DeleteDataRoomModal;
```