// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const { email, password, name, phone, address } = await req.json();

    // Vérifie que tous les champs sont remplis
    if (!email || !password || !name || !phone || !address) {
      return NextResponse.json({ error: "Tous les champs sont requis" }, { status: 400 });
    }

    // Vérifie la validité du numéro de téléphone : 9 chiffres, commence par 70,76,77,75,78
    const phoneRegex = /^(70|76|77|75|78)\d{7}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json({
        error: "Numéro invalide ! Il doit commencer par 70, 76, 77, 75 ou 78 et contenir 9 chiffres"
      }, { status: 400 });
    }

    const db = await connectToDatabase();

    // Vérifie si l'email ou le numéro existe déjà
    const [existing] = await db.query<RowDataPacket[]>(
      "SELECT email, phone FROM users WHERE email = ? OR phone = ?",
      [email, phone]
    );

    if (existing.length > 0) {
      const existUser = existing[0];
      if (existUser.email === email) {
        return NextResponse.json({ error: "Email déjà utilisé" }, { status: 400 });
      }
      if (existUser.phone === phone) {
        return NextResponse.json({ error: "Numéro de téléphone déjà utilisé" }, { status: 400 });
      }
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insère l’utilisateur
    await db.query(
      "INSERT INTO users (email, password, name, phone, address, createdAt) VALUES (?, ?, ?, ?, ?, NOW())",
      [email, hashedPassword, name, phone, address]
    );

    return NextResponse.json({ message: "Utilisateur créé avec succès" }, { status: 201 });
  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
