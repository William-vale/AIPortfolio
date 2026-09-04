'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    UserRound,
    Globe2,
    CreditCard, Settings2,
    type LucideIcon,
} from 'lucide-react'

import { cn } from "@/lib/utils"
import { UpsellGeracoes } from "@/modules/cobranca"

interface ItemNavegacao {
    href: string
    label: string
    icone: LucideIcon
}

const itensNavegacao: ItemNavegacao[] = [
    {
        href: '/painel', label: 'Painel', icone: LayoutDashboard
    },
    {
        href: '/painel/perfil', label: 'Perfil', icone: UserRound
    },
    {
        href: '/painel/publicacao', label: 'Publicação', icone: Globe2
    },
    {
        href: '/painel/assinatura', label: 'Assinatura', icone: CreditCard
    },
    {
        href: '/painel/conta', label: 'Conta', icone: Settings2
    },
]

function usarItemAtivo(href: string, pathname: string) {
    if (href === '/painel') {
        return pathname === '/painel'
    }
    return pathname === href || pathname.startsWith(`${href}/`)
}

export function PainelSideBar() {
    const pathname = usePathname()

    return (
        <aside className="hidden w-60 shrink-0 border-r border-border bg-surface lg:flex lg:flex-col">
            <nav className="flex-1 space-y-1 p-4" aria-label="Navegação do Painel">
                {itensNavegacao.map(({ href, label, icone: Icone }) => {
                    const ativo = userItemAtivo(href, pathname)
                    return (
                        <Link
                            key={href}
                            href={href}
                            aria-current={ativo ? 'page' : undefined}
                            className={cn(
                                'flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors',
                                ativo ? 'bg-primary text-primary-foreground' : 'text-secondary hover:bg-subtle hover:text-foreground'
                            )}
                        >
                            <Icone className="size-5 shrink-0" />
                            {label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4">
                <UpsellGeracoes />
            </div>

        </aside>
    )
}

export function PainelNavMobile() {
    const pathname = usePathname()

    return (
        <nav></nav>
    )
}