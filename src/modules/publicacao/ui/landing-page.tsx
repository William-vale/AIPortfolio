'use client'

import { ArrowRight, Check, FolderKanban, Globe2, Menu, Sparkles, UserRound, X } from 'lucide-react'
import { useState } from 'react'

const features = [
    {
        icon: UserRound,
        title: 'Como funciona',
        text: 'Cadastre seu perfil e publique um endereço para compartilhar.',
    },
    {
        icon: FolderKanban,
        title: 'Para desenvolvedores',
        text: 'Unifique experiências, projetos e habilidades em um único lugar.',
    },
    {
        icon: Globe2,
        title: 'Para recrutadores',
        text: 'Acesse o portfólio sem cadastro e receba uma versão contextualizada.',
    },
]

export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false);
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
                    <nav className='hidden items-center gap-7 text-sm font-medium text-secondary md:flex' arial-label="Navegação Principal">
                        <a href="#como-funciona" className="trasition-colors hover:text-primary">Como Funciona</a>
                        <a href="#precos" className="trasition-colors hover:text-primary">Preços</a>
                        <a href="#entrar" className="font-semibold text-primary hover:text-dark">Entrar</a>
                    </nav>
                </div>
                {menuOpen && (
                    <nav className="flex flex-col gap-4 border-t border-border px-5 py-5 text-sm font-medium md:hidden" arial-label="Navegação móvel">
                        <a href="#como-funciona" onClick={() => setMenuOpen(false)}>Como Funciona</a>
                        <a href="#precos" onClick={() => setMenuOpen(false)}>Preços</a>
                        <a href="#entrar" onClick={() => setMenuOpen(false)}>Entrar</a>
                    </nav>
                )}
            </header>

            <section id="inicio" className="bg-app px-4 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8 lg:py-24 xl:py-28">
                <div className="mx-auto max-w-[1200px] grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    <div className="flex flex-col text-left max-w-2xl mx-auto lg:mx-0">
                        <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary sm:text-sm">
                            <Sparkles size={16} strokeWidth={2.5} aria-hidden="true" className="shrink-0" />
                            Uma única fonte. Múltiplas apresentações.
                        </p>

                        <h1 className="font-heading text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-[52px]">
                            Seu perfil profissional. <br className="hidden sm:inline" /> Várias apresentações.
                        </h1>

                        <p className="mt-4 text-base leading-relaxed text-secondary sm:text-lg">
                            Mantenha suas experiências em um só lugar e apresente o que é mais relevante para cada oportunidade profissional.
                        </p>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                            <a href="#criar" className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary w-full sm:w-auto">
                                Criar meu perfil <ArrowRight size={16} aria-hidden="true" />
                            </a>
                            <a href="#como-funciona" className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-surface px-6 text-sm font-semibold text-primary transition-all hover:bg-muted active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary w-full sm:w-auto">
                                Ver como funciona
                            </a>
                        </div>
                    </div>

                    {/* Card de Visualização Lateral (Ordem 2 no Mobile e Desktop) */}
                    <div className="w-full max-w-2xl mx-auto lg:mx-0 rounded-2xl border border-border bg-surface p-5 shadow-md sm:p-8 lg:p-10">
                        {/* Interno do Card: Grid muda de 1 para 2 colunas a partir de 'sm' */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 items-center">

                            {/* Lista de Recursos */}
                            <div className="flex flex-col">
                                <h3 className="font-heading text-lg font-bold text-foreground sm:text-xl">
                                    Perfil central
                                </h3>
                                <ul className="mt-4 space-y-3 text-sm text-secondary sm:text-base">
                                    <li className="flex items-center gap-2.5">
                                        <Check size={18} className="text-primary shrink-0" aria-hidden="true" /> Experiências
                                    </li>
                                    <li className="flex items-center gap-2.5">
                                        <Check size={18} className="text-primary shrink-0" aria-hidden="true" /> Projetos
                                    </li>
                                    <li className="flex items-center gap-2.5">
                                        <Check size={18} className="text-primary shrink-0" aria-hidden="true" /> Habilidades
                                    </li>
                                </ul>
                            </div>

                            {/* Badges do Sistema */}
                            <div className="flex flex-col gap-3">
                                <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3.5 text-sm font-medium text-primary flex items-center gap-3 dynamic-badge">
                                    <span className="h-2.5 w-2.5 rounded-full bg-primary animate-pulse shrink-0" />
                                    Organização por IA
                                </div>
                                <div className="rounded-xl border border-border bg-muted px-4 py-3.5 text-sm font-semibold text-foreground">
                                    Apresentação contextualizada
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>


            <section className="border-y border-border bg-tint px-20 py-26 sm:px-8 lg:px-10">
                <p className="mx-auto max-w-[1200px] text-center font-heading text-lg font-semibold text-foreground sm:text-xl">
                    Menos tempo editando curriculos
                    <span className="mx-2 text-primary">•</span>
                    Mais relevância para quem está avaliando seu perfil
                </p>
            </section>

            <section id="como-funciona" className="bg-surface px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
                <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-3 md:gap-8">
                    {features.map(({ icon: Icon, title, text }) => (
                        <article key={title} className="border-t-2 border-primary-soft pt-5">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-md bg-primary-pale text-primary" aria-hidden="true">
                                <Icon size={20} strokeWidth={1.8} />
                            </div>
                            <h2 className="font-heading text-xl font-bold tracking-tight">{title}</h2>
                            <p className="mt-2 text-sm leading-6 text-secondary">{text}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section id="criar" className="bg-primary px-5 py-16 text-center text-primary-foreground sm:px-8 sm:py-20 lg:px-10">
                <div className="mx-auto max-w-[760px]">
                    <h2 className="font-heading text-[26px] font-bold leading-tight tracking-[-0.02em] sm:text-[32px]">
                        Pronto para organizar sua apresentação profissional?
                    </h2>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <a href="#entrar" className="inline-flex h-11 items-center justify-center rounded-md bg-surface px-5 text-sm font-semibold text-primary transition-colors hover:bg-primary-pale focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface">
                            Criar conta gratuitamente
                        </a>
                        <a href="#precos" className="inline-flex h-11 items-center justify-center rounded-md border border-surface px-5 text-sm font-semibold text-surface transition-colors hover:bg-surface/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-surface">
                            Ver planos e preços
                        </a>
                    </div>
                </div>
            </section>

            <footer id="precos" className="bg-surface px-5 py-7 text-center text-xs text-muted-foreground sm:px-8">
                <p>AI Portfolio · Perfil profissional inteligente para oportunidades relevantes.</p>
            </footer>
        </main>
    )
}