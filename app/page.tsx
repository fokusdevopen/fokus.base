'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Home() {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"
      >
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-primary-600 to-accent h-16 w-16 mb-4">
              <span className="text-2xl font-bold text-white">F</span>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">FOKUS.BASE</p>
              <p className="text-sm text-gray-500">Internal Knowledge Base</p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            href="/login"
            className="rounded-full border border-solid border-transparent px-4 py-2 text-sm transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          >
            Login
          </a>
        </div>
      </motion.div>
    </main>
  )
}