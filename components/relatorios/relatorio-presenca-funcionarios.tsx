"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, AlertCircle, Clock } from "lucide-react"

// Dados simulados para demonstração
const dadosPresenca = {
  total_dias_uteis: 22,
  media_presenca: 92.5,
  funcionarios: [
    {
      id: 1,
      nome: "Ana Silva",
      setor: "TI",
      presencas: 21,
      faltas: 0,
      atrasos: 1,
      taxa_presenca: 95.5,
      status: "OTIMO",
    },
    {
      id: 2,
      nome: "Bruno Costa",
      setor: "TI",
      presencas: 20,
      faltas: 1,
      atrasos: 1,
      taxa_presenca: 90.9,
      status: "BOM",
    },
    {
      id: 3,
      nome: "Carla Oliveira",
      setor: "Marketing",
      presencas: 18,
      faltas: 2,
      atrasos: 2,
      taxa_presenca: 81.8,
      status: "REGULAR",
    },
    {
      id: 4,
      nome: "Daniel Santos",
      setor: "Vendas",
      presencas: 22,
      faltas: 0,
      atrasos: 0,
      taxa_presenca: 100,
      status: "OTIMO",
    },
    {
      id: 5,
      nome: "Eduarda Lima",
      setor: "RH",
      presencas: 20,
      faltas: 1,
      atrasos: 1,
      taxa_presenca: 90.9,
      status: "BOM",
    },
    {
      id: 6,
      nome: "Fernando Gomes",
      setor: "TI",
      presencas: 19,
      faltas: 1,
      atrasos: 2,
      taxa_presenca: 86.4,
      status: "BOM",
    },
    {
      id: 7,
      nome: "Gabriela Martins",
      setor: "Financeiro",
      presencas: 17,
      faltas: 3,
      atrasos: 2,
      taxa_presenca: 77.3,
      status: "ATENCAO",
    },
  ],
}

export default function RelatorioPresencaFuncionarios() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "OTIMO":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Ótimo
          </Badge>
        )
      case "BOM":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700">
            <CheckCircle className="mr-1 h-3 w-3" />
            Bom
          </Badge>
        )
      case "REGULAR":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-700">
            <AlertCircle className="mr-1 h-3 w-3" />
            Regular
          </Badge>
        )
      case "ATENCAO":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-700">
            <XCircle className="mr-1 h-3 w-3" />
            Atenção
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Dias Úteis no Período</CardDescription>
            <CardTitle className="text-2xl">{dadosPresenca.total_dias_uteis}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="mr-1 h-4 w-4" />
              <span>Dias de trabalho</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Taxa Média de Presença</CardDescription>
            <CardTitle className="text-2xl">{dadosPresenca.media_presenca}%</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              <span>Considerando todos os funcionários</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Funcionários com 100% de Presença</CardDescription>
            <CardTitle className="text-2xl">
              {dadosPresenca.funcionarios.filter((f) => f.taxa_presenca === 100).length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              <span>Sem faltas ou atrasos</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Presença por Funcionário</CardTitle>
          <CardDescription>Detalhamento da presença de cada funcionário no período selecionado</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Funcionário</TableHead>
                <TableHead>Setor</TableHead>
                <TableHead>Presenças</TableHead>
                <TableHead>Faltas</TableHead>
                <TableHead>Atrasos</TableHead>
                <TableHead>Taxa de Presença</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dadosPresenca.funcionarios.map((funcionario) => (
                <TableRow key={funcionario.id}>
                  <TableCell className="font-medium">{funcionario.nome}</TableCell>
                  <TableCell>{funcionario.setor}</TableCell>
                  <TableCell>{funcionario.presencas}</TableCell>
                  <TableCell>{funcionario.faltas}</TableCell>
                  <TableCell>{funcionario.atrasos}</TableCell>
                  <TableCell>{funcionario.taxa_presenca}%</TableCell>
                  <TableCell>{getStatusBadge(funcionario.status)}</TableCell>
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
