'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import GraphView from '@/components/GraphView'
import { motion } from 'framer-motion'

export default function GraphPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    }
  })

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="py-6 h-[calc(100vh-4rem)]">
        <div className="h-full px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            <GraphView />
          </motion.div>
        </div>
      </main>
    </div>
  )
}