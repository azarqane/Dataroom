import React from 'react';

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
          className="absolute top-3 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold"
          title="Fermer"
        >
          ×
        </button>
        <h3 className="text-lg font-bold mb-3 text-red-700">
          Suppression irréversible
        </h3>
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
            <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
              <path d="M6 8h8m-8 0v6a2 2 0 002 2h4a2 2 0 002-2V8m-8 0V6a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {loading ? "Suppression..." : "Supprimer définitivement"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteDataRoomModal;
