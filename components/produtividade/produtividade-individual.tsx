"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, Calendar, TrendingUp, TrendingDown, CheckCircle, AlertTriangle, Target } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Dados simulados para demonstração
const dadosProdutividade = {
  usuario: {
    nome: "Ana Silva",
    cargo: "Analista de TI",
    setor: "TI",
  },
  metricas: {
    pontualidade: 95,
    presenca: 98,
    horas_trabalhadas: 168,
    horas_previstas: 176,
    dailies_preenchidas: 20,
    dailies_total: 22,
    tarefas_concluidas: 37,
    tarefas_atribuidas: 42,
  },
  historico_horas: [
    { semana: "Semana 1", horas: 40, meta: 40 },
    { semana: "Semana 2", horas: 42, meta: 40 },
    { semana: "Semana 3", horas: 38, meta: 40 },
    { semana: "Semana 4", horas: 41, meta: 40 },
    { semana: "Semana 5", horas: 39, meta: 40 },
    { semana: "Semana 6", horas: 40, meta: 40 },
    { semana: "Semana 7", horas: 36, meta: 40 },
    { semana: "Semana 8", horas: 40, meta: 40 },
  ],
  historico_pontualidade: [
    { mes: "Jan", pontualidade: 92 },
    { mes: "Fev", pontualidade: 94 },
    { mes: "Mar", pontualidade: 90 },
    { mes: "Abr", pontualidade: 95 },
    { mes: "Mai", pontualidade: 97 },
    { mes: "Jun", pontualidade: 96 },
    { mes: "Jul", pontualidade: 98 },
    { mes: "Ago", pontualidade: 95 },
  ],
  historico_tarefas: [
    { semana: "Semana 1", concluidas: 8, atribuidas: 10 },
    { semana: "Semana 2", concluidas: 12, atribuidas: 12 },
    { semana: "Semana 3", concluidas: 7, atribuidas: 9 },
    { semana: "Semana 4", concluidas: 10, atribuidas: 11 },
  ],
  metas: [
    { nome: "Pontualidade", atual: 95, meta: 90, status: "ACIMA" },
    { nome: "Horas Trabalhadas", atual: 168, meta: 176, status: "ABAIXO" },
    { nome: "Conclusão de Tarefas", atual: 88, meta: 85, status: "ACIMA" },
    { nome: "Participação em Dailies", atual: 91, meta: 95, status: "ABAIXO" },
  ],
}

