import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

interface BannerProximaAcaoProps {
    completude?: número
    href?: string
}

export function BannerProximaAcao({
    completude = 40,
    href = '/painel/perfil',
}: BannerProximaAcaoProps) {
    return (
        <section className="relative overflow-hidden rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 text-white">
            <div className='flex flex-col gap-6 px-6 py-6 sm:px-8 sm:flex-row sm:items-center sm:justify-between'>
                <div className='max-w-l space-y-2'>
                    <p className='text-xs font-semibold uppercase tracking-widest text-indigo-200'>
                        Proxima ação recomendada
                    </p>
                    <h2 className='font-heading text-xl font-bold sm:text-2xl'>
                        Seu perfil está {completude}% completo
                    </h2>
                    <p className='text-sm leading-relaxed text-indigo-100/90'>
                        Adicione pelo menos uma experiência e um projeto com resultados mensuráveis para publicas seu portfólio com confiança.
                    </p>
                </div>
                <Link
                    href={href}
                    className={cn(
                        buttonVariants({ size: 'lg' }),
                        'h-11 shrink-0 gap-2 bg-white px-5 text-primary-600 hover:bg-indigo-50 hover:text-primary-700'
                    )}
                >
                    Continuar preenchimento
                    <ArrowRight className='size-4' />
                </Link>
            </div>
        </section>
    )
}