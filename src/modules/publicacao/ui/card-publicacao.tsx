import Link from 'next/link'
import { Globe2, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CardPublicacaoProps {
    href?: string
}

export function CardPublicacao({
    href = '/painel/publicacao'
}: CardPublicacaoProps) {
    return (
        <Card className='h-full'>
            <CardContent className='flex h-full flex-col gap-4 p-6'>
                <div className='flex items-center gap-3'>
                    <div className='flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-pale text-primary'>
                        <Globe2 className='size-5' />
                    </div>
                    <h3 className='flex-1 font-heading text-base font-semibold text-foreground'>
                        Publicação
                    </h3>
                    <Badge className='bg-warning-600/10 text-warning-600'>
                        Não publicado
                    </Badge>
                </div>

                <p className='text-sm leading-relaxed text-muted-foreground'>
                    Seu portfólio ainda não está ativo para candidaturas. Publique para que recrutadores encontrem suas experiências e projetos.
                </p>

                <div>
                    <Link
                        href={href}
                        className={cn(buttonVariants({ size: 'lg' }), 'h-11 gap-2 px-5')}
                    >
                        Publicar Portfólio
                        <Plus className='size-4' />
                    </Link>
                </div>
            </CardContent>
        </Card>
    )
}