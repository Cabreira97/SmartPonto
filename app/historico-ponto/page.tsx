import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import HistoricoPontoComponent from "@/components/historico-ponto/historico-ponto-component"

export const metadata: Metadata = {
  title: "SmartPonto - Histórico de Ponto",
  description: "Visualize seu histórico completo de registros de ponto organizados por semana",
}

export default function HistoricoPontoPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold">Histórico de Ponto</h1>
          <p className="text-muted-foreground">
            Visualize seus registros de ponto organizados por semana, com detalhes de entrada, saída e horas
            trabalhadas.
          </p>
        </div>

        <HistoricoPontoComponent />
      </div>
    </DashboardLayout>
  )
}
