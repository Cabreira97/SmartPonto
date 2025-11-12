"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Download } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { cn } from "@/lib/utils"

export default function RelatoriosHeader() {
  const [date, setDate] = useState<Date>()
  const [filtroSetor, setFiltroSetor] = useState("")
  const [periodoRelatorio, setPeriodoRelatorio] = useState("mes")

  const handleExportarRelatorio = () => {
    // Aqui seria implementada a lógica para exportar o relatório
    console.log("Exportando relatório:", {
      data: date,
      setor: filtroSetor,
      periodo: periodoRelatorio,
    })
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full sm:w-[240px] justify-start text-left font-normal",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus locale={ptBR} />
          </PopoverContent>
        </Popover>

        <Select value={periodoRelatorio} onValueChange={setPeriodoRelatorio}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dia">Diário</SelectItem>
            <SelectItem value="semana">Semanal</SelectItem>
            <SelectItem value="mes">Mensal</SelectItem>
            <SelectItem value="trimestre">Trimestral</SelectItem>
            <SelectItem value="ano">Anual</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroSetor} onValueChange={setFiltroSetor}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todos os setores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os setores</SelectItem>
            <SelectItem value="ti">Tecnologia da Informação</SelectItem>
            <SelectItem value="rh">Recursos Humanos</SelectItem>
            <SelectItem value="financeiro">Financeiro</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="vendas">Vendas</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleExportarRelatorio}>
        <Download className="mr-2 h-4 w-4" />
        Exportar Relatório
      </Button>
    </div>
  )
}
