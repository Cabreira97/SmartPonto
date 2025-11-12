import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import HistoricoAtividadesComponent from "@/components/perfil/historico-atividades-component"

export const metadata: Metadata = {
  title: "SmartPonto - Histórico de Atividades",
  description: "Visualize o histórico completo de suas atividades no sistema",
}

export default function HistoricoAtividadesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Histórico de Atividades</h1>
        <p className="text-muted-foreground">
          Visualize todas as suas atividades registradas no sistema, incluindo registros de ponto, solicitações e
          dailies.
        </p>

        <HistoricoAtividadesComponent />
      </div>
    </DashboardLayout>
  )
}
