"use client"

import type React from "react"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { DEV_CREDENTIALS } from "@/lib/auth"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setIsLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/dashboard") // Redirect to dashboard on success
    }
  }

  const handleQuickLogin = async (userEmail: string, userPassword: string) => {
    setIsLoading(true)
    setError(null)

    const result = await signIn("credentials", {
      redirect: false,
      email: userEmail,
      password: userPassword,
    })

    setIsLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-64px-64px)] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
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
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
        </CardContent>
        {process.env.NODE_ENV !== "production" && (
          <CardFooter className="flex flex-col gap-2 pt-4 border-t mt-4">
            <p className="text-sm text-muted-foreground">Quick Login (Dev Only):</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 w-full">
              {DEV_CREDENTIALS.map((user) => (
                <Button
                  key={user.id}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleQuickLogin(user.email, user.password)}
                  disabled={isLoading}
                >
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </Button>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}
