import { ReactNode } from 'react'

interface PainelLayoutProps {
    children: ReactNode
}

// OBRIGATÓRIO: Usar "export default" na função do componente
export default function PainelLayout({ children }: PainelLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            {/* Você pode adicionar wrappers aqui, como uma Sidebar ou Header */}
            <main>{children}</main>
        </div>
    )
}