"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

interface NovoUsuarioFormProps {
  onClose: () => void
}

export default function NovoUsuarioForm({ onClose }: NovoUsuarioFormProps) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [telefone, setTelefone] = useState("")
  const [dataContratacao, setDataContratacao] = useState("")
  const [cargo, setCargo] = useState("")
  const [setor, setSetor] = useState("")
  const [permissoes, setPermissoes] = useState<string[]>([])
  const [salario, setSalario] = useState("")
  const [escala, setEscala] = useState("")
  const [horasSemanais, setHorasSemanais] = useState("40")

  const handlePermissaoChange = (permissao: string) => {
    if (permissoes.includes(permissao)) {
      setPermissoes(permissoes.filter((p) => p !== permissao))
    } else {
      setPermissoes([...permissoes, permissao])
    }
  }

  const handleSubmit = () => {
    // Validação básica
    if (!nome || !email || !senha || !confirmarSenha || !cargo || !setor) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return
    }

    if (senha !== confirmarSenha) {
      toast({
        title: "Senhas não conferem",
        description: "A senha e a confirmação de senha devem ser iguais.",
        variant: "destructive",
      })
      return
    }

    // Aqui seria feita a chamada à API para criar o usuário
    console.log("Criando usuário:", {
      nome,
      email,
      senha,
      telefone,
      data_contratacao: dataContratacao,
      cargo,
      setor,
      permissoes,
      salario: Number.parseFloat(salario),
      escala,
      horas_semanais: Number.parseInt(horasSemanais),
    })

    toast({
      title: "Usuário criado",
      description: "O usuário foi criado com sucesso.",
    })

    onClose()
  }

  return (
    <Tabs defaultValue="informacoes">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="informacoes">Informações</TabsTrigger>
        <TabsTrigger value="trabalho">Trabalho</TabsTrigger>
        <TabsTrigger value="acesso">Acesso</TabsTrigger>
        <TabsTrigger value="permissoes">Permissões</TabsTrigger>
      </TabsList>

      <TabsContent value="informacoes" className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo*</Label>
            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do usuário" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail*</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@empresa.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dataContratacao">Data de Contratação</Label>
            <Input
              id="dataContratacao"
              type="date"
              value={dataContratacao}
              onChange={(e) => setDataContratacao(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="cargo">Cargo*</Label>
            <Select value={cargo} onValueChange={setCargo}>
              <SelectTrigger id="cargo">
                <SelectValue placeholder="Selecione um cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="analista">Analista</SelectItem>
                <SelectItem value="desenvolvedor">Desenvolvedor</SelectItem>
                <SelectItem value="gerente">Gerente</SelectItem>
                <SelectItem value="diretor">Diretor</SelectItem>
                <SelectItem value="suporte">Suporte</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="setor">Setor*</Label>
            <Select value={setor} onValueChange={setSetor}>
              <SelectTrigger id="setor">
                <SelectValue placeholder="Selecione um setor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ti">TI</SelectItem>
                <SelectItem value="rh">RH</SelectItem>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="vendas">Vendas</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="trabalho" className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="salario">Salário (R$)*</Label>
            <Input
              id="salario"
              type="number"
              min="0"
              step="0.01"
              value={salario}
              onChange={(e) => setSalario(e.target.value)}
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="horasSemanais">Horas Semanais*</Label>
            <Select value={horasSemanais} onValueChange={setHorasSemanais}>
              <SelectTrigger id="horasSemanais">
                <SelectValue placeholder="Selecione as horas semanais" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="20">20 horas</SelectItem>
                <SelectItem value="30">30 horas</SelectItem>
                <SelectItem value="40">40 horas</SelectItem>
                <SelectItem value="44">44 horas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="escala">Escala de Trabalho*</Label>
            <Select value={escala} onValueChange={setEscala}>
              <SelectTrigger id="escala">
                <SelectValue placeholder="Selecione uma escala" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="padrao">Padrão (Segunda a Sexta, 8h às 17h)</SelectItem>
                <SelectItem value="6x1">6x1 (Folga aos domingos)</SelectItem>
                <SelectItem value="12x36">12x36 (12 horas de trabalho, 36 de descanso)</SelectItem>
                <SelectItem value="5x2">5x2 (Folga sábado e domingo)</SelectItem>
                <SelectItem value="4x3">4x3 (4 dias de trabalho, 3 de folga)</SelectItem>
                <SelectItem value="escala-personalizada">Escala Personalizada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {escala === "escala-personalizada" && (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="descricaoEscala">Descrição da Escala Personalizada</Label>
              <Input id="descricaoEscala" placeholder="Descreva a escala personalizada" />
              <p className="text-xs text-muted-foreground">
                Descreva detalhadamente a escala personalizada, incluindo dias e horários de trabalho.
              </p>
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="acesso" className="space-y-4 py-4">
        <div className="space-y-2">
          <Label htmlFor="senha">Senha*</Label>
          <Input
            id="senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite a senha"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmarSenha">Confirmar Senha*</Label>
          <Input
            id="confirmarSenha"
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            placeholder="Confirme a senha"
          />
        </div>
      </TabsContent>

      <TabsContent value="permissoes" className="space-y-4 py-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="ponto"
              checked={permissoes.includes("ponto")}
              onCheckedChange={() => handlePermissaoChange("ponto")}
            />
            <Label htmlFor="ponto">Gerenciar Ponto</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="usuarios"
              checked={permissoes.includes("usuarios")}
              onCheckedChange={() => handlePermissaoChange("usuarios")}
            />
            <Label htmlFor="usuarios">Gerenciar Usuários</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="escalas"
              checked={permissoes.includes("escalas")}
              onCheckedChange={() => handlePermissaoChange("escalas")}
            />
            <Label htmlFor="escalas">Gerenciar Escalas</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="folgas"
              checked={permissoes.includes("folgas")}
              onCheckedChange={() => handlePermissaoChange("folgas")}
            />
            <Label htmlFor="folgas">Aprovar Folgas e Férias</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="relatorios"
              checked={permissoes.includes("relatorios")}
              onCheckedChange={() => handlePermissaoChange("relatorios")}
            />
            <Label htmlFor="relatorios">Gerar Relatórios</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="admin"
              checked={permissoes.includes("admin")}
              onCheckedChange={() => handlePermissaoChange("admin")}
            />
            <Label htmlFor="admin">Administrador do Sistema</Label>
          </div>
        </div>
      </TabsContent>

      <DialogFooter className="mt-6">
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Criar Usuário</Button>
      </DialogFooter>
    </Tabs>
  )
}
