import Link from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

interface CardCotaProps {
    usadas?: number
    limite?: number
    href?: string
}

export function CardCota({
    usadas = 1,
    limite = 3,
    href = '/painel/assinatura'
}: CardCotaProps) {
    const percentual = Math.min(100, Math.round((usadas / Math.max(1, limite)) * 100))

    return (
        <Card className='h-full'>
            <CardContent className='flex h-full flex-col gap-4 p-6'>
                <div className='flex items-center gap-3'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-md bg-secondary-500/10 text-secondary-700'>
                        <Sparkles className='size-5' />
                    </div>
                    <h3 className='font-heading text-base font-semibold text-foreground'>
                        Apresentações por IA
                    </h3>
                </div>

                <div className='space-y-2'>
                    <div className='flex items-center justify-between'>
                        <span className='text-sm font-medium text-foreground'>
                            {usadas} de {limite} gerações
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {percentual}%
                        </span>
                    </div>
                    <div
                        className='h-2 w-full overflow-hidden rounded-full bg-bg-subtle' role='progressbar'
                        aria-valuenow={percentual}
                        aria-valuemin={0}
                        aria-valuemax={100}
                    >
                        <div
                            className='h-full rounded-full bg-secondary-500 transition-all duration-500'
                            style={{ width: `${percentual}` }}
                        />
                    </div>
                </div>

                <p className='text-sm leading-relaxed text-muted-foreground'>
                    Ganhe mais visibilidade com a IA. Cada apresentação contextualizada usa uma das
                    suas gerações disponíveis no plano atual.
                </p>

                <div className='mt-auto'>
                    <Link
                        href={href}
                        className='inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark'
                    >
                        Ver planos
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

            </CardContent>
        </Card >
    )
}