'use client'

import { ArrowRight, Check, FolderKanban, Globe2, Menu, Sparkles, UserRound, X } from 'lucide-react'
import { useState } from 'react'

const features = [
    {
        icon: UserRound,
        title: 'Como funciona',
        text: 'Cadastre seu perfil uma vez e compartilhe um endereço público.'
    },
    {
        icon: FolderKanban,
        title: 'Para desenvolvedores',
        text: 'Unifique experiências, projetos e habilidades em um só lugar.'
    },
    {
        icon: Globe2,
        title: 'Para recrutadores',
        text: 'Acesse o portfólio personalizado sem cadastro.'
    },
]

export default function Home() {
    const [menuOpen, SetMenuOpen] = useState(false);
    return (
        <main className="min-h-screen ">

        </main>
    );

}