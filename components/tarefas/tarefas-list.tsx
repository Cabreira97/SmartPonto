"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, Calendar, CheckCircle2, Clock, Edit, MoreHorizontal, PlayCircle, Trash2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import EditarTarefaForm from "./editar-tarefa-form"
import TarefaDetalhes from "./tarefa-detalhes"
import ExcluirTarefaDialog from "./excluir-tarefa-dialog"
import { Progress } from "@/components/ui/progress"

// Dados de exemplo
const tarefasIniciais = [
  {
    id: 1,
    titulo: "Implementar sistema de autenticação",
    descricao: "Criar sistema de login e registro usando NextAuth.js com integração OAuth",
    status: "em-andamento",
    prioridade: "alta",
    dataInicio: "2023-05-10",
    dataFim: "2023-05-20",
    progresso: 65,
    responsavel: {
      id: 1,
      nome: "Ana Silva",
      avatar: "/placeholder.svg?height=40&width=40",
      cargo: "Desenvolvedora Frontend",
    },
    comentarios: [
      {
        id: 1,
        usuario: "João Oliveira",
        texto: "Já finalizei a parte do frontend, falta integrar com o backend.",
        data: "2023-05-15T14:30:00",
      },
      {
        id: 2,
        usuario: "Ana Silva",
        texto: "Estou trabalhando na integração com o banco de dados.",
        data: "2023-05-16T09:15:00",
      },
    ],
  },
  // ... existing tarefas ...
]

export default function TarefasList() {
  const [tarefas, setTarefas] = useState(tarefasIniciais)
  const [tarefaEditando, setTarefaEditando] = useState<number | null>(null)
  const [tarefaDetalhes, setTarefaDetalhes] = useState<number | null>(null)
  const [tarefaExcluindo, setTarefaExcluindo] = useState<number | null>(null)

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

  const handleEditarTarefa = (tarefa: any) => {
    // Lógica para editar tarefa
    setTarefas(tarefas.map((t) => (t.id === tarefa.id ? { ...t, ...tarefa } : t)))
    setTarefaEditando(null)
  }

  const handleExcluirTarefa = (id: number) => {
    // Lógica para excluir tarefa
    setTarefas(tarefas.filter((t) => t.id !== id))
    setTarefaExcluindo(null)
  }

  const handleMudarStatus = (id: number, novoStatus: string) => {
    // Lógica para mudar status
    setTarefas(
      tarefas.map((t) =>
        t.id === id
          ? {
              ...t,
              status: novoStatus,
              progresso: novoStatus === "concluida" ? 100 : t.progresso,
            }
          : t,
      ),
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tarefas.map((tarefa) => (
        <Card key={tarefa.id} className="flex flex-col">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <CardTitle
                  className="cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setTarefaDetalhes(tarefa.id)}
                >
                  {tarefa.titulo}
                </CardTitle>
                <div className="flex flex-wrap gap-2">
                  {getStatusBadge(tarefa.status)}
                  {getPrioridadeBadge(tarefa.prioridade)}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Abrir menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTarefaDetalhes(tarefa.id)}>Ver detalhes</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTarefaEditando(tarefa.id)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleMudarStatus(tarefa.id, "pendente")}
                    disabled={tarefa.status === "pendente"}
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Marcar como pendente
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleMudarStatus(tarefa.id, "em-andamento")}
                    disabled={tarefa.status === "em-andamento"}
                  >
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Marcar como em andamento
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleMudarStatus(tarefa.id, "concluida")}
                    disabled={tarefa.status === "concluida"}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Marcar como concluída
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTarefaExcluindo(tarefa.id)} className="text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    Excluir
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className="flex-grow pb-2">
            <CardDescription className="line-clamp-2 mb-4">{tarefa.descricao}</CardDescription>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2 h-4 w-4" />
                <span>
                  {formatarData(tarefa.dataInicio)} - {formatarData(tarefa.dataFim)}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Progresso</span>
                  <span>{tarefa.progresso}%</span>
                </div>
                <Progress value={tarefa.progresso} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <div className="flex items-center w-full">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={tarefa.responsavel.avatar || "/placeholder.svg"} alt={tarefa.responsavel.nome} />
                <AvatarFallback>{tarefa.responsavel.nome.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{tarefa.responsavel.nome}</p>
                <p className="text-muted-foreground text-xs">{tarefa.responsavel.cargo}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}

      {tarefaEditando && (
        <EditarTarefaForm
          tarefa={tarefas.find((t) => t.id === tarefaEditando)!}
          onSave={handleEditarTarefa}
          onClose={() => setTarefaEditando(null)}
        />
      )}

      {tarefaDetalhes && (
        <TarefaDetalhes
          tarefa={tarefas.find((t) => t.id === tarefaDetalhes)!}
          onClose={() => setTarefaDetalhes(null)}
        />
      )}

      {tarefaExcluindo && (
        <ExcluirTarefaDialog
          onConfirm={() => handleExcluirTarefa(tarefaExcluindo)}
          onCancel={() => setTarefaExcluindo(null)}
        />
      )}
    </div>
  )
}
