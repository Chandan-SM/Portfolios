"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FormProps } from "../types";
import { AlertCircle, CheckCircle, Palette, Star } from "lucide-react"; // Icons

const templates = [
  { id: "modern", name: "Modern", preview: "/templates/modern.png", rating: 4.9, description: "Sleek animations & bold visuals" },
  { id: "classic", name: "Classic", preview: "/templates/classic.png", rating: 4.7, description: "Timeless & professional" },
  { id: "minimal", name: "Minimal", preview: "/templates/minimal.png", rating: 4.8, description: "Clean focus on content" },
  { id: "dark", name: "Dark", preview: "/templates/Dark.png", rating: 4.7, description: "Timeless & professional" },
];

// Motion variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const templateCardVariants = {
  hover: { 
    scale: 1.05, 
    y: -5,
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    transition: { duration: 0.3 }
  },
  tap: { scale: 0.98 }
};

export default function TemplateSelector({ formData, setFormData }: FormProps) {
  const validate = () => {
    if (!formData.template) return "Select a template to proceed.";
    return null;
  };

  return (
    <motion.div 
      className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-md"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-3 mb-4">
        <Palette className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Choose a Template</h2>
      </div>

      <p className="text-gray-600 mb-6">Pick a style that fits your vibe. You can change it later!</p>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={cardVariants}
      >
        {templates.map((tpl, i) => (
          <motion.div
            key={tpl.id}
            className={`relative overflow-hidden rounded-lg border-2 transition-all cursor-pointer group ${
              formData.template === tpl.id 
                ? "border-purple-500 bg-purple-50/20 shadow-lg" 
                : "border-white/20 hover:border-purple-300"
            }`}
            onClick={() => setFormData({ ...formData, template: tpl.id })}
            variants={templateCardVariants}
            whileHover="hover"
            whileTap="tap"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            {/* Preview Image */}
            <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <Image 
                src={tpl.preview} 
                alt={tpl.name}
                width={200}
                height={120}
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Selected Overlay */}
              {formData.template === tpl.id && (
                <motion.div 
                  className="absolute inset-0 bg-purple-500/20 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <CheckCircle className="w-12 h-12 text-purple-600" />
                </motion.div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-1">{tpl.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{tpl.description}</p>
              
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star 
                    key={j} 
                    className={`w-3 h-3 ${j < Math.floor(tpl.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">{tpl.rating}</span>
              </div>

              {formData.template === tpl.id && (
                <p className="text-xs text-purple-600 font-medium">Selected!</p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Validation */}
      {validate() && (
        <motion.p 
          className="text-red-400 text-sm flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AlertCircle className="w-4 h-4" />
          {validate()}
        </motion.p>
      )}
    </motion.div>
  );
}