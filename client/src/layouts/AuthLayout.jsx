export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold text-center mb-6">Linkro</h1>
        {children}
      </div>
    </div>
  );
}
