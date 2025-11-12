import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface TableSkeletonProps {
  rows?: number
  columns?: number
  showHeader?: boolean
  showActions?: boolean
}

export function TableSkeleton({ rows = 5, columns = 4, showHeader = true, showActions = true }: TableSkeletonProps) {
  return (
    <Card>
      {showHeader && (
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="flex space-x-2">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent>
        {/* Table Header */}
        <div className="grid grid-cols-4 gap-4 pb-4 border-b">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-20" />
          ))}
          {showActions && <Skeleton className="h-4 w-16" />}
        </div>

        {/* Table Rows */}
        <div className="space-y-4 pt-4">
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4 items-center">
              {Array.from({ length: columns }).map((_, j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
              {showActions && (
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
