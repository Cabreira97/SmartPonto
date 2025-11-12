"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, User } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import AprovarSolicitacao from "./aprovar-solicitacao"

// Dados simulados para demonstração
const solicitacoesPendentes = [
  {
    id: 1,
    usuario: "Bruno Costa",
    usuario_id: 2,
    tipo: "FOLGA",
    data_inicio: "2023-11-20",
    data_fim: "2023-11-20",
    status: "PENDENTE",
    justificativa: "Compromisso pessoal",
    solicitado_em: "2023-11-15T10:30:00",
  },
  {
    id: 2,
    usuario: "Carla Oliveira",
    usuario_id: 3,
    tipo: "FERIAS",
    data_inicio: "2023-12-10",
    data_fim: "2023-12-30",
    status: "PENDENTE",
    justificativa: "Férias de fim de ano",
    solicitado_em: "2023-11-05T14:15:00",
  },
  {
    id: 3,
    usuario: "Henrique Alves",
    usuario_id: 8,
    tipo: "LICENCA",
    data_inicio: "2023-11-27",
    data_fim: "2023-12-01",
    status: "PENDENTE",
    justificativa: "Licença para curso de especialização",
    solicitado_em: "2023-11-10T09:45:00",
  },
]

export default function SolicitacoesPendentes() {
  const [solicitacaoAprovar, setSolicitacaoAprovar] = useState<number | null>(null)

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString()
  }

  const getSolicitacaoById = (id: number) => {
    return solicitacoesPendentes.find((solicitacao) => solicitacao.id === id)
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "FERIAS":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Férias
          </Badge>
        )
      case "FOLGA":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            Folga
          </Badge>
        )
      case "LICENCA":
        return (
          <Badge variant="outline" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
            Licença
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            {tipo}
          </Badge>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Funcionário</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Solicitado em</TableHead>
              <TableHead className="w-[150px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {solicitacoesPendentes.map((solicitacao) => (
              <TableRow key={solicitacao.id}>
                <TableCell>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{solicitacao.usuario}</span>
                  </div>
                </TableCell>
                <TableCell>{getTipoBadge(solicitacao.tipo)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                    <span>
                      {formatarData(solicitacao.data_inicio)}
                      {solicitacao.data_inicio !== solicitacao.data_fim && ` até ${formatarData(solicitacao.data_fim)}`}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-500" />
                    <span>{formatarData(solicitacao.solicitado_em)}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => setSolicitacaoAprovar(solicitacao.id)}>
                    Analisar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Diálogo de Aprovação da Solicitação */}
      <Dialog open={solicitacaoAprovar !== null} onOpenChange={(open) => !open && setSolicitacaoAprovar(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Analisar Solicitação</DialogTitle>
            <DialogDescription>Aprove ou rejeite a solicitação de folga ou férias.</DialogDescription>
          </DialogHeader>

          {solicitacaoAprovar && (
            <AprovarSolicitacao
              solicitacao={getSolicitacaoById(solicitacaoAprovar)!}
              onClose={() => setSolicitacaoAprovar(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
