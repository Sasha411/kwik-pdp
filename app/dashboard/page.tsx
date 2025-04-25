import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BeakerIcon, Truck, ShoppingCart, Package, ArrowRight, PlusCircle } from "lucide-react"
import { BarChart } from "@/components/charts/bar-chart-container"
import { LineChart } from "@/components/charts/line-chart-container"

const conversionsData = [
  {
    name: "Apr 9",
    control: 82,
    variant: 107,
  },
  {
    name: "Apr 10",
    control: 94,
    variant: 116,
  },
  {
    name: "Apr 11",
    control: 85,
    variant: 129,
  },
  {
    name: "Apr 12",
    control: 76,
    variant: 115,
  },
  {
    name: "Apr 13",
    control: 89,
    variant: 131,
  },
  {
    name: "Apr 14",
    control: 93,
    variant: 142,
  },
  {
    name: "Apr 15",
    control: 98,
    variant: 153,
  },
]

const funnelData = [
  {
    name: "PDP Views",
    value: 5000,
  },
  {
    name: "Add to Cart",
    value: 2200,
  },
  {
    name: "Initiated Checkout",
    value: 1800,
  },
  {
    name: "Completed Orders",
    value: 1400,
  },
  {
    name: "Delivered",
    value: 1150,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Test
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tests</CardTitle>
            <BeakerIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">+2 in the last 7 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Tested</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">12% of catalog</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Lift</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-kwik-green">+24.3%</div>
            <p className="text-xs text-muted-foreground">Across all tests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">8 winners applied</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Test Performance</CardTitle>
            <CardDescription>Conversion comparison between variants</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <BarChart
              data={conversionsData}
              xAxisDataKey="name"
              bars={[
                { dataKey: "control", name: "Control", fill: "#94a3b8" },
                { dataKey: "variant", name: "Variant", fill: "#0ea5e9" },
              ]}
            />
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Conversion Funnel</CardTitle>
            <CardDescription>From views to delivered orders</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <LineChart
              data={funnelData}
              xAxisDataKey="name"
              lines={[{ dataKey: "value", name: "Conversions", stroke: "#0ea5e9", yAxisId: "left" }]}
              yAxes={[{ id: "left", orientation: "left" }]}
            />
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mt-6">Recent Tests</h3>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Banarasi Silk Saree</CardTitle>
            <CardDescription>Active (7 days remaining)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Control:</span>
                <span className="text-sm">4.2% CTR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Variant:</span>
                <span className="text-sm font-medium text-kwik-green">5.7% CTR</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">+1,258 views today</span>
                <Button variant="ghost" size="sm">
                  View <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chanderi Cotton Saree</CardTitle>
            <CardDescription>Active (2 days remaining)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Control:</span>
                <span className="text-sm">3.8% CTR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Variant:</span>
                <span className="text-sm font-medium text-kwik-green">5.1% CTR</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">+986 views today</span>
                <Button variant="ghost" size="sm">
                  View <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kanjivaram Silk Saree</CardTitle>
            <CardDescription>Active (12 days remaining)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Control:</span>
                <span className="text-sm">5.2% CTR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Variant:</span>
                <span className="text-sm font-medium">4.9% CTR</span>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-muted-foreground">+745 views today</span>
                <Button variant="ghost" size="sm">
                  View <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
