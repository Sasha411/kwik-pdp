"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  BeakerIcon,
  BarChart3,
  Package,
  Users,
  Tags,
  Settings,
  HelpCircle,
  User,
  ShoppingCart,
} from "lucide-react"
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <SidebarComponent>
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-2">
          <ShoppingCart className="h-6 w-6 text-kwik-blue" />
          <span className="text-xl font-bold">KwikPDP</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/tests")}>
              <Link href="/tests">
                <BeakerIcon className="mr-2 h-4 w-4" />
                <span>A/B Tests</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/results")}>
              <Link href="/results">
                <BarChart3 className="mr-2 h-4 w-4" />
                <span>Results</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/products")}>
              <Link href="/products">
                <Package className="mr-2 h-4 w-4" />
                <span>Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/audience")}>
              <Link href="/audience">
                <Users className="mr-2 h-4 w-4" />
                <span>Audience</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/pricing")}>
              <Link href="/pricing">
                <Tags className="mr-2 h-4 w-4" />
                <span>Pricing</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarSeparator />
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/kwikpass")}>
              <Link href="/kwikpass">
                <User className="mr-2 h-4 w-4" />
                <span>Kwikpass Integration</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/settings")}>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname.startsWith("/help")}>
              <Link href="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
      <SidebarFooter className="p-4">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-kwik-blue flex items-center justify-center text-white font-semibold">
            SM
          </div>
          <div>
            <p className="text-sm font-medium">Sarees Mantra</p>
            <p className="text-xs text-muted-foreground">Premium Plan</p>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </SidebarComponent>
  )
}
