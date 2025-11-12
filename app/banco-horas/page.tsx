import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import BancoHorasComponent from "@/components/banco-horas/banco-horas-component"

export const metadata: Metadata = {
  title: "SmartPonto - Banco de Horas",
  description: "Gerenciamento de banco de horas e compensações",
}

export default function BancoHorasPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Banco de Horas</h1>
        <p className="text-muted-foreground">
          Gerencie seu saldo de horas, planeje compensações e visualize o histórico de movimentações.
        </p>

        <BancoHorasComponent />
      </div>
    </DashboardLayout>
  )
}
