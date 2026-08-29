import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'

interface UpsellGeracoesProps {
    href?: string
}

export function UpsellGeracoes({
    href = '/painel/assinatura'
}: UpsellGeracoesProps) {
    return (
        <div className='rounded-lg border border-primary-soft bg-primary-pale p-4'>
            <div className='flex items-start gap-3'>
                <div className='flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-white'>
                    <Sparkles className='size-4' />
                </div>
                <div className='space-y-1'>
                    <p className='text-sm font-semibold leading-snug text-foregorund'>
                        Desbloqueie mais gerações
                    </p>
                    <p className='text-xs leading-snug text-muted-foregorund'>
                        Aumente sua cota de apresentações por IA no plano Essencial.
                    </p>
                    <Link
                        href={href}
                        className='inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-dark'
                    >
                        Ver Planos
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>
            </div>
        </div>
    )
}