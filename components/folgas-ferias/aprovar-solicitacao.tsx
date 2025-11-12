"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { Calendar, User, FileText, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Solicitacao {
  id: number
  usuario: string
  usuario_id: number
  tipo: string
  data_inicio: string
  data_fim: string
  status: string
  justificativa: string
  solicitado_em: string
}

interface AprovarSolicitacaoProps {
  solicitacao: Solicitacao
  onClose: () => void
}

export default function AprovarSolicitacao({ solicitacao, onClose }: AprovarSolicitacaoProps) {
  const [motivoRejeicao, setMotivoRejeicao] = useState("")
  const [isRejeitando, setIsRejeitando] = useState(false)

  const handleAprovar = () => {
    // Aqui seria feita a chamada à API para aprovar a solicitação
    console.log("Aprovando solicitação:", {
      id: solicitacao.id,
      status: "APROVADA",
    })

    onClose()
  }

  const handleRejeitar = () => {
    // Aqui seria feita a chamada à API para rejeitar a solicitação
    console.log("Rejeitando solicitação:", {
      id: solicitacao.id,
      status: "REJEITADA",
      motivo_rejeicao: motivoRejeicao,
    })

    onClose()
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
    <div className="space-y-6 py-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Solicitação #{solicitacao.id}</h3>
          {getTipoBadge(solicitacao.tipo)}
        </div>
      </div>

      <div className="flex items-center">
        <User className="h-5 w-5 mr-2 text-gray-500" />
        <span>Funcionário: {solicitacao.usuario}</span>
      </div>

      <div className="flex items-center">
        <Calendar className="h-5 w-5 mr-2 text-gray-500" />
        <span>
          Período: {new Date(solicitacao.data_inicio).toLocaleDateString()}
          {solicitacao.data_inicio !== solicitacao.data_fim &&
            ` até ${new Date(solicitacao.data_fim).toLocaleDateString()}`}
        </span>
      </div>

      <div className="flex items-center">
        <Clock className="h-5 w-5 mr-2 text-gray-500" />
        <span>Solicitado em: {new Date(solicitacao.solicitado_em).toLocaleDateString()}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-start">
          <FileText className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
          <div>
            <span className="font-medium">Justificativa:</span>
            <p className="text-sm text-gray-600 mt-1">{solicitacao.justificativa}</p>
          </div>
        </div>
      </div>

      {isRejeitando && (
        <div className="space-y-2">
          <Label htmlFor="motivoRejeicao">Motivo da Rejeição</Label>
          <Textarea
            id="motivoRejeicao"
            placeholder="Descreva o motivo da rejeição"
            value={motivoRejeicao}
            onChange={(e) => setMotivoRejeicao(e.target.value)}
          />
        </div>
      )}

      <DialogFooter>
        {isRejeitando ? (
          <>
            <Button variant="outline" onClick={() => setIsRejeitando(false)}>
              Voltar
            </Button>
            <Button variant="destructive" onClick={handleRejeitar} disabled={!motivoRejeicao}>
              Confirmar Rejeição
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setIsRejeitando(true)}>
              Rejeitar
            </Button>
            <Button onClick={handleAprovar}>Aprovar</Button>
          </>
        )}
      </DialogFooter>
    </div>
  )
}
