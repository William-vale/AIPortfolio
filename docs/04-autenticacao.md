# Parte 4 — Autenticação

**Projeto:** AI Portfolio  
**Status:** Planejamento técnico e segurança  
**Escopo:** Supabase Auth integrado ao PostgreSQL, com signup, login, logout, proteção de rotas e sessão no servidor.

## 1. Objetivo

Implementar autenticação segura para o AI Portfolio usando o Supabase Auth como provedor de identidade e o PostgreSQL como banco de dados da aplicação. A solução deve oferecer cadastro, login, logout, sessão validada no servidor e proteção de rotas, sem expor secrets no client.

A implementação será feita em diffs pequenos, alterando um arquivo por vez e executando validações antes de avançar.

## 2. Princípios de segurança

- Nenhuma chave secreta será enviada ao navegador.
- A `service_role` será exclusiva do servidor e nunca poderá ter prefixo `NEXT_PUBLIC_`.
- O servidor não confiará em `user_id` enviado pelo client; a identidade será derivada da sessão validada.
- Middleware será uma primeira barreira, mas cada operação sensível também validará autenticação e autorização no servidor.
- O PostgreSQL usará Row-Level Security (RLS) para isolar os dados entre usuários.
- Tokens não serão armazenados manualmente em `localStorage` nem enviados em URLs.
- Mensagens de erro não revelarão se um e-mail está cadastrado.
- Redirects serão limitados a destinos internos previamente permitidos.

## 3. Arquitetura

| Componente | Responsabilidade | Exposição |
|---|---|---|
| Supabase Auth | Cadastro, login, logout, confirmação de e-mail e recuperação de senha | API pública controlada |
| PostgreSQL/Supabase | Dados de negócio do AI Portfolio | Servidor e/ou RLS |
| Cliente Supabase browser | Operações iniciadas pela interface | URL pública e chave anon/publishable |
| Cliente Supabase server | Leitura e renovação da sessão por cookies | Somente servidor |
| Middleware | Atualização de sessão e proteção inicial de rotas | Servidor/Edge |
| Camada de aplicação | Regras de negócio e autorização | Somente servidor |
| Tabela `profiles` | Dados de perfil associados ao usuário | Protegida por RLS |
| `auth.users` | Identidade gerenciada pelo Supabase | Não manipulada diretamente pela aplicação |

### Fluxo de autenticação

1. O usuário preenche o formulário de cadastro ou login.
2. O cliente Supabase chama o Supabase Auth usando somente a chave pública.
3. O Supabase autentica o usuário.
4. A sessão é mantida por cookies compatíveis com SSR.
5. O middleware atualiza a sessão nas requisições relevantes.
6. Server Components, Server Actions e Route Handlers consultam o usuário no servidor.
7. A aplicação usa o UUID do usuário autenticado como proprietário dos dados.
8. RLS e verificações server-side reforçam a autorização.

## 4. Variáveis de ambiente

### Permitidas no client

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

Quando suportado pela configuração do projeto, a chave pública também pode ser nomeada como `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.

### Exclusivas do servidor

```env
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
```

A `SUPABASE_SERVICE_ROLE_KEY` só deve existir se houver uma necessidade administrativa real. Operações comuns de autenticação e negócio devem usar a sessão do usuário e RLS, não a `service_role`.

### Regras

- Nunca usar `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`.
- Nunca imprimir variáveis de ambiente em logs.
- Nunca commitar valores reais em `.env.example`.
- Manter arquivos `.env` reais fora do Git.
- Rotacionar imediatamente qualquer credencial que tenha sido exposta.
- Verificar o bundle client para garantir que nenhum secret foi incorporado.

## 5. Riscos e controles

### 5.1 Configuração de ambiente

**Riscos:** exposição da `service_role`, commit acidental de credenciais, uso do projeto Supabase incorreto, logs com secrets e uso de chave privilegiada em código acessível ao navegador.

**Controles:** separar variáveis públicas e privadas, validar o ambiente na inicialização, manter `.env.example` sem valores reais e automatizar verificações que rejeitem secrets em módulos client.

### 5.2 Signup

**Riscos:** enumeração de usuários, ausência de confirmação de e-mail, criação massiva de contas, senhas fracas, redirects abertos e perfis duplicados.

**Controles:** habilitar confirmação de e-mail, usar mensagens genéricas, aplicar rate limit/CAPTCHA quando necessário, configurar política de senha, validar e normalizar e-mails, usar allowlist de redirects e criar perfis de forma idempotente.

### 5.3 Login

**Riscos:** força bruta, credential stuffing, enumeração de contas, armazenamento inseguro de tokens e vazamento por logs ou URLs.

**Controles:** aplicar rate limit, usar mensagens genéricas, utilizar cookies gerenciados pela integração SSR, não persistir tokens manualmente e nunca colocar tokens na query string.

### 5.4 Cookies e sessão server-side

**Riscos:** cookies sem proteção, sessão obsoleta, confiança em dados client-side, cache compartilhado e CSRF em mutações.

**Controles:** usar a integração oficial SSR, renovar a sessão no middleware, configurar `HttpOnly`, `Secure` em produção e `SameSite` adequado, revalidar o usuário no servidor, desabilitar cache compartilhado e adotar proteção CSRF para operações baseadas em cookie.

### 5.5 Proteção de rotas

**Riscos:** proteger apenas a interface, esquecer APIs, usar middleware como única autorização, permitir acesso por alteração de IDs e redirects externos.

**Controles:** proteger middleware, layouts, Server Actions e Route Handlers; validar autorização por recurso; usar RLS; validar parâmetros; manter lista explícita de rotas públicas; restringir redirects.

### 5.6 Logout

**Riscos:** logout apenas visual, cookies persistentes, cache exibindo dados anteriores e invalidação incompleta.

**Controles:** encerrar a sessão no Supabase, limpar cookies, redirecionar para uma rota pública, limpar estado client e invalidar caches privados.

### 5.7 PostgreSQL e RLS

**Riscos:** tabelas sem RLS, políticas permissivas, `owner_id` controlado pelo client, views que expõem dados privados e uso excessivo da `service_role`.

**Controles:** ativar RLS em tabelas de usuário, usar `auth.uid()`, impedir alteração do proprietário, restringir views e funções e testar isolamento entre usuários.

## 6. Modelo de dados

A identidade deve permanecer no schema gerenciado pelo Supabase. As tabelas da aplicação devem referenciar o UUID de `auth.users`.

### Tabela de perfil

```sql
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text,
  slug text unique,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "usuario pode ler o proprio perfil"
