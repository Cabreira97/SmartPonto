"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DollarSign, Clock, TrendingUp, TrendingDown } from "lucide-react"

// Dados simulados para demonstração
const dadosHorasExtras = {
  total_horas_extras: 215,
  custo_total: 12850,
  media_por_funcionario: 3.3,
  variacao_mes_anterior: -8.5,
  funcionarios: [
    {
      id: 1,
      nome: "Ana Silva",
      setor: "TI",
      horas_extras: 4,
      custo: 240,
      justificativa: "Implantação de sistema",
    },
    {
      id: 2,
      nome: "Bruno Costa",
      setor: "TI",
      horas_extras: 12,
      custo: 720,
      justificativa: "Implantação de sistema",
    },
    {
      id: 4,
      nome: "Daniel Santos",
      setor: "Vendas",
      horas_extras: 20,
      custo: 1200,
      justificativa: "Fechamento de vendas fim de mês",
    },
    {
      id: 8,
      nome: "Henrique Alves",
      setor: "TI",
      horas_extras: 10,
      custo: 600,
      justificativa: "Manutenção de servidores",
    },
    {
      id: 10,
      nome: "João Pereira",
      setor: "Vendas",
      horas_extras: 15,
      custo: 900,
      justificativa: "Fechamento de vendas fim de mês",
    },
    {
      id: 12,
      nome: "Luiza Mendes",
      setor: "Financeiro",
      horas_extras: 8,
      custo: 480,
      justificativa: "Fechamento contábil",
    },
  ],
  setores: [
    { nome: "TI", total: 68, custo: 4080, variacao: 5.2 },
    { nome: "Vendas", total: 85, custo: 5100, variacao: -12.5 },
    { nome: "Financeiro", total: 42, custo: 2520, variacao: -15.0 },
    { nome: "Marketing", total: 12, custo: 720, variacao: 20.0 },
    { nome: "RH", total: 8, custo: 480, variacao: -20.0 },
  ],
}

export default function RelatorioHorasExtras() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total de Horas Extras</CardDescription>
            <CardTitle className="text-2xl">{dadosHorasExtras.total_horas_extras}h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              {dadosHorasExtras.variacao_mes_anterior > 0 ? (
                <>
                  <TrendingUp className="mr-1 h-4 w-4 text-red-500" />
                  <span className="text-red-500">+{dadosHorasExtras.variacao_mes_anterior}%</span>
                </>
              ) : (
                <>
                  <TrendingDown className="mr-1 h-4 w-4 text-green-500" />
                  <span className="text-green-500">{dadosHorasExtras.variacao_mes_anterior}%</span>
                </>
              )}
              <span className="ml-1">em relação ao mês anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Custo Total</CardDescription>
            <CardTitle className="text-2xl">R$ {dadosHorasExtras.custo_total.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="mr-1 h-4 w-4" />
              <span>Valor pago em horas extras</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Média por Funcionário</CardDescription>
            <CardTitle className="text-2xl">{dadosHorasExtras.media_por_funcionario}h</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Considerando funcionários ativos</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Funcionários com Horas Extras</CardDescription>
            <CardTitle className="text-2xl">{dadosHorasExtras.funcionarios.length}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>No período selecionado</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Horas Extras por Setor</CardTitle>
          <CardDescription>Detalhamento das horas extras realizadas por cada setor no período</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Setor</TableHead>
                <TableHead>Total de Horas</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead>Variação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosHorasExtras.setores.map((setor, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{setor.nome}</TableCell>
                  <TableCell>{setor.total}h</TableCell>
                  <TableCell>R$ {setor.custo.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        setor.variacao > 0
                          ? "bg-red-100 text-red-700"
                          : setor.variacao < 0
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                      }
                    >
                      {setor.variacao > 0 ? (
                        <TrendingUp className="mr-1 h-3 w-3" />
                      ) : (
                        <TrendingDown className="mr-1 h-3 w-3" />
                      )}
                      {setor.variacao > 0 ? "+" : ""}
                      {setor.variacao}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Detalhamento por Funcionário</CardTitle>
          <CardDescription>Funcionários que realizaram horas extras no período selecionado</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Horas Extras</TableHead>
                <TableHead>Custo</TableHead>
                <TableHead>Justificativa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosHorasExtras.funcionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell className="font-medium">{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.setor}</TableCell>
                  <TableCell>{funcionario.horas_extras}h</TableCell>
                  <TableCell>R$ {funcionario.custo.toLocaleString()}</TableCell>
                  <TableCell>{funcionario.justificativa}</TableCell>
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
