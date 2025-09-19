"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormProps, Education } from "../types";
import { GraduationCap, School, Calendar, Trash2, Award, Plus, AlertCircle } from "lucide-react"; // Icons for fields and remove

// Motion variants
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
    backgroundColor: "#7c3aed",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export default function EducationForm({ formData, setFormData }: FormProps) {
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { school: "", degree: "", year: "" },
      ],
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const updated = [...formData.education];
    updated[index][field] = value;
    setFormData({ ...formData, education: updated });
  };

  const removeEducation = (index: number) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updated });
  };

  const validate = () => {
    if (formData.education.length === 0) return "Add at least one education entry.";
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
        <GraduationCap className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Education</h2>
      </div>

      <AnimatePresence>
        {formData.education.map((edu, i) => (
          <motion.div
            key={i}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 space-y-3"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* School */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <School className="w-4 h-4 text-purple-500" />
                School / University
              </label>
              <motion.input
                type="text"
                placeholder="e.g., Harvard University"
                value={edu.school}
                onChange={(e) => updateEducation(i, "school", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Degree */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Award className="w-4 h-4 text-purple-500" /> {/* Reuse or add specific icon */}
                Degree / Program
              </label>
              <motion.input
                type="text"
                placeholder="e.g., Bachelor's in Computer Science"
                value={edu.degree}
                onChange={(e) => updateEducation(i, "degree", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Year */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <Calendar className="w-4 h-4 text-purple-500" />
                Year (e.g., 2020 - 2024)
              </label>
              <motion.input
                type="text"
                placeholder="e.g., 2020 - 2024"
                value={edu.year}
                onChange={(e) => updateEducation(i, "year", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Remove Button */}
            <motion.button
              onClick={() => removeEducation(i)}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Trash2 className="w-4 h-4" />
              Remove Entry
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Button */}
      <motion.button
        onClick={addEducation}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        animate={{ 
          scale: [1, 1.01, 1],
          transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Plus className="w-4 h-4" /> {/* Add Plus icon */}
        Add Education Entry
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