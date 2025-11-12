import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import AprovacoesComponent from "@/components/aprovacoes/aprovacoes-component"

export const metadata: Metadata = {
  title: "SmartPonto - Aprovações",
  description: "Gerencie e aprove solicitações de funcionários",
}

export default function AprovacoesPage() {
  return (
    <DashboardLayout>
      <AprovacoesComponent />
    </DashboardLayout>
  )
}
