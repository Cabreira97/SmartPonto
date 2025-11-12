"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Calendar, User, AlertCircle, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Dados simulados para demonstração
const dailies = [
  {
    id: 1,
    usuario_id: 1,
    usuario: "Ana Silva",
    avatar: "AS",
    cargo: "Analista de TI",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Implementei a nova funcionalidade de relatórios. Corrigi bugs na tela de dashboard.",
    hoje: "Vou iniciar o desenvolvimento da API de integração com o sistema de RH.",
    impedimentos: "Estou aguardando acesso ao ambiente de homologação.",
    tem_impedimentos: true,
  },
  {
    id: 2,
    usuario_id: 2,
    usuario: "Bruno Costa",
    avatar: "BC",
    cargo: "Desenvolvedor",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Trabalhei na refatoração do código do módulo de autenticação. Participei da reunião de planejamento.",
    hoje: "Vou continuar a refatoração e iniciar os testes unitários.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 3,
    usuario_id: 3,
    cargo: "Designer",
    usuario: "Carla Oliveira",
    avatar: "CO",
    setor: "Marketing",
    data: "2023-11-17",
    ontem: "Finalizei os mockups da nova interface. Realizei testes de usabilidade com usuários.",
    hoje: "Vou iniciar o design das telas de relatórios e ajustar o feedback dos testes.",
    impedimentos: "Preciso de acesso à biblioteca de ícones premium.",
    tem_impedimentos: true,
  },
  {
    id: 4,
    usuario_id: 1,
    usuario: "Ana Silva",
    avatar: "AS",
    cargo: "Analista de TI",
    setor: "TI",
    data: "2023-11-16",
    ontem: "Participei da reunião de requisitos. Iniciei o desenvolvimento da funcionalidade de relatórios.",
    hoje: "Vou continuar a implementação dos relatórios e corrigir bugs pendentes.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 5,
    usuario_id: 2,
    usuario: "Bruno Costa",
    avatar: "BC",
    cargo: "Desenvolvedor",
    setor: "TI",
    data: "2023-11-16",
    ontem: "Corrigi bugs no módulo de cadastro. Realizei code review do PR do João.",
    hoje: "Vou iniciar a refatoração do módulo de autenticação.",
    impedimentos: "Estou com problemas no ambiente de desenvolvimento local.",
    tem_impedimentos: true,
  },
  {
    id: 6,
    usuario_id: 8,
    usuario: "Henrique Alves",
    avatar: "HA",
    cargo: "Desenvolvedor",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Implementei os testes de integração. Corrigi bugs reportados pelo QA.",
    hoje: "Vou implementar a nova funcionalidade de exportação de dados.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 7,
    usuario_id: 8,
    usuario: "Henrique Alves",
    avatar: "HA",
    cargo: "Desenvolvedor",
    setor: "TI",
    data: "2023-11-16",
    ontem: "Trabalhei na documentação da API. Participei da reunião de arquitetura.",
    hoje: "Vou implementar os testes de integração e corrigir bugs pendentes.",
    impedimentos: "Estou aguardando definição sobre o formato de autenticação da API.",
    tem_impedimentos: true,
  },
  // Novas dailies adicionadas
  {
    id: 8,
    usuario_id: 4,
    usuario: "Daniel Santos",
    avatar: "DS",
    cargo: "Gerente de Vendas",
    setor: "Vendas",
    data: "2023-11-17",
    ontem: "Realizei reunião com a equipe de vendas. Analisei os relatórios de desempenho do mês anterior.",
    hoje: "Vou definir as metas do próximo mês e preparar a apresentação para a diretoria.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 9,
    usuario_id: 5,
    usuario: "Eduarda Lima",
    avatar: "EL",
    cargo: "Gerente de RH",
    setor: "RH",
    data: "2023-11-17",
    ontem: "Conduzi entrevistas para a vaga de analista de RH. Finalizei o relatório de clima organizacional.",
    hoje: "Vou iniciar o processo de avaliação de desempenho trimestral e revisar as políticas de home office.",
    impedimentos: "Aguardando aprovação do orçamento para treinamentos.",
    tem_impedimentos: true,
  },
  {
    id: 10,
    usuario_id: 6,
    usuario: "Fernando Gomes",
    avatar: "FG",
    cargo: "Analista Financeiro",
    setor: "Financeiro",
    data: "2023-11-17",
    ontem: "Preparei o fechamento contábil do mês. Realizei a conciliação bancária.",
    hoje: "Vou iniciar a análise de fluxo de caixa e preparar o relatório para a reunião de diretoria.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 11,
    usuario_id: 7,
    usuario: "Gabriela Martins",
    avatar: "GM",
    cargo: "Gerente Financeiro",
    setor: "Financeiro",
    data: "2023-11-17",
    ontem: "Participei da reunião com investidores. Analisei os indicadores financeiros do trimestre.",
    hoje: "Vou preparar a apresentação dos resultados financeiros e revisar o orçamento anual.",
    impedimentos: "Aguardando retorno do banco sobre a proposta de financiamento.",
    tem_impedimentos: true,
  },
  {
    id: 12,
    usuario_id: 3,
    usuario: "Carla Oliveira",
    avatar: "CO",
    cargo: "Designer",
    setor: "Marketing",
    data: "2023-11-16",
    ontem: "Trabalhei no redesign do site institucional. Criei mockups para a nova campanha.",
    hoje: "Vou finalizar os mockups da nova interface e iniciar os testes de usabilidade.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 13,
    usuario_id: 4,
    usuario: "Daniel Santos",
    avatar: "DS",
    cargo: "Gerente de Vendas",
    setor: "Vendas",
    data: "2023-11-16",
    ontem: "Visitei clientes potenciais. Fechei contrato com dois novos clientes.",
    hoje: "Vou realizar reunião com a equipe de vendas e analisar os relatórios de desempenho.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 14,
    usuario_id: 5,
    usuario: "Eduarda Lima",
    avatar: "EL",
    cargo: "Gerente de RH",
    setor: "RH",
    data: "2023-11-16",
    ontem: "Realizei treinamento de integração para novos funcionários. Atualizei o manual de conduta.",
    hoje: "Vou conduzir entrevistas para a vaga de analista de RH e finalizar o relatório de clima organizacional.",
    impedimentos: "Sistema de gestão de RH está instável.",
    tem_impedimentos: true,
  },
  {
    id: 15,
    usuario_id: 9,
    usuario: "Isabel Ferreira",
    avatar: "IF",
    cargo: "Analista de Marketing",
    setor: "Marketing",
    data: "2023-11-17",
    ontem: "Analisei métricas das campanhas em redes sociais. Preparei relatório de performance.",
    hoje: "Vou iniciar o planejamento da campanha de fim de ano e revisar o conteúdo do blog.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 16,
    usuario_id: 10,
    usuario: "João Mendes",
    avatar: "JM",
    cargo: "Desenvolvedor Sênior",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Implementei a nova arquitetura de microsserviços. Realizei code review dos PRs pendentes.",
    hoje: "Vou finalizar a implementação do sistema de autenticação e iniciar a documentação técnica.",
    impedimentos: "Problemas com o ambiente de CI/CD estão atrasando os deploys.",
    tem_impedimentos: true,
  },
  {
    id: 17,
    usuario_id: 9,
    usuario: "Isabel Ferreira",
    avatar: "IF",
    cargo: "Analista de Marketing",
    setor: "Marketing",
    data: "2023-11-16",
    ontem: "Criei conteúdo para as redes sociais. Participei da reunião de planejamento de marketing.",
    hoje: "Vou analisar métricas das campanhas em redes sociais e preparar relatório de performance.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 18,
    usuario_id: 10,
    usuario: "João Mendes",
    avatar: "JM",
    cargo: "Desenvolvedor Sênior",
    setor: "TI",
    data: "2023-11-16",
    ontem: "Trabalhei na migração do banco de dados. Resolvi problemas de performance no sistema.",
    hoje: "Vou implementar a nova arquitetura de microsserviços e realizar code review dos PRs pendentes.",
    impedimentos: "Aguardando definição da equipe de infraestrutura sobre a configuração dos servidores.",
    tem_impedimentos: true,
  },
  {
    id: 19,
    usuario_id: 11,
    usuario: "Karina Souza",
    avatar: "KS",
    cargo: "Analista de Qualidade",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Realizei testes de integração no módulo financeiro. Documentei bugs encontrados.",
    hoje: "Vou iniciar os testes de regressão e preparar o relatório de qualidade para a release.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 20,
    usuario_id: 12,
    usuario: "Leonardo Costa",
    avatar: "LC",
    cargo: "Analista de Suporte",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Resolvi 15 tickets de suporte. Atualizei a base de conhecimento com novas soluções.",
    hoje: "Vou realizar treinamento para novos usuários e continuar o atendimento aos tickets prioritários.",
    impedimentos: "Sistema de tickets está lento, afetando o tempo de resposta.",
    tem_impedimentos: true,
  },
  // Novas dailies adicionadas
  {
    id: 21,
    usuario_id: 13,
    usuario: "Mariana Rocha",
    avatar: "MR",
    cargo: "Product Owner",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Refinei o backlog do produto. Realizei reuniões com stakeholders para priorização de features.",
    hoje: "Vou preparar a sprint planning e documentar as histórias de usuário para o próximo sprint.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 22,
    usuario_id: 14,
    usuario: "Nathalia Vieira",
    avatar: "NV",
    cargo: "Scrum Master",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Facilitei a daily meeting e a retrospectiva do sprint. Removi impedimentos da equipe.",
    hoje: "Vou preparar os relatórios de velocidade do time e facilitar a planning do próximo sprint.",
    impedimentos: "Aguardando feedback do cliente sobre as prioridades do produto.",
    tem_impedimentos: true,
  },
  {
    id: 23,
    usuario_id: 15,
    usuario: "Otávio Mendes",
    avatar: "OM",
    cargo: "Arquiteto de Software",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Desenhei a arquitetura do novo módulo. Realizei revisão técnica das soluções propostas.",
    hoje: "Vou documentar os padrões de design e realizar mentoria técnica com os desenvolvedores.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 24,
    usuario_id: 16,
    usuario: "Paula Ribeiro",
    avatar: "PR",
    cargo: "Analista de Dados",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Criei dashboards para análise de performance. Implementei novos modelos de previsão.",
    hoje: "Vou otimizar as consultas ao data warehouse e preparar a apresentação dos insights para o time de produto.",
    impedimentos: "Problemas de performance no cluster de processamento de dados.",
    tem_impedimentos: true,
  },
  {
    id: 25,
    usuario_id: 17,
    usuario: "Quintino Alves",
    avatar: "QA",
    cargo: "DevOps Engineer",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Implementei melhorias no pipeline de CI/CD. Resolvi problemas de infraestrutura.",
    hoje: "Vou configurar o monitoramento dos novos serviços e otimizar o processo de deploy.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 26,
    usuario_id: 13,
    usuario: "Mariana Rocha",
    avatar: "MR",
    cargo: "Product Owner",
    setor: "TI",
    data: "2023-11-16",
    ontem: "Participei de workshops com usuários. Atualizei a roadmap do produto.",
    hoje: "Vou refinar o backlog do produto e realizar reuniões com stakeholders para priorização de features.",
    impedimentos: "Aguardando definição do orçamento para novas features.",
    tem_impedimentos: true,
  },
  {
    id: 27,
    usuario_id: 14,
    usuario: "Nathalia Vieira",
    avatar: "NV",
    cargo: "Scrum Master",
    setor: "TI",
    data: "2023-11-16",
    ontem: "Organizei o quadro Kanban. Atualizei métricas do sprint.",
    hoje: "Vou facilitar a daily meeting e a retrospectiva do sprint. Remover impedimentos da equipe.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 28,
    usuario_id: 18,
    usuario: "Rafael Moreira",
    avatar: "RM",
    cargo: "UX Designer",
    setor: "Marketing",
    data: "2023-11-17",
    ontem: "Realizei pesquisas com usuários. Criei protótipos de alta fidelidade para o novo fluxo de checkout.",
    hoje: "Vou analisar os resultados dos testes de usabilidade e iterar nos designs com base no feedback.",
    impedimentos: "",
    tem_impedimentos: false,
  },
  {
    id: 29,
    usuario_id: 19,
    usuario: "Sabrina Costa",
    avatar: "SC",
    cargo: "Analista de Negócios",
    setor: "Comercial",
    data: "2023-11-17",
    ontem: "Analisei o mercado concorrente. Preparei relatório de oportunidades de negócio.",
    hoje: "Vou apresentar a análise SWOT para a diretoria e definir estratégias de expansão.",
    impedimentos: "Aguardando dados de mercado de uma consultoria externa.",
    tem_impedimentos: true,
  },
  {
    id: 30,
    usuario_id: 20,
    usuario: "Thiago Oliveira",
    avatar: "TO",
    cargo: "Especialista em Segurança",
    setor: "TI",
    data: "2023-11-17",
    ontem: "Realizei testes de penetração no sistema. Implementei melhorias na autenticação.",
    hoje: "Vou documentar as vulnerabilidades encontradas e priorizar as correções com o time de desenvolvimento.",
    impedimentos: "",
    tem_impedimentos: false,
  },
]

