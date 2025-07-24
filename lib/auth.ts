import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "user" | "moderator"
}

export const DEV_CREDENTIALS = {
  admin: {
    email: "admin@alignsynch.com",
    password: "admin123",
    name: "Admin User",
    role: "admin" as const,
  },
  user: {
    email: "user@alignsynch.com",
    password: "user123",
    name: "Regular User",
    role: "user" as const,
  },
  moderator: {
    email: "mod@alignsynch.com",
    password: "mod123",
    name: "Moderator User",
    role: "moderator" as const,
  },
}

export const ROLE_PERMISSIONS = {
  admin: ["read", "write", "delete", "manage_users", "system_settings"],
  moderator: ["read", "write", "manage_content"],
  user: ["read", "write_own"],
}

export function hasPermission(userRole: string, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS]
  return permissions ? permissions.includes(permission) : false
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

        // Check against dev credentials
        const devUser = Object.values(DEV_CREDENTIALS).find(
          (user) => user.email === credentials.email && user.password === credentials.password,
        )

        if (devUser) {
          return {
            id: devUser.email,
            name: devUser.name,
            email: devUser.email,
            role: devUser.role,
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
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
}
