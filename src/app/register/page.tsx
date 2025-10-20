'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  // Affiche le message avec animation
  const showMessage = (text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setVisible(true);

    // Commence la disparition après 4.5s
    setTimeout(() => {
      setVisible(false);
    }, 4500);

    // Supprime complètement le message après 5s
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const fullName = (document.getElementById("fullName") as HTMLInputElement).value.trim();
    const email = (document.getElementById("email") as HTMLInputElement).value.trim();
    const phone = (document.getElementById("phone") as HTMLInputElement).value.trim();
    const address = (document.getElementById("address") as HTMLInputElement).value.trim();
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

    // Vérification mot de passe
    if (password !== confirmPassword) {
      showMessage("Les mots de passe ne correspondent pas !", "error");
      return;
    }

    // Validation téléphone : 9 chiffres et commence par 70, 76, 77, 75, 78
    const phoneRegex = /^(70|76|77|75|78)\d{7}$/;
    if (!phoneRegex.test(phone)) {
      showMessage("Numéro invalide ! Il doit commencer par 70, 76, 77, 75 ou 78 et contenir 9 chiffres.", "error");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          name: fullName, // <-- envoi du nom complet
          phone,
          address
        }),
      });

      const data = await res.json();

      if (res.ok) {
        showMessage(data.message || "Inscription réussie !", "success");
        setTimeout(() => router.push("/login"), 1000); // Redirection vers login
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
        <h1 className="text-3xl font-bold text-indigo-600">Créer un compte</h1>
        <p className="text-gray-500 text-sm">Remplissez les informations ci-dessous</p>

        <button
          onClick={() => router.push('/')}
          className="text-indigo-600 hover:underline text-sm mb-2"
        >
          ← Retour à l'accueil
        </button>

        <form className="space-y-4 text-left" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium">Nom complet</label>
            <input
              id="fullName"
              type="text"
              placeholder="Nom complet"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              placeholder="exemple@gmail.com"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium">Numéro de téléphone</label>
            <input
              id="phone"
              type="tel"
              placeholder="77XXXXXXX"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium">Adresse</label>
            <input
              id="address"
              type="text"
              placeholder="Dakar, Sénégal"
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

          <div className="relative">
            <label htmlFor="confirmPassword" className="block text-sm font-medium">Confirmer le mot de passe</label>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-9 text-sm text-indigo-600 hover:underline"
            >
              {showConfirmPassword ? 'Masquer' : 'Afficher'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition font-medium"
          >
            S'inscrire
          </button>
        </form>

        <p className="text-sm text-gray-500">
          Déjà un compte ?{' '}
          <a href="/login" className="text-indigo-600 hover:underline">Se connecter</a>
        </p>
      </div>

      {/* Message animé */}
      {message && (
        <div
          className={`fixed bottom-5 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded shadow-md text-white
            ${message.type === "success" ? "bg-green-500" : "bg-red-500"}
            transition-all duration-500
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
        >
          {message.text}
        </div>
      )}
    </main>
  );
}
