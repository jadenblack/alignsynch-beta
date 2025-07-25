"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEV_CREDENTIALS } from "@/lib/auth"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
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
      router.push("/dashboard")
    }
    setLoading(false)
  }

  const handleQuickLogin = async (role: keyof typeof DEV_CREDENTIALS) => {
    setLoading(true)
    setError(null)
    const user = DEV_CREDENTIALS[role]
    setEmail(user.email)
    setPassword(user.password)

    const result = await signIn("credentials", {
      redirect: false,
      email: user.email,
      password: user.password,
    })

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/dashboard")
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Sign In to AlignSynch</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-4">
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
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {process.env.NODE_ENV === "development" && (
            <div className="mt-6 border-t pt-4">
              <p className="text-center text-sm text-muted-foreground mb-3">Quick Login (Development)</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.keys(DEV_CREDENTIALS).map((role) => (
                  <Button
                    key={role}
                    variant="outline"
                    onClick={() => handleQuickLogin(role as keyof typeof DEV_CREDENTIALS)}
                    disabled={loading}
                    className="capitalize"
                  >
                    Login as {role}
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
