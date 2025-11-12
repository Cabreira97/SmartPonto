"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Clock,
  Coffee,
  Activity,
  Eye,
  AlertTriangle,
  CheckCircle,
  Bell,
  Settings,
  Zap,
  Heart,
  Calendar,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

// Dados simulados para demonstração
const dadosBemEstar = {
  tempo_sem_pausa: 85, // minutos
  pausas_hoje: [
    { id: 1, inicio: "09:30", fim: "09:40", duracao: 10, tipo: "CAFE" },
    { id: 2, inicio: "11:15", fim: "11:25", duracao: 10, tipo: "ALONGAMENTO" },
    { id: 3, inicio: "14:30", fim: "14:40", duracao: 10, tipo: "CAFE" },
  ],
  estatisticas_semana: {
    total_pausas: 15,
    tempo_total_pausas: 150, // minutos
    media_pausas_dia: 3,
    maior_tempo_sem_pausa: 120, // minutos
  },
  distribuicao_pausas: [
    { name: "Café", value: 40 },
    { name: "Alongamento", value: 30 },
    { name: "Descanso Visual", value: 20 },
    { name: "Outros", value: 10 },
  ],
  dicas_ergonomia: [
    {
      id: "postura",
      titulo: "Postura Correta",
      descricao:
        "Mantenha a coluna reta, apoiada no encosto da cadeira. Os pés devem estar apoiados no chão e os braços em ângulo de 90 graus com o teclado.",
      imagem: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "visao",
      titulo: "Cuidados com a Visão",
      descricao:
        "Posicione o monitor a uma distância de aproximadamente 50-70cm dos olhos. A parte superior da tela deve estar na altura dos olhos ou ligeiramente abaixo.",
      imagem: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "pausas",
      titulo: "Importância das Pausas",
      descricao:
        "Faça pausas de 5-10 minutos a cada hora de trabalho. Levante-se, caminhe um pouco e faça alongamentos simples para relaxar os músculos.",
      imagem: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "alongamentos",
      titulo: "Alongamentos Recomendados",
      descricao:
        "Realize alongamentos para pescoço, ombros, punhos e costas. Gire o pescoço suavemente, estique os braços e faça rotação dos punhos regularmente.",
      imagem: "/placeholder.svg?height=200&width=300",
    },
  ],
  configuracoes: {
    lembretes_ativos: true,
    intervalo_lembretes: 60, // minutos
    tipo_notificacao: "DESKTOP",
    pausas_automaticas: false,
  },
}

// Cores para o gráfico de pizza
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

export default function BemEstarComponent() {
  const [isPausaAtiva, setIsPausaAtiva] = useState(false)
  const [tipoPausa, setTipoPausa] = useState("CAFE")
  const [tempoDecorrido, setTempoDecorrido] = useState(0)
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false)
  const [configLembretesAtivos, setConfigLembretesAtivos] = useState(dadosBemEstar.configuracoes.lembretes_ativos)
  const [configIntervaloLembretes, setConfigIntervaloLembretes] = useState(
    dadosBemEstar.configuracoes.intervalo_lembretes.toString(),
  )
  const [configTipoNotificacao, setConfigTipoNotificacao] = useState(dadosBemEstar.configuracoes.tipo_notificacao)
  const [configPausasAutomaticas, setConfigPausasAutomaticas] = useState(dadosBemEstar.configuracoes.pausas_automaticas)
  const [isLembreteDialogOpen, setIsLembreteDialogOpen] = useState(false)
  const [lembreteAtual, setLembreteAtual] = useState<any>(null)

  // Simular o tempo decorrendo durante uma pausa ativa
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPausaAtiva) {
      interval = setInterval(() => {
        setTempoDecorrido((prev) => prev + 1)
      }, 1000)
    } else {
      setTempoDecorrido(0)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPausaAtiva])

  // Simular um lembrete após carregar a página
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (dadosBemEstar.tempo_sem_pausa > 60 && !isPausaAtiva) {
        setLembreteAtual(dadosBemEstar.dicas_ergonomia[2]) // Dica sobre pausas
        setIsLembreteDialogOpen(true)
      }
    }, 5000) // 5 segundos após carregar a página

    return () => clearTimeout(timeout)
  }, [])

  const iniciarPausa = () => {
    setIsPausaAtiva(true)
    toast({
      title: "Pausa iniciada",
      description: `Sua pausa de ${tipoPausa === "CAFE" ? "café" : tipoPausa === "ALONGAMENTO" ? "alongamento" : "descanso visual"} foi iniciada.`,
    })
  }

  const finalizarPausa = () => {
    setIsPausaAtiva(false)
    toast({
      title: "Pausa finalizada",
      description: `Sua pausa de ${Math.floor(tempoDecorrido / 60)}min ${tempoDecorrido % 60}s foi registrada.`,
    })
  }

  const salvarConfiguracoes = () => {
    // Aqui seria feita a chamada à API para salvar as configurações
    console.log("Salvando configurações:", {
      lembretes_ativos: configLembretesAtivos,
      intervalo_lembretes: Number(configIntervaloLembretes),
      tipo_notificacao: configTipoNotificacao,
      pausas_automaticas: configPausasAutomaticas,
    })

    toast({
      title: "Configurações salvas",
      description: "Suas preferências de bem-estar foram atualizadas com sucesso.",
    })

    setIsConfigDialogOpen(false)
  }

  const formatarTempoDecorrido = () => {
    const minutos = Math.floor(tempoDecorrido / 60)
    const segundos = tempoDecorrido % 60
    return `${minutos.toString().padStart(2, "0")}:${segundos.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button variant="outline" onClick={() => setIsConfigDialogOpen(true)}>
          <Settings className="mr-2 h-4 w-4" />
          Configurações
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className={dadosBemEstar.tempo_sem_pausa > 60 ? "border-amber-200" : "border-green-200"}>
          <CardHeader className="pb-2">
            <CardDescription>Tempo sem Pausa</CardDescription>
            <CardTitle className="text-3xl flex items-center">
              {dadosBemEstar.tempo_sem_pausa > 60 ? (
                <AlertTriangle className="mr-2 h-6 w-6 text-amber-500" />
              ) : (
                <CheckCircle className="mr-2 h-6 w-6 text-green-500" />
              )}
              {Math.floor(dadosBemEstar.tempo_sem_pausa / 60)}h {dadosBemEstar.tempo_sem_pausa % 60}min
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>0min</span>
                <span>60min</span>
                <span>120min</span>
              </div>
              <Progress
                value={(dadosBemEstar.tempo_sem_pausa / 120) * 100}
                className="h-2"
                indicatorClassName={
                  dadosBemEstar.tempo_sem_pausa > 90
                    ? "bg-red-500"
                    : dadosBemEstar.tempo_sem_pausa > 60
                      ? "bg-amber-500"
                      : "bg-green-500"
                }
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {dadosBemEstar.tempo_sem_pausa > 90
                ? "Recomendamos fazer uma pausa imediatamente!"
                : dadosBemEstar.tempo_sem_pausa > 60
                  ? "Está na hora de fazer uma pausa."
                  : "Seu tempo de trabalho contínuo está saudável."}
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            {!isPausaAtiva ? (
              <Button
                className="w-full"
                onClick={iniciarPausa}
                variant={dadosBemEstar.tempo_sem_pausa > 60 ? "default" : "outline"}
              >
                <Coffee className="mr-2 h-4 w-4" />
                Iniciar Pausa
              </Button>
            ) : (
              <Button className="w-full" variant="outline" onClick={finalizarPausa}>
                <Clock className="mr-2 h-4 w-4" />
                Finalizar Pausa ({formatarTempoDecorrido()})
              </Button>
            )}
          </CardFooter>
        </Card>

        {!isPausaAtiva ? (
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Pausas de Hoje</CardTitle>
              <CardDescription>Registro das pausas realizadas durante o dia</CardDescription>
            </CardHeader>
            <CardContent>
              {dadosBemEstar.pausas_hoje.length > 0 ? (
                <div className="space-y-4">
                  {dadosBemEstar.pausas_hoje.map((pausa) => (
                    <div key={pausa.id} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        {pausa.tipo === "CAFE" ? (
                          <Coffee className="h-5 w-5 mr-2 text-amber-500" />
                        ) : pausa.tipo === "ALONGAMENTO" ? (
                          <Activity className="h-5 w-5 mr-2 text-green-500" />
                        ) : (
                          <Eye className="h-5 w-5 mr-2 text-blue-500" />
                        )}
                        <div>
                          <div className="font-medium">
                            {pausa.tipo === "CAFE"
                              ? "Pausa para Café"
                              : pausa.tipo === "ALONGAMENTO"
                                ? "Alongamento"
                                : "Descanso Visual"}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {pausa.inicio} - {pausa.fim} ({pausa.duracao} minutos)
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-700">
                        {pausa.duracao} min
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  Nenhuma pausa registrada hoje. Lembre-se de fazer pausas regulares!
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">Total de pausas: {dadosBemEstar.pausas_hoje.length}</div>
              <div className="text-sm text-muted-foreground">
                Tempo total: {dadosBemEstar.pausas_hoje.reduce((acc, curr) => acc + curr.duracao, 0)} minutos
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card className="md:col-span-2 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Activity className="mr-2 h-5 w-5 text-green-500" />
                Pausa em Andamento
              </CardTitle>
              <CardDescription>Aproveite este momento para relaxar</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="text-5xl font-bold mb-4">{formatarTempoDecorrido()}</div>
                  <Badge variant="outline" className="bg-green-100 text-green-700">
                    {tipoPausa === "CAFE"
                      ? "Pausa para Café"
                      : tipoPausa === "ALONGAMENTO"
                        ? "Alongamento"
                        : "Descanso Visual"}
                  </Badge>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <h3 className="font-medium flex items-center text-green-700 mb-2">
                    <Zap className="h-5 w-5 mr-2" />
                    Dica para sua pausa
                  </h3>
                  {tipoPausa === "CAFE" ? (
                    <p className="text-sm">
                      Aproveite para hidratar-se adequadamente. Além do café, considere beber um copo de água para
                      manter-se hidratado durante o dia de trabalho.
                    </p>
                  ) : tipoPausa === "ALONGAMENTO" ? (
                    <p className="text-sm">
                      Faça alongamentos suaves para o pescoço, ombros e costas. Gire os pulsos e estique os dedos para
                      aliviar a tensão causada pela digitação.
                    </p>
                  ) : (
                    <p className="text-sm">
                      Pratique a regra 20-20-20: a cada 20 minutos, olhe para algo a 20 pés (6 metros) de distância por
                      20 segundos para reduzir a fadiga visual.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={finalizarPausa}>
                Finalizar Pausa
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      <Tabs defaultValue="estatisticas" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="estatisticas">Estatísticas</TabsTrigger>
          <TabsTrigger value="dicas">Dicas de Ergonomia</TabsTrigger>
        </TabsList>

        <TabsContent value="estatisticas">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Estatísticas da Semana</CardTitle>
                <CardDescription>Resumo das suas pausas nos últimos 7 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <Coffee className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Total de pausas</span>
                    </div>
                    <span className="font-medium">{dadosBemEstar.estatisticas_semana.total_pausas}</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Tempo total em pausas</span>
                    </div>
                    <span className="font-medium">
                      {Math.floor(dadosBemEstar.estatisticas_semana.tempo_total_pausas / 60)}h{" "}
                      {dadosBemEstar.estatisticas_semana.tempo_total_pausas % 60}min
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 mr-2 text-muted-foreground" />
                      <span>Média de pausas por dia</span>
                    </div>
                    <span className="font-medium">{dadosBemEstar.estatisticas_semana.media_pausas_dia}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
                      <span>Maior tempo sem pausa</span>
                    </div>
                    <span className="font-medium">
                      {Math.floor(dadosBemEstar.estatisticas_semana.maior_tempo_sem_pausa / 60)}h{" "}
                      {dadosBemEstar.estatisticas_semana.maior_tempo_sem_pausa % 60}min
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Pausas</CardTitle>
                <CardDescription>Tipos de pausas realizadas na semana</CardDescription>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosBemEstar.distribuicao_pausas}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {dadosBemEstar.distribuicao_pausas.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="dicas">
          <Card>
            <CardHeader>
              <CardTitle>Dicas de Ergonomia e Bem-estar</CardTitle>
              <CardDescription>Recomendações para melhorar sua saúde no ambiente de trabalho</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {dadosBemEstar.dicas_ergonomia.map((dica) => (
                  <AccordionItem key={dica.id} value={dica.id}>
                    <AccordionTrigger>
                      <div className="flex items-center">
                        {dica.id === "postura" ? (
                          <Activity className="h-5 w-5 mr-2 text-blue-500" />
                        ) : dica.id === "visao" ? (
                          <Eye className="h-5 w-5 mr-2 text-green-500" />
                        ) : dica.id === "pausas" ? (
                          <Coffee className="h-5 w-5 mr-2 text-amber-500" />
                        ) : (
                          <Heart className="h-5 w-5 mr-2 text-red-500" />
                        )}
                        {dica.titulo}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div>
                          <p className="text-sm">{dica.descricao}</p>
                        </div>
                        <div className="flex justify-center">
                          <img
                            src={dica.imagem || "/placeholder.svg"}
                            alt={dica.titulo}
                            className="rounded-md border"
                          />
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Configurações */}
      <Dialog open={isConfigDialogOpen} onOpenChange={setIsConfigDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Configurações de Bem-estar</DialogTitle>
            <DialogDescription>
              Personalize as configurações de lembretes e pausas de acordo com suas preferências.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="lembretes">Lembretes de Pausas</Label>
                <p className="text-xs text-muted-foreground">Receba lembretes para fazer pausas regularmente</p>
              </div>
              <Switch id="lembretes" checked={configLembretesAtivos} onCheckedChange={setConfigLembretesAtivos} />
            </div>

            {configLembretesAtivos && (
              <div className="space-y-2 pl-6 border-l-2 border-muted">
                <Label htmlFor="intervalo">Intervalo entre Lembretes (minutos)</Label>
                <Select value={configIntervaloLembretes} onValueChange={setConfigIntervaloLembretes}>
                  <SelectTrigger id="intervalo">
                    <SelectValue placeholder="Selecione o intervalo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutos</SelectItem>
                    <SelectItem value="45">45 minutos</SelectItem>
                    <SelectItem value="60">60 minutos</SelectItem>
                    <SelectItem value="90">90 minutos</SelectItem>
                    <SelectItem value="120">120 minutos</SelectItem>
                  </SelectContent>
                </Select>

                <div className="mt-4">
                  <Label htmlFor="tipoNotificacao">Tipo de Notificação</Label>
                  <Select value={configTipoNotificacao} onValueChange={setConfigTipoNotificacao}>
                    <SelectTrigger id="tipoNotificacao">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DESKTOP">Notificação Desktop</SelectItem>
                      <SelectItem value="SOM">Alerta Sonoro</SelectItem>
                      <SelectItem value="AMBOS">Ambos</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-6">
              <div className="space-y-0.5">
                <Label htmlFor="pausasAutomaticas">Pausas Automáticas</Label>
                <p className="text-xs text-muted-foreground">
                  Registrar pausas automaticamente quando você se afasta do computador
                </p>
              </div>
              <Switch
                id="pausasAutomaticas"
                checked={configPausasAutomaticas}
                onCheckedChange={setConfigPausasAutomaticas}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfigDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={salvarConfiguracoes}>Salvar Configurações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Lembrete */}
      <Dialog open={isLembreteDialogOpen} onOpenChange={setIsLembreteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-amber-500" />
              Hora de fazer uma pausa!
            </DialogTitle>
            <DialogDescription>
              Você está trabalhando há {Math.floor(dadosBemEstar.tempo_sem_pausa / 60)}h{" "}
              {dadosBemEstar.tempo_sem_pausa % 60}min sem pausas.
            </DialogDescription>
          </DialogHeader>

          {lembreteAtual && (
            <div className="space-y-4 py-4">
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <h3 className="font-medium flex items-center text-amber-700 mb-2">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  {lembreteAtual.titulo}
                </h3>
                <p className="text-sm">{lembreteAtual.descricao}</p>
              </div>

              <div className="flex justify-center">
                <img
                  src={lembreteAtual.imagem || "/placeholder.svg"}
                  alt={lembreteAtual.titulo}
                  className="rounded-md border max-h-[200px]"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsLembreteDialogOpen(false)}>
              Mais tarde
            </Button>
            <Button
              onClick={() => {
                setIsLembreteDialogOpen(false)
                setTipoPausa("ALONGAMENTO")
                iniciarPausa()
              }}
            >
              Iniciar Pausa Agora
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
