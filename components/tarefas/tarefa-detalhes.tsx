"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Calendar, CheckCircle2, Clock, MessageSquare, PlayCircle } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Separator } from "@/components/ui/separator"

interface TarefaDetalhesProps {
  tarefa: any
  onClose: () => void
}

export function TarefaDetalhes({ tarefa, onClose }: TarefaDetalhesProps) {
  const [novoComentario, setNovoComentario] = useState("")

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pendente":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="mr-1 h-3 w-3" />
            Pendente
          </Badge>
        )
      case "em-andamento":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <PlayCircle className="mr-1 h-3 w-3" />
            Em andamento
          </Badge>
        )
      case "concluida":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Concluída
          </Badge>
        )
      case "atrasada":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <AlertCircle className="mr-1 h-3 w-3" />
            Atrasada
          </Badge>
        )
      default:
        return <Badge>{status}</Badge>
    }
  }

  const getPrioridadeBadge = (prioridade: string) => {
    switch (prioridade) {
      case "baixa":
        return (
          <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
            Baixa
          </Badge>
        )
      case "media":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Média
          </Badge>
        )
      case "alta":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            Alta
          </Badge>
        )
      default:
        return <Badge>{prioridade}</Badge>
    }
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString("pt-BR")
  }

  const formatarDataHora = (dataHora: string) => {
    return new Date(dataHora).toLocaleString("pt-BR")
  }

  const handleEnviarComentario = () => {
    if (novoComentario.trim()) {
      // Lógica para adicionar comentário
      console.log("Novo comentário:", novoComentario)
      setNovoComentario("")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{tarefa.titulo}</DialogTitle>
          <div className="flex flex-wrap gap-2 mt-2">
            {getStatusBadge(tarefa.status)}
            {getPrioridadeBadge(tarefa.prioridade)}
          </div>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Descrição</h3>
            <p>{tarefa.descricao}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Responsável</h3>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src={tarefa.responsavel.avatar || "/placeholder.svg"} alt={tarefa.responsavel.nome} />
                  <AvatarFallback>{tarefa.responsavel.nome.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{tarefa.responsavel.nome}</p>
                  <p className="text-muted-foreground text-xs">{tarefa.responsavel.cargo}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Período</h3>
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {formatarData(tarefa.dataInicio)} - {formatarData(tarefa.dataFim)}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Progresso</h3>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Concluído</span>
                <span>{tarefa.progresso}%</span>
              </div>
              <Progress value={tarefa.progresso} className="h-2" />
            </div>
          </div>

          <Separator />

          <div>
            <div className="flex items-center mb-4">
              <MessageSquare className="mr-2 h-5 w-5" />
              <h3 className="font-medium">Comentários ({tarefa.comentarios.length})</h3>
            </div>

            <div className="space-y-4 mb-4">
              {tarefa.comentarios.length > 0 ? (
                tarefa.comentarios.map((comentario: any) => (
                  <div key={comentario.id} className="bg-muted/50 p-3 rounded-md">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-medium">{comentario.usuario}</div>
                      <div className="text-xs text-muted-foreground">{formatarDataHora(comentario.data)}</div>
                    </div>
                    <p className="text-sm">{comentario.texto}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
              )}
            </div>

            <div className="space-y-2">
              <Textarea
                placeholder="Adicione um comentário..."
                value={novoComentario}
                onChange={(e) => setNovoComentario(e.target.value)}
                rows={3}
              />
              <Button onClick={handleEnviarComentario} disabled={!novoComentario.trim()} className="w-full sm:w-auto">
                Enviar Comentário
              </Button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
