"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Filter, Search, Loader2, MapPin, Plus, X, LinkIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { fetchShopifyProducts, type ShopifyProduct } from "@/lib/shopify"

export default function CreateTestPage() {
  const [step, setStep] = useState(1)
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [nextCursor, setNextCursor] = useState<string | null>(null)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [trafficAllocation, setTrafficAllocation] = useState(50)
  const [geoTargets, setGeoTargets] = useState([
    { id: 1, type: "location", value: "Delhi NCR" },
    { id: 2, type: "referrer", value: "Instagram" }
  ])

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts()
  }, [])

  // Function to fetch products from Shopify API
  const fetchProducts = async (cursor?: string) => {
    try {
      setLoading(true)
      const response = await fetchShopifyProducts(10, cursor)
      
      if (cursor) {
        // Append products when loading more
        setProducts(prev => [...prev, ...response.products])
      } else {
        // Replace products on initial load
        setProducts(response.products)
      }
      
      setHasNextPage(response.pageInfo?.hasNextPage || false)
      setNextCursor(response.pageInfo?.endCursor || null)
      setError(null)
    } catch (err) {
      setError("Failed to load products. Please try again.")
      console.error("Error fetching products:", err)
    } finally {
      setLoading(false)
      setLoadingMore(false)
    }
  }

  // Function to load more products
  const loadMoreProducts = () => {
    if (nextCursor) {
      setLoadingMore(true)
      fetchProducts(nextCursor)
    }
  }

  // Filter products based on search term
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.product_type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const nextStep = () => {
    if (step === 3) {
      // Instead of going to step 4, redirect to the variant creator
      // We've already stored the selected product in localStorage
      window.location.href = "/tests/create/variant"
      return
    }
    setStep(step + 1)
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/tests">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Create New A/B Test</h2>
      </div>

      <div className="flex items-center space-x-2 mb-6">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            step >= 1 ? "bg-primary text-primary-foreground" : "border"
          }`}
        >
          1
        </div>
        <div className={`h-0.5 w-8 ${step >= 2 ? "bg-primary" : "bg-border"}`}></div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            step >= 2 ? "bg-primary text-primary-foreground" : "border"
          }`}
        >
          2
        </div>
        <div className={`h-0.5 w-8 ${step >= 3 ? "bg-primary" : "bg-border"}`}></div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            step >= 3 ? "bg-primary text-primary-foreground" : "border"
          }`}
        >
          3
        </div>
        <div className={`h-0.5 w-8 ${step >= 4 ? "bg-primary" : "bg-border"}`}></div>
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full ${
            step >= 4 ? "bg-primary text-primary-foreground" : "border"
          }`}
        >
          4
        </div>
      </div>

      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Select a Product</CardTitle>
            <p className="text-sm text-muted-foreground">Choose the product page you want to test</p>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-8" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>

            {loading && !loadingMore ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Loading products...</p>
              </div>
            ) : error ? (
              <div className="bg-destructive/10 p-4 rounded-md text-center">
                <p className="text-sm text-destructive">{error}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={() => fetchProducts()}
                >
                  Retry
                </Button>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-sm text-muted-foreground">No products found</p>
                    </div>
                  ) : (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className={`flex items-center justify-between p-4 border rounded-md cursor-pointer ${
                          selectedProduct === product.id ? "border-primary bg-primary/5" : ""
                        }`}
                        onClick={() => {
                          setSelectedProduct(product.id);
                          // Store the selected product in localStorage
                          try {
                            if (typeof window !== 'undefined') {
                              localStorage.setItem('selectedProduct', JSON.stringify(product));
                            }
                          } catch (error) {
                            console.error("Error storing product in localStorage:", error);
                          }
                        }}
                      >
                        <div className="flex items-center gap-4">
                          <img
                            src={product.image?.src || "/placeholder.svg"}
                            alt={product.title}
                            className="h-16 w-16 object-cover rounded-md"
                          />
                          <div>
                            <h3 className="font-medium">{product.title}</h3>
                            <div className="flex items-center gap-3 mt-1">
                              <p className="text-sm font-medium">₹{product.price}</p>
                              <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{product.product_type || "Product"}</span>
                            </div>
                          </div>
                        </div>
                        <RadioGroup value={selectedProduct?.toString() || ""} className="hidden">
                          <RadioGroupItem value={product.id.toString()} id={`product-${product.id}`} />
                        </RadioGroup>
                        <div
                          className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                            selectedProduct === product.id ? "border-primary bg-primary text-primary-foreground" : ""
                          }`}
                        >
                          {selectedProduct === product.id && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
                
                {hasNextPage && (
                  <div className="mt-4 text-center">
                    <Button 
                      variant="outline" 
                      onClick={loadMoreProducts}
                      disabled={loadingMore}
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading more...
                        </>
                      ) : (
                        "Load more products"
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" asChild>
              <Link href="/tests">Cancel</Link>
            </Button>
            <Button onClick={nextStep} disabled={!selectedProduct}>
              Continue
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Set Audience</CardTitle>
            <p className="text-sm text-muted-foreground">Define which users will see your test</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Devices</h3>
              <div className="flex flex-wrap gap-2">
                <Label className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer">
                  <Checkbox id="desktop" defaultChecked />
                  <span>Desktop</span>
                </Label>
                <Label className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer">
                  <Checkbox id="tablet" defaultChecked />
                  <span>Tablet</span>
                </Label>
                <Label className="flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer">
                  <Checkbox id="mobile" defaultChecked />
                  <span>Mobile</span>
                </Label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Geographic Targeting</h3>
                <Badge variant="outline" className="text-xs">
                  Est. 45% of traffic
                </Badge>
              </div>

              <div className="space-y-2">
                {geoTargets.map((target) => (
                  <div key={target.id} className="flex items-center gap-2 p-3 border rounded-md">
                    {target.type === "location" ? (
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm">{target.value}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="ml-auto h-6 w-6"
                      onClick={() => {
                        setGeoTargets(geoTargets.filter(t => t.id !== target.id));
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <Button
                  variant="outline"
                  className="w-full mt-2"
                  onClick={() => {
                    // In a real app, you'd show a modal or dropdown to select conditions
                    // For this example, we'll just add a new location
                    const newId = Math.max(0, ...geoTargets.map(t => t.id)) + 1;
                    setGeoTargets([...geoTargets, {
                      id: newId,
                      type: "location",
                      value: "Mumbai"
                    }]);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Condition
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium">Traffic Allocation</h3>
                <span className="text-sm font-medium">{trafficAllocation}%</span>
              </div>
              <Slider
                value={[trafficAllocation]}
                max={100}
                step={5}
                onValueChange={(value) => setTrafficAllocation(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Percentage of your traffic that will be included in this test
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>Continue</Button>
          </CardFooter>
        </Card>
      )}

      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Configure Test</CardTitle>
            <p className="text-sm text-muted-foreground">Set up the final details for your test</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="test-name">Test Name</Label>
              <Input id="test-name" placeholder="Handloom Saree Product Description Test" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="test-description">Description (Optional)</Label>
              <Textarea
                id="test-description"
                placeholder="Testing different product descriptions for our handloom saree collection"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="test-duration">Test Duration</Label>
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
                <Label htmlFor="primary-metric">Primary Metric</Label>
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

            <div className="pt-4 space-y-4">
              <h3 className="text-sm font-medium">Advanced Settings</h3>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="gokwik-tracking">GoKwik Conversion Tracking</Label>
                  <p className="text-xs text-muted-foreground">Track conversions through GoKwik checkout</p>
                </div>
                <Switch id="gokwik-tracking" defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-apply">Auto-apply Winner</Label>
                  <p className="text-xs text-muted-foreground">
                    Automatically apply winning variant when test concludes
                  </p>
                </div>
                <Switch id="auto-apply" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="significance">Significance Threshold</Label>
                <Select defaultValue="95">
                  <SelectTrigger id="significance">
                    <SelectValue placeholder="Select threshold" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">90%</SelectItem>
                    <SelectItem value="95">95%</SelectItem>
                    <SelectItem value="99">99%</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Minimum confidence level required to declare a winner</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t p-4">
            <Button variant="outline" onClick={prevStep}>
              Back
            </Button>
            <Button onClick={nextStep}>Continue to Create Variants</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
