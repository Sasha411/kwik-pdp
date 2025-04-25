"use client"

import { useEffect, useRef, useState } from "react"
import { ChartWrapper } from "./chart-wrapper"

interface LineChartProps {
  data: any[]
  lines: {
    dataKey: string
    name?: string
    stroke: string
  }[]
  xAxisDataKey: string
  height?: number
}

export function LineChart({ data, lines, xAxisDataKey, height = 350 }: LineChartProps) {
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

    // Ensure we have data
    if (data.length === 0) return

    const pointCount = data.length
    const pointWidth = chartWidth / (pointCount > 1 ? pointCount - 1 : 1)

    // Find max value for scaling
    let maxValue = 0
    data.forEach((item) => {
      lines.forEach((line) => {
        const value = Number(item[line.dataKey]) || 0
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

    // Draw lines
    lines.forEach((line) => {
      ctx.beginPath()

      data.forEach((item, i) => {
        const value = Number(item[line.dataKey]) || 0
        const x = padding + i * pointWidth
        const y = canvas.height - padding - (value / maxValue) * chartHeight

        if (i === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })

      ctx.strokeStyle = line.stroke
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw points
      data.forEach((item, i) => {
        const value = Number(item[line.dataKey]) || 0
        const x = padding + i * pointWidth
        const y = canvas.height - padding - (value / maxValue) * chartHeight

        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fillStyle = line.stroke
        ctx.fill()
      })
    })

    // Add x-axis labels
    data.forEach((item, i) => {
      const x = padding + i * pointWidth
      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(String(item[xAxisDataKey] || ""), x, canvas.height - padding + 15)
    })

    // Add legend
    const legendY = padding / 2
    let legendX = padding

    lines.forEach((line) => {
      // Draw color line
      ctx.beginPath()
      ctx.moveTo(legendX, legendY)
      ctx.lineTo(legendX + 10, legendY)
      ctx.strokeStyle = line.stroke
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw point
      ctx.beginPath()
      ctx.arc(legendX + 5, legendY, 3, 0, Math.PI * 2)
      ctx.fillStyle = line.stroke
      ctx.fill()

      // Draw label
      ctx.fillStyle = "#000"
      ctx.font = "10px Arial"
      ctx.textAlign = "left"
      const label = line.name || line.dataKey
      ctx.fillText(label, legendX + 15, legendY + 3)

      legendX += ctx.measureText(label).width + 40
    })
    } catch (err) {
      console.error("Error rendering LineChart:", err)
      setError(err instanceof Error ? err.message : "Unknown error")
    }
  }, [data, lines, xAxisDataKey])

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
