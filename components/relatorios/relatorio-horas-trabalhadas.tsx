"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Clock, TrendingUp, TrendingDown, User } from "lucide-react"

// Dados simulados para demonstração
const dadosHorasTrabalhadas = {
  total_horas: 1840,
  media_diaria: 7.8,
  media_semanal: 39,
  total_funcionarios: 65,
  variacao_mes_anterior: 3.5,
  funcionarios: [
    { id: 1, nome: "Ana Silva", setor: "TI", horas: 168, meta: 160, variacao: 5 },
    { id: 2, nome: "Bruno Costa", setor: "TI", horas: 172, meta: 160, variacao: 7.5 },
    { id: 3, nome: "Carla Oliveira", setor: "Marketing", horas: 155, meta: 160, variacao: -3.1 },
    { id: 4, nome: "Daniel Santos", setor: "Vendas", horas: 180, meta: 160, variacao: 12.5 },
    { id: 5, nome: "Eduarda Lima", setor: "RH", horas: 162, meta: 160, variacao: 1.25 },
    { id: 6, nome: "Fernando Gomes", setor: "TI", horas: 158, meta: 160, variacao: -1.25 },
    { id: 7, nome: "Gabriela Martins", setor: "Financeiro", horas: 165, meta: 160, variacao: 3.1 },
    { id: 8, nome: "Henrique Alves", setor: "TI", horas: 170, meta: 160, variacao: 6.25 },
  ],
}

export default function RelatorioHorasTrabalhadas() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Horas</CardDescription>
            <CardTitle className="text-2xl">{dadosHorasTrabalhadas.total_horas}h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              {dadosHorasTrabalhadas.variacao_mes_anterior > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">+{dadosHorasTrabalhadas.variacao_mes_anterior}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">{dadosHorasTrabalhadas.variacao_mes_anterior}%</span>
                </>
              )}
              <span className="ml-1">em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Média Diária</CardDescription>
            <CardTitle className="text-2xl">{dadosHorasTrabalhadas.media_diaria}h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Por funcionário</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Média Semanal</CardDescription>
            <CardTitle className="text-2xl">{dadosHorasTrabalhadas.media_semanal}h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Por funcionário</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Funcionários</CardDescription>
            <CardTitle className="text-2xl">{dadosHorasTrabalhadas.total_funcionarios}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <User className="mr-1 h-4 w-4" />
              <span>Ativos no período</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Horas Trabalhadas por Funcionário</CardTitle>
          <CardDescription>
            Detalhamento das horas trabalhadas por cada funcionário no período selecionado
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Horas Trabalhadas</TableHead>
                <TableHead>Meta</TableHead>
                <TableHead>Variação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosHorasTrabalhadas.funcionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell className="font-medium">{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.setor}</TableCell>
                  <TableCell>{funcionario.horas}h</TableCell>
                  <TableCell>{funcionario.meta}h</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        funcionario.variacao > 0
                          ? "bg-green-100 text-green-700"
                          : funcionario.variacao < 0
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    >
                      {funcionario.variacao > 0 ? "+" : ""}
                      {funcionario.variacao}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <div className="text-sm text-muted-foreground">Dados referentes ao período de 01/11/2023 a 30/11/2023</div>
      </div>
    </div>
  )
}
