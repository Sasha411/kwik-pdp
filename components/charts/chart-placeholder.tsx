export function ChartPlaceholder({ height = 350 }: { height?: number }) {
  return (
    <div
      className="w-full bg-muted/20 animate-pulse rounded-md flex items-center justify-center text-muted-foreground"
      style={{ height: `${height}px` }}
    >
      <span>Chart loading...</span>
    </div>
  )
}
