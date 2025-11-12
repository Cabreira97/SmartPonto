"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Phone,
  Briefcase,
  Building,
  Calendar,
  Clock,
  Shield,
  Bell,
  Lock,
  Upload,
  Edit,
  Save,
  AlertTriangle,
  CheckCircle,
  UserCog,
  FileText,
  Smartphone,
  MessageSquare,
  Laptop,
} from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import Link from "next/link"

// Dados simulados para demonstração
const dadosUsuario = {
  id: 1,
  nome: "Ana Silva",
  email: "ana.silva@empresa.com",
  telefone: "(11) 98765-4321",
  cargo: "Analista de TI",
  setor: "TI",
  data_contratacao: "2021-05-10",
  foto: "/placeholder.svg?height=200&width=200",
  bio: "Analista de TI com experiência em desenvolvimento web e gestão de projetos. Apaixonada por tecnologia e inovação.",
  endereco: {
    rua: "Rua das Flores, 123",
    bairro: "Jardim Primavera",
    cidade: "São Paulo",
    estado: "SP",
    cep: "01234-567",
  },
  contato_emergencia: {
    nome: "Carlos Silva",
    relacao: "Cônjuge",
    telefone: "(11) 98765-1234",
  },
  estatisticas: {
    dias_trabalhados_mes: 21,
    horas_trabalhadas_mes: 168,
    pontualidade: 95,
    folgas_disponiveis: 5,
    ferias_acumuladas: 30,
  },
  configuracoes: {
    notificacoes_email: true,
    notificacoes_app: true,
    notificacoes_desktop: false,
    autenticacao_dois_fatores: false,
    login_biometrico: true,
    tema: "sistema",
  },
  atividades_recentes: [
    {
      id: 1,
      tipo: "PONTO",
      descricao: "Registro de entrada",
      data: "2023-11-17T08:00:00",
    },
    {
      id: 2,
      tipo: "PONTO",
      descricao: "Registro de saída para almoço",
      data: "2023-11-17T12:00:00",
    },
    {
      id: 3,
      tipo: "PONTO",
      descricao: "Registro de retorno do almoço",
      data: "2023-11-17T13:00:00",
    },
    {
      id: 4,
      tipo: "SOLICITACAO",
      descricao: "Solicitação de folga aprovada",
      data: "2023-11-16T14:30:00",
    },
    {
      id: 5,
      tipo: "DAILY",
      descricao: "Daily registrada",
      data: "2023-11-16T09:15:00",
    },
  ],
}

