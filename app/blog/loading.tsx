export default function BlogLoading() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header Skeleton */}
        <div className="text-center space-y-4">
          <div className="animate-pulse">
            <div className="h-10 bg-muted rounded w-32 mx-auto mb-2"></div>
            <div className="h-6 bg-muted rounded w-48 mx-auto"></div>
          </div>
        </div>

        {/* Filters Skeleton */}
        <div className="space-y-6">
          {/* Search Input Skeleton */}
          <div className="flex justify-center">
            <div className="animate-pulse h-10 bg-muted rounded w-full max-w-md"></div>
          </div>

          {/* Tag Filter Skeleton */}
          <div className="flex justify-center">
            <div className="animate-pulse h-10 bg-muted rounded w-full max-w-2xl"></div>
          </div>
        </div>

        {/* Category Tabs Skeleton */}
        <div className="flex justify-center">
          <div className="animate-pulse h-10 bg-muted rounded w-full max-w-md"></div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-64 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 