"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ptBR } from "date-fns/locale"
import { format, isSameDay } from "date-fns"
import { CalendarIcon, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

// Dados simulados para demonstração
const escalas = [
  {
    id: 1,
    nome: "Horário Comercial",
    descricao: "Segunda a sexta, 8h às 17h com 1h de almoço",
    cor: "bg-blue-500",
    dias: [
      { data: new Date(2025, 10, 20), hora_inicio: "08:00", hora_fim: "17:00" },
      { data: new Date(2025, 10, 21), hora_inicio: "08:00", hora_fim: "17:00" },
      { data: new Date(2025, 10, 22), hora_inicio: "08:00", hora_fim: "17:00" },
      { data: new Date(2025, 10, 23), hora_inicio: "08:00", hora_fim: "17:00" },
      { data: new Date(2025, 10, 24), hora_inicio: "08:00", hora_fim: "17:00" },
    ],
  },
  {
    id: 2,
    nome: "Plantão Fim de Semana",
    descricao: "Sábado e domingo, 10h às 19h",
    cor: "bg-green-500",
    dias: [
      { data: new Date(2025, 10, 25), hora_inicio: "10:00", hora_fim: "19:00" },
      { data: new Date(2025, 10, 26), hora_inicio: "10:00", hora_fim: "19:00" },
    ],
  },
]

export default function WorkScheduleCard() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  // Função para verificar se há escala para um dia específico
  const getEscalaParaData = (data: Date) => {
    for (const escala of escalas) {
      const diaEscala = escala.dias.find((dia) => isSameDay(dia.data, data))
      if (diaEscala) {
        return { ...escala, ...diaEscala }
      }
    }
    return null
  }

  // Obter a escala para o dia selecionado
  const escalaDoDia = date ? getEscalaParaData(date) : null

  const modifiers = {
    booked: (day: Date) => getEscalaParaData(day) !== null,
  }

  const modifiersClassNames = {
    booked: "bg-primary/10 text-primary font-medium",
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarIcon className="mr-2 h-5 w-5 text-primary" />
          Escala de Trabalho
        </CardTitle>
        <CardDescription>Visualize sua escala de trabalho para os próximos dias</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-col gap-4">
          <div className="w-full">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              locale={ptBR}
              className="rounded-md border w-full"
              modifiers={modifiers}
              modifiersClassNames={modifiersClassNames}
            />
          </div>

          <div className="w-full flex flex-col justify-between">
            {escalaDoDia ? (
              <div className="space-y-4">
                <div>
                  <Badge className={`${escalaDoDia.cor} text-white`}>{escalaDoDia.nome}</Badge>
                  <p className="mt-2 text-sm">{escalaDoDia.descricao}</p>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h3 className="font-medium mb-2">
                    {format(escalaDoDia.data, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                  </h3>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{escalaDoDia.hora_inicio}</span>
                    <ArrowRight className="mx-2 h-3 w-3 text-muted-foreground" />
                    <span className="font-medium">{escalaDoDia.hora_fim}</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Selecione uma data no calendário para ver os detalhes da escala.</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium">Nenhuma escala para este dia</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {date ? format(date, "EEEE, dd 'de' MMMM", { locale: ptBR }) : "Selecione uma data"}
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/escalas" className="w-full">
          <Button variant="outline" className="w-full bg-transparent">
            Ver Todas as Escalas
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
