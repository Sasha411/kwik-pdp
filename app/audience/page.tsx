import { PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Audience segments data
const segments = [
  {
    id: 1,
    name: "Mobile Users - Delhi NCR",
    description: "Mobile users from Delhi NCR region",
    type: "Device",
    tags: ["Mobile", "Delhi NCR"],
    activeTests: 2,
  },
  {
    id: 2,
    name: "Instagram Traffic",
    description: "Users coming from Instagram campaigns",
    type: "UTM Source",
    tags: ["Instagram"],
    activeTests: 3,
  },
  {
    id: 3,
    name: "Returning Customers",
    description: "Users who have previously purchased",
    type: "User Type",
    tags: ["Returning Customer"],
    activeTests: 1,
  },
  {
    id: 4,
    name: "High-Value Shoppers",
    description: "Users with AOV > ₹5,000",
    type: "User Type",
    tags: ["> ₹5,000"],
    activeTests: 0,
  },
]

export default function AudiencePage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Audience</h2>
          <p className="text-muted-foreground">Create and manage audience segments for targeting</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Segment
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audience Segments</CardTitle>
          <p className="text-sm text-muted-foreground">Manage your audience segments for targeted testing</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Segments</TabsTrigger>
                <TabsTrigger value="device">Device</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="utm">UTM Source</TabsTrigger>
                <TabsTrigger value="user">User Type</TabsTrigger>
              </TabsList>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search segments..." className="pl-8 w-[250px]" />
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              {segments.map((segment) => (
                <div key={segment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{segment.name}</h3>
                      <Badge variant="outline" className="bg-muted/50">
                        {segment.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{segment.description}</p>
                    <div className="flex gap-2 mt-2">
                      {segment.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-sm text-right">
                      <span className="font-medium">{segment.activeTests}</span>{" "}
                      <span className="text-muted-foreground">
                        active {segment.activeTests === 1 ? "test" : "tests"}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
