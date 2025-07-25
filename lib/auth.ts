import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { z } from "zod"
import type { DefaultSession } from "next-auth"

// Define user roles
export type UserRole = "admin" | "moderator" | "user"

// Mock user data for development/testing
export const DEV_CREDENTIALS = [
  {
    id: "admin-user",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    password: "password123", // In a real app, never store plain passwords
  },
  {
    id: "moderator-user",
    name: "Moderator User",
    email: "moderator@example.com",
    role: "moderator",
    password: "password123",
  },
  {
    id: "regular-user",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
    password: "password123",
  },
]

// Define permissions for each role
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: ["manage_users", "manage_settings", "view_admin_dashboard", "access_all_features"],
  moderator: ["moderate_content", "view_admin_dashboard", "access_some_features"],
  user: ["access_basic_features"],
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = DEV_CREDENTIALS.find((u) => u.email === email && u.password === password)

          if (user) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role // Add role to token
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).role = token.role // Add role to session user
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions)

// Helper function to check if a user has a specific permission
export function hasPermission(role: UserRole, permission: string): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) || false
}

// Extend the NextAuth types to include the 'role' property
declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
  }
}
