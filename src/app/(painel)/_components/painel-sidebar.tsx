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

const itensVavegacao: ItemNavegacao[] = [
    {
        href: '/painel', label: 'Painel', icone: LayoutDashboard
    },
]