'use client'

// Página de Login - Rota /entrar
// Permite autenticação via OAuth (GitHub/Google) ou email/senha
import { useState } from 'react'
import Link from 'next/link'
import { Github, Chrome } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function LoginPage() {
  // Estados do formulário
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Handler para login com email/senha
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // TODO: Implementar lógica de login com Supabase
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // })
      
      // Simulação de erro para demonstração (remover em produção)
      if (email === 'erro@exemplo.com') {
        throw new Error('E-mail ou senha incorretos.')
      }

      // Em produção: redirecionar para o dashboard
      console.log('Login:', { email, rememberMe })
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao fazer login')
    } finally {
      setIsLoading(false)
    }
  }

  // Handler para OAuth (GitHub)
  const handleGitHubLogin = async () => {
    setIsLoading(true)
    try {
      // TODO: Implementar login com GitHub via Supabase
      // await supabase.auth.signInWithOAuth({
      //   provider: 'github',
      //   options: { redirectTo: `${window.location.origin}/auth/callback` }
      // })
      console.log('Login com GitHub')
    } catch (err) {
      setError('Erro ao login com GitHub')
    } finally {
      setIsLoading(false)
    }
  }

  // Handler para OAuth (Google)
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      // TODO: Implementar login com Google via Supabase
      // await supabase.auth.signInWithOAuth({
      //   provider: 'google',
      //   options: { redirectTo: `${window.location.origin}/auth/callback` }
      // })
      console.log('Login com Google')
    } catch (err) {
      setError('Erro ao login com Google')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      {/* Cabeçalho do Card com título e descrição */}
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-foreground">
          Entre na sua conta
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Acesse seu painel para continuar organizando seu portfólio.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Botões de OAuth */}
        <div className="grid grid-cols-2 gap-3">
          {/* Botão GitHub */}
          <Button
            variant="outline"
            onClick={handleGitHubLogin}
            disabled={isLoading}
            className="w-full"
          >
            <Github className="mr-2 size-4" />
            Continuar com GitHub
          </Button>

          {/* Botão Google */}
          <Button
            variant="outline"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full"
          >
            <Chrome className="mr-2 size-4" />
            Continuar com Google
          </Button>
        </div>

        {/* Separador "ou entre com e-mail" */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface px-2 text-muted-foreground">
              ou entre com e-mail
            </span>
          </div>
        </div>

        {/* Formulário de email/senha */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          {/* Campo de Email */}
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
              error={error ? 'E-mail ou senha incorretos.' : undefined}
            />
          </div>

          {/* Campo de Senha */}
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>

          {/* Checkbox Lembrar acesso + Link Esqueceu senha */}
          <div className="flex items-center justify-between">
            <Checkbox
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              label="Lembrar acesso"
            />
            <Link
              href="/recuperar-senha"
              className="text-sm text-primary hover:text-primary-dark transition-colors"
            >
              Esqueceu sua senha?
            </Link>
          </div>

          {/* Botão de Entrar */}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </CardContent>

      {/* Footer com link para criar conta */}
      <CardFooter className="flex justify-center pb-6">
        <p className="text-sm text-muted-foreground">
          Ainda não possui conta?{' '}
          <Link
            href="/criar-conta"
            className="text-primary font-medium hover:text-primary-dark transition-colors"
          >
            Criar conta
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
