"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
  Clock,
  Calendar,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  Edit3,
  Shield,
  Info,
} from "lucide-react"
import { SolicitarCorrecaoModal } from "./solicitar-correcao-modal"

// Dados simulados de registros de ponto com correções
const registrosPonto = [
  // Semana atual (20-26 Out 2025)
  {
    data: "2025-10-23",
    registros: [
      { tipo: "ENTRADA", horario: "08:00", localizacao: "Escritório Principal" },
      { tipo: "SAIDA_ALMOCO", horario: "12:00", localizacao: "Escritório Principal" },
      { tipo: "RETORNO_ALMOCO", horario: "13:00", localizacao: "Escritório Principal" },
      { tipo: "SAIDA", horario: "17:00", localizacao: "Escritório Principal" },
    ],
    horasTrabalhadas: "8h00",
    status: "COMPLETO",
    observacoes: "",
    correcoes: [],
  },
  {
    data: "2025-10-22",
    registros: [
      { tipo: "ENTRADA", horario: "08:15", localizacao: "Escritório Principal", corrigido: true },
      { tipo: "SAIDA_ALMOCO", horario: "12:00", localizacao: "Escritório Principal" },
      { tipo: "RETORNO_ALMOCO", horario: "13:00", localizacao: "Escritório Principal" },
      { tipo: "SAIDA", horario: "17:00", localizacao: "Escritório Principal" },
    ],
    horasTrabalhadas: "7h45",
    status: "COMPLETO",
    observacoes: "",
    correcoes: [
      {
        id: 1,
        tipo: "CORRECAO_HORARIO",
        horarioOriginal: "08:30",
        horarioCorrigido: "08:15",
        justificativa: "Trânsito intenso devido a acidente na via principal",
        solicitadoPor: "João Silva",
        aprovadoPor: "Mariana Costa",
        dataAprovacao: "2025-10-22T09:30:00",
        status: "APROVADO",
      },
    ],
  },
  {
    data: "2025-10-21",
    registros: [
      { tipo: "ENTRADA", horario: "08:00", localizacao: "Escritório Principal" },
      { tipo: "SAIDA_ALMOCO", horario: "12:00", localizacao: "Escritório Principal" },
      { tipo: "RETORNO_ALMOCO", horario: "13:00", localizacao: "Escritório Principal" },
      { tipo: "SAIDA", horario: "19:00", localizacao: "Escritório Principal" },
    ],
    horasTrabalhadas: "10h00",
    status: "HORA_EXTRA",
    observacoes: "2h de hora extra aprovada",
    correcoes: [],
  },
  {
    data: "2025-10-20",
    registros: [
      { tipo: "ENTRADA", horario: "08:00", localizacao: "Escritório Principal", corrigido: true },
      { tipo: "SAIDA_ALMOCO", horario: "12:00", localizacao: "Escritório Principal" },
      { tipo: "RETORNO_ALMOCO", horario: "13:00", localizacao: "Escritório Principal" },
      { tipo: "SAIDA", horario: "17:00", localizacao: "Escritório Principal", corrigido: true },
    ],
    horasTrabalhadas: "8h00",
    status: "COMPLETO",
    observacoes: "",
    correcoes: [
      {
        id: 2,
        tipo: "ADICIONAR_REGISTRO",
        justificativa: "Esqueci de registrar o ponto de entrada e saída",
        solicitadoPor: "João Silva",
        aprovadoPor: "Carlos Mendes",
        dataAprovacao: "2025-10-20T18:15:00",
        status: "APROVADO",
        registrosAdicionados: [
          { tipo: "ENTRADA", horario: "08:00" },
          { tipo: "SAIDA", horario: "17:00" },
        ],
      },
    ],
  },
  {
    data: "2025-10-17",
    registros: [
      { tipo: "ENTRADA", horario: "08:15", localizacao: "Home Office" },
      { tipo: "SAIDA_ALMOCO", horario: "12:00", localizacao: "Home Office" },
      { tipo: "RETORNO_ALMOCO", horario: "13:00", localizacao: "Home Office" },
      { tipo: "SAIDA", horario: "16:45", localizacao: "Home Office" },
    ],
    horasTrabalhadas: "7h30",
    status: "INCOMPLETO",
    observacoes: "Saída antecipada autorizada",
    correcoes: [],
  },

  // Semana anterior (13-17 Out 2025)
  {
    data: "2025-10-16",
    registros: [
      { tipo: "ENTRADA", horario: "08:00", localizacao: "Escritório Principal" },
      { tipo: "SAIDA_ALMOCO", horario: "12:00", localizacao: "Escritório Principal" },
      { tipo: "RETORNO_ALMOCO", horario: "13:00", localizacao: "Escritório Principal" },
      { tipo: "SAIDA", horario: "17:00", localizacao: "Escritório Principal" },
    ],
    horasTrabalhadas: "8h00",
    status: "COMPLETO",
    observacoes: "",
    correcoes: [],
  },
  {
    data: "2025-10-15",
    registros: [],
    horasTrabalhadas: "0h00",
    status: "FALTA_JUSTIFICADA",
    observacoes: "",
    correcoes: [
      {
        id: 3,
        tipo: "JUSTIFICAR_FALTA",
        justificativa: "Consulta médica de emergência - atestado médico anexado",
        solicitadoPor: "João Silva",
        aprovadoPor: "Ana Silva",
        dataAprovacao: "2025-10-15T14:20:00",
        status: "APROVADO",
        documentos: ["atestado_medico_15-10-2025.pdf"],
      },
    ],
  },
];


