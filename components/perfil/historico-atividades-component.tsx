"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { format, isAfter, isBefore, isEqual, parseISO } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, CalendarIcon, Clock, FileText, MessageSquare, Filter, ChevronLeft, ChevronRight } from "lucide-react"

// Dados simulados para demonstração
const atividades = [
  {
    id: 1,
    tipo: "PONTO",
    subtipo: "ENTRADA",
    descricao: "Registro de entrada",
    data: "2023-11-17T08:00:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 2,
    tipo: "PONTO",
    subtipo: "SAIDA_ALMOCO",
    descricao: "Registro de saída para almoço",
    data: "2023-11-17T12:00:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 3,
    tipo: "PONTO",
    subtipo: "RETORNO_ALMOCO",
    descricao: "Registro de retorno do almoço",
    data: "2023-11-17T13:00:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 4,
    tipo: "PONTO",
    subtipo: "SAIDA",
    descricao: "Registro de saída",
    data: "2023-11-17T17:00:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 5,
    tipo: "SOLICITACAO",
    subtipo: "FOLGA",
    descricao: "Solicitação de folga aprovada",
    data: "2023-11-16T14:30:00",
    detalhes: {
      data_solicitada: "2023-11-24",
      motivo: "Compromisso pessoal",
      aprovado_por: "Daniel Santos",
      data_aprovacao: "2023-11-16T16:45:00",
    },
  },
  {
    id: 6,
    tipo: "DAILY",
    subtipo: "REGISTRO",
    descricao: "Daily registrada",
    data: "2023-11-16T09:15:00",
    detalhes: {
      ontem: "Implementei a nova funcionalidade de relatórios. Corrigi bugs na tela de dashboard.",
      hoje: "Vou iniciar o desenvolvimento da API de integração com o sistema de RH.",
      impedimentos: "Estou aguardando acesso ao ambiente de homologação.",
    },
  },
  {
    id: 7,
    tipo: "PONTO",
    subtipo: "ENTRADA",
    descricao: "Registro de entrada",
    data: "2023-11-16T08:05:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 8,
    tipo: "PONTO",
    subtipo: "SAIDA_ALMOCO",
    descricao: "Registro de saída para almoço",
    data: "2023-11-16T12:00:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 9,
    tipo: "PONTO",
    subtipo: "RETORNO_ALMOCO",
    descricao: "Registro de retorno do almoço",
    data: "2023-11-16T13:00:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 10,
    tipo: "PONTO",
    subtipo: "SAIDA",
    descricao: "Registro de saída",
    data: "2023-11-16T17:00:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 11,
    tipo: "SOLICITACAO",
    subtipo: "HORA_EXTRA",
    descricao: "Solicitação de hora extra aprovada",
    data: "2023-11-15T11:20:00",
    detalhes: {
      data_solicitada: "2023-11-15",
      horas: 2,
      motivo: "Finalização de relatório urgente",
      aprovado_por: "Daniel Santos",
      data_aprovacao: "2023-11-15T14:30:00",
    },
  },
  {
    id: 12,
    tipo: "PONTO",
    subtipo: "HORA_EXTRA",
    descricao: "Registro de hora extra",
    data: "2023-11-15T19:00:00",
    detalhes: {
      local: "Remoto",
      ip: "187.54.123.45",
      dispositivo: "Notebook - Firefox",
      horas: 2,
    },
  },
  {
    id: 13,
    tipo: "DAILY",
    subtipo: "REGISTRO",
    descricao: "Daily registrada",
    data: "2023-11-15T09:10:00",
    detalhes: {
      ontem: "Participei da reunião de requisitos. Iniciei o desenvolvimento da funcionalidade de relatórios.",
      hoje: "Vou continuar a implementação dos relatórios e corrigir bugs pendentes.",
      impedimentos: "",
    },
  },
  {
    id: 14,
    tipo: "SOLICITACAO",
    subtipo: "FERIAS",
    descricao: "Solicitação de férias enviada",
    data: "2023-11-14T16:45:00",
    detalhes: {
      data_inicio: "2023-12-20",
      data_fim: "2024-01-08",
      motivo: "Férias de fim de ano",
      status: "PENDENTE",
    },
  },
  {
    id: 15,
    tipo: "CONFIGURACAO",
    subtipo: "PERFIL",
    descricao: "Atualização de perfil",
    data: "2023-11-14T10:30:00",
    detalhes: {
      campos_alterados: ["telefone", "endereço", "contato_emergencia"],
    },
  },
  {
    id: 16,
    tipo: "PONTO",
    subtipo: "ENTRADA",
    descricao: "Registro de entrada",
    data: "2023-11-14T08:00:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 17,
    tipo: "PONTO",
    subtipo: "SAIDA",
    descricao: "Registro de saída",
    data: "2023-11-14T17:00:00",
    detalhes: {
      local: "Escritório Principal",
      ip: "192.168.1.100",
      dispositivo: "Desktop - Chrome",
    },
  },
  {
    id: 18,
    tipo: "DAILY",
    subtipo: "REGISTRO",
    descricao: "Daily registrada",
    data: "2023-11-14T09:05:00",
    detalhes: {
      ontem: "Corrigi bugs no módulo de cadastro. Realizei code review do PR do João.",
      hoje: "Vou iniciar a refatoração do módulo de autenticação.",
      impedimentos: "Estou com problemas no ambiente de desenvolvimento local.",
    },
  },
  {
    id: 19,
    tipo: "NOTIFICACAO",
    subtipo: "LEITURA",
    descricao: "Notificações marcadas como lidas",
    data: "2023-11-13T14:20:00",
    detalhes: {
      quantidade: 5,
    },
  },
  {
    id: 20,
    tipo: "RELATORIO",
    subtipo: "VISUALIZACAO",
    descricao: "Visualização de relatório",
    data: "2023-11-13T11:45:00",
    detalhes: {
      relatorio: "Horas Trabalhadas - Outubro/2023",
    },
  },
]

