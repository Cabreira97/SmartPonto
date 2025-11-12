"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { CalendarIcon, Clock, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SolicitarExtraFolga() {
  const router = useRouter()
  const [tipoSolicitacao, setTipoSolicitacao] = useState("extra")
  const [data, setData] = useState<Date | undefined>(new Date())
  const [horasExtras, setHorasExtras] = useState("2")
  const [motivo, setMotivo] = useState("")
  const [urgente, setUrgente] = useState(false)
  const [dataInicio, setDataInicio] = useState<Date | undefined>(new Date())
  const [dataFim, setDataFim] = useState<Date | undefined>(new Date(new Date().setDate(new Date().getDate() + 1)))
  const [tipoFolga, setTipoFolga] = useState("compensacao")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Validação básica
    if (!motivo) {
      toast({
        title: "Erro na solicitação",
        description: "Por favor, informe o motivo da solicitação.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulação de envio para API
    setTimeout(() => {
      toast({
        title: "Solicitação enviada",
        description: `Sua solicitação de ${
          tipoSolicitacao === "extra" ? "horas extras" : "folga"
        } foi enviada com sucesso e está aguardando aprovação.`,
      })
      setIsSubmitting(false)
      router.push("/folgas-ferias")
    }, 1500)
  }

  return (
    <div className="container mx-auto py-6 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Solicitar Horas Extras ou Folga</h1>
        <p className="text-muted-foreground mt-2">
          Preencha o formulário abaixo para solicitar horas extras ou folga. Sua solicitação será enviada para aprovação
          do seu gestor.
        </p>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Solicitações de horas extras devem ser feitas com pelo menos 24 horas de antecedência, exceto em casos de
          urgência. Solicitações de folga devem ser feitas com pelo menos 3 dias de antecedência.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Nova Solicitação</CardTitle>
          <CardDescription>Escolha o tipo de solicitação e preencha os detalhes necessários</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Tipo de Solicitação</Label>
            <RadioGroup
              defaultValue="extra"
              value={tipoSolicitacao}
              onValueChange={setTipoSolicitacao}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="extra" id="extra" />
                <Label htmlFor="extra" className="font-normal">
                  Horas Extras
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="folga" id="folga" />
                <Label htmlFor="folga" className="font-normal">
                  Folga
                </Label>
              </div>
            </RadioGroup>
          </div>

          {tipoSolicitacao === "extra" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="data">Data para Horas Extras</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn("w-full justify-start text-left font-normal", !data && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {data ? format(data, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={data}
                      onSelect={setData}
                      initialFocus
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label htmlFor="horasExtras">Quantidade de Horas Extras</Label>
                <Select value={horasExtras} onValueChange={setHorasExtras}>
                  <SelectTrigger id="horasExtras">
                    <SelectValue placeholder="Selecione a quantidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 hora</SelectItem>
                    <SelectItem value="2">2 horas</SelectItem>
                    <SelectItem value="3">3 horas</SelectItem>
                    <SelectItem value="4">4 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="urgente"
                  className="rounded border-gray-300"
                  checked={urgente}
                  onChange={(e) => setUrgente(e.target.checked)}
                />
                <Label htmlFor="urgente" className="font-normal">
                  Solicitação urgente (para o mesmo dia)
                </Label>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dataInicio">Data de Início</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dataInicio && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataInicio ? format(dataInicio, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dataInicio}
                        onSelect={setDataInicio}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataFim">Data de Fim</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dataFim && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dataFim ? format(dataFim, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={dataFim}
                        onSelect={setDataFim}
                        initialFocus
                        disabled={(date) => date < (dataInicio || new Date(new Date().setHours(0, 0, 0, 0)))}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoFolga">Tipo de Folga</Label>
                <Select value={tipoFolga} onValueChange={setTipoFolga}>
                  <SelectTrigger id="tipoFolga">
                    <SelectValue placeholder="Selecione o tipo de folga" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compensacao">Compensação de Horas</SelectItem>
                    <SelectItem value="abono">Abono</SelectItem>
                    <SelectItem value="ferias">Antecipação de Férias</SelectItem>
                    <SelectItem value="particular">Particular (sem remuneração)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="motivo">Motivo da Solicitação</Label>
            <Textarea
              id="motivo"
              placeholder="Descreva o motivo da sua solicitação"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Enviar Solicitação"}
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
              Status das Suas Solicitações
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">Horas Extras - 15/11/2023</p>
                  <p className="text-sm text-muted-foreground">2 horas extras</p>
                </div>
                <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Pendente</div>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <div>
                  <p className="font-medium">Folga - 10/11/2023</p>
                  <p className="text-sm text-muted-foreground">Compensação de Horas</p>
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">Aprovada</div>
              </div>
              <div className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">Horas Extras - 05/11/2023</p>
                  <p className="text-sm text-muted-foreground">3 horas extras</p>
                </div>
                <div className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Recusada</div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => router.push("/folgas-ferias")}>
              Ver Todas as Solicitações
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
