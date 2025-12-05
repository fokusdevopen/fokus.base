import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

// Mock audit log data
const auditLogs = [
  {
    id: '1',
    userId: 'user1',
    userName: 'Alex Johnson',
    action: 'CREATE',
    resourceType: 'ARTICLE',
    resourceId: 'article1',
    resourceName: 'API Documentation v2',
    timestamp: '2023-05-15T10:30:00Z',
  },
  {
    id: '2',
    userId: 'user2',
    userName: 'Sarah Miller',
    action: 'UPDATE',
    resourceType: 'ARTICLE',
    resourceId: 'article2',
    resourceName: 'Design System Guidelines',
    timestamp: '2023-05-15T14:45:00Z',
  },
  {
    id: '3',
    userId: 'user3',
    userName: 'Michael Chen',
    action: 'COMMENT',
    resourceType: 'ARTICLE',
    resourceId: 'article3',
    resourceName: 'Getting Started Guide',
    timestamp: '2023-05-16T09:15:00Z',
  },
  {
    id: '4',
    userId: 'user4',
    userName: 'Emma Wilson',
    action: 'PUBLISH',
    resourceType: 'ARTICLE',
    resourceId: 'article4',
    resourceName: 'Marketing Strategy 2026',
    timestamp: '2023-05-17T16:20:00Z',
  },
]

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  
  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check if user is admin
  if (session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // In a real application, you would fetch audit logs from a database
  // For this example, we'll return the mock data
  return NextResponse.json({ auditLogs })
}