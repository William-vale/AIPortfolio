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
    const [MenuOpen, setMenuOpen] = useState(false);

    return (
        <main className="min-h-screen">

        </main>
    )
}