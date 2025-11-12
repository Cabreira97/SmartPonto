"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import NovaSolicitacaoForm from "./nova-solicitacao-form"
import CalendarioFolgas from "./calendario-folgas"

export default function FolgasFeriasHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isCalendarioOpen, setIsCalendarioOpen] = useState(false)

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="text-sm text-gray-500">
        Gerencie suas solicitações de folgas e férias ou aprove solicitações da sua equipe.
      </div>

      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setIsCalendarioOpen(true)}>
          <Calendar className="mr-2 h-4 w-4" />
          Calendário
        </Button>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Solicitação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Nova Solicitação</DialogTitle>
              <DialogDescription>Preencha os dados para solicitar folga ou férias.</DialogDescription>
            </DialogHeader>

            <NovaSolicitacaoForm onClose={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Diálogo do Calendário */}
      <Dialog open={isCalendarioOpen} onOpenChange={setIsCalendarioOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Calendário de Folgas e Férias</DialogTitle>
            <DialogDescription>Visualize as folgas e férias programadas para a equipe.</DialogDescription>
          </DialogHeader>

          <CalendarioFolgas />
        </DialogContent>
      </Dialog>
    </div>
  )
}
