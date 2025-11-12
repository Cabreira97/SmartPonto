"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Search, Plus, UserCheck, UserMinus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Dados simulados para demonstração
const funcionariosDisponiveis = [
  { id: 10, nome: "Igor Pereira", cargo: "Desenvolvedor", avatar: "IP" },
  { id: 11, nome: "Juliana Ribeiro", cargo: "Designer", avatar: "JR" },
  { id: 12, nome: "Karina Souza", cargo: "Analista de Marketing", avatar: "KS" },
  { id: 13, nome: "Leonardo Mendes", cargo: "Desenvolvedor", avatar: "LM" },
  { id: 14, nome: "Mariana Costa", cargo: "Analista de RH", avatar: "MC" },
  { id: 15, nome: "Nelson Oliveira", cargo: "Contador", avatar: "NO" },
  { id: 16, nome: "Olívia Santos", cargo: "Analista Financeiro", avatar: "OS" },
  { id: 17, nome: "Paulo Vieira", cargo: "Desenvolvedor", avatar: "PV" },
]

const funcionariosDoSetor = [
  { id: 1, nome: "Ana Silva", cargo: "Analista de TI", avatar: "AS" },
  { id: 2, nome: "Bruno Costa", cargo: "Desenvolvedor", avatar: "BC" },
  { id: 8, nome: "Henrique Alves", cargo: "Desenvolvedor", avatar: "HA" },
]

interface GerenciarFuncionariosFormProps {
  setor: {
    id: number
    nome: string
  }
  onSuccess: () => void
}

export default function GerenciarFuncionariosForm({ setor, onSuccess }: GerenciarFuncionariosFormProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [cargoFiltro, setCargoFiltro] = useState("")
  const [funcionariosAtuais, setFuncionariosAtuais] = useState([...funcionariosDoSetor])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio para API
    setTimeout(() => {
      toast({
        title: "Funcionários atualizados",
        description: `Os funcionários do setor ${setor.nome} foram atualizados com sucesso.`,
      })
      setIsSubmitting(false)
      onSuccess()
    }, 1000)
  }

  const adicionarFuncionario = (funcionario: any) => {
    if (!funcionariosAtuais.some((f) => f.id === funcionario.id)) {
      setFuncionariosAtuais([...funcionariosAtuais, funcionario])
      toast({
        description: `${funcionario.nome} adicionado ao setor ${setor.nome}.`,
      })
    }
  }

  const removerFuncionario = (id: number) => {
    setFuncionariosAtuais(funcionariosAtuais.filter((f) => f.id !== id))
    toast({
      description: "Funcionário removido do setor.",
      variant: "destructive",
    })
  }

  // Filtrar funcionários disponíveis
  const filtrarFuncionarios = () => {
    return funcionariosDisponiveis
      .filter((f) => !funcionariosAtuais.some((atual) => atual.id === f.id))
      .filter((f) => f.nome.toLowerCase().includes(searchTerm.toLowerCase()))
      .filter((f) => (cargoFiltro ? f.cargo === cargoFiltro : true))
  }

  const funcionariosFiltrados = filtrarFuncionarios()

  // Lista de cargos únicos para o filtro
  const cargos = Array.from(new Set(funcionariosDisponiveis.map((f) => f.cargo)))

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Gerenciar Funcionários do Setor {setor.nome}</Label>

        <Tabs defaultValue="atuais" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="atuais" className="flex items-center">
              <UserCheck className="h-4 w-4 mr-2" />
              Funcionários Atuais ({funcionariosAtuais.length})
            </TabsTrigger>
            <TabsTrigger value="adicionar" className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Funcionários
            </TabsTrigger>
          </TabsList>

          <TabsContent value="atuais" className="mt-4">
            {funcionariosAtuais.length > 0 ? (
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  {funcionariosAtuais.map((funcionario) => (
                    <div
                      key={funcionario.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-3">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={funcionario.nome} />
                          <AvatarFallback>{funcionario.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{funcionario.nome}</p>
                          <p className="text-sm text-muted-foreground">{funcionario.cargo}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removerFuncionario(funcionario.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <UserMinus className="h-4 w-4" />
                        <span className="sr-only">Remover funcionário</span>
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center border rounded-md">
                <UserMinus className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhum funcionário no setor.</p>
                <p className="text-sm text-muted-foreground">Adicione funcionários na aba "Adicionar Funcionários".</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="adicionar" className="mt-4">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar funcionários..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={cargoFiltro} onValueChange={setCargoFiltro}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="Filtrar por cargo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os cargos</SelectItem>
                  {cargos.map((cargo) => (
                    <SelectItem key={cargo} value={cargo}>
                      {cargo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {funcionariosFiltrados.length > 0 ? (
              <ScrollArea className="h-[300px] rounded-md border p-4">
                <div className="space-y-4">
                  {funcionariosFiltrados.map((funcionario) => (
                    <div
                      key={funcionario.id}
                      className="flex items-center justify-between p-2 rounded-md hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-3">
                          <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={funcionario.nome} />
                          <AvatarFallback>{funcionario.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{funcionario.nome}</p>
                          <p className="text-sm text-muted-foreground">{funcionario.cargo}</p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => adicionarFuncionario(funcionario)}
                        className="flex items-center"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Adicionar
                      </Button>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center border rounded-md">
                <Search className="h-10 w-10 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Nenhum funcionário encontrado.</p>
                <p className="text-sm text-muted-foreground">Tente ajustar os filtros de busca.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>
    </form>
  )
}
