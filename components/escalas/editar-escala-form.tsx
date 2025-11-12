"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Clock, Calendar, Users, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

// Dados simulados para demonstração
const escalaExemplo = {
  id: 1,
  nome: "Horário Comercial",
  descricao: "Segunda a sexta, 8h às 17h com 1h de almoço",
  tipo: "PADRAO",
  cor: "bg-blue-500",
  dias_semana: [1, 2, 3, 4, 5], // Segunda a sexta
  hora_inicio: "08:00",
  hora_fim: "17:00",
  intervalo: 60, // minutos
  carga_horaria_diaria: 8,
  carga_horaria_semanal: 40,
  tolerancia_entrada: 10, // minutos
  tolerancia_saida: 10, // minutos
  permite_hora_extra: true,
  limite_hora_extra: 2, // horas
  ativa: true,
}

const diasSemana = [
  { id: 0, nome: "Domingo" },
  { id: 1, nome: "Segunda-feira" },
  { id: 2, nome: "Terça-feira" },
  { id: 3, nome: "Quarta-feira" },
  { id: 4, nome: "Quinta-feira" },
  { id: 5, nome: "Sexta-feira" },
  { id: 6, nome: "Sábado" },
]

const cores = [
  { id: "bg-blue-500", nome: "Azul", classe: "bg-blue-500" },
  { id: "bg-green-500", nome: "Verde", classe: "bg-green-500" },
  { id: "bg-red-500", nome: "Vermelho", classe: "bg-red-500" },
  { id: "bg-yellow-500", nome: "Amarelo", classe: "bg-yellow-500" },
  { id: "bg-purple-500", nome: "Roxo", classe: "bg-purple-500" },
  { id: "bg-pink-500", nome: "Rosa", classe: "bg-pink-500" },
  { id: "bg-indigo-500", nome: "Índigo", classe: "bg-indigo-500" },
  { id: "bg-gray-500", nome: "Cinza", classe: "bg-gray-500" },
]

