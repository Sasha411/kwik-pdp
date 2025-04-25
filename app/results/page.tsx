import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, ChevronRight, Trophy } from "lucide-react"
import { BarChart } from "@/components/charts/bar-chart-container"
import { PieChart } from "@/components/charts/pie-chart-container"

// Test result data
const testData = {
  id: "TEST-1001",
  name: "Banarasi Silk Saree Layout Test",
  status: "Active",
  startDate: "Apr 9, 2023",
  endDate: "Apr 23, 2023",
  daysRemaining: 7,
  variants: {
    control: {
      name: "Original Layout",
      views: 4826,
      clicks: 203,
      ctr: "4.2%",
      addToCart: 156,
      atcRate: "3.2%",
      checkouts: 89,
      checkoutRate: "1.8%",
      orders: 67,
      conversionRate: "1.4%",
    },
    variant: {
      name: "New Layout",
      views: 4712,
      clicks: 268,
      ctr: "5.7%",
      addToCart: 192,
      atcRate: "4.1%",
      checkouts: 118,
      checkoutRate: "2.5%",
      orders: 94,
      conversionRate: "2.0%",
    },
  },
  improvement: {
    clicks: "+35.7%",
    addToCart: "+28.1%",
    checkouts: "+38.9%",
    orders: "+42.9%",
    conversionRate: "+42.9%",
  },
  confidence: "98.2%",
}

const conversionData = [
  {
    name: "Clicks",
    control: 4.2,
    variant: 5.7,
  },
  {
    name: "Add to Cart",
    control: 3.2,
    variant: 4.1,
  },
  {
    name: "Checkout",
    control: 1.8,
    variant: 2.5,
  },
  {
    name: "Conversion",
    control: 1.4,
    variant: 2.0,
  },
]

