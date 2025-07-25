"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { DEV_CREDENTIALS } from "@/lib/auth"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/dashboard") // Redirect to dashboard on successful login
    }
  }

  const handleQuickLogin = async (userEmail: string, userPassword: string) => {
    setError(null)
    setLoading(true)

    const result = await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    })

    setLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-sm text-red-500 text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {process.env.NODE_ENV !== "production" && (
            <div className="mt-6 space-y-2">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">Quick Login (Dev Only):</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {DEV_CREDENTIALS.map((user) => (
                  <Button
                    key={user.email}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin(user.email, user.password)}
                    disabled={loading}
                  >
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
