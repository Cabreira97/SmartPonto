"use client"

import { useState } from "react"
import { Bell, Check, X, Clock, AlertCircle, Shield, Calendar, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

interface Notificacao {
  id: string
  tipo: "correcao_ponto" | "solicitacao_folga" | "aprovacao_horas_extras" | "lembrete_ponto" | "sistema"
  titulo: string
  descricao: string
  data: string
  lida: boolean
  prioridade: "alta" | "media" | "baixa"
  remetente?: string
  detalhes?: any
}

const notificacoesMock: Notificacao[] = [
  {
    id: "1",
    tipo: "correcao_ponto",
    titulo: "Solicitação de Correção de Ponto",
    descricao: "João Silva solicitou correção do ponto do dia 15/12/2024",
    data: "2024-12-15T14:30:00",
    lida: false,
    prioridade: "alta",
    remetente: "João Silva",
    detalhes: {
      funcionario: "João Silva",
      data: "15/12/2024",
      tipo: "Correção de Horários",
      horarioOriginal: {
        entrada: "08:00",
        saidaAlmoco: "12:00",
        retornoAlmoco: "13:00",
        saida: "17:00",
      },
      horarioSolicitado: {
        entrada: "08:15",
        saidaAlmoco: "12:00",
        retornoAlmoco: "13:00",
        saida: "17:15",
      },
      justificativa: "Atraso devido ao trânsito intenso na Av. Paulista. Compensei o tempo no final do expediente.",
      status: "PENDENTE",
    },
  },
  {
    id: "2",
    tipo: "solicitacao_folga",
    titulo: "Nova Solicitação de Folga",
    descricao: "Maria Santos solicitou folga para 20/12/2024",
    data: "2024-12-14T09:15:00",
    lida: false,
    prioridade: "media",
    remetente: "Maria Santos",
  },
  {
    id: "3",
    tipo: "aprovacao_horas_extras",
    titulo: "Aprovação de Horas Extras",
    descricao: "Pedro Costa solicitou 2h extras para 13/12/2024",
    data: "2024-12-13T16:45:00",
    lida: true,
    prioridade: "media",
    remetente: "Pedro Costa",
  },
  {
    id: "4",
    tipo: "lembrete_ponto",
    titulo: "Lembrete de Ponto",
    descricao: "Você esqueceu de bater o ponto de saída ontem",
    data: "2024-12-12T08:00:00",
    lida: true,
    prioridade: "baixa",
  },
  {
    id: "5",
    tipo: "sistema",
    titulo: "Atualização do Sistema",
    descricao: "Nova versão do Smart Ponto disponível",
    data: "2024-12-10T10:00:00",
    lida: true,
    prioridade: "baixa",
  },
]

export default function NotificacoesComponent() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(notificacoesMock)
  const [filtro, setFiltro] = useState<"todas" | "nao_lidas" | "correcao_ponto">("todas")
  const [notificacaoSelecionada, setNotificacaoSelecionada] = useState<Notificacao | null>(null)
  const { toast } = useToast()

  const getIconeNotificacao = (tipo: string) => {
    switch (tipo) {
      case "correcao_ponto":
        return <Shield className="h-4 w-4" />
      case "solicitacao_folga":
        return <Calendar className="h-4 w-4" />
      case "aprovacao_horas_extras":
        return <Clock className="h-4 w-4" />
      case "lembrete_ponto":
        return <AlertCircle className="h-4 w-4" />
      case "sistema":
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const getCorPrioridade = (prioridade: string) => {
    switch (prioridade) {
      case "alta":
        return "destructive"
      case "media":
        return "default"
      case "baixa":
        return "secondary"
      default:
        return "default"
    }
  }

  const marcarComoLida = (id: string) => {
    setNotificacoes((prev) => prev.map((notif) => (notif.id === id ? { ...notif, lida: true } : notif)))
  }

  const aprovarCorrecao = (id: string) => {
    toast({
      title: "Correção Aprovada",
      description: "A correção de ponto foi aprovada com sucesso.",
    })
    marcarComoLida(id)
  }

  const rejeitarCorrecao = (id: string) => {
    toast({
      title: "Correção Rejeitada",
      description: "A correção de ponto foi rejeitada.",
      variant: "destructive",
    })
    marcarComoLida(id)
  }

  const notificacoesFiltradas = notificacoes.filter((notif) => {
    if (filtro === "nao_lidas") return !notif.lida
    if (filtro === "correcao_ponto") return notif.tipo === "correcao_ponto"
    return true
  })

  const naoLidas = notificacoes.filter((n) => !n.lida).length
  const correcoesPendentes = notificacoes.filter((n) => n.tipo === "correcao_ponto" && !n.lida).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notificações</h1>
          <p className="text-muted-foreground">Gerencie suas notificações e solicitações pendentes</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{naoLidas} não lidas</Badge>
          {correcoesPendentes > 0 && <Badge variant="destructive">{correcoesPendentes} correções pendentes</Badge>}
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant={filtro === "todas" ? "default" : "outline"} onClick={() => setFiltro("todas")}>
          Todas
        </Button>
        <Button variant={filtro === "nao_lidas" ? "default" : "outline"} onClick={() => setFiltro("nao_lidas")}>
          Não Lidas ({naoLidas})
        </Button>
        <Button
          variant={filtro === "correcao_ponto" ? "default" : "outline"}
          onClick={() => setFiltro("correcao_ponto")}
        >
          Correções de Ponto ({correcoesPendentes})
        </Button>
      </div>

      <div className="space-y-4">
        {notificacoesFiltradas.map((notificacao) => (
          <Card key={notificacao.id} className={`${!notificacao.lida ? "border-l-4 border-l-blue-500" : ""}`}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="mt-1">{getIconeNotificacao(notificacao.tipo)}</div>
                  <div className="space-y-1">
                    <CardTitle className="text-base">{notificacao.titulo}</CardTitle>
                    <CardDescription>{notificacao.descricao}</CardDescription>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{new Date(notificacao.data).toLocaleString("pt-BR")}</span>
                      {notificacao.remetente && (
                        <>
                          <span>•</span>
                          <span>{notificacao.remetente}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getCorPrioridade(notificacao.prioridade) as any}>{notificacao.prioridade}</Badge>
                  {!notificacao.lida && <div className="h-2 w-2 bg-blue-500 rounded-full" />}
                </div>
              </div>
            </CardHeader>

            {notificacao.tipo === "correcao_ponto" && !notificacao.lida && (
              <CardContent className="pt-0">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => aprovarCorrecao(notificacao.id)}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Aprovar
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => rejeitarCorrecao(notificacao.id)}>
                    <X className="h-4 w-4 mr-1" />
                    Rejeitar
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setNotificacaoSelecionada(notificacao)}>
                    <FileText className="h-4 w-4 mr-1" />
                    Ver Detalhes
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}

        {notificacoesFiltradas.length === 0 && (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma notificação encontrada</h3>
              <p className="text-muted-foreground text-center">
                {filtro === "nao_lidas"
                  ? "Você não tem notificações não lidas."
                  : filtro === "correcao_ponto"
                    ? "Não há correções de ponto pendentes."
                    : "Você não tem notificações no momento."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modal de Detalhes da Correção */}
      <Dialog open={!!notificacaoSelecionada} onOpenChange={() => setNotificacaoSelecionada(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Correção de Ponto</DialogTitle>
            <DialogDescription>Analise os detalhes da solicitação de correção</DialogDescription>
          </DialogHeader>

          {notificacaoSelecionada?.detalhes && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Funcionário</label>
                  <p className="text-sm text-muted-foreground">{notificacaoSelecionada.detalhes.funcionario}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Data</label>
                  <p className="text-sm text-muted-foreground">{notificacaoSelecionada.detalhes.data}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Tipo de Correção</label>
                  <p className="text-sm text-muted-foreground">{notificacaoSelecionada.detalhes.tipo}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Badge variant="outline">{notificacaoSelecionada.detalhes.status}</Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Comparação de Horários</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-red-600 mb-2">Horário Original</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Entrada:</span>
                        <span>{notificacaoSelecionada.detalhes.horarioOriginal.entrada}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saída Almoço:</span>
                        <span>{notificacaoSelecionada.detalhes.horarioOriginal.saidaAlmoco}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retorno Almoço:</span>
                        <span>{notificacaoSelecionada.detalhes.horarioOriginal.retornoAlmoco}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saída:</span>
                        <span>{notificacaoSelecionada.detalhes.horarioOriginal.saida}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-green-600 mb-2">Horário Solicitado</h5>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Entrada:</span>
                        <span>{notificacaoSelecionada.detalhes.horarioSolicitado.entrada}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saída Almoço:</span>
                        <span>{notificacaoSelecionada.detalhes.horarioSolicitado.saidaAlmoco}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Retorno Almoço:</span>
                        <span>{notificacaoSelecionada.detalhes.horarioSolicitado.retornoAlmoco}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saída:</span>
                        <span>{notificacaoSelecionada.detalhes.horarioSolicitado.saida}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-2">Justificativa</h4>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                  {notificacaoSelecionada.detalhes.justificativa}
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  onClick={() => {
                    aprovarCorrecao(notificacaoSelecionada.id)
                    setNotificacaoSelecionada(null)
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Aprovar Correção
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    rejeitarCorrecao(notificacaoSelecionada.id)
                    setNotificacaoSelecionada(null)
                  }}
                >
                  <X className="h-4 w-4 mr-2" />
                  Rejeitar Correção
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
