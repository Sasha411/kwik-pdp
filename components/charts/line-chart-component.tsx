"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface LineChartComponentProps {
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

export function LineChartComponent({ data, lines, xAxisDataKey, yAxes, height = 350 }: LineChartComponentProps) {
  return (
    <div style={{ width: "100%", height: `${height}px` }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisDataKey} />
          {yAxes ? (
            yAxes.map((axis, index) => <YAxis key={index} yAxisId={axis.id} orientation={axis.orientation} />)
          ) : (
            <YAxis />
          )}
          <Tooltip />
          <Legend />
          {lines.map((line, index) => (
            <Line
              key={index}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name || line.dataKey}
              stroke={line.stroke}
              yAxisId={line.yAxisId || "left"}
              activeDot={line.activeDot || { r: 8 }}
              strokeWidth={2}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
