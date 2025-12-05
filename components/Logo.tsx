'use client'

import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: 'spring', 
        stiffness: 300,
        damping: 20,
        duration: 0.5
      }}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-primary-600 to-accent"
    >
      <span className="text-white font-bold text-xl">F</span>
    </motion.div>
  )
}