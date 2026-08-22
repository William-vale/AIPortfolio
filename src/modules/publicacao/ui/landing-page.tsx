'use client'

import { ArrowRight, Check, FolderKanban, Globe2, Menu, Sparkles, UserRound, X } from 'lucide-react'
import { useState } from 'react'

const features = [
    {
        icon: UserRound,
        title: 'Como funciona',
        text: 'Cadastre seu perfil uma vez e publique um endereço público para compartilhar.',
    },
    {
        icon: FolderKanban,
        title: 'Para desenvolvedores',
        text: 'Centralize experiências, projetos e habilidades em um único lugar.',
    },
    {
        icon: Globe2,
        title: 'Para recrutadores',
        text: 'Acesse o portfólio sem cadastro e receba uma versão contextualizada.',
    },
]

export default function Home() {
    const [menuOpen, setmenuOpen] = useState(false);
    const menuLabel = menuOpen ? 'Fechar menu' : 'Abrir menu';

    return (
        <main className="min-h-screen bg-background text-foreground">
            <header className='border-b border-border bg-surface'>
                <div className='mx-auto flex max-w-[1200px] items-center justify-between px-5 py-5 sm:px-8 lg:px-10'>
                    <a href="#inicio" className='font-heading text-[18px] font-bold tracking-tight text-foreground'>
                        aiportfolio.dev
                    </a>
                    <button type='button' arial-label={menuLabel} className='flex h-11 w-11 items-center justify-center rounded-md text-muted-foreground md:hidden' onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>


                </div>
            </header>
        </main>
    )
}