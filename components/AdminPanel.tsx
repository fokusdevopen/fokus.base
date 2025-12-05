'use client'
import BulkImportExport from '@/components/BulkImportExport'

import { useState } from 'react'
import { motion } from 'framer-motion'
import useSound from 'use-sound'

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('users')
  const [playHover] = useSound('/sounds/hover.mp3', { volume: 0.25 })

  // Mock data
  const users = [
    { id: '1', name: 'Alex Johnson', email: 'alex@company.com', role: 'ADMIN', status: 'Active' },
    { id: '2', name: 'Sarah Miller', email: 'sarah@company.com', role: 'EDITOR', status: 'Active' },
    { id: '3', name: 'Michael Chen', email: 'michael@company.com', role: 'VIEWER', status: 'Active' },
    { id: '4', name: 'Emma Wilson', email: 'emma@company.com', role: 'EDITOR', status: 'Inactive' },
  ]

  const auditLogs = [
    { id: '1', user: 'Alex Johnson', action: 'Created article', object: 'API Documentation v2', time: '2 hours ago' },
    { id: '2', user: 'Sarah Miller', action: 'Updated article', object: 'Design System Guidelines', time: '4 hours ago' },
    { id: '3', user: 'Michael Chen', action: 'Commented on', object: 'Getting Started Guide', time: '1 day ago' },
    { id: '4', user: 'Emma Wilson', action: 'Published article', object: 'Marketing Strategy 2026', time: '2 days ago' },
  ]

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex -mb-px">
          <motion.button
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => playHover()}
            onClick={() => setActiveTab('users')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Users
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => playHover()}
            onClick={() => setActiveTab('audit')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'audit'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Audit Log
          </motion.button>
          <motion.button
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => playHover()}
            onClick={() => setActiveTab('settings')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Settings
          </motion.button>
          &lt;motion.button
            whileHover={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
            whileTap={{ scale: 0.98 }}
            onMouseEnter={() => playHover()}
            onClick={() => setActiveTab('import')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'import'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Import/Export
          &lt;/motion.button>
        </nav>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        {activeTab === 'users' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">User Management</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => playHover()}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="-ml-0.5 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add User
              </motion.button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary-600 to-accent flex items-center justify-center">
                              <span className="text-white font-bold">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{user.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-100">
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                          {user.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          onMouseEnter={() => playHover()}
                          href="#"
                          className="text-primary-600 hover:text-primary-900 dark:text-primary-400 dark:hover:text-primary-300"
                        >
                          Edit
                        </motion.a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'audit' && (
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">Audit Log</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Action</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Object</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Time</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{log.user}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{log.action}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-white">{log.object}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {log.time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">System Settings</h3>
          &lt;motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onMouseEnter={() =&gt; playHover()}
            onClick={() =&gt; setActiveTab('import')}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === 'import'
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          &gt;
            Import/Export
          &lt;/motion.button&gt;
            <div className="space-y-6">
              <div>
                <label htmlFor="site-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Site Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="site-name"
                    id="site-name"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    defaultValue="FOKUS.BASE"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Admin Email
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="admin-email"
                    id="admin-email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    defaultValue="admin@company.com"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="maintenance-mode"
                  name="maintenance-mode"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="maintenance-mode" className="ml-2 block text-sm text-gray-900 dark:text-white">
                  Maintenance Mode
                </label>
              </div>
              
              <div className="flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => playHover()}
                  type="button"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Save
                </motion.button>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'import' && (
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white mb-4">Import/Export</h3>
            <BulkImportExport />
          </div>
        )}
      </div>
    </div>
  )
}