"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RelatorioHorasTrabalhadas from "./relatorio-horas-trabalhadas"
import RelatorioComparativoSetores from "./relatorio-comparativo-setores"
import RelatorioPresencaFuncionarios from "./relatorio-presenca-funcionarios"
import RelatorioHorasExtras from "./relatorio-horas-extras"
import RelatorioSalarios from "./relatorio-salarios"
import { BarChart3, Clock, Users, TrendingUp, DollarSign } from "lucide-react"

export default function RelatoriosTabs() {
  return (
    <Tabs defaultValue="horas" className="w-full">
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="horas" className="flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Horas Trabalhadas
        </TabsTrigger>
        <TabsTrigger value="setores" className="flex items-center">
          <BarChart3 className="h-4 w-4 mr-2" />
          Comparativo Setores
        </TabsTrigger>
        <TabsTrigger value="presenca" className="flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Presença
        </TabsTrigger>
        <TabsTrigger value="extras" className="flex items-center">
          <TrendingUp className="h-4 w-4 mr-2" />
          Horas Extras
        </TabsTrigger>
        <TabsTrigger value="salarios" className="flex items-center">
          <DollarSign className="h-4 w-4 mr-2" />
          Salários
        </TabsTrigger>
      </TabsList>

      <TabsContent value="horas" className="mt-6">
        <RelatorioHorasTrabalhadas />
      </TabsContent>

      <TabsContent value="setores" className="mt-6">
        <RelatorioComparativoSetores />
      </TabsContent>

      <TabsContent value="presenca" className="mt-6">
        <RelatorioPresencaFuncionarios />
      </TabsContent>

      <TabsContent value="extras" className="mt-6">
        <RelatorioHorasExtras />
      </TabsContent>

      <TabsContent value="salarios" className="mt-6">
        <RelatorioSalarios />
      </TabsContent>
    </Tabs>
  )
}
