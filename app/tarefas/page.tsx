import DashboardLayout from "@/components/dashboard-layout"
import TarefasHeader from "@/components/tarefas/tarefas-header"
import TarefasList from "@/components/tarefas/tarefas-list"

export default function TarefasPage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <TarefasHeader />
        <TarefasList />
      </div>
    </DashboardLayout>
  )
}
