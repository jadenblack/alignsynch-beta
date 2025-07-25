import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const ROLE_PERMISSIONS = {
  admin: ["manage_users", "view_dashboard", "access_admin_panel"],
  moderator: ["view_dashboard", "moderate_content"],
  user: ["view_dashboard"],
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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // This is a simplified example for development.
        // In a real application, you would query your database here.
        const user = DEV_CREDENTIALS.find((u) => u.email === credentials?.email && u.password === credentials?.password)

        if (user) {
          return {
            id: user.email, // Use email as ID for simplicity
            name: user.name,
            email: user.email,
            role: user.role,
          }
        }
        return null
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role
      }
      return session
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export function hasPermission(userRole: string, requiredPermission: string): boolean {
  const permissions = ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS] || []
  return permissions.includes(requiredPermission)
}
