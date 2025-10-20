// src/components/Footer.tsx
import { FiMapPin, FiPhone, FiMail } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="bg-yellow-700 text-white py-6 mt-12">

      <div className="max-w-6xl mx-auto px-4 text-center space-y-4">

        {/* Ligne principale : infos école */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-sm">
          <span className="font-semibold text-lg">École Cité 2000</span>
          <span className="flex items-center gap-1 text-lg text-gray-100">
            <FiMapPin className="text-yellow-300" /> Mboro, Thies
          </span>
          <span className="flex items-center gap-1 text-gray-100 text-lg">
            <FiPhone className="text-yellow-300" /> +221 77 123 45 67
          </span>
          <span className="flex items-center gap-1 text-lg text-gray-100">
            <FiMail className="text-yellow-300" /> contact@ecoleconnect.com
          </span>
        </div>

        {/* Ligne secondaire : signature */}
        <div className="text-gray-200 text-lg border-t border-gray-400 pt-3 ">
          © 2025 — Développé par{" "}
          <span className="text-yellow-300 font-medium text-lg">Papa Mapatè Loum</span>
          
        </div>
      </div>
    </footer>
  );
}
