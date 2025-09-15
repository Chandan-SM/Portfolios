import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET(
  request: Request,
  // Apply the fix here 👇
  { params: { username } }: { params: { username: string } }
) {

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    console.log("Fetching portfolio for username:", username);

    const result = await pool.query(
      "SELECT * FROM portfolio WHERE username = $1",
      [username]
    );

    console.log("Database query result:", result.rows);

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("❌ Portfolio fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio", details: error },
      { status: 500 }
    );
  }
};