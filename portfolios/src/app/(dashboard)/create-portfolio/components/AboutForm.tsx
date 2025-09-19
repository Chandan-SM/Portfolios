"use client";

import { motion } from "framer-motion";
import { FormProps } from "../types";
import { AlertCircle, Award, FileText } from "lucide-react"; // Icons for headline and about

// Motion variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const inputVariants = {
  focus: { 
    scale: 1.02, 
    borderColor: "#8b5cf6",
    boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
    transition: { duration: 0.2 }
  },
  rest: { 
    scale: 1, 
    borderColor: "#e5e7eb", // Default border color
    boxShadow: "none"
  }
};

export default function AboutForm({ formData, setFormData }: FormProps) {
  const validate = () => {
    if (!formData.headline.trim()) return "Headline is required.";
    if (!formData.about.trim()) return "About section is required.";
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
        <FileText className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">About Me</h2>
      </div>

      {/* Headline */}
      <motion.div className="space-y-2" variants={inputVariants}>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Award className="w-4 h-4 text-purple-500" />
          {`Headline (e.g., "Full Stack Developer | Passionate about AI")`}
        </label>
        <motion.input
          type="text"
          placeholder="Share your professional tagline..."
          value={formData.headline}
          onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
          whileFocus="focus"
          variants={inputVariants}
        />
        {formData.headline.length < 10 && formData.headline.length > 0 && (
          <p className="text-xs text-purple-500">Tip: Keep it under 100 characters for impact.</p>
        )}
      </motion.div>

      {/* About Bio */}
      <motion.div className="space-y-2" variants={inputVariants}>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <FileText className="w-4 h-4 text-purple-500" />
          About (Short bio)
        </label>
        <motion.textarea
          placeholder="Tell us about yourself: your journey, passions, and what makes you unique..."
          value={formData.about}
          onChange={(e) => setFormData({ ...formData, about: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all resize-vertical"
          rows={4}
          whileFocus="focus"
          variants={inputVariants}
        />
        <p className="text-xs text-gray-500">
          {formData.about.length}/500 characters • Be authentic!
        </p>
      </motion.div>

      {/* Optional: Validation hook for stepper */}
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