"use client"

import { useEffect, useRef } from "react"
import { ChartWrapper } from "./chart-wrapper"

interface PieChartProps {
  data: any[]
  dataKey: string
  nameKey?: string
  colors?: string[]
  height?: number
}

export function PieChart({
  data,
  dataKey,
  nameKey = "name",
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
  height = 300,
}: PieChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Ensure we have data
    if (data.length === 0) return

    // Calculate total value
    const total = data.reduce((sum, item) => sum + (Number(item[dataKey]) || 0), 0) || 1

    // Set dimensions
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40

    // Draw pie
    let startAngle = 0

    data.forEach((item, i) => {
      const value = Number(item[dataKey]) || 0
      const sliceAngle = (value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.closePath()

      ctx.fillStyle = colors[i % colors.length]
      ctx.fill()

      // Add label
      const midAngle = startAngle + sliceAngle / 2
      const labelRadius = radius * 0.7
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      const percent = Math.round((value / total) * 100)

      ctx.fillStyle = "#fff"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(`${percent}%`, labelX, labelY)

      startAngle += sliceAngle
    })

    // Add legend
    const legendY = canvas.height - 30
    let legendX = centerX - (data.length * 80) / 2

    data.forEach((item, i) => {
      // Draw color box
      ctx.fillStyle = colors[i % colors.length]
      ctx.fillRect(legendX, legendY - 5, 10, 10)

      // Draw label
      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.textAlign = "left"
      ctx.fillText(String(item[nameKey] || ""), legendX + 15, legendY)

      legendX += 80
    })
  }, [data, dataKey, nameKey, colors])

  return (
    <ChartWrapper height={height}>
      <canvas ref={canvasRef} width={800} height={height} style={{ width: "100%", height: `${height}px` }} />
    </ChartWrapper>
  )
}
