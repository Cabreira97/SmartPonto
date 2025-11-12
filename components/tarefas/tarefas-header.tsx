"use client"

import { Button } from "@/components/ui/button"
import { PlusCircle, Search } from "lucide-react"
import { useState } from "react"
import NovaTarefaForm from "./nova-tarefa-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TarefasHeader() {
  const [showNovaTarefa, setShowNovaTarefa] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tarefas</h1>
          <p className="text-muted-foreground">Gerencie as tarefas da sua equipe</p>
        </div>
        <Button onClick={() => setShowNovaTarefa(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Tarefa
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Buscar tarefas..." className="pl-8 w-full" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="todas">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas as tarefas</SelectItem>
              <SelectItem value="pendentes">Pendentes</SelectItem>
              <SelectItem value="em-andamento">Em andamento</SelectItem>
              <SelectItem value="concluidas">Concluídas</SelectItem>
              <SelectItem value="atrasadas">Atrasadas</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="recentes">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recentes">Mais recentes</SelectItem>
              <SelectItem value="antigas">Mais antigas</SelectItem>
              <SelectItem value="prazo">Prazo mais próximo</SelectItem>
              <SelectItem value="prioridade">Prioridade</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {showNovaTarefa && <NovaTarefaForm onClose={() => setShowNovaTarefa(false)} />}
    </div>
  )
}
