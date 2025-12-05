'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import useSound from 'use-sound'

export default function VersionHistory({ versions }: { versions: any[] }) {
  const [selectedVersion, setSelectedVersion] = useState(0)
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.25 })

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
          Version History
        </h3>
      </div>
      <div className="flex">
        <div className="w-1/3 border-r border-gray-200 dark:border-gray-700">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {versions.map((version, index) => (
              <li key={version.id}>
                <motion.button
                  whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onMouseEnter={() => playHover()}
                  onClick={() => setSelectedVersion(index)}
                  className={`w-full text-left px-4 py-3 text-sm ${
                    selectedVersion === index
                      ? 'bg-primary-50 dark:bg-gray-700 border-l-4 border-primary-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        Version {versions.length - index}
                      </p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {version.author} · {version.date}
                      </p>
                    </div>
                    {version.isCurrent && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Current
                      </span>
                    )}
                  </div>
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-2/3">
          {versions[selectedVersion] && (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  Version {versions.length - selectedVersion}
                </h4>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => playHover()}
                    className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <svg className="-ml-1 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onMouseEnter={() => playHover()}
                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Restore
                  </motion.button>
                </div>
              </div>
              <div className="prose prose-primary dark:prose-invert max-w-none">
                <div 
                  className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-900"
                  dangerouslySetInnerHTML={{ __html: versions[selectedVersion].content }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}