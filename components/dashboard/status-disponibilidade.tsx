"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, User, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Dados simulados para demonstração
const funcionariosAusentes = [
  {
    id: 1,
    nome: "Ana Silva",
    avatar: "AS",
    cargo: "Analista de TI",
    setor: "TI",
    tipo: "FERIAS",
    data_inicio: "2023-12-20",
    data_fim: "2024-01-18",
    mensagem: "Estarei de férias e sem acesso ao e-mail. Para assuntos urgentes, contate o Bruno.",
    contato_emergencia: "Bruno Costa (bruno.costa@empresa.com)",
  },
  {
    id: 3,
    nome: "Carla Oliveira",
    avatar: "CO",
    cargo: "Designer",
    setor: "Marketing",
    tipo: "LICENCA",
    data_inicio: "2023-11-25",
    data_fim: "2023-11-30",
    mensagem: "Em licença para curso de especialização. Verificarei e-mails apenas no final do dia.",
    contato_emergencia: "Daniel Santos (daniel.santos@empresa.com)",
  },
  {
    id: 5,
    nome: "Eduarda Lima",
    avatar: "EL",
    cargo: "Analista de RH",
    setor: "RH",
    tipo: "FOLGA",
    data_inicio: "2023-11-17",
    data_fim: "2023-11-17",
    mensagem: "Folga compensatória. Retorno amanhã normalmente.",
    contato_emergencia: "Gabriela Martins (gabriela.martins@empresa.com)",
  },
]

export default function StatusDisponibilidade() {
  const [detalhesAbertos, setDetalhesAbertos] = useState<number | null>(null)

  const getFuncionarioById = (id: number) => {
    return funcionariosAusentes.find((f) => f.id === id)
  }

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString()
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
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
            Funcionários Ausentes
          </CardTitle>
          <CardDescription>Colegas que estão de folga, férias ou licença</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funcionariosAusentes.length > 0 ? (
              funcionariosAusentes.map((funcionario) => (
                <div key={funcionario.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={funcionario.nome} />
                      <AvatarFallback>{funcionario.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{funcionario.nome}</div>
                      <div className="text-xs text-muted-foreground">{funcionario.setor}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTipoBadge(funcionario.tipo)}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => setDetalhesAbertos(funcionario.id)}
                          >
                            <span className="sr-only">Detalhes</span>
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Ver detalhes</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-muted-foreground">Nenhum funcionário ausente no momento</div>
            )}
          </div>
          <div className="mt-4 text-center">
            <Button variant="link" size="sm" asChild>
              <a href="/status-disponibilidade">Ver todos</a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Diálogo de Detalhes */}
      <Dialog open={detalhesAbertos !== null} onOpenChange={(open) => !open && setDetalhesAbertos(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes de Ausência</DialogTitle>
            <DialogDescription>Informações sobre o período de ausência do funcionário</DialogDescription>
          </DialogHeader>

          {detalhesAbertos && (
            <div className="space-y-4">
              {(() => {
                const funcionario = getFuncionarioById(detalhesAbertos)
                if (!funcionario) return null

                return (
                  <>
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={funcionario.nome} />
                        <AvatarFallback>{funcionario.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-lg">{funcionario.nome}</h3>
                        <p className="text-sm text-muted-foreground">
                          {funcionario.cargo} - {funcionario.setor}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">Status:</span>
                      {getTipoBadge(funcionario.tipo)}
                    </div>

                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>
                        Período: {formatarData(funcionario.data_inicio)}
                        {funcionario.data_inicio !== funcionario.data_fim &&
                          ` até ${formatarData(funcionario.data_fim)}`}
                      </span>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                      <h4 className="font-medium flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                        Mensagem:
                      </h4>
                      <p className="mt-1 text-sm">{funcionario.mensagem}</p>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                      <h4 className="font-medium flex items-center">
                        <User className="h-4 w-4 mr-2 text-blue-500" />
                        Contato para emergências:
                      </h4>
                      <p className="mt-1 text-sm">{funcionario.contato_emergencia}</p>
                    </div>
                  </>
                )
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
