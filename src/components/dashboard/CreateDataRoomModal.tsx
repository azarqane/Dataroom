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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl border-2 border-teal-100 shadow-2xl p-8 w-full max-w-sm relative">
        <button
  onClick={onClose}
  className="absolute top-3 right-3 bg-teal-500 text-white px-5 py-2 rounded-full font-bold shadow-lg hover:bg-teal-700 transition"
  title="Fermer"
>
  Fermer
</button>

        <h3 className="text-lg font-bold mb-4 text-gray-900">Créer une nouvelle Data Room</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-teal-500 focus:border-teal-500 mb-3"
            placeholder="Nom de la Data Room"
            value={name}
            onChange={e => onChange(e.target.value)}
            disabled={loading}
          />
          {error && (
            <div className="text-red-600 text-sm mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="flex items-center justify-center gap-2 w-full bg-teal-600 text-white py-2 rounded-xl font-semibold shadow-md hover:bg-teal-700 focus:ring-2 focus:ring-teal-500 transition-all duration-150"
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
  );
};

export default CreateDataRoomModal;
