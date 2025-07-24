import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export type UserRole = "admin" | "manager" | "user" | "viewer" | "initiator" | "counterparty" | "coach"

export interface ExtendedUser {
  id: string
  name: string
  email: string
  role: UserRole
  permissions: string[]
  image?: string
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: [
    "users.read",
    "users.write",
    "users.delete",
    "content.read",
    "content.write",
    "content.delete",
    "settings.read",
    "settings.write",
    "analytics.read",
    "reports.read",
    "admin.access",
  ],
  manager: ["users.read", "users.write", "content.read", "content.write", "analytics.read", "reports.read"],
  user: ["content.read", "content.write", "analytics.read"],
  viewer: ["content.read", "analytics.read"],
  initiator: ["sessions.create", "sessions.read", "profile.write", "content.read", "content.write"],
  counterparty: ["sessions.read", "sessions.respond", "profile.write", "content.read"],
  coach: ["sessions.read", "sessions.guide", "insights.create", "analytics.read", "reports.read"],
}

// Mock user database - replace with real database
const users: ExtendedUser[] = [
  {
    id: "1",
    email: "admin@alignsynch.com",
    name: "Admin User",
    role: "admin",
    permissions: ROLE_PERMISSIONS.admin,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    email: "manager@alignsynch.com",
    name: "Manager User",
    role: "manager",
    permissions: ROLE_PERMISSIONS.manager,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    email: "initiator@alignsynch.com",
    name: "Sarah Johnson",
    role: "initiator",
    permissions: ROLE_PERMISSIONS.initiator,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    email: "counterparty@alignsynch.com",
    name: "Michael Chen",
    role: "counterparty",
    permissions: ROLE_PERMISSIONS.counterparty,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    email: "coach@alignsynch.com",
    name: "Dr. Emily Rodriguez",
    role: "coach",
    permissions: ROLE_PERMISSIONS.coach,
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Quick login credentials for development
export const DEV_CREDENTIALS = {
  admin: { email: "admin@alignsynch.com", password: "password", name: "Admin User" },
  initiator: { email: "initiator@alignsynch.com", password: "password", name: "Sarah Johnson" },
  counterparty: { email: "counterparty@alignsynch.com", password: "password", name: "Michael Chen" },
  coach: { email: "coach@alignsynch.com", password: "password", name: "Dr. Emily Rodriguez" },
  manager: { email: "manager@alignsynch.com", password: "password", name: "Manager User" },
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Mock authentication - replace with real authentication
        const user = users.find((u) => u.email === credentials.email)
        if (user && credentials.password === "password") {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            permissions: user.permissions,
            image: user.image,
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.permissions = (user as any).permissions
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        ;(session.user as any).role = token.role as UserRole
        ;(session.user as any).permissions = token.permissions as string[]
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
}

// Permission checking utilities
export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission) || userPermissions.includes("admin.access")
}

export function hasAnyPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
  return (
    requiredPermissions.some((permission) => userPermissions.includes(permission)) ||
    userPermissions.includes("admin.access")
  )
}

export function hasAllPermissions(userPermissions: string[], requiredPermissions: string[]): boolean {
  return (
    requiredPermissions.every((permission) => userPermissions.includes(permission)) ||
    userPermissions.includes("admin.access")
  )
}

// Get user by email utility
export function getUserByEmail(email: string): ExtendedUser | undefined {
  return users.find((user) => user.email === email)
}

// Get user by role utility
export function getUsersByRole(role: UserRole): ExtendedUser[] {
  return users.filter((user) => user.role === role)
}