export default function HistoricoAtividadesComponent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [tipoFiltro, setTipoFiltro] = useState<string>("TODOS")
  const [dataInicio, setDataInicio] = useState<Date | undefined>(undefined)
  const [dataFim, setDataFim] = useState<Date | undefined>(undefined)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Filtrar atividades
  const filtrarAtividades = () => {
    return atividades.filter((atividade) => {
      // Filtro por termo de busca
      const matchesSearch =
        searchTerm === "" ||
        atividade.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
        atividade.tipo.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro por tipo
      const matchesTipo = tipoFiltro === "TODOS" || atividade.tipo === tipoFiltro

      // Filtro por data
      const atividadeDate = parseISO(atividade.data)
      const matchesDataInicio = !dataInicio || isAfter(atividadeDate, dataInicio) || isEqual(atividadeDate, dataInicio)
      const matchesDataFim = !dataFim || isBefore(atividadeDate, dataFim) || isEqual(atividadeDate, dataFim)

      return matchesSearch && matchesTipo && matchesDataInicio && matchesDataFim
    })
  }

  const atividadesFiltradas = filtrarAtividades()

  // Paginação
  const totalPages = Math.ceil(atividadesFiltradas.length / itemsPerPage)
  const paginatedAtividades = atividadesFiltradas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return format(data, "dd/MM/yyyy HH:mm")
  }

  const renderIconeAtividade = (tipo: string) => {
    switch (tipo) {
      case "PONTO":
        return <Clock className="h-5 w-5 text-blue-500" />
      case "SOLICITACAO":
        return <FileText className="h-5 w-5 text-purple-500" />
      case "DAILY":
        return <MessageSquare className="h-5 w-5 text-green-500" />
      case "CONFIGURACAO":
        return <div className="h-5 w-5 flex items-center justify-center text-orange-500">⚙️</div>
      case "NOTIFICACAO":
        return <div className="h-5 w-5 flex items-center justify-center text-amber-500">🔔</div>
      case "RELATORIO":
        return <div className="h-5 w-5 flex items-center justify-center text-cyan-500">📊</div>
      default:
        return <div className="h-5 w-5 flex items-center justify-center">📝</div>
    }
  }

  const renderBadgeTipo = (tipo: string) => {
    switch (tipo) {
      case "PONTO":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Ponto</Badge>
      case "SOLICITACAO":
        return <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">Solicitação</Badge>
      case "DAILY":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Daily</Badge>
      case "CONFIGURACAO":
        return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">Configuração</Badge>
      case "NOTIFICACAO":
        return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Notificação</Badge>
      case "RELATORIO":
        return <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-100">Relatório</Badge>
      default:
        return <Badge variant="outline">Outro</Badge>
    }
  }

  const renderDetalhesAtividade = (atividade: any) => {
    switch (atividade.tipo) {
      case "PONTO":
        return (
          <div className="text-sm text-muted-foreground mt-2">
            <p>
              <span className="font-medium">Local:</span> {atividade.detalhes.local}
            </p>
            <p>
              <span className="font-medium">Dispositivo:</span> {atividade.detalhes.dispositivo}
            </p>
            {atividade.subtipo === "HORA_EXTRA" && (
              <p>
                <span className="font-medium">Horas extras:</span> {atividade.detalhes.horas}h
              </p>
            )}
          </div>
        )
      case "SOLICITACAO":
        return (
          <div className="text-sm text-muted-foreground mt-2">
            {atividade.subtipo === "FOLGA" && (
              <>
                <p>
                  <span className="font-medium">Data solicitada:</span>{" "}
                  {format(new Date(atividade.detalhes.data_solicitada), "dd/MM/yyyy")}
                </p>
                <p>
                  <span className="font-medium">Motivo:</span> {atividade.detalhes.motivo}
                </p>
                {atividade.detalhes.aprovado_por && (
                  <p>
                    <span className="font-medium">Aprovado por:</span> {atividade.detalhes.aprovado_por}
                  </p>
                )}
              </>
            )}
            {atividade.subtipo === "HORA_EXTRA" && (
              <>
                <p>
                  <span className="font-medium">Data:</span>{" "}
                  {format(new Date(atividade.detalhes.data_solicitada), "dd/MM/yyyy")}
                </p>
                <p>
                  <span className="font-medium">Horas:</span> {atividade.detalhes.horas}h
                </p>
                <p>
                  <span className="font-medium">Motivo:</span> {atividade.detalhes.motivo}
                </p>
              </>
            )}
            {atividade.subtipo === "FERIAS" && (
              <>
                <p>
                  <span className="font-medium">Período:</span>{" "}
                  {format(new Date(atividade.detalhes.data_inicio), "dd/MM/yyyy")} a{" "}
                  {format(new Date(atividade.detalhes.data_fim), "dd/MM/yyyy")}
                </p>
                <p>
                  <span className="font-medium">Status:</span>{" "}
                  <Badge
                    variant="outline"
                    className={
                      atividade.detalhes.status === "APROVADA"
                        ? "bg-green-100 text-green-700"
                        : atividade.detalhes.status === "REJEITADA"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                    }
                  >
                    {atividade.detalhes.status}
                  </Badge>
                </p>
              </>
            )}
          </div>
        )
      case "DAILY":
        return (
          <div className="text-sm text-muted-foreground mt-2">
            <p>
              <span className="font-medium">Ontem:</span> {atividade.detalhes.ontem}
            </p>
            <p>
              <span className="font-medium">Hoje:</span> {atividade.detalhes.hoje}
            </p>
            {atividade.detalhes.impedimentos && (
              <p>
                <span className="font-medium">Impedimentos:</span> {atividade.detalhes.impedimentos}
              </p>
            )}
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Input
                placeholder="Buscar atividades..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            </div>

            <Select value={tipoFiltro} onValueChange={setTipoFiltro}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Tipo de atividade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TODOS">Todos os tipos</SelectItem>
                <SelectItem value="PONTO">Ponto</SelectItem>
                <SelectItem value="SOLICITACAO">Solicitação</SelectItem>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="CONFIGURACAO">Configuração</SelectItem>
                <SelectItem value="NOTIFICACAO">Notificação</SelectItem>
                <SelectItem value="RELATORIO">Relatório</SelectItem>
              </SelectContent>
            </Select>

            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full md:w-[240px] justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataInicio && dataFim
                    ? `${format(dataInicio, "dd/MM/yyyy")} - ${format(dataFim, "dd/MM/yyyy")}`
                    : dataInicio
                      ? `A partir de ${format(dataInicio, "dd/MM/yyyy")}`
                      : dataFim
                        ? `Até ${format(dataFim, "dd/MM/yyyy")}`
                        : "Filtrar por período"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={{
                    from: dataInicio || undefined,
                    to: dataFim || undefined,
                  }}
                  onSelect={(range) => {
                    setDataInicio(range?.from)
                    setDataFim(range?.to)
                  }}
                  locale={ptBR}
                  className="rounded-md border"
                />
                <div className="flex items-center justify-between p-3 border-t">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDataInicio(undefined)
                      setDataFim(undefined)
                    }}
                  >
                    Limpar
                  </Button>
                  <Button size="sm" onClick={() => setIsCalendarOpen(false)}>
                    Aplicar
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="todas" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="todas">Todas as Atividades</TabsTrigger>
          <TabsTrigger value="ponto">Registros de Ponto</TabsTrigger>
          <TabsTrigger value="solicitacoes">Solicitações</TabsTrigger>
        </TabsList>

        <TabsContent value="todas">
          <Card>
            <CardContent className="pt-6">
              {paginatedAtividades.length > 0 ? (
                <div className="space-y-6">
                  {paginatedAtividades.map((atividade) => (
                    <div key={atividade.id} className="flex border-b pb-4 last:border-0 last:pb-0">
                      <div className="mr-4 mt-1">{renderIconeAtividade(atividade.tipo)}</div>
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                          <h3 className="font-medium">{atividade.descricao}</h3>
                          <div className="flex items-center mt-1 sm:mt-0">
                            {renderBadgeTipo(atividade.tipo)}
                            <span className="text-xs text-muted-foreground ml-2">{formatarData(atividade.data)}</span>
                          </div>
                        </div>
                        {renderDetalhesAtividade(atividade)}
                      </div>
                    </div>
                  ))}

                  {/* Paginação */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
                      {Math.min(currentPage * itemsPerPage, atividadesFiltradas.length)} de {atividadesFiltradas.length}{" "}
                      atividades
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Filter className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma atividade encontrada com os filtros selecionados.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchTerm("")
                      setTipoFiltro("TODOS")
                      setDataInicio(undefined)
                      setDataFim(undefined)
                    }}
                  >
                    Limpar Filtros
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ponto">
          <Card>
            <CardContent className="pt-6">
              {paginatedAtividades.filter((atividade) => atividade.tipo === "PONTO").length > 0 ? (
                <div className="space-y-6">
                  {paginatedAtividades
                    .filter((atividade) => atividade.tipo === "PONTO")
                    .map((atividade) => (
                      <div key={atividade.id} className="flex border-b pb-4 last:border-0 last:pb-0">
                        <div className="mr-4 mt-1">{renderIconeAtividade(atividade.tipo)}</div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h3 className="font-medium">{atividade.descricao}</h3>
                            <span className="text-xs text-muted-foreground mt-1 sm:mt-0">
                              {formatarData(atividade.data)}
                            </span>
                          </div>
                          {renderDetalhesAtividade(atividade)}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <Clock className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Nenhum registro de ponto encontrado com os filtros selecionados.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="solicitacoes">
          <Card>
            <CardContent className="pt-6">
              {paginatedAtividades.filter((atividade) => atividade.tipo === "SOLICITACAO").length > 0 ? (
                <div className="space-y-6">
                  {paginatedAtividades
                    .filter((atividade) => atividade.tipo === "SOLICITACAO")
                    .map((atividade) => (
                      <div key={atividade.id} className="flex border-b pb-4 last:border-0 last:pb-0">
                        <div className="mr-4 mt-1">{renderIconeAtividade(atividade.tipo)}</div>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                            <h3 className="font-medium">{atividade.descricao}</h3>
                            <span className="text-xs text-muted-foreground mt-1 sm:mt-0">
                              {formatarData(atividade.data)}
                            </span>
                          </div>
                          {renderDetalhesAtividade(atividade)}
                        </div>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <FileText className="h-10 w-10 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Nenhuma solicitação encontrada com os filtros selecionados.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
