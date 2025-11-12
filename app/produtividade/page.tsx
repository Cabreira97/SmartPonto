import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import ProdutividadeIndividual from "@/components/produtividade/produtividade-individual"

export const metadata: Metadata = {
  title: "SmartPonto - Produtividade Individual",
  description: "Acompanhamento de métricas e produtividade individual",
}

export default function ProdutividadePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Produtividade Individual</h1>
        <p className="text-muted-foreground">
          Acompanhe suas métricas de produtividade, pontualidade e desempenho ao longo do tempo.
        </p>

        <ProdutividadeIndividual />
      </div>
    </DashboardLayout>
  )
}
