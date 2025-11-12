"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface NovoSetorFormProps {
  onClose: () => void
}

// Dados simulados para demonstração
const gerentes = [
  { id: 1, nome: "Ana Silva", email: "ana.silva@empresa.com" },
  { id: 2, nome: "Bruno Costa", email: "bruno.costa@empresa.com" },
  { id: 4, nome: "Daniel Santos", email: "daniel.santos@empresa.com" },
  { id: 7, nome: "Gabriela Martins", email: "gabriela.martins@empresa.com" },
]

export default function NovoSetorForm({ onClose }: NovoSetorFormProps) {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [gerenteId, setGerenteId] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = () => {
    // Aqui seria feita a chamada à API para criar o setor
    console.log("Criando setor:", {
      nome,
      descricao,
      gerente_id: gerenteId ? Number.parseInt(gerenteId) : null,
    })

    onClose()
  }

  const filteredGerentes = gerentes.filter(
    (gerente) =>
      gerente.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      gerente.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <form className="space-y-6 py-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome do Setor</Label>
          <Input
            id="nome"
            placeholder="Ex: Departamento de TI"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea
            id="descricao"
            placeholder="Descreva as responsabilidades deste setor"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gerente">Gerente Responsável</Label>
          <div className="relative">
            <Input
              id="searchGerente"
              placeholder="Buscar gerente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 mb-2"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>
          <Select value={gerenteId} onValueChange={setGerenteId}>
            <SelectTrigger id="gerente">
              <SelectValue placeholder="Selecione um gerente" />
            </SelectTrigger>
            <SelectContent>
              {filteredGerentes.map((gerente) => (
                <SelectItem key={gerente.id} value={gerente.id.toString()}>
                  {gerente.nome} ({gerente.email})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Criar Setor</Button>
      </DialogFooter>
    </form>
  )
}
