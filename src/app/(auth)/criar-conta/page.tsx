'use client'

// Página de Criação de Conta - Rota /criar-conta
// Permite cadastro via OAuth (GitHub/Google) ou formulário de email/senha
import { useState } from 'react'
import Link from 'next/link'
import { siGoogle, siGithub } from "simple-icons";
import { BrandIcon } from "@/components/ui/brand-icon";
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function SignUpPage() {
  // Estados do formulário
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Validação de senha (mínimo 8 caracteres, letras e números)
  const isValidPassword = (pwd: string): boolean => {
    const hasMinLength = pwd.length >= 8
    const hasLetters = /[a-zA-Z]/.test(pwd)
    const hasNumbers = /\d/.test(pwd)
    return hasMinLength && hasLetters && hasNumbers
  }

  // Handler para cadastro com email/senha
  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validações
    if (!acceptTerms) {
      setError('Você deve aceitar os termos de uso e política de privacidade.')
      return
    }

    if (!isValidPassword(password)) {
      setError('A senha deve ter no mínimo 8 caracteres, combinando letras e números.')
      return
    }

    setIsLoading(true)

    try {
      // TODO: Implementar cadastro com Supabase
      // const { data, error } = await supabase.auth.signUp({
      //   email,
      //   password,
      //   options: {
      //     data: { full_name: fullName }
      //   }
      // })

      // Em produção: redirecionar para confirmação de email ou dashboard
      console.log('Cadastro:', { fullName, email })

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao criar conta')
    } finally {
      setIsLoading(false)
    }
  }

  // Handler para OAuth (GitHub)
  const handleGitHubSignUp = async () => {
    setIsLoading(true)
    try {
      // TODO: Implementar cadastro com GitHub via Supabase
      // await supabase.auth.signInWithOAuth({
      //   provider: 'github',
      //   options: { redirectTo: `${window.location.origin}/auth/callback` }
      // })
      console.log('Cadastro com GitHub')
    } catch (err) {
      setError('Erro ao cadastrar com GitHub')
    } finally {
      setIsLoading(false)
    }
  }

  // Handler para OAuth (Google)
  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      // TODO: Implementar cadastro com Google via Supabase
      // await supabase.auth.signInWithOAuth({
      //   provider: 'google',
      //   options: { redirectTo: `${window.location.origin}/auth/callback` }
      // })
      console.log('Cadastro com Google')
    } catch (err) {
      setError('Erro ao cadastrar com Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      {/* Cabeçalho do Card com título e descrição */}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-foreground">
          Crie seu perfil profissional
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Um único perfil. Múltiplas apresentações relevantes para cada oportunidade.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Botões de OAuth */}
        <div className="grid grid-cols-2 gap-3">
          {/* Botão GitHub */}
          <Button
            variant="outline"
            onClick={handleGitHubSignUp}
            disabled={isLoading}
            className="w-full"
          >
            <BrandIcon icon={siGithub} className="size-4" />
            Continuar com GitHub
          </Button>

          {/* Botão Google */}
          <Button
            variant="outline"
            onClick={handleGoogleSignUp}
            disabled={isLoading}
            className="w-full"
          >
            <BrandIcon icon={siGoogle} className="size-4" />
            Continuar com Google
          </Button>
        </div>

        {/* Separador "ou cadastre-se com e-mail" */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface px-2 text-muted-foreground">
              ou cadastre-se com e-mail
            </span>
          </div>
        </div>

        {/* Formulário de cadastro */}
        <form onSubmit={handleEmailSignUp} className="space-y-4">
          {/* Campo Nome Completo */}
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Nome completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Campo Email */}
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Campo Senha com validação */}
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              error={
                password && !isValidPassword(password)
                  ? 'Mínimo de 8 caracteres, combinando letras e números.'
                  : undefined
              }
            />
            {/* Dica de senha */}
            <p className="text-xs text-muted-foreground">
              Mínimo de 8 caracteres, combinando letras e números.
            </p>
          </div>

          {/* Checkbox de Aceite dos Termos */}
          <div className="space-y-2">
            <Checkbox
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              containerClassName="items-start"
              label={
                <span className="text-sm text-secondary">
                  Aceito os{' '}
                  <Link
                    href="/termos-de-uso"
                    className="text-primary hover:text-primary-dark underline"
                    target="_blank"
                  >
                    termos de uso
                  </Link>{' '}
                  e a{' '}
                  <Link
                    href="/politica-de-privacidade"
                    className="text-primary hover:text-primary-dark underline"
                    target="_blank"
                  >
                    política de privacidade
                  </Link>
                </span>
              }
            />
          </div>

          {/* Mensagem de erro geral */}
          {error && (
            <div className="p-3 rounded-lg bg-error-600/10 border border-error-600/20">
              <p className="text-sm text-error-600">{error}</p>
            </div>
          )}

          {/* Botão de Criar Conta */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !acceptTerms}
          >
            {isLoading ? 'Criando conta...' : 'Criar conta'}
          </Button>
        </form>
      </CardContent>

      {/* Footer com link para login */}
      <CardFooter className="flex justify-center pb-6">
        <p className="text-sm text-muted-foreground">
          Já possui conta?{' '}
          <Link
            href="/entrar"
            className="text-primary font-medium hover:text-primary-dark transition-colors"
          >
            Entrar
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
