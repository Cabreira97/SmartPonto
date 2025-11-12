import { TableSkeleton } from "@/components/skeletons/table-skeleton"

export default function TarefasLoading() {
  return (
    <div className="p-6 space-y-6">
      <TableSkeleton rows={8} columns={5} showHeader={true} showActions={true} />
    </div>
  )
}
