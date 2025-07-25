import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { z } from "zod"

export const ROLE_PERMISSIONS = {
  admin: [
    "dashboard",
    "admin",
    "users",
    "settings",
    "cicd",
    "sitemap",
    "design-system",
    "quiz",
    "leaderboard",
    "categories",
    "insights",
    "focus-areas",
    "profile",
  ],
  moderator: ["dashboard", "quiz", "leaderboard", "categories", "insights", "focus-areas", "profile"],
  user: ["dashboard", "quiz", "leaderboard", "profile"],
}

export const DEV_CREDENTIALS = [
  {
    email: "admin@example.com",
    password: "password",
    name: "Admin User",
    role: "admin",
  },
  {
    email: "moderator@example.com",
    password: "password",
    name: "Moderator User",
    role: "moderator",
  },
  {
    email: "user@example.com",
    password: "password",
    name: "Regular User",
    role: "user",
  },
]

export const authOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
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
              id: user.email, // Using email as ID for simplicity
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
    async jwt({ token, user }: { token: any; user: any }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token) {
        session.user.role = token.role
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authOptions)

export function hasPermission(userRole: string, requiredRole: string): boolean {
  const userPermissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || []
  const requiredPermissions = ROLE_PERMISSIONS[requiredRole as keyof typeof ROLE_PERMISSIONS] || []

  // A user has permission if their role's permissions include all required permissions
  return requiredPermissions.every((permission) => userPermissions.includes(permission))
}
