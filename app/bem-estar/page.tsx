import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import BemEstarComponent from "@/components/bem-estar/bem-estar-component"

export const metadata: Metadata = {
  title: "SmartPonto - Bem-estar",
  description: "Acompanhamento de pausas e bem-estar no trabalho",
}

export default function BemEstarPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Bem-estar no Trabalho</h1>
        <p className="text-muted-foreground">
          Monitore suas pausas, receba dicas de ergonomia e cuide da sua saúde durante o expediente.
        </p>

        <BemEstarComponent />
      </div>
    </DashboardLayout>
  )
}