const deviceData = [
  { name: "Desktop", value: 65 },
  { name: "Mobile", value: 30 },
  { name: "Tablet", value: 5 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

const locationData = [
  {
    name: "Delhi",
    value: 28,
  },
  {
    name: "Mumbai",
    value: 22,
  },
  {
    name: "Bangalore",
    value: 16,
  },
  {
    name: "Kolkata",
    value: 9,
  },
  {
    name: "Chennai",
    value: 8,
  },
  {
    name: "Other",
    value: 17,
  },
]

const trafficSourceData = [
  { name: "Direct", value: 40 },
  { name: "Google", value: 25 },
  { name: "Facebook", value: 20 },
  { name: "Instagram", value: 15 },
]

export default function ResultsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Test Results</h2>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">{testData.name}</CardTitle>
              <CardDescription>
                {testData.startDate} to {testData.endDate} • <Badge variant="outline">{testData.status}</Badge>
              </CardDescription>
            </div>
            <div className="space-x-2">
              <Button variant="outline">Export Results</Button>
              <Button className="bg-kwik-green hover:bg-kwik-green/90">
                <Trophy className="mr-2 h-4 w-4" />
                Apply Winner
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-4">
              <h3 className="font-medium">Test Progress</h3>
              <div className="flex items-center space-x-4">
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Started ({testData.startDate})</span>
                    <span>Ends ({testData.endDate})</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: "50%" }}></div>
                  </div>
                  <div className="text-sm text-center mt-1">{testData.daysRemaining} days remaining</div>
                </div>
              </div>

              <h3 className="font-medium mt-6">Statistical Confidence</h3>
              <div className="flex items-center space-x-4">
                <div className="w-full">
                  <div className="flex justify-between text-xs mb-1">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-kwik-green" style={{ width: "98%" }}></div>
                  </div>
                  <div className="text-sm text-center mt-1">
                    <span className="font-medium text-kwik-green">{testData.confidence}</span> confidence
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg mt-6">
                <h3 className="font-medium">Test Summary</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  This test has reached statistical significance with {testData.confidence} confidence. The variant
                  shows a {testData.improvement.conversionRate} improvement in overall conversion rate.
                </p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="md:col-span-2">
              <Tabs defaultValue="metrics">
                <TabsList className="mb-4">
                  <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
                  <TabsTrigger value="audience">Audience</TabsTrigger>
                  <TabsTrigger value="device">Device</TabsTrigger>
                </TabsList>

                <TabsContent value="metrics">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-4">Conversion Metrics</h3>
                      <BarChart
                        data={conversionData}
                        xAxisDataKey="name"
                        bars={[
                          { dataKey: "control", name: "Control", fill: "#94a3b8" },
                          { dataKey: "variant", name: "Variant", fill: "#0ea5e9" },
                        ]}
                      />
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg grid grid-cols-5 gap-4">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Clicks</div>
                        <div className="text-lg font-bold text-kwik-green">{testData.improvement.clicks}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Add to Cart</div>
                        <div className="text-lg font-bold text-kwik-green">{testData.improvement.addToCart}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Checkouts</div>
                        <div className="text-lg font-bold text-kwik-green">{testData.improvement.checkouts}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Orders</div>
                        <div className="text-lg font-bold text-kwik-green">{testData.improvement.orders}</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Conversion</div>
                        <div className="text-lg font-bold text-kwik-green">{testData.improvement.conversionRate}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="audience">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">Location Distribution</h3>
                      <div className="h-[300px] flex items-center justify-center">
                        <BarChart
                          data={locationData}
                          xAxisDataKey="name"
                          bars={[{ dataKey: "value", name: "% of Traffic", fill: "#0ea5e9" }]}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Traffic Source</h3>
                      <div className="h-[300px] flex items-center justify-center">
                        <PieChart data={trafficSourceData} dataKey="value" nameKey="name" colors={COLORS} />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="device">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium mb-4">Device Distribution</h3>
                      <div className="h-[300px] flex items-center justify-center">
                        <PieChart data={deviceData} dataKey="value" nameKey="name" colors={COLORS} />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-4">Conversion by Device</h3>
                      <div className="space-y-6">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Desktop</span>
                            <span className="text-sm font-medium">2.3%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#0088FE]" style={{ width: "75%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Mobile</span>
                            <span className="text-sm font-medium">1.8%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#00C49F]" style={{ width: "58%" }}></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">Tablet</span>
                            <span className="text-sm font-medium">2.1%</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-[#FFBB28]" style={{ width: "68%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Control Variant</CardTitle>
            <CardDescription>Original design</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Views</div>
                  <div className="text-xl font-bold">{testData.variants.control.views.toLocaleString()}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Clicks</div>
                  <div className="text-xl font-bold">{testData.variants.control.clicks.toLocaleString()}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Add to Cart</div>
                  <div className="text-xl font-bold">{testData.variants.control.addToCart.toLocaleString()}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Checkouts</div>
                  <div className="text-xl font-bold">{testData.variants.control.checkouts.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">CTR</div>
                  <div className="text-xl font-bold">{testData.variants.control.ctr}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Add to Cart Rate</div>
                  <div className="text-xl font-bold">{testData.variants.control.atcRate}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Checkout Rate</div>
                  <div className="text-xl font-bold">{testData.variants.control.checkoutRate}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  <div className="text-xl font-bold">{testData.variants.control.conversionRate}</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Variant</CardTitle>
            <CardDescription>
              New design{" "}
              <Badge variant="outline" className="ml-2 bg-kwik-green/10 text-kwik-green">
                Leading
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Views</div>
                  <div className="text-xl font-bold">{testData.variants.variant.views.toLocaleString()}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Clicks</div>
                  <div className="text-xl font-bold">{testData.variants.variant.clicks.toLocaleString()}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Add to Cart</div>
                  <div className="text-xl font-bold">{testData.variants.variant.addToCart.toLocaleString()}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Checkouts</div>
                  <div className="text-xl font-bold">{testData.variants.variant.checkouts.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">CTR</div>
                  <div className="text-xl font-bold text-kwik-green">{testData.variants.variant.ctr}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Add to Cart Rate</div>
                  <div className="text-xl font-bold text-kwik-green">{testData.variants.variant.atcRate}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Checkout Rate</div>
                  <div className="text-xl font-bold text-kwik-green">{testData.variants.variant.checkoutRate}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-lg text-center">
                  <div className="text-sm text-muted-foreground">Conversion Rate</div>
                  <div className="text-xl font-bold text-kwik-green">{testData.variants.variant.conversionRate}</div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" className="w-full">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
