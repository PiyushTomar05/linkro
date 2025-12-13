export default function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg">
        <button className="mb-2 text-gray-500" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
}
