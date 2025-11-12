import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import PerfilUsuario from "@/components/perfil/perfil-usuario"

export const metadata: Metadata = {
  title: "SmartPonto - Perfil do Usuário",
  description: "Gerencie seu perfil e configurações de conta",
}

export default function PerfilPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações pessoais, preferências e configurações de conta.
        </p>

        <PerfilUsuario />
      </div>
    </DashboardLayout>
  )
}
