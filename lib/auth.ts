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

// Mock user database
const users: ExtendedUser[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@alignsynch.com",
    role: "admin",
    permissions: ["users.read", "users.write", "users.delete", "admin.access"],
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Relationship Initiator",
    email: "initiator@alignsynch.com",
    role: "initiator",
    permissions: ["sessions.create", "sessions.read", "profile.write"],
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Relationship Partner",
    email: "partner@alignsynch.com",
    role: "counterparty",
    permissions: ["sessions.read", "sessions.respond", "profile.write"],
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "Relationship Coach",
    email: "coach@alignsynch.com",
    role: "coach",
    permissions: ["sessions.read", "sessions.guide", "insights.create"],
    image: "/placeholder.svg?height=40&width=40",
  },
]

// Development credentials for quick login
export const DEV_CREDENTIALS = {
  admin: { email: "admin@alignsynch.com", password: "password" },
  initiator: { email: "initiator@alignsynch.com", password: "password" },
  counterparty: { email: "partner@alignsynch.com", password: "password" },
  coach: { email: "coach@alignsynch.com", password: "password" },
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

        // Find user by email
        const user = users.find((u) => u.email === credentials.email)

        if (!user) {
          return null
        }

        // Simple password check (in production, use proper hashing)
        if (credentials.password !== "password") {
          return null
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as ExtendedUser).role
        token.permissions = (user as ExtendedUser).permissions
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        ;(session.user as ExtendedUser).role = token.role as UserRole
        ;(session.user as ExtendedUser).permissions = token.permissions as string[]
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

export function hasPermission(userPermissions: string[], requiredPermission: string): boolean {
  return userPermissions.includes(requiredPermission) || userPermissions.includes("admin.access")
}
