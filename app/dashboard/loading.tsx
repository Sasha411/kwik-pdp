export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="h-8 w-48 bg-muted/20 animate-pulse rounded-md mb-6"></div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-24 bg-muted/20 animate-pulse rounded-md"></div>
          ))}
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-6">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-80 bg-muted/20 animate-pulse rounded-md"></div>
          ))}
      </div>

      <div className="h-8 w-36 bg-muted/20 animate-pulse rounded-md mt-6 mb-4"></div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-40 bg-muted/20 animate-pulse rounded-md"></div>
          ))}
      </div>
    </div>
  )
}
