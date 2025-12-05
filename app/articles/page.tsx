'use client'

import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import TagSelector from '@/components/TagSelector'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function Articles() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/login')
    }
  })

  const [selectedTags, setSelectedTags] = useState<string[]>([])
  
  // Mock data for articles
  const articles = [
    {
      id: '1',
      title: 'Getting Started with FOKUS.BASE',
      excerpt: 'Learn how to use the knowledge base effectively',
      author: 'Alex Johnson',
      createdAt: '2025-12-01',
      tags: ['getting-started', 'tutorial'],
      category: 'Documentation'
    },
    {
      id: '2',
      title: 'API Documentation v2',
      excerpt: 'Complete reference for the latest API endpoints',
      author: 'Sarah Miller',
      createdAt: '2025-11-28',
      tags: ['api', 'documentation'],
      category: 'Engineering'
    },
    {
      id: '3',
      title: 'Design System Guidelines',
      excerpt: 'Principles and components for consistent UI design',
      author: 'Michael Chen',
      createdAt: '2025-11-25',
      tags: ['design', 'ui', 'guidelines'],
      category: 'Design'
    }
  ]

  // Mock data for tags
  const allTags = ['getting-started', 'tutorial', 'api', 'documentation', 'design', 'ui', 'guidelines', 'engineering', 'marketing']

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Knowledge Base
                </h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">
                  {articles.length} articles available
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href="/articles/create"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  New Article
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <SearchBar />
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">Filter by:</span>
                <select className="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                  <option>All Categories</option>
                  <option>Engineering</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>Documentation</option>
                </select>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-3">Filter by Tags</h2>
            <TagSelector 
              tags={allTags} 
              selectedTags={selectedTags} 
              onTagSelect={handleTagSelect} 
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {articles.map((article) => (
              <motion.div
                key={article.id}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="px-4 py-5 sm:px-6">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {article.createdAt}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-medium text-gray-900 dark:text-white">
                    <a href={`/articles/${article.id}`} className="hover:text-primary-600 dark:hover:text-primary-400">
                      {article.title}
                    </a>
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {article.excerpt}
                  </p>
                </div>
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-600 to-accent flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {article.author.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {article.author}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      {article.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                          {tag}
                        </span>
                      ))}
                      {article.tags.length > 2 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                          +{article.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}