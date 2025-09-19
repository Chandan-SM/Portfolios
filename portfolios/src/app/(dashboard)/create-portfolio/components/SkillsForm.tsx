"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormProps } from "../types";
import { Brain, Plus, X, BadgeCheck, AlertCircle } from "lucide-react"; // Icons

// Reuse variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, x: -10 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    x: 0,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95, 
    x: 10,
    transition: { duration: 0.2 }
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

const buttonVariants = {
  hover: { 
    scale: 1.02, 
    backgroundColor: "#7c3aed",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export default function SkillsForm({ formData, setFormData }: FormProps) {
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""],
    });
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...formData.skills];
    updated[index] = value;
    setFormData({ ...formData, skills: updated });
  };

  const removeSkill = (index: number) => {
    const updated = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updated });
  };

  const validate = () => {
    if (formData.skills.length === 0 || formData.skills.every(skill => !skill.trim())) return "Add at least 3-5 key skills.";
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
        <Brain className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
      </div>

      <AnimatePresence>
        <motion.div 
          className="flex flex-wrap gap-3"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          {formData.skills.map((skill, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 bg-white/5 backdrop-blur-sm rounded-lg px-3 py-2 border border-white/10 min-w-[200px]"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.input
                type="text"
                placeholder="e.g., React, Node.js"
                value={skill}
                onChange={(e) => updateSkill(i, e.target.value)}
                className="flex-1 px-2 py-1 bg-transparent text-black rounded-2xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
              <motion.button
                onClick={() => removeSkill(i)}
                className="text-red-500 hover:text-red-600 p-1 rounded transition-colors"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <X className="w-4 h-4" />
              </motion.button>
              {skill.trim() && (
                <BadgeCheck className="w-4 h-4 text-green-500 ml-auto" /> // Visual checkmark if filled
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Add Button */}
      <motion.button
        onClick={addSkill}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        animate={{ 
          scale: [1, 1.01, 1],
          transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Plus className="w-4 h-4" />
        Add Skill
      </motion.button>

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
        Pro tip: List 5-10 top skills. Use keywords from job descriptions!
      </p>
    </motion.div>
  );
}