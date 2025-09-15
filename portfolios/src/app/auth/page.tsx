"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Reuse landing page mouse-follow animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      } else {
        setIsLogin(true);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
      {/* 🔮 Animated Background like Landing Page */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.05 + "px",
            top: mousePosition.y * 0.05 + "px",
            transition: "all 0.3s ease-out",
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-bounce" />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
      </div>

      {/* Glassmorphic Card with Illustration + Form */}
      <div className="relative z-10 flex flex-col md:flex-row w-[90%] max-w-4xl rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden">
        
        {/* Illustration Section */}
        <div className="hidden md:flex flex-col justify-center gap-3 items-center w-1/2 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-10">
          <Sparkles className="w-30 h-30 text-white" />
          <div>
          <h2 className="text-2xl font-bold text-white mt-6 text-center">
            Showcase Your Talent
          </h2>
          <p className="text-gray-300 text-center mt-2 text-sm leading-relaxed">
            Create, customize, and share your portfolio with recruiters in
            minutes.
          </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 p-8 sm:p-12">
          {/* Tabs */}
          <div className="flex justify-center mb-8 space-x-4">
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${
                isLogin
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/20 text-gray-200 hover:bg-white/30"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 rounded-full font-semibold transition ${
                !isLogin
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/20 text-gray-200 hover:bg-white/30"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-6">
            {isLogin ? "Welcome Back" : "Join Us Today"}
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />

            <button
              type="submit"
              className="mt-4 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          {error && (
            <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
