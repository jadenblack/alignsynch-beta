"use client"

import { useState, useEffect, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { User, Palette, Bell, Shield, Save, Heart, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { saveUserSettings, getUserSettings, type UserSettings } from "@/app/actions/settings"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    // Profile settings
    displayName: "",
    email: "",
    bio: "",

    // Notification settings
    emailNotifications: true,
    pushNotifications: false,
    sessionReminders: true,
    milestoneUpdates: false,

    // Privacy settings
    profileVisibility: "public",
    showStats: true,
    showBadges: true,
    allowPartnerInvite: true,

    // Session preferences
    defaultTopic: "communication",
    defaultSessionLength: 10,
    autoContinue: false,
  })

  const [isPending, startTransition] = useTransition()
  const [saveMessage, setSaveMessage] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const result = await getUserSettings()
        if (result.success && result.data) {
          setSettings(result.data)
        }
      } catch (error) {
        console.error("Failed to load settings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  const handleSettingChange = (key: keyof UserSettings, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
    // Clear any previous save messages when user makes changes
    setSaveMessage(null)
  }

  const handleSaveSettings = () => {
    startTransition(async () => {
      try {
        const result = await saveUserSettings(settings)
        setSaveMessage({
          type: result.success ? "success" : "error",
          message: result.message,
        })

        // Clear message after 5 seconds
        setTimeout(() => {
          setSaveMessage(null)
        }, 5000)
      } catch (error) {
        setSaveMessage({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        })
      }
    })
  }

  if (isLoading) {
    return (
      <div className="flex-1 py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Loading settings...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 py-12 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Settings</h1>
              <p className="text-muted-foreground">Manage your account settings and preferences</p>
            </div>
          </div>

          {saveMessage && (
            <Alert
              className={`mb-6 ${saveMessage.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
            >
              {saveMessage.type === "success" ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription className={saveMessage.type === "success" ? "text-green-800" : "text-red-800"}>
                {saveMessage.message}
              </AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="profile" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="appearance" className="gap-2">
                <Palette className="h-4 w-4" />
                Appearance
              </TabsTrigger>
              <TabsTrigger value="notifications" className="gap-2">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="privacy" className="gap-2">
                <Shield className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="session" className="gap-2">
                <Heart className="h-4 w-4" />
                Session
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Update your personal information and profile details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Display Name *</Label>
                      <Input
                        id="displayName"
                        value={settings.displayName}
                        onChange={(e) => handleSettingChange("displayName", e.target.value)}
                        placeholder="Enter your display name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.email}
                        onChange={(e) => handleSettingChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input
                      id="bio"
                      placeholder="Tell us about yourself..."
                      value={settings.bio}
                      onChange={(e) => handleSettingChange("bio", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of AlignSynch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Palette className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Theme customization options are coming soon!</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      We're working on bringing you more ways to personalize your AlignSynch experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Choose what notifications you want to receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Session Reminders</Label>
                      <p className="text-sm text-muted-foreground">Get reminded about upcoming sessions</p>
                    </div>
                    <Switch
                      checked={settings.sessionReminders}
                      onCheckedChange={(checked) => handleSettingChange("sessionReminders", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Milestone Updates</Label>
                      <p className="text-sm text-muted-foreground">Get notified about relationship milestones</p>
                    </div>
                    <Switch
                      checked={settings.milestoneUpdates}
                      onCheckedChange={(checked) => handleSettingChange("milestoneUpdates", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control who can see your information and activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <Select
                      value={settings.profileVisibility}
                      onValueChange={(value) => handleSettingChange("profileVisibility", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="partner">Partner Only</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Statistics</Label>
                      <p className="text-sm text-muted-foreground">Display your session statistics on your profile</p>
                    </div>
                    <Switch
                      checked={settings.showStats}
                      onCheckedChange={(checked) => handleSettingChange("showStats", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Show Badges</Label>
                      <p className="text-sm text-muted-foreground">Display your earned badges on your profile</p>
                    </div>
                    <Switch
                      checked={settings.showBadges}
                      onCheckedChange={(checked) => handleSettingChange("showBadges", checked)}
                    />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Allow Partner Invites</Label>
                      <p className="text-sm text-muted-foreground">Let other users invite you to connect</p>
                    </div>
                    <Switch
                      checked={settings.allowPartnerInvite}
                      onCheckedChange={(checked) => handleSettingChange("allowPartnerInvite", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="session" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Session Preferences</CardTitle>
                  <CardDescription>Set your default session settings and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="defaultTopic">Default Focus Area</Label>
                      <Select
                        value={settings.defaultTopic}
                        onValueChange={(value) => handleSettingChange("defaultTopic", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="communication">Communication</SelectItem>
                          <SelectItem value="finances">Finances</SelectItem>
                          <SelectItem value="intimacy">Intimacy</SelectItem>
                          <SelectItem value="goals">Shared Goals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="defaultSessionLength">Default Session Length</Label>
                      <Select
                        value={settings.defaultSessionLength.toString()}
                        onValueChange={(value) => handleSettingChange("defaultSessionLength", Number.parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5 Questions</SelectItem>
                          <SelectItem value="10">10 Questions</SelectItem>
                          <SelectItem value="15">15 Questions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-continue to next question</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically move to the next question after both partners answer
                      </p>
                    </div>
                    <Switch
                      checked={settings.autoContinue}
                      onCheckedChange={(checked) => handleSettingChange("autoContinue", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end pt-6">
            <Button onClick={handleSaveSettings} disabled={isPending} className="highlight-button gap-2">
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
