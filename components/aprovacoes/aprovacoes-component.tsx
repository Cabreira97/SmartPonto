"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Check, X, Clock, Calendar, Shield, Briefcase, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface Solicitacao {
  id: string
  tipo: "correcao_ponto" | "folga" | "ferias" | "horas_extras" | "compensacao"
  funcionario: string
  data_solicitacao: string
  status: "PENDENTE" | "APROVADO" | "REJEITADO"
  prioridade: "alta" | "media" | "baixa"
  detalhes: any
}

const solicitacoesMock: Solicitacao[] = [
  {
    id: "1",
    tipo: "correcao_ponto",
    funcionario: "João Silva",
    data_solicitacao: "2024-12-15T14:30:00",
    status: "PENDENTE",
    prioridade: "alta",
    detalhes: {
      data: "15/12/2024",
      horarioOriginal: { entrada: "08:00", saida: "17:00" },
      horarioSolicitado: { entrada: "08:15", saida: "17:15" },
      justificativa: "Atraso devido ao trânsito intenso",
    },
  },
  {
    id: "2",
    tipo: "folga",
    funcionario: "Maria Santos",
    data_solicitacao: "2024-12-14T09:15:00",
    status: "PENDENTE",
    prioridade: "media",
    detalhes: {
      data_inicio: "20/12/2024",
      data_fim: "20/12/2024",
      motivo: "Assuntos pessoais",
      tipo: "FOLGA",
    },
  },
  {
    id: "3",
    tipo: "ferias",
    funcionario: "Pedro Costa",
    data_solicitacao: "2024-12-13T16:45:00",
    status: "PENDENTE",
    prioridade: "media",
    detalhes: {
      data_inicio: "02/01/2025",
      data_fim: "16/01/2025",
      dias: 15,
      saldo_disponivel: 30,
    },
  },
  {
    id: "4",
    tipo: "horas_extras",
    funcionario: "Ana Oliveira",
    data_solicitacao: "2024-12-12T18:00:00",
    status: "PENDENTE",
    prioridade: "alta",
    detalhes: {
      data: "12/12/2024",
      horas: 3,
      motivo: "Finalização de projeto urgente",
    },
  },
  {
    id: "5",
    tipo: "compensacao",
    funcionario: "Carlos Mendes",
    data_solicitacao: "2024-12-11T10:30:00",
    status: "PENDENTE",
    prioridade: "baixa",
    detalhes: {
      data: "18/12/2024",
      horas: 4,
      tipo: "MEIO_PERIODO",
      saldo_disponivel: 12.5,
    },
  },
]

