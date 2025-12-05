'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import useSound from 'use-sound'

export default function TagSelector({ 
  tags, 
  selectedTags, 
  onTagSelect 
}: {
  tags: string[]
  selectedTags: string[]
  onTagSelect: (tag: string) => void
}) {
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.25 })

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <motion.button
          key={tag}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => playHover()}
          onClick={() => onTagSelect(tag)}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            selectedTags.includes(tag)
              ? 'bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100'
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {tag}
        </motion.button>
      ))}
    </div>
  )
}