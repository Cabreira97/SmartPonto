"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { addDays, format, startOfWeek } from "date-fns"
import { ptBR } from "date-fns/locale"

// Dados simulados para demonstração
const escalas = [
  {
    id: 1,
    nome: "Horário Comercial",
    descricao: "Segunda a sexta, 8h às 17h com 1h de almoço",
    cor: "bg-blue-500",
  },
  {
    id: 2,
    nome: "Turno da Manhã",
    descricao: "Segunda a sábado, 6h às 14h",
    cor: "bg-green-500",
  },
  {
    id: 3,
    nome: "Turno da Tarde",
    descricao: "Segunda a sábado, 14h às 22h",
    cor: "bg-amber-500",
  },
  {
    id: 4,
    nome: "Turno da Noite",
    descricao: "Segunda a sábado, 22h às 6h",
    cor: "bg-purple-500",
  },
  {
    id: 5,
    nome: "Escala 12x36",
    descricao: "12 horas de trabalho por 36 horas de descanso",
    cor: "bg-red-500",
  },
]

// Dados simulados de atribuições de escalas
const atribuicoes = [
  { data: new Date(2023, 10, 1), escalaId: 1 },
  { data: new Date(2023, 10, 2), escalaId: 1 },
  { data: new Date(2023, 10, 3), escalaId: 1 },
  { data: new Date(2023, 10, 4), escalaId: 1 },
  { data: new Date(2023, 10, 5), escalaId: 1 },
  { data: new Date(2023, 10, 6), escalaId: 2 },
  { data: new Date(2023, 10, 7), escalaId: 3 },
  { data: new Date(2023, 10, 8), escalaId: 1 },
  { data: new Date(2023, 10, 9), escalaId: 1 },
  { data: new Date(2023, 10, 10), escalaId: 1 },
  { data: new Date(2023, 10, 11), escalaId: 1 },
  { data: new Date(2023, 10, 12), escalaId: 1 },
  { data: new Date(2023, 10, 13), escalaId: 2 },
  { data: new Date(2023, 10, 14), escalaId: 3 },
  { data: new Date(2023, 10, 15), escalaId: 4 },
  { data: new Date(2023, 10, 16), escalaId: 4 },
  { data: new Date(2023, 10, 17), escalaId: 4 },
  { data: new Date(2023, 10, 18), escalaId: 5 },
  { data: new Date(2023, 10, 19), escalaId: 5 },
  { data: new Date(2023, 10, 20), escalaId: 5 },
]

// Função para gerar a visualização semanal
const gerarVisualizacaoSemanal = (dataInicio: Date) => {
  const dias = []
  const inicio = startOfWeek(dataInicio, { locale: ptBR })

  for (let i = 0; i < 7; i++) {
    const dia = addDays(inicio, i)
    dias.push(dia)
  }

  return dias
}

export default function EscalasCalendario() {
  const [date, setDate] = useState<Date>(new Date())
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<string>("todos")

  // Função para obter a escala de um dia específico
  const getEscalaParaData = (data: Date) => {
    const atribuicao = atribuicoes.find((a) => a.data.toDateString() === data.toDateString())

    if (!atribuicao) return null

    return escalas.find((e) => e.id === atribuicao.escalaId)
  }

  // Renderiza o conteúdo do dia no calendário
  const renderDayContent = (day: Date) => {
    const escala = getEscalaParaData(day)

    if (!escala) return null

    return (
      <div className="w-full flex justify-center">
        <Badge variant="outline" className={`${escala.cor} text-white text-xs mt-1 truncate max-w-[90%]`}>
          {escala.nome}
        </Badge>
      </div>
    )
  }

  // Gera a visualização semanal
  const diasDaSemana = gerarVisualizacaoSemanal(date)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/3">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="funcionario">Funcionário</Label>
                  <Select value={funcionarioSelecionado} onValueChange={setFuncionarioSelecionado}>
                    <SelectTrigger id="funcionario">
                      <SelectValue placeholder="Selecione um funcionário" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos os funcionários</SelectItem>
                      <SelectItem value="1">Ana Silva</SelectItem>
                      <SelectItem value="2">Bruno Costa</SelectItem>
                      <SelectItem value="3">Carla Oliveira</SelectItem>
                      <SelectItem value="4">Daniel Santos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  className="rounded-md border"
                  components={{
                    DayContent: ({ day }) => (
                      <>
                        <div>{format(day, "d")}</div>
                        {renderDayContent(day)}
                      </>
                    ),
                  }}
                />

                <div className="space-y-2">
                  <h3 className="font-medium">Legenda</h3>
                  <div className="space-y-2">
                    {escalas.map((escala) => (
                      <div key={escala.id} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${escala.cor}`}></div>
                        <span className="text-sm">{escala.nome}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h3 className="font-medium mb-4">Visualização Semanal</h3>
              <div className="grid grid-cols-7 gap-2">
                {diasDaSemana.map((dia, index) => (
                  <div key={index} className="text-center">
                    <div className="font-medium text-sm mb-1">{format(dia, "EEE", { locale: ptBR })}</div>
                    <div className="font-bold">{format(dia, "dd", { locale: ptBR })}</div>
                  </div>
                ))}

                {diasDaSemana.map((dia, index) => {
                  const escala = getEscalaParaData(dia)
                  return (
                    <div
                      key={`escala-${index}`}
                      className={`p-2 rounded-md min-h-[80px] border ${
                        escala ? `${escala.cor} bg-opacity-10 border-${escala.cor}` : ""
                      }`}
                    >
                      {escala ? (
                        <div className="text-xs">
                          <div className="font-medium">{escala.nome}</div>
                          <div className="mt-1 text-gray-600">{escala.descricao}</div>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400 italic">Sem escala</div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
