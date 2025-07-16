"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DashboardLayout } from "@/components/admin/dashboard-layout"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { hasPermission } from "@/lib/auth"
import { useDashboardStore } from "@/lib/store"
import { Save, AlertCircle, CheckCircle, Globe, Mail, Shield, Bell } from "lucide-react"

interface SystemSettings {
  general: {
    siteName: string
    siteDescription: string
    adminEmail: string
    timezone: string
    language: string
  }
  security: {
    twoFactorAuth: boolean
    passwordMinLength: number
    sessionTimeout: number
    loginAttempts: number
  }
  email: {
    smtpHost: string
    smtpPort: string
    smtpUsername: string
    smtpPassword: string
    fromEmail: string
    fromName: string
  }
  notifications: {
    emailNotifications: boolean
    pushNotifications: boolean
    smsNotifications: boolean
    weeklyReports: boolean
  }
}

const defaultSettings: SystemSettings = {
  general: {
    siteName: "AlignSynch Admin",
    siteDescription: "Comprehensive admin dashboard for managing your application",
    adminEmail: "admin@alignsynch.com",
    timezone: "UTC",
    language: "en",
  },
  security: {
    twoFactorAuth: true,
    passwordMinLength: 8,
    sessionTimeout: 30,
    loginAttempts: 5,
  },
  email: {
    smtpHost: "smtp.gmail.com",
    smtpPort: "587",
    smtpUsername: "",
    smtpPassword: "",
    fromEmail: "noreply@alignsynch.com",
    fromName: "AlignSynch",
  },
  notifications: {
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    weeklyReports: true,
  },
}

export default function SystemSettingsPage() {
  const { data: session, status } = useSession()
  const { preferences } = useDashboardStore()
  const [settings, setSettings] = useState<SystemSettings>(defaultSettings)
  const [isSaving, setIsSaving] = useState(false)
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle")

  if (status === "loading") {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (!session) {
    redirect("/auth/signin")
  }

  const userPermissions = session.user?.permissions || []

  if (!hasPermission(userPermissions, "settings.read")) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Card>
            <CardContent className="pt-6">
              <p className="text-center text-muted-foreground">You don't have permission to view system settings.</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  const canWrite = hasPermission(userPermissions, "settings.write")

  const handleSave = async () => {
    if (!canWrite) return

    setIsSaving(true)
    setSaveStatus("idle")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSaveStatus("success")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } catch (error) {
      setSaveStatus("error")
      setTimeout(() => setSaveStatus("idle"), 3000)
    } finally {
      setIsSaving(false)
    }
  }

  const updateSettings = (section: keyof SystemSettings, field: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }))
  }

  return (
    <ErrorBoundary>
      <DashboardLayout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">System Settings</h1>
              <p className="text-muted-foreground">Configure your application settings and preferences</p>
            </div>
            {canWrite && (
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Save Status Alert */}
          {saveStatus === "success" && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">Settings saved successfully!</AlertDescription>
            </Alert>
          )}

          {saveStatus === "error" && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Failed to save settings. Please try again.</AlertDescription>
            </Alert>
          )}

          {/* Settings Tabs */}
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
            </TabsList>

            {/* General Settings */}
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Basic configuration for your application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input
                        id="siteName"
                        value={settings.general.siteName}
                        onChange={(e) => updateSettings("general", "siteName", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="adminEmail">Admin Email</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={settings.general.adminEmail}
                        onChange={(e) => updateSettings("general", "adminEmail", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Textarea
                      id="siteDescription"
                      value={settings.general.siteDescription}
                      onChange={(e) => updateSettings("general", "siteDescription", e.target.value)}
                      disabled={!canWrite}
                      rows={3}
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Input
                        id="timezone"
                        value={settings.general.timezone}
                        onChange={(e) => updateSettings("general", "timezone", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Input
                        id="language"
                        value={settings.general.language}
                        onChange={(e) => updateSettings("general", "language", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Settings */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security policies and authentication settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin accounts</p>
                    </div>
                    <Switch
                      checked={settings.security.twoFactorAuth}
                      onCheckedChange={(checked) => updateSettings("security", "twoFactorAuth", checked)}
                      disabled={!canWrite}
                    />
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                      <Input
                        id="passwordMinLength"
                        type="number"
                        value={settings.security.passwordMinLength}
                        onChange={(e) =>
                          updateSettings("security", "passwordMinLength", Number.parseInt(e.target.value))
                        }
                        disabled={!canWrite}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                      <Input
                        id="sessionTimeout"
                        type="number"
                        value={settings.security.sessionTimeout}
                        onChange={(e) => updateSettings("security", "sessionTimeout", Number.parseInt(e.target.value))}
                        disabled={!canWrite}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="loginAttempts">Maximum Login Attempts</Label>
                    <Input
                      id="loginAttempts"
                      type="number"
                      value={settings.security.loginAttempts}
                      onChange={(e) => updateSettings("security", "loginAttempts", Number.parseInt(e.target.value))}
                      disabled={!canWrite}
                    />
                    <p className="text-sm text-muted-foreground">
                      Number of failed login attempts before account lockout
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Email Settings */}
            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Email Configuration</CardTitle>
                  <CardDescription>Configure SMTP settings for sending emails</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP Host</Label>
                      <Input
                        id="smtpHost"
                        value={settings.email.smtpHost}
                        onChange={(e) => updateSettings("email", "smtpHost", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP Port</Label>
                      <Input
                        id="smtpPort"
                        value={settings.email.smtpPort}
                        onChange={(e) => updateSettings("email", "smtpPort", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername">SMTP Username</Label>
                      <Input
                        id="smtpUsername"
                        value={settings.email.smtpUsername}
                        onChange={(e) => updateSettings("email", "smtpUsername", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP Password</Label>
                      <Input
                        id="smtpPassword"
                        type="password"
                        value={settings.email.smtpPassword}
                        onChange={(e) => updateSettings("email", "smtpPassword", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fromEmail">From Email</Label>
                      <Input
                        id="fromEmail"
                        type="email"
                        value={settings.email.fromEmail}
                        onChange={(e) => updateSettings("email", "fromEmail", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fromName">From Name</Label>
                      <Input
                        id="fromName"
                        value={settings.email.fromName}
                        onChange={(e) => updateSettings("email", "fromName", e.target.value)}
                        disabled={!canWrite}
                      />
                    </div>
                  </div>

                  {canWrite && (
                    <Button variant="outline" className="w-full bg-transparent">
                      <Mail className="mr-2 h-4 w-4" />
                      Test Email Configuration
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notifications Settings */}
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how and when notifications are sent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.notifications.emailNotifications}
                      onCheckedChange={(checked) => updateSettings("notifications", "emailNotifications", checked)}
                      disabled={!canWrite}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send browser push notifications</p>
                    </div>
                    <Switch
                      checked={settings.notifications.pushNotifications}
                      onCheckedChange={(checked) => updateSettings("notifications", "pushNotifications", checked)}
                      disabled={!canWrite}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                    </div>
                    <Switch
                      checked={settings.notifications.smsNotifications}
                      onCheckedChange={(checked) => updateSettings("notifications", "smsNotifications", checked)}
                      disabled={!canWrite}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">Send weekly summary reports</p>
                    </div>
                    <Switch
                      checked={settings.notifications.weeklyReports}
                      onCheckedChange={(checked) => updateSettings("notifications", "weeklyReports", checked)}
                      disabled={!canWrite}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </ErrorBoundary>
  )
}