// Função para agrupar dailies por data
const agruparPorData = (dailies: any[]) => {
  const grupos: Record<string, any[]> = {}

  dailies.forEach((daily) => {
    if (!grupos[daily.data]) {
      grupos[daily.data] = []
    }
    grupos[daily.data].push(daily)
  })

  // Ordenar as datas em ordem decrescente (mais recente primeiro)
  return Object.keys(grupos)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map((data) => ({
      data,
      dailies: grupos[data],
    }))
}

// Função para agrupar dailies por usuário
const agruparPorUsuario = (dailies: any[]) => {
  const grupos: Record<number, any[]> = {}

  dailies.forEach((daily) => {
    if (!grupos[daily.usuario_id]) {
      grupos[daily.usuario_id] = []
    }
    grupos[daily.usuario_id].push(daily)
  })

  return Object.keys(grupos).map((usuarioId) => {
    const dailiesUsuario = grupos[Number(usuarioId)]
    return {
      usuario_id: Number(usuarioId),
      usuario: dailiesUsuario[0].usuario,
      avatar: dailiesUsuario[0].avatar,
      cargo: dailiesUsuario[0].cargo,
      setor: dailiesUsuario[0].setor,
      dailies: dailiesUsuario.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()),
    }
  })
}

export default function DailiesVisualizacao() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroSetor, setFiltroSetor] = useState("")
  const [filtroPeriodo, setFiltroPeriodo] = useState("hoje")
  const [visualizacao, setVisualizacao] = useState<"data" | "usuario">("data")

  // Filtrar dailies com base nos critérios
  const filtrarDailies = () => {
    // Filtrar por período
    let datasFiltradas = [...dailies]
    const hoje = new Date().toISOString().split("T")[0]

    if (filtroPeriodo === "hoje") {
      datasFiltradas = datasFiltradas.filter((daily) => daily.data === hoje)
    } else if (filtroPeriodo === "semana") {
      const umaSemanaAtras = new Date()
      umaSemanaAtras.setDate(umaSemanaAtras.getDate() - 7)
      datasFiltradas = datasFiltradas.filter((daily) => new Date(daily.data) >= umaSemanaAtras)
    } else if (filtroPeriodo === "mes") {
      const umMesAtras = new Date()
      umMesAtras.setMonth(umMesAtras.getMonth() - 1)
      datasFiltradas = datasFiltradas.filter((daily) => new Date(daily.data) >= umMesAtras)
    }

    // Filtrar por termo de busca e setor
    return datasFiltradas.filter((daily) => {
      const matchesSearch =
        searchTerm === "" ||
        daily.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        daily.setor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        daily.ontem.toLowerCase().includes(searchTerm.toLowerCase()) ||
        daily.hoje.toLowerCase().includes(searchTerm.toLowerCase()) ||
        daily.impedimentos.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSetor = filtroSetor === "" || daily.setor === filtroSetor

      return matchesSearch && matchesSetor
    })
  }

  const dailiesFiltradas = filtrarDailies()
  const dailiesAgrupadas =
    visualizacao === "data" ? agruparPorData(dailiesFiltradas) : agruparPorUsuario(dailiesFiltradas)

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Buscar dailies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
        </div>

        <Select value={filtroSetor} onValueChange={setFiltroSetor}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todos os setores" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os setores</SelectItem>
            <SelectItem value="TI">TI</SelectItem>
            <SelectItem value="RH">RH</SelectItem>
            <SelectItem value="Vendas">Vendas</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Financeiro">Financeiro</SelectItem>
            <SelectItem value="Comercial">Comercial</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filtroPeriodo} onValueChange={setFiltroPeriodo}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Período" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hoje">Hoje</SelectItem>
            <SelectItem value="semana">Última semana</SelectItem>
            <SelectItem value="mes">Último mês</SelectItem>
            <SelectItem value="todos">Todos os períodos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs
        value={visualizacao}
        onValueChange={(value: "data" | "usuario") => setVisualizacao(value)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data">Agrupar por Data</TabsTrigger>
          <TabsTrigger value="usuario">Agrupar por Usuário</TabsTrigger>
        </TabsList>

        <TabsContent value="data">
          {dailiesAgrupadas.length > 0 ? (
            <div className="space-y-6">
              {(dailiesAgrupadas as { data: string; dailies: any[] }[]).map((grupo) => (
                <Card key={grupo.data}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                      {formatarData(grupo.data)}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="w-full">
                      {grupo.dailies.map((daily) => (
                        <AccordionItem key={daily.id} value={daily.id.toString()}>
                          <AccordionTrigger>
                            <div className="flex items-center">
                              <Avatar className="h-8 w-8 mr-2">
                                <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={daily.usuario} />
                                <AvatarFallback>{daily.avatar}</AvatarFallback>
                              </Avatar>
                              <div className="ml-2 flex flex-col items-start">
                                <span className="font-medium">{daily.usuario}</span>
                                <span className="text-xs text-muted-foreground">{daily.cargo}</span>
                              </div>
                              {daily.tem_impedimentos && (
                                <Badge variant="outline" className="ml-2 bg-red-100 text-red-700">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Impedimento
                                </Badge>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 p-2">
                              <div className="space-y-2">
                                <h4 className="font-medium">O que foi feito ontem:</h4>
                                <p className="text-sm">{daily.ontem}</p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium">O que vai ser feito hoje:</h4>
                                <p className="text-sm">{daily.hoje}</p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium">Impedimentos:</h4>
                                {daily.impedimentos ? (
                                  <p className="text-sm">{daily.impedimentos}</p>
                                ) : (
                                  <p className="text-sm text-green-600 flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Sem impedimentos
                                  </p>
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <Calendar className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma daily encontrada para o período selecionado.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="usuario">
          {dailiesAgrupadas.length > 0 ? (
            <div className="space-y-6">
              {(
                dailiesAgrupadas as { usuario: string; avatar: string; cargo: string; setor: string; dailies: any[] }[]
              ).map((grupo) => (
                <Card key={grupo.usuario_id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={grupo.usuario} />
                        <AvatarFallback>{grupo.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        {grupo.usuario}
                        <div className="text-sm font-normal text-muted-foreground">
                          {grupo.cargo} - {grupo.setor}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="multiple" className="w-full">
                      {grupo.dailies.map((daily) => (
                        <AccordionItem key={daily.id} value={daily.id.toString()}>
                          <AccordionTrigger>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>{formatarData(daily.data)}</span>
                              {daily.tem_impedimentos && (
                                <Badge variant="outline" className="ml-2 bg-red-100 text-red-700">
                                  <AlertCircle className="h-3 w-3 mr-1" />
                                  Impedimento
                                </Badge>
                              )}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-4 p-2">
                              <div className="space-y-2">
                                <h4 className="font-medium">O que foi feito ontem:</h4>
                                <p className="text-sm">{daily.ontem}</p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium">O que vai ser feito hoje:</h4>
                                <p className="text-sm">{daily.hoje}</p>
                              </div>
                              <div className="space-y-2">
                                <h4 className="font-medium">Impedimentos:</h4>
                                {daily.impedimentos ? (
                                  <p className="text-sm">{daily.impedimentos}</p>
                                ) : (
                                  <p className="text-sm text-green-600 flex items-center">
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Sem impedimentos
                                  </p>
                                )}
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <User className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhuma daily encontrada para o período selecionado.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
