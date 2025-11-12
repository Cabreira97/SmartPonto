"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface ExcluirSetorDialogProps {
  setor: {
    id: number
    nome: string
    total_funcionarios: number
  }
  onSuccess: () => void
}

export default function ExcluirSetorDialog({ setor, onSuccess }: ExcluirSetorDialogProps) {
  const [confirmacao, setConfirmacao] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulação de envio para API
    setTimeout(() => {
      toast({
        title: "Setor excluído",
        description: `O setor ${setor.nome} foi excluído com sucesso.`,
        variant: "destructive",
      })
      setIsSubmitting(false)
      onSuccess()
    }, 1000)
  }

  const isConfirmacaoValida = confirmacao === setor.nome

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-red-50 p-4 rounded-md flex items-start">
        <AlertTriangle className="h-5 w-5 text-red-600 mr-3 mt-0.5" />
        <div>
          <h3 className="font-medium text-red-800">Atenção: Esta ação não pode ser desfeita</h3>
          <p className="text-sm text-red-700 mt-1">
            Você está prestes a excluir o setor <strong>{setor.nome}</strong> que possui{" "}
            <strong>{setor.total_funcionarios} funcionários</strong>. Todos os dados relacionados a este setor serão
            permanentemente removidos.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmacao">
          Para confirmar, digite o nome do setor: <strong>{setor.nome}</strong>
        </Label>
        <Input
          id="confirmacao"
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          placeholder={`Digite "${setor.nome}" para confirmar`}
          className={!isConfirmacaoValida && confirmacao ? "border-red-500" : ""}
        />
        {!isConfirmacaoValida && confirmacao && (
          <p className="text-sm text-red-500">O nome digitado não corresponde ao nome do setor.</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" type="button" onClick={onSuccess}>
          Cancelar
        </Button>
        <Button
          type="submit"
          variant="destructive"
          disabled={isSubmitting || !isConfirmacaoValida}
          className="bg-red-600 hover:bg-red-700"
        >
          {isSubmitting ? "Excluindo..." : "Excluir Permanentemente"}
        </Button>
      </div>
    </form>
  )
}
