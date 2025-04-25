"use client"

import { useEffect, useState, type ReactNode } from "react"

interface ChartWrapperProps {
  children: ReactNode
  height?: number
}

export function ChartWrapper({ children, height = 350 }: ChartWrapperProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setIsMounted(true)
    } catch (err) {
      console.error("Error in ChartWrapper:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }, [])

  if (error) {
    return (
      <div
        className="w-full bg-red-100 rounded-md flex items-center justify-center text-red-600"
        style={{ height: `${height}px` }}
      >
        <span>Chart error: {error}</span>
      </div>
    )
  }

  if (!isMounted) {
    return (
      <div
        className="w-full bg-muted/20 animate-pulse rounded-md flex items-center justify-center text-muted-foreground"
        style={{ height: `${height}px` }}
      >
        <span>Chart loading...</span>
      </div>
    )
  }

  return <div style={{ height: `${height}px`, width: "100%" }}>{children}</div>
}
