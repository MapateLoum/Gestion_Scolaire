import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "@/lib/db";
import { RowDataPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const { identifier, password } = await req.json(); // <-- identifier (email ou phone)

    if (!identifier || !password) {
      return NextResponse.json({ error: "Email/Numéro et mot de passe requis" }, { status: 400 });
    }

    const db = await connectToDatabase();

    // Cherche l'utilisateur par email ou téléphone
    const [rows] = await db.query<RowDataPacket[]>(
      "SELECT * FROM users WHERE email = ? OR phone = ?",
      [identifier, identifier]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Identifiant ou mot de passe incorrect" }, { status: 401 });
    }

    const user = rows[0];

    // Vérifie le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Identifiant ou mot de passe incorrect" }, { status: 401 });
    }

    // Supprime le mot de passe avant d’envoyer la réponse
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ message: "Connexion réussie", user: userWithoutPassword });

  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
