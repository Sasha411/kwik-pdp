export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="h-8 w-64 bg-muted/20 animate-pulse rounded-md mb-6 mx-auto"></div>

      <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-[500px] bg-muted/20 animate-pulse rounded-md"></div>
          ))}
      </div>
    </div>
  )
}
