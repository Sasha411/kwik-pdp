"use client"

import { useState } from "react"
import { LayoutGrid, RefreshCw, Plus, BarChart, ShoppingCart, ArrowUpRight, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

export function WidgetSuggestionPanel() {
  const [isGenerating, setIsGenerating] = useState(false)

  // Mock widget suggestions
  const widgetSuggestions = [
    {
      id: 1,
      name: "You May Also Like",
      description: "Personalized product recommendations based on browsing history",
      icon: ShoppingCart,
      insights: [
        "Increases AOV by up to 15% for ethnic wear brands",
        "Shoppers who view recommendations are 4.5x more likely to add items to cart",
        "Top 3 ethnic wear brands using this widget saw 12% increase in units per transaction",
      ],
      improvement: "+15% AOV",
    },
    {
      id: 2,
      name: "Customers Also Bought",
      description: "Show complementary products frequently purchased together",
      icon: ShoppingCart,
      insights: [
        "Increases AOV by up to 25% for saree products",
        "Encourages multi-item purchases of complementary products",
        "Leading saree brands report 18% higher cart values with this widget",
      ],
      improvement: "+25% AOV",
    },
    {
      id: 3,
      name: "Complete The Look",
      description: "Curated accessories that match the main product",
      icon: ShoppingCart,
      insights: [
        "Increases attachment rate by 35% for jewelry and accessories",
        "Ethnic wear shoppers respond positively to styled combinations",
        "Brands in your category see 22% higher transaction values",
      ],
      improvement: "+22% AOV",
    },
    {
      id: 4,
      name: "Recently Viewed",
      description: "Show products the customer has previously viewed",
      icon: ShoppingCart,
      insights: [
        "Reduces bounce rate by 18% by reminding customers of previous interests",
        "Increases return visitor conversion rate by 12%",
        "Ethnic wear customers often compare multiple items before purchase",
      ],
      improvement: "+12% Conv.",
    },
  ]

  const handleGenerateClick = () => {
    setIsGenerating(true)
    // Simulate AI generation delay
    setTimeout(() => {
      setIsGenerating(false)
    }, 1500)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center">
          <LayoutGrid className="h-4 w-4 text-primary mr-2" />
          <h3 className="font-medium">Widget Recommendations</h3>
        </div>
        <Button variant="outline" size="sm" onClick={handleGenerateClick} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </>
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          <div className="bg-muted/30 p-3 rounded-lg">
            <div className="flex items-center mb-2">
              <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
              <span className="text-sm font-medium">Widget Insight</span>
            </div>
            <p className="text-sm">
              Brands in your category that use strategic product widgets see an average 27% increase in Average Order
              Value (AOV). These recommendations are based on data from similar ethnic wear stores.
            </p>
          </div>

          {widgetSuggestions.map((widget) => (
            <div key={widget.id} className="border rounded-lg overflow-hidden">
              <div className="p-3 border-b bg-muted/10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <widget.icon className="h-4 w-4 mr-2 text-primary" />
                    <span className="font-medium">{widget.name}</span>
                  </div>
                  <Badge variant="outline" className="text-green-600 bg-green-50">
                    {widget.improvement}
                  </Badge>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm mb-3">{widget.description}</p>

                <div className="bg-muted/20 p-3 rounded-lg mb-3">
                  <h4 className="text-xs font-medium mb-2 flex items-center">
                    <BarChart className="h-3 w-3 mr-1" />
                    Industry Insights
                  </h4>
                  <ul className="text-xs space-y-1">
                    {widget.insights.map((insight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-1">•</span>
                        <span>{insight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center">
                  <Button variant="link" size="sm" className="px-0">
                    <span>View Examples</span>
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Widget
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