export default function EditarEscalaForm() {
  const [nome, setNome] = useState(escalaExemplo.nome)
  const [descricao, setDescricao] = useState(escalaExemplo.descricao)
  const [tipo, setTipo] = useState(escalaExemplo.tipo)
  const [cor, setCor] = useState(escalaExemplo.cor)
  const [diasSelecionados, setDiasSelecionados] = useState<number[]>(escalaExemplo.dias_semana)
  const [horaInicio, setHoraInicio] = useState(escalaExemplo.hora_inicio)
  const [horaFim, setHoraFim] = useState(escalaExemplo.hora_fim)
  const [intervalo, setIntervalo] = useState(escalaExemplo.intervalo.toString())
  const [toleranciaEntrada, setToleranciaEntrada] = useState(escalaExemplo.tolerancia_entrada.toString())
  const [toleranciaSaida, setToleranciaSaida] = useState(escalaExemplo.tolerancia_saida.toString())
  const [permiteHoraExtra, setPermiteHoraExtra] = useState(escalaExemplo.permite_hora_extra)
  const [limiteHoraExtra, setLimiteHoraExtra] = useState(escalaExemplo.limite_hora_extra.toString())
  const [ativa, setAtiva] = useState(escalaExemplo.ativa)

  const handleDiaChange = (diaId: number) => {
    setDiasSelecionados((prev) => (prev.includes(diaId) ? prev.filter((id) => id !== diaId) : [...prev, diaId].sort()))
  }

  const calcularCargaHoraria = () => {
    // Converter horas para minutos
    const [horaInicioH, horaInicioM] = horaInicio.split(":").map(Number)
    const [horaFimH, horaFimM] = horaFim.split(":").map(Number)

    const inicioMinutos = horaInicioH * 60 + horaInicioM
    const fimMinutos = horaFimH * 60 + horaFimM

    // Calcular duração em minutos
    let duracaoMinutos = fimMinutos - inicioMinutos
    if (duracaoMinutos < 0) duracaoMinutos += 24 * 60 // Se passar da meia-noite

    // Subtrair intervalo
    const duracaoLiquida = duracaoMinutos - Number(intervalo)

    // Converter para horas
    const cargaHorariaDiaria = Math.max(0, duracaoLiquida / 60)
    const cargaHorariaSemanal = cargaHorariaDiaria * diasSelecionados.length

    return {
      diaria: cargaHorariaDiaria.toFixed(1),
      semanal: cargaHorariaSemanal.toFixed(1),
    }
  }

  const { diaria, semanal } = calcularCargaHoraria()

  const handleSalvar = () => {
    // Aqui seria feita a chamada à API para salvar a escala
    const escalaAtualizada = {
      id: escalaExemplo.id,
      nome,
      descricao,
      tipo,
      cor,
      dias_semana: diasSelecionados,
      hora_inicio: horaInicio,
      hora_fim: horaFim,
      intervalo: Number(intervalo),
      carga_horaria_diaria: Number(diaria),
      carga_horaria_semanal: Number(semanal),
      tolerancia_entrada: Number(toleranciaEntrada),
      tolerancia_saida: Number(toleranciaSaida),
      permite_hora_extra: permiteHoraExtra,
      limite_hora_extra: Number(limiteHoraExtra),
      ativa,
    }

    console.log("Escala atualizada:", escalaAtualizada)

    toast({
      title: "Escala atualizada",
      description: "A escala foi atualizada com sucesso.",
    })
  }

  return (
    <Tabs defaultValue="informacoes" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="informacoes">Informações Básicas</TabsTrigger>
        <TabsTrigger value="horarios">Horários</TabsTrigger>
        <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
      </TabsList>

      <TabsContent value="informacoes">
        <Card>
          <CardHeader>
            <CardTitle>Informações Básicas</CardTitle>
            <CardDescription>Defina as informações básicas da escala de trabalho.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome da Escala</Label>
              <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={3}
                placeholder="Descreva os detalhes da escala"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Escala</Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger id="tipo">
                  <SelectValue placeholder="Selecione o tipo de escala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PADRAO">Padrão (Dias fixos)</SelectItem>
                  <SelectItem value="ALTERNADA">Alternada (Rodízio)</SelectItem>
                  <SelectItem value="PLANTAO">Plantão</SelectItem>
                  <SelectItem value="PERSONALIZADA">Personalizada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Cor da Escala</Label>
              <div className="grid grid-cols-4 gap-2">
                {cores.map((corOpcao) => (
                  <div
                    key={corOpcao.id}
                    className={`h-10 rounded-md cursor-pointer flex items-center justify-center ${
                      cor === corOpcao.id ? "ring-2 ring-primary ring-offset-2" : ""
                    } ${corOpcao.classe}`}
                    onClick={() => setCor(corOpcao.id)}
                  >
                    {cor === corOpcao.id && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <div className="flex items-center space-x-2">
                <Switch id="ativa" checked={ativa} onCheckedChange={setAtiva} />
                <Label htmlFor="ativa" className="cursor-pointer">
                  {ativa ? "Escala ativa" : "Escala inativa"}
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSalvar}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="horarios">
        <Card>
          <CardHeader>
            <CardTitle>Horários</CardTitle>
            <CardDescription>Configure os horários e dias de trabalho da escala.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label>Dias da Semana</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {diasSemana.map((dia) => (
                  <div key={dia.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`dia-${dia.id}`}
                      checked={diasSelecionados.includes(dia.id)}
                      onCheckedChange={() => handleDiaChange(dia.id)}
                    />
                    <Label htmlFor={`dia-${dia.id}`} className="cursor-pointer">
                      {dia.nome}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="horaInicio">Hora de Início</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="horaInicio"
                    type="time"
                    value={horaInicio}
                    onChange={(e) => setHoraInicio(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="horaFim">Hora de Término</Label>
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                  <Input id="horaFim" type="time" value={horaFim} onChange={(e) => setHoraFim(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="intervalo">Intervalo (minutos)</Label>
              <Input
                id="intervalo"
                type="number"
                min="0"
                max="240"
                value={intervalo}
                onChange={(e) => setIntervalo(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">Tempo de intervalo/almoço durante o expediente.</p>
            </div>

            <div className="bg-muted p-4 rounded-md">
              <div className="flex items-center mb-2">
                <Calendar className="mr-2 h-5 w-5 text-muted-foreground" />
                <h3 className="font-medium">Carga Horária Calculada</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Diária</p>
                  <p className="text-xl font-bold">{diaria}h</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Semanal</p>
                  <p className="text-xl font-bold">{semanal}h</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSalvar}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>

      <TabsContent value="configuracoes">
        <Card>
          <CardHeader>
            <CardTitle>Configurações Adicionais</CardTitle>
            <CardDescription>Configure tolerâncias e regras de hora extra.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="toleranciaEntrada">Tolerância de Entrada (minutos)</Label>
                <Input
                  id="toleranciaEntrada"
                  type="number"
                  min="0"
                  max="60"
                  value={toleranciaEntrada}
                  onChange={(e) => setToleranciaEntrada(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Tempo de tolerância para registro de entrada.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="toleranciaSaida">Tolerância de Saída (minutos)</Label>
                <Input
                  id="toleranciaSaida"
                  type="number"
                  min="0"
                  max="60"
                  value={toleranciaSaida}
                  onChange={(e) => setToleranciaSaida(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Tempo de tolerância para registro de saída.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="permiteHoraExtra" checked={permiteHoraExtra} onCheckedChange={setPermiteHoraExtra} />
                <Label htmlFor="permiteHoraExtra" className="cursor-pointer">
                  Permitir Hora Extra
                </Label>
              </div>

              {permiteHoraExtra && (
                <div className="space-y-2 pl-6">
                  <Label htmlFor="limiteHoraExtra">Limite de Hora Extra Diário (horas)</Label>
                  <Input
                    id="limiteHoraExtra"
                    type="number"
                    min="0"
                    max="8"
                    step="0.5"
                    value={limiteHoraExtra}
                    onChange={(e) => setLimiteHoraExtra(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Máximo de horas extras permitidas por dia. Zero significa sem limite.
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Funcionários Atribuídos</Label>
              <div className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium flex items-center">
                    <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                    Funcionários com esta escala
                  </h4>
                  <Badge variant="outline">{5} funcionários</Badge>
                </div>
                <Button variant="outline" className="w-full">
                  Gerenciar Atribuições
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSalvar}>
              <Save className="mr-2 h-4 w-4" />
              Salvar Alterações
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
