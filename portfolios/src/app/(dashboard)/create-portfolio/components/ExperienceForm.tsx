"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormProps, Experience } from "../types";
import { AlertCircle, Award, Briefcase, Building, Calendar, FileText, Plus, Trash2 } from "lucide-react"; // Icons

// Reuse variants from EducationForm for consistency
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    x: 20, 
    scale: 0.95,
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
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export default function ExperienceForm({ formData, setFormData }: FormProps) {
  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { company: "", role: "", duration: "", description: "" },
      ],
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const updated = [...formData.experiences];
    updated[index][field] = value;
    setFormData({ ...formData, experiences: updated });
  };

  const removeExperience = (index: number) => {
    const updated = formData.experiences.filter((_, i) => i !== index);
    setFormData({ ...formData, experiences: updated });
  };

  const validate = () => {
    if (formData.experiences.length === 0) return "Add at least one experience.";
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
        <Briefcase className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
      </div>

      <AnimatePresence>
        {formData.experiences.map((exp, i) => (
          <motion.div
            key={i}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 space-y-3"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Company */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Building className="w-4 h-4 text-purple-500" />
                Company
              </label>
              <motion.input
                type="text"
                placeholder="e.g., Google"
                value={exp.company}
                onChange={(e) => updateExperience(i, "company", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Role */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Award className="w-4 h-4 text-purple-500" />
                Role / Position
              </label>
              <motion.input
                type="text"
                placeholder="e.g., Senior Software Engineer"
                value={exp.role}
                onChange={(e) => updateExperience(i, "role", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Duration */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-purple-500" />
                Duration
              </label>
              <motion.input
                type="text"
                placeholder="e.g., September 2020 - Present"
                value={exp.duration}
                onChange={(e) => updateExperience(i, "duration", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Description */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-purple-500" />
                Description (achievements, responsibilities)
              </label>
              <motion.textarea
                placeholder="What did you do? Highlight key accomplishments..."
                value={exp.description}
                onChange={(e) => updateExperience(i, "description", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all resize-vertical"
                rows={3}
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Remove Button */}
            <motion.button
              onClick={() => removeExperience(i)}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Trash2 className="w-4 h-4" />
              Remove Experience
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Button */}
      <motion.button
        onClick={addExperience}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        animate={{ 
          scale: [1, 1.01, 1],
          transition: { duration: 1, repeat: Infinity }
        }}
      >
        <Plus className="w-4 h-4" />
        Add Experience
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
    </motion.div>
  );
}