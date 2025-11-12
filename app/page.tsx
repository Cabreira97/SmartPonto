import TimeTrackingCard from "@/components/time-tracking-card"
import RecentActivitiesCard from "@/components/recent-activities-card"
import WorkScheduleCard from "@/components/work-schedule-card"
import SalaryInfoCard from "@/components/salary-info-card"
import StatusDisponibilidade from "@/components/dashboard/status-disponibilidade"
import HorasExtrasAprovadas from "@/components/dashboard/horas-extras-aprovadas"
import DashboardLayout from "@/components/dashboard-layout"

export default function Home() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TimeTrackingCard />
        <StatusDisponibilidade />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-6">
        <div className="md:col-span-3">
          <RecentActivitiesCard />
        </div>
        <div className="md:col-span-4">
          <WorkScheduleCard />
        </div>
        <div className="md:col-span-5 space-y-6">
          <SalaryInfoCard />
          <HorasExtrasAprovadas />
        </div>
      </div>
    </DashboardLayout>
  )
}
