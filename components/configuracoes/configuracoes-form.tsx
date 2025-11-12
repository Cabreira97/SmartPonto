"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Globe, Bell, Clock, Shield, User, Mail, CalendarIcon } from "lucide-react"
import ConfiguracoesTema from "./configuracoes-tema"
import { toast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

export default function ConfiguracoesForm() {
  const [idioma, setIdioma] = useState("pt-BR")
  const [formatoHora, setFormatoHora] = useState("24h")
  const [formatoData, setFormatoData] = useState("dd/MM/yyyy")
  const [notificacoesEmail, setNotificacoesEmail] = useState(true)
  const [notificacoesApp, setNotificacoesApp] = useState(true)
  const [notificacoesDesktop, setNotificacoesDesktop] = useState(false)
  const [intervaloSincronizacao, setIntervaloSincronizacao] = useState(5)
  const [timeoutSessao, setTimeoutSessao] = useState(30)
  const [date, setDate] = useState<Date>()

  const handleSalvarConfiguracoes = () => {
    // Aqui seria feita a chamada à API para salvar as configurações
    console.log("Salvando configurações:", {
      idioma,
      formato_hora: formatoHora,
      formato_data: formatoData,
      notificacoes: {
        email: notificacoesEmail,
        app: notificacoesApp,
        desktop: notificacoesDesktop,
      },
      intervalo_sincronizacao: intervaloSincronizacao,
      timeout_sessao: timeoutSessao,
    })

    // Simulação de sucesso
    toast({
      title: "Configurações salvas",
      description: "Suas configurações foram salvas com sucesso!",
    })
  }

  return (
    <Tabs defaultValue="aparencia" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="aparencia">Aparência</TabsTrigger>
        <TabsTrigger value="idioma">Idioma e Região</TabsTrigger>
        <TabsTrigger value="notificacoes">Notificações</TabsTrigger>
        <TabsTrigger value="sistema">Sistema</TabsTrigger>
      </TabsList>

      <TabsContent value="aparencia">
        <Card>
          <CardHeader>
            <CardTitle>Aparência</CardTitle>
            <CardDescription>Personalize a aparência do sistema de acordo com suas preferências.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <ConfiguracoesTema />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="idioma">
        <Card>
          <CardHeader>
            <CardTitle>Idioma e Região</CardTitle>
            <CardDescription>Configure o idioma e os formatos de data e hora do sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center">
                <Globe className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="idioma">Idioma</Label>
              </div>
              <Select value={idioma} onValueChange={setIdioma}>
                <SelectTrigger id="idioma">
                  <SelectValue placeholder="Selecione o idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                  <SelectItem value="en-US">English (United States)</SelectItem>
                  <SelectItem value="es-ES">Español</SelectItem>
                  <SelectItem value="fr-FR">Français</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label>Formato de Hora</Label>
              </div>
              <RadioGroup value={formatoHora} onValueChange={setFormatoHora} className="flex flex-col space-y-1">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="12h" id="hora-12h" />
                  <Label htmlFor="hora-12h">12 horas (AM/PM)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="24h" id="hora-24h" />
                  <Label htmlFor="hora-24h">24 horas</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="formatoData">Formato de Data</Label>
              </div>
              <Select value={formatoData} onValueChange={setFormatoData}>
                <SelectTrigger id="formatoData">
                  <SelectValue placeholder="Selecione o formato de data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/MM/yyyy">DD/MM/AAAA (31/12/2023)</SelectItem>
                  <SelectItem value="MM/dd/yyyy">MM/DD/AAAA (12/31/2023)</SelectItem>
                  <SelectItem value="yyyy-MM-dd">AAAA-MM-DD (2023-12-31)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label>Visualização do Calendário</Label>
              </div>
              <div className="border rounded-md p-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: ptBR }) : <span>Selecione uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      locale={ptBR}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <p className="text-xs text-muted-foreground mt-2">
                  Exemplo de como o calendário será exibido no sistema com o formato de data selecionado.
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSalvarConfiguracoes}>Salvar Configurações</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="notificacoes">
        <Card>
          <CardHeader>
            <CardTitle>Notificações</CardTitle>
            <CardDescription>Configure como e quando você deseja receber notificações do sistema.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label>Canais de Notificação</Label>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="notificacoesEmail">Notificações por E-mail</Label>
                  </div>
                  <Switch id="notificacoesEmail" checked={notificacoesEmail} onCheckedChange={setNotificacoesEmail} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="notificacoesApp">Notificações no Aplicativo</Label>
                  </div>
                  <Switch id="notificacoesApp" checked={notificacoesApp} onCheckedChange={setNotificacoesApp} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                    <Label htmlFor="notificacoesDesktop">Notificações Desktop</Label>
                  </div>
                  <Switch
                    id="notificacoesDesktop"
                    checked={notificacoesDesktop}
                    onCheckedChange={setNotificacoesDesktop}
                  />
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center">
                <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label>Tipos de Notificação</Label>
              </div>

              <div className="space-y-2 pl-6">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notif-ponto" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="notif-ponto">Registro de ponto</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notif-folgas" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="notif-folgas">Solicitações de folgas e férias</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notif-escalas" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="notif-escalas">Alterações de escala</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="notif-relatorios" className="rounded border-gray-300" defaultChecked />
                  <Label htmlFor="notif-relatorios">Relatórios disponíveis</Label>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSalvarConfiguracoes}>Salvar Configurações</Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="sistema">
        <Card>
          <CardHeader>
            <CardTitle>Sistema</CardTitle>
            <CardDescription>Configure parâmetros do sistema e segurança.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="intervaloSincronizacao">Intervalo de Sincronização (minutos)</Label>
              </div>
              <div className="space-y-2">
                <Slider
                  id="intervaloSincronizacao"
                  min={1}
                  max={30}
                  step={1}
                  value={[intervaloSincronizacao]}
                  onValueChange={(value) => setIntervaloSincronizacao(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1 min</span>
                  <span>{intervaloSincronizacao} min</span>
                  <span>30 min</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center">
                <Shield className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="timeoutSessao">Timeout de Sessão (minutos)</Label>
              </div>
              <div className="space-y-2">
                <Slider
                  id="timeoutSessao"
                  min={5}
                  max={120}
                  step={5}
                  value={[timeoutSessao]}
                  onValueChange={(value) => setTimeoutSessao(value[0])}
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>5 min</span>
                  <span>{timeoutSessao} min</span>
                  <span>120 min</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label>Configurações de Conta</Label>
              </div>

              <div className="space-y-4 pl-6">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="autenticacao-dois-fatores" className="rounded border-gray-300" />
                  <Label htmlFor="autenticacao-dois-fatores">Habilitar autenticação de dois fatores</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="login-biometrico" className="rounded border-gray-300" />
                  <Label htmlFor="login-biometrico">Permitir login biométrico</Label>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                <Label htmlFor="emailContato">E-mail para Contato</Label>
              </div>
              <Input id="emailContato" type="email" placeholder="seu@email.com" defaultValue="admin@empresa.com" />
              <p className="text-xs text-muted-foreground">
                Este e-mail será usado para comunicações importantes do sistema.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSalvarConfiguracoes}>Salvar Configurações</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
