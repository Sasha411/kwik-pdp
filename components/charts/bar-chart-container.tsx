"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { ChartPlaceholder } from "./chart-placeholder"

// Dynamically import the actual chart component with SSR disabled
const BarChartComponent = dynamic(() => import("./bar-chart-component").then((mod) => mod.BarChartComponent), {
  ssr: false,
  loading: () => <ChartPlaceholder />,
})

interface BarChartProps {
  data: any[]
  bars: {
    dataKey: string
    name?: string
    fill: string
  }[]
  xAxisDataKey: string
  yAxisLabel?: {
    value: string
    angle: number
    position: "insideLeft" | "insideRight" | "insideTop" | "insideBottom"
  }
  layout?: "horizontal" | "vertical"
  height?: number
}

export function BarChart(props: BarChartProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <ChartPlaceholder height={props.height} />
  }

  return <BarChartComponent {...props} />
}
