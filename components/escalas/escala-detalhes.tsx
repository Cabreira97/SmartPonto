import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, CalendarClock } from "lucide-react"

interface Escala {
  id: number
  nome: string
  descricao: string
  usuarios_atribuidos: number
  criado_em: string
}

interface EscalaDetalhesProps {
  escala: Escala
}

// Dados simulados para demonstração
const horarios = [
  { dia: "Segunda-feira", folga: false, inicio: "08:00", fim: "17:00" },
  { dia: "Terça-feira", folga: false, inicio: "08:00", fim: "17:00" },
  { dia: "Quarta-feira", folga: false, inicio: "08:00", fim: "17:00" },
  { dia: "Quinta-feira", folga: false, inicio: "08:00", fim: "17:00" },
  { dia: "Sexta-feira", folga: false, inicio: "08:00", fim: "17:00" },
  { dia: "Sábado", folga: true, inicio: "", fim: "" },
  { dia: "Domingo", folga: true, inicio: "", fim: "" },
]

export default function EscalaDetalhes({ escala }: EscalaDetalhesProps) {
  const formatarData = (dataString: string) => {
    const data = new Date(dataString)
    return data.toLocaleDateString() + " " + data.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{escala.nome}</h3>
        <p className="text-sm text-gray-500">{escala.descricao}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-gray-500" />
          <span>Criado em: {formatarData(escala.criado_em)}</span>
        </div>
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2 text-gray-500" />
          <span>Usuários atribuídos: {escala.usuarios_atribuidos}</span>
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Horários</h4>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Dia</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Horário</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {horarios.map((horario, index) => (
              <TableRow key={index}>
                <TableCell>{horario.dia}</TableCell>
                <TableCell>
                  {horario.folga ? (
                    <Badge variant="outline" className="bg-gray-100 text-gray-800">
                      Folga
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-green-100 text-green-800">
                      Trabalho
                    </Badge>
                  )}
                </TableCell>
                <TableCell>
                  {horario.folga ? (
                    "-"
                  ) : (
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span>
                        {horario.inicio} - {horario.fim}
                      </span>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Carga Horária</h4>
        <div className="flex items-center">
          <CalendarClock className="h-5 w-5 mr-2 text-gray-500" />
          <span>Total semanal: 40 horas</span>
        </div>
      </div>
    </div>
  )
}
