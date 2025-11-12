import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, User, Calendar, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface Setor {
  id: number
  nome: string
  descricao: string
  gerente: string
  gerente_id: number
  total_funcionarios: number
  criado_em: string
}

interface SetorDetalhesProps {
  setor: Setor
}

// Dados simulados para demonstração
const funcionarios = [
  { id: 1, nome: "Ana Silva", email: "ana.silva@empresa.com", cargo: "Analista", avatar: "AS" },
  { id: 2, nome: "Bruno Costa", email: "bruno.costa@empresa.com", cargo: "Desenvolvedor", avatar: "BC" },
  { id: 3, nome: "Carla Oliveira", email: "carla.oliveira@empresa.com", cargo: "Designer", avatar: "CO" },
  { id: 8, nome: "Henrique Alves", email: "henrique.alves@empresa.com", cargo: "Desenvolvedor", avatar: "HA" },
  { id: 9, nome: "Isabela Rocha", email: "isabela.rocha@empresa.com", cargo: "Analista", avatar: "IR" },
]

export default function SetorDetalhes({ setor }: SetorDetalhesProps) {
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString() + " " + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Tabs defaultValue="informacoes" className="py-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="informacoes">Informações</TabsTrigger>
        <TabsTrigger value="funcionarios">Funcionários</TabsTrigger>
      </TabsList>

      <TabsContent value="informacoes" className="space-y-6 py-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{setor.nome}</h3>
          <p className="text-sm text-gray-500">{setor.descricao}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <User className="h-5 w-5 mr-2 text-gray-500" />
            <span>Gerente: {setor.gerente}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-gray-500" />
            <span>Total de Funcionários: {setor.total_funcionarios}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-500" />
            <span>Criado em: {formatarData(setor.criado_em)}</span>
          </div>
          <div className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-gray-500" />
            <span>ID do Setor: {setor.id}</span>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="funcionarios" className="space-y-4 py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Cargo</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {funcionarios.map((funcionario) => (
              <TableRow key={funcionario.id}>
                <TableCell>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder.svg?height=32&width=32`} alt={funcionario.nome} />
                    <AvatarFallback>{funcionario.avatar}</AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium">{funcionario.nome}</TableCell>
                <TableCell>{funcionario.cargo}</TableCell>
                <TableCell>{funcionario.email}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}
