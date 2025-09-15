"use client";

import { useState } from "react";

export default function TestDBPage() {
  const [log, setLog] = useState<string[]>([]);

  const runTest = async () => {
    const results: string[] = [];

    try {
      // 1. Register
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          password: "password123",
        }),
      });
      const regData = await registerRes.json();
      results.push("Register: " + JSON.stringify(regData));

      // 2. Login
      const loginRes = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
      });
      const loginData = await loginRes.json();
      results.push("Login: " + JSON.stringify(loginData));

      const token = loginData.token;

      // 3. Save portfolio
      const portfolioRes = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bio: "I am a test user.",
          skills: ["Next.js", "Postgres", "Node.js"],
          projects: [
            { title: "Test Project", desc: "Cool stuff", link: "https://example.com" },
          ],
          socials: { github: "testuser", linkedin: "testuser" },
        }),
      });
      const portfolioData = await portfolioRes.json();
      results.push("Save Portfolio: " + JSON.stringify(portfolioData));

      // 4. Fetch portfolio
      const getRes = await fetch("/api/portfolio", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const getData = await getRes.json();
      results.push("Get Portfolio: " + JSON.stringify(getData));
    } catch (err) {
      const message =
      err instanceof Error ? err.message : "Unknown database error";

      return (
        <div className="p-6 text-red-500">
            DB Error ❌ {message}
        </div>
      );
    }

    setLog(results);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">DB + API Test</h1>
      <button
        onClick={runTest}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Run Test
      </button>
      <div className="mt-4 space-y-2">
        {log.map((line, idx) => (
          <pre key={idx} className="bg-gray-900 text-green-400 p-2 rounded">
            {line}
          </pre>
        ))}
      </div>
    </div>
  );
}
