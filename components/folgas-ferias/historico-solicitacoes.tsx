"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, CheckCircle, XCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import DetalheSolicitacao from "./detalhe-solicitacao"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados simulados para demonstração
const historicoSolicitacoes = [
  {
    id: 1,
    usuario: "Ana Silva",
    usuario_id: 1,
    tipo: "FERIAS",
    data_inicio: "2023-07-10",
    data_fim: "2023-07-30",
    status: "APROVADA",
    justificativa: "Férias de julho",
    solicitado_em: "2023-06-01T10:30:00",
    aprovado_por: "Daniel Santos",
    data_aprovacao: "2023-06-05T14:20:00",
  },
  {
    id: 2,
    usuario: "Bruno Costa",
    usuario_id: 2,
    tipo: "FOLGA",
    data_inicio: "2023-08-15",
    data_fim: "2023-08-15",
    status: "APROVADA",
    justificativa: "Consulta médica",
    solicitado_em: "2023-08-10T14:15:00",
    aprovado_por: "Daniel Santos",
    data_aprovacao: "2023-08-11T09:30:00",
  },
  {
    id: 3,
    usuario: "Carla Oliveira",
    usuario_id: 3,
    tipo: "LICENCA",
    data_inicio: "2023-09-05",
    data_fim: "2023-09-10",
    status: "REJEITADA",
    justificativa: "Licença para curso",
    solicitado_em: "2023-08-20T09:45:00",
    aprovado_por: "Daniel Santos",
    data_aprovacao: "2023-08-22T11:15:00",
    motivo_rejeicao: "Período crítico de projeto",
  },
  {
    id: 4,
    usuario: "Eduarda Lima",
    usuario_id: 5,
    tipo: "FERIAS",
    data_inicio: "2023-10-01",
    data_fim: "2023-10-20",
    status: "APROVADA",
    justificativa: "Férias de outubro",
    solicitado_em: "2023-09-01T10:30:00",
    aprovado_por: "Daniel Santos",
    data_aprovacao: "2023-09-05T14:20:00",
  },
]

export default function HistoricoSolicitacoes() {
  const [solicitacaoDetalhes, setSolicitacaoDetalhes] = useState<number | null>(null)
  const [filtroStatus, setFiltroStatus] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("")

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString()
  }

  const getSolicitacaoById = (id: number) => {
    return historicoSolicitacoes.find((solicitacao) => solicitacao.id === id)
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

  const filteredSolicitacoes = historicoSolicitacoes.filter((solicitacao) => {
    if (filtroStatus && solicitacao.status !== filtroStatus) return false
    if (filtroTipo && solicitacao.tipo !== filtroTipo) return false
    return true
  })

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Select value={filtroStatus} onValueChange={setFiltroStatus}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os status</SelectItem>
              <SelectItem value="APROVADA">Aprovada</SelectItem>
              <SelectItem value="REJEITADA">Rejeitada</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filtroTipo} onValueChange={setFiltroTipo}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <SelectValue placeholder="Filtrar por tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os tipos</SelectItem>
              <SelectItem value="FERIAS">Férias</SelectItem>
              <SelectItem value="FOLGA">Folga</SelectItem>
              <SelectItem value="LICENCA">Licença</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Funcionário</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Período</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSolicitacoes.map((solicitacao) => (
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
                <TableCell>{getStatusBadge(solicitacao.status)}</TableCell>
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
