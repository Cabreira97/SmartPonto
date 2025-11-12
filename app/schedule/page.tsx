import type { Metadata } from "next"
import DashboardLayout from "@/components/dashboard-layout"
import ScheduleCalendar from "@/components/schedule/schedule-calendar"
import ScheduleHeader from "@/components/schedule/schedule-header"

export const metadata: Metadata = {
  title: "SmartPonto - Agenda de Trabalho",
  description: "Visualize e gerencie sua agenda de trabalho",
}

export default function SchedulePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Agenda de Trabalho</h1>
        <p className="text-muted-foreground">
          Visualize sua agenda de trabalho, escalas e compromissos em um único lugar.
        </p>

        <ScheduleHeader />
        <ScheduleCalendar />
      </div>
    </DashboardLayout>
  )
}
