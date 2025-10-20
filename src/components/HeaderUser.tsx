// src/components/HeaderUser.tsx
'use client';

import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function HeaderUser() {
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    // Récupère le nom complet depuis localStorage
    const storedUserName = localStorage.getItem("userName");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleLogout = () => {
    // Supprime toutes les infos de session
    localStorage.removeItem("user");
    localStorage.removeItem("userName");
    localStorage.removeItem("token"); // si tu utilises un token
    router.replace("/"); // redirection vers la page d'accueil
  };

  return (
    <header className="w-full flex justify-end items-center p-4 bg-white shadow-md fixed top-0 left-0 z-50">
      <span className="mr-4 text-base font-medium text-gray-700">
        Bonjour, {userName || "Invité"}
      </span>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1 text-red-500 hover:text-red-600 transition"
      >
        <FiLogOut size={25} />
        Déconnexion
      </button>
    </header>
  );
}
