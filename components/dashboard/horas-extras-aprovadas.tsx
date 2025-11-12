"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, AlertCircle, Calendar } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

// Dados simulados para demonstração
const horasExtrasAprovadas = [
  {
    id: 1,
    data: new Date(2023, 10, 20), // 20/11/2023
    quantidade: 2,
    motivo: "Finalização de relatório mensal",
    status: "APROVADA",
  },
  {
    id: 2,
    data: new Date(2023, 10, 22), // 22/11/2023
    quantidade: 3,
    motivo: "Implantação de sistema",
    status: "APROVADA",
  },
  {
    id: 3,
    data: new Date(2023, 10, 25), // 25/11/2023
    quantidade: 1,
    motivo: "Reunião com cliente",
    status: "PENDENTE",
  },
]

export default function HorasExtrasAprovadas() {
  const [horasExtras, setHorasExtras] = useState(horasExtrasAprovadas)
  const [temHorasExtrasHoje, setTemHorasExtrasHoje] = useState(false)
  const [quantidadeHorasExtrasHoje, setQuantidadeHorasExtrasHoje] = useState(0)

  useEffect(() => {
    // Verificar se há horas extras aprovadas para hoje
    const hoje = new Date()
    const horasExtrasHoje = horasExtras.find(
      (he) =>
        he.status === "APROVADA" &&
        he.data.getDate() === hoje.getDate() &&
        he.data.getMonth() === hoje.getMonth() &&
        he.data.getFullYear() === hoje.getFullYear(),
    )

    if (horasExtrasHoje) {
      setTemHorasExtrasHoje(true)
      setQuantidadeHorasExtrasHoje(horasExtrasHoje.quantidade)
    } else {
      setTemHorasExtrasHoje(false)
      setQuantidadeHorasExtrasHoje(0)
    }
  }, [horasExtras])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Clock className="mr-2 h-5 w-5 text-primary" />
          Horas Extras
        </CardTitle>
        <CardDescription>Suas solicitações de horas extras aprovadas</CardDescription>
      </CardHeader>
      <CardContent>
        {temHorasExtrasHoje ? (
          <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium text-green-800">Horas extras aprovadas para hoje</h3>
                <p className="text-sm text-green-700">
                  Você tem {quantidadeHorasExtrasHoje} hora{quantidadeHorasExtrasHoje > 1 ? "s" : ""} extra
                  {quantidadeHorasExtrasHoje > 1 ? "s" : ""} aprovada{quantidadeHorasExtrasHoje > 1 ? "s" : ""} para
                  hoje.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
              <div>
                <h3 className="font-medium">Sem horas extras para hoje</h3>
                <p className="text-sm text-gray-600">
                  Você não tem horas extras aprovadas para hoje. Caso precise trabalhar além do horário, solicite
                  aprovação.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {horasExtras.map((he) => (
            <div key={he.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-3 text-gray-500" />
                <div>
                  <p className="font-medium">{format(he.data, "dd 'de' MMMM", { locale: ptBR })}</p>
                  <p className="text-sm text-muted-foreground">
                    {he.quantidade} hora{he.quantidade > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  he.status === "APROVADA"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                }
              >
                {he.status === "APROVADA" ? "Aprovada" : "Pendente"}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={() => (window.location.href = "/solicitar-extra-folga")}>
          Solicitar Horas Extras
        </Button>
      </CardFooter>
    </Card>
  )
}
