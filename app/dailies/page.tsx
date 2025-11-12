import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import DailiesVisualizacao from "@/components/dailies/dailies-visualizacao"

export const metadata: Metadata = {
  title: "SmartPonto - Dailies",
  description: "Visualização de dailies da equipe",
}

export default function DailiesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Dailies</h1>
        <p className="text-muted-foreground">
          Visualize as dailies da equipe para acompanhar o progresso e identificar impedimentos.
        </p>

        <DailiesVisualizacao />
      </div>
    </DashboardLayout>
  )
}
