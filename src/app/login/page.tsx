'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setVisible(true);
    setTimeout(() => setVisible(false), 4500);
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const identifier = (document.getElementById("identifier") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;

    if (!identifier || !password) {
      showMessage("Veuillez remplir tous les champs", "error");
      return;
    }

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // 🧠 Sauvegarde du nom et de l’utilisateur dans le localStorage
        localStorage.setItem("userName", data.user?.name || "Utilisateur");
        localStorage.setItem("user", JSON.stringify(data.user));

        showMessage("Connexion réussie !", "success");
        setTimeout(() => router.replace("/classe"), 1000);
      } else {
        showMessage(data.error || "Erreur serveur", "error");
      }
    } catch (err) {
      console.error(err);
      showMessage("Erreur serveur !", "error");
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 text-gray-800 relative">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md text-center space-y-6">
        <h1 className="text-3xl font-bold text-indigo-600">Connexion</h1>
        <p className="text-gray-500 text-sm">Email ou numéro pour continuer</p>

        <button
          onClick={() => router.push('/')}
          className="text-indigo-600 hover:underline text-sm mb-2"
        >
          ← Retour à l'accueil
        </button>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="identifier" className="block text-sm font-medium">Email ou numéro</label>
            <input
              id="identifier"
              type="text"
              placeholder="ex: exemple@ecole.fr ou 77XXXXXXX"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="block text-sm font-medium">Mot de passe</label>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-9 text-sm text-indigo-600 hover:underline"
            >
              {showPassword ? 'Masquer' : 'Afficher'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            Se connecter
          </button>
        </form>

        <p className="text-sm text-gray-500">
          Pas encore de compte ?{' '}
          <a href="/register" className="text-indigo-600 hover:underline">S'inscrire</a>
        </p>
      </div>

      {message && (
        <div
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md text-white
            ${message.type === "success" ? "bg-green-500" : "bg-red-500"}
            transition-all duration-500
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {message.text}
        </div>
      )}
    </main>
  );
}