export default function AprovacoesComponent() {
  const [solicitacoes, setSolicitacoes] = useState<Solicitacao[]>(solicitacoesMock)
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState<Solicitacao | null>(null)
  const [comentario, setComentario] = useState("")
  const [filtro, setFiltro] = useState<"todas" | "pendentes" | "aprovadas" | "rejeitadas">("pendentes")
  const { toast } = useToast()

  const getIconeTipo = (tipo: string) => {
    switch (tipo) {
      case "correcao_ponto":
        return <Shield className="h-4 w-4" />
      case "folga":
      case "ferias":
        return <Calendar className="h-4 w-4" />
      case "horas_extras":
      case "compensacao":
        return <Clock className="h-4 w-4" />
      default:
        return <Briefcase className="h-4 w-4" />
    }
  }

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      correcao_ponto: "Correção de Ponto",
      folga: "Folga",
      ferias: "Férias",
      horas_extras: "Horas Extras",
      compensacao: "Compensação",
    }
    return labels[tipo] || tipo
  }

  const aprovarSolicitacao = (id: string) => {
    setSolicitacoes((prev) => prev.map((sol) => (sol.id === id ? { ...sol, status: "APROVADO" as const } : sol)))
    toast({
      title: "Solicitação Aprovada",
      description: "A solicitação foi aprovada com sucesso.",
    })
    setSolicitacaoSelecionada(null)
    setComentario("")
  }

  const rejeitarSolicitacao = (id: string) => {
    setSolicitacoes((prev) => prev.map((sol) => (sol.id === id ? { ...sol, status: "REJEITADO" as const } : sol)))
    toast({
      title: "Solicitação Rejeitada",
      description: "A solicitação foi rejeitada.",
      variant: "destructive",
    })
    setSolicitacaoSelecionada(null)
    setComentario("")
  }

  const solicitacoesFiltradas = solicitacoes.filter((sol) => {
    if (filtro === "pendentes") return sol.status === "PENDENTE"
    if (filtro === "aprovadas") return sol.status === "APROVADO"
    if (filtro === "rejeitadas") return sol.status === "REJEITADO"
    return true
  })

  const pendentes = solicitacoes.filter((s) => s.status === "PENDENTE").length
  const aprovadas = solicitacoes.filter((s) => s.status === "APROVADO").length
  const rejeitadas = solicitacoes.filter((s) => s.status === "REJEITADO").length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Aprovações</h1>
          <p className="text-muted-foreground">Gerencie e aprove solicitações de funcionários</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary">{pendentes} pendentes</Badge>
          {pendentes > 5 && <Badge variant="destructive">Atenção necessária</Badge>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{solicitacoes.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{pendentes}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Aprovadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{aprovadas}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Rejeitadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{rejeitadas}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={filtro} onValueChange={(value: any) => setFiltro(value)} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="todas">Todas</TabsTrigger>
          <TabsTrigger value="pendentes">Pendentes ({pendentes})</TabsTrigger>
          <TabsTrigger value="aprovadas">Aprovadas</TabsTrigger>
          <TabsTrigger value="rejeitadas">Rejeitadas</TabsTrigger>
        </TabsList>

        <TabsContent value={filtro} className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Solicitações</CardTitle>
              <CardDescription>Lista de todas as solicitações para análise</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Data Solicitação</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {solicitacoesFiltradas.map((solicitacao) => (
                    <TableRow key={solicitacao.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getIconeTipo(solicitacao.tipo)}
                          <span>{getTipoLabel(solicitacao.tipo)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{solicitacao.funcionario}</TableCell>
                      <TableCell>{new Date(solicitacao.data_solicitacao).toLocaleString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            solicitacao.prioridade === "alta"
                              ? "destructive"
                              : solicitacao.prioridade === "media"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {solicitacao.prioridade}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            solicitacao.status === "APROVADO"
                              ? "default"
                              : solicitacao.status === "REJEITADO"
                                ? "destructive"
                                : "outline"
                          }
                          className={
                            solicitacao.status === "APROVADO"
                              ? "bg-green-100 text-green-700"
                              : solicitacao.status === "PENDENTE"
                                ? "bg-yellow-100 text-yellow-700"
                                : ""
                          }
                        >
                          {solicitacao.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" onClick={() => setSolicitacaoSelecionada(solicitacao)}>
                            Ver Detalhes
                          </Button>
                          {solicitacao.status === "PENDENTE" && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => aprovarSolicitacao(solicitacao.id)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => rejeitarSolicitacao(solicitacao.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {solicitacoesFiltradas.length === 0 && (
                <div className="flex flex-col items-center justify-center py-12">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Nenhuma solicitação encontrada</h3>
                  <p className="text-muted-foreground text-center">
                    Não há solicitações {filtro !== "todas" ? filtro : ""} no momento.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Detalhes */}
      <Dialog open={!!solicitacaoSelecionada} onOpenChange={() => setSolicitacaoSelecionada(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Detalhes da Solicitação</DialogTitle>
            <DialogDescription>Analise os detalhes antes de aprovar ou rejeitar</DialogDescription>
          </DialogHeader>

          {solicitacaoSelecionada && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tipo</label>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    {getIconeTipo(solicitacaoSelecionada.tipo)}
                    {getTipoLabel(solicitacaoSelecionada.tipo)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Funcionário</label>
                  <p className="text-sm text-muted-foreground">{solicitacaoSelecionada.funcionario}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Data da Solicitação</label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(solicitacaoSelecionada.data_solicitacao).toLocaleString("pt-BR")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Prioridade</label>
                  <Badge
                    variant={
                      solicitacaoSelecionada.prioridade === "alta"
                        ? "destructive"
                        : solicitacaoSelecionada.prioridade === "media"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {solicitacaoSelecionada.prioridade}
                  </Badge>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="font-medium mb-3">Informações Específicas</h4>
                <div className="space-y-2 text-sm bg-muted p-4 rounded-md">
                  {solicitacaoSelecionada.tipo === "correcao_ponto" && (
                    <>
                      <div>
                        <strong>Data:</strong> {solicitacaoSelecionada.detalhes.data}
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-2">
                        <div>
                          <strong className="text-red-600">Original:</strong>
                          <div>Entrada: {solicitacaoSelecionada.detalhes.horarioOriginal.entrada}</div>
                          <div>Saída: {solicitacaoSelecionada.detalhes.horarioOriginal.saida}</div>
                        </div>
                        <div>
                          <strong className="text-green-600">Solicitado:</strong>
                          <div>Entrada: {solicitacaoSelecionada.detalhes.horarioSolicitado.entrada}</div>
                          <div>Saída: {solicitacaoSelecionada.detalhes.horarioSolicitado.saida}</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <strong>Justificativa:</strong> {solicitacaoSelecionada.detalhes.justificativa}
                      </div>
                    </>
                  )}

                  {(solicitacaoSelecionada.tipo === "folga" || solicitacaoSelecionada.tipo === "ferias") && (
                    <>
                      <div>
                        <strong>Período:</strong> {solicitacaoSelecionada.detalhes.data_inicio} até{" "}
                        {solicitacaoSelecionada.detalhes.data_fim}
                      </div>
                      {solicitacaoSelecionada.detalhes.dias && (
                        <div>
                          <strong>Dias:</strong> {solicitacaoSelecionada.detalhes.dias}
                        </div>
                      )}
                      {solicitacaoSelecionada.detalhes.motivo && (
                        <div>
                          <strong>Motivo:</strong> {solicitacaoSelecionada.detalhes.motivo}
                        </div>
                      )}
                      {solicitacaoSelecionada.detalhes.saldo_disponivel && (
                        <div>
                          <strong>Saldo Disponível:</strong> {solicitacaoSelecionada.detalhes.saldo_disponivel} dias
                        </div>
                      )}
                    </>
                  )}

                  {(solicitacaoSelecionada.tipo === "horas_extras" ||
                    solicitacaoSelecionada.tipo === "compensacao") && (
                    <>
                      <div>
                        <strong>Data:</strong> {solicitacaoSelecionada.detalhes.data}
                      </div>
                      <div>
                        <strong>Horas:</strong> {solicitacaoSelecionada.detalhes.horas}h
                      </div>
                      {solicitacaoSelecionada.detalhes.motivo && (
                        <div>
                          <strong>Motivo:</strong> {solicitacaoSelecionada.detalhes.motivo}
                        </div>
                      )}
                      {solicitacaoSelecionada.detalhes.saldo_disponivel && (
                        <div>
                          <strong>Saldo Disponível:</strong> {solicitacaoSelecionada.detalhes.saldo_disponivel}h
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>

              {solicitacaoSelecionada.status === "PENDENTE" && (
                <>
                  <Separator />
                  <div className="space-y-2">
                    <Label htmlFor="comentario">Comentário (opcional)</Label>
                    <Textarea
                      id="comentario"
                      placeholder="Adicione um comentário sobre sua decisão..."
                      value={comentario}
                      onChange={(e) => setComentario(e.target.value)}
                      rows={3}
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {solicitacaoSelecionada?.status === "PENDENTE" && (
            <DialogFooter>
              <Button
                onClick={() => aprovarSolicitacao(solicitacaoSelecionada.id)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                Aprovar
              </Button>
              <Button variant="destructive" onClick={() => rejeitarSolicitacao(solicitacaoSelecionada.id)}>
                <X className="h-4 w-4 mr-2" />
                Rejeitar
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
