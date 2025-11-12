"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Edit3, Clock } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useToast } from "@/hooks/use-toast"

// Dados dos gestores disponíveis
const gestoresDisponiveis = [
  { id: 1, nome: "Mariana Costa", cargo: "Supervisora", setor: "Desenvolvimento" },
  { id: 2, nome: "Carlos Mendes", cargo: "Gerente de Projetos", setor: "TI" },
  { id: 3, nome: "Rafael Santos", cargo: "Coordenador", setor: "Operações" },
  { id: 4, nome: "Ana Silva", cargo: "Gerente de RH", setor: "Recursos Humanos" },
]

interface SolicitarCorrecaoModalProps {
  registroOriginal?: {
    data: string
    registros: Array<{
      tipo: string
      horario: string
      localizacao: string
    }>
  }
}

export function SolicitarCorrecaoModal({ registroOriginal }: SolicitarCorrecaoModalProps) {
  const [open, setOpen] = useState(false)
  const [dataSelecionada, setDataSelecionada] = useState<Date | undefined>(
    registroOriginal ? new Date(registroOriginal.data) : undefined,
  )
  const [gestorSelecionado, setGestorSelecionado] = useState("")
  const [justificativa, setJustificativa] = useState("")
  const [horariosCorrecao, setHorariosCorrecao] = useState({
    entrada: registroOriginal?.registros.find((r) => r.tipo === "ENTRADA")?.horario || "",
    saidaAlmoco: registroOriginal?.registros.find((r) => r.tipo === "SAIDA_ALMOCO")?.horario || "",
    retornoAlmoco: registroOriginal?.registros.find((r) => r.tipo === "RETORNO_ALMOCO")?.horario || "",
    saida: registroOriginal?.registros.find((r) => r.tipo === "SAIDA")?.horario || "",
  })
  const [tipoCorrecao, setTipoCorrecao] = useState("horarios") // horarios, falta, adicionar

  const { toast } = useToast()

  const handleSubmit = () => {
    if (!dataSelecionada || !gestorSelecionado || !justificativa.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    // Aqui seria feita a chamada à API para criar a solicitação
    const solicitacao = {
      data: format(dataSelecionada, "yyyy-MM-dd"),
      gestorId: gestorSelecionado,
      tipoCorrecao,
      horariosOriginais: registroOriginal?.registros || [],
      horariosCorrigidos: horariosCorrecao,
      justificativa,
      status: "PENDENTE",
      dataSolicitacao: new Date(),
    }

    console.log("Solicitação de correção:", solicitacao)

    toast({
      title: "Solicitação enviada",
      description: "Sua solicitação de correção foi enviada para aprovação.",
    })

    // Resetar formulário e fechar modal
    setOpen(false)
    setJustificativa("")
    setGestorSelecionado("")
    setHorariosCorrecao({
      entrada: "",
      saidaAlmoco: "",
      retornoAlmoco: "",
      saida: "",
    })
  }

  const gestorSelecionadoInfo = gestoresDisponiveis.find((g) => g.id.toString() === gestorSelecionado)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit3 className="h-4 w-4 mr-2" />
          Solicitar Correção
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Solicitar Correção de Ponto
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Seleção de Data */}
          <div className="space-y-2">
            <Label>Data para Correção *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataSelecionada ? format(dataSelecionada, "dd/MM/yyyy", { locale: ptBR }) : "Selecione a data"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataSelecionada}
                  onSelect={setDataSelecionada}
                  disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Tipo de Correção */}
          <div className="space-y-2">
            <Label>Tipo de Correção *</Label>
            <Select value={tipoCorrecao} onValueChange={setTipoCorrecao}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="horarios">Correção de Horários</SelectItem>
                <SelectItem value="falta">Justificar Falta</SelectItem>
                <SelectItem value="adicionar">Adicionar Registro Esquecido</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Horários de Correção */}
          {tipoCorrecao === "horarios" && (
            <div className="space-y-4">
              <Label className="text-base font-medium">Horários para Correção</Label>

              {registroOriginal && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Registros Originais
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {registroOriginal.registros.map((reg, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{reg.tipo.replace("_", " ")}:</span>
                        <span className="font-mono">{reg.horario}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="entrada">Entrada</Label>
                  <Input
                    id="entrada"
                    type="time"
                    value={horariosCorrecao.entrada}
                    onChange={(e) => setHorariosCorrecao((prev) => ({ ...prev, entrada: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saidaAlmoco">Saída Almoço</Label>
                  <Input
                    id="saidaAlmoco"
                    type="time"
                    value={horariosCorrecao.saidaAlmoco}
                    onChange={(e) => setHorariosCorrecao((prev) => ({ ...prev, saidaAlmoco: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="retornoAlmoco">Retorno Almoço</Label>
                  <Input
                    id="retornoAlmoco"
                    type="time"
                    value={horariosCorrecao.retornoAlmoco}
                    onChange={(e) => setHorariosCorrecao((prev) => ({ ...prev, retornoAlmoco: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="saida">Saída</Label>
                  <Input
                    id="saida"
                    type="time"
                    value={horariosCorrecao.saida}
                    onChange={(e) => setHorariosCorrecao((prev) => ({ ...prev, saida: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Seleção de Gestor */}
          <div className="space-y-2">
            <Label>Gestor Responsável *</Label>
            <Select value={gestorSelecionado} onValueChange={setGestorSelecionado}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o gestor para aprovação" />
              </SelectTrigger>
              <SelectContent>
                {gestoresDisponiveis.map((gestor) => (
                  <SelectItem key={gestor.id} value={gestor.id.toString()}>
                    <div className="flex flex-col">
                      <span>{gestor.nome}</span>
                      <span className="text-xs text-muted-foreground">
                        {gestor.cargo} - {gestor.setor}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {gestorSelecionadoInfo && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{gestorSelecionadoInfo.cargo}</Badge>
                  <span className="text-sm">{gestorSelecionadoInfo.nome}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Setor: {gestorSelecionadoInfo.setor}</p>
              </div>
            )}
          </div>

          {/* Justificativa */}
          <div className="space-y-2">
            <Label htmlFor="justificativa">Justificativa *</Label>
            <Textarea
              id="justificativa"
              placeholder="Explique o motivo da correção solicitada..."
              value={justificativa}
              onChange={(e) => setJustificativa(e.target.value)}
              rows={4}
              className="resize-none"
            />
            <p className="text-xs text-muted-foreground">{justificativa.length}/500 caracteres</p>
          </div>

          {/* Resumo da Solicitação */}
          {dataSelecionada && gestorSelecionado && justificativa && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Resumo da Solicitação</h4>
              <div className="space-y-1 text-sm text-green-700">
                <p>
                  <strong>Data:</strong> {format(dataSelecionada, "dd/MM/yyyy", { locale: ptBR })}
                </p>
                <p>
                  <strong>Tipo:</strong>{" "}
                  {tipoCorrecao === "horarios"
                    ? "Correção de Horários"
                    : tipoCorrecao === "falta"
                      ? "Justificar Falta"
                      : "Adicionar Registro"}
                </p>
                <p>
                  <strong>Gestor:</strong> {gestorSelecionadoInfo?.nome}
                </p>
                <p>
                  <strong>Status:</strong> Aguardando aprovação
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Enviar Solicitação</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
