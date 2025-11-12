"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { DialogFooter } from "@/components/ui/dialog"
import { Search, UserCheck, UserX } from "lucide-react"

interface Escala {
  id: number
  nome: string
  descricao: string
  usuarios_atribuidos: number
  criado_em: string
}

interface AtribuirEscalaFormProps {
  escala: Escala
  onClose: () => void
}

// Dados simulados para demonstração
const usuarios = [
  { id: 1, nome: "Ana Silva", email: "ana.silva@empresa.com", cargo: "Analista", setor: "TI", atribuido: true },
  {
    id: 2,
    nome: "Bruno Costa",
    email: "bruno.costa@empresa.com",
    cargo: "Desenvolvedor",
    setor: "TI",
    atribuido: true,
  },
  {
    id: 3,
    nome: "Carla Oliveira",
    email: "carla.oliveira@empresa.com",
    cargo: "Designer",
    setor: "Marketing",
    atribuido: false,
  },
  {
    id: 4,
    nome: "Daniel Santos",
    email: "daniel.santos@empresa.com",
    cargo: "Gerente",
    setor: "Vendas",
    atribuido: false,
  },
  { id: 5, nome: "Eduarda Lima", email: "eduarda.lima@empresa.com", cargo: "Analista", setor: "RH", atribuido: true },
  {
    id: 6,
    nome: "Fernando Gomes",
    email: "fernando.gomes@empresa.com",
    cargo: "Suporte",
    setor: "TI",
    atribuido: false,
  },
  {
    id: 7,
    nome: "Gabriela Martins",
    email: "gabriela.martins@empresa.com",
    cargo: "Analista",
    setor: "Financeiro",
    atribuido: true,
  },
]

export default function AtribuirEscalaForm({ escala, onClose }: AtribuirEscalaFormProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [usuariosSelecionados, setUsuariosSelecionados] = useState<number[]>(
    usuarios.filter((u) => u.atribuido).map((u) => u.id),
  )

  const handleToggleUsuario = (usuarioId: number) => {
    if (usuariosSelecionados.includes(usuarioId)) {
      setUsuariosSelecionados(usuariosSelecionados.filter((id) => id !== usuarioId))
    } else {
      setUsuariosSelecionados([...usuariosSelecionados, usuarioId])
    }
  }

  const filteredUsuarios = usuarios.filter(
    (usuario) =>
      usuario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.cargo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.setor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleSubmit = () => {
    // Aqui seria feita a chamada à API para atribuir a escala aos usuários
    console.log("Atribuindo escala:", {
      escala_id: escala.id,
      usuarios_ids: usuariosSelecionados,
    })

    onClose()
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{escala.nome}</h3>
        <p className="text-sm text-gray-500">{escala.descricao}</p>
      </div>

      <div className="relative">
        <Input
          placeholder="Buscar usuários..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
      </div>

      <div className="border rounded-md max-h-[300px] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>
                  <Checkbox
                    checked={usuariosSelecionados.includes(usuario.id)}
                    onCheckedChange={() => handleToggleUsuario(usuario.id)}
                  />
                </TableCell>
                <TableCell>
                  <div className="font-medium">{usuario.nome}</div>
                  <div className="text-xs text-gray-500">{usuario.email}</div>
                </TableCell>
                <TableCell>{usuario.cargo}</TableCell>
                <TableCell>{usuario.setor}</TableCell>
                <TableCell>
                  {usuario.atribuido ? (
                    <div className="flex items-center text-green-600">
                      <UserCheck className="h-4 w-4 mr-1" />
                      <span>Atribuído</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-500">
                      <UserX className="h-4 w-4 mr-1" />
                      <span>Não atribuído</span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Salvar Atribuições</Button>
      </DialogFooter>
    </div>
  )
}
