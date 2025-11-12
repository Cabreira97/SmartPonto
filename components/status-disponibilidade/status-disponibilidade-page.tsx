"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, User, AlertCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Dados simulados para demonstração
const funcionariosAusentes = [
  {
    id: 1,
    nome: "Ana Silva",
    avatar: "AS",
    cargo: "Analista de TI",
    setor: "TI",
    tipo: "FERIAS",
    data_inicio: "2023-12-20",
    data_fim: "2024-01-18",
    mensagem: "Estarei de férias e sem acesso ao e-mail. Para assuntos urgentes, contate o Bruno.",
    contato_emergencia: "Bruno Costa (bruno.costa@empresa.com)",
  },
  {
    id: 3,
    nome: "Carla Oliveira",
    avatar: "CO",
    cargo: "Designer",
    setor: "Marketing",
    tipo: "LICENCA",
    data_inicio: "2023-11-25",
    data_fim: "2023-11-30",
    mensagem: "Em licença para curso de especialização. Verificarei e-mails apenas no final do dia.",
    contato_emergencia: "Daniel Santos (daniel.santos@empresa.com)",
  },
  {
    id: 5,
    nome: "Eduarda Lima",
    avatar: "EL",
    cargo: "Analista de RH",
    setor: "RH",
    tipo: "FOLGA",
    data_inicio: "2023-11-17",
    data_fim: "2023-11-17",
    mensagem: "Folga compensatória. Retorno amanhã normalmente.",
    contato_emergencia: "Gabriela Martins (gabriela.martins@empresa.com)",
  },
  {
    id: 8,
    nome: "Henrique Alves",
    avatar: "HA",
    cargo: "Desenvolvedor",
    setor: "TI",
    tipo: "FERIAS",
    data_inicio: "2023-12-05",
    data_fim: "2023-12-19",
    mensagem: "Em férias. Não estarei verificando e-mails ou mensagens.",
    contato_emergencia: "Bruno Costa (bruno.costa@empresa.com)",
  },
  {
    id: 10,
    nome: "João Pereira",
    avatar: "JP",
    cargo: "Vendedor",
    setor: "Vendas",
    tipo: "LICENCA",
    data_inicio: "2023-11-28",
    data_fim: "2023-12-02",
    mensagem: "Licença médica. Retorno previsto para 03/12.",
    contato_emergencia: "Daniel Santos (daniel.santos@empresa.com)",
  },
]

// Dados simulados para próximas ausências
const proximasAusencias = [
  {
    id: 2,
    nome: "Bruno Costa",
    avatar: "BC",
    cargo: "Desenvolvedor",
    setor: "TI",
    tipo: "FERIAS",
    data_inicio: "2023-12-26",
    data_fim: "2024-01-14",
    mensagem: "Estarei de férias. Para assuntos urgentes, contate a Ana.",
    contato_emergencia: "Ana Silva (ana.silva@empresa.com)",
  },
  {
    id: 4,
    nome: "Daniel Santos",
    avatar: "DS",
    cargo: "Gerente",
    setor: "Vendas",
    tipo: "LICENCA",
    data_inicio: "2023-12-10",
    data_fim: "2023-12-15",
    mensagem: "Licença para participação em evento. Disponível por e-mail em horários limitados.",
    contato_emergencia: "João Pereira (joao.pereira@empresa.com)",
  },
]

// Dados simulados para histórico de ausências
const historicoAusencias = [
  {
    id: 1,
    nome: "Ana Silva",
    avatar: "AS",
    cargo: "Analista de TI",
    setor: "TI",
    tipo: "FOLGA",
    data_inicio: "2023-10-15",
    data_fim: "2023-10-15",
  },
  {
    id: 2,
    nome: "Bruno Costa",
    avatar: "BC",
    cargo: "Desenvolvedor",
    setor: "TI",
    tipo: "LICENCA",
    data_inicio: "2023-09-20",
    data_fim: "2023-09-25",
  },
  {
    id: 3,
    nome: "Carla Oliveira",
    avatar: "CO",
    cargo: "Designer",
    setor: "Marketing",
    tipo: "FERIAS",
    data_inicio: "2023-08-01",
    data_fim: "2023-08-20",
  },
  {
    id: 4,
    nome: "Daniel Santos",
    avatar: "DS",
    cargo: "Gerente",
    setor: "Vendas",
    tipo: "FOLGA",
    data_inicio: "2023-10-10",
    data_fim: "2023-10-10",
  },
  {
    id: 5,
    nome: "Eduarda Lima",
    avatar: "EL",
    cargo: "Analista de RH",
    setor: "RH",
    tipo: "LICENCA",
    data_inicio: "2023-09-05",
    data_fim: "2023-09-09",
  },
]

