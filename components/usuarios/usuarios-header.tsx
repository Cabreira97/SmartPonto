"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus, Filter, Download } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NovoUsuarioForm from "./novo-usuario-form"

export default function UsuariosHeader() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroSetor, setFiltroSetor] = useState("")
  const [filtroCargo, setFiltroCargo] = useState("")

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-64">
          <Input
            placeholder="Buscar usuários..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Filter className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>

        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Novo Usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Criar Novo Usuário</DialogTitle>
                <DialogDescription>Preencha os dados para criar um novo usuário no sistema.</DialogDescription>
              </DialogHeader>

              <NovoUsuarioForm onClose={() => setIsDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={filtroSetor} onValueChange={setFiltroSetor}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrar por setor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os setores</SelectItem>
            <SelectItem value="ti">TI</SelectItem>
            <SelectItem value="rh">RH</SelectItem>
            <SelectItem value="financeiro">Financeiro</SelectItem>
            <SelectItem value="marketing">Marketing</SelectItem>
            <SelectItem value="vendas">Vendas</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroCargo} onValueChange={setFiltroCargo}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filtrar por cargo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os cargos</SelectItem>
            <SelectItem value="analista">Analista</SelectItem>
            <SelectItem value="desenvolvedor">Desenvolvedor</SelectItem>
            <SelectItem value="gerente">Gerente</SelectItem>
            <SelectItem value="diretor">Diretor</SelectItem>
            <SelectItem value="suporte">Suporte</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