on public.profiles
for select
to authenticated
using (id = auth.uid());

create policy "usuario pode criar o proprio perfil"
on public.profiles
for insert
to authenticated
with check (id = auth.uid());

create policy "usuario pode atualizar o proprio perfil"
on public.profiles
for update
to authenticated
using (id = auth.uid())
with check (id = auth.uid());
```

### Separação entre privado e público

- `profiles`: dados privados e de conta.
- `portfolio_items`: projetos e experiências pertencentes ao usuário.
- `profile_versions`: versões contextualizadas geradas pela IA.
- `portfolio_publications`: conteúdo deliberadamente publicado.

Conteúdo público deve ser exposto por uma view ou endpoint que retorne somente os campos destinados à publicação. A tabela privada não deve ser liberada diretamente sem políticas específicas.

## 7. Contratos funcionais

### Signup

**Entrada:**

```ts
{
  email: string;
  password: string;
  nome: string;
}
```

**Comportamento:**

1. Validar formato, tamanho e política de senha.
2. Normalizar o e-mail.
3. Enviar o cadastro ao Supabase Auth.
4. Nunca armazenar a senha na aplicação.
5. Criar ou preparar o perfil de modo idempotente.
6. Informar a necessidade de confirmação de e-mail.
7. Não retornar secrets ou tokens em uma resposta própria.

**Resultado:**

```ts
{
  success: true;
  requiresEmailConfirmation: boolean;
}
```

### Login

**Entrada:**

```ts
{
  email: string;
  password: string;
}
```

**Resultado:**

```ts
{
  success: true;
  userId: string;
}
```

Falhas devem usar mensagem genérica e não distinguir usuário inexistente, senha incorreta ou conta não confirmada.

### Logout

O logout deve encerrar a sessão no provedor, limpar cookies, redirecionar para rota pública e impedir que dados antigos sejam exibidos por cache.

### Sessão server-side

A aplicação deve centralizar a leitura do usuário autenticado em uma função equivalente a:

```ts
async function obterUsuarioAtual() {
  // Cria o cliente Supabase server-side.
  // Valida a sessão e retorna o usuário ou null.
}
```

Módulos de domínio não devem interpretar cookies ou JWT manualmente quando a integração oficial estiver disponível.

## 8. Organização de pastas

A estrutura existente contém o módulo de identidade em:

- `src/modules/identidade/index.ts`
- `src/modules/identidade/infra/provedor-autenticacao.ts`
- `src/modules/identidade/aplicacao/autenticar.ts`
- `src/modules/identidade/aplicacao/criar-conta.ts`
- `src/modules/identidade/ui/formulario-login.tsx`
- `src/modules/identidade/ui/formulario-cadastro.tsx`

Estrutura sugerida:

```text
src/
  app/
    (auth)/
      login/
        page.tsx
      cadastro/
        page.tsx
      confirmar-email/
        page.tsx
    (painel)/
      layout.tsx
      painel/
        page.tsx
    auth/
      callback/
        route.ts
  lib/
    supabase/
      browser.ts
      server.ts
      middleware.ts
  modules/
    identidade/
      aplicacao/
        autenticar.ts
        criar-conta.ts
        encerrar-sessao.ts
        obter-usuario-atual.ts
      infra/
        provedor-autenticacao.ts
      ui/
        formulario-login.tsx
        formulario-cadastro.tsx
