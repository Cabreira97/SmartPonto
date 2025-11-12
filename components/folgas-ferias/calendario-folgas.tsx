"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { format, isSameDay, isWithinInterval } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

// Dados simulados para demonstração
const folgas = [
  {
    id: 1,
    usuario: "Ana Silva",
    tipo: "FERIAS",
    data_inicio: new Date(2023, 10, 20), // Novembro 20
    data_fim: new Date(2023, 11, 18), // Dezembro 18
    status: "APROVADA",
  },
  {
    id: 2,
    usuario: "Bruno Costa",
    tipo: "FOLGA",
    data_inicio: new Date(2023, 10, 17), // Novembro 17
    data_fim: new Date(2023, 10, 17), // Novembro 17
    status: "PENDENTE",
  },
  {
    id: 3,
    usuario: "Carla Oliveira",
    tipo: "LICENCA",
    data_inicio: new Date(2023, 10, 25), // Novembro 25
    data_fim: new Date(2023, 10, 30), // Novembro 30
    status: "PENDENTE",
  },
  {
    id: 4,
    usuario: "Daniel Santos",
    tipo: "FOLGA",
    data_inicio: new Date(2023, 10, 15), // Novembro 15
    data_fim: new Date(2023, 10, 15), // Novembro 15
    status: "APROVADA",
  },
  {
    id: 5,
    usuario: "Eduarda Lima",
    tipo: "FERIAS",
    data_inicio: new Date(2023, 11, 10), // Dezembro 10
    data_fim: new Date(2023, 11, 30), // Dezembro 30
    status: "APROVADA",
  },
]

export default function CalendarioFolgas() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [filtroTipo, setFiltroTipo] = useState("")
  const [filtroStatus, setFiltroStatus] = useState("")
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const filteredFolgas = folgas.filter((folga) => {
    if (filtroTipo && folga.tipo !== filtroTipo) return false
    if (filtroStatus && folga.status !== filtroStatus) return false
    return true
  })

  // Função para verificar se um dia tem folgas
  const hasFolga = (day: Date) => {
    return filteredFolgas.some((folga) => {
      return isWithinInterval(day, { start: folga.data_inicio, end: folga.data_fim })
    })
  }

  // Função para obter as folgas de um dia específico
  const getFolgasForDay = (day: Date) => {
    return filteredFolgas.filter((folga) => {
      return isWithinInterval(day, { start: folga.data_inicio, end: folga.data_fim })
    })
  }

  const modifiers = {
    folga: (day: Date) => hasFolga(day),
  }

  const modifiersClassNames = {
    folga: "bg-blue-50",
  }

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrar por tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todos os tipos</SelectItem>
            <SelectItem value="FERIAS">Férias</SelectItem>
            <SelectItem value="FOLGA">Folga</SelectItem>
            <SelectItem value="LICENCA">Licença</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODOS">Todos os status</SelectItem>
            <SelectItem value="APROVADA">Aprovada</SelectItem>
            <SelectItem value="PENDENTE">Pendente</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" onClick={() => setIsCalendarOpen(true)} className="sm:hidden">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Ver Calendário
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="hidden md:block">
          <CardContent className="p-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              locale={ptBR}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">
              {date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : "Selecione uma data"}
            </h3>
            <div className="space-y-4">
              {date && getFolgasForDay(date).length > 0 ? (
                getFolgasForDay(date).map((folga) => (
                  <div key={folga.id} className="border rounded-md p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{folga.usuario}</span>
                      <Badge
                        variant="outline"
                        className={
                          folga.tipo === "FERIAS"
                            ? "bg-blue-100 text-blue-700"
                            : folga.tipo === "FOLGA"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-indigo-100 text-indigo-700"
                        }
                      >
                        {folga.tipo === "FERIAS" ? "Férias" : folga.tipo === "FOLGA" ? "Folga" : "Licença"}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(folga.data_inicio, "dd/MM/yyyy")}
                      {!isSameDay(folga.data_inicio, folga.data_fim) && ` até ${format(folga.data_fim, "dd/MM/yyyy")}`}
                    </div>
                    <div>
                      <Badge
                        variant="outline"
                        className={
                          folga.status === "APROVADA" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }
                      >
                        {folga.status === "APROVADA" ? "Aprovada" : "Pendente"}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  {date ? "Nenhuma folga ou férias para esta data" : "Selecione uma data para ver as folgas"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Selecione uma Data</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center py-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                setDate(newDate)
                setIsCalendarOpen(false)
              }}
              className="rounded-md border"
              locale={ptBR}
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
            />
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
          <span>Aprovadas</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2" />
          <span>Pendentes</span>
        </div>
      </div>
    </div>
  )
}
