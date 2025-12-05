'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import useSound from 'use-sound'

export default function Footer() {
  const { theme } = useTheme()
  const [status, setStatus] = useState('online')
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.25 })

  // Simulate status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(prev => prev === 'online' ? 'online' : 'online')
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6 md:order-2">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => playHover()}
              href="mailto:help@fokus.dev"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
            >
              Support: help@fokus.dev
            </motion.a>
            <div className="flex items-center">
              <span className="text-gray-500 dark:text-gray-400">Status:</span>
              <span className={`ml-1 ${status === 'online' ? 'text-green-500' : 'text-red-500'}`}>
                {status === 'online' ? '✅' : '❌'}
              </span>
              <span className="ml-1 text-gray-500 dark:text-gray-400">
                {status === 'online' ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0 md:order-1">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              &copy; 2025 FOKUS.BASE · v1.0.0 · Internal Use Only
            </p>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-1">
              Sponsored by: FOKUS.DEV Studio
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}