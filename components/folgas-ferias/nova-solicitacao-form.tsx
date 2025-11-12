"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { addDays, format } from "date-fns"
import { Separator } from "@/components/ui/separator"

interface NovaSolicitacaoFormProps {
  onClose: () => void
}

export default function NovaSolicitacaoForm({ onClose }: NovaSolicitacaoFormProps) {
  const [tipo, setTipo] = useState<"FERIAS" | "FOLGA" | "LICENCA">("FOLGA")
  const [dataInicio, setDataInicio] = useState("")
  const [dataFim, setDataFim] = useState("")
  const [justificativa, setJustificativa] = useState("")
  const [periodoIntegral, setPeriodoIntegral] = useState("true")
  const [mensagemAusencia, setMensagemAusencia] = useState("")
  const [contatoEmergencia, setContatoEmergencia] = useState("")

  // Calcula a data mínima (hoje) e máxima (6 meses a partir de hoje) para o datepicker
  const hoje = new Date()
  const dataMinima = format(hoje, "yyyy-MM-dd")
  const dataMaxima = format(addDays(hoje, 180), "yyyy-MM-dd")

  // Atualiza a data de fim quando a data de início muda
  const handleDataInicioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novaDataInicio = e.target.value
    setDataInicio(novaDataInicio)

    // Se for férias, define a data de fim como 30 dias após a data de início
    if (tipo === "FERIAS" && novaDataInicio) {
      const dataInicioObj = new Date(novaDataInicio)
      const novaDataFim = format(addDays(dataInicioObj, tipo === "FERIAS" ? 29 : 0), "yyyy-MM-dd")
      setDataFim(novaDataFim)
    } else if (tipo === "FOLGA" && novaDataInicio) {
      // Se for folga, define a data de fim igual à data de início
      setDataFim(novaDataInicio)
    }
  }

  const handleSubmit = () => {
    // Aqui seria feita a chamada à API para criar a solicitação
    console.log("Criando solicitação:", {
      tipo,
      data_inicio: dataInicio,
      data_fim: dataFim,
      justificativa,
      periodo_integral: periodoIntegral === "true",
      mensagem_ausencia: mensagemAusencia,
      contato_emergencia: contatoEmergencia,
    })

    onClose()
  }

  return (
    <form className="space-y-6 py-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Tipo de Solicitação</Label>
          <Select
            value={tipo}
            onValueChange={(value: "FERIAS" | "FOLGA" | "LICENCA") => {
              setTipo(value)
              // Resetar datas ao mudar o tipo
              setDataInicio("")
              setDataFim("")
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="FOLGA">Folga</SelectItem>
              <SelectItem value="FERIAS">Férias</SelectItem>
              <SelectItem value="LICENCA">Licença</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="dataInicio">Data de Início</Label>
            <Input
              id="dataInicio"
              type="date"
              min={dataMinima}
              max={dataMaxima}
              value={dataInicio}
              onChange={handleDataInicioChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataFim">Data de Fim</Label>
            <Input
              id="dataFim"
              type="date"
              min={dataInicio || dataMinima}
              max={dataMaxima}
              value={dataFim}
              onChange={(e) => setDataFim(e.target.value)}
              disabled={tipo === "FOLGA" && periodoIntegral === "true"}
            />
          </div>
        </div>

        {tipo === "FOLGA" && (
          <div className="space-y-2">
            <Label>Período</Label>
            <RadioGroup value={periodoIntegral} onValueChange={setPeriodoIntegral}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="periodoIntegral" />
                <Label htmlFor="periodoIntegral">Dia inteiro</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="periodoParcial" />
                <Label htmlFor="periodoParcial">Período específico</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="justificativa">Justificativa</Label>
          <Textarea
            id="justificativa"
            placeholder="Descreva o motivo da solicitação"
            value={justificativa}
            onChange={(e) => setJustificativa(e.target.value)}
          />
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="mensagemAusencia">Mensagem de Ausência (opcional)</Label>
          <Textarea
            id="mensagemAusencia"
            placeholder="Deixe uma mensagem para seus colegas durante sua ausência"
            value={mensagemAusencia}
            onChange={(e) => setMensagemAusencia(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Esta mensagem será exibida para outros funcionários quando consultarem seu status de disponibilidade.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contatoEmergencia">Contato para Emergências (opcional)</Label>
          <Input
            id="contatoEmergencia"
            placeholder="Ex: João Silva (joao.silva@empresa.com)"
            value={contatoEmergencia}
            onChange={(e) => setContatoEmergencia(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Indique um colega que possa ser contatado em caso de emergência durante sua ausência.
          </p>
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} disabled={!dataInicio || !dataFim}>
          Enviar Solicitação
        </Button>
      </DialogFooter>
    </form>
  )
}
