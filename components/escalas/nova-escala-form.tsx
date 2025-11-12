"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { DialogFooter } from "@/components/ui/dialog"

interface NovaEscalaFormProps {
  onClose: () => void
}

const diasSemana = [
  { id: 1, nome: "Segunda-feira" },
  { id: 2, nome: "Terça-feira" },
  { id: 3, nome: "Quarta-feira" },
  { id: 4, nome: "Quinta-feira" },
  { id: 5, nome: "Sexta-feira" },
  { id: 6, nome: "Sábado" },
  { id: 7, nome: "Domingo" },
]

export default function NovaEscalaForm({ onClose }: NovaEscalaFormProps) {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [horarios, setHorarios] = useState(
    diasSemana.map((dia) => ({
      dia_id: dia.id,
      folga: dia.id > 5, // Sábado e domingo como folga por padrão
      hora_inicio: "08:00",
      hora_fim: "17:00",
    })),
  )

  const handleFolgaChange = (diaId: number, folga: boolean) => {
    setHorarios(horarios.map((h) => (h.dia_id === diaId ? { ...h, folga } : h)))
  }

  const handleHoraChange = (diaId: number, campo: "hora_inicio" | "hora_fim", valor: string) => {
    setHorarios(horarios.map((h) => (h.dia_id === diaId ? { ...h, [campo]: valor } : h)))
  }

  const handleSubmit = () => {
    // Aqui seria feita a chamada à API para criar a escala
    console.log("Criando escala:", {
      nome,
      descricao,
      horarios,
    })

    onClose()
  }

  return (
    <form className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome da Escala</Label>
            <Input
              id="nome"
              placeholder="Ex: Horário Comercial"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              placeholder="Descreva os detalhes desta escala"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Horários</Label>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Dia</TableHead>
                <TableHead>Folga</TableHead>
                <TableHead>Hora Início</TableHead>
                <TableHead>Hora Fim</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {horarios.map((horario) => {
                const dia = diasSemana.find((d) => d.id === horario.dia_id)
                return (
                  <TableRow key={horario.dia_id}>
                    <TableCell>{dia?.nome}</TableCell>
                    <TableCell>
                      <Switch
                        checked={horario.folga}
                        onCheckedChange={(checked) => handleFolgaChange(horario.dia_id, checked)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        value={horario.hora_inicio}
                        onChange={(e) => handleHoraChange(horario.dia_id, "hora_inicio", e.target.value)}
                        disabled={horario.folga}
                        className="w-24"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        value={horario.hora_fim}
                        onChange={(e) => handleHoraChange(horario.dia_id, "hora_fim", e.target.value)}
                        disabled={horario.folga}
                        className="w-24"
                      />
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Criar Escala</Button>
      </DialogFooter>
    </form>
  )
}
