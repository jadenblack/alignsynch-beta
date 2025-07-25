"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DEV_CREDENTIALS } from "@/lib/auth"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isSigningIn, setIsSigningIn] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsSigningIn(true)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setIsSigningIn(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/dashboard")
    }
  }

  const handleQuickLogin = async (userEmail: string, userPassword: string) => {
    setError(null)
    setIsSigningIn(true)

    const result = await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    })

    setIsSigningIn(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignIn} className="space-y-6">
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
            {error && <p className="text-sm text-red-500 dark:text-red-400">{error}</p>}
            <Button type="submit" className="w-full" disabled={isSigningIn}>
              {isSigningIn ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {process.env.NODE_ENV !== "production" && (
            <div className="mt-6 border-t pt-6 space-y-4">
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">Quick Login (Development Only)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {DEV_CREDENTIALS.map((user) => (
                  <Button
                    key={user.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickLogin(user.email, user.password)}
                    disabled={isSigningIn}
                    className="flex flex-col h-auto py-2"
                  >
                    <span className="font-semibold">{user.name}</span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{user.role}</span>
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
