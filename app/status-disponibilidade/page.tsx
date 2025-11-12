import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import StatusDisponibilidadeComponent from "@/components/status-disponibilidade/status-disponibilidade-page"

export const metadata: Metadata = {
  title: "SmartPonto - Status de Disponibilidade",
  description: "Visualize o status de disponibilidade dos funcionários",
}

export default function StatusDisponibilidadePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Status de Disponibilidade</h1>
        <p className="text-muted-foreground">
          Visualize quem está de folga, férias ou licença e evite interrupções desnecessárias.
        </p>

        <StatusDisponibilidadeComponent />
      </div>
    </DashboardLayout>
  )
}
