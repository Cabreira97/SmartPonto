"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"

interface Cargo {
  id: string
  nome: string
  descricao: string
  nivel: "junior" | "pleno" | "senior" | "coordenador" | "gerente" | "diretor"
  salarioBase: number
  ativo: boolean
  permissoes: string[]
  funcionarios: number
  criadoEm: string
  atualizadoEm: string
}

interface NovoCargoFormProps {
  cargo?: Cargo | null
  onSalvar: (cargo: Partial<Cargo>) => void
  onCancelar: () => void
}

const permissoesDisponiveis = [
  {
    categoria: "Dashboard",
    permissoes: [{ id: "visualizar_dashboard", nome: "Visualizar Dashboard", descricao: "Acesso à tela principal" }],
  },
  {
    categoria: "Ponto Eletrônico",
    permissoes: [
      { id: "registrar_ponto", nome: "Registrar Ponto", descricao: "Bater ponto de entrada/saída" },
      { id: "visualizar_historico_ponto", nome: "Ver Histórico de Ponto", descricao: "Visualizar próprio histórico" },
      { id: "corrigir_ponto", nome: "Solicitar Correção de Ponto", descricao: "Solicitar correções no ponto" },
      { id: "aprovar_correcao_ponto", nome: "Aprovar Correção de Ponto", descricao: "Aprovar correções solicitadas" },
    ],
  },
  {
    categoria: "Usuários",
    permissoes: [
      { id: "visualizar_usuarios", nome: "Visualizar Usuários", descricao: "Ver lista de usuários" },
      { id: "gerenciar_usuarios", nome: "Gerenciar Usuários", descricao: "Criar, editar e excluir usuários" },
      { id: "redefinir_senhas", nome: "Redefinir Senhas", descricao: "Alterar senhas de usuários" },
    ],
  },
  {
    categoria: "Setores",
    permissoes: [
      { id: "visualizar_setores", nome: "Visualizar Setores", descricao: "Ver lista de setores" },
      { id: "gerenciar_setores", nome: "Gerenciar Setores", descricao: "Criar, editar e excluir setores" },
    ],
  },
  {
    categoria: "Escalas de Trabalho",
    permissoes: [
      { id: "visualizar_escalas", nome: "Visualizar Escalas", descricao: "Ver escalas de trabalho" },
      { id: "gerenciar_escalas", nome: "Gerenciar Escalas", descricao: "Criar e editar escalas" },
      { id: "atribuir_escalas", nome: "Atribuir Escalas", descricao: "Atribuir escalas aos funcionários" },
    ],
  },
  {
    categoria: "Folgas e Férias",
    permissoes: [
      { id: "solicitar_folga", nome: "Solicitar Folga/Férias", descricao: "Criar solicitações próprias" },
      { id: "visualizar_folgas", nome: "Visualizar Folgas/Férias", descricao: "Ver solicitações da equipe" },
      { id: "aprovar_folgas", nome: "Aprovar Folgas/Férias", descricao: "Aprovar/rejeitar solicitações" },
      { id: "gerenciar_folgas_ferias", nome: "Gerenciar Folgas/Férias", descricao: "Controle total do módulo" },
    ],
  },
  {
    categoria: "Horas Extras",
    permissoes: [
      { id: "solicitar_horas_extras", nome: "Solicitar Horas Extras", descricao: "Solicitar horas extras" },
      { id: "aprovar_horas_extras", nome: "Aprovar Horas Extras", descricao: "Aprovar solicitações de horas extras" },
    ],
  },
  {
    categoria: "Relatórios",
    permissoes: [
      { id: "visualizar_relatorios", nome: "Visualizar Relatórios", descricao: "Acesso aos relatórios básicos" },
      { id: "gerar_relatorios_avancados", nome: "Relatórios Avançados", descricao: "Gerar relatórios detalhados" },
      { id: "exportar_relatorios", nome: "Exportar Relatórios", descricao: "Exportar dados em PDF/Excel" },
    ],
  },
  {
    categoria: "Configurações",
    permissoes: [
      { id: "visualizar_configuracoes", nome: "Ver Configurações", descricao: "Acessar configurações pessoais" },
      {
        id: "gerenciar_configuracoes_sistema",
        nome: "Configurações do Sistema",
        descricao: "Alterar configurações globais",
      },
    ],
  },
  {
    categoria: "Cargos e Permissões",
    permissoes: [
      { id: "visualizar_cargos", nome: "Visualizar Cargos", descricao: "Ver lista de cargos" },
      { id: "gerenciar_cargos", nome: "Gerenciar Cargos", descricao: "Criar, editar e excluir cargos" },
      { id: "gerenciar_permissoes", nome: "Gerenciar Permissões", descricao: "Definir permissões dos cargos" },
    ],
  },
]

