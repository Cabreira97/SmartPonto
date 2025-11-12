"use client"

import { Plus, Briefcase, Users, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CargosHeaderProps {
  totalCargos: number
  cargosAtivos: number
  totalFuncionarios: number
  onNovoCargo: () => void
}

export default function CargosHeader({ totalCargos, cargosAtivos, totalFuncionarios, onNovoCargo }: CargosHeaderProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Cargos</h1>
          <p className="text-muted-foreground">Gerencie cargos, permissões e hierarquia organizacional</p>
        </div>
        <Button onClick={onNovoCargo}>
          <Plus className="h-4 w-4 mr-2" />
          Novo Cargo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cargos</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCargos}</div>
            <p className="text-xs text-muted-foreground">Cargos cadastrados no sistema</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cargos Ativos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cargosAtivos}</div>
            <p className="text-xs text-muted-foreground">Cargos disponíveis para atribuição</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Funcionários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalFuncionarios}</div>
            <p className="text-xs text-muted-foreground">Total de funcionários com cargos</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
