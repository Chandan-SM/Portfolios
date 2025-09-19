"use client";

import { motion } from "framer-motion";
import { FormProps } from "../types";
import { User, AtSign, Mail, AlertCircle } from "lucide-react"; // Icons for fields

// Motion variants (same as AboutForm for consistency)
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
    borderColor: "#e5e7eb", // Default border color (gray-200)
    boxShadow: "none"
  }
};

export default function BasicInfoForm({ formData, setFormData }: FormProps) {
  const validate = () => {
    if (!formData.name.trim()) return "Full name is required.";
    if (!formData.email.trim() || !formData.email.includes("@")) return "Valid email is required.";
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
        <User className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
      </div>

      {/* Full Name */}
      <motion.div className="space-y-2" variants={inputVariants}>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <User className="w-4 h-4 text-purple-500" />
          Full Name *
        </label>
        <motion.input
          type="text"
          placeholder="e.g., John Doe"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
          whileFocus="focus"
          variants={inputVariants}
          required
        />
      </motion.div>

      {/* Username */}
      <motion.div className="space-y-2" variants={inputVariants}>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <AtSign className="w-4 h-4 text-purple-500" />
          Username (for URL, e.g., yoursite.com/johndoe)
        </label>
        <motion.input
          type="text"
          placeholder="e.g., johndoe"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
          whileFocus="focus"
          variants={inputVariants}
        />
        <p className="text-xs text-gray-500">Must be unique and lowercase.</p>
      </motion.div>

      {/* Email */}
      <motion.div className="space-y-2" variants={inputVariants}>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Mail className="w-4 h-4 text-purple-500" />
          Email *
        </label>
        <motion.input
          type="email"
          placeholder="e.g., john@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
          whileFocus="focus"
          variants={inputVariants}
          required
        />
      </motion.div>

      {/* Profile Pic */}
      <motion.div className="space-y-2" variants={inputVariants}>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          {`Profile Picture URL (optional)`}
        </label>
        <motion.input
          type="url"
          placeholder="e.g., https://example.com/profile.jpg"
          value={formData.profilePic}
          onChange={(e) => setFormData({ ...formData, profilePic: e.target.value })}
          className="w-full px-4 py-3 rounded-lg bg-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
          whileFocus="focus"
          variants={inputVariants}
        />
        <p className="text-xs text-gray-500">Use a professional headshot (square, 400x400px recommended).</p>
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