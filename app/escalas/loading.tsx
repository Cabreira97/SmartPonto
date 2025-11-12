import { CalendarSkeleton } from "@/components/skeletons/calendar-skeleton"
import { TableSkeleton } from "@/components/skeletons/table-skeleton"

export default function EscalasLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CalendarSkeleton />
        <TableSkeleton rows={6} columns={3} showHeader={true} />
      </div>
    </div>
  )
}
