"use client"

import { useEffect, useRef, useState } from "react"
import { ChartWrapper } from "./chart-wrapper"

interface BarChartProps {
  data: any[]
  bars: {
    dataKey: string
    name?: string
    fill: string
  }[]
  xAxisDataKey: string
  height?: number
}

export function BarChart({ data, bars, xAxisDataKey, height = 350 }: BarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      
      const canvas = canvasRef.current
      if (!canvas) {
        console.error("Canvas element not found")
        setError("Canvas element not found")
        return
      }

      const ctx = canvas.getContext("2d")
      if (!ctx) {
        console.error("Could not get 2D context from canvas")
        setError("Could not get 2D context from canvas")
        return
      }

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Set dimensions
    const padding = 40
    const chartWidth = canvas.width - padding * 2
    const chartHeight = canvas.height - padding * 2
    const barCount = data.length
    const groupWidth = chartWidth / barCount
    const barWidth = (groupWidth / (bars.length + 1)) * 0.8

    // Find max value for scaling
    let maxValue = 0
    data.forEach((item) => {
      bars.forEach((bar) => {
        const value = Number(item[bar.dataKey]) || 0
        if (value > maxValue) maxValue = value
      })
    })

    // Ensure we have a non-zero max value
    maxValue = maxValue || 1

    // Draw axes
    ctx.beginPath()
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, canvas.height - padding)
    ctx.lineTo(canvas.width - padding, canvas.height - padding)
    ctx.strokeStyle = "#ccc"
    ctx.stroke()

    // Draw bars
    data.forEach((item, i) => {
      bars.forEach((bar, j) => {
        const value = Number(item[bar.dataKey]) || 0
        const barHeight = (value / maxValue) * chartHeight
        const x = padding + i * groupWidth + (j + 0.5) * barWidth
        const y = canvas.height - padding - barHeight

        ctx.fillStyle = bar.fill
        ctx.fillRect(x, y, barWidth, barHeight)

        // Add value on top of bar
        ctx.fillStyle = "#000"
        ctx.font = "10px Arial"
        ctx.textAlign = "center"
        ctx.fillText(value.toString(), x + barWidth / 2, y - 5)
      })

      // Add x-axis label
      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(
        String(item[xAxisDataKey] || ""),
        padding + i * groupWidth + groupWidth / 2,
        canvas.height - padding + 15,
      )
    })

    // Add legend
    const legendY = padding / 2
    let legendX = padding
    bars.forEach((bar) => {
      // Draw color box
      ctx.fillStyle = bar.fill
      ctx.fillRect(legendX, legendY - 5, 10, 10)

      // Draw label
      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.textAlign = "left"
      const label = bar.name || bar.dataKey
      ctx.fillText(label, legendX + 15, legendY)

      legendX += ctx.measureText(label).width + 40
    })
    
    } catch (err) {
      console.error("Error rendering BarChart:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }, [data, bars, xAxisDataKey])

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

  return (
    <ChartWrapper height={height}>
      <canvas ref={canvasRef} width={800} height={height} style={{ width: "100%", height: `${height}px` }} />
    </ChartWrapper>
  )
}
