export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="h-8 w-64 bg-muted/20 animate-pulse rounded-md mb-6"></div>

      <div className="h-10 w-96 bg-muted/20 animate-pulse rounded-md mb-6"></div>

      <div className="h-[500px] bg-muted/20 animate-pulse rounded-md mb-6"></div>

      <div className="grid gap-4 md:grid-cols-2">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="h-80 bg-muted/20 animate-pulse rounded-md"></div>
          ))}
      </div>
    </div>
  )
}