export default function PerfilUsuario() {
  const [isEditingPerfil, setIsEditingPerfil] = useState(false)
  const [isEditingContato, setIsEditingContato] = useState(false)
  const [isEditingEmergencia, setIsEditingEmergencia] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isTwoFactorDialogOpen, setIsTwoFactorDialogOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")

  // Estados para edição de perfil
  const [nome, setNome] = useState(dadosUsuario.nome)
  const [email, setEmail] = useState(dadosUsuario.email)
  const [telefone, setTelefone] = useState(dadosUsuario.telefone)
  const [bio, setBio] = useState(dadosUsuario.bio)
  const [rua, setRua] = useState(dadosUsuario.endereco.rua)
  const [bairro, setBairro] = useState(dadosUsuario.endereco.bairro)
  const [cidade, setCidade] = useState(dadosUsuario.endereco.cidade)
  const [estado, setEstado] = useState(dadosUsuario.endereco.estado)
  const [cep, setCep] = useState(dadosUsuario.endereco.cep)
  const [contatoNome, setContatoNome] = useState(dadosUsuario.contato_emergencia.nome)
  const [contatoRelacao, setContatoRelacao] = useState(dadosUsuario.contato_emergencia.relacao)
  const [contatoTelefone, setContatoTelefone] = useState(dadosUsuario.contato_emergencia.telefone)

  // Estados para configurações
  const [notificacoesEmail, setNotificacoesEmail] = useState(dadosUsuario.configuracoes.notificacoes_email)
  const [notificacoesApp, setNotificacoesApp] = useState(dadosUsuario.configuracoes.notificacoes_app)
  const [notificacoesDesktop, setNotificacoesDesktop] = useState(dadosUsuario.configuracoes.notificacoes_desktop)
  const [loginBiometrico, setLoginBiometrico] = useState(dadosUsuario.configuracoes.login_biometrico)
  const [tema, setTema] = useState(dadosUsuario.configuracoes.tema)

  const handleSalvarPerfil = () => {
    // Aqui seria feita a chamada à API para salvar as alterações
    console.log("Salvando perfil:", {
      nome,
      email,
      telefone,
      bio,
    })

    toast({
      title: "Perfil atualizado",
      description: "Suas informações pessoais foram atualizadas com sucesso.",
    })

    setIsEditingPerfil(false)
  }

  const handleSalvarContato = () => {
    // Aqui seria feita a chamada à API para salvar as alterações
    console.log("Salvando endereço:", {
      rua,
      bairro,
      cidade,
      estado,
      cep,
    })

    toast({
      title: "Endereço atualizado",
      description: "Suas informações de endereço foram atualizadas com sucesso.",
    })

    setIsEditingContato(false)
  }

  const handleSalvarEmergencia = () => {
    // Aqui seria feita a chamada à API para salvar as alterações
    console.log("Salvando contato de emergência:", {
      nome: contatoNome,
      relacao: contatoRelacao,
      telefone: contatoTelefone,
    })

    toast({
      title: "Contato de emergência atualizado",
      description: "Suas informações de contato de emergência foram atualizadas com sucesso.",
    })

    setIsEditingEmergencia(false)
  }

  const handleSalvarConfiguracoes = () => {
    // Aqui seria feita a chamada à API para salvar as configurações
    console.log("Salvando configurações:", {
      notificacoes_email: notificacoesEmail,
      notificacoes_app: notificacoesApp,
      notificacoes_desktop: notificacoesDesktop,
      login_biometrico: loginBiometrico,
      tema,
    })

    toast({
      title: "Configurações salvas",
      description: "Suas preferências foram atualizadas com sucesso.",
    })
  }

  const handleAlterarSenha = () => {
    setPasswordError("")

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("Por favor, preencha todos os campos.")
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("As senhas não coincidem.")
      return
    }

    if (newPassword.length < 8) {
      setPasswordError("A nova senha deve ter pelo menos 8 caracteres.")
      return
    }

    // Aqui seria feita a chamada à API para alterar a senha
    console.log("Alterando senha")

    toast({
      title: "Senha alterada",
      description: "Sua senha foi alterada com sucesso.",
    })

    setIsPasswordDialogOpen(false)
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  const handleAtivarDoisFatores = () => {
    // Aqui seria feita a chamada à API para ativar a autenticação de dois fatores
    console.log("Ativando autenticação de dois fatores")

    toast({
      title: "Autenticação de dois fatores ativada",
      description: "Sua conta agora está mais segura com a verificação em duas etapas.",
    })

    setIsTwoFactorDialogOpen(false)
  }

  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleString()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarImage src={dadosUsuario.foto || "/placeholder.svg"} alt={dadosUsuario.nome} />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{dadosUsuario.nome}</h2>
                <Badge variant="outline" className="bg-primary/10 text-primary">
                  {dadosUsuario.cargo}
                </Badge>
              </div>
              <p className="text-muted-foreground">{dadosUsuario.email}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building className="h-4 w-4" />
                <span>{dadosUsuario.setor}</span>
                <span className="text-gray-300">•</span>
                <Calendar className="h-4 w-4" />
                <span>Desde {new Date(dadosUsuario.data_contratacao).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex gap-2 self-end md:self-center">
              <Button variant="outline" size="sm" onClick={() => setIsEditingPerfil(true)}>
                <Edit className="mr-2 h-4 w-4" />
                Editar Perfil
              </Button>
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" />
                Alterar Foto
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="informacoes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="informacoes">Informações Pessoais</TabsTrigger>
          <TabsTrigger value="atividades">Atividades Recentes</TabsTrigger>
          <TabsTrigger value="configuracoes">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="informacoes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5 text-primary" />
                  Informações Pessoais
                </CardTitle>
                <CardDescription>Seus dados pessoais e profissionais</CardDescription>
              </CardHeader>
              <CardContent>
                {!isEditingPerfil ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Nome Completo</h4>
                        <p>{dadosUsuario.nome}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Email</h4>
                        <p>{dadosUsuario.email}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Telefone</h4>
                        <p>{dadosUsuario.telefone}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Cargo</h4>
                        <p>{dadosUsuario.cargo}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Setor</h4>
                        <p>{dadosUsuario.setor}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-1">Data de Contratação</h4>
                        <p>{new Date(dadosUsuario.data_contratacao).toLocaleDateString()}</p>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Biografia</h4>
                      <p className="text-sm">{dadosUsuario.bio}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input id="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input id="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cargo">Cargo</Label>
                        <Input id="cargo" value={dadosUsuario.cargo} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="setor">Setor</Label>
                        <Input id="setor" value={dadosUsuario.setor} disabled />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dataContratacao">Data de Contratação</Label>
                        <Input id="dataContratacao" value={dadosUsuario.data_contratacao} disabled />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biografia</Label>
                      <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {isEditingPerfil ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditingPerfil(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={handleSalvarPerfil}>
                      <Save className="mr-2 h-4 w-4" />
                      Salvar Alterações
                    </Button>
                  </>
                ) : (
                  <Button variant="outline" onClick={() => setIsEditingPerfil(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editar Informações
                  </Button>
                )}
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building className="mr-2 h-5 w-5 text-primary" />
                    Endereço
                  </CardTitle>
                  <CardDescription>Seu endereço residencial</CardDescription>
                </CardHeader>
                <CardContent>
                  {!isEditingContato ? (
                    <div className="space-y-2">
                      <p>{dadosUsuario.endereco.rua}</p>
                      <p>
                        {dadosUsuario.endereco.bairro}, {dadosUsuario.endereco.cidade} - {dadosUsuario.endereco.estado}
                      </p>
                      <p>CEP: {dadosUsuario.endereco.cep}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="rua">Rua</Label>
                        <Input id="rua" value={rua} onChange={(e) => setRua(e.target.value)} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bairro">Bairro</Label>
                          <Input id="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cep">CEP</Label>
                          <Input id="cep" value={cep} onChange={(e) => setCep(e.target.value)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="cidade">Cidade</Label>
                          <Input id="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="estado">Estado</Label>
                          <Input id="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {isEditingContato ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditingContato(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSalvarContato}>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Endereço
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditingContato(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar Endereço
                    </Button>
                  )}
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Phone className="mr-2 h-5 w-5 text-primary" />
                    Contato de Emergência
                  </CardTitle>
                  <CardDescription>Pessoa para contato em caso de emergência</CardDescription>
                </CardHeader>
                <CardContent>
                  {!isEditingEmergencia ? (
                    <div className="space-y-2">
                      <p>
                        <span className="font-medium">{dadosUsuario.contato_emergencia.nome}</span> (
                        {dadosUsuario.contato_emergencia.relacao})
                      </p>
                      <p>{dadosUsuario.contato_emergencia.telefone}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="contatoNome">Nome</Label>
                        <Input id="contatoNome" value={contatoNome} onChange={(e) => setContatoNome(e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contatoRelacao">Relação</Label>
                        <Input
                          id="contatoRelacao"
                          value={contatoRelacao}
                          onChange={(e) => setContatoRelacao(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contatoTelefone">Telefone</Label>
                        <Input
                          id="contatoTelefone"
                          value={contatoTelefone}
                          onChange={(e) => setContatoTelefone(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {isEditingEmergencia ? (
                    <>
                      <Button variant="outline" onClick={() => setIsEditingEmergencia(false)}>
                        Cancelar
                      </Button>
                      <Button onClick={handleSalvarEmergencia}>
                        <Save className="mr-2 h-4 w-4" />
                        Salvar Contato
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" onClick={() => setIsEditingEmergencia(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Editar Contato
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="atividades">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="mr-2 h-5 w-5 text-primary" />
                  Atividades Recentes
                </CardTitle>
                <CardDescription>Histórico das suas últimas atividades no sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dadosUsuario.atividades_recentes.map((atividade) => (
                    <div key={atividade.id} className="flex items-start border-b pb-4 last:border-0 last:pb-0">
                      <div className="mr-4">
                        {atividade.tipo === "PONTO" ? (
                          <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                            <Clock className="h-5 w-5" />
                          </div>
                        ) : atividade.tipo === "SOLICITACAO" ? (
                          <div className="bg-purple-100 text-purple-700 p-2 rounded-full">
                            <FileText className="h-5 w-5" />
                          </div>
                        ) : (
                          <div className="bg-green-100 text-green-700 p-2 rounded-full">
                            <MessageSquare className="h-5 w-5" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{atividade.descricao}</p>
                        <p className="text-sm text-muted-foreground">{formatarData(atividade.data)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Link href="/perfil/historico-atividades" className="w-full">
                  <Button variant="outline" className="w-full">
                    Ver Histórico Completo
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="mr-2 h-5 w-5 text-primary" />
                  Estatísticas
                </CardTitle>
                <CardDescription>Resumo do mês atual</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Dias Trabalhados</h4>
                      <span className="font-bold">{dadosUsuario.estatisticas.dias_trabalhados_mes}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(dadosUsuario.estatisticas.dias_trabalhados_mes / 22) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Horas Trabalhadas</h4>
                      <span className="font-bold">{dadosUsuario.estatisticas.horas_trabalhadas_mes}h</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${(dadosUsuario.estatisticas.horas_trabalhadas_mes / 176) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-sm font-medium">Pontualidade</h4>
                      <span className="font-bold">{dadosUsuario.estatisticas.pontualidade}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${dadosUsuario.estatisticas.pontualidade}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Folgas Disponíveis</h4>
                      <p className="text-2xl font-bold">{dadosUsuario.estatisticas.folgas_disponiveis}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Férias Acumuladas</h4>
                      <p className="text-2xl font-bold">{dadosUsuario.estatisticas.ferias_acumuladas}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="configuracoes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5 text-primary" />
                  Notificações
                </CardTitle>
                <CardDescription>Configure como deseja receber notificações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notificacoesEmail">Notificações por Email</Label>
                      <p className="text-xs text-muted-foreground">Receba alertas e lembretes importantes por email</p>
                    </div>
                    <Switch id="notificacoesEmail" checked={notificacoesEmail} onCheckedChange={setNotificacoesEmail} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notificacoesApp">Notificações no Aplicativo</Label>
                      <p className="text-xs text-muted-foreground">Receba notificações dentro do sistema SmartPonto</p>
                    </div>
                    <Switch id="notificacoesApp" checked={notificacoesApp} onCheckedChange={setNotificacoesApp} />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notificacoesDesktop">Notificações Desktop</Label>
                      <p className="text-xs text-muted-foreground">
                        Receba notificações no seu navegador mesmo quando o sistema estiver em segundo plano
                      </p>
                    </div>
                    <Switch
                      id="notificacoesDesktop"
                      checked={notificacoesDesktop}
                      onCheckedChange={setNotificacoesDesktop}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSalvarConfiguracoes}>Salvar Preferências</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5 text-primary" />
                  Segurança
                </CardTitle>
                <CardDescription>Gerencie a segurança da sua conta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Senha</h3>
                      <p className="text-xs text-muted-foreground">Última alteração: há 30 dias</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setIsPasswordDialogOpen(true)}>
                      <Lock className="mr-2 h-4 w-4" />
                      Alterar Senha
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <h3 className="font-medium">Autenticação de Dois Fatores</h3>
                      <p className="text-xs text-muted-foreground">
                        Adicione uma camada extra de segurança à sua conta
                      </p>
                    </div>
                    <Button
                      variant={dadosUsuario.configuracoes.autenticacao_dois_fatores ? "outline" : "default"}
                      size="sm"
                      onClick={() => setIsTwoFactorDialogOpen(true)}
                    >
                      {dadosUsuario.configuracoes.autenticacao_dois_fatores ? (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                          Ativado
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Ativar
                        </>
                      )}
                    </Button>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="loginBiometrico">Login Biométrico</Label>
                      <p className="text-xs text-muted-foreground">
                        Use sua impressão digital ou reconhecimento facial para fazer login
                      </p>
                    </div>
                    <Switch id="loginBiometrico" checked={loginBiometrico} onCheckedChange={setLoginBiometrico} />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSalvarConfiguracoes}>Salvar Configurações</Button>
              </CardFooter>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCog className="mr-2 h-5 w-5 text-primary" />
                  Preferências da Interface
                </CardTitle>
                <CardDescription>Personalize a aparência do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="tema">Tema</Label>
                    <Select value={tema} onValueChange={setTema}>
                      <SelectTrigger id="tema">
                        <SelectValue placeholder="Selecione o tema" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="claro">Claro</SelectItem>
                        <SelectItem value="escuro">Escuro</SelectItem>
                        <SelectItem value="sistema">Usar configuração do sistema</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Dispositivos Conectados</Label>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <div className="flex items-center">
                          <Smartphone className="h-5 w-5 mr-3 text-gray-500" />
                          <div>
                            <p className="font-medium">iPhone 13 Pro</p>
                            <p className="text-xs text-muted-foreground">Último acesso: há 2 horas</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-green-100 text-green-700">
                          Atual
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between border p-3 rounded-md">
                        <div className="flex items-center">
                          <Laptop className="h-5 w-5 mr-3 text-gray-500" />
                          <div>
                            <p className="font-medium">MacBook Pro</p>
                            <p className="text-xs text-muted-foreground">Último acesso: há 1 dia</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Remover
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSalvarConfiguracoes}>Salvar Preferências</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal de Alteração de Senha */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar Senha</DialogTitle>
            <DialogDescription>Crie uma nova senha forte para proteger sua conta.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha Atual</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nova Senha</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {passwordError && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md flex items-start">
                <AlertTriangle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{passwordError}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAlterarSenha}>Alterar Senha</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Ativação de 2FA */}
      <Dialog open={isTwoFactorDialogOpen} onOpenChange={setIsTwoFactorDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Autenticação de Dois Fatores</DialogTitle>
            <DialogDescription>Adicione uma camada extra de segurança à sua conta.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="bg-primary/10 p-6 rounded-full">
                <Shield className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-medium">Proteja sua conta</h3>
                <p className="text-sm text-gray-500 mt-1">
                  A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta, exigindo mais do
                  que apenas uma senha para fazer login.
                </p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
              <h4 className="font-medium flex items-center text-amber-700 mb-2">
                <AlertTriangle className="h-5 w-5 mr-2" />
                Como funciona
              </h4>
              <p className="text-sm">
                Após ativar, você precisará fornecer um código de verificação enviado para seu celular, além da sua
                senha, ao fazer login.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTwoFactorDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleAtivarDoisFatores}>Ativar Autenticação</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