export default function HistoricoPontoComponent() {
  const [semanaAtual, setSemanaAtual] = useState(new Date())

  // Calcular início e fim da semana
  const inicioSemana = startOfWeek(semanaAtual, { weekStartsOn: 1 }) // Segunda-feira
  const fimSemana = endOfWeek(semanaAtual, { weekStartsOn: 1 }) // Domingo
  const diasSemana = eachDayOfInterval({ start: inicioSemana, end: fimSemana })

  // Navegar entre semanas
  const semanaAnterior = () => {
    setSemanaAtual(subWeeks(semanaAtual, 1))
  }

  const proximaSemana = () => {
    setSemanaAtual(addWeeks(semanaAtual, 1))
  }

  const voltarSemanaAtual = () => {
    setSemanaAtual(new Date())
  }

  // Obter registros para um dia específico
  const obterRegistrosDia = (data: Date) => {
    const dataString = format(data, "yyyy-MM-dd")
    return registrosPonto.find((registro) => registro.data === dataString)
  }

  // Renderizar badge de status
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETO":
        return (
          <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completo
          </Badge>
        )
      case "INCOMPLETO":
        return (
          <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
            <AlertTriangle className="w-3 h-3 mr-1" />
            Incompleto
          </Badge>
        )
      case "HORA_EXTRA":
        return (
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            <Clock className="w-3 h-3 mr-1" />
            Hora Extra
          </Badge>
        )
      case "FERIADO":
        return (
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            <Calendar className="w-3 h-3 mr-1" />
            Feriado
          </Badge>
        )
      case "FALTA_JUSTIFICADA":
        return (
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
            <Shield className="w-3 h-3 mr-1" />
            Falta Justificada
          </Badge>
        )
      case "FALTA":
        return (
          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
            <XCircle className="w-3 h-3 mr-1" />
            Falta
          </Badge>
        )
      default:
        return <Badge variant="outline">Sem registro</Badge>
    }
  }

  // Renderizar tipo de registro
  const renderTipoRegistro = (tipo: string, corrigido?: boolean) => {
    const nomeRegistro = (() => {
      switch (tipo) {
        case "ENTRADA":
          return "Entrada"
        case "SAIDA_ALMOCO":
          return "Saída Almoço"
        case "RETORNO_ALMOCO":
          return "Retorno Almoço"
        case "SAIDA":
          return "Saída"
        default:
          return tipo
      }
    })()

    return (
      <div className="flex items-center gap-2">
        <span
          className={`font-medium ${tipo === "ENTRADA"
            ? "text-green-600"
            : tipo === "SAIDA_ALMOCO"
              ? "text-orange-600"
              : tipo === "RETORNO_ALMOCO"
                ? "text-blue-600"
                : "text-red-600"
            }`}
        >
          {nomeRegistro}
        </span>
        {corrigido && (
          <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
            <Edit3 className="w-3 h-3 mr-1" />
            Corrigido
          </Badge>
        )}
      </div>
    )
  }

  // Calcular resumo da semana
  const calcularResumoSemana = () => {
    let totalHoras = 0
    let diasTrabalhados = 0
    let diasCompletos = 0
    let horasExtras = 0

    diasSemana.forEach((dia) => {
      const registro = obterRegistrosDia(dia)
      if (
        registro &&
        registro.status !== "FERIADO" &&
        registro.status !== "FALTA" &&
        registro.status !== "FALTA_JUSTIFICADA"
      ) {
        diasTrabalhados++
        if (registro.status === "COMPLETO") {
          diasCompletos++
        }

        // Converter horas trabalhadas para número
        const horas = Number.parseFloat(registro.horasTrabalhadas.replace("h", "").replace(":", "."))
        totalHoras += horas

        if (horas > 8) {
          horasExtras += horas - 8
        }
      }
    })

    return {
      totalHoras: totalHoras.toFixed(1),
      diasTrabalhados,
      diasCompletos,
      horasExtras: horasExtras.toFixed(1),
    }
  }

  const resumoSemana = calcularResumoSemana()

  return (
    <div className="space-y-6">
      {/* Header com navegação */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Semana de {format(inicioSemana, "dd/MM", { locale: ptBR })} a{" "}
                {format(fimSemana, "dd/MM/yyyy", { locale: ptBR })}
              </CardTitle>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={semanaAnterior}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={voltarSemanaAtual}>
                Semana Atual
              </Button>
              <Button variant="outline" size="sm" onClick={proximaSemana}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Resumo da semana */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Horas</p>
                <p className="text-2xl font-bold">{resumoSemana.totalHoras}h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dias Trabalhados</p>
                <p className="text-2xl font-bold">{resumoSemana.diasTrabalhados}</p>
              </div>
              <Calendar className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Dias Completos</p>
                <p className="text-2xl font-bold">{resumoSemana.diasCompletos}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Horas Extras</p>
                <p className="text-2xl font-bold">{resumoSemana.horasExtras}h</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Registros por dia */}
      <div className="grid grid-cols-1 gap-4">
        {diasSemana.map((dia) => {
          const registro = obterRegistrosDia(dia)
          const nomeDia = format(dia, "EEEE", { locale: ptBR })
          const dataDia = format(dia, "dd/MM/yyyy", { locale: ptBR })
          const temCorrecoes = registro?.correcoes && registro.correcoes.length > 0

          return (
            <Card key={dia.toISOString()}>
              <CardHeader className="pb-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold capitalize">
                      {nomeDia} - {dataDia}
                    </h3>
                    {temCorrecoes && (
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <Shield className="h-4 w-4 text-orange-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Shield className="h-5 w-5 text-orange-500" />
                              Correções Aplicadas - {dataDia}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            {registro?.correcoes?.map((correcao, index) => (
                              <div key={index} className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <Badge variant="outline" className="bg-green-50 text-green-700">
                                    {correcao.status}
                                  </Badge>
                                  <span className="text-sm text-muted-foreground">
                                    {format(new Date(correcao.dataAprovacao), "dd/MM/yyyy HH:mm")}
                                  </span>
                                </div>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <strong>Tipo:</strong>{" "}
                                    {correcao.tipo === "CORRECAO_HORARIO"
                                      ? "Correção de Horário"
                                      : correcao.tipo === "ADICIONAR_REGISTRO"
                                        ? "Adicionar Registro"
                                        : "Justificar Falta"}
                                  </p>
                                  <p>
                                    <strong>Justificativa:</strong> {correcao.justificativa}
                                  </p>
                                  <p>
                                    <strong>Solicitado por:</strong> {correcao.solicitadoPor}
                                  </p>
                                  <p>
                                    <strong>Aprovado por:</strong> {correcao.aprovadoPor}
                                  </p>

                                  {correcao.horarioOriginal && (
                                    <div className="flex gap-4">
                                      <p>
                                        <strong>Horário Original:</strong> {correcao.horarioOriginal}
                                      </p>
                                      <p>
                                        <strong>Horário Corrigido:</strong> {correcao.horarioCorrigido}
                                      </p>
                                    </div>
                                  )}

                                  {correcao.registrosAdicionados && (
                                    <div>
                                      <p>
                                        <strong>Registros Adicionados:</strong>
                                      </p>
                                      <ul className="list-disc list-inside ml-4">
                                        {correcao?.registrosAdicionados.map((reg, i) => (
                                          <li key={i}>
                                            {reg.tipo}: {reg.horario}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {registro && renderStatusBadge(registro.status)}
                    {registro && <Badge variant="outline">{registro.horasTrabalhadas}</Badge>}
                    <SolicitarCorrecaoModal registroOriginal={registro} />
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                {registro ? (
                  <div className="space-y-4">
                    {registro.registros.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {registro.registros.map((reg, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              {renderTipoRegistro(reg.tipo, reg.corrigido)}
                              <p className="text-xs text-muted-foreground mt-1">{reg.localizacao}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-mono font-semibold">{reg.horario}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        {registro.status === "FERIADO"
                          ? "Feriado Nacional"
                          : registro.status === "FALTA_JUSTIFICADA"
                            ? "Falta Justificada"
                            : "Nenhum registro encontrado"}
                      </div>
                    )}

                    {registro.observacoes && (
                      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="text-sm text-blue-700">
                          <strong>Observação:</strong> {registro.observacoes}
                        </p>
                      </div>
                    )}

                    {temCorrecoes && (
                      <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-orange-700">
                          <Info className="h-4 w-4" />
                          <span>Este registro possui correções aplicadas. Clique no ícone </span>
                          <Shield className="h-4 w-4" />
                          <span> para ver detalhes.</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <XCircle className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                    <p>Nenhum registro de ponto encontrado</p>
                    <div className="mt-4">
                      <SolicitarCorrecaoModal />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