export default function NovoCargoForm({ cargo, onSalvar, onCancelar }: NovoCargoFormProps) {
  const [nome, setNome] = useState("")
  const [descricao, setDescricao] = useState("")
  const [nivel, setNivel] = useState<"junior" | "pleno" | "senior" | "coordenador" | "gerente" | "diretor">("junior")
  const [salarioBase, setSalarioBase] = useState("")
  const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<string[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (cargo) {
      setNome(cargo.nome)
      setDescricao(cargo.descricao)
      setNivel(cargo.nivel)
      setSalarioBase(cargo.salarioBase.toString())
      setPermissoesSelecionadas(cargo.permissoes)
    }
  }, [cargo])

  const handlePermissaoChange = (permissaoId: string, checked: boolean) => {
    if (checked) {
      setPermissoesSelecionadas((prev) => [...prev, permissaoId])
    } else {
      setPermissoesSelecionadas((prev) => prev.filter((id) => id !== permissaoId))
    }
  }

  const handleSelecionarTodasCategoria = (categoria: string, selecionar: boolean) => {
    const permissoesCategoria =
      permissoesDisponiveis.find((cat) => cat.categoria === categoria)?.permissoes.map((p) => p.id) || []

    if (selecionar) {
      setPermissoesSelecionadas((prev) => [
        ...prev.filter((id) => !permissoesCategoria.includes(id)),
        ...permissoesCategoria,
      ])
    } else {
      setPermissoesSelecionadas((prev) => prev.filter((id) => !permissoesCategoria.includes(id)))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nome.trim()) {
      toast({
        title: "Erro",
        description: "O nome do cargo é obrigatório.",
        variant: "destructive",
      })
      return
    }

    if (!descricao.trim()) {
      toast({
        title: "Erro",
        description: "A descrição do cargo é obrigatória.",
        variant: "destructive",
      })
      return
    }

    if (!salarioBase || Number.parseFloat(salarioBase) <= 0) {
      toast({
        title: "Erro",
        description: "O salário base deve ser maior que zero.",
        variant: "destructive",
      })
      return
    }

    if (permissoesSelecionadas.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma permissão para o cargo.",
        variant: "destructive",
      })
      return
    }

    onSalvar({
      nome: nome.trim(),
      descricao: descricao.trim(),
      nivel,
      salarioBase: Number.parseFloat(salarioBase),
      permissoes: permissoesSelecionadas,
    })

    toast({
      title: "Sucesso",
      description: `Cargo ${cargo ? "atualizado" : "criado"} com sucesso!`,
    })
  }

  const getNivelColor = (nivelValue: string) => {
    switch (nivelValue) {
      case "junior":
        return "bg-green-100 text-green-800"
      case "pleno":
        return "bg-blue-100 text-blue-800"
      case "senior":
        return "bg-purple-100 text-purple-800"
      case "coordenador":
        return "bg-orange-100 text-orange-800"
      case "gerente":
        return "bg-red-100 text-red-800"
      case "diretor":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="nome">Nome do Cargo *</Label>
            <Input
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Desenvolvedor Frontend"
              required
            />
          </div>

          <div>
            <Label htmlFor="nivel">Nível Hierárquico *</Label>
            <Select value={nivel} onValueChange={(value: any) => setNivel(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Júnior</SelectItem>
                <SelectItem value="pleno">Pleno</SelectItem>
                <SelectItem value="senior">Sênior</SelectItem>
                <SelectItem value="coordenador">Coordenador</SelectItem>
                <SelectItem value="gerente">Gerente</SelectItem>
                <SelectItem value="diretor">Diretor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="salario">Salário Base (R$) *</Label>
            <Input
              id="salario"
              type="number"
              step="0.01"
              min="0"
              value={salarioBase}
              onChange={(e) => setSalarioBase(e.target.value)}
              placeholder="0,00"
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="descricao">Descrição *</Label>
          <Textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Descreva as responsabilidades e atribuições do cargo..."
            className="min-h-[120px]"
            required
          />
        </div>
      </div>

      <Separator />

      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Permissões do Cargo</h3>
            <p className="text-sm text-muted-foreground">Selecione as permissões que este cargo terá no sistema</p>
          </div>
          <Badge variant="outline" className={getNivelColor(nivel)}>
            {permissoesSelecionadas.length} permissões selecionadas
          </Badge>
        </div>

        <div className="space-y-6">
          {permissoesDisponiveis.map((categoria) => {
            const permissoesCategoria = categoria.permissoes.map((p) => p.id)
            const todasSelecionadas = permissoesCategoria.every((id) => permissoesSelecionadas.includes(id))
            const algumasSelecionadas = permissoesCategoria.some((id) => permissoesSelecionadas.includes(id))

            return (
              <Card key={categoria.categoria}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{categoria.categoria}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`categoria-${categoria.categoria}`}
                        checked={todasSelecionadas}
                        onCheckedChange={(checked) => handleSelecionarTodasCategoria(categoria.categoria, !!checked)}
                      />
                      <Label htmlFor={`categoria-${categoria.categoria}`} className="text-sm font-normal">
                        {todasSelecionadas ? "Desmarcar todas" : "Selecionar todas"}
                      </Label>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {categoria.permissoes.map((permissao) => (
                      <div key={permissao.id} className="flex items-start space-x-2">
                        <Checkbox
                          id={permissao.id}
                          checked={permissoesSelecionadas.includes(permissao.id)}
                          onCheckedChange={(checked) => handlePermissaoChange(permissao.id, !!checked)}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor={permissao.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {permissao.nome}
                          </Label>
                          <p className="text-xs text-muted-foreground">{permissao.descricao}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancelar}>
          Cancelar
        </Button>
        <Button type="submit">{cargo ? "Atualizar Cargo" : "Criar Cargo"}</Button>
      </div>
    </form>
  )
}
