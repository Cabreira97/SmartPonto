import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import SetoresHeader from "@/components/setores/setores-header"
import SetoresList from "@/components/setores/setores-list"

export const metadata: Metadata = {
  title: "SmartPonto - Gerenciamento de Setores",
  description: "Gerenciamento de setores e departamentos",
}

export default function SetoresPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Setores</h1>

        <SetoresHeader />
        <SetoresList />
      </div>
    </DashboardLayout>
  )
}
