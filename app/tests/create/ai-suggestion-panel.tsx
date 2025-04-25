"use client"

import { useState } from "react"
import { Sparkles, RefreshCw, Check, Lightbulb, BarChart, Loader2, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { fetchRecommendations, type RecommendationSuggestion } from "@/lib/recommendation"

interface AiSuggestionPanelProps {
  activeElement: string | null
  onApplySuggestion: (type: string, value: string) => void
  productUrl?: string
}

export function AiSuggestionPanel({ activeElement, onApplySuggestion, productUrl = "" }: AiSuggestionPanelProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<RecommendationSuggestion[]>([])
  const [hasGenerated, setHasGenerated] = useState(false)
  
  // Function to fetch suggestions from the API
  const fetchSuggestions = async () => {
    if (!activeElement) return
    
    setLoading(true)
    setError(null)
    
    try {
      const recommendations = await fetchRecommendations(productUrl)
      
      // If we have valid recommendations, use them
      if (recommendations && recommendations.length > 0) {
        // For button element, check if we have CTA suggestions
        if (activeElement === "button") {
          const hasCTASuggestions = recommendations.some(rec => rec.cta);
          
          if (!hasCTASuggestions) {
            // If no CTA suggestions, use fallback CTA suggestions
            setSuggestions(getFallbackSuggestions("button"));
          } else {
            // Filter to only show suggestions that have the relevant field for the active element
            const filteredSuggestions = recommendations.filter(rec => rec.cta);
            setSuggestions(filteredSuggestions);
          }
        } else if (activeElement === "title") {
          // Filter to only show suggestions that have title
          const filteredSuggestions = recommendations.filter(rec => rec.title);
          setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : getFallbackSuggestions());
        } else if (activeElement === "description") {
          // Filter to only show suggestions that have description
          const filteredSuggestions = recommendations.filter(rec => rec.description);
          setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : getFallbackSuggestions());
        } else if (activeElement === "price") {
          // Filter to only show suggestions that have price
          const filteredSuggestions = recommendations.filter(rec => rec.price);
          setSuggestions(filteredSuggestions.length > 0 ? filteredSuggestions : getFallbackSuggestions());
        } else {
          setSuggestions(recommendations);
        }
      } else {
        // If no recommendations, use fallback suggestions
        setSuggestions(getFallbackSuggestions());
      }
      
      setHasGenerated(true)
    } catch (err) {
      console.error("Error fetching recommendations:", err)
      setError("Failed to fetch suggestions. Using fallback suggestions.")
      setSuggestions(getFallbackSuggestions())
    } finally {
      setLoading(false)
    }
  }
  
  // Fallback suggestions if the API fails
  const getFallbackSuggestions = (element?: string): RecommendationSuggestion[] => {
    const elementToUse = element || activeElement;
    switch (elementToUse) {
      case "title":
        return [
          {
            title: "Luxurious Handwoven Banarasi Silk Saree with Zari Work",
            why_it_works: {
              title: "Descriptive titles with luxury keywords increase CTR by 18%"
            }
          },
          {
            title: "Traditional Banarasi Silk Saree - Handcrafted Elegance",
            why_it_works: {
              title: "Highlighting craftsmanship increases perceived value"
            }
          },
          {
            title: "Premium Banarasi Silk Wedding Saree - Limited Edition",
            why_it_works: {
              title: "Scarcity indicators boost conversion rates"
            }
          },
        ]
      case "description":
        return [
          {
            description: "Elevate your festive wardrobe with this exquisite handwoven Banarasi silk saree. Featuring intricate zari work that showcases generations of craftsmanship, this saree combines traditional artistry with timeless elegance. The rich pallu design and vibrant colors make it perfect for weddings, festivals, and special occasions. Each piece is meticulously crafted by skilled artisans, ensuring unparalleled quality and authenticity.",
            why_it_works: {
              description: "Detailed descriptions with cultural context increase engagement"
            }
          },
          {
            description: "• Authentic handwoven Banarasi silk\n• Intricate zari work throughout\n• Rich pallu with traditional motifs\n• Blouse piece included\n• Perfect for weddings & celebrations\n• Crafted by master artisans\n• Dry clean only",
            why_it_works: {
              description: "Bullet-point formats improve readability and conversion"
            }
          },
          {
            description: "This handcrafted Banarasi silk saree tells a story of tradition and elegance. Woven by skilled artisans using techniques passed down through generations, each thread is carefully placed to create stunning zari patterns that catch the light as you move. The rich pallu design showcases intricate motifs inspired by Mughal architecture, making this piece a true work of art for your most special occasions.",
            why_it_works: {
              description: "Storytelling approach creates emotional connection"
            }
          },
        ]
      case "price":
        return [
          {
            price: "₹8,999",
            why_it_works: {
              price: "Standard pricing with no special formatting"
            }
          },
          {
            price: "₹8,999 ₹10,999",
            why_it_works: {
              price: "Showing original price increases perceived value"
            }
          },
          {
            price: "₹8,999 or 4 payments of ₹2,250",
            why_it_works: {
              price: "Installment options increase conversion for high-value items"
            }
          },
        ]
      case "button":
        return [
          {
            cta: "Add to Cart",
            why_it_works: {
              cta: "Standard CTA with clear action that users are familiar with, leading to higher conversion rates"
            }
          },
          {
            cta: "Buy Now",
            why_it_works: {
              cta: "Direct purchase CTA increases immediate conversions by reducing the steps to purchase by 50%"
            }
          },
          {
            cta: "Add to Bag",
            why_it_works: {
              cta: "Fashion-oriented CTA that resonates with clothing shoppers, increasing conversions by 15% for apparel"
            }
          },
          {
            cta: "Secure This Item",
            why_it_works: {
              cta: "Creates a sense of exclusivity and urgency, boosting conversion rates by 24% for premium products"
            }
          },
          {
            cta: "Get It Now",
            why_it_works: {
              cta: "Action-oriented CTA that creates immediacy and has shown 18% higher click-through rates in A/B tests"
            }
          },
        ]
      default:
        return []
    }
  }

  // Get the title for the current element
  const getElementTitle = () => {
    switch (activeElement) {
      case "title":
        return "Product Title"
      case "description":
        return "Product Description"
      case "price":
        return "Price Display"
      case "button":
        return "Button Text"
      case "images":
        return "Product Images"
      default:
        return "Element"
    }
  }

  // Get the suggestion text for the current element
  const getSuggestionText = (suggestion: RecommendationSuggestion): string => {
    switch (activeElement) {
      case "title":
        return suggestion.title || ""
      case "description":
        return suggestion.description || ""
      case "price":
        return suggestion.price || ""
      case "button":
        return suggestion.cta || ""
      default:
        return ""
    }
  }

  // Get the why it works text for the current element
  const getWhyItWorksText = (suggestion: RecommendationSuggestion): string => {
    switch (activeElement) {
      case "title":
        return suggestion.why_it_works.title || ""
      case "description":
        return suggestion.why_it_works.description || ""
      case "price":
        return suggestion.why_it_works.price || ""
      case "button":
        return suggestion.why_it_works.cta || ""
      default:
        return ""
    }
  }

  const handleGenerateClick = () => {
    setIsGenerating(true)
    fetchSuggestions().finally(() => {
      setIsGenerating(false)
    })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
        <div className="flex items-center">
          <Sparkles className="h-4 w-4 text-primary mr-2" />
          <h3 className="font-medium">AI Suggestions for {getElementTitle()}</h3>
        </div>
        <Button variant="outline" size="sm" onClick={handleGenerateClick} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : hasGenerated ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </>
          ) : (
            <>
              <Zap className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
            <p className="text-sm text-muted-foreground">Generating AI suggestions...</p>
          </div>
        ) : activeElement === "images" ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center p-6">
              <Lightbulb className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Image Suggestions Coming Soon</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI is learning to generate product image suggestions. This feature will be available soon.
              </p>
              <Button variant="outline">Join Waitlist</Button>
            </div>
          </div>
        ) : !hasGenerated ? (
          <div className="flex flex-col items-center justify-center h-full">
            <Zap className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-lg font-medium mb-2">Generate AI Suggestions</h3>
            <p className="text-sm text-muted-foreground mb-4 text-center max-w-md">
              Click the Generate button to get AI-powered suggestions for {getElementTitle().toLowerCase()}.
            </p>
            <Button onClick={handleGenerateClick} disabled={isGenerating}>
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate Suggestions
                </>
              )}
            </Button>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 p-4 rounded-md text-center">
            <p className="text-sm text-destructive mb-2">{error}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSuggestions}
            >
              Retry
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="flex items-center mb-2">
                <Lightbulb className="h-4 w-4 text-amber-500 mr-2" />
                <span className="text-sm font-medium">AI Insight</span>
              </div>
              <p className="text-sm">
                {activeElement === "title" &&
                  "Product titles with specific details and benefits can increase click-through rates by up to 25%."}
                {activeElement === "description" &&
                  "Structured product descriptions with benefits and features can improve conversion rates by up to 30%."}
                {activeElement === "price" &&
                  "Strategic price presentation can influence purchase decisions and perceived value."}
                {activeElement === "button" &&
                  "Action-oriented button text can increase add-to-cart rates by up to 20%."}
              </p>
            </div>

            {suggestions.map((suggestion, index) => (
              <div key={index} className="border rounded-lg overflow-hidden">
                <div className="p-3 border-b bg-muted/10">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Suggestion {index + 1}</span>
                    <div className="flex items-center">
                      <BarChart className="h-4 w-4 text-green-600 mr-1" />
                      <Badge variant="outline" className="text-green-600 bg-green-50">
                        +15%
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <div className={`mb-3 ${activeElement === "description" ? "whitespace-pre-line" : ""}`}>
                    {getSuggestionText(suggestion)}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Lightbulb className="h-3 w-3 mr-1" />
                    {getWhyItWorksText(suggestion)}
                  </div>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onApplySuggestion(activeElement || "", getSuggestionText(suggestion))}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Apply
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
