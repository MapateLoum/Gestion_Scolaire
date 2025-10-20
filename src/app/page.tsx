export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800">
      <div className="text-center space-y-6 p-6">
        <h1 className="text-5xl font-extrabold text-indigo-600 tracking-tight">
          Gestion des Notes
        </h1>

        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Bienvenue sur la plateforme de l'école Cité 2000. 
          Connectez-vous pour gérer les élèves, les matières et les notes.
        </p>

        <div className="space-x-4">
          <a
            href="/login"
            className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow hover:bg-indigo-700 transition"
          >
            Se connecter
          </a>
          <a
            href="/register"
            className="px-6 py-3 border border-indigo-600 text-indigo-600 font-medium rounded-xl hover:bg-indigo-50 transition"
          >
            S'inscrire
          </a>
        </div>
      </div>

      <footer className="absolute bottom-4 text-sm text-gray-500">
        © {new Date().getFullYear()} - Gestion des Notes by Papa Mapaté Loum
      </footer>
    </main>
  );
}
