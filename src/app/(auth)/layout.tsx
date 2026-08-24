// Layout específico para rotas de autenticação
// Aplica estilos e estrutura comuns para todas as páginas de auth
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Portfolio — Autenticação',
  description: 'Acesse sua conta ou crie um novo perfil profissional',
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // Container centralizado com background sutil
    <div className="min-h-screen bg-bg-app flex items-center justify-center p-4">
      {/* 
        Container do conteúdo com largura máxima
        Responsivo para mobile e desktop
      */}
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
