"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DEV_CREDENTIALS } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/dashboard") // Redirect to dashboard on success
    }
  }

  const handleQuickLogin = async (userEmail: string, userPassword: string) => {
    setLoading(true)
    setError(null)

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
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
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
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {process.env.NODE_ENV !== "production" && (
            <div className="mt-6 border-t pt-4">
              <p className="text-center text-sm text-muted-foreground mb-3">Quick Login (Development Only)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {DEV_CREDENTIALS.map((user) => (
                  <Button
                    key={user.email}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin(user.email, user.password)}
                    disabled={loading}
                  >
                    Login as {user.role}
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
