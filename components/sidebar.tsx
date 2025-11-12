"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Clock,
  Users,
  Building2,
  Calendar,
  CalendarDays,
  BarChart3,
  Settings,
  ChevronDown,
  ChevronRight,
  Briefcase,
  CheckSquare,
  PiggyBank,
  Heart,
  TrendingUp,
  FileText,
  Bell,
  User,
  History,
  ClipboardCheck,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface SidebarProps {
  onNavigate?: () => void
}

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    title: "Ponto Eletrônico",
    icon: Clock,
    items: [
      { title: "Registrar Ponto", href: "/", icon: Clock },
      { title: "Histórico de Ponto", href: "/historico-ponto", icon: History },
    ],
  },
  {
    title: "Usuários",
    href: "/usuarios",
    icon: Users,
  },
  {
    title: "Cargos",
    href: "/cargos",
    icon: Briefcase,
  },
  {
    title: "Setores",
    href: "/setores",
    icon: Building2,
  },
  {
    title: "Escalas de Trabalho",
    href: "/escalas",
    icon: Calendar,
  },
  {
    title: "Folgas e Férias",
    href: "/folgas-ferias",
    icon: CalendarDays,
  },
  {
    title: "Tarefas",
    href: "/tarefas",
    icon: CheckSquare,
  },
  {
    title: "Banco de Horas",
    href: "/banco-horas",
    icon: PiggyBank,
  },
  {
    title: "Aprovações",
    href: "/aprovacoes",
    icon: ClipboardCheck,
  },
  {
    title: "Bem-estar",
    href: "/bem-estar",
    icon: Heart,
  },
  {
    title: "Produtividade",
    href: "/produtividade",
    icon: TrendingUp,
  },
  {
    title: "Dailies",
    href: "/dailies",
    icon: FileText,
  },
  {
    title: "Relatórios",
    href: "/relatorios",
    icon: BarChart3,
  },
  {
    title: "Notificações",
    href: "/notificacoes",
    icon: Bell,
  },
  {
    title: "Perfil",
    href: "/perfil",
    icon: User,
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings,
  },
]

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname()
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (title: string) => {
    setOpenItems((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
  }

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const handleNavigation = () => {
    if (onNavigate) {
      onNavigate()
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-background border-r">
      <div className="flex h-14 items-center border-b px-4">
        <Link className="flex items-center gap-2 font-semibold" href="/" onClick={handleNavigation}>
          <Clock className="h-6 w-6" />
          <span>Smart Ponto</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          {menuItems.map((item) => {
            if (item.items) {
              const isOpen = openItems.includes(item.title)
              const hasActiveChild = item.items.some((child) => isActive(child.href))

              return (
                <Collapsible key={item.title} open={isOpen} onOpenChange={() => toggleItem(item.title)}>
                  <CollapsibleTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-between px-3 py-2 text-left font-normal",
                        (isOpen || hasActiveChild) && "bg-accent text-accent-foreground",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        {item.title}
                      </div>
                      {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="space-y-1">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        onClick={handleNavigation}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 ml-6 text-muted-foreground transition-all hover:text-primary",
                          isActive(subItem.href) && "bg-accent text-accent-foreground",
                        )}
                      >
                        <subItem.icon className="h-4 w-4" />
                        {subItem.title}
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleNavigation}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  isActive(item.href) && "bg-accent text-accent-foreground",
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
