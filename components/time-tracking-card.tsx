"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Play, Square, Coffee, LogOut, AlertCircle, Lock } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

// Tipos de registro de ponto
type TipoRegistro = "ENTRADA" | "SAIDA_INTERVALO" | "RETORNO_INTERVALO" | "SAIDA_FINAL"

// Status do usuário
type StatusUsuario = "ATIVO" | "BLOQUEADO" | "INATIVO"

// Interface para registro de ponto
interface RegistroPonto {
  tipo: TipoRegistro
  horario: string
  timestamp: Date
}

export default function TimeTrackingCard() {
  const [currentTime, setCurrentTime] = useState("08:00:00")
  const [showDailyModal, setShowDailyModal] = useState(false)
  const [dailyData, setDailyData] = useState({
    ontem: "",
    hoje: "",
    impedimentos: "",
  })

  // Estados do sistema de ponto
  const [statusUsuario, setStatusUsuario] = useState<StatusUsuario>("ATIVO") // Simular usuário ativo/bloqueado
  const [registrosHoje, setRegistrosHoje] = useState<RegistroPonto[]>([])
  const [horasTrabalhadasHoje, setHorasTrabalhadasHoje] = useState(0) // em minutos
  const [horasIntervalo, setHorasIntervalo] = useState(0) // em minutos
  const [inicioJornada, setInicioJornada] = useState<Date | null>(null)
  const [inicioIntervalo, setInicioIntervalo] = useState<Date | null>(null)
  const [fimIntervalo, setFimIntervalo] = useState<Date | null>(null)

  const [horasLimite] = useState(8) // Limite padrão de 8 horas
  const [temHorasExtras] = useState(false)
  const [showLimiteAlert, setShowLimiteAlert] = useState(false)
  const router = useRouter()

  // Atualiza o relógio a cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      const timeString = now.toLocaleTimeString()
      setCurrentTime(timeString)

      // Atualizar contador de horas trabalhadas em tempo real
      if (inicioJornada && !isJornadaFinalizada()) {
        calcularHorasTrabalhadasTempoReal()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [inicioJornada, inicioIntervalo, fimIntervalo, registrosHoje])

  // Calcular horas trabalhadas em tempo real
  const calcularHorasTrabalhadasTempoReal = () => {
    if (!inicioJornada) return

    const agora = new Date()
    let totalMinutos = 0

    // Se está em intervalo, não conta o tempo atual
    if (inicioIntervalo && !fimIntervalo) {
      totalMinutos = Math.floor((inicioIntervalo.getTime() - inicioJornada.getTime()) / (1000 * 60))
    } else if (fimIntervalo) {
      // Tempo antes do intervalo + tempo depois do intervalo
      const tempoAntesIntervalo = Math.floor((inicioIntervalo!.getTime() - inicioJornada.getTime()) / (1000 * 60))
      const tempoDepoisIntervalo = Math.floor((agora.getTime() - fimIntervalo.getTime()) / (1000 * 60))
      totalMinutos = tempoAntesIntervalo + tempoDepoisIntervalo
    } else {
      // Tempo total desde o início
      totalMinutos = Math.floor((agora.getTime() - inicioJornada.getTime()) / (1000 * 60))
    }

    setHorasTrabalhadasHoje(totalMinutos)

    // Verificar limite de horas
    const horasDecimal = totalMinutos / 60
    if (horasDecimal >= horasLimite && !temHorasExtras && !showLimiteAlert) {
      setShowLimiteAlert(true)
      toast({
        title: "Limite de horas atingido",
        description: "Você atingiu seu limite diário de horas de trabalho.",
        variant: "destructive",
      })
    }
  }

  // Verificar qual é o próximo registro esperado
  const obterProximoRegistro = (): TipoRegistro => {
    if (registrosHoje.length === 0) return "ENTRADA"
    if (registrosHoje.length === 1) return "SAIDA_INTERVALO"
    if (registrosHoje.length === 2) return "RETORNO_INTERVALO"
    return "SAIDA_FINAL"
  }

  // Verificar se a jornada foi finalizada
  const isJornadaFinalizada = () => {
    return registrosHoje.length === 4
  }

  // Verificar se está em intervalo
  const isEmIntervalo = () => {
    return registrosHoje.length === 2 && inicioIntervalo && !fimIntervalo
  }

  // Registrar ponto
  const registrarPonto = () => {
    // Verificar se usuário está bloqueado
    if (statusUsuario === "BLOQUEADO") {
      toast({
        title: "Usuário Bloqueado",
        description: "Você não pode registrar ponto pois seu usuário está bloqueado. Entre em contato com o RH.",
        variant: "destructive",
      })
      return
    }

    // Verificar se já finalizou a jornada
    if (isJornadaFinalizada()) {
      toast({
        title: "Jornada Finalizada",
        description: "Você já registrou todos os pontos do dia.",
        variant: "destructive",
      })
      return
    }

    // Verificar limite de horas (exceto para saída final)
    const proximoRegistro = obterProximoRegistro()
    const horasDecimal = horasTrabalhadasHoje / 60
    if (horasDecimal >= horasLimite && !temHorasExtras && proximoRegistro !== "SAIDA_FINAL") {
      setShowLimiteAlert(true)
      return
    }

    const agora = new Date()
    const novoRegistro: RegistroPonto = {
      tipo: proximoRegistro,
      horario: agora.toLocaleTimeString(),
      timestamp: agora,
    }

    // Atualizar estados baseado no tipo de registro
    switch (proximoRegistro) {
      case "ENTRADA":
        setInicioJornada(agora)
        setShowDailyModal(true) // Mostrar modal de daily na entrada
        break
      case "SAIDA_INTERVALO":
        setInicioIntervalo(agora)
        break
      case "RETORNO_INTERVALO":
        setFimIntervalo(agora)
        if (inicioIntervalo) {
          const tempoIntervalo = Math.floor((agora.getTime() - inicioIntervalo.getTime()) / (1000 * 60))
          setHorasIntervalo(tempoIntervalo)
        }
        break
      case "SAIDA_FINAL":
        // Calcular horas finais trabalhadas
        calcularHorasTrabalhadasTempoReal()
        break
    }

    setRegistrosHoje([...registrosHoje, novoRegistro])

    toast({
      title: "Ponto Registrado",
      description: `${obterNomeRegistro(proximoRegistro)} registrado às ${novoRegistro.horario}`,
    })
  }

  // Obter nome amigável do registro
  const obterNomeRegistro = (tipo: TipoRegistro): string => {
    switch (tipo) {
      case "ENTRADA":
        return "Entrada"
      case "SAIDA_INTERVALO":
        return "Saída para Intervalo"
      case "RETORNO_INTERVALO":
        return "Retorno do Intervalo"
      case "SAIDA_FINAL":
        return "Saída Final"
    }
  }

  // Obter ícone do registro
  const obterIconeRegistro = (tipo: TipoRegistro) => {
    switch (tipo) {
      case "ENTRADA":
        return <Play className="mr-2 h-5 w-5" />
      case "SAIDA_INTERVALO":
        return <Coffee className="mr-2 h-5 w-5" />
      case "RETORNO_INTERVALO":
        return <Play className="mr-2 h-5 w-5" />
      case "SAIDA_FINAL":
        return <LogOut className="mr-2 h-5 w-5" />
    }
  }

  // Obter cor do botão
  const obterCorBotao = (tipo: TipoRegistro): string => {
    switch (tipo) {
      case "ENTRADA":
        return "bg-green-600 hover:bg-green-700"
      case "SAIDA_INTERVALO":
        return "bg-orange-600 hover:bg-orange-700"
      case "RETORNO_INTERVALO":
        return "bg-blue-600 hover:bg-blue-700"
      case "SAIDA_FINAL":
        return "bg-red-600 hover:bg-red-700"
    }
  }

  // Formatar minutos para horas:minutos
  const formatarTempo = (minutos: number): string => {
    const horas = Math.floor(minutos / 60)
    const mins = minutos % 60
    return `${horas.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`
  }

  // Calcular progresso da jornada
  const calcularProgressoJornada = (): number => {
    const horasDecimal = horasTrabalhadasHoje / 60
    return Math.min((horasDecimal / horasLimite) * 100, 100)
  }

  const handleDailySubmit = () => {
    console.log("Salvando daily:", dailyData)
    toast({
      title: "Daily registrada",
      description: "Sua daily foi registrada com sucesso.",
    })
    setShowDailyModal(false)
  }

  const handleDailySkip = () => {
    setShowDailyModal(false)
    toast({
      title: "Daily ignorada",
      description: "Você poderá registrar sua daily mais tarde.",
      variant: "destructive",
    })
  }

  const solicitarHorasExtras = () => {
    setShowLimiteAlert(false)
    router.push("/solicitar-extra-folga")
  }

  const proximoRegistro = obterProximoRegistro()

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center justify-between">
            Registro de Ponto
            {statusUsuario === "BLOQUEADO" && (
              <Badge variant="destructive" className="ml-2">
                <Lock className="w-3 h-3 mr-1" />
                Bloqueado
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-6 py-4">
            {/* Relógio */}
            <div className="text-5xl font-bold flex items-center">
              <Clock className="mr-4 h-10 w-10 text-gray-500" />
              {currentTime}
            </div>

            {/* Status do usuário bloqueado */}
            {statusUsuario === "BLOQUEADO" && (
              <Alert variant="destructive">
                <Lock className="h-4 w-4" />
                <AlertTitle>Usuário Bloqueado</AlertTitle>
                <AlertDescription>
                  Seu acesso ao sistema de ponto está bloqueado. Entre em contato com o RH para mais informações.
                </AlertDescription>
              </Alert>
            )}

            {/* Contador de horas trabalhadas */}
            {inicioJornada && !isJornadaFinalizada() && (
              <div className="w-full max-w-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Horas Trabalhadas Hoje:</span>
                  <span className="font-bold text-lg">{formatarTempo(horasTrabalhadasHoje)}</span>
                </div>
                <Progress value={calcularProgressoJornada()} className="w-full" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0h</span>
                  <span>{horasLimite}h (Meta)</span>
                </div>
                {isEmIntervalo() && (
                  <Badge variant="outline" className="w-full justify-center">
                    <Coffee className="w-3 h-3 mr-1" />
                    Em Intervalo
                  </Badge>
                )}
              </div>
            )}

            {/* Botão de registro */}
            <div className="flex space-x-4">
              {!isJornadaFinalizada() ? (
                <Button
                  size="lg"
                  onClick={registrarPonto}
                  className={obterCorBotao(proximoRegistro)}
                  disabled={statusUsuario === "BLOQUEADO"}
                >
                  {obterIconeRegistro(proximoRegistro)}
                  {obterNomeRegistro(proximoRegistro)}
                </Button>
              ) : (
                <Badge variant="outline" className="text-lg px-4 py-2">
                  <Square className="mr-2 h-5 w-5" />
                  Jornada Finalizada
                </Badge>
              )}
            </div>

            {/* Resumo dos registros de hoje */}
            <div className="w-full max-w-md">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Registros de Hoje</h3>
                <div className="space-y-2">
                  {registrosHoje.map((registro, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span>{obterNomeRegistro(registro.tipo)}:</span>
                      <span className="font-medium">{registro.horario}</span>
                    </div>
                  ))}
                  {/* Mostrar próximo registro esperado */}
                  {!isJornadaFinalizada() && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{obterNomeRegistro(proximoRegistro)}:</span>
                      <span>--:--</span>
                    </div>
                  )}
                </div>
                {horasIntervalo > 0 && (
                  <div className="mt-2 pt-2 border-t">
                    <div className="flex justify-between text-sm">
                      <span>Tempo de Intervalo:</span>
                      <span className="font-medium">{formatarTempo(horasIntervalo)}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botão para simular bloqueio/desbloqueio (apenas para demonstração) */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusUsuario(statusUsuario === "ATIVO" ? "BLOQUEADO" : "ATIVO")}
              >
                {statusUsuario === "ATIVO" ? "Simular Bloqueio" : "Desbloquear"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Alert de limite de horas */}
      {showLimiteAlert && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Limite de horas atingido</AlertTitle>
          <AlertDescription>
            Você atingiu seu limite diário de {horasLimite} horas de trabalho. Para continuar trabalhando, você precisa
            de autorização para horas extras.
            <div className="mt-2">
              <Button variant="outline" size="sm" onClick={() => setShowLimiteAlert(false)} className="mr-2">
                Fechar
              </Button>
              <Button size="sm" onClick={solicitarHorasExtras}>
                Solicitar Horas Extras
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Modal de Daily */}
      <Dialog open={showDailyModal} onOpenChange={setShowDailyModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Daily Scrum</DialogTitle>
            <DialogDescription>Por favor, preencha sua daily para o dia de hoje.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="ontem">O que foi feito ontem?</Label>
              <Textarea
                id="ontem"
                placeholder="Descreva as atividades realizadas ontem"
                value={dailyData.ontem}
                onChange={(e) => setDailyData({ ...dailyData, ontem: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hoje">O que vai ser feito hoje?</Label>
              <Textarea
                id="hoje"
                placeholder="Descreva as atividades planejadas para hoje"
                value={dailyData.hoje}
                onChange={(e) => setDailyData({ ...dailyData, hoje: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="impedimentos">Há algum impedimento?</Label>
              <Textarea
                id="impedimentos"
                placeholder="Descreva quaisquer impedimentos ou bloqueios"
                value={dailyData.impedimentos}
                onChange={(e) => setDailyData({ ...dailyData, impedimentos: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleDailySkip}>
              Pular
            </Button>
            <Button onClick={handleDailySubmit}>Registrar Daily</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
