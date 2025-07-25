"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEV_CREDENTIALS } from "@/lib/auth" // Import DEV_CREDENTIALS

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      setError(result.error)
    } else {
      // Redirect to dashboard or home page on successful login
      window.location.href = "/dashboard"
    }
    setLoading(false)
  }

  const handleQuickLogin = async (userEmail: string, userPassword: string) => {
    setLoading(true)
    setError(null)
    setEmail(userEmail)
    setPassword(userPassword)

    const result = await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    })

    if (result?.error) {
      setError(result.error)
    } else {
      window.location.href = "/dashboard"
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {process.env.NODE_ENV !== "production" && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3 text-center">Quick Login (Dev Only)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {DEV_CREDENTIALS.map((user) => (
                  <Button
                    key={user.email}
                    variant="secondary"
                    onClick={() => handleQuickLogin(user.email, user.password)}
                    disabled={loading}
                    className="flex flex-col h-auto py-2"
                  >
                    <span className="font-medium">{user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
                    <span className="text-xs opacity-80">{user.email}</span>
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
