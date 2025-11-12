"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Clock, Plus, Minus, CalendarIcon, ArrowUp, ArrowDown, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Dados simulados para demonstração
const dadosBancoHoras = {
  saldo_atual: 12.5, // Horas positivas
  historico: [
    {
      id: 1,
      data: "2023-11-15",
      tipo: "CREDITO",
      horas: 2.5,
      motivo: "Hora extra - Implantação de sistema",
      aprovado_por: "Daniel Santos",
    },
    {
      id: 2,
      data: "2023-11-10",
      tipo: "DEBITO",
      horas: 4,
      motivo: "Compensação - Consulta médica",
      aprovado_por: "Daniel Santos",
    },
    {
      id: 3,
      data: "2023-11-05",
      tipo: "CREDITO",
      horas: 3,
      motivo: "Hora extra - Fechamento mensal",
      aprovado_por: "Daniel Santos",
    },
    {
      id: 4,
      data: "2023-10-28",
      tipo: "CREDITO",
      horas: 2,
      motivo: "Hora extra - Reunião fora do horário",
      aprovado_por: "Daniel Santos",
    },
    {
      id: 5,
      data: "2023-10-20",
      tipo: "DEBITO",
      horas: 8,
      motivo: "Compensação - Dia pessoal",
      aprovado_por: "Daniel Santos",
    },
    {
      id: 6,
      data: "2023-10-15",
      tipo: "CREDITO",
      horas: 4,
      motivo: "Hora extra - Suporte emergencial",
      aprovado_por: "Daniel Santos",
    },
    {
      id: 7,
      data: "2023-10-10",
      tipo: "CREDITO",
      horas: 1.5,
      motivo: "Hora extra - Treinamento",
      aprovado_por: "Daniel Santos",
    },
    {
      id: 8,
      data: "2023-10-05",
      tipo: "DEBITO",
      horas: 2,
      motivo: "Compensação - Saída antecipada",
      aprovado_por: "Daniel Santos",
    },
  ],
  evolucao_saldo: [
    { mes: "Jan", saldo: 5 },
    { mes: "Fev", saldo: 8 },
    { mes: "Mar", saldo: 6 },
    { mes: "Abr", saldo: 10 },
    { mes: "Mai", saldo: 7 },
    { mes: "Jun", saldo: 12 },
    { mes: "Jul", saldo: 9 },
    { mes: "Ago", saldo: 14 },
    { mes: "Set", saldo: 11 },
    { mes: "Out", saldo: 15 },
    { mes: "Nov", saldo: 12.5 },
  ],
  sugestoes_compensacao: [
    {
      data: "2023-11-24",
      horas: 8,
      tipo: "DIA_COMPLETO",
      motivo: "Baixa demanda prevista para sexta-feira",
    },
    {
      data: "2023-11-30",
      horas: 4,
      tipo: "MEIO_PERIODO",
      motivo: "Véspera de feriado com baixa demanda",
    },
    {
      data: "2023-12-08",
      horas: 8,
      tipo: "DIA_COMPLETO",
      motivo: "Emenda de feriado",
    },
  ],
}

