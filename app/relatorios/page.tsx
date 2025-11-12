import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import RelatoriosHeader from "@/components/relatorios/relatorios-header"
import RelatoriosTabs from "@/components/relatorios/relatorios-tabs"

export const metadata: Metadata = {
  title: "SmartPonto - Relatórios",
  description: "Relatórios e estatísticas do sistema de ponto",
}

export default function RelatoriosPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Relatórios</h1>

        <RelatoriosHeader />
        <RelatoriosTabs />
      </div>
    </DashboardLayout>
  )
}
