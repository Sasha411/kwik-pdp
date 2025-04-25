export default function Loading() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="h-8 w-64 bg-muted/20 animate-pulse rounded-md mb-6"></div>

      <div className="h-8 w-full max-w-md bg-muted/20 animate-pulse rounded-md mb-6"></div>

      <div className="h-[600px] bg-muted/20 animate-pulse rounded-md"></div>
    </div>
  )
}
