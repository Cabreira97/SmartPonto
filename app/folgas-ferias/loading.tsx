import { CalendarSkeleton } from "@/components/skeletons/calendar-skeleton"
import { TableSkeleton } from "@/components/skeletons/table-skeleton"

export default function FolgasFeriasLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CalendarSkeleton />
        </div>
        <div>
          <TableSkeleton rows={5} columns={2} showHeader={true} showActions={false} />
        </div>
      </div>
    </div>
  )
}
