import { Badge } from "@/components/ui/badge"
import { Check, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Configure your A/B testing application</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure your account and application preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="store-name">Store Name</Label>
                <Input id="store-name" defaultValue="Mystic Apparel" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shopify-url">Shopify Store URL</Label>
                <Input id="shopify-url" defaultValue="mysticapparel.myshopify.com" />
              </div>

              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">Default Test Settings</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="test-duration">Default Test Duration</Label>
                    <Select defaultValue="14">
                      <SelectTrigger id="test-duration">
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="primary-metric">Default Primary Metric</Label>
                    <Select defaultValue="conversion">
                      <SelectTrigger id="primary-metric">
                        <SelectValue placeholder="Select metric" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="conversion">Conversion Rate</SelectItem>
                        <SelectItem value="ctr">Click-Through Rate</SelectItem>
                        <SelectItem value="aov">Average Order Value</SelectItem>
                        <SelectItem value="revenue">Revenue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-apply">Auto-apply Winners</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically apply winning variants when tests conclude
                  </p>
                </div>
                <Switch id="auto-apply" />
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>GoKwik Integration</CardTitle>
              <CardDescription>Connect with GoKwik to track checkout conversions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Connected</h4>
                  <p className="text-sm text-green-700">Your GoKwik integration is active</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="gokwik-api-key">GoKwik API Key</Label>
                <Input id="gokwik-api-key" type="password" value="••••••••••••••" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gokwik-merchant-id">GoKwik Merchant ID</Label>
                <Input id="gokwik-merchant-id" defaultValue="MYSTIC_APPAREL_IN" />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="track-events">Track All Events</Label>
                  <p className="text-sm text-muted-foreground">Send all user events to GoKwik for analysis</p>
                </div>
                <Switch id="track-events" defaultChecked />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline">Disconnect</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shopify Integration</CardTitle>
              <CardDescription>Connect with your Shopify store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-800">Connected</h4>
                  <p className="text-sm text-green-700">Your Shopify store is connected</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-sync">Auto-sync Products</Label>
                  <p className="text-sm text-muted-foreground">Automatically sync product data from Shopify</p>
                </div>
                <Switch id="auto-sync" defaultChecked />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="space-y-0.5">
                  <Label htmlFor="theme-editor">Theme Editor Integration</Label>
                  <p className="text-sm text-muted-foreground">Enable direct theme editing capabilities</p>
                </div>
                <Switch id="theme-editor" defaultChecked />
              </div>

              <div className="flex justify-between pt-4">
                <Button variant="outline">Reconnect</Button>
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <h3 className="text-lg font-medium">Email Notifications</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="test-started">Test Started</Label>
                    <p className="text-sm text-muted-foreground">Receive an email when a test starts</p>
                  </div>
                  <Switch id="test-started" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="test-completed">Test Completed</Label>
                    <p className="text-sm text-muted-foreground">Receive an email when a test completes</p>
                  </div>
                  <Switch id="test-completed" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="significant-results">Significant Results</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive an email when a test reaches statistical significance
                    </p>
                  </div>
                  <Switch id="significant-results" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="weekly-summary">Weekly Summary</Label>
                    <p className="text-sm text-muted-foreground">Receive a weekly summary of all active tests</p>
                  </div>
                  <Switch id="weekly-summary" />
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label htmlFor="notification-recipients">Notification Recipients</Label>
                <Textarea
                  id="notification-recipients"
                  placeholder="Enter email addresses"
                  defaultValue="rahul@mysticapparel.in, team@mysticapparel.in"
                />
                <p className="text-sm text-muted-foreground">Enter email addresses that should receive notifications</p>
              </div>

              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>Manage team members and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">RA</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Rahul Agarwal</h4>
                      <p className="text-sm text-muted-foreground">rahul@mysticapparel.in</p>
                    </div>
                  </div>
                  <Badge>Admin</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">PS</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Priya Singh</h4>
                      <p className="text-sm text-muted-foreground">priya@mysticapparel.in</p>
                    </div>
                  </div>
                  <Badge variant="outline">Editor</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">AK</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Amit Kumar</h4>
                      <p className="text-sm text-muted-foreground">amit@mysticapparel.in</p>
                    </div>
                  </div>
                  <Badge variant="outline">Viewer</Badge>
                </div>
              </div>

              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" />
                Invite Team Member
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
