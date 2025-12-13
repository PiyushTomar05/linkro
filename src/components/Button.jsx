export default function Button({ children, className = "", ...props }) {
  return (
    <button
      {...props}
      className={`bg-blue-600 text-white px-4 py-2 rounded ${className}`}
    >
      {children}
    </button>
  );
}
