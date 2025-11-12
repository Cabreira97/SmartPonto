"use client"

import { Edit, Trash2, Shield, Users, DollarSign, Calendar, CheckCircle, XCircle, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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

interface CargoDetalhesProps {
  cargo: Cargo
  onEditar: () => void
  onExcluir: () => void
  onToggleStatus: () => void
  onVoltar: () => void
}

const permissoesLabels: Record<string, string> = {
  visualizar_dashboard: "Visualizar Dashboard",
  registrar_ponto: "Registrar Ponto",
  visualizar_historico_ponto: "Ver Histórico de Ponto",
  corrigir_ponto: "Solicitar Correção de Ponto",
  aprovar_correcao_ponto: "Aprovar Correção de Ponto",
  visualizar_usuarios: "Visualizar Usuários",
  gerenciar_usuarios: "Gerenciar Usuários",
  redefinir_senhas: "Redefinir Senhas",
  visualizar_setores: "Visualizar Setores",
  gerenciar_setores: "Gerenciar Setores",
  visualizar_escalas: "Visualizar Escalas",
  gerenciar_escalas: "Gerenciar Escalas",
  atribuir_escalas: "Atribuir Escalas",
  solicitar_folga: "Solicitar Folga/Férias",
  visualizar_folgas: "Visualizar Folgas/Férias",
  aprovar_folgas: "Aprovar Folgas/Férias",
  gerenciar_folgas_ferias: "Gerenciar Folgas/Férias",
  solicitar_horas_extras: "Solicitar Horas Extras",
  aprovar_horas_extras: "Aprovar Horas Extras",
  visualizar_relatorios: "Visualizar Relatórios",
  gerar_relatorios_avancados: "Relatórios Avançados",
  exportar_relatorios: "Exportar Relatórios",
  visualizar_configuracoes: "Ver Configurações",
  gerenciar_configuracoes_sistema: "Configurações do Sistema",
  visualizar_cargos: "Visualizar Cargos",
  gerenciar_cargos: "Gerenciar Cargos",
  gerenciar_permissoes: "Gerenciar Permissões",
}

export default function CargoDetalhes({ cargo, onEditar, onExcluir, onToggleStatus, onVoltar }: CargoDetalhesProps) {
  const getNivelColor = (nivel: string) => {
    switch (nivel) {
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

  const getNivelLabel = (nivel: string) => {
    switch (nivel) {
      case "junior":
        return "Júnior"
      case "pleno":
        return "Pleno"
      case "senior":
        return "Sênior"
      case "coordenador":
        return "Coordenador"
      case "gerente":
        return "Gerente"
      case "diretor":
        return "Diretor"
      default:
        return nivel
    }
  }

  return (
    <div className="space-y-6">
      <Button variant="ghost" onClick={onVoltar}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar para lista
      </Button>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="space-y-2">
              <CardTitle className="text-2xl">{cargo.nome}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className={getNivelColor(cargo.nivel)}>
                  {getNivelLabel(cargo.nivel)}
                </Badge>
                <Badge variant={cargo.ativo ? "default" : "secondary"}>
                  {cargo.ativo ? (
                    <>
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Ativo
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 mr-1" />
                      Inativo
                    </>
                  )}
                </Badge>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button onClick={onEditar}>
                <Edit className="h-4 w-4 mr-2" />
                Editar
              </Button>
              <Button variant="outline" onClick={onToggleStatus}>
                <Shield className="h-4 w-4 mr-2" />
                {cargo.ativo ? "Desativar" : "Ativar"}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Excluir
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                    <AlertDialogDescription>
                      Tem certeza que deseja excluir o cargo "{cargo.nome}"? Esta ação não pode ser desfeita e afetará{" "}
                      {cargo.funcionarios} funcionário(s).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction onClick={onExcluir} className="bg-red-600 hover:bg-red-700">
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-base">{cargo.descricao}</CardDescription>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Informações Gerais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>Salário Base</span>
              </div>
              <span className="font-semibold">
                R$ {cargo.salarioBase.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>Funcionários Atribuídos</span>
              </div>
              <span className="font-semibold">{cargo.funcionarios}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span>Total de Permissões</span>
              </div>
              <span className="font-semibold">{cargo.permissoes.length}</span>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Criado em</span>
                </div>
                <span>{new Date(cargo.criadoEm).toLocaleDateString("pt-BR")}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Última atualização</span>
                </div>
                <span>{new Date(cargo.atualizadoEm).toLocaleDateString("pt-BR")}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Permissões do Cargo</CardTitle>
            <CardDescription>Lista completa de permissões atribuídas a este cargo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {cargo.permissoes.map((permissao) => (
                <div key={permissao} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{permissoesLabels[permissao] || permissao}</span>
                </div>
              ))}
            </div>

            {cargo.permissoes.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <p>Nenhuma permissão atribuída</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
