import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "moderator" | "user"
  avatar?: string
}

export const ROLE_PERMISSIONS = {
  admin: ["read", "write", "delete", "manage_users", "manage_system"],
  moderator: ["read", "write", "delete", "manage_content"],
  user: ["read", "write"],
} as const

export const DEV_CREDENTIALS = {
  admin: { email: "admin@alignsynch.com", password: "admin123", name: "Admin User" },
  moderator: { email: "mod@alignsynch.com", password: "mod123", name: "Moderator User" },
  user: { email: "user@alignsynch.com", password: "user123", name: "Regular User" },
}

export function hasPermission(userRole: string, permission: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS]
  return permissions?.includes(permission as any) || false
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
        for (const [role, creds] of Object.entries(DEV_CREDENTIALS)) {
          if (credentials.email === creds.email && credentials.password === creds.password) {
            return {
              id: role,
              email: creds.email,
              name: creds.name,
              role: role as "admin" | "moderator" | "user",
            }
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as User).role = token.role as "admin" | "moderator" | "user"
        session.user.id = token.sub!
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
