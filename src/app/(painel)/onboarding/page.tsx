'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Briefcase,
  MapPin,
  Clock,
  FileText,
  Code2,
  ArrowRight,
  Sparkles,
  Shield,
  Check,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { TagInput } from '@/components/ui/tag-input'
import { ProgressBar } from '@/components/ui/progress'
import { ProfilePreview } from '@/components/profile-preview'
import { Card, CardContent } from '@/components/ui/card'

// Opções de tempo de experiência
const experienceOptions = [
  { value: 'iniciante', label: 'Iniciante' },
  { value: '1-3', label: '1-3 anos' },
  { value: '3-6', label: '3-6 anos' },
  { value: '6+', label: '6+ anos' },
] as const

export default function OnboardingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  
  // Estados do formulário
  const [fullName, setFullName] = useState('Camila Martins')
  const [professionalTitle, setProfessionalTitle] = useState('Desenvolvedora Full Stack')
  const [location, setLocation] = useState('Florianópolis, SC')
  const [experience, setExperience] = useState('3-6')
  const [bio, setBio] = useState('Construo produtos digitais com foco em clareza, escala e impacto — do desenho da API à experiência final do usuário.')
  const [technologies, setTechnologies] = useState(['React', 'Node.js', 'PostgreSQL'])

  // Calcular completude do perfil
  const calculateCompleteness = () => {
    let score = 0
    const maxScore = 5

    if (fullName.trim()) score++
    if (professionalTitle.trim()) score++
    if (location.trim()) score++
    if (bio.trim().length >= 50) score++
    if (technologies.length > 0) score++

    return Math.round((score / maxScore) * 100)
  }

  const [completeness, setCompleteness] = useState(0)

  useEffect(() => {
    setCompleteness(calculateCompleteness())
  }, [fullName, professionalTitle, location, bio, technologies])

  // Gerar bio com IA
  const handleGenerateBio = async () => {
    if (!professionalTitle) return
    
    setIsLoading(true)
    // Simulação de geração de bio
    setTimeout(() => {
      setBio(`Profissional apaixonada por tecnologia com experiência como ${professionalTitle.toLowerCase()}. Foco em criar soluções escaláveis, código limpo e experiências de usuário excepcionais.`)
      setIsLoading(false)
    }, 1000)
  }

  // Salvar perfil
  const handleSaveProfile = async () => {
    setIsLoading(true)
    
    try {
      // TODO: Salvar no Supabase
      // const { error } = await supabase
      //   .from('profiles')
      //   .update({
      //     full_name: fullName,
      //     professional_title: professionalTitle,
      //     location,
      //     experience,
      //     bio,
      //     technologies,
      //   })
      //   .eq('id', user.id)
      
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Redirecionar para o painel
      router.push('/painel')
    } catch (error) {
      console.error('Erro ao salvar perfil:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Pular onboarding
  const handleSkip = () => {
    router.push('/painel')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-app via-bg-app to-primary-pale">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-xl font-bold text-foreground font-heading">
                aiportfolio.dev
              </span>
            </div>

            {/* Etapa e pular */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm text-muted-foreground">
                <div className="size-2 rounded-full bg-primary" />
                <span>Etapa 1 de 1 · Perfil inicial</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="gap-1"
              >
                Pular por agora
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner de sucesso */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-pale text-primary text-sm font-medium">
            <Sparkles className="size-4" />
            Conta criada. Vamos começar sua fonte de verdade
          </div>
        </div>

        {/* Título */}
        <div className="mb-8 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground font-heading mb-3">
            Vamos montar a base do seu{' '}
            <span className="text-primary">perfil central</span>.
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Nada aqui é obrigatório: preencha o que fizer sentido agora e complete o resto
            quando quiser direto no painel. É esse conteúdo que a IA vai reorganizar —
            nunca reescrever — para cada oportunidade.
          </p>
        </div>

        {/* Layout de 2 colunas */}
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Coluna esquerda - Formulário */}
          <div className="lg:col-span-3">
            <Card className="border-border/50">
              <CardContent className="p-6 sm:p-8 space-y-8">
                {/* Boas-vindas */}
                <div className="flex items-center gap-3 p-3 rounded-lg bg-bg-subtle">
                  <Avatar 
                    fallback={fullName ? fullName.charAt(0).toUpperCase() : 'C'}
                    className="size-10"
                  />
                  <span className="font-medium text-foreground">
                    Bem-vinda, {fullName.split(' ')[0] || 'Camila'} 👋
                  </span>
                </div>

                {/* Título profissional e Localização */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground">
                      <Briefcase className="size-4 text-primary" />
                      Título profissional
                    </label>
                    <Input
                      value={professionalTitle}
                      onChange={(e) => setProfessionalTitle(e.target.value)}
                      placeholder="Ex: Desenvolvedor Full Stack"
                    />
                    <p className="text-xs text-muted-foreground">
                      Aparece logo abaixo do seu nome no portfólio público.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center justify-between text-sm font-medium text-foreground">
                      <span className="flex items-center gap-2">
                        <MapPin className="size-4 text-primary" />
                        Localização
                      </span>
                      <span className="text-xs text-muted-foreground">opcional</span>
                    </label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Ex: Florianópolis, SC"
                    />
                  </div>
                </div>

                {/* Tempo de experiência */}
                <div className="space-y-3">
                  <label className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span className="flex items-center gap-2">
                      <Clock className="size-4 text-primary" />
                      Tempo de experiência
                    </span>
                    <span className="text-xs text-muted-foreground">opcional</span>
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {experienceOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setExperience(option.value)}
                        className={`
                          px-4 py-2 rounded-full text-sm font-medium transition-all
                          ${experience === option.value
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-bg-subtle text-foreground hover:bg-border'
                          }
                        `}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Resumo profissional */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span className="flex items-center gap-2">
                      <FileText className="size-4 text-primary" />
                      Resumo profissional
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground">opcional</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleGenerateBio}
                        disabled={!professionalTitle || isLoading}
                        className="h-8 gap-1 text-primary hover:text-primary-dark hover:bg-primary-pale"
                      >
                        <Sparkles className="size-3.5" />
                        Sugerir com IA
                      </Button>
                    </div>
                  </label>
                  <Textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Fale sobre sua trajetória, paixões tecnológicas e o tipo de impacto que você busca gerar..."
                    className="min-h-[100px]"
                  />
                </div>

                {/* Principais tecnologias */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span className="flex items-center gap-2">
                      <Code2 className="size-4 text-primary" />
                      Principais tecnologias
                    </span>
                    <span className="text-xs text-muted-foreground">opcional</span>
                  </label>
                  <TagInput
                    tags={technologies}
                    onTagsChange={setTechnologies}
                    placeholder="React, Node.js..."
                  />
                </div>

                {/* Ações */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isLoading}
                    className="flex-1 sm:flex-none gap-2 bg-primary hover:bg-primary-dark"
                  >
                    Salvar e ir para o painel
                    <ArrowRight className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={handleSkip}
                    disabled={isLoading}
                  >
                    Prefiro completar depois
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Coluna direita - Preview e Info */}
          <div className="lg:col-span-2 space-y-4">
            {/* Preview em tempo real */}
            <div>
              <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                Prévia em tempo real
              </h3>
              <ProfilePreview
                fullName={fullName}
                professionalTitle={professionalTitle}
                location={location}
                technologies={technologies}
              />
            </div>

            {/* Barra de completude */}
            <Card>
              <CardContent className="p-4">
                <ProgressBar value={completeness} />
              </CardContent>
            </Card>

            {/* Por que pedimos isso */}
            <Card className="bg-primary-pale/30 border-primary/20">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start gap-2">
                  <Shield className="size-4 text-primary mt-0.5" />
                  <h4 className="text-sm font-semibold text-foreground">
                    Por que pedimos isso
                  </h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="size-3.5 text-success-600 mt-0.5 shrink-0" />
                    <span>Nada é obrigatório — você decide o que preencher agora.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="size-3.5 text-success-600 mt-0.5 shrink-0" />
                    <span>Você edita tudo isso quando quiser, direto no painel.</span>
                  </li>
                  <li className="flex items-start gap-2 text-xs text-muted-foreground">
                    <Check className="size-3.5 text-success-600 mt-0.5 shrink-0" />
                    <span>A IA reorganiza esse conteúdo para cada vaga — nunca reescreve.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
