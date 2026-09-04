import { UserRound, CheckCircle2, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

type TipoAtividade = 'perfil' | 'conta' | 'ia'

interface Atividade {
    id: string
    titulo: string
    detalhe?: string
    tempo: string
    tipo: TipoAtividade
}

interface AtividadeRecentesProps {
    atividades?: Atividade[]
}

const icones: Record<TipoAtividade, typeof UserRound> = {
    perfil: UserRound,
    conta: CheckCircle2,
    ia: Sparkles,
}

const estilosIcone: Record<TipoAtividade, string> = {
    perfil: 'bg-primary-pale text-primary',
    conta: 'bg-sucess-600/10 text-success-600',
    ia: 'bg-secondary-500/10 text-secondary-700',
}

const atividadesPadrao: Atividade[] = [
    {
        id: 'perfil-atualizado',
        titulo: 'Perfil Atualizado',
        detalhe: 'Titulo & resumo profissional',
        tempo: 'há 2 meses',
        tipo: 'perfil',
    },
    {
        id: 'conta-criada',
        titulo: 'Conta criada com sucesso',
        tempo: 'há 2 meses',
        tipo: 'conta',
    },
]

export function Atividadesrecentes({
    atividades = atividadesPadrao,
}: AtividadeRecentesProps) {
    return (
        <Card>
            <CardContent className='space-y-5 p-6'>
                <h2 className='font-heading text-base font-semibold text-foreground'>
                    Atividades Recentes
                </h2>

                <ul className='space-y-4'>
                    {atividades.map((atividade) => {
                        const Icone = icones[atividade.tipo]
                        return (
                            <li key={atividade.id} className='flex items-center gap-3'>
                                <span className={`flex size-9 shrink-0 items-center justify-center rounded-full ${estilosIcone[atividade.tipo]}`}>
                                    <Icone className='size-4' />
                                </span>
                                <div className='min-w-0 flex-1'>
                                    <p className='truncate text-sm font-medium text-foreground'>
                                        {atividade.titulo}
                                        {atividade.detalhe && (
                                            <span className='font-normal text-muted-foreground'>
                                                {' '}
                                                - {atividade.detalhe}
                                            </span>
                                        )}
                                    </p>
                                </div>
                                <span className='shrink=0 text-xs text-muted-forground'>
                                    {atividade.tempo}
                                </span>
                            </li>
                        )
                    })}
                </ul>
            </CardContent>
        </Card>
    )
}