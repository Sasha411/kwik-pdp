import Link from "next/link"
import { CalendarIcon, Filter, PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Test data
const tests = [
  {
    id: 1,
    name: "Silk Saree Product Description",
    product: "Kanchipuram Silk Saree",
    status: "Running",
    created: "May 1, 2023",
    improvement: "+14.5%",
  },
  {
    id: 2,
    name: "Festive Kurta Add to Cart Button",
    product: "Embroidered Anarkali Kurta",
    status: "Running",
    created: "May 5, 2023",
    improvement: "+8.2%",
  },
  {
    id: 3,
    name: "Jewelry Product Image Layout",
    product: "Kundan Necklace Set",
    status: "Running",
    created: "May 8, 2023",
    improvement: "+5.7%",
  },
  {
    id: 4,
    name: "Lehenga Price Display Format",
    product: "Banarasi Lehenga Choli",
    status: "Running",
    created: "May 12, 2023",
    improvement: "-1.2%",
  },
  {
    id: 5,
    name: "Dupatta Color Variants",
    product: "Designer Dupatta",
    status: "Completed",
    created: "Apr 15, 2023",
    improvement: "+10.3%",
  },
  {
    id: 6,
    name: "Bridal Collection CTA",
    product: "Bridal Collection",
    status: "Completed",
    created: "Apr 10, 2023",
    improvement: "+12.8%",
  },
]

export default function TestsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">A/B Tests</h2>
          <p className="text-muted-foreground">Create and manage your A/B tests</p>
        </div>
        <Button asChild>
          <Link href="/tests/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Test
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tests</CardTitle>
          <p className="text-sm text-muted-foreground">View and manage all your A/B tests</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <div className="flex items-center justify-between mb-4">
              <TabsList>
                <TabsTrigger value="all">All Tests</TabsTrigger>
                <TabsTrigger value="running">Running</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search tests..." className="pl-8 w-[250px]" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-down-up"
                  >
                    <path d="m3 16 4 4 4-4" />
                    <path d="M7 20V4" />
                    <path d="m21 8-4-4-4 4" />
                    <path d="M17 4v16" />
                  </svg>
                </Button>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-3 px-4 text-left font-medium">Test Name</th>
                      <th className="py-3 px-4 text-left font-medium">Product</th>
                      <th className="py-3 px-4 text-left font-medium">Status</th>
                      <th className="py-3 px-4 text-left font-medium">Created</th>
                      <th className="py-3 px-4 text-left font-medium">Improvement</th>
                      <th className="py-3 px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tests.map((test) => (
                      <tr key={test.id} className="border-b">
                        <td className="py-3 px-4">{test.name}</td>
                        <td className="py-3 px-4">{test.product}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={test.status === "Running" ? "default" : "secondary"}
                            className={
                              test.status === "Running"
                                ? "bg-black text-white hover:bg-black/80"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }
                          >
                            {test.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          {test.created}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={
                              test.improvement.startsWith("+")
                                ? "text-kwik-green font-medium"
                                : "text-kwik-red font-medium"
                            }
                          >
                            {test.improvement}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
