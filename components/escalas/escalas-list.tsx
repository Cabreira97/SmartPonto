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
import { MoreVertical, Users, Edit, Trash, Eye } from "lucide-react"
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
import EscalaDetalhes from "./escala-detalhes"
import AtribuirEscalaForm from "./atribuir-escala-form"
import EditarEscalaForm from "./editar-escala-form"

// Dados simulados para demonstração
const escalas = [
  {
    id: 1,
    nome: "Horário Comercial",
    descricao: "Segunda a sexta, 8h às 17h com 1h de almoço",
    usuarios_atribuidos: 12,
    criado_em: "2023-10-15T10:30:00",
  },
  {
    id: 2,
    nome: "Turno da Manhã",
    descricao: "Segunda a sábado, 6h às 14h",
    usuarios_atribuidos: 8,
    criado_em: "2023-10-20T14:15:00",
  },
  {
    id: 3,
    nome: "Turno da Tarde",
    descricao: "Segunda a sábado, 14h às 22h",
    usuarios_atribuidos: 7,
    criado_em: "2023-10-20T14:30:00",
  },
  {
    id: 4,
    nome: "Turno da Noite",
    descricao: "Segunda a sábado, 22h às 6h",
    usuarios_atribuidos: 5,
    criado_em: "2023-10-20T14:45:00",
  },
  {
    id: 5,
    nome: "Escala 12x36",
    descricao: "12 horas de trabalho por 36 horas de descanso",
    usuarios_atribuidos: 10,
    criado_em: "2023-10-25T09:00:00",
  },
]

export default function EscalasList() {
  const [escalaDetalhes, setEscalaDetalhes] = useState<number | null>(null)
  const [escalaAtribuir, setEscalaAtribuir] = useState<number | null>(null)
  const [escalaEditar, setEscalaEditar] = useState<number | null>(null)
  const [escalaExcluir, setEscalaExcluir] = useState<number | null>(null)
  const { toast } = useToast()

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString()
  }

  const getEscalaById = (id: number) => {
    return escalas.find((escala) => escala.id === id)
  }

  const handleExcluirEscala = () => {
    if (!escalaExcluir) return

    const escala = getEscalaById(escalaExcluir)

    toast({
      title: "Escala excluída",
      description: `A escala "${escala?.nome}" foi excluída com sucesso.`,
    })

    setEscalaExcluir(null)
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Usuários</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {escalas.map((escala) => (
              <TableRow key={escala.id}>
                <TableCell className="font-medium">{escala.nome}</TableCell>
                <TableCell>{escala.descricao}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                    <Users className="h-3 w-3 mr-1" />
                    {escala.usuarios_atribuidos}
                  </Badge>
                </TableCell>
                <TableCell>{formatarData(escala.criado_em)}</TableCell>
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
                      <DropdownMenuItem onClick={() => setEscalaDetalhes(escala.id)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEscalaEditar(escala.id)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEscalaAtribuir(escala.id)}>
                        <Users className="h-4 w-4 mr-2" />
                        Atribuir usuários
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => setEscalaExcluir(escala.id)}>
                        <Trash className="h-4 w-4 mr-2" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={escalaDetalhes !== null} onOpenChange={(open) => !open && setEscalaDetalhes(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Escala</DialogTitle>
            <DialogDescription>Informações detalhadas sobre a escala de trabalho.</DialogDescription>
          </DialogHeader>

          {escalaDetalhes && <EscalaDetalhes escala={getEscalaById(escalaDetalhes)!} />}
        </DialogContent>
      </Dialog>

      <Dialog open={escalaEditar !== null} onOpenChange={(open) => !open && setEscalaEditar(null)}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Escala de Trabalho</DialogTitle>
            <DialogDescription>Atualize as informações da escala de trabalho.</DialogDescription>
          </DialogHeader>

          {escalaEditar && <EditarEscalaForm />}
        </DialogContent>
      </Dialog>

      <Dialog open={escalaAtribuir !== null} onOpenChange={(open) => !open && setEscalaAtribuir(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Atribuir Usuários à Escala</DialogTitle>
            <DialogDescription>Selecione os usuários que seguirão esta escala de trabalho.</DialogDescription>
          </DialogHeader>

          {escalaAtribuir && (
            <AtribuirEscalaForm escala={getEscalaById(escalaAtribuir)!} onClose={() => setEscalaAtribuir(null)} />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={escalaExcluir !== null} onOpenChange={(open) => !open && setEscalaExcluir(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              {escalaExcluir && (
                <>
                  Tem certeza que deseja excluir a escala <strong>"{getEscalaById(escalaExcluir)?.nome}"</strong>?
                  <span className="block mt-2 text-sm text-muted-foreground">
                    Esta ação não pode ser desfeita e afetará {getEscalaById(escalaExcluir)?.usuarios_atribuidos}{" "}
                    usuário(s) atribuído(s) a esta escala.
                  </span>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleExcluirEscala} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  )
}
