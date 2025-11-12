import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import FolgasFeriasHeader from "@/components/folgas-ferias/folgas-ferias-header"
import FolgasFeriasTabs from "@/components/folgas-ferias/folgas-ferias-tabs"

export const metadata: Metadata = {
  title: "SmartPonto - Folgas e Férias",
  description: "Gerenciamento de folgas e férias",
}

export default function FolgasFeriasPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Folgas e Férias</h1>

        <FolgasFeriasHeader />
        <FolgasFeriasTabs />
      </div>
    </DashboardLayout>
  )
}
