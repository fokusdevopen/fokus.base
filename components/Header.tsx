'use client'

import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import useSound from 'use-sound'

export default function Header() {
  const { data: session } = useSession()
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.25 })

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer"
              onMouseEnter={() => playHover()}
            >
              <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-accent h-10 w-10">
                <span className="text-lg font-bold text-white">F</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">FOKUS.BASE</span>
            </motion.div>
          </div>
          
          <div className="flex items-center">
            <nav className="hidden md:flex space-x-8">
              <motion.a
                whileHover={{ y: -2 }}
                onMouseEnter={() => playHover()}
                href="/dashboard"
                className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Dashboard
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                onMouseEnter={() => playHover()}
                href="/articles"
                className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Articles
              </motion.a>
              {session?.user?.role === 'ADMIN' && (
                <motion.a
                  whileHover={{ y: -2 }}
                  onMouseEnter={() => playHover()}
                  href="/admin"
                  className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Admin
                </motion.a>
              )}
            </nav>
            
            <div className="ml-4 flex items-center md:ml-6">
              <div className="relative ml-3">
                <div className="flex items-center space-x-3">
                  <div className="text-sm text-gray-900 dark:text-white">
                    <div className="font-medium">{session?.user?.name}</div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => playHover()}
                    onClick={() => signOut()}
                    className="flex text-sm rounded-full focus:outline-none"
                  >
                    <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-600 to-accent flex items-center justify-center">
                      <span className="text-white font-bold">
                        {session?.user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}