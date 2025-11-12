"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ptBR } from "date-fns/locale"
import { format, isSameDay } from "date-fns"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Users, CalendarIcon, User } from "lucide-react"

// Dados simulados para demonstração
const setores = [
  { id: 1, nome: "Tecnologia da Informação" },
  { id: 2, nome: "Recursos Humanos" },
  { id: 3, nome: "Financeiro" },
  { id: 4, nome: "Marketing" },
  { id: 5, nome: "Vendas" },
]

const funcionarios = [
  { id: 1, nome: "Ana Silva", setor_id: 1, avatar: "AS" },
  { id: 2, nome: "Bruno Costa", setor_id: 1, avatar: "BC" },
  { id: 3, nome: "Carla Oliveira", setor_id: 4, avatar: "CO" },
  { id: 4, nome: "Daniel Santos", setor_id: 5, avatar: "DS" },
  { id: 5, nome: "Eduarda Lima", setor_id: 2, avatar: "EL" },
  { id: 6, nome: "Fernando Gomes", setor_id: 3, avatar: "FG" },
  { id: 7, nome: "Gabriela Martins", setor_id: 3, avatar: "GM" },
  { id: 8, nome: "Henrique Alves", setor_id: 1, avatar: "HA" },
]

const folgas = [
  { id: 1, funcionario_id: 1, data: new Date(2023, 10, 20), tipo: "FOLGA", status: "APROVADA" },
  { id: 2, funcionario_id: 3, data: new Date(2023, 10, 22), tipo: "FOLGA", status: "APROVADA" },
  { id: 3, funcionario_id: 5, data: new Date(2023, 10, 22), tipo: "FOLGA", status: "APROVADA" },
  { id: 4, funcionario_id: 2, data: new Date(2023, 10, 25), tipo: "FOLGA", status: "APROVADA" },
  { id: 5, funcionario_id: 7, data: new Date(2023, 10, 27), tipo: "FOLGA", status: "APROVADA" },
  { id: 6, funcionario_id: 8, data: new Date(2023, 10, 27), tipo: "FOLGA", status: "APROVADA" },
]

const ferias = [
  {
    id: 1,
    funcionario_id: 4,
    data_inicio: new Date(2023, 10, 15),
    data_fim: new Date(2023, 11, 5),
    status: "APROVADA",
  },
  {
    id: 2,
    funcionario_id: 6,
    data_inicio: new Date(2023, 11, 10),
    data_fim: new Date(2023, 11, 30),
    status: "APROVADA",
  },
]

export default function CalendarioEquipe() {
  const [setorSelecionado, setSetorSelecionado] = useState<string>("todos")
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Filtrar funcionários por setor
  const funcionariosFiltrados =
    setorSelecionado === "todos"
      ? funcionarios
      : funcionarios.filter((f) => f.setor_id === Number.parseInt(setorSelecionado))

  // Função para verificar se um funcionário está de folga em uma data específica
  const estaEmFolga = (funcionarioId: number, data: Date) => {
    return folgas.some((f) => f.funcionario_id === funcionarioId && isSameDay(f.data, data) && f.status === "APROVADA")
  }

  // Função para verificar se um funcionário está de férias em uma data específica
  const estaEmFerias = (funcionarioId: number, data: Date) => {
    return ferias.some(
      (f) =>
        f.funcionario_id === funcionarioId && data >= f.data_inicio && data <= f.data_fim && f.status === "APROVADA",
    )
  }

  // Função para destacar dias com folgas ou férias no calendário
  const destacarDias = (day: Date) => {
    const folgasNoDia = folgas.filter((f) => isSameDay(f.data, day) && f.status === "APROVADA")
    const feriasNoDia = ferias.filter((f) => day >= f.data_inicio && day <= f.data_fim && f.status === "APROVADA")

    const totalAusencias = folgasNoDia.length + feriasNoDia.length

    if (totalAusencias > 0) {
      return "bg-blue-50 text-blue-600 font-medium relative"
    }

    return undefined
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center">
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2">Calendário da Equipe</h2>
          <p className="text-muted-foreground">
            Visualize as folgas e férias de toda a equipe em um calendário unificado.
          </p>
        </div>

        <Select value={setorSelecionado} onValueChange={setSetorSelecionado}>
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="Filtrar por setor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os setores</SelectItem>
            {setores.map((setor) => (
              <SelectItem key={setor.id} value={setor.id.toString()}>
                {setor.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
              Calendário
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              className="rounded-md border"
              modifiers={{
                highlighted: (day) => destacarDias(day) !== undefined,
              }}
              modifiersClassNames={{
                highlighted: "bg-blue-50 text-blue-600 font-medium",
              }}
            />

            <div className="mt-4 space-y-2">
              <div className="flex items-center">
                <Badge variant="outline" className="bg-blue-50 text-blue-600 mr-2">
                  Folga
                </Badge>
                <span className="text-sm text-muted-foreground">Funcionário em folga</span>
              </div>
              <div className="flex items-center">
                <Badge variant="outline" className="bg-green-50 text-green-600 mr-2">
                  Férias
                </Badge>
                <span className="text-sm text-muted-foreground">Funcionário em férias</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary" />
              Funcionários {date && `- ${format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {date ? (
              <div className="space-y-4">
                {funcionariosFiltrados.length > 0 ? (
                  funcionariosFiltrados.map((funcionario) => (
                    <div key={funcionario.id} className="flex items-center justify-between border-b pb-3 last:border-0">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 mr-3">
                          {funcionario.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{funcionario.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            {setores.find((s) => s.id === funcionario.setor_id)?.nome}
                          </p>
                        </div>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            {estaEmFolga(funcionario.id, date) ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-600">
                                Folga
                              </Badge>
                            ) : estaEmFerias(funcionario.id, date) ? (
                              <Badge variant="outline" className="bg-green-50 text-green-600">
                                Férias
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-gray-50 text-gray-600">
                                Disponível
                              </Badge>
                            )}
                          </TooltipTrigger>
                          <TooltipContent>
                            {estaEmFolga(funcionario.id, date)
                              ? "Funcionário em folga neste dia"
                              : estaEmFerias(funcionario.id, date)
                                ? "Funcionário em férias neste período"
                                : "Funcionário disponível para trabalho"}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <User className="h-10 w-10 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">Nenhum funcionário encontrado para o setor selecionado.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CalendarIcon className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Selecione uma data no calendário para ver os funcionários.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
