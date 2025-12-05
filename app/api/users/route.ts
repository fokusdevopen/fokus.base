import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

// Mock user data
const users = [
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex@company.com',
    role: 'ADMIN',
    status: 'Active',
    lastLogin: '2023-05-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Sarah Miller',
    email: 'sarah@company.com',
    role: 'EDITOR',
    status: 'Active',
    lastLogin: '2023-05-15T14:45:00Z',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael@company.com',
    role: 'VIEWER',
    status: 'Active',
    lastLogin: '2023-05-16T09:15:00Z',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@company.com',
    role: 'EDITOR',
    status: 'Inactive',
    lastLogin: '2023-05-10T16:20:00Z',
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
  
  // In a real application, you would fetch users from a database
  // For this example, we'll return the mock data
  return NextResponse.json({ users })
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  // Check if user is authenticated
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  
  // Check if user is admin
  if (session.user?.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }
  
  // In a real application, you would create a new user in the database
  // For this example, we'll just return a success message
  return NextResponse.json({ message: 'User created successfully' })
}