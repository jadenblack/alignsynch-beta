import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

// Define user roles and their permissions
export const ROLE_PERMISSIONS = {
  admin: ["admin:full", "user:manage", "content:manage", "settings:manage", "deployment:monitor"],
  moderator: ["user:view", "content:manage"],
  user: ["content:view"],
} as const

export type UserRole = keyof typeof ROLE_PERMISSIONS

// Mock user data for development/testing
export const DEV_CREDENTIALS = [
  {
    email: "admin@example.com",
    password: "password",
    name: "Admin User",
    role: "admin" as UserRole,
  },
  {
    email: "moderator@example.com",
    password: "password",
    name: "Moderator User",
    role: "moderator" as UserRole,
  },
  {
    email: "user@example.com",
    password: "password",
    name: "Regular User",
    role: "user" as UserRole,
  },
]

// Helper function to check if a user has a specific permission
export function hasPermission(userRole: UserRole, requiredPermission: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole] || []
  return permissions.includes(requiredPermission) || permissions.includes("admin:full")
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data

          // In a real application, you would fetch user from a database
          // and verify the password (e.g., using bcrypt.compare)
          const user = DEV_CREDENTIALS.find((u) => u.email === email && u.password === password)

          if (user) {
            return {
              id: user.email, // Use email as ID for simplicity in mock
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
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id
        token.role = (user as any).role // Add role to token
      }
      return token
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole // Add role to session
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
})
