'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import VersionHistory from '@/components/VersionHistory'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ArticlePage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    }
  })

  // Mock data for article
  const article = {
    id: params.id,
    title: 'Getting Started with FOKUS.BASE',
    content: '<p>Welcome to FOKUS.BASE, our internal knowledge base. This guide will help you get started with using the platform effectively.</p><p>FOKUS.BASE allows you to create, edit, and organize articles with version control and collaboration features.</p>',
    author: 'Alex Johnson',
    createdAt: '2025-12-01',
    updatedAt: '2025-12-05',
    tags: ['getting-started', 'tutorial'],
    category: 'Documentation',
    versions: [
      {
        id: '1',
        content: '<p>Welcome to FOKUS.BASE, our internal knowledge base. This guide will help you get started with using the platform effectively.</p><p>FOKUS.BASE allows you to create, edit, and organize articles with version control and collaboration features.</p>',
        author: 'Alex Johnson',
        date: '2025-12-05',
        isCurrent: true
      },
      {
        id: '2',
        content: '<p>Welcome to FOKUS.BASE, our internal knowledge base. This guide will help you get started with using the platform.</p>',
        author: 'Alex Johnson',
        date: '2025-12-01',
        isCurrent: false
      }
    ]
  }

  const [isEditing, setIsEditing] = useState(false)

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
      <main className="py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <div className="flex items-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
                    {article.category}
                  </span>
                  <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                    Last updated {article.updatedAt}
                  </span>
                </div>
                <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                  {article.title}
                </h1>
                <div className="mt-4 flex items-center">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-600 to-accent flex items-center justify-center">
                      <span className="text-white font-bold">
                        {article.author.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {article.author}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Published {article.createdAt}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <svg className="-ml-1 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    {isEditing ? 'Cancel' : 'Edit'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg className="-ml-1 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Share
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="prose prose-primary dark:prose-invert max-w-none"
          >
            <div 
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tags</h2>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8"
          >
            <VersionHistory versions={article.versions} />
          </motion.div>
        </div>
      </main>
    </div>
  )
}