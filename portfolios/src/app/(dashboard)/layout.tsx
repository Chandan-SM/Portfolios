"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Sparkles, FileText, Settings, LogOut } from "lucide-react";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Motion variants for navbar
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    }),
    hover: { 
      scale: 1.05, 
      x: 5,
      color: "#8b5cf6" // Purple accent
    }
  };
  
  // New function to handle logout logic
  const handleLogout = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevents the default form submission for a moment
    event.preventDefault();
    
    // Clear local storage
    localStorage.clear();

    // Submit the form
    event.currentTarget.closest('form')?.submit();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Navbar with Motion & Mobile Menu */}
      <motion.nav 
        className="flex justify-between items-center px-13 py-4 bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50"
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <motion.div 
          className="flex items-center gap-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent w-[20%]"
          whileHover={{ scale: 1.05 }}
        >
          <motion.div 
            className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 360 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Sparkles className="w-5 h-5 text-white" />
          </motion.div>
          Portfolio Maker
        </motion.div>

        {/* Desktop Links */}
        <motion.div 
          className="hidden md:flex items-center gap-6"
          variants={navVariants}
        >
          {[
            { href: "/dashboard", label: "Dashboard", icon: Sparkles },
            { href: "/templates", label: "Templates", icon: FileText },
            { href: "/settings", label: "Settings", icon: Settings }
          ].map((link, i) => (
            <motion.div key={link.href} custom={i}>
              <Link href={link.href}>
                <motion.div 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50 transition-colors"
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Logout & Mobile Toggle */}
        <div className="flex items-center gap-4 w-[20%] justify-end">
          <form action="/auth" method="post" className="hidden md:block">
            <motion.button 
              type="submit" 
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-500 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </form>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - Slide Down */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-white/20 md:hidden"
            >
              <div className="flex flex-col p-4 space-y-2">
                {[
                  { href: "/dashboard", label: "Dashboard", icon: Sparkles },
                  { href: "/templates", label: "Templates", icon: FileText },
                  { href: "/settings", label: "Settings", icon: Settings }
                ].map((link) => (
                  <Link 
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 hover:bg-purple-50"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                <form action="/auth" method="post">
                  <button 
                    type="submit" 
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full text-left text-red-600 hover:text-red-500 py-2 px-3 rounded-lg hover:bg-red-50"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Page Content - With subtle gradient overlay */}
      <main className="px-13 pt-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/50 to-transparent pointer-events-none"></div>
        {children}
      </main>
    </div>
  );
}
