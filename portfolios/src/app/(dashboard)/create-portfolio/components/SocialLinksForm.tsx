"use client";

import { motion } from "framer-motion";
import { FormProps, SocialLinks } from "../types";
import { Github, Linkedin, Twitter, Link as LinkIcon, AlertCircle } from "lucide-react"; // Platform-specific icons

// Reuse variants
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

export default function SocialLinksForm({ formData, setFormData }: FormProps) {
  const updateSocial = (field: keyof SocialLinks, value: string) => {
    setFormData({
      ...formData,
      socials: { ...formData.socials, [field]: value },
    });
  };

  const validate = () => {
    const filled = Object.values(formData.socials).filter(link => link.trim()).length;
    if (filled === 0) return "Add at least one social link to connect with recruiters.";
    return null;
  };

  const socialFields = [
    { field: "github" as keyof SocialLinks, icon: Github, placeholder: "github.com/yourusername", label: "GitHub" },
    { field: "linkedin" as keyof SocialLinks, icon: Linkedin, placeholder: "linkedin.com/in/yourusername", label: "LinkedIn" },
    { field: "twitter" as keyof SocialLinks, icon: Twitter, placeholder: "twitter.com/yourusername", label: "Twitter/X" },
  ];

  return (
    <motion.div 
      className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-md"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-3 mb-4">
        <LinkIcon className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Social Links</h2>
      </div>

      <div className="space-y-4">
        {socialFields.map(({ field, icon: Icon, placeholder, label }) => (
          <motion.div key={field} className="space-y-2" variants={inputVariants}>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Icon className="w-4 h-4 text-purple-500" />
              {label}
            </label>
            <motion.input
              type="url"
              placeholder={placeholder}
              value={formData.socials[field]}
              onChange={(e) => updateSocial(field, e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
              whileFocus="focus"
              variants={inputVariants}
            />
          </motion.div>
        ))}
      </div>

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

      <p className="text-xs text-gray-500 text-center">
        Links will appear as icons on your portfolio. Use full URLs!
      </p>
    </motion.div>
  );
}