export default function StatusDisponibilidadePage() {
  const [detalhesAbertos, setDetalhesAbertos] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [filtroSetor, setFiltroSetor] = useState("")
  const [filtroTipo, setFiltroTipo] = useState("")
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState<any>(null)

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString()
  }

  const getTipoBadge = (tipo: string) => {
    switch (tipo) {
      case "FERIAS":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-700 hover:bg-blue-100">
            Férias
          </Badge>
        )
      case "FOLGA":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-700 hover:bg-purple-100">
            Folga
          </Badge>
        )
      case "LICENCA":
        return (
          <Badge variant="outline" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100">
            Licença
          </Badge>
        )
      default:
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-700 hover:bg-gray-100">
            {tipo}
          </Badge>
        )
    }
  }

  const filtrarFuncionarios = (lista: any[]) => {
    return lista.filter((funcionario) => {
      const matchesSearch =
        searchTerm === "" ||
        funcionario.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        funcionario.setor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        funcionario.cargo.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSetor = filtroSetor === "" || funcionario.setor === filtroSetor
      const matchesTipo = filtroTipo === "" || funcionario.tipo === filtroTipo

      return matchesSearch && matchesSetor && matchesTipo
    })
  }

  const handleVerDetalhes = (funcionario: any) => {
    setFuncionarioSelecionado(funcionario)
    setDetalhesAbertos(funcionario.id)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Input
            placeholder="Buscar funcionário..."
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
          </SelectContent>
        </Select>

        <Select value={filtroTipo} onValueChange={setFiltroTipo}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Todos os tipos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os tipos</SelectItem>
            <SelectItem value="FERIAS">Férias</SelectItem>
            <SelectItem value="FOLGA">Folga</SelectItem>
            <SelectItem value="LICENCA">Licença</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="atuais" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="atuais">Ausências Atuais</TabsTrigger>
          <TabsTrigger value="proximas">Próximas Ausências</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="atuais">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5 text-amber-500" />
                Funcionários Ausentes Atualmente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrarFuncionarios(funcionariosAusentes).length > 0 ? (
                    filtrarFuncionarios(funcionariosAusentes).map((funcionario) => (
                      <TableRow key={funcionario.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={funcionario.nome} />
                              <AvatarFallback>{funcionario.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{funcionario.nome}</div>
                              <div className="text-xs text-muted-foreground">{funcionario.cargo}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{funcionario.setor}</TableCell>
                        <TableCell>{getTipoBadge(funcionario.tipo)}</TableCell>
                        <TableCell>
                          {formatarData(funcionario.data_inicio)}
                          {funcionario.data_inicio !== funcionario.data_fim &&
                            ` até ${formatarData(funcionario.data_fim)}`}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerDetalhes(funcionario)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Detalhes</span>
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        Nenhum funcionário ausente encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="proximas">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5 text-blue-500" />
                Próximas Ausências Programadas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Período</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrarFuncionarios(proximasAusencias).length > 0 ? (
                    filtrarFuncionarios(proximasAusencias).map((funcionario) => (
                      <TableRow key={funcionario.id}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={funcionario.nome} />
                              <AvatarFallback>{funcionario.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{funcionario.nome}</div>
                              <div className="text-xs text-muted-foreground">{funcionario.cargo}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{funcionario.setor}</TableCell>
                        <TableCell>{getTipoBadge(funcionario.tipo)}</TableCell>
                        <TableCell>
                          {formatarData(funcionario.data_inicio)}
                          {funcionario.data_inicio !== funcionario.data_fim &&
                            ` até ${formatarData(funcionario.data_fim)}`}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleVerDetalhes(funcionario)}
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">Detalhes</span>
                            <AlertCircle className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
                        Nenhuma ausência programada encontrada
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-gray-500" />
                Histórico de Ausências
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Setor</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Período</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtrarFuncionarios(historicoAusencias).length > 0 ? (
                    filtrarFuncionarios(historicoAusencias).map((funcionario) => (
                      <TableRow key={`${funcionario.id}-${funcionario.data_inicio}`}>
                        <TableCell>
                          <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={funcionario.nome} />
                              <AvatarFallback>{funcionario.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{funcionario.nome}</div>
                              <div className="text-xs text-muted-foreground">{funcionario.cargo}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{funcionario.setor}</TableCell>
                        <TableCell>{getTipoBadge(funcionario.tipo)}</TableCell>
                        <TableCell>
                          {formatarData(funcionario.data_inicio)}
                          {funcionario.data_inicio !== funcionario.data_fim &&
                            ` até ${formatarData(funcionario.data_fim)}`}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                        Nenhum histórico de ausência encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Diálogo de Detalhes */}
      <Dialog open={detalhesAbertos !== null} onOpenChange={(open) => !open && setDetalhesAbertos(null)}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalhes de Ausência</DialogTitle>
            <DialogDescription>Informações sobre o período de ausência do funcionário</DialogDescription>
          </DialogHeader>

          {funcionarioSelecionado && (
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} alt={funcionarioSelecionado.nome} />
                  <AvatarFallback>{funcionarioSelecionado.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">{funcionarioSelecionado.nome}</h3>
                  <p className="text-sm text-muted-foreground">
                    {funcionarioSelecionado.cargo} - {funcionarioSelecionado.setor}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium">Status:</span>
                {getTipoBadge(funcionarioSelecionado.tipo)}
              </div>

              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>
                  Período: {formatarData(funcionarioSelecionado.data_inicio)}
                  {funcionarioSelecionado.data_inicio !== funcionarioSelecionado.data_fim &&
                    ` até ${formatarData(funcionarioSelecionado.data_fim)}`}
                </span>
              </div>

              {funcionarioSelecionado.mensagem && (
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <h4 className="font-medium flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2 text-amber-500" />
                    Mensagem:
                  </h4>
                  <p className="mt-1 text-sm">{funcionarioSelecionado.mensagem}</p>
                </div>
              )}

              {funcionarioSelecionado.contato_emergencia && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <h4 className="font-medium flex items-center">
                    <User className="h-4 w-4 mr-2 text-blue-500" />
                    Contato para emergências:
                  </h4>
                  <p className="mt-1 text-sm">{funcionarioSelecionado.contato_emergencia}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
