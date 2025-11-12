import { ChartSkeleton } from "@/components/skeletons/chart-skeleton"
import { TableSkeleton } from "@/components/skeletons/table-skeleton"

export default function RelatoriosLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <TableSkeleton rows={8} columns={6} showHeader={true} showActions={false} />
    </div>
  )
}
