import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, LogIn, LogOut, Coffee } from "lucide-react"

export default function RecentActivitiesCard() {
  const activities = [
    {
      id: 1,
      type: "entry",
      time: "08:00",
      date: "Hoje",
      icon: LogIn,
      description: "Entrada registrada",
    },
    {
      id: 2,
      type: "break",
      time: "12:00",
      date: "Hoje",
      icon: Coffee,
      description: "Saída para almoço",
    },
    {
      id: 3,
      type: "return",
      time: "13:00",
      date: "Hoje",
      icon: LogIn,
      description: "Retorno do almoço",
    },
    {
      id: 4,
      type: "exit",
      time: "17:00",
      date: "Ontem",
      icon: LogOut,
      description: "Saída registrada",
    },
  ]

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Atividades Recentes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-4 mt-1">
                <div
                  className={`p-2 rounded-full ${activity.type === "entry" || activity.type === "return"
                    ? "bg-green-100 text-green-600"
                    : activity.type === "exit"
                      ? "bg-red-100 text-red-600"
                      : "bg-blue-100 text-blue-600"
                    }`}
                >
                  <activity.icon className="h-4 w-4" />
                </div>
              </div>
              <div>
                <p className="font-medium">{activity.description}</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="mr-1 h-3 w-3" />
                  <span>
                    {activity.time} - {activity.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
