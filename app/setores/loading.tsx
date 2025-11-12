import { TableSkeleton } from "@/components/skeletons/table-skeleton"

export default function SetoresLoading() {
  return (
    <div className="p-6 space-y-6">
      <TableSkeleton rows={6} columns={4} showHeader={true} showActions={true} />
    </div>
  )
}
