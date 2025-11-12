import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import ConfiguracoesForm from "@/components/configuracoes/configuracoes-form"

export const metadata: Metadata = {
  title: "SmartPonto - Configurações",
  description: "Configurações do sistema",
}

export default function ConfiguracoesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">Personalize o sistema de acordo com suas preferências e necessidades.</p>

        <ConfiguracoesForm />
      </div>
    </DashboardLayout>
  )
}
