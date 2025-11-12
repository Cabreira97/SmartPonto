import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import NotificacoesComponent from "@/components/notificacoes/notificacoes-component"

export const metadata: Metadata = {
  title: "SmartPonto - Notificações",
  description: "Suas notificações e alertas do sistema",
}

export default function NotificacoesPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Notificações</h1>
        </div>
        <NotificacoesComponent />
      </div>
    </DashboardLayout>
  )
}
