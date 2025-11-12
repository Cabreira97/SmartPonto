import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, FileText, CheckCircle, XCircle } from "lucide-react"

interface Solicitacao {
  id: number
  usuario?: string
  usuario_id?: number
  tipo: string
  data_inicio: string
  data_fim: string
  status: string
  justificativa: string
  solicitado_em: string
  aprovado_por?: string | null
  data_aprovacao?: string
  motivo_rejeicao?: string
}

interface DetalheSolicitacaoProps {
  solicitacao: Solicitacao
}

export default function DetalheSolicitacao({ solicitacao }: DetalheSolicitacaoProps) {
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString() + " " + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
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
    <div className="space-y-6 py-4">
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Solicitação #{solicitacao.id}</h3>
          {getStatusBadge(solicitacao.status)}
        </div>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-2">Tipo:</span>
          {getTipoBadge(solicitacao.tipo)}
        </div>
      </div>

      {solicitacao.usuario && (
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2 text-gray-500" />
          <span>Funcionário: {solicitacao.usuario}</span>
        </div>
      )}

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
        <span>Solicitado em: {formatarData(solicitacao.solicitado_em)}</span>
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

      {solicitacao.aprovado_por && (
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2 text-gray-500" />
          <span>
            {solicitacao.status === "APROVADA" ? "Aprovado" : "Analisado"} por: {solicitacao.aprovado_por}
          </span>
        </div>
      )}

      {solicitacao.data_aprovacao && (
        <div className="flex items-center">
          <Clock className="h-5 w-5 mr-2 text-gray-500" />
          <span>Data da análise: {formatarData(solicitacao.data_aprovacao)}</span>
        </div>
      )}

      {solicitacao.motivo_rejeicao && (
        <div className="space-y-2">
          <div className="flex items-start">
            <XCircle className="h-5 w-5 mr-2 text-red-500 mt-0.5" />
            <div>
              <span className="font-medium">Motivo da rejeição:</span>
              <p className="text-sm text-gray-600 mt-1">{solicitacao.motivo_rejeicao}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
