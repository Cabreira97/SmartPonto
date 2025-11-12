"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DialogFooter } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Usuario {
  id: number
  nome: string
  email: string
}

interface RedefinirSenhaFormProps {
  usuario: Usuario
  onClose: () => void
}

export default function RedefinirSenhaForm({ usuario, onClose }: RedefinirSenhaFormProps) {
  const [senha, setSenha] = useState("")
  const [confirmarSenha, setConfirmarSenha] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    // Validação
    if (senha.length < 8) {
      setError("A senha deve ter pelo menos 8 caracteres")
      return
    }

    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem")
      return
    }

    // Aqui seria feita a chamada à API para redefinir a senha
    console.log("Redefinindo senha para o usuário:", {
      id: usuario.id,
      senha,
    })

    toast({
      title: "Senha redefinida",
      description: `A senha de ${usuario.nome} foi redefinida com sucesso.`,
    })

    onClose()
  }

  return (
    <div className="space-y-6 py-4">
      <div className="space-y-2">
        <Label htmlFor="usuario">Usuário</Label>
        <div className="flex items-center border rounded-md p-2 bg-gray-50">
          <span>{usuario.nome}</span>
          <span className="ml-2 text-gray-500">({usuario.email})</span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="senha">Nova Senha</Label>
        <Input
          id="senha"
          type="password"
          value={senha}
          onChange={(e) => {
            setSenha(e.target.value)
            setError(null)
          }}
          placeholder="Digite a nova senha"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmarSenha">Confirmar Nova Senha</Label>
        <Input
          id="confirmarSenha"
          type="password"
          value={confirmarSenha}
          onChange={(e) => {
            setConfirmarSenha(e.target.value)
            setError(null)
          }}
          placeholder="Confirme a nova senha"
        />
      </div>

      <div className="text-sm text-gray-500">
        <p>A senha deve conter:</p>
        <ul className="list-disc pl-5 mt-1">
          <li className={senha.length >= 8 ? "text-green-600" : ""}>Pelo menos 8 caracteres</li>
          <li className={/[A-Z]/.test(senha) ? "text-green-600" : ""}>Pelo menos uma letra maiúscula</li>
          <li className={/[0-9]/.test(senha) ? "text-green-600" : ""}>Pelo menos um número</li>
          <li className={/[^A-Za-z0-9]/.test(senha) ? "text-green-600" : ""}>Pelo menos um caractere especial</li>
        </ul>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancelar
        </Button>
        <Button onClick={handleSubmit}>Redefinir Senha</Button>
      </DialogFooter>
    </div>
  )
}
