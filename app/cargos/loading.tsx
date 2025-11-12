import { TableSkeleton } from "@/components/skeletons/table-skeleton"
import { FormSkeleton } from "@/components/skeletons/form-skeleton"

export default function CargosLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TableSkeleton rows={6} columns={4} showHeader={true} showActions={true} />
        </div>
        <div>
          <FormSkeleton fields={8} showHeader={true} showActions={true} />
        </div>
      </div>
    </div>
  )
}
