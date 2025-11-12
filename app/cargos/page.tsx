import DashboardLayout from "@/components/dashboard-layout"
import CargosComponent from "@/components/cargos/cargos-component"

export default function CargosPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Cargos</h1>
        <CargosComponent />
      </div>
    </DashboardLayout>
  )
}
