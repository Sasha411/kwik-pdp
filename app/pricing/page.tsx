import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PricingPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
        <p className="text-muted-foreground">Choose the plan that's right for your business</p>
      </div>

      <div className="flex justify-center">
        <Tabs defaultValue="monthly" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:gap-8 max-w-6xl mx-auto">
        {/* Free Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Free</CardTitle>
            <CardDescription>For small stores just getting started with A/B testing</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 flex-1">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">₹0</span>
              <span className="text-sm text-muted-foreground">forever</span>
            </div>
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Up to 3 active tests</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Basic targeting options</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>1,000 monthly visitors</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>7-day test duration</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Basic analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Get Started
            </Button>
          </CardFooter>
        </Card>

        {/* Growth Plan */}
        <Card className="flex flex-col border-primary">
          <CardHeader>
            <CardTitle className="text-xl">Growth</CardTitle>
            <CardDescription>For growing businesses ready to optimize conversions</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 flex-1">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">₹4,999</span>
              <span className="text-sm text-muted-foreground">per month</span>
            </div>
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Up to 10 active tests</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Advanced targeting</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>10,000 monthly visitors</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Unlimited test duration</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Detailed analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>GoKwik integration</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Priority email support</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Upgrade to Growth</Button>
          </CardFooter>
        </Card>

        {/* Pro Plan */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-xl">Pro</CardTitle>
            <CardDescription>For established businesses with serious testing needs</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 flex-1">
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-bold">₹9,999</span>
              <span className="text-sm text-muted-foreground">per month</span>
            </div>
            <ul className="grid gap-2 text-sm">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Unlimited active tests</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Advanced targeting & segmentation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>50,000 monthly visitors</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Unlimited test duration</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Advanced analytics & reporting</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>GoKwik & custom integrations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Priority phone & email support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-kwik-green" />
                <span>Dedicated account manager</span>
              </li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              Upgrade to Pro
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="text-center space-y-2 max-w-xl mx-auto mt-8">
        <h3 className="text-xl font-bold">Need a custom plan?</h3>
        <p className="text-muted-foreground">Contact us for a custom plan tailored to your specific needs.</p>
        <Button variant="outline" className="mt-4">
          Contact Sales
        </Button>
      </div>
    </div>
  )
}