export default function BancoHorasComponent() {
  const [isCompensacaoDialogOpen, setIsCompensacaoDialogOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [compensacaoHoras, setCompensacaoHoras] = useState("4")
  const [compensacaoMotivo, setCompensacaoMotivo] = useState("")
  const [compensacaoTipo, setCompensacaoTipo] = useState<"MEIO_PERIODO" | "DIA_COMPLETO" | "PERSONALIZADO">(
    "MEIO_PERIODO",
  )

  const handleSolicitarCompensacao = () => {
    if (!selectedDate) {
      toast({
        title: "Data não selecionada",
        description: "Por favor, selecione uma data para a compensação.",
        variant: "destructive",
      })
      return
    }

    // Aqui seria feita a chamada à API para solicitar a compensação
    console.log("Solicitando compensação:", {
      data: format(selectedDate, "yyyy-MM-dd"),
      horas: Number(compensacaoHoras),
      tipo: compensacaoTipo,
      motivo: compensacaoMotivo,
    })

    // Feedback para o usuário
    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de compensação foi enviada com sucesso.",
    })

    // Fechar o diálogo e resetar o formulário
    setIsCompensacaoDialogOpen(false)
    resetCompensacaoForm()
  }

  const resetCompensacaoForm = () => {
    setSelectedDate(undefined)
    setCompensacaoHoras("4")
    setCompensacaoMotivo("")
    setCompensacaoTipo("MEIO_PERIODO")
  }

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return format(data, "dd/MM/yyyy")
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={dadosBancoHoras.saldo_atual >= 0 ? "border-green-200" : "border-red-200"}>
          <CardHeader className="pb-2">
            <CardDescription>Saldo Atual</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              {dadosBancoHoras.saldo_atual >= 0 ? (
                <ArrowUp className="mr-2 h-6 w-6 text-green-500" />
              ) : (
                <ArrowDown className="mr-2 h-6 w-6 text-red-500" />
              )}
              {Math.abs(dadosBancoHoras.saldo_atual)}h
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center text-sm text-muted-foreground">
              {dadosBancoHoras.saldo_atual >= 0 ? (
                <CheckCircle className="mr-1 h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
              )}
              <span>
                {dadosBancoHoras.saldo_atual >= 0 ? "Saldo positivo para compensação" : "Saldo negativo a compensar"}
              </span>
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="outline"
              className="w-full bg-transparent"
              onClick={() => setIsCompensacaoDialogOpen(true)}
              disabled={dadosBancoHoras.saldo_atual <= 0}
            >
              <Clock className="mr-2 h-4 w-4" />
              Solicitar Compensação
            </Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Evolução do Saldo</CardTitle>
            <CardDescription>Histórico mensal do seu banco de horas</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dadosBancoHoras.evolucao_saldo}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="saldo" stroke="#8884d8" name="Saldo (horas)" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="historico" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="historico">Histórico de Movimentações</TabsTrigger>
          <TabsTrigger value="sugestoes">Sugestões de Compensação</TabsTrigger>
        </TabsList>

        <TabsContent value="historico">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Movimentações</CardTitle>
              <CardDescription>Registro de créditos e débitos no seu banco de horas</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Horas</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Aprovado por</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dadosBancoHoras.historico.map((movimento) => (
                    <TableRow key={movimento.id}>
                      <TableCell>{formatarData(movimento.data)}</TableCell>
                      <TableCell>
                        {movimento.tipo === "CREDITO" ? (
                          <Badge variant="outline" className="bg-green-100 text-green-700">
                            <Plus className="mr-1 h-3 w-3" />
                            Crédito
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-amber-100 text-amber-700">
                            <Minus className="mr-1 h-3 w-3" />
                            Débito
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="font-medium">{movimento.horas}h</TableCell>
                      <TableCell>{movimento.motivo}</TableCell>
                      <TableCell>{movimento.aprovado_por}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sugestoes">
          <Card>
            <CardHeader>
              <CardTitle>Sugestões de Compensação</CardTitle>
              <CardDescription>
                Datas recomendadas para compensação com base no seu saldo e na demanda da empresa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {dadosBancoHoras.sugestoes_compensacao.map((sugestao, index) => (
                  <Card key={index} className="border-dashed">
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="font-medium flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          {formatarData(sugestao.data)}
                          {sugestao.tipo === "DIA_COMPLETO" ? (
                            <Badge variant="outline" className="ml-2 bg-blue-100 text-blue-700">
                              Dia Completo
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="ml-2 bg-purple-100 text-purple-700">
                              Meio Período
                            </Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">{sugestao.motivo}</div>
                        <div className="text-sm font-medium">{sugestao.horas}h de compensação</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedDate(new Date(sugestao.data))
                          setCompensacaoHoras(sugestao.horas.toString())
                          setCompensacaoTipo(sugestao.tipo)
                          setIsCompensacaoDialogOpen(true)
                        }}
                      >
                        Solicitar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Solicitação de Compensação */}
      <Dialog open={isCompensacaoDialogOpen} onOpenChange={setIsCompensacaoDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Solicitar Compensação</DialogTitle>
            <DialogDescription>
              Preencha os detalhes para solicitar uma compensação do seu banco de horas.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Data da Compensação</Label>
              <div className="border rounded-md p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  locale={ptBR}
                  disabled={(date) => date < new Date()}
                  className="mx-auto"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Tipo de Compensação</Label>
              <Select value={compensacaoTipo} onValueChange={(value: any) => setCompensacaoTipo(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MEIO_PERIODO">Meio Período (4h)</SelectItem>
                  <SelectItem value="DIA_COMPLETO">Dia Completo (8h)</SelectItem>
                  <SelectItem value="PERSONALIZADO">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {compensacaoTipo === "PERSONALIZADO" && (
              <div className="space-y-2">
                <Label htmlFor="horas">Quantidade de Horas</Label>
                <Input
                  id="horas"
                  type="number"
                  min="1"
                  max={dadosBancoHoras.saldo_atual.toString()}
                  step="0.5"
                  value={compensacaoHoras}
                  onChange={(e) => setCompensacaoHoras(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Máximo disponível: {dadosBancoHoras.saldo_atual}h</p>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="motivo">Motivo</Label>
              <Textarea
                id="motivo"
                placeholder="Descreva o motivo da compensação"
                value={compensacaoMotivo}
                onChange={(e) => setCompensacaoMotivo(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCompensacaoDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSolicitarCompensacao} disabled={!selectedDate}>
              Solicitar Compensação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
