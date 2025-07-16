import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

// User roles and permissions
export type UserRole = "admin" | "manager" | "user" | "viewer"

export interface User {
  id: string
  email: string
  name: string
  role: UserRole
  permissions: string[]
  avatar?: string
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
  ],
  manager: ["users.read", "users.write", "content.read", "content.write", "analytics.read", "reports.read"],
  user: ["content.read", "content.write", "analytics.read"],
  viewer: ["content.read", "analytics.read"],
}

// Mock user database - replace with real database
const users: User[] = [
  {
    id: "1",
    email: "admin@alignsynch.com",
    name: "Admin User",
    role: "admin",
    permissions: ROLE_PERMISSIONS.admin,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    email: "manager@alignsynch.com",
    name: "Manager User",
    role: "manager",
    permissions: ROLE_PERMISSIONS.manager,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

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
        session.user.role = token.role as UserRole
        session.user.permissions = token.permissions as string[]
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
}

// Permission checking utilities
export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission)
}

export function hasAnyPermission(userPermissions: string[], requiredPermissions: string[]): boolean {
  return requiredPermissions.some((permission) => userPermissions.includes(permission))
}

export function hasAllPermissions(userPermissions: string[], requiredPermissions: string[]): boolean {
  return requiredPermissions.every((permission) => userPermissions.includes(permission))
}
