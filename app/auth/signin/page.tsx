"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DEV_CREDENTIALS } from "@/lib/auth"
import { Heart, User, Shield, Settings } from "lucide-react"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleDevLogin = async (role: keyof typeof DEV_CREDENTIALS) => {
    setIsLoading(true)
    const credentials = DEV_CREDENTIALS[role]

    try {
      const result = await signIn("credentials", {
        email: credentials.email,
        password: credentials.password,
        redirect: false,
      })

      if (result?.ok) {
        const session = await getSession()
        router.push("/dashboard")
      } else {
        console.error("Sign in failed")
      }
    } catch (error) {
      console.error("Sign in error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome to AlignSynch</h1>
          <p className="text-slate-600 mt-2">Sign in to access your dashboard</p>
        </div>

        {/* Development Login Options */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Development Login</CardTitle>
            <CardDescription>Quick access for testing different user roles</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              onClick={() => handleDevLogin("admin")}
              disabled={isLoading}
              className="w-full justify-start bg-red-600 hover:bg-red-700"
            >
              <Shield className="w-4 h-4 mr-2" />
              Sign in as Admin
              <Badge variant="secondary" className="ml-auto">
                Full Access
              </Badge>
            </Button>

            <Button
              onClick={() => handleDevLogin("moderator")}
              disabled={isLoading}
              variant="outline"
              className="w-full justify-start"
            >
              <Settings className="w-4 h-4 mr-2" />
              Sign in as Moderator
              <Badge variant="outline" className="ml-auto">
                Content Management
              </Badge>
            </Button>

            <Button
              onClick={() => handleDevLogin("user")}
              disabled={isLoading}
              variant="outline"
              className="w-full justify-start"
            >
              <User className="w-4 h-4 mr-2" />
              Sign in as User
              <Badge variant="outline" className="ml-auto">
                Standard Access
              </Badge>
            </Button>
          </CardContent>
        </Card>

        {/* Credentials Info */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <h3 className="font-semibold text-blue-900 mb-2">Development Credentials</h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div>
                <strong>Admin:</strong> admin@alignsynch.com / admin123
              </div>
              <div>
                <strong>Moderator:</strong> mod@alignsynch.com / mod123
              </div>
              <div>
                <strong>User:</strong> user@alignsynch.com / user123
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
