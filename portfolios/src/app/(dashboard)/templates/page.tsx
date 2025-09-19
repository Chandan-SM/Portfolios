"use client"
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { FileText, Star } from "lucide-react";

export default function TemplatesPage() {
  const templates = [
    { id: "modern", name: "Modern", description: "Sleek, contemporary design with animations.", preview: "/templates/modern-preview.jpg", rating: 4.9 },
    { id: "classic", name: "Classic", description: "Timeless, professional layout.", preview: "/templates/classic-preview.jpg", rating: 4.7 },
    { id: "minimal", name: "Minimal", description: "Clean and simple, focus on content.", preview: "/templates/minimal-preview.jpg", rating: 4.8 },
    { id: "dark", name: "Dark Mode", description: "Elegant dark theme for modern portfolios.", preview: "/templates/dark-preview.jpg", rating: 4.6 },
    { id: "default", name: "Default", description: "Balanced, versatile template.", preview: "/templates/default-preview.jpg", rating: 4.5 },
    { id: "creative", name: "Creative", description: "Artistic with bold visuals.", preview: "/templates/creative-preview.jpg", rating: 4.9 },
  ];

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const templateVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.01, 
      y: -1,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div 
        className="flex items-center justify-between"
        variants={templateVariants}
      >
        <div>
          <motion.h1 
            className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <FileText className="w-8 h-8 text-purple-600" />
            Templates
          </motion.h1>
          <p className="text-gray-600">Browse and choose templates for your portfolio.</p>
        </div>
        {/* </motion.div> */}
        <motion.div 
          className="text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {templates.length} templates available
        </motion.div>
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
        variants={containerVariants}
      >
        {templates.map((template, i) => (
          <motion.div 
            key={template.id}
            className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-white/20 hover:shadow-xl transition-all group cursor-pointer"
            variants={templateVariants}
            custom={i}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            {/* Preview Image */}
            <div className="relative h-48 bg-gradient-to-br from-purple-50 to-cyan-50 overflow-hidden">
              <Image 
                src={template.preview} 
                alt={template.name}
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded-full text-xs">
                Preview
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{template.description}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star 
                    key={j} 
                    className={`w-4 h-4 ${j < Math.floor(template.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-gray-500 ml-1">{template.rating}</span>
              </div>

              <Link href={`/create-portfolio?template=${template.id}`}>
                <motion.button 
                  className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white py-2 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Select Template
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}