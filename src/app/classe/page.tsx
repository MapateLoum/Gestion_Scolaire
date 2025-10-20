'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import HeaderUser from '@/components/HeaderUser';
import Footer from "@/components/Footer";

export default function ClasseSelectionPage() {
  const router = useRouter();

  const classes = ["CI", "CP", "CE1", "CE2", "CM1", "CM2"];
  const sections = ["a", "b"];

  // Vérifie si l'utilisateur est connecté
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      router.replace('/'); // redirige vers la page accueil si non connecté
    }
  }, [router]);

  const handleSelect = (classe: string, section: string) => {
    const classeSelected = `${classe}${section}`;
    router.push(`/classe/${classeSelected}`);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-br from-yellow-50 to-orange-100 text-gray-800 p-4">
      
      {/* Header avec nom et déconnexion */}
      <HeaderUser />

      <h1 className="text-4xl font-bold text-yellow-700 mb-8 text-center mt-20">
        Choisissez votre classe
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-3xl">
        {classes.map((classe) =>
          sections.map((section) => (
            <button
              key={`${classe}${section}`}
              onClick={() => handleSelect(classe, section)}
              className="bg-yellow-400 hover:bg-yellow-500 transition-all transform hover:scale-105 text-white font-semibold py-4 rounded-lg shadow-md flex items-center justify-center text-xl"
            >
              {classe}{section}
            </button>
          ))
        )}
      </div>

      <p className="mt-15 text-gray-600 text-lg font-bold text-center">
        Sélectionnez votre classe pour accéder aux informations et à la gestion des élèves.
      </p>
      
      <Footer />
    </main>
    
  );
  
     
}
