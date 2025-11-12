"use client"

import { useState } from "react"
import { Calendar, dateFnsLocalizer } from "react-big-calendar"
import { format, parse, startOfWeek, getDay } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, MapPin, FileText } from "lucide-react"
import "react-big-calendar/lib/css/react-big-calendar.css"

// Configuração do localizador para o calendário
const locales = {
  "pt-BR": ptBR,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

// Dados simulados para demonstração
const events = [
  {
    id: 1,
    title: "Turno de Trabalho",
    start: new Date(2023, 10, 20, 8, 0),
    end: new Date(2023, 10, 20, 17, 0),
    tipo: "trabalho",
    local: "Escritório Principal",
    participantes: ["Você"],
    descricao: "Turno regular de trabalho.",
  },
  {
    id: 2,
    title: "Reunião de Equipe",
    start: new Date(2023, 10, 21, 10, 0),
    end: new Date(2023, 10, 21, 11, 30),
    tipo: "reuniao",
    local: "Sala de Conferência A",
    participantes: ["Você", "Ana Silva", "Bruno Costa", "Carla Oliveira"],
    descricao: "Discussão sobre o progresso do projeto e próximos passos.",
  },
  {
    id: 3,
    title: "Folga Compensatória",
    start: new Date(2023, 10, 22, 0, 0),
    end: new Date(2023, 10, 23, 0, 0),
    tipo: "folga",
    local: "",
    participantes: ["Você"],
    descricao: "Folga compensatória por horas extras trabalhadas.",
    allDay: true,
  },
  {
    id: 4,
    title: "Treinamento",
    start: new Date(2023, 10, 24, 13, 0),
    end: new Date(2023, 10, 24, 17, 0),
    tipo: "trabalho",
    local: "Sala de Treinamento",
    participantes: ["Você", "Novos funcionários"],
    descricao: "Treinamento sobre os novos procedimentos de segurança.",
  },
  {
    id: 5,
    title: "Plantão",
    start: new Date(2023, 10, 25, 18, 0),
    end: new Date(2023, 10, 26, 6, 0),
    tipo: "trabalho",
    local: "Escritório Principal",
    participantes: ["Você"],
    descricao: "Plantão noturno.",
  },
  {
    id: 6,
    title: "Reunião com Cliente",
    start: new Date(2023, 10, 27, 14, 0),
    end: new Date(2023, 10, 27, 15, 30),
    tipo: "reuniao",
    local: "Sala de Reuniões B",
    participantes: ["Você", "Daniel Santos", "Cliente XYZ"],
    descricao: "Apresentação da proposta para o cliente.",
  },
  {
    id: 7,
    title: "Férias",
    start: new Date(2023, 11, 1, 0, 0),
    end: new Date(2023, 11, 16, 0, 0),
    tipo: "ferias",
    local: "",
    participantes: ["Você"],
    descricao: "Período de férias anuais.",
    allDay: true,
  },
]

// Componente para estilizar os eventos no calendário
const EventComponent = ({ event }: { event: any }) => {
  const getEventStyle = (tipo: string) => {
    switch (tipo) {
      case "trabalho":
        return "bg-blue-100 border-blue-500 text-blue-800"
      case "reuniao":
        return "bg-purple-100 border-purple-500 text-purple-800"
      case "folga":
        return "bg-green-100 border-green-500 text-green-800"
      case "ferias":
        return "bg-amber-100 border-amber-500 text-amber-800"
      default:
        return "bg-gray-100 border-gray-500 text-gray-800"
    }
  }

  return (
    <div className={`px-2 py-1 rounded border-l-4 ${getEventStyle(event.tipo)}`}>
      <div className="font-medium text-sm truncate">{event.title}</div>
      {!event.allDay && (
        <div className="text-xs flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}
        </div>
      )}
    </div>
  )
}

export default function ScheduleCalendar() {
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSelectEvent = (event: any) => {
    setSelectedEvent(event)
    setIsDialogOpen(true)
  }

  const getBadgeStyle = (tipo: string) => {
    switch (tipo) {
      case "trabalho":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "reuniao":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "folga":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "ferias":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="h-[600px]">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "100%" }}
              culture="pt-BR"
              messages={{
                today: "Hoje",
                previous: "Anterior",
                next: "Próximo",
                month: "Mês",
                week: "Semana",
                day: "Dia",
                agenda: "Agenda",
                date: "Data",
                time: "Hora",
                event: "Evento",
                allDay: "Dia inteiro",
                noEventsInRange: "Não há eventos neste período.",
              }}
              components={{
                event: EventComponent,
              }}
              onSelectEvent={handleSelectEvent}
              views={["month", "week", "day", "agenda"]}
            />
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedEvent.title}</DialogTitle>
                <DialogDescription>
                  <Badge className={`mt-2 ${getBadgeStyle(selectedEvent.tipo)}`}>
                    {selectedEvent.tipo.charAt(0).toUpperCase() + selectedEvent.tipo.slice(1)}
                  </Badge>
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex items-start space-x-2">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Data e Horário</p>
                    {selectedEvent.allDay ? (
                      <p>
                        {format(selectedEvent.start, "dd/MM/yyyy")} - {format(selectedEvent.end, "dd/MM/yyyy")} (Dia
                        inteiro)
                      </p>
                    ) : (
                      <p>
                        {format(selectedEvent.start, "dd/MM/yyyy HH:mm")} - {format(selectedEvent.end, "HH:mm")}
                      </p>
                    )}
                  </div>
                </div>

                {selectedEvent.local && (
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Local</p>
                      <p>{selectedEvent.local}</p>
                    </div>
                  </div>
                )}

                <div className="flex items-start space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-medium">Participantes</p>
                    <ul className="list-disc list-inside">
                      {selectedEvent.participantes.map((participante: string, index: number) => (
                        <li key={index}>{participante}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {selectedEvent.descricao && (
                  <div className="flex items-start space-x-2">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="font-medium">Descrição</p>
                      <p>{selectedEvent.descricao}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
