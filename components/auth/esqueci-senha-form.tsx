"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { Mail, Loader2, CheckCircle } from "lucide-react"

export default function EsqueciSenhaForm() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Por favor, informe seu e-mail.")
      return
    }

    setIsLoading(true)

    try {
      // Simulação de envio de e-mail
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setIsSuccess(true)
      toast({
        title: "E-mail enviado",
        description: "Verifique sua caixa de entrada para redefinir sua senha.",
      })
    } catch (err) {
      setError("Ocorreu um erro ao enviar o e-mail. Tente novamente.")
      console.error("Erro ao enviar e-mail:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar link de recuperação"
              )}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="bg-green-100 p-3 rounded-full mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">E-mail enviado com sucesso!</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enviamos um link de recuperação para <span className="font-medium">{email}</span>. Verifique sua caixa de
              entrada e siga as instruções para redefinir sua senha.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setIsSuccess(false)
                setEmail("")
              }}
            >
              Enviar para outro e-mail
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
