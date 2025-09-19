"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion and AnimatePresence
import { useRouter } from "next/navigation";
import { Sparkles, Mail, Lock, User } from "lucide-react"; // Added relevant icons

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
    } catch {
      setError("Server error. Please try again later.");
    }
  };

  // Framer Motion variants for creative animations
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 50 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      y: 0,
      transition: { 
        // type: "spring", 
        stiffness: 200, 
        damping: 20,
        duration: 0.6
      }
    }
  };

  const toggleVariants = {
    active: { 
      scale: 1.05, 
      backgroundColor: "#8b5cf6",
      color: "#ffffff",
      boxShadow: "0 5px 15px rgba(139, 92, 246, 0.4)"
    },
    inactive: { 
      scale: 1, 
      backgroundColor: "rgba(255,255,255,0.2)",
      color: "#d1d5db"
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.3 }
    }
  };

  const inputVariants = {
    focus: { 
      scale: 1.02, 
      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.3)",
      borderColor: "#8b5cf6",
      transition: { duration: 0.2 }
    },
    rest: { 
      scale: 1, 
      boxShadow: "none",
      borderColor: "rgba(255,255,255,0.2)"
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 10px 25px rgba(139, 92, 246, 0.4)",
      backgroundColor: "#7c3aed",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  const errorVariants = {
    hidden: { opacity: 0, x: -20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { 
        // type: "spring", 
        stiffness: 300,
        damping: 15 // Slight shake effect
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    // hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6 } // Fixed: Use string easing instead of array
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: [1, 1.2, 1],
      rotate: [0, 10, 0],
      transition: { 
        duration: 1, 
        repeat: Infinity, 
        // ease: "easeInOut" 
      }
    }
  };

  return (
    <motion.div 
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      {/* 🔮 Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x * 0.05 + "px",
            top: mousePosition.y * 0.05 + "px",
          }}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
        <motion.div 
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl"
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl"
          animate={{ 
            x: [0, 20, 0],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
        {/* Floating Particles for Creativity */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              opacity: [0.5, 1, 0.5],
              rotate: [0, 360, 0]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Glassmorphic Card with Illustration + Form - Spring Entrance */}
      <motion.div 
        className="relative z-10 flex flex-col md:flex-row w-[90%] max-w-4xl rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl border border-white/20 overflow-hidden"
        variants={cardVariants}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        
        {/* Illustration Section - Animated on Desktop */}
        <motion.div 
          className="hidden md:flex flex-col justify-center gap-3 items-center w-1/2 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-10"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div 
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              className="absolute inset-0 w-30 h-30 text-white opacity-20 blur-xl"
            >
              <Sparkles />
            </motion.div>
            <Sparkles className="w-30 h-30 text-white relative z-10" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-2xl font-bold text-white mt-6 text-center">
              Showcase Your Talent
            </h2>
            <p className="text-gray-300 text-center mt-2 text-sm leading-relaxed">
              Create, customize, and share your portfolio with recruiters in
              minutes.
            </p>
          </motion.div>
        </motion.div>

        {/* Form Section - Smooth Toggle with AnimatePresence */}
        <div className="flex-1 p-8 sm:p-12">
          {/* Tabs - Animated Toggle */}
          <motion.div 
            className="flex justify-center mb-8 space-x-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.button
              className={`px-6 py-2 rounded-full font-semibold transition relative overflow-hidden ${
                isLogin
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/20 text-gray-200 hover:bg-white/30"
              }`}
              onClick={() => setIsLogin(true)}
              variants={toggleVariants}
              animate={isLogin ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.span 
                animate={{ x: isLogin ? [0, -5, 0] : 0 }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                Login
              </motion.span>
            </motion.button>
            <motion.button
              className={`px-6 py-2 rounded-full font-semibold transition relative overflow-hidden ${
                !isLogin
                  ? "bg-purple-600 text-white shadow-lg"
                  : "bg-white/20 text-gray-200 hover:bg-white/30"
              }`}
              onClick={() => setIsLogin(false)}
              variants={toggleVariants}
              animate={!isLogin ? "active" : "inactive"}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <motion.span 
                animate={{ x: !isLogin ? [0, -5, 0] : 0 }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                Register
              </motion.span>
            </motion.button>
          </motion.div>

          <motion.h1 
            className="text-2xl font-bold text-white text-center mb-6"
            key={isLogin ? "login" : "register"} // Key to re-animate on toggle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {isLogin ? "Welcome Back" : "Join Us Today"}
          </motion.h1>

          <AnimatePresence mode="wait">
            <motion.form 
              key={isLogin ? "login" : "register"}
              onSubmit={handleSubmit} 
              className="flex flex-col gap-4"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Name Input (Register Only) */}
              {!isLogin && (
                <motion.div variants={inputVariants}>
                  <div className="flex items-center mb-2">
                    <User className="w-4 h-4 mr-2 text-purple-400" />
                    <label className="text-sm font-medium text-gray-300">Your Name</label>
                  </div>
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 pl-10 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    whileFocus="focus"
                    variants={inputVariants}
                  />
                </motion.div>
              )}

              {/* Email Input */}
              <motion.div variants={inputVariants}>
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 mr-2 text-purple-400" />
                  <label className="text-sm font-medium text-gray-300">Email</label>
                </div>
                <motion.input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </motion.div>

              {/* Password Input */}
              <motion.div variants={inputVariants}>
                <div className="flex items-center mb-2">
                  <Lock className="w-4 h-4 mr-2 text-purple-400" />
                  <label className="text-sm font-medium text-gray-300">Password</label>
                </div>
                <motion.input
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pl-10 rounded-lg bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </motion.div>

              <motion.button
                type="submit"
                className="mt-4 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition relative overflow-hidden"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <motion.span 
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="mr-2"
                >
                  →
                </motion.span>
                {isLogin ? "Sign In" : "Sign Up"}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          {/* Error Message - Shake Animation */}
          <AnimatePresence>
            {error && (
              <motion.p 
                className="text-red-400 text-sm mt-4 text-center"
                variants={errorVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, scale: 0.9 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}