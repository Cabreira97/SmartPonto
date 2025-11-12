import { FormSkeleton } from "@/components/skeletons/form-skeleton"

export default function ConfiguracoesLoading() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <FormSkeleton fields={5} showHeader={true} showActions={true} />
        <FormSkeleton fields={4} showHeader={true} showActions={true} />
      </div>
    </div>
  )
}
