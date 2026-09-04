import { BannerProximaAcao } from '@/modules/perfil'
import { CardPublicacao } from '@/modules/publicacao'
import { CardCota, UpsellGeracoes } from '@/modules/cobranca'
import { Atividadesrecentes } from '@/modules/identidade'
/*

import { AtividadesRecentes } from '@/modules/identidade' */

export default function PainelPage() {
    return (
        <div className='mx-auto w-full max-w-5xl space-y-8'>
            <header className='space-y-1'>
                <h1 className='font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl'>
                    Olá Camila
                </h1>
                <p className='text-muted-foreground'>
                    Aqui está o resumo do seu perfil profissional
                </p>
            </header>

            <BannerProximaAcao />

            <div className='grid gap-6 lg:grid-cols-2'>
                <CardPublicacao />
                <CardCota />
                <Atividadesrecentes />
                <UpsellGeracoes />

            </div>
        </div>
    )
}