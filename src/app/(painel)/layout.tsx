import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
 
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { PainelNavMobile, PainelSidebar } from './_components/painel-sidebar'
 
export const metadata = {
  title: 'Painel — AI Portfolio',
  description: 'Gerencie seu perfil profissional e prepare suas próximas apresentações.',
}
 
export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg-app">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-surface px-4 sm:px-6">
        <Link
          href="/painel"
          className="font-heading text-lg font-bold tracking-tight text-foreground"
        >
          aiportfolio.dev
        </Link>
 
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <Avatar className="size-9 border-2 border-border">
              <AvatarFallback className="bg-primary-pale text-sm font-semibold text-primary">
                CM
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium text-foreground sm:block">
              Camila Martins
            </span>
            <ChevronDown className="size-4 text-muted-foreground" aria-hidden />
          </div>
        </div>
      </header>
 
      <PainelNavMobile />
 
      <div className="flex">
        <PainelSidebar />
        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
