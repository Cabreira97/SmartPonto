import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">404</div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">Página não encontrada</h1>
            <p className="text-gray-600">A página que você está procurando não existe ou foi movida.</p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Voltar ao Dashboard
              </Link>
            </Button>

            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="javascript:history.back()">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Página Anterior
              </Link>
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-500 mb-3">Precisa de ajuda? Entre em contato com o suporte.</p>
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Buscar Ajuda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
