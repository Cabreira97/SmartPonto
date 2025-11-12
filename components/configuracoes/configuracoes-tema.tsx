"use client"

import { useState } from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ConfiguracoesTema() {
  const [tema, setTema] = useState("sistema")
  const [corPrimaria, setCorPrimaria] = useState("blue")
  const [tamanhoFonte, setTamanhoFonte] = useState(16)
  const [animacoesReduzidas, setAnimacoesReduzidas] = useState(false)
  const [altoContraste, setAltoContraste] = useState(false)

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Tema</Label>
        <RadioGroup value={tema} onValueChange={setTema} className="flex flex-col space-y-3">
          <div className="flex items-center space-x-3 rounded-md border p-4">
            <RadioGroupItem value="claro" id="tema-claro" />
            <Label htmlFor="tema-claro" className="flex flex-1 items-center">
              <Sun className="mr-2 h-5 w-5" />
              <span>Claro</span>
            </Label>
          </div>
          <div className="flex items-center space-x-3 rounded-md border p-4">
            <RadioGroupItem value="escuro" id="tema-escuro" />
            <Label htmlFor="tema-escuro" className="flex flex-1 items-center">
              <Moon className="mr-2 h-5 w-5" />
              <span>Escuro</span>
            </Label>
          </div>
          <div className="flex items-center space-x-3 rounded-md border p-4">
            <RadioGroupItem value="sistema" id="tema-sistema" />
            <Label htmlFor="tema-sistema" className="flex flex-1 items-center">
              <Monitor className="mr-2 h-5 w-5" />
              <span>Usar configuração do sistema</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label htmlFor="corPrimaria">Cor Primária</Label>
        <Select value={corPrimaria} onValueChange={setCorPrimaria}>
          <SelectTrigger id="corPrimaria">
            <SelectValue placeholder="Selecione a cor primária" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="blue">Azul</SelectItem>
            <SelectItem value="green">Verde</SelectItem>
            <SelectItem value="red">Vermelho</SelectItem>
            <SelectItem value="purple">Roxo</SelectItem>
            <SelectItem value="orange">Laranja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="tamanhoFonte">Tamanho da Fonte: {tamanhoFonte}px</Label>
        </div>
        <Slider
          id="tamanhoFonte"
          min={12}
          max={24}
          step={1}
          value={[tamanhoFonte]}
          onValueChange={(value) => setTamanhoFonte(value[0])}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Pequeno</span>
          <span>Médio</span>
          <span>Grande</span>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Acessibilidade</Label>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="animacoesReduzidas">Reduzir Animações</Label>
            <p className="text-xs text-muted-foreground">Reduz ou remove animações e efeitos visuais</p>
          </div>
          <Switch id="animacoesReduzidas" checked={animacoesReduzidas} onCheckedChange={setAnimacoesReduzidas} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="altoContraste">Alto Contraste</Label>
            <p className="text-xs text-muted-foreground">
              Aumenta o contraste entre elementos para melhor visibilidade
            </p>
          </div>
          <Switch id="altoContraste" checked={altoContraste} onCheckedChange={setAltoContraste} />
        </div>
      </div>
    </div>
  )
}
