"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import CargosHeader from "./cargos-header"
import NovoCargoForm from "./novo-cargo-form"
import CargosList from "./cargos-list"
import CargoDetalhes from "./cargo-detalhes"

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

const cargosMock: Cargo[] = [
  {
    id: "1",
    nome: "Desenvolvedor Frontend",
    descricao: "Responsável pelo desenvolvimento de interfaces web",
    nivel: "pleno",
    salarioBase: 8000,
    ativo: true,
    permissoes: ["visualizar_dashboard", "registrar_ponto", "solicitar_folga"],
    funcionarios: 5,
    criadoEm: "2024-01-15T10:00:00",
    atualizadoEm: "2024-12-01T14:30:00",
  },
  {
    id: "2",
    nome: "Gerente de TI",
    descricao: "Gerencia a equipe de tecnologia da informação",
    nivel: "gerente",
    salarioBase: 15000,
    ativo: true,
    permissoes: [
      "visualizar_dashboard",
      "gerenciar_usuarios",
      "gerenciar_setores",
      "aprovar_folgas",
      "visualizar_relatorios",
      "gerenciar_escalas",
      "aprovar_horas_extras",
    ],
    funcionarios: 1,
    criadoEm: "2024-01-10T09:00:00",
    atualizadoEm: "2024-11-15T16:45:00",
  },
  {
    id: "3",
    nome: "Analista de RH",
    descricao: "Responsável pelos processos de recursos humanos",
    nivel: "pleno",
    salarioBase: 6500,
    ativo: true,
    permissoes: [
      "visualizar_dashboard",
      "gerenciar_usuarios",
      "visualizar_relatorios",
      "gerenciar_folgas_ferias",
      "registrar_ponto",
    ],
    funcionarios: 2,
    criadoEm: "2024-02-01T11:30:00",
    atualizadoEm: "2024-12-10T09:15:00",
  },
  {
    id: "4",
    nome: "Estagiário",
    descricao: "Estudante em período de aprendizado prático",
    nivel: "junior",
    salarioBase: 1500,
    ativo: true,
    permissoes: ["visualizar_dashboard", "registrar_ponto"],
    funcionarios: 3,
    criadoEm: "2024-03-01T08:00:00",
    atualizadoEm: "2024-12-05T10:20:00",
  },
]

export default function CargosComponent() {
  const [cargos, setCargos] = useState<Cargo[]>(cargosMock)
  const [cargoSelecionado, setCargoSelecionado] = useState<Cargo | null>(null)
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [modoEdicao, setModoEdicao] = useState(false)

  const handleNovoCargo = () => {
    setCargoSelecionado(null)
    setModoEdicao(false)
    setMostrarFormulario(true)
  }

  const handleEditarCargo = (cargo: Cargo) => {
    setCargoSelecionado(cargo)
    setModoEdicao(true)
    setMostrarFormulario(true)
  }

  const handleSalvarCargo = (dadosCargo: Partial<Cargo>) => {
    if (modoEdicao && cargoSelecionado) {
      // Editar cargo existente
      setCargos((prev) =>
        prev.map((cargo) =>
          cargo.id === cargoSelecionado.id
            ? { ...cargo, ...dadosCargo, atualizadoEm: new Date().toISOString() }
            : cargo,
        ),
      )
    } else {
      // Criar novo cargo
      const novoCargo: Cargo = {
        id: Date.now().toString(),
        nome: dadosCargo.nome || "",
        descricao: dadosCargo.descricao || "",
        nivel: dadosCargo.nivel || "junior",
        salarioBase: dadosCargo.salarioBase || 0,
        ativo: true,
        permissoes: dadosCargo.permissoes || [],
        funcionarios: 0,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      }
      setCargos((prev) => [...prev, novoCargo])
    }
    setMostrarFormulario(false)
    setCargoSelecionado(null)
    setModoEdicao(false)
  }

  const handleExcluirCargo = (id: string) => {
    setCargos((prev) => prev.filter((cargo) => cargo.id !== id))
    setCargoSelecionado(null)
  }

  const handleToggleStatus = (id: string) => {
    setCargos((prev) =>
      prev.map((cargo) =>
        cargo.id === id ? { ...cargo, ativo: !cargo.ativo, atualizadoEm: new Date().toISOString() } : cargo,
      ),
    )
  }

  const cargosAtivos = cargos.filter((cargo) => cargo.ativo).length
  const totalFuncionarios = cargos.reduce((total, cargo) => total + cargo.funcionarios, 0)

  return (
    <div className="space-y-6">
      <CargosHeader
        totalCargos={cargos.length}
        cargosAtivos={cargosAtivos}
        totalFuncionarios={totalFuncionarios}
        onNovoCargo={handleNovoCargo}
      />

      {mostrarFormulario ? (
        <Card>
          <CardHeader>
            <CardTitle>{modoEdicao ? "Editar Cargo" : "Novo Cargo"}</CardTitle>
            <CardDescription>
              {modoEdicao
                ? "Edite as informações do cargo selecionado"
                : "Preencha as informações para criar um novo cargo"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NovoCargoForm
              cargo={cargoSelecionado}
              onSalvar={handleSalvarCargo}
              onCancelar={() => {
                setMostrarFormulario(false)
                setCargoSelecionado(null)
                setModoEdicao(false)
              }}
            />
          </CardContent>
        </Card>
      ) : cargoSelecionado ? (
        <CargoDetalhes
          cargo={cargoSelecionado}
          onEditar={() => handleEditarCargo(cargoSelecionado)}
          onExcluir={() => handleExcluirCargo(cargoSelecionado.id)}
          onToggleStatus={() => handleToggleStatus(cargoSelecionado.id)}
          onVoltar={() => setCargoSelecionado(null)}
        />
      ) : (
        <CargosList
          cargos={cargos}
          onSelecionarCargo={setCargoSelecionado}
          onEditarCargo={handleEditarCargo}
          onExcluirCargo={handleExcluirCargo}
          onToggleStatus={handleToggleStatus}
        />
      )}
    </div>
  )
}
