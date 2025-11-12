"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, CheckCircle, XCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DetalheSolicitacao from "./detalhe-solicitacao"

// Dados simulados para demonstração
const minhasSolicitacoes = [
  {
    id: 1,
    tipo: "FERIAS",
    data_inicio: "2023-12-20",
    data_fim: "2024-01-18",
    status: "APROVADA",
    justificativa: "Férias de fim de ano",
    solicitado_em: "2023-10-15T10:30:00",
    aprovado_por: "Daniel Santos",
  },
  {
    id: 2,
    tipo: "FOLGA",
    data_inicio: "2023-11-17",
    data_fim: "2023-11-17",
    status: "PENDENTE",
    justificativa: "Consulta médica",
    solicitado_em: "2023-11-10T14:15:00",
    aprovado_por: null,
  },
  {
    id: 3,
    tipo: "LICENCA",
    data_inicio: "2023-11-25",
    data_fim: "2023-11-30",
    status: "PENDENTE",
    justificativa: "Licença para curso de especialização",
    solicitado_em: "2023-11-05T09:45:00",
    aprovado_por: null,
  },
]

export default function MinhasSolicitacoes() {
  const [solicitacaoDetalhes, setSolicitacaoDetalhes] = useState<number | null>(null)

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString()
  }

  const getSolicitacaoById = (id: number) => {
    return minhasSolicitacoes.find((solicitacao) => solicitacao.id === id)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "APROVADA":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="h-3 w-3 mr-1" />
            Aprovada
          </Badge>
        )
      case "REJEITADA":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-700 hover:bg-red-100">
            <XCircle className="h-3 w-3 mr-1" />
            Rejeitada
          </Badge>
        )
      case "PENDENTE":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <Clock className="h-3 w-3 mr-1" />
            Pendente
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            {status}
          </Badge>
        )
    }
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
              <TableHead>Tipo</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Solicitado em</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {minhasSolicitacoes.map((solicitacao) => (
              <TableRow key={solicitacao.id}>
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
                <TableCell>{getStatusBadge(solicitacao.status)}</TableCell>
                <TableCell>{formatarData(solicitacao.solicitado_em)}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => setSolicitacaoDetalhes(solicitacao.id)}>
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      {/* Diálogo de Detalhes da Solicitação */}
      <Dialog open={solicitacaoDetalhes !== null} onOpenChange={(open) => !open && setSolicitacaoDetalhes(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Detalhes da Solicitação</DialogTitle>
            <DialogDescription>Informações detalhadas sobre a solicitação de folga ou férias.</DialogDescription>
          </DialogHeader>

          {solicitacaoDetalhes && <DetalheSolicitacao solicitacao={getSolicitacaoById(solicitacaoDetalhes)!} />}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
