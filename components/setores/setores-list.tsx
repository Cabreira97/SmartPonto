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
import SetorDetalhes from "./setor-detalhes"
import EditarSetorForm from "./editar-setor-form"
import GerenciarFuncionariosForm from "./gerenciar-funcionarios-form"
import ExcluirSetorDialog from "./excluir-setor-dialog"

// Dados simulados para demonstração
const setores = [
  {
    id: 1,
    nome: "Tecnologia da Informação",
    descricao: "Responsável pelo desenvolvimento e manutenção de sistemas",
    gerente: "Ana Silva",
    gerente_id: 1,
    total_funcionarios: 15,
    criado_em: "2022-01-15T10:30:00",
  },
  {
    id: 2,
    nome: "Recursos Humanos",
    descricao: "Responsável pela gestão de pessoal e recrutamento",
    gerente: "Eduarda Lima",
    gerente_id: 5,
    total_funcionarios: 8,
    criado_em: "2022-01-20T14:15:00",
  },
  {
    id: 3,
    nome: "Financeiro",
    descricao: "Responsável pela gestão financeira e contabilidade",
    gerente: "Gabriela Martins",
    gerente_id: 7,
    total_funcionarios: 10,
    criado_em: "2022-01-20T14:30:00",
  },
  {
    id: 4,
    nome: "Marketing",
    descricao: "Responsável pela promoção e divulgação da empresa",
    gerente: "Carla Oliveira",
    gerente_id: 3,
    total_funcionarios: 12,
    criado_em: "2022-01-20T14:45:00",
  },
  {
    id: 5,
    nome: "Vendas",
    descricao: "Responsável pela comercialização de produtos e serviços",
    gerente: "Daniel Santos",
    gerente_id: 4,
    total_funcionarios: 20,
    criado_em: "2022-01-25T09:00:00",
  },
]

type DialogType = "detalhes" | "editar" | "gerenciarFuncionarios" | "excluir" | null

export default function SetoresList() {
  const [setorSelecionado, setSetorSelecionado] = useState<number | null>(null)
  const [dialogoAberto, setDialogoAberto] = useState<DialogType>(null)

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString()
  }

  const getSetorById = (id: number) => {
    return setores.find((setor) => setor.id === id)
  }

  const abrirDialogo = (id: number, tipo: DialogType) => {
    setSetorSelecionado(id)
    setDialogoAberto(tipo)
  }

  const fecharDialogo = () => {
    setDialogoAberto(null)
  }

  const getDialogTitle = () => {
    const setor = setorSelecionado ? getSetorById(setorSelecionado) : null

    switch (dialogoAberto) {
      case "detalhes":
        return {
          title: "Detalhes do Setor",
          description: "Informações detalhadas sobre o setor e seus funcionários.",
        }
      case "editar":
        return {
          title: `Editar Setor: ${setor?.nome}`,
          description: "Atualize as informações do setor.",
        }
      case "gerenciarFuncionarios":
        return {
          title: `Gerenciar Funcionários: ${setor?.nome}`,
          description: "Adicione ou remova funcionários deste setor.",
        }
      case "excluir":
        return {
          title: `Excluir Setor: ${setor?.nome}`,
          description: "Esta ação não pode ser desfeita.",
        }
      default:
        return { title: "", description: "" }
    }
  }

  const dialogTitle = getDialogTitle()

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead>Gerente</TableHead>
              <TableHead>Funcionários</TableHead>
              <TableHead>Criado em</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {setores.map((setor) => (
              <TableRow key={setor.id}>
                <TableCell className="font-medium">{setor.nome}</TableCell>
                <TableCell>{setor.descricao}</TableCell>
                <TableCell>{setor.gerente}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-50">
                    <Users className="h-3 w-3 mr-1" />
                    {setor.total_funcionarios}
                  </Badge>
                </TableCell>
                <TableCell>{formatarData(setor.criado_em)}</TableCell>
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
                      <DropdownMenuItem onClick={() => abrirDialogo(setor.id, "detalhes")}>
                        <Eye className="h-4 w-4 mr-2" />
                        Ver detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => abrirDialogo(setor.id, "editar")}>
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => abrirDialogo(setor.id, "gerenciarFuncionarios")}>
                        <Users className="h-4 w-4 mr-2" />
                        Gerenciar funcionários
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600" onClick={() => abrirDialogo(setor.id, "excluir")}>
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

      {/* Diálogo Dinâmico */}
      <Dialog open={dialogoAberto !== null} onOpenChange={(open) => !open && fecharDialogo()}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{dialogTitle.title}</DialogTitle>
            <DialogDescription>{dialogTitle.description}</DialogDescription>
          </DialogHeader>

          {setorSelecionado && dialogoAberto === "detalhes" && (
            <SetorDetalhes setor={getSetorById(setorSelecionado)!} />
          )}

          {setorSelecionado && dialogoAberto === "editar" && (
            <EditarSetorForm setor={getSetorById(setorSelecionado)!} onSuccess={fecharDialogo} />
          )}

          {setorSelecionado && dialogoAberto === "gerenciarFuncionarios" && (
            <GerenciarFuncionariosForm setor={getSetorById(setorSelecionado)!} onSuccess={fecharDialogo} />
          )}

          {setorSelecionado && dialogoAberto === "excluir" && (
            <ExcluirSetorDialog setor={getSetorById(setorSelecionado)!} onSuccess={fecharDialogo} />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
