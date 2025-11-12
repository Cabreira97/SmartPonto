"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Edit, Eye, Key, Calendar, UserCheck, UserX } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/components/ui/use-toast"
import UsuarioDetalhes from "./usuario-detalhes"
import EditarUsuarioForm from "./editar-usuario-form"
import RedefinirSenhaForm from "./redefinir-senha-form"
import AtribuirEscalaUsuarioForm from "./atribuir-escala-usuario-form"

// Dados simulados para demonstração
const usuariosIniciais = [
  {
    id: 1,
    nome: "Ana Silva",
    email: "ana.silva@empresa.com",
    telefone: "(11) 98765-4321",
    cargo: "Analista",
    setor: "TI",
    data_contratacao: "2021-05-10",
    ativo: true,
  },
  {
    id: 2,
    nome: "Bruno Costa",
    email: "bruno.costa@empresa.com",
    telefone: "(11) 91234-5678",
    cargo: "Desenvolvedor",
    setor: "TI",
    data_contratacao: "2022-01-15",
    ativo: true,
  },
  {
    id: 3,
    nome: "Carla Oliveira",
    email: "carla.oliveira@empresa.com",
    telefone: "(11) 99876-5432",
    cargo: "Designer",
    setor: "Marketing",
    data_contratacao: "2020-11-20",
    ativo: true,
  },
  {
    id: 4,
    nome: "Daniel Santos",
    email: "daniel.santos@empresa.com",
    telefone: "(11) 95555-4444",
    cargo: "Gerente",
    setor: "Vendas",
    data_contratacao: "2019-08-05",
    ativo: true,
  },
  {
    id: 5,
    nome: "Eduarda Lima",
    email: "eduarda.lima@empresa.com",
    telefone: "(11) 94444-3333",
    cargo: "Analista",
    setor: "RH",
    data_contratacao: "2022-03-01",
    ativo: false,
  },
]

