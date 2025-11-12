"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, Users, Building, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Dados simulados para demonstração
const setores = [
  { id: 1, nome: "Tecnologia da Informação" },
  { id: 2, nome: "Recursos Humanos" },
  { id: 3, nome: "Financeiro" },
  { id: 4, nome: "Marketing" },
  { id: 5, nome: "Vendas" },
]

const salariosPorSetor = [
  {
    setor_id: 1,
    nome_setor: "Tecnologia da Informação",
    total_funcionarios: 15,
    salario_total: 112500,
    salario_medio: 7500,
    maior_salario: 12000,
    menor_salario: 4500,
    horas_extras: 8500,
    total_a_pagar: 121000,
  },
  {
    setor_id: 2,
    nome_setor: "Recursos Humanos",
    total_funcionarios: 8,
    salario_total: 48000,
    salario_medio: 6000,
    maior_salario: 9000,
    menor_salario: 3800,
    horas_extras: 2200,
    total_a_pagar: 50200,
  },
  {
    setor_id: 3,
    nome_setor: "Financeiro",
    total_funcionarios: 10,
    salario_total: 75000,
    salario_medio: 7500,
    maior_salario: 15000,
    menor_salario: 4200,
    horas_extras: 3800,
    total_a_pagar: 78800,
  },
  {
    setor_id: 4,
    nome_setor: "Marketing",
    total_funcionarios: 12,
    salario_total: 72000,
    salario_medio: 6000,
    maior_salario: 9500,
    menor_salario: 3500,
    horas_extras: 4200,
    total_a_pagar: 76200,
  },
  {
    setor_id: 5,
    nome_setor: "Vendas",
    total_funcionarios: 20,
    salario_total: 110000,
    salario_medio: 5500,
    maior_salario: 12000,
    menor_salario: 3000,
    horas_extras: 15000,
    total_a_pagar: 125000,
  },
]

const funcionariosSalarios = [
  {
    id: 1,
    nome: "Ana Silva",
    setor_id: 1,
    cargo: "Gerente de TI",
    salario_base: 12000,
    horas_extras: 1500,
    total: 13500,
  },
  {
    id: 2,
    nome: "Bruno Costa",
    setor_id: 1,
    cargo: "Desenvolvedor Sênior",
    salario_base: 9000,
    horas_extras: 800,
    total: 9800,
  },
  {
    id: 3,
    nome: "Carla Oliveira",
    setor_id: 4,
    cargo: "Gerente de Marketing",
    salario_base: 9500,
    horas_extras: 600,
    total: 10100,
  },
  {
    id: 4,
    nome: "Daniel Santos",
    setor_id: 5,
    cargo: "Gerente de Vendas",
    salario_base: 12000,
    horas_extras: 2000,
    total: 14000,
  },
  {
    id: 5,
    nome: "Eduarda Lima",
    setor_id: 2,
    cargo: "Gerente de RH",
    salario_base: 9000,
    horas_extras: 400,
    total: 9400,
  },
  {
    id: 6,
    nome: "Fernando Gomes",
    setor_id: 3,
    cargo: "Analista Financeiro",
    salario_base: 7000,
    horas_extras: 300,
    total: 7300,
  },
  {
    id: 7,
    nome: "Gabriela Martins",
    setor_id: 3,
    cargo: "Gerente Financeiro",
    salario_base: 15000,
    horas_extras: 1200,
    total: 16200,
  },
  {
    id: 8,
    nome: "Henrique Alves",
    setor_id: 1,
    cargo: "Desenvolvedor Pleno",
    salario_base: 7500,
    horas_extras: 900,
    total: 8400,
  },
]

