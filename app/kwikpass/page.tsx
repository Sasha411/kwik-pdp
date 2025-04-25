import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  HelpCircle,
  UserCheck,
  BarChartIcon,
  LineChartIcon,
} from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { BarChart } from "@/components/charts/bar-chart"
import { PieChart } from "@/components/charts/pie-chart"
import { LineChart } from "@/components/charts/line-chart"

const conversionData = [
  {
    name: "PDP Views",
    identified: 100,
    unidentified: 100,
  },
  {
    name: "Clicks",
    identified: 28,
    unidentified: 19,
  },
  {
    name: "Add to Cart",
    identified: 22,
    unidentified: 14,
  },
  {
    name: "Checkout",
    identified: 18,
    unidentified: 9,
  },
  {
    name: "Orders",
    identified: 13,
    unidentified: 6,
  },
]

const testPerformanceData = [
  {
    name: "Chanderi Cotton Saree",
    identified: 6.2,
    unidentified: 3.9,
  },
  {
    name: "Banarasi Silk Saree",
    identified: 5.8,
    unidentified: 3.5,
  },
  {
    name: "Kanjivaram Silk Saree",
    identified: 4.8,
    unidentified: 2.9,
  },
  {
    name: "Patola Silk Saree",
    identified: 7.1,
    unidentified: 4.8,
  },
]

const userSessionsData = [
  { name: "Kwikpass Identified", value: 35 },
  { name: "Non-Identified", value: 65 },
]

const successMetricsData = [
  { month: "Jan", conversion: 2.4, aov: 5800 },
  { month: "Feb", conversion: 2.6, aov: 5900 },
  { month: "Mar", conversion: 3.2, aov: 6400 },
  { month: "Apr", conversion: 3.8, aov: 6800 },
  { month: "May", conversion: 4.5, aov: 7200 },
  { month: "Jun", conversion: 5.2, aov: 7600 },
]