export default function UsuariosList() {
  const [usuarios, setUsuarios] = useState(usuariosIniciais)
  const [usuarioDetalhes, setUsuarioDetalhes] = useState<number | null>(null)
  const [usuarioEditar, setUsuarioEditar] = useState<number | null>(null)
  const [usuarioRedefinirSenha, setUsuarioRedefinirSenha] = useState<number | null>(null)
  const [usuarioAtribuirEscala, setUsuarioAtribuirEscala] = useState<number | null>(null)
  const [usuarioParaToggle, setUsuarioParaToggle] = useState<number | null>(null)
  const { toast } = useToast()

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString()
  }

  const getUsuarioById = (id: number) => {
    return usuarios.find((usuario) => usuario.id === id)
  }

  const handleToggleStatus = (usuarioId: number) => {
    const usuario = getUsuarioById(usuarioId)
    if (!usuario) return

    setUsuarios((prev) => prev.map((u) => (u.id === usuarioId ? { ...u, ativo: !u.ativo } : u)))

    toast({
      title: "Status alterado",
      description: `Usuário ${usuario.nome} foi ${usuario.ativo ? "desativado" : "ativado"} com sucesso.`,
    })

    setUsuarioParaToggle(null)
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead className="hidden sm:table-cell">E-mail</TableHead>
                <TableHead className="hidden md:table-cell">Cargo</TableHead>
                <TableHead className="hidden lg:table-cell">Setor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-medium">{usuario.nome}</div>
                      <div className="text-sm text-muted-foreground sm:hidden">{usuario.email}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{usuario.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{usuario.cargo}</TableCell>
                  <TableCell className="hidden lg:table-cell">{usuario.setor}</TableCell>
                  <TableCell>
                    {usuario.ativo ? (
                      <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">
                        <UserCheck className="h-3 w-3 mr-1" />
                        Ativo
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100">
                        <UserX className="h-3 w-3 mr-1" />
                        Inativo
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setUsuarioDetalhes(usuario.id)}>
                          <Eye className="h-4 w-4 mr-2" />
                          Ver detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setUsuarioEditar(usuario.id)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setUsuarioRedefinirSenha(usuario.id)}>
                          <Key className="h-4 w-4 mr-2" />
                          Redefinir senha
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setUsuarioAtribuirEscala(usuario.id)}>
                          <Calendar className="h-4 w-4 mr-2" />
                          Atribuir escala
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className={usuario.ativo ? "text-red-600" : "text-green-600"}
                          onClick={() => setUsuarioParaToggle(usuario.id)}
                        >
                          {usuario.ativo ? (
                            <>
                              <UserX className="h-4 w-4 mr-2" />
                              Desativar
                            </>
                          ) : (
                            <>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Ativar
                            </>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      {/* Diálogo de Detalhes do Usuário */}
      <Dialog open={usuarioDetalhes !== null} onOpenChange={(open) => !open && setUsuarioDetalhes(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes do Usuário</DialogTitle>
            <DialogDescription>Informações detalhadas sobre o usuário.</DialogDescription>
          </DialogHeader>

          {usuarioDetalhes && <UsuarioDetalhes usuario={getUsuarioById(usuarioDetalhes)!} />}
        </DialogContent>
      </Dialog>

      {/* Diálogo de Editar Usuário */}
      <Dialog open={usuarioEditar !== null} onOpenChange={(open) => !open && setUsuarioEditar(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>Atualize as informações do usuário.</DialogDescription>
          </DialogHeader>

          {usuarioEditar && (
            <EditarUsuarioForm usuario={getUsuarioById(usuarioEditar)!} onClose={() => setUsuarioEditar(null)} />
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de Redefinir Senha */}
      <Dialog open={usuarioRedefinirSenha !== null} onOpenChange={(open) => !open && setUsuarioRedefinirSenha(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Redefinir Senha</DialogTitle>
            <DialogDescription>Defina uma nova senha para o usuário.</DialogDescription>
          </DialogHeader>

          {usuarioRedefinirSenha && (
            <RedefinirSenhaForm
              usuario={getUsuarioById(usuarioRedefinirSenha)!}
              onClose={() => setUsuarioRedefinirSenha(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de Atribuir Escala */}
      <Dialog open={usuarioAtribuirEscala !== null} onOpenChange={(open) => !open && setUsuarioAtribuirEscala(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Atribuir Escala</DialogTitle>
            <DialogDescription>Atribua uma escala de trabalho ao usuário.</DialogDescription>
          </DialogHeader>

          {usuarioAtribuirEscala && (
            <AtribuirEscalaUsuarioForm
              usuario={getUsuarioById(usuarioAtribuirEscala)!}
              onClose={() => setUsuarioAtribuirEscala(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* AlertDialog para Confirmar Toggle de Status */}
      <AlertDialog open={usuarioParaToggle !== null} onOpenChange={(open) => !open && setUsuarioParaToggle(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {usuarioParaToggle && getUsuarioById(usuarioParaToggle)?.ativo ? "Desativar" : "Ativar"} Usuário
            </AlertDialogTitle>
            <AlertDialogDescription>
              {usuarioParaToggle && (
                <>
                  Tem certeza que deseja {getUsuarioById(usuarioParaToggle)?.ativo ? "desativar" : "ativar"} o usuário{" "}
                  <strong>{getUsuarioById(usuarioParaToggle)?.nome}</strong>?
                  {getUsuarioById(usuarioParaToggle)?.ativo && (
                    <span className="block mt-2 text-sm text-muted-foreground">
                      O usuário não poderá mais acessar o sistema até ser reativado.
                    </span>
                  )}
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => usuarioParaToggle && handleToggleStatus(usuarioParaToggle)}
              className={
                usuarioParaToggle && getUsuarioById(usuarioParaToggle)?.ativo
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }
            >
              {usuarioParaToggle && getUsuarioById(usuarioParaToggle)?.ativo ? "Desativar" : "Ativar"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
