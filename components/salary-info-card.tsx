import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Clock, CalendarClock } from "lucide-react"

export default function SalaryInfoCard() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Informações Salariais</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <DollarSign className="mr-2 h-5 w-5 text-gray-500" />
              <h3 className="font-medium">Salário Estimado</h3>
            </div>
            <p className="text-2xl font-bold">R$ 3.250,00</p>
            <p className="text-sm text-gray-500">Mês atual</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="mr-2 h-5 w-5 text-gray-500" />
              <h3 className="font-medium">Horas Trabalhadas</h3>
            </div>
            <p className="text-2xl font-bold">120h 30m</p>
            <p className="text-sm text-gray-500">De 176h previstas</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <CalendarClock className="mr-2 h-5 w-5 text-gray-500" />
              <h3 className="font-medium">Horas Extras</h3>
            </div>
            <p className="text-2xl font-bold">4h 15m</p>
            <p className="text-sm text-gray-500">Valor: R$ 250,00</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