export default function KwikpassPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Kwikpass Integration</h2>
      </div>

      <Tabs defaultValue="analysis">
        <TabsList>
          <TabsTrigger value="analysis">Performance Analysis</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="cross-sell">Benefits</TabsTrigger>
        </TabsList>

        <TabsContent value="analysis" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Kwikpass User Performance</CardTitle>
              <CardDescription>
                Compare test performance between Kwikpass identified and non-identified users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-medium mb-4">Conversion Funnel Comparison</h3>
                  <BarChart
                    data={conversionData}
                    xAxisDataKey="name"
                    bars={[
                      { dataKey: "identified", name: "Kwikpass Identified", fill: "#d946ef" },
                      { dataKey: "unidentified", name: "Non-Identified", fill: "#94a3b8" },
                    ]}
                  />
                </div>

                <div>
                  <h3 className="font-medium mb-4">Key Metrics</h3>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-sm font-medium">Click-Through Rate</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-[#d946ef] mr-1"></div>
                              Identified: 28%
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-[#94a3b8] mr-1"></div>
                              Non-Identified: 19%
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-kwik-green">+47.4%</span>
                      </div>
                      <Progress value={47} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-sm font-medium">Add to Cart Rate</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-[#d946ef] mr-1"></div>
                              Identified: 22%
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-[#94a3b8] mr-1"></div>
                              Non-Identified: 14%
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-kwik-green">+57.1%</span>
                      </div>
                      <Progress value={57} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-sm font-medium">Checkout Rate</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-[#d946ef] mr-1"></div>
                              Identified: 18%
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-[#94a3b8] mr-1"></div>
                              Non-Identified: 9%
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-kwik-green">+100.0%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <span className="text-sm font-medium">Conversion Rate</span>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-[#d946ef] mr-1"></div>
                              Identified: 13%
                            </div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <div className="h-2 w-2 rounded-full bg-[#94a3b8] mr-1"></div>
                              Non-Identified: 6%
                            </div>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-kwik-green">+116.7%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="font-medium mb-4">Test Performance by User Type</h3>
                <BarChart
                  data={testPerformanceData}
                  xAxisDataKey="name"
                  bars={[
                    { dataKey: "identified", name: "Kwikpass Identified", fill: "#d946ef" },
                    { dataKey: "unidentified", name: "Non-Identified", fill: "#94a3b8" },
                  ]}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Sessions</CardTitle>
                <CardDescription>Distribution of identified vs non-identified users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  <PieChart data={userSessionsData} dataKey="value" nameKey="name" colors={["#d946ef", "#94a3b8"]} />
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
                <CardTitle>Average Order Value</CardTitle>
                <CardDescription>Comparing AOV between user types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Kwikpass Identified</div>
                      <div className="text-2xl font-bold">₹7,832</div>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-[#d946ef] text-white flex items-center justify-center text-xl font-bold">
                      +32%
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-sm text-muted-foreground">Non-Identified</div>
                      <div className="text-2xl font-bold">₹5,938</div>
                    </div>
                    <div className="h-16 w-16 rounded-full bg-[#94a3b8] text-white flex items-center justify-center text-xl font-bold">
                      --
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="w-full">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="integration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Connect Kwikpass to KwikPDP</CardTitle>
              <CardDescription>
                Integrate Kwikpass to track signed-in users and improve conversion rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <div className="rounded-lg border p-4 space-y-4">
                    <h3 className="font-medium">Integration Steps</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          1
                        </div>
                        <div>
                          <p className="font-medium">Install Kwikpass App</p>
                          <p className="text-sm text-muted-foreground">
                            Install the Kwikpass app from the Shopify App Store
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          2
                        </div>
                        <div>
                          <p className="font-medium">Configure Kwikpass</p>
                          <p className="text-sm text-muted-foreground">
                            Set up your Kwikpass account and configure settings
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          3
                        </div>
                        <div>
                          <p className="font-medium">Connect KwikPDP</p>
                          <p className="text-sm text-muted-foreground">
                            Enter your Kwikpass API key in KwikPDP settings
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          4
                        </div>
                        <div>
                          <p className="font-medium">Verify Integration</p>
                          <p className="text-sm text-muted-foreground">
                            Test the integration to ensure data is flowing correctly
                          </p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full mt-4">
                      <UserCheck className="mr-2 h-4 w-4" />
                      Connect Kwikpass
                    </Button>
                  </div>
                </div>

                <div>
                  <div className="rounded-lg border p-4 space-y-4">
                    <h3 className="font-medium">Benefits of Integration</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-kwik-green shrink-0" />
                        <div>
                          <p className="font-medium">Track Identified Users</p>
                          <p className="text-sm text-muted-foreground">
                            Segment test results between identified and non-identified users
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-kwik-green shrink-0" />
                        <div>
                          <p className="font-medium">Higher Conversion Rates</p>
                          <p className="text-sm text-muted-foreground">
                            Identified users convert at 2.1x higher rates on average
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-kwik-green shrink-0" />
                        <div>
                          <p className="font-medium">Personalized Experiences</p>
                          <p className="text-sm text-muted-foreground">
                            Create targeted tests for specific user segments
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-kwik-green shrink-0" />
                        <div>
                          <p className="font-medium">End-to-End Analytics</p>
                          <p className="text-sm text-muted-foreground">
                            Track user journey from PDP to checkout completion
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-muted/50 p-4 mt-6 flex gap-4 items-center">
                <HelpCircle className="h-8 w-8 text-muted-foreground shrink-0" />
                <div>
                  <h4 className="font-medium">Need Help?</h4>
                  <p className="text-sm text-muted-foreground">
                    Contact our support team for assistance with Kwikpass integration.
                  </p>
                </div>
                <Button variant="outline" className="ml-auto">
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cross-sell" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Why Use Kwikpass with KwikPDP?</CardTitle>
              <CardDescription>Enhance your A/B testing with powerful user identification</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Increase Conversions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Identified users convert at 2.1x higher rates than guests. Kwikpass streamlines checkout, reducing
                      friction and cart abandonment.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <BarChartIcon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Better Insights</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Segment test data by user type. Understand how different user segments respond to your tests and
                      optimize accordingly.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-background">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <LineChartIcon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">Higher ROI</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Kwikpass users have 32% higher average order values. Combine with A/B testing to maximize revenue
                      per visitor.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Success Metrics with Kwikpass</h3>
                <LineChart
                  data={successMetricsData}
                  xAxisDataKey="month"
                  lines={[
                    { dataKey: "conversion", name: "Conversion Rate (%)", stroke: "#0ea5e9" },
                    { dataKey: "aov", name: "Avg. Order Value (₹)", stroke: "#d946ef" },
                  ]}
                />
              </div>

              <div className="mt-8 border rounded-lg p-6">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="md:w-2/3">
                    <h3 className="text-xl font-bold mb-2">Ready to boost your conversions?</h3>
                    <p className="text-muted-foreground">
                      Connect Kwikpass today and unlock powerful user identification for your A/B tests. Our data shows
                      merchants using Kwikpass with KwikPDP see a 45% increase in test effectiveness.
                    </p>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <Button size="lg" className="bg-kwik-purple hover:bg-kwik-purple/90">
                      Get Started with Kwikpass
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
