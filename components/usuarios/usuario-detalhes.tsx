import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Briefcase, Building, Calendar, Shield } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

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

interface UsuarioDetalhesProps {
  usuario: Usuario
}

// Dados simulados para demonstração
const permissoes = [
  { nome: "Gerenciar Ponto", concedida: true },
  { nome: "Gerenciar Usuários", concedida: false },
  { nome: "Gerenciar Escalas", concedida: true },
  { nome: "Aprovar Folgas e Férias", concedida: false },
  { nome: "Gerar Relatórios", concedida: true },
  { nome: "Administrador do Sistema", concedida: false },
]

const registrosPonto = [
  { data: "2023-11-10", tipo: "ENTRADA", hora: "08:00", manual: false },
  { data: "2023-11-10", tipo: "PAUSA", hora: "12:00", manual: false },
  { data: "2023-11-10", tipo: "RETORNO", hora: "13:00", manual: false },
  { data: "2023-11-10", tipo: "SAIDA", hora: "17:00", manual: false },
  { data: "2023-11-09", tipo: "ENTRADA", hora: "08:05", manual: false },
  { data: "2023-11-09", tipo: "PAUSA", hora: "12:00", manual: false },
  { data: "2023-11-09", tipo: "RETORNO", hora: "13:10", manual: true },
  { data: "2023-11-09", tipo: "SAIDA", hora: "17:00", manual: false },
]

export default function UsuarioDetalhes({ usuario }: UsuarioDetalhesProps) {
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString()
  }

  return (
    <Tabs defaultValue="informacoes" className="py-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="informacoes">Informações</TabsTrigger>
        <TabsTrigger value="permissoes">Permissões</TabsTrigger>
        <TabsTrigger value="ponto">Registro de Ponto</TabsTrigger>
      </TabsList>

      <TabsContent value="informacoes" className="space-y-6 py-4">
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">{usuario.nome}</h3>
          <div className="flex items-center">
            <Badge
              variant="outline"
              className={usuario.ativo ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}
            >
              {usuario.ativo ? "Ativo" : "Inativo"}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center">
            <Mail className="h-5 w-5 mr-2 text-gray-500" />
            <span>{usuario.email}</span>
          </div>
          <div className="flex items-center">
            <Phone className="h-5 w-5 mr-2 text-gray-500" />
            <span>{usuario.telefone}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-gray-500" />
            <span>Cargo: {usuario.cargo}</span>
          </div>
          <div className="flex items-center">
            <Building className="h-5 w-5 mr-2 text-gray-500" />
            <span>Setor: {usuario.setor}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-gray-500" />
            <span>Data de Contratação: {formatarData(usuario.data_contratacao)}</span>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="permissoes" className="space-y-4 py-4">
        <div className="space-y-4">
          {permissoes.map((permissao, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-md">
              <div className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-gray-500" />
                <span>{permissao.nome}</span>
              </div>
              <Badge
                variant="outline"
                className={permissao.concedida ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}
              >
                {permissao.concedida ? "Concedida" : "Não concedida"}
              </Badge>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="ponto" className="space-y-4 py-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Hora</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {registrosPonto.map((registro, index) => (
              <TableRow key={index}>
                <TableCell>{formatarData(registro.data)}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      registro.tipo === "ENTRADA"
                        ? "bg-green-100 text-green-800"
                        : registro.tipo === "SAIDA"
                          ? "bg-red-100 text-red-800"
                          : registro.tipo === "PAUSA"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-blue-100 text-blue-800"
                    }
                  >
                    {registro.tipo === "ENTRADA"
                      ? "Entrada"
                      : registro.tipo === "SAIDA"
                        ? "Saída"
                        : registro.tipo === "PAUSA"
                          ? "Pausa"
                          : "Retorno"}
                  </Badge>
                </TableCell>
                <TableCell>{registro.hora}</TableCell>
                <TableCell>
                  {registro.manual ? (
                    <span className="text-amber-600">Manual</span>
                  ) : (
                    <span className="text-green-600">Automático</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TabsContent>
    </Tabs>
  )
}
