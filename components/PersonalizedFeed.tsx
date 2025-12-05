'use client'

import { motion } from 'framer-motion'
import useSound from 'use-sound'

export default function PersonalizedFeed() {
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.25 })

  // Mock data
  const articles = [
    {
      id: '1',
      title: 'API Documentation v2',
      excerpt: 'Complete reference for the latest API endpoints',
      author: 'Sarah Miller',
      createdAt: '2025-12-04',
      tags: ['api', 'documentation'],
      category: 'Engineering',
      readTime: '5 min read'
    },
    {
      id: '2',
      title: 'Design System Guidelines',
      excerpt: 'Principles and components for consistent UI design',
      author: 'Michael Chen',
      createdAt: '2025-12-03',
      tags: ['design', 'ui', 'guidelines'],
      category: 'Design',
      readTime: '8 min read'
    },
    {
      id: '3',
      title: 'Marketing Strategy 2026',
      excerpt: 'Our roadmap for the next fiscal year',
      author: 'Emma Wilson',
      createdAt: '2025-12-02',
      tags: ['marketing', 'strategy'],
      category: 'Marketing',
      readTime: '12 min read'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">For You</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Articles recommended based on your interests.</p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {articles.map((article) => (
            <li key={article.id}>
              <motion.div 
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                className="block hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
                          {article.category}
                        </span>
                        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                          {article.readTime}
                        </span>
                      </div>
                      <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white truncate">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {article.excerpt}
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary-600 to-accent flex items-center justify-center">
                            <span className="text-white text-xs font-bold">
                              {article.author.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-2">
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {article.author}
                          </p>
                        </div>
                        <div className="ml-2 flex space-x-1">
                          {article.tags.map((tag) => (
                            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0 flex">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onMouseEnter={() => playHover()}
                        className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                      >
                        Read
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}