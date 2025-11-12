"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MinhasSolicitacoes from "./minhas-solicitacoes"
import SolicitacoesPendentes from "./solicitacoes-pendentes"
import HistoricoSolicitacoes from "./historico-solicitacoes"
import CalendarioFolgas from "./calendario-folgas"
import NovaSolicitacaoForm from "./nova-solicitacao-form"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "lucide-react"
import CalendarioEquipe from "./calendario-equipe"

export default function FolgasFeriasTabs() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Tabs defaultValue="minhas" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="minhas">Minhas Solicitações</TabsTrigger>
            <TabsTrigger value="pendentes">Pendentes</TabsTrigger>
            <TabsTrigger value="historico">Histórico</TabsTrigger>
            <TabsTrigger value="calendario">
              <Calendar className="h-4 w-4 mr-2" />
              Calendário
            </TabsTrigger>
            <TabsTrigger value="calendario-equipe">Calendário da Equipe</TabsTrigger>
          </TabsList>

          <TabsContent value="minhas" className="mt-6">
            <MinhasSolicitacoes />
          </TabsContent>

          <TabsContent value="pendentes" className="mt-6">
            <SolicitacoesPendentes />
          </TabsContent>

          <TabsContent value="historico" className="mt-6">
            <HistoricoSolicitacoes />
          </TabsContent>

          <TabsContent value="calendario" className="mt-6">
            <CalendarioFolgas />
          </TabsContent>

          <TabsContent value="calendario-equipe" className="mt-6">
            <CalendarioEquipe />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Solicitação</DialogTitle>
            <DialogDescription>Preencha o formulário para solicitar folga ou férias.</DialogDescription>
          </DialogHeader>
          <NovaSolicitacaoForm onSuccess={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  )
}
