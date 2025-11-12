"use client"

import { useState } from "react"
import { Edit, Trash2, Users, DollarSign, Shield, MoreHorizontal, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface Cargo {
  id: string
  nome: string
  descricao: string
  nivel: "junior" | "pleno" | "senior" | "coordenador" | "gerente" | "diretor"
  salarioBase: number
  ativo: boolean
  permissoes: string[]
  funcionarios: number
  criadoEm: string
  atualizadoEm: string
}

interface CargosListProps {
  cargos: Cargo[]
  onSelecionarCargo: (cargo: Cargo) => void
  onEditarCargo: (cargo: Cargo) => void
  onExcluirCargo: (id: string) => void
  onToggleStatus: (id: string) => void
}

export default function CargosList({
  cargos,
  onSelecionarCargo,
  onEditarCargo,
  onExcluirCargo,
  onToggleStatus,
}: CargosListProps) {
  const [filtroNome, setFiltroNome] = useState("")
  const [filtroNivel, setFiltroNivel] = useState<string>("todos")
  const [filtroStatus, setFiltroStatus] = useState<string>("todos")

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "junior":
        return "bg-green-100 text-green-800"
      case "pleno":
        return "bg-blue-100 text-blue-800"
      case "senior":
        return "bg-purple-100 text-purple-800"
      case "coordenador":
        return "bg-orange-100 text-orange-800"
      case "gerente":
        return "bg-red-100 text-red-800"
      case "diretor":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getNivelLabel = (nivel: string) => {
    switch (nivel) {
      case "junior":
        return "Júnior"
      case "pleno":
        return "Pleno"
      case "senior":
        return "Sênior"
      case "coordenador":
        return "Coordenador"
      case "gerente":
        return "Gerente"
      case "diretor":
        return "Diretor"
      default:
        return nivel
    }
  }

  const cargosFiltrados = cargos.filter((cargo) => {
    const matchNome = cargo.nome.toLowerCase().includes(filtroNome.toLowerCase())
    const matchNivel = filtroNivel === "todos" || cargo.nivel === filtroNivel
    const matchStatus =
      filtroStatus === "todos" ||
      (filtroStatus === "ativo" && cargo.ativo) ||
      (filtroStatus === "inativo" && !cargo.ativo)

    return matchNome && matchNivel && matchStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Buscar por nome do cargo..."
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          className="sm:max-w-xs"
        />

        <Select value={filtroNivel} onValueChange={setFiltroNivel}>
          <SelectTrigger className="sm:w-[180px]">
            <SelectValue placeholder="Filtrar por nível" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os níveis</SelectItem>
            <SelectItem value="junior">Júnior</SelectItem>
            <SelectItem value="pleno">Pleno</SelectItem>
            <SelectItem value="senior">Sênior</SelectItem>
            <SelectItem value="coordenador">Coordenador</SelectItem>
            <SelectItem value="gerente">Gerente</SelectItem>
            <SelectItem value="diretor">Diretor</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroStatus} onValueChange={setFiltroStatus}>
          <SelectTrigger className="sm:w-[180px]">
            <SelectValue placeholder="Filtrar por status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos os status</SelectItem>
            <SelectItem value="ativo">Ativos</SelectItem>
            <SelectItem value="inativo">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cargosFiltrados.map((cargo) => (
          <Card key={cargo.id} className={`${!cargo.ativo ? "opacity-60" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{cargo.nome}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={getNivelColor(cargo.nivel)}>
                      {getNivelLabel(cargo.nivel)}
                    </Badge>
                    <Badge variant={cargo.ativo ? "default" : "secondary"}>{cargo.ativo ? "Ativo" : "Inativo"}</Badge>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onSelecionarCargo(cargo)}>
                      <Eye className="h-4 w-4 mr-2" />
                      Ver Detalhes
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditarCargo(cargo)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onToggleStatus(cargo.id)}>
                      <Shield className="h-4 w-4 mr-2" />
                      {cargo.ativo ? "Desativar" : "Ativar"}
                    </DropdownMenuItem>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <DropdownMenuItem className="text-red-600" onSelect={(e) => e.preventDefault()}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o cargo "{cargo.nome}"? Esta ação não pode ser desfeita e
                            afetará {cargo.funcionarios} funcionário(s).
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onExcluirCargo(cargo.id)}
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">{cargo.descricao}</CardDescription>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>Salário Base</span>
                  </div>
                  <span className="font-medium">
                    R$ {cargo.salarioBase.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>Funcionários</span>
                  </div>
                  <span className="font-medium">{cargo.funcionarios}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Permissões</span>
                  </div>
                  <span className="font-medium">{cargo.permissoes.length}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Criado em {new Date(cargo.criadoEm).toLocaleDateString("pt-BR")}</span>
                  <span>Atualizado em {new Date(cargo.atualizadoEm).toLocaleDateString("pt-BR")}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {cargosFiltrados.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Shield className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Nenhum cargo encontrado</h3>
            <p className="text-muted-foreground text-center">
              {filtroNome || filtroNivel !== "todos" || filtroStatus !== "todos"
                ? "Tente ajustar os filtros para encontrar cargos."
                : "Comece criando seu primeiro cargo no sistema."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
