"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { ChartPlaceholder } from "./chart-placeholder"

// Dynamically import the actual chart component with SSR disabled
const LineChartComponent = dynamic(() => import("./line-chart-component").then((mod) => mod.LineChartComponent), {
  ssr: false,
  loading: () => <ChartPlaceholder />,
})

interface LineChartProps {
  data: any[]
  lines: {
    dataKey: string
    name?: string
    stroke: string
    yAxisId?: string
    activeDot?: any
  }[]
  xAxisDataKey: string
  yAxes?: {
    id: string
    orientation: "left" | "right"
  }[]
  height?: number
}

export function LineChart(props: LineChartProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <ChartPlaceholder height={props.height} />
  }

  return <LineChartComponent {...props} />
}
