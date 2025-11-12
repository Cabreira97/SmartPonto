import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import EscalasList from "@/components/escalas/escalas-list"
import EscalasHeader from "@/components/escalas/escalas-header"
import EscalasCalendario from "@/components/escalas/escalas-calendario"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "SmartPonto - Escalas de Trabalho",
  description: "Gerenciamento de escalas de trabalho",
}

export default function EscalasPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Escalas de Trabalho</h1>

        <EscalasHeader />

        <Tabs defaultValue="lista" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="lista">Lista de Escalas</TabsTrigger>
            <TabsTrigger value="calendario">Visualização em Calendário</TabsTrigger>
          </TabsList>
          <TabsContent value="lista">
            <EscalasList />
          </TabsContent>
          <TabsContent value="calendario">
            <EscalasCalendario />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
