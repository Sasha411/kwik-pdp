import Image from "next/image"
import { ArrowUpDown, ChevronDown, Filter, MoreHorizontal, PlusCircle, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Dummy product data for Indian D2C brand
const products = [
  {
    id: "PROD-1001",
    name: "Banarasi Silk Saree",
    image: "/placeholder.svg?height=80&width=80",
    price: "₹8,999",
    status: "Active Test",
    inventory: 42,
    conversion: "4.8%",
    testStatus: "active",
  },
  {
    id: "PROD-1002",
    name: "Chanderi Cotton Saree",
    image: "/placeholder.svg?height=80&width=80",
    price: "₹3,499",
    status: "Active Test",
    inventory: 78,
    conversion: "5.2%",
    testStatus: "active",
  },
  {
    id: "PROD-1003",
    name: "Kanjivaram Silk Saree",
    image: "/placeholder.svg?height=80&width=80",
    price: "₹12,999",
    status: "Active Test",
    inventory: 24,
    conversion: "3.9%",
    testStatus: "active",
  },
  {
    id: "PROD-1004",
    name: "Mysore Silk Saree",
    image: "/placeholder.svg?height=80&width=80",
    price: "₹6,999",
    status: "Not Tested",
    inventory: 56,
    conversion: "2.1%",
    testStatus: "not-tested",
  },
  {
    id: "PROD-1005",
    name: "Bhagalpuri Silk Saree",
    image: "/placeholder.svg?height=80&width=80",
    price: "₹4,999",
    status: "Test Complete",
    inventory: 32,
    conversion: "6.7%",
    testStatus: "complete",
  },
  {
    id: "PROD-1006",
    name: "Tussar Silk Saree",
    image: "/placeholder.svg?height=80&width=80",
    price: "₹7,499",
    status: "Not Tested",
    inventory: 18,
    conversion: "1.9%",
    testStatus: "not-tested",
  },
  {
    id: "PROD-1007",
    name: "Patola Silk Saree",
    image: "/placeholder.svg?height=80&width=80",
    price: "₹18,999",
    status: "Test Complete",
    inventory: 8,
    conversion: "7.2%",
    testStatus: "complete",
  },
  {
    id: "PROD-1008",
    name: "Paithani Silk Saree",
    image: "/placeholder.svg?height=80&width=80",
    price: "₹15,499",
    status: "Not Tested",
    inventory: 14,
    conversion: "2.8%",
    testStatus: "not-tested",
  },
]

export default function ProductsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <div className="flex items-center space-x-2">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Test
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <div className="relative w-full md:w-[300px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-8" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 px-3">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Active Tests</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Test Complete</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem checked>Not Tested</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Inventory</TableHead>
                <TableHead className="hidden md:table-cell">
                  <div className="flex items-center space-x-1">
                    <span>Conversion</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="rounded-md object-cover"
                      />
                      <div className="font-medium">{product.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.testStatus === "active"
                          ? "default"
                          : product.testStatus === "complete"
                            ? "outline"
                            : "secondary"
                      }
                    >
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.inventory}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span
                      className={
                        Number.parseFloat(product.conversion) > 5
                          ? "text-kwik-green font-medium"
                          : Number.parseFloat(product.conversion) < 3
                            ? "text-kwik-red font-medium"
                            : ""
                      }
                    >
                      {product.conversion}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>
                          {product.testStatus === "active"
                            ? "View test"
                            : product.testStatus === "not-tested"
                              ? "Create test"
                              : "View results"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit product</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-4">
          <div className="text-xs text-muted-foreground">
            Showing <strong>8</strong> of <strong>120</strong> products
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-xs text-muted-foreground">Page 1 of 15</div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" className="h-8 w-8 p-0" disabled>
                <span className="sr-only">Go to previous page</span>
                <ChevronDown className="h-4 w-4 rotate-90" />
              </Button>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Go to next page</span>
                <ChevronDown className="h-4 w-4 -rotate-90" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
