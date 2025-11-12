import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "SmartPonto - Recuperação de Senha",
  description: "Recupere sua senha do sistema SmartPonto",
}

export default function EsqueciSenhaPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary">SmartPonto</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Esqueceu sua senha?</h2>
          <p className="mt-2 text-gray-600">Digite seu e-mail abaixo e enviaremos um link para redefinir sua senha.</p>
        </div>

        <form className="mt-8 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Enviar link de recuperação
          </Button>

          <div className="text-center">
            <Link href="/login" className="inline-flex items-center text-sm text-primary hover:underline">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para o login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
