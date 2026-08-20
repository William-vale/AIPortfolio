'use client - uso do cliente'

import { X, Globe2, ArrowRigth, Check, FolderKanban, UserRound } from 'lucide-react'
import { useState } from 'react'

const features = [
    {
        icon: UserRound,
        title: 'Como funciona',
        text: 'Cadastre o suas informações profissionais uma vez e publique um endereço público para compartilhamento.',
    },
    {
        icon: FolderKanban,
        title: 'Para desenvolvedores',
        text: 'Unifique experiências, projetos e habilidades em um só lugar.',
    },
    {
        icon: Globe2,
        title: 'Para recrutadores',
        text: 'Acesse o portfólio personalizado sem cadastro.',
    },
]

export default function Home() {
    const [menuOpen, SetMenuOpen] = useState(false)

    
}