"use client"
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, FileText, Eye, Plus } from "lucide-react";
import { useState, useEffect } from "react";

interface Portfolio {
  id: number;
  name: string;
  template: string;
  updated: string;
  views: number;
}

interface Stats {
  portfolios: number;
  templates: number;
  visitors: number;
}

export default function DashboardPage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]); // Fixed: Explicit type annotation
  const [stats, setStats] = useState<Stats>({ portfolios: 0, templates: 0, visitors: 0 }); // Fixed: Explicit type for safety

  useEffect(() => {
    // Simulate API fetch
    setPortfolios([
      { id: 1, name: "My First Portfolio", template: "Modern", updated: "2024-01-15", views: 42 },
      { id: 2, name: "Project Showcase", template: "Classic", updated: "2024-01-10", views: 15 },
    ]);
    setStats({ portfolios: 2, templates: 5, visitors: 120 });
  }, []);

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.2 }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.02, 
      y: -5,
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  const emptyStateVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        stiffness: 300, 
        damping: 20 
      }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Welcome Header */}
      <motion.div 
        className="flex items-center justify-between"
        variants={statVariants}
      >
        <div>
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-2"
            whileHover={{ scale: 1.02 }}
          >
            Welcome back 👋
          </motion.h1>
          <p className="text-gray-600">Here’s your portfolio progress so far.</p>
        </div>
        {/* <motion.div 
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Last updated: {new Date().toLocaleDateString()}
        </motion.div> */}
      </motion.div>

      {/* Stats Section - Animated Cards */}
      <motion.section 
        className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {[
          { icon: FileText, label: "Portfolios", value: stats.portfolios, color: "from-blue-500 to-cyan-500" },
          { icon: LayoutDashboard, label: "Templates Tried", value: stats.templates, color: "from-purple-500 to-pink-500" },
          { icon: Eye, label: "Visitors", value: stats.visitors, color: "from-green-500 to-emerald-500" }
        ].map((stat, i) => (
          <motion.div 
            key={stat.label}
            className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20 hover:shadow-lg transition-all"
            variants={statVariants}
            custom={i}
            whileHover="hover"
            // variants={cardVariants}
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-8 h-8 bg-gradient-to-r ${stat.color} text-white p-2 rounded-lg`} />
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
            </div>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* Recent Portfolios - Dynamic List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <motion.h2 
            className="text-xl font-semibold text-gray-900 flex items-center gap-2"
            variants={statVariants}
          >
            <FileText className="w-5 h-5" />
            Your Portfolios
          </motion.h2>
          <Link href="/create-portfolio">
            <motion.button 
              className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Create New
            </motion.button>
          </Link>
        </div>

        <AnimatePresence mode="wait">
          {portfolios.length > 0 ? (
            <motion.div 
              className="space-y-4"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              {portfolios.map((portfolio, i) => (
                <motion.div 
                  key={portfolio.id}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/20 hover:shadow-lg transition-all flex justify-between items-center"
                  variants={cardVariants}
                  custom={i}
                  whileHover="hover"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{portfolio.name}</h3>
                      <p className="text-sm text-gray-600">Template: {portfolio.template} • Updated: {portfolio.updated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {portfolio.views}
                    </span>
                    <Link href={`/portfolio/${portfolio.id}`} className="text-purple-600 hover:text-purple-500">
                      View
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              className="text-center py-12 bg-white/50 backdrop-blur-sm rounded-xl border border-white/20"
              variants={emptyStateVariants}
              initial="hidden"
              animate="visible"
            >
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No portfolios yet</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first portfolio.</p>
              <Link href="/create-portfolio">
                <motion.button 
                  className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Create Your First Portfolio
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
}