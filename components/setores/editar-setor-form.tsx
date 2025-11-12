"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

// Dados simulados para demonstração
const gerentes = [
  { id: 1, nome: "Ana Silva" },
  { id: 3, nome: "Carla Oliveira" },
  { id: 4, nome: "Daniel Santos" },
  { id: 5, nome: "Eduarda Lima" },
  { id: 7, nome: "Gabriela Martins" },
]

interface EditarSetorFormProps {
  setor: {
    id: number
    nome: string
    descricao: string
    gerente: string
    gerente_id: number
  }
  onSuccess: () => void
}

export default function EditarSetorForm({ setor, onSuccess }: EditarSetorFormProps) {
  const [nome, setNome] = useState(setor.nome)
  const [descricao, setDescricao] = useState(setor.descricao)
  const [gerenteId, setGerenteId] = useState(setor.gerente_id.toString())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio para API
    setTimeout(() => {
      toast({
        title: "Setor atualizado",
        description: `O setor ${nome} foi atualizado com sucesso.`,
      })
      setIsSubmitting(false)
      onSuccess()
    }, 1000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome do Setor</Label>
        <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do setor" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição</Label>
        <Textarea
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva as responsabilidades do setor"
          rows={3}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gerente">Gerente Responsável</Label>
        <Select value={gerenteId} onValueChange={setGerenteId}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um gerente" />
          </SelectTrigger>
          <SelectContent>
            {gerentes.map((gerente) => (
              <SelectItem key={gerente.id} value={gerente.id.toString()}>
                {gerente.nome}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  )
}