export default function RelatorioSalarios() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("atual")
  const [setorSelecionado, setSetorSelecionado] = useState("todos")
  const [visualizacao, setVisualizacao] = useState("resumo")

  // Calcular totais
  const calcularTotais = () => {
    let dadosFiltrados = [...salariosPorSetor]

    if (setorSelecionado !== "todos") {
      dadosFiltrados = dadosFiltrados.filter((s) => s.setor_id.toString() === setorSelecionado)
    }

    return {
      total_funcionarios: dadosFiltrados.reduce((acc, curr) => acc + curr.total_funcionarios, 0),
      salario_total: dadosFiltrados.reduce((acc, curr) => acc + curr.salario_total, 0),
      horas_extras: dadosFiltrados.reduce((acc, curr) => acc + curr.horas_extras, 0),
      total_a_pagar: dadosFiltrados.reduce((acc, curr) => acc + curr.total_a_pagar, 0),
    }
  }

  const totais = calcularTotais()

  // Filtrar funcionários por setor
  const filtrarFuncionarios = () => {
    if (setorSelecionado === "todos") {
      return funcionariosSalarios
    }
    return funcionariosSalarios.filter((f) => f.setor_id.toString() === setorSelecionado)
  }

  const funcionariosFiltrados = filtrarFuncionarios()

  // Formatar valor monetário
  const formatarMoeda = (valor: number) => {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold">Relatório de Salários</h2>
          <p className="text-muted-foreground">Análise detalhada de salários, horas extras e custos por setor.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select value={periodoSelecionado} onValueChange={setPeriodoSelecionado}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="atual">Mês Atual</SelectItem>
              <SelectItem value="anterior">Mês Anterior</SelectItem>
              <SelectItem value="trimestre">Último Trimestre</SelectItem>
              <SelectItem value="semestre">Último Semestre</SelectItem>
              <SelectItem value="anual">Anual</SelectItem>
            </SelectContent>
          </Select>

          <Select value={setorSelecionado} onValueChange={setSetorSelecionado}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos os Setores</SelectItem>
              {setores.map((setor) => (
                <SelectItem key={setor.id} value={setor.id.toString()}>
                  {setor.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Cards de resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Funcionários</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold">{totais.total_funcionarios}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Salários Base</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-500 mr-2" />
              <div className="text-2xl font-bold">{formatarMoeda(totais.salario_total)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Horas Extras</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-amber-500 mr-2" />
              <div className="text-2xl font-bold">{formatarMoeda(totais.horas_extras)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total a Pagar</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-purple-500 mr-2" />
              <div className="text-2xl font-bold">{formatarMoeda(totais.total_a_pagar)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={visualizacao} onValueChange={setVisualizacao} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="resumo">Resumo por Setor</TabsTrigger>
          <TabsTrigger value="detalhado">Detalhado por Funcionário</TabsTrigger>
        </TabsList>

        <TabsContent value="resumo" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Setor</TableHead>
                    <TableHead>Funcionários</TableHead>
                    <TableHead>Salário Total</TableHead>
                    <TableHead>Salário Médio</TableHead>
                    <TableHead>Horas Extras</TableHead>
                    <TableHead>Total a Pagar</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {salariosPorSetor
                    .filter((s) => setorSelecionado === "todos" || s.setor_id.toString() === setorSelecionado)
                    .map((setor) => (
                      <TableRow key={setor.setor_id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                            {setor.nome_setor}
                          </div>
                        </TableCell>
                        <TableCell>{setor.total_funcionarios}</TableCell>
                        <TableCell>{formatarMoeda(setor.salario_total)}</TableCell>
                        <TableCell>{formatarMoeda(setor.salario_medio)}</TableCell>
                        <TableCell>{formatarMoeda(setor.horas_extras)}</TableCell>
                        <TableCell className="font-medium">{formatarMoeda(setor.total_a_pagar)}</TableCell>
                      </TableRow>
                    ))}
                  {setorSelecionado === "todos" && (
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-bold">Total Geral</TableCell>
                      <TableCell className="font-bold">{totais.total_funcionarios}</TableCell>
                      <TableCell className="font-bold">{formatarMoeda(totais.salario_total)}</TableCell>
                      <TableCell className="font-bold">
                        {formatarMoeda(totais.salario_total / totais.total_funcionarios)}
                      </TableCell>
                      <TableCell className="font-bold">{formatarMoeda(totais.horas_extras)}</TableCell>
                      <TableCell className="font-bold">{formatarMoeda(totais.total_a_pagar)}</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Gráfico de distribuição */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Distribuição de Custos por Setor</CardTitle>
              <CardDescription>Proporção do total a pagar por setor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salariosPorSetor.map((setor) => {
                  const percentual = (setor.total_a_pagar / totais.total_a_pagar) * 100
                  return (
                    <div key={setor.setor_id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{setor.nome_setor}</span>
                        <span className="font-medium">{percentual.toFixed(1)}%</span>
                      </div>
                      <Progress value={percentual} className="h-2" />
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detalhado" className="mt-6">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Salário Base</TableHead>
                    <TableHead>Horas Extras</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {funcionariosFiltrados.map((funcionario) => (
                    <TableRow key={funcionario.id}>
                      <TableCell className="font-medium">{funcionario.nome}</TableCell>
                      <TableCell>{funcionario.cargo}</TableCell>
                      <TableCell>{setores.find((s) => s.id === funcionario.setor_id)?.nome}</TableCell>
                      <TableCell>{formatarMoeda(funcionario.salario_base)}</TableCell>
                      <TableCell>{formatarMoeda(funcionario.horas_extras)}</TableCell>
                      <TableCell className="font-medium">{formatarMoeda(funcionario.total)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