```

Essa estrutura deve ser ajustada às convenções já adotadas no projeto, evitando a criação de padrões concorrentes.

## 9. Plano de implementação incremental

A regra operacional é: **um arquivo por vez, diff pequeno e validação imediata**.

### Diff 0 — Validação do projeto

Confirmar framework, versão, App Router, driver PostgreSQL, Drizzle, scripts de lint/typecheck/teste, dependências, rotas públicas e rotas privadas.

**Critério:** não executar alterações antes de identificar onde cada variável de ambiente será consumida.

### Diff 1 — `.env.example`

Adicionar somente nomes de variáveis, sem valores reais. Confirmar `.gitignore` e procurar qualquer chave privilegiada com prefixo público.

### Diff 2 — `package.json`

Adicionar as dependências oficiais necessárias, normalmente `@supabase/ssr` e `@supabase/supabase-js`, sem substituir o acesso PostgreSQL existente sem necessidade.

### Diff 3 — Configuração de ambiente

Criar uma função server-side que valide variáveis obrigatórias e nunca retorne secrets a módulos client.

### Diff 4 — Cliente browser

Criar o cliente Supabase para componentes client usando somente URL e chave pública.

### Diff 5 — Cliente server

Criar o cliente SSR com acesso aos cookies da requisição, restrito a módulos server.

### Diff 6 — Middleware

Atualizar a sessão antes de avaliar rotas privadas, usando matcher restrito e allowlist para redirects.

### Diff 7 — Signup

Implementar validação, cadastro, confirmação de e-mail, mensagens seguras e criação idempotente do perfil.

### Diff 8 — Login

Implementar login sem armazenamento manual de tokens, com rate limit no ponto adequado e redirect interno.

### Diff 9 — Sessão no servidor

Criar função central para obter e validar o usuário atual em layouts, Server Actions e Route Handlers.

### Diff 10 — Proteção do painel

Alterar `src/app/(painel)/layout.tsx` para verificar a sessão no servidor e impedir cache compartilhado de conteúdo privado.

### Diff 11 — Logout

Encerrar a sessão, remover cookies, limpar estado relacionado e redirecionar para rota pública.

### Diff 12 — Migration e RLS

Adicionar migrations para tabelas da aplicação e políticas de isolamento entre usuários.

## 10. Testes obrigatórios

### Unitários

- E-mail inválido.
- Senha fora da política.
- Normalização de e-mail.
- Mensagens de erro genéricas.
- Redirect permitido.
- Redirect externo rejeitado.
- Usuário autenticado identificado.
- Usuário ausente tratado como não autenticado.

### Integração

- Signup com confirmação de e-mail.
- Login válido.
- Login inválido.
- Logout.
- Sessão persistida entre requisições.
- Sessão expirada.
- Criação idempotente de perfil.

### Autorização

- Usuário acessa o próprio perfil.
- Usuário não acessa perfil de outro usuário.
- Proprietário não pode ser trocado pelo client.
- Usuário anônimo não acessa o painel.
- Endpoint privado sem sessão responde conforme o contrato.
- Conteúdo público não revela campos privados.

### End-to-end

1. Abrir cadastro.
2. Criar conta.
3. Confirmar e-mail no ambiente de teste.
4. Fazer login.
5. Acessar painel.
6. Atualizar perfil.
7. Fazer logout.
8. Tentar retornar ao painel.
9. Confirmar redirecionamento para login.

## 11. Checklist de revisão

- [ ] Nenhum secret tem prefixo `NEXT_PUBLIC_`.
- [ ] `SUPABASE_SERVICE_ROLE_KEY` não aparece em módulos client.
- [ ] Tokens não são salvos manualmente em `localStorage`.
- [ ] Senhas não aparecem em logs.
- [ ] Tokens não aparecem em URLs.
- [ ] `.env` está ignorado pelo Git.
- [ ] CI usa secrets do ambiente.
- [ ] O bundle client não contém chave privilegiada.
- [ ] Erros não expõem dados internos.
- [ ] Credenciais expostas foram rotacionadas.
- [ ] Todas as tabelas privadas têm RLS.
- [ ] Todas as mutações revalidam autenticação e autorização.
- [ ] Testes confirmam isolamento entre usuários.

## 12. Critérios de aceite

A Parte 4 será considerada concluída quando:

- Signup funcionar com confirmação de e-mail.
- Login criar e manter uma sessão válida.
- Logout invalidar a sessão.
- O painel estiver protegido pelo middleware e pelo servidor.
- Cada operação sensível revalidar o usuário no servidor.
- PostgreSQL tiver RLS para dados pertencentes ao usuário.
- Nenhum secret estiver no client.
- Redirects externos forem rejeitados.
- Os testes cobrirem autenticação, sessão e isolamento entre usuários.
- As alterações tiverem sido aplicadas em diffs pequenos, um arquivo por vez.
- A documentação de configuração local, staging e produção estiver atualizada.

## 13. Próximo passo

Antes de iniciar a codificação, confirmar o conteúdo efetivo dos arquivos de configuração e autenticação existentes, especialmente:

- `package.json`;
- `.env.example`;
- `src/middleware.ts`;
- `src/shared/db/cliente.ts`;
- `src/app/(painel)/layout.tsx`;
- arquivos atuais de `src/modules/identidade`.

A implementação deve começar pelo primeiro diff, com uma única alteração de arquivo, seguida de lint, typecheck e testes aplicáveis.
