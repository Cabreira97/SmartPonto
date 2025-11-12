import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import LoginForm from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "SmartPonto - Login",
  description: "Acesse sua conta no sistema SmartPonto",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Lado esquerdo - Imagem/Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <Image src="/placeholder.svg?height=1080&width=1920" alt="SmartPonto" fill className="object-cover" priority />
        <div className="relative z-20 flex flex-col justify-between h-full p-12 text-white">
          <div>
            <h1 className="text-4xl font-bold">SmartPonto</h1>
            <p className="mt-2 text-lg opacity-90">Sistema de gestão de ponto e produtividade</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Gerencie seu tempo de forma inteligente</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-white mr-2" />
                <span>Registro de ponto simplificado</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-white mr-2" />
                <span>Acompanhamento de produtividade</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-white mr-2" />
                <span>Gestão de folgas e banco de horas</span>
              </li>
              <li className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-white mr-2" />
                <span>Relatórios detalhados e insights</span>
              </li>
            </ul>
          </div>
          <div className="text-sm opacity-75">
            © {new Date().getFullYear()} SmartPonto. Todos os direitos reservados.
          </div>
        </div>
      </div>

      {/* Lado direito - Formulário de login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="lg:hidden mb-6">
              <h1 className="text-3xl font-bold text-primary">SmartPonto</h1>
              <p className="mt-1 text-gray-600">Sistema de gestão de ponto e produtividade</p>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Bem-vindo de volta</h2>
            <p className="mt-2 text-gray-600">Faça login para acessar sua conta</p>
          </div>

          <LoginForm />

          <div className="mt-8 text-center text-sm text-gray-600">
            <p>
              Não tem uma conta?{" "}
              <Link href="/contato" className="text-primary font-medium hover:underline">
                Entre em contato
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
