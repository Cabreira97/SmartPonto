import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import UsuariosHeader from "@/components/usuarios/usuarios-header"
import UsuariosList from "@/components/usuarios/usuarios-list"

export const metadata: Metadata = {
  title: "SmartPonto - Gerenciamento de Usuários",
  description: "Gerenciamento de usuários do sistema",
}

export default function UsuariosPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>

        <UsuariosHeader />
        <UsuariosList />
      </div>
    </DashboardLayout>
  )
}
