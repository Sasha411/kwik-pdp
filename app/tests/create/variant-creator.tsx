"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Sparkles, Layers, LayoutGrid, ImageIcon, Plus, Check, Wand2, Loader2 } from "lucide-react"
import { ShopifyProduct } from "@/lib/shopify"
import { shopifyConfig } from "@/lib/config"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Switch } from "@/components/ui/switch"

import { AiSuggestionPanel } from "./ai-suggestion-panel"
import { WidgetSuggestionPanel } from "./widget-suggestion-panel"

export default function VariantCreator() {
  const [activeElement, setActiveElement] = useState<string | null>("title")
  const [showAiPanel, setShowAiPanel] = useState(true)
  const [showWidgetPanel, setShowWidgetPanel] = useState(false)
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null)
  const [productUrl, setProductUrl] = useState("")

  // Product data state
  const [productTitle, setProductTitle] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [productPrice, setProductPrice] = useState("")
  const [productImage, setProductImage] = useState<string | null>(null)
  const [buttonText, setButtonText] = useState("Add to Cart")
  const [buttonColor, setButtonColor] = useState("#000000")

  // Generate product URL from handle
  const generateProductUrl = (handle: string): string => {
    return `${shopifyConfig.storeUrl}/products/${handle}`;
  }

  // Load selected product from localStorage
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const storedProduct = localStorage.getItem('selectedProduct');
        if (storedProduct) {
          const product = JSON.parse(storedProduct) as ShopifyProduct;
          setSelectedProduct(product);
          
          // Set product data
          setProductTitle(product.title);
          setProductDescription(product.body_html || product.product_type || "Exquisite product with premium quality materials.");
          setProductPrice(`₹${product.price}`);
          setProductImage(product.image?.src || null);
          
          // Set product URL
          const url = generateProductUrl(product.handle);
          setProductUrl(url);
        }
      }
    } catch (error) {
      console.error("Error loading product from localStorage:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Handle element click in the visual editor
  const handleElementClick = (element: string) => {
    setActiveElement(element)
    setShowAiPanel(true)
    setShowWidgetPanel(false)
  }

  // Apply AI suggestion
  const applyAiSuggestion = (type: string, value: string) => {
    switch (type) {
      case "title":
        setProductTitle(value)
        break
      case "description":
        setProductDescription(value)
        break
      case "price":
        setProductPrice(value)
        break
      case "button":
        setButtonText(value)
        break
    }
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/tests/create">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h2 className="text-3xl font-bold tracking-tight">Create Variants</h2>
      </div>
      <p className="text-muted-foreground">Customize the elements you want to test</p>

      <div className="flex items-center space-x-2 mb-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">1</div>
        <div className="h-0.5 w-8 bg-muted"></div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">2</div>
        <div className="h-0.5 w-8 bg-muted"></div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground">3</div>
        <div className="h-0.5 w-8 bg-primary"></div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          4
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Create Variants</CardTitle>
            <div className="flex items-center gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={showAiPanel ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setShowAiPanel(!showAiPanel)
                        if (!showAiPanel) setShowWidgetPanel(false)
                      }}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      AI Suggestions
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get AI-powered suggestions for product elements</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant={showWidgetPanel ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        setShowWidgetPanel(!showWidgetPanel)
                        if (!showWidgetPanel) setShowAiPanel(false)
                      }}
                    >
                      <LayoutGrid className="mr-2 h-4 w-4" />
                      Widget Suggestions
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Get suggestions for widgets to increase AOV</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visual">
            <TabsList className="mb-4">
              <TabsTrigger value="visual">Visual Editor</TabsTrigger>
              <TabsTrigger value="preview">Preview</TabsTrigger>
            </TabsList>

            <div
              className="grid gap-6"
              style={{ gridTemplateColumns: showAiPanel || showWidgetPanel ? "3fr 2fr" : "1fr" }}
            >
              <TabsContent value="visual" className="space-y-4 mt-0">
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 border rounded-lg p-6">
                    <div className="border rounded-lg h-full flex flex-col">
                      {/* Product Images */}
                      {loading ? (
                        <div className="border-b p-6 flex flex-col items-center justify-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                          <p className="text-sm text-muted-foreground">Loading product...</p>
                        </div>
                      ) : (
                        <div
                          className={`border-b p-6 cursor-pointer ${activeElement === "images" ? "bg-muted/30 border-primary" : ""}`}
                          onClick={() => handleElementClick("images")}
                        >
                          <div className="flex justify-center mb-4">
                            {productImage ? (
                              <img
                                src={productImage}
                                alt={productTitle}
                                className="w-64 h-64 object-contain rounded-md"
                              />
                            ) : (
                              <div className="w-64 h-64 bg-muted rounded-md flex items-center justify-center">
                                <ImageIcon className="h-12 w-12 text-muted-foreground" />
                              </div>
                            )}
                          </div>
                          <div className="flex justify-center gap-2">
                            <div className="w-16 h-16 bg-muted rounded-md"></div>
                            <div className="w-16 h-16 bg-muted rounded-md"></div>
                            <div className="w-16 h-16 bg-muted rounded-md"></div>
                          </div>
                        </div>
                      )}

                      {/* Product Title */}
                      <div
                        className={`border-b p-6 cursor-pointer ${activeElement === "title" ? "bg-muted/30 border-primary" : ""}`}
                        onClick={() => handleElementClick("title")}
                      >
                        <h2 className="text-2xl font-bold">{productTitle}</h2>
                      </div>

                      {/* Product Price */}
                      <div
                        className={`border-b p-6 cursor-pointer ${activeElement === "price" ? "bg-muted/30 border-primary" : ""}`}
                        onClick={() => handleElementClick("price")}
                      >
                        <div className="text-2xl font-bold">{productPrice}</div>
                        {/* <div className="text-sm text-green-600">Save ₹2,000 (20% OFF)</div> */}
                      </div>

                      {/* Product Description */}
                      <div
                        className={`border-b p-6 cursor-pointer ${activeElement === "description" ? "bg-muted/30 border-primary" : ""}`}
                        onClick={() => handleElementClick("description")}
                      >
                        <div
                          className="text-gray-700"
                          dangerouslySetInnerHTML={{ __html: productDescription }}
                        />
                      </div>

                      {/* Add to Cart Button */}
                      <div
                        className={`p-6 cursor-pointer ${activeElement === "button" ? "bg-muted/30 border-primary" : ""}`}
                        onClick={() => handleElementClick("button")}
                      >
                        <button
                          className="w-full py-2 px-4 rounded-md text-white font-medium"
                          style={{ backgroundColor: buttonColor }}
                        >
                          {buttonText}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-6">
                    <h3 className="text-lg font-medium mb-4">Element Properties</h3>

                    {activeElement === "title" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-title">Product Title</Label>
                          <Input
                            id="product-title"
                            value={productTitle}
                            onChange={(e) => setProductTitle(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Title Style</Label>
                          <Select defaultValue="default">
                            <SelectTrigger>
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="default">Default</SelectItem>
                              <SelectItem value="elegant">Elegant</SelectItem>
                              <SelectItem value="bold">Bold</SelectItem>
                              <SelectItem value="minimal">Minimal</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button variant="outline" size="sm" className="w-full">
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate AI Variations
                        </Button>
                      </div>
                    )}

                    {activeElement === "description" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-description">Product Description</Label>
                          <Textarea
                            id="product-description"
                            value={productDescription}
                            onChange={(e) => setProductDescription(e.target.value)}
                            rows={5}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Description Style</Label>
                          <Select defaultValue="detailed">
                            <SelectTrigger>
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="detailed">Detailed</SelectItem>
                              <SelectItem value="concise">Concise</SelectItem>
                              <SelectItem value="benefits">Benefits-focused</SelectItem>
                              <SelectItem value="storytelling">Storytelling</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button variant="outline" size="sm" className="w-full">
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate AI Variations
                        </Button>
                      </div>
                    )}

                    {activeElement === "price" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="product-price">Product Price</Label>
                          <Input
                            id="product-price"
                            value={productPrice}
                            onChange={(e) => setProductPrice(e.target.value)}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Price Display</Label>
                          <Select defaultValue="discount">
                            <SelectTrigger>
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="simple">Regular Price</SelectItem>
                              <SelectItem value="discount">Show Discount</SelectItem>
                              <SelectItem value="strikethrough">Strikethrough</SelectItem>
                              <SelectItem value="installment">Show Installments</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch id="show-discount" defaultChecked />
                          <Label htmlFor="show-discount">Show Discount Badge</Label>
                        </div>
                      </div>
                    )}

                    {activeElement === "button" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="button-text">Button Text</Label>
                          <Input id="button-text" value={buttonText} onChange={(e) => setButtonText(e.target.value)} />
                        </div>

                        <div className="space-y-2">
                          <Label>Button Color</Label>
                          <div className="grid grid-cols-4 gap-2">
                            <div
                              className="h-8 rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
                              style={{ backgroundColor: "#000000" }}
                              onClick={() => setButtonColor("#000000")}
                            ></div>
                            <div
                              className="h-8 rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
                              style={{ backgroundColor: "#0ea5e9" }}
                              onClick={() => setButtonColor("#0ea5e9")}
                            ></div>
                            <div
                              className="h-8 rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
                              style={{ backgroundColor: "#22c55e" }}
                              onClick={() => setButtonColor("#22c55e")}
                            ></div>
                            <div
                              className="h-8 rounded-md cursor-pointer border-2 border-transparent hover:border-primary"
                              style={{ backgroundColor: "#ef4444" }}
                              onClick={() => setButtonColor("#ef4444")}
                            ></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Button Style</Label>
                          <Select defaultValue="solid">
                            <SelectTrigger>
                              <SelectValue placeholder="Select style" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="solid">Solid</SelectItem>
                              <SelectItem value="outline">Outline</SelectItem>
                              <SelectItem value="soft">Soft</SelectItem>
                              <SelectItem value="ghost">Ghost</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button variant="outline" size="sm" className="w-full">
                          <Wand2 className="mr-2 h-4 w-4" />
                          Generate AI Variations
                        </Button>
                      </div>
                    )}

                    {activeElement === "images" && (
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label>Image URL</Label>
                          <Input placeholder="https://example.com/image.jpg" />
                        </div>

                        <div className="space-y-2">
                          <Label>Image Layout</Label>
                          <Select defaultValue="grid">
                            <SelectTrigger>
                              <SelectValue placeholder="Select layout" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="grid">Grid Layout</SelectItem>
                              <SelectItem value="slider">Slider</SelectItem>
                              <SelectItem value="stacked">Stacked</SelectItem>
                              <SelectItem value="zoom">Zoom on Hover</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Switch id="show-thumbnails" defaultChecked />
                          <Label htmlFor="show-thumbnails">Show Thumbnails</Label>
                        </div>
                      </div>
                    )}

                    <Button variant="outline" size="sm" className="w-full mt-4">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Element
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-4">
                  <Button variant="outline" size="sm">
                    <Layers className="mr-2 h-4 w-4" />
                    Layers
                  </Button>
                  <Button variant="outline" size="sm">
                    <LayoutGrid className="mr-2 h-4 w-4" />
                    Layout
                  </Button>
                  <Button variant="outline" size="sm" className="ml-auto">
                    Reset
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="mt-0">
                <div className="border rounded-lg p-6 min-h-[600px]">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                      <p className="text-sm text-muted-foreground">Loading product preview...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col h-full">
                      <div className="flex justify-center mb-4">
                        {productImage ? (
                          <img
                            src={productImage}
                            alt={productTitle}
                            className="w-64 h-64 object-contain rounded-md"
                          />
                        ) : (
                          <div className="w-64 h-64 bg-muted rounded-md flex items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center gap-2 mb-6">
                        <div className="w-16 h-16 bg-muted rounded-md"></div>
                        <div className="w-16 h-16 bg-muted rounded-md"></div>
                        <div className="w-16 h-16 bg-muted rounded-md"></div>
                      </div>

                    <h2 className="text-2xl font-bold mb-2">{productTitle}</h2>
                    <div className="mb-4">
                      <div className="text-2xl font-bold">{productPrice}</div>
                      {/* <div className="text-sm text-green-600">Save ₹2,000 (20% OFF)</div> */}
                    </div>

                    <div
                      className="text-gray-700 mb-6"
                      dangerouslySetInnerHTML={{ __html: productDescription }}
                    />

                    <button
                      className="w-full py-2 px-4 rounded-md text-white font-medium"
                      style={{ backgroundColor: buttonColor }}
                    >
                      {buttonText}
                    </button>
                  </div>
                )}
                </div>
              </TabsContent>

              {showAiPanel && (
                <div className="border rounded-lg">
                  <AiSuggestionPanel
                    activeElement={activeElement}
                    onApplySuggestion={applyAiSuggestion}
                    productUrl={productUrl}
                  />
                </div>
              )}

              {showWidgetPanel && (
                <div className="border rounded-lg">
                  <WidgetSuggestionPanel />
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4">
          <Button variant="outline" asChild>
            <Link href="/tests/create">Back</Link>
          </Button>
          <Button>
            <Check className="mr-2 h-4 w-4" />
            Save Variant
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
