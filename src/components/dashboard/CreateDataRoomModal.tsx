import React from 'react';

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
      <div className="bg-white rounded-xl border-2 border-teal-100 shadow-2xl w-full max-w-sm relative">
        <div className="p-6 sm:p-8">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg hover:bg-teal-700 transition"
            title="Fermer"
          >
            Fermer
          </button>

          <h3 className="text-lg font-bold mb-6 text-gray-900 pr-20">
            Créer une nouvelle Data Room
          </h3>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="text"
              className="input"
              placeholder="Nom de la Data Room"
              value={name}
              onChange={e => onChange(e.target.value)}
              disabled={loading}
            />
            
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            
            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                <path d="M10 5v10m5-5H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              {loading ? "Création en cours..." : "Créer"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateDataRoomModal;