'use client'

import { motion } from 'framer-motion'
import useSound from 'use-sound'

export default function RecentActivity() {
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.25 })

  // Mock data
  const activities = [
    {
      id: 1,
      user: 'Alex Johnson',
      action: 'created',
      object: 'API Documentation v2',
      time: '2 hours ago',
      type: 'article'
    },
    {
      id: 2,
      user: 'Sarah Miller',
      action: 'updated',
      object: 'Design System Guidelines',
      time: '4 hours ago',
      type: 'article'
    },
    {
      id: 3,
      user: 'Michael Chen',
      action: 'commented on',
      object: 'Getting Started Guide',
      time: '1 day ago',
      type: 'comment'
    },
    {
      id: 4,
      user: 'Emma Wilson',
      action: 'published',
      object: 'Marketing Strategy 2026',
      time: '2 days ago',
      type: 'article'
    }
  ]

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Recent Activity</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">Latest updates from your team.</p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {activities.map((activity) => (
            <li key={activity.id}>
              <motion.div 
                whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.02)' }}
                className="block hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-600 to-accent flex items-center justify-center">
                          <span className="text-white text-sm font-bold">
                            {activity.user.charAt(0)}
                          </span>
                        </div>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {activity.user}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {activity.action} <span className="font-medium">{activity.object}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      {activity.time}
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