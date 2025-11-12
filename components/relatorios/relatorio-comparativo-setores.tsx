"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Building, TrendingUp, TrendingDown, Users, Clock } from "lucide-react"

// Dados simulados para demonstração
const dadosComparativoSetores = [
  {
    id: 1,
    nome: "Tecnologia da Informação",
    total_horas: 3200,
    media_por_funcionario: 160,
    total_funcionarios: 20,
    meta_horas: 3000,
    variacao: 6.7,
    eficiencia: 92,
  },
  {
    id: 2,
    nome: "Recursos Humanos",
    total_horas: 1280,
    media_por_funcionario: 160,
    total_funcionarios: 8,
    meta_horas: 1280,
    variacao: 0,
    eficiencia: 88,
  },
  {
    id: 3,
    nome: "Financeiro",
    total_horas: 1600,
    media_por_funcionario: 160,
    total_funcionarios: 10,
    meta_horas: 1700,
    variacao: -5.9,
    eficiencia: 85,
  },
  {
    id: 4,
    nome: "Marketing",
    total_horas: 1850,
    media_por_funcionario: 154,
    total_funcionarios: 12,
    meta_horas: 1920,
    variacao: -3.6,
    eficiencia: 90,
  },
  {
    id: 5,
    nome: "Vendas",
    total_horas: 3400,
    media_por_funcionario: 170,
    total_funcionarios: 20,
    meta_horas: 3200,
    variacao: 6.3,
    eficiencia: 95,
  },
]

// Ordenar setores por total de horas (decrescente)
const setoresOrdenadosPorHoras = [...dadosComparativoSetores].sort((a, b) => b.total_horas - a.total_horas)

// Encontrar o setor que mais trabalhou e o que menos trabalhou
const setorMaisTrabalhado = setoresOrdenadosPorHoras[0]
const setorMenosTrabalhado = setoresOrdenadosPorHoras[setoresOrdenadosPorHoras.length - 1]

export default function RelatorioComparativoSetores() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Setor com Mais Horas</CardDescription>
            <CardTitle className="text-xl">{setorMaisTrabalhado.nome}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Clock className="mr-1 h-4 w-4 text-green-500" />
                <span className="font-medium">{setorMaisTrabalhado.total_horas}h</span>
              </div>
              <Badge variant="outline" className="bg-green-100 text-green-700">
                <TrendingUp className="mr-1 h-3 w-3" />
                {setorMaisTrabalhado.variacao > 0 ? "+" : ""}
                {setorMaisTrabalhado.variacao}%
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Setor com Menos Horas</CardDescription>
            <CardTitle className="text-xl">{setorMenosTrabalhado.nome}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Clock className="mr-1 h-4 w-4 text-red-500" />
                <span className="font-medium">{setorMenosTrabalhado.total_horas}h</span>
              </div>
              <Badge
                variant="outline"
                className={
                  setorMenosTrabalhado.variacao >= 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                }
              >
                {setorMenosTrabalhado.variacao >= 0 ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {setorMenosTrabalhado.variacao > 0 ? "+" : ""}
                {setorMenosTrabalhado.variacao}%
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparativo entre Setores</CardTitle>
          <CardDescription>Análise comparativa das horas trabalhadas por setor no período selecionado</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {setoresOrdenadosPorHoras.map((setor) => (
              <div key={setor.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Building className="mr-2 h-4 w-4 text-gray-500" />
                    <span className="font-medium">{setor.nome}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-gray-500" />
                      <span className="text-sm">{setor.total_funcionarios}</span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        setor.variacao > 0
                          ? "bg-green-100 text-green-700"
                          : setor.variacao < 0
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    >
                      {setor.variacao > 0 ? "+" : ""}
                      {setor.variacao}%
                    </Badge>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span>Total: {setor.total_horas}h</span>
                  <span>Meta: {setor.meta_horas}h</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Progresso em relação à meta</span>
                    <span>{Math.round((setor.total_horas / setor.meta_horas) * 100)}%</span>
                  </div>
                  <Progress value={(setor.total_horas / setor.meta_horas) * 100} className="h-2" />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Índice de eficiência</span>
                    <span>{setor.eficiencia}%</span>
                  </div>
                  <Progress
                    value={setor.eficiencia}
                    className="h-2"
                    indicatorClassName={
                      setor.eficiencia >= 90 ? "bg-green-500" : setor.eficiencia >= 80 ? "bg-yellow-500" : "bg-red-500"
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <div className="text-sm text-muted-foreground">Dados referentes ao período de 01/11/2023 a 30/11/2023</div>
      </div>
    </div>
  )
}
