"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { toast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface Usuario {
  id: number
  nome: string
  email: string
}

interface AtribuirEscalaUsuarioFormProps {
  usuario: Usuario
  onClose: () => void
}

// Dados simulados para demonstração
const escalas = [
  {
    id: 1,
    nome: "Horário Comercial",
    descricao: "Segunda a sexta, 8h às 17h com 1h de almoço",
  },
  {
    id: 2,
    nome: "Turno da Manhã",
    descricao: "Segunda a sábado, 6h às 14h",
  },
  {
    id: 3,
    nome: "Turno da Tarde",
    descricao: "Segunda a sábado, 14h às 22h",
  },
  {
    id: 4,
    nome: "Turno da Noite",
    descricao: "Segunda a sábado, 22h às 6h",
  },
  {
    id: 5,
    nome: "Escala 12x36",
    descricao: "12 horas de trabalho por 36 horas de descanso",
  },
]

export default function AtribuirEscalaUsuarioForm({ usuario, onClose }: AtribuirEscalaUsuarioFormProps) {
  const [escalaId, setEscalaId] = useState<string>("")
  const [dataInicio, setDataInicio] = useState<Date | undefined>(new Date())
  const [dataFim, setDataFim] = useState<Date | undefined>(undefined)
  const [escalaAtual, setEscalaAtual] = useState<string>("Horário Comercial")

  const handleSubmit = () => {
    if (!escalaId || !dataInicio) {
      toast({
        title: "Erro",
        description: "Por favor, selecione uma escala e uma data de início.",
        variant: "destructive",
      })
      return
    }

    // Aqui seria feita a chamada à API para atribuir a escala
    console.log("Atribuindo escala:", {
      usuario_id: usuario.id,
      escala_id: Number(escalaId),
      data_inicio: dataInicio,
      data_fim: dataFim,
    })

    const escala = escalas.find((e) => e.id === Number(escalaId))

    toast({
      title: "Escala atribuída",
      description: `A escala "${escala?.nome}" foi atribuída a ${usuario.nome} com sucesso.`,
    })

    onClose()
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="usuario">Usuário</Label>
        <div className="flex items-center border rounded-md p-2 bg-gray-50">
          <span>{usuario.nome}</span>
          <span className="ml-2 text-gray-500">({usuario.email})</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Escala Atual</Label>
        <div className="flex items-center">
          <Badge variant="outline" className="bg-blue-50 text-blue-700">
            {escalaAtual}
          </Badge>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="escala">Nova Escala</Label>
        <Select value={escalaId} onValueChange={setEscalaId}>
          <SelectTrigger id="escala">
            <SelectValue placeholder="Selecione uma escala" />
          </SelectTrigger>
          <SelectContent>
            {escalas.map((escala) => (
              <SelectItem key={escala.id} value={escala.id.toString()}>
                {escala.nome} - {escala.descricao}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="dataInicio">Data de Início</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !dataInicio && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dataInicio ? format(dataInicio, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={dataInicio} onSelect={setDataInicio} initialFocus />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dataFim">Data de Término (opcional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn("w-full justify-start text-left font-normal", !dataFim && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dataFim ? format(dataFim, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={dataFim} onSelect={setDataFim} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Atribuir Escala</Button>
      </DialogFooter>
    </div>
  )
}
