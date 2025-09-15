// app/api/portfolio/route.ts
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { pool } from "@/lib/db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

function verifyToken(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) return null;
  const token = authHeader.split(" ")[1];
  try {
    return jwt.verify(token, JWT_SECRET) as { id: number; email: string };
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const user = verifyToken(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const client = await pool.connect(); // Get a client from the pool

  try {
    await client.query("BEGIN"); // Start the transaction
    const body = await req.json();
    console.log("Incoming body:", body);

    const {
      name,
      username,
      email,
      profilePic,
      headline,
      about,
      experiences,
      education,
      projects,
      skills,
      socials,
      template,
    } = body;

    const result = await client.query(
      `INSERT INTO portfolio 
        (user_id, name, username, email, profile_pic, headline, about, experiences, education, projects, skills, socials, template)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       ON CONFLICT (user_id)
       DO UPDATE SET 
        name=$2,
        username=$3,
        email=$4,
        profile_pic=$5,
        headline=$6,
        about=$7,
        experiences=$8,
        education=$9,
        projects=$10,
        skills=$11,
        socials=$12,
        template=$13,
        updated_at=NOW()
       RETURNING *`,
      [
        user.id,
        name,
        username,
        email,
        profilePic,
        headline,
        about,
        JSON.stringify(experiences || []),
        JSON.stringify(education || []),
        JSON.stringify(projects || []),
        JSON.stringify(skills || []),
        JSON.stringify(socials || {}),
        template || "default",
      ]
    );

    await client.query("COMMIT"); // Commit the transaction
    console.log("Database insert/update successful. Returned row:", result.rows[0]);

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    await client.query("ROLLBACK"); // Rollback on error
    console.error("❌ Portfolio publish error:", error);
    return NextResponse.json(
      { error: "Failed to save portfolio", details: error },
      { status: 500 }
    );
  } finally {
    client.release(); // Release the client back to the pool
  }
}