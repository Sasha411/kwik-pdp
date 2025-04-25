"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { ChartPlaceholder } from "./chart-placeholder"

// Dynamically import the actual chart component with SSR disabled
const PieChartComponent = dynamic(() => import("./pie-chart-component").then((mod) => mod.PieChartComponent), {
  ssr: false,
  loading: () => <ChartPlaceholder />,
})

interface PieChartProps {
  data: any[]
  dataKey: string
  nameKey?: string
  colors?: string[]
  height?: number
  outerRadius?: number
  label?: boolean | Function
  labelLine?: boolean
}

export function PieChart(props: PieChartProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <ChartPlaceholder height={props.height} />
  }

  return <PieChartComponent {...props} />
}
