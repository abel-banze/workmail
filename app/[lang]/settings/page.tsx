"use client"

import { useState } from "react"
import { MainNav } from "@/app/workspace/_components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { useTranslation } from "react-i18next"
import { useSettings } from "@/context/settings-context"
import { Moon, Sun, Monitor, Trash2, Save } from "lucide-react"

export default function SettingsPage() {
  const { t } = useTranslation()
  const { language, setLanguage, theme, setTheme } = useSettings()

  const [notifications, setNotifications] = useState(true)
  const [soundEffects, setSoundEffects] = useState(true)
  const [desktopNotifications, setDesktopNotifications] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const handleSaveSettings = async () => {
    setIsSaving(true)
    try {
      // Simulate saving settings
      await new Promise((resolve) => setTimeout(resolve, 1000))
      toast.success("Success", {
        description: t("settingsSaved"),
      })
    } catch (error) {
      toast.error("Error", {
        description: t("settingsError"),
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="flex h-screen">
      <MainNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="border-b p-4">
          <h1 className="text-2xl font-bold">{t("settings")}</h1>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <Tabs defaultValue="general">
            <div className="flex">
              <div className="w-64 pr-4 border-r mr-8">
                <TabsList className="flex flex-col items-start w-full h-auto space-y-1">
                  <TabsTrigger value="general" className="w-full justify-start">
                    {t("general")}
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="w-full justify-start">
                    {t("notifications")}
                  </TabsTrigger>
                  <TabsTrigger value="privacy" className="w-full justify-start">
                    {t("privacy")}
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="w-full justify-start">
                    {t("advanced")}
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="flex-1">
                <TabsContent value="general" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("appearance")}</CardTitle>
                      <CardDescription>{t("appearanceDescription")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">{t("language")}</h3>
                          <RadioGroup
                            value={language}
                            onValueChange={(value) => setLanguage(value as "en" | "pt")}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="en" id="language-en" />
                              <Label htmlFor="language-en">English</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="pt" id="language-pt" />
                              <Label htmlFor="language-pt">Português</Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                          <h3 className="text-lg font-medium">{t("theme")}</h3>
                          <RadioGroup
                            value={theme}
                            onValueChange={(value) => setTheme(value as "light" | "dark" | "system")}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="light" id="theme-light" />
                              <Label htmlFor="theme-light" className="flex items-center">
                                <Sun className="h-4 w-4 mr-2" />
                                {t("lightTheme")}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="dark" id="theme-dark" />
                              <Label htmlFor="theme-dark" className="flex items-center">
                                <Moon className="h-4 w-4 mr-2" />
                                {t("darkTheme")}
                              </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="system" id="theme-system" />
                              <Label htmlFor="theme-system" className="flex items-center">
                                <Monitor className="h-4 w-4 mr-2" />
                                {t("systemTheme")}
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("notifications")}</CardTitle>
                      <CardDescription>{t("notificationsDescription")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="notifications">{t("emailNotifications")}</Label>
                            <p className="text-sm text-muted-foreground">{t("emailNotificationsDescription")}</p>
                          </div>
                          <Switch id="notifications" checked={notifications} onCheckedChange={setNotifications} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="sound-effects">{t("soundEffects")}</Label>
                            <p className="text-sm text-muted-foreground">{t("soundEffectsDescription")}</p>
                          </div>
                          <Switch id="sound-effects" checked={soundEffects} onCheckedChange={setSoundEffects} />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="desktop-notifications">{t("desktopNotifications")}</Label>
                            <p className="text-sm text-muted-foreground">{t("desktopNotificationsDescription")}</p>
                          </div>
                          <Switch
                            id="desktop-notifications"
                            checked={desktopNotifications}
                            onCheckedChange={setDesktopNotifications}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="privacy" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("security")}</CardTitle>
                      <CardDescription>{t("securityDescription")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="two-factor">{t("twoFactorAuth")}</Label>
                            <p className="text-sm text-muted-foreground">{t("twoFactorAuthDescription")}</p>
                          </div>
                          <Switch id="two-factor" checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                        </div>
                        <Separator />
                        <div>
                          <Button variant="destructive" className="flex items-center">
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t("deleteAccount")}
                          </Button>
                          <p className="text-sm text-muted-foreground mt-2">{t("deleteAccountWarning")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="advanced" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>{t("advancedSettings")}</CardTitle>
                      <CardDescription>{t("advancedSettingsDescription")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="auto-save">{t("autoSaveDrafts")}</Label>
                            <p className="text-sm text-muted-foreground">{t("autoSaveDraftsDescription")}</p>
                          </div>
                          <Switch id="auto-save" checked={autoSave} onCheckedChange={setAutoSave} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </div>
          </Tabs>
        </div>
        <div className="border-t p-4 flex justify-end">
          <Button onClick={handleSaveSettings} disabled={isSaving}>
            {isSaving ? (
              t("saving")
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {t("saveSettings")}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

