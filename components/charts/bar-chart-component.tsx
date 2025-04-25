"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

interface BarChartComponentProps {
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

export function BarChartComponent({
  data,
  bars,
  xAxisDataKey,
  yAxisLabel,
  layout = "horizontal",
  height = 350,
}: BarChartComponentProps) {
  return (
    <div style={{ width: "100%", height: `${height}px` }}>
      <ResponsiveContainer>
        <BarChart data={data} layout={layout}>
          <CartesianGrid strokeDasharray="3 3" />
          {layout === "horizontal" ? (
            <>
              <XAxis dataKey={xAxisDataKey} />
              <YAxis label={yAxisLabel} />
            </>
          ) : (
            <>
              <XAxis type="number" />
              <YAxis dataKey={xAxisDataKey} type="category" />
            </>
          )}
          <Tooltip />
          <Legend />
          {bars.map((bar, index) => (
            <Bar key={index} dataKey={bar.dataKey} name={bar.name || bar.dataKey} fill={bar.fill} />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
