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

interface Usuario {
  id: number
  nome: string
  email: string
  telefone: string
  cargo: string
  setor: string
  data_contratacao: string
  ativo: boolean
}

interface EditarUsuarioFormProps {
  usuario: Usuario
  onClose: () => void
}

export default function EditarUsuarioForm({ usuario, onClose }: EditarUsuarioFormProps) {
  const [nome, setNome] = useState(usuario.nome)
  const [email, setEmail] = useState(usuario.email)
  const [telefone, setTelefone] = useState(usuario.telefone)
  const [dataContratacao, setDataContratacao] = useState(usuario.data_contratacao)
  const [cargo, setCargo] = useState(usuario.cargo.toLowerCase())
  const [setor, setSetor] = useState(usuario.setor.toLowerCase())
  const [permissoes, setPermissoes] = useState<string[]>(["ponto", "relatorios"]) // Simulando permissões iniciais

  const handlePermissaoChange = (permissao: string) => {
    if (permissoes.includes(permissao)) {
      setPermissoes(permissoes.filter((p) => p !== permissao))
    } else {
      setPermissoes([...permissoes, permissao])
    }
  }

  const handleSubmit = () => {
    // Aqui seria feita a chamada à API para atualizar o usuário
    console.log("Atualizando usuário:", {
      id: usuario.id,
      nome,
      email,
      telefone,
      data_contratacao: dataContratacao,
      cargo,
      setor,
      permissoes,
    })

    toast({
      title: "Usuário atualizado",
      description: `As informações de ${nome} foram atualizadas com sucesso.`,
    })

    onClose()
  }

  return (
    <Tabs defaultValue="informacoes">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="informacoes">Informações</TabsTrigger>
        <TabsTrigger value="permissoes">Permissões</TabsTrigger>
      </TabsList>

      <TabsContent value="informacoes" className="space-y-4 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo</Label>
            <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome do usuário" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
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
            <Label htmlFor="cargo">Cargo</Label>
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
            <Label htmlFor="setor">Setor</Label>
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
        <Button onClick={handleSubmit}>Salvar Alterações</Button>
      </DialogFooter>
    </Tabs>
  )
}