export default function ProdutividadeIndividual() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mes")

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecione o período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="semana">Última semana</SelectItem>
            <SelectItem value="mes">Último mês</SelectItem>
            <SelectItem value="trimestre">Último trimestre</SelectItem>
            <SelectItem value="ano">Último ano</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pontualidade</CardDescription>
            <CardTitle className="text-2xl">{dadosProdutividade.metricas.pontualidade}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
              <span className="text-green-500">+2%</span>
              <span className="ml-1">em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Horas Trabalhadas</CardDescription>
            <CardTitle className="text-2xl">{dadosProdutividade.metricas.horas_trabalhadas}h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>
                de {dadosProdutividade.metricas.horas_previstas}h previstas (
                {Math.round(
                  (dadosProdutividade.metricas.horas_trabalhadas / dadosProdutividade.metricas.horas_previstas) * 100,
                )}
                %)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Dailies Preenchidas</CardDescription>
            <CardTitle className="text-2xl">
              {dadosProdutividade.metricas.dailies_preenchidas}/{dadosProdutividade.metricas.dailies_total}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-1 h-4 w-4" />
              <span>
                {Math.round(
                  (dadosProdutividade.metricas.dailies_preenchidas / dadosProdutividade.metricas.dailies_total) * 100,
                )}
                % de participação
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Tarefas Concluídas</CardDescription>
            <CardTitle className="text-2xl">
              {dadosProdutividade.metricas.tarefas_concluidas}/{dadosProdutividade.metricas.tarefas_atribuidas}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              <span>
                {Math.round(
                  (dadosProdutividade.metricas.tarefas_concluidas / dadosProdutividade.metricas.tarefas_atribuidas) *
                    100,
                )}
                % de conclusão
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="graficos" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="graficos">Gráficos</TabsTrigger>
          <TabsTrigger value="metas">Metas</TabsTrigger>
          <TabsTrigger value="recomendacoes">Recomendações</TabsTrigger>
        </TabsList>

        <TabsContent value="graficos">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Horas Trabalhadas por Semana</CardTitle>
                <CardDescription>Comparativo entre horas trabalhadas e meta semanal</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosProdutividade.historico_horas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semana" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="horas" fill="#8884d8" name="Horas Trabalhadas" />
                    <Bar dataKey="meta" fill="#82ca9d" name="Meta" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pontualidade Mensal</CardTitle>
                <CardDescription>Evolução da pontualidade ao longo dos meses</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dadosProdutividade.historico_pontualidade}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis domain={[80, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="pontualidade" stroke="#8884d8" name="Pontualidade (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Conclusão de Tarefas</CardTitle>
                <CardDescription>Tarefas concluídas vs. atribuídas por semana</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosProdutividade.historico_tarefas}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semana" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="concluidas" fill="#8884d8" name="Tarefas Concluídas" />
                    <Bar dataKey="atribuidas" fill="#82ca9d" name="Tarefas Atribuídas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="metas">
          <Card>
            <CardHeader>
              <CardTitle>Metas e Objetivos</CardTitle>
              <CardDescription>Acompanhamento das metas estabelecidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {dadosProdutividade.metas.map((meta, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Target className="h-5 w-5 mr-2 text-muted-foreground" />
                        <span className="font-medium">{meta.nome}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          meta.status === "ACIMA"
                            ? "bg-green-100 text-green-700"
                            : meta.status === "ABAIXO"
                              ? "bg-amber-100 text-amber-700"
                              : "bg-blue-100 text-blue-700"
                        }
                      >
                        {meta.status === "ACIMA" ? (
                          <TrendingUp className="h-3 w-3 mr-1" />
                        ) : meta.status === "ABAIXO" ? (
                          <TrendingDown className="h-3 w-3 mr-1" />
                        ) : (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {meta.status === "ACIMA"
                          ? "Acima da meta"
                          : meta.status === "ABAIXO"
                            ? "Abaixo da meta"
                            : "Meta atingida"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span>Atual: {meta.atual}%</span>
                      <span>Meta: {meta.meta}%</span>
                    </div>

                    <Progress
                      value={(meta.atual / meta.meta) * 100}
                      className="h-2"
                      indicatorClassName={
                        meta.status === "ACIMA"
                          ? "bg-green-500"
                          : meta.status === "ABAIXO"
                            ? "bg-amber-500"
                            : "bg-blue-500"
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recomendacoes">
          <Card>
            <CardHeader>
              <CardTitle>Recomendações e Insights</CardTitle>
              <CardDescription>Sugestões baseadas no seu desempenho atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h3 className="font-medium flex items-center text-green-700">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Pontos Fortes
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <span>
                        <strong>Pontualidade excepcional:</strong> Você mantém uma pontualidade acima da média da
                        equipe, com 95% de registros pontuais.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                      <span>
                        <strong>Conclusão de tarefas:</strong> Sua taxa de conclusão de tarefas está acima da meta
                        estabelecida, demonstrando comprometimento com os prazos.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <h3 className="font-medium flex items-center text-amber-700">
                    <AlertTriangle className="h-5 w-5 mr-2" />
                    Oportunidades de Melhoria
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
                      <span>
                        <strong>Participação em dailies:</strong> Sua participação nas dailies está ligeiramente abaixo
                        da meta. Tente priorizar este momento de comunicação com a equipe.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 text-amber-500" />
                      <span>
                        <strong>Horas trabalhadas:</strong> Você está com um déficit de 8 horas em relação ao previsto
                        para o mês. Considere ajustar seu banco de horas nas próximas semanas.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h3 className="font-medium flex items-center text-blue-700">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    Sugestões para Desenvolvimento
                  </h3>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                      <span>
                        <strong>Planejamento de banco de horas:</strong> Utilize o módulo de banco de horas para
                        planejar compensações e evitar déficits no final do mês.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <TrendingUp className="h-4 w-4 mr-2 mt-0.5 text-blue-500" />
                      <span>
                        <strong>Configuração de lembretes:</strong> Configure lembretes para as dailies para garantir
                        sua participação consistente.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
