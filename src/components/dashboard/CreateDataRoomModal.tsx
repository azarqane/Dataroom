```typescript
import React from 'react';
import { X, Plus } from 'lucide-react';

interface CreateDataRoomModalProps {
  isOpen: boolean;
  loading: boolean;
  error: string | null;
  name: string;
  onClose: () => void;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const CreateDataRoomModal: React.FC<CreateDataRoomModalProps> = ({
  isOpen, loading, error, name, onClose, onChange, onSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl border-2 border-primary-100 shadow-2xl w-full max-w-md relative">
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">
              Créer une nouvelle Data Room
            </h3>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition"
              title="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="roomName" className="block text-sm font-medium text-gray-700 mb-1">
                Nom de la Data Room
              </label>
              <input
                id="roomName"
                type="text"
                className="input"
                placeholder="Ex: Projet Alpha 2024"
                value={name}
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
              className="btn btn-primary w-full"
              disabled={loading || !name.trim()}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Créer la Data Room
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDataRoomModal;
```