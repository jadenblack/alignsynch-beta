import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import type { NextAuthOptions } from "next-auth"

export const ROLE_PERMISSIONS = {
  admin: [
    "dashboard",
    "admin",
    "users",
    "settings",
    "quiz",
    "leaderboard",
    "categories",
    "insights",
    "focus-areas",
    "design-system",
    "design-showcase",
    "sitemap",
    "cicd",
  ],
  moderator: ["dashboard", "quiz", "leaderboard", "categories", "insights", "focus-areas"],
  user: ["dashboard", "quiz", "leaderboard", "categories"],
}

export const DEV_CREDENTIALS = {
  admin: { email: "admin@example.com", password: "password", role: "admin" },
  moderator: { email: "moderator@example.com", password: "password", role: "moderator" },
  user: { email: "user@example.com", password: "password", role: "user" },
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null
        }

        const { email, password } = credentials

        // In a real application, you would fetch user from a database
        // and verify the password. For this example, we use mock users.
        const mockUsers = Object.values(DEV_CREDENTIALS)
        const user = mockUsers.find((u) => u.email === email && u.password === password)

        if (user) {
          return { id: user.email, name: user.email, email: user.email, role: user.role }
        } else {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        ;(session.user as any).role = token.role
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)

export function hasPermission(userRole: string, requiredPermission: string): boolean {
  const permissions = (ROLE_PERMISSIONS as any)[userRole] || []
  return permissions.includes(requiredPermission)
}
