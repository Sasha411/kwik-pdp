"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"

interface PieChartComponentProps {
  data: any[]
  dataKey: string
  nameKey?: string
  colors?: string[]
  height?: number
  outerRadius?: number
  label?: boolean | Function
  labelLine?: boolean
}

export function PieChartComponent({
  data,
  dataKey,
  nameKey,
  colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"],
  height = 300,
  outerRadius = 100,
  label = true,
  labelLine = false,
}: PieChartComponentProps) {
  const renderLabel =
    label === true
      ? ({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`
      : label

  return (
    <div style={{ width: "100%", height: `${height}px` }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={labelLine}
            outerRadius={outerRadius}
            fill="#8884d8"
            dataKey={dataKey}
            nameKey={nameKey}
            label={renderLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
