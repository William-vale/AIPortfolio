# AI Portfolio

**Documento:** Fluxos, Wireframes e Protótipos de Baixa Fidelidade  
**Versão:** 1.0  
**Status:** Rascunhos funcionais, validação visual pendente  
**Data:** 17/08/2026  
**Documento de referência:** `01-visao-do-produto.md`  
**Documentos relacionados:** `02-arquitetura-de-pastas.md`, `03-fundamentos-visuais-e-ui.md`

# 1. Propósito

Este documento registra os fluxos de usuário, a arquitetura inicial de informação, wireframes de baixa fidelidade e protótipos textuais do AI Portfolio.

Os rascunhos não representam o design visual final. Eles definem a estrutura, a hierarquia de informações, as ações principais, os estados esperados e a relação entre cada tela e a arquitetura do projeto.

Os wireframes devem ser validados antes da implementação visual definitiva e antes da criação de abstrações adicionais em `src/shared/ui`.

# 2. Escopo

Este documento cobre os principais fluxos do MVP:

- aquisição e entrada do usuário;
- criação e recuperação de conta;
- painel do desenvolvedor;
- preenchimento do perfil profissional;
- gestão de projetos, experiências e habilidades;
- publicação e pré-visualização do portfólio;
- visualização pública pelo recrutador;
- coleta de contexto;
- geração da apresentação contextualizada;
- assinatura, cota e pagamento;
- configurações da conta;
- denúncia e estados de proteção.

# 3. Princípios de UX

## 3.1. O perfil é a fonte central

O desenvolvedor mantém um único perfil. As apresentações contextualizadas são versões derivadas, não cópias independentes.

## 3.2. A IA deve ser transparente

Toda sugestão gerada pela IA deve indicar sua origem, permitir edição e não substituir silenciosamente o conteúdo original.

## 3.3. O fluxo principal deve ser progressivo

O produto deve permitir começar com um perfil mínimo e conduzir o usuário para completar as informações mais relevantes, sem exigir o preenchimento completo em uma única etapa.

## 3.4. O recrutador não deve precisar criar conta

O fluxo público deve permitir visualizar o portfólio e responder ao contexto sem cadastro, conforme a proposta do produto e as rotas definidas na arquitetura.

## 3.5. O fallback é parte do produto

A apresentação pública base deve continuar funcionando quando a geração contextualizada estiver indisponível, incompleta ou não for solicitada.

# 4. Relação com a arquitetura

| Fluxo ou tela | Rota prevista | Módulo principal | Camada visual |
|---|---|---|---|
| Landing page | `/` | composição de marketing | `src/app/(marketing)` |
| Entrar | `/entrar` | `identidade` | `src/modules/identidade/ui` |
| Criar conta | `/criar-conta` | `identidade` | `src/modules/identidade/ui` |
| Recuperar acesso | `/recuperar-acesso` | `identidade` | `src/modules/identidade/ui` |
| Painel inicial | `/painel` | composição do painel | `src/app/(painel)` |
| Editor de perfil | `/painel/perfil` | `perfil` | `src/modules/perfil/ui` |
| Publicação | `/painel/publicacao` | `publicacao` | `src/modules/publicacao/ui` |
| Assinatura | `/painel/assinatura` | `cobranca` | `src/modules/cobranca/ui` |
| Conta | `/painel/conta` | `identidade` e `protecao` | composição do painel |
| Portfólio público | `/p/[identificador]` | `publicacao` | `src/modules/publicacao/ui/template-base` |
| Contexto do recrutador | `/p/[identificador]/contexto` | `contexto` | `src/modules/contexto/ui` |
| Apresentação contextualizada | fluxo de apresentação | `inteligencia` | `src/modules/inteligencia/ui` |
| Denúncia | ação no portfólio público | `protecao` | `src/modules/protecao/ui` |

# 5. Arquitetura inicial de informação

## 5.1. Navegação autenticada

```text
Painel
├── Visão geral
├── Perfil
│   ├── Identidade
│   ├── Experiência
│   ├── Projetos
│   ├── Habilidades
│   └── Formação
├── Publicação
│   ├── Estado de publicação
│   ├── Identificador público
│   └── Pré-visualização
├── Assinatura
│   ├── Plano atual
│   ├── Consumo de cota
│   └── Pagamento
└── Conta
    ├── Dados pessoais
    ├── Privacidade
    ├── Exportação
    └── Exclusão
```

## 5.2. Navegação pública

```text
Portfólio público
├── Apresentação profissional
├── Experiência
├── Projetos
├── Habilidades
├── Formação
├── Contatos visíveis
├── Criar apresentação contextualizada
└── Denunciar conteúdo
```

# 6. Fluxos principais

## 6.1. Primeiro acesso do desenvolvedor

```text
Landing page
  ↓
Criar conta
  ↓
Conta criada
  ↓
Configurar perfil mínimo
  ↓
Painel inicial
  ↓
Completar perfil
  ↓
Publicar portfólio
```

## 6.2. Publicação do perfil

```text
Painel
  ↓
Perfil completo o suficiente
  ↓
Publicação
  ↓
Definir identificador
  ↓
Pré-visualizar
  ↓
Publicar
  ↓
Copiar endereço público
```

## 6.3. Jornada do recrutador

```text
Portfólio público
  ↓
Visualizar perfil base
  ↓
Responder contexto
  ↓
Validar formulário
  ↓
Processar apresentação
  ↓
Visualizar versão contextualizada
  ↓
Comparar com perfil base ou compartilhar
```

## 6.4. Falha na geração da IA

```text
Contexto enviado
  ↓
Falha ou resposta inválida
  ↓
Exibir aviso não bloqueante
  ↓
Oferecer perfil base
  ↓
Permitir tentar novamente
```

# 7. Convenções dos wireframes

- Os wireframes utilizam escala de cinza e caracteres textuais.
- `[Ação]` representa botão ou controle acionável.
- `( )` representa opção única.
- `[ ]` representa seleção múltipla ou checkbox.
- `[...]` representa campo de entrada.
- `↓` representa transição de fluxo.
- Os wireframes não definem espaçamento final, cores finais ou microinterações.
- A estrutura deve ser preservada na aplicação dos fundamentos visuais.

# 8. Wireframes das telas

## 8.1. Landing page

```text
┌────────────────────────────────────────────────────────────────────┐
│ AI Portfolio                 Como funciona  Preços  [Entrar]       │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│ Seu perfil profissional.                                           │
│ Várias apresentações relevantes.                                   │
│                                                                    │
│ Mantenha suas experiências em um só lugar e apresente o que é      │
│ mais relevante para cada oportunidade.                             │
│                                                                    │
│ [Criar meu perfil]              [Ver como funciona]                │
│                                                                    │
│             ┌──────────────────────────────────────┐               │
│             │ Perfil central                        │               │
│             │ ├─ Experiências                       │               │
│             │ ├─ Projetos                            │               │
│             │ └─ Habilidades                         │               │
│             │                 ↓ IA                   │               │
│             │ Apresentação contextualizada           │               │
│             └──────────────────────────────────────┘               │
│                                                                    │
├────────────────────────────────────────────────────────────────────┤
│ Menos tempo editando currículos                                    │
│ Mais relevância para quem está avaliando seu perfil                │
├────────────────────────────────────────────────────────────────────┤
│ [Como funciona]     [Para desenvolvedores]     [Para recrutadores]  │
├────────────────────────────────────────────────────────────────────┤
│ Pronto para organizar sua apresentação profissional?               │
│ [Criar conta gratuitamente]                                        │
└────────────────────────────────────────────────────────────────────┘
```

**Objetivo:** explicar a proposta de valor e encaminhar para criação de conta.

**Ação principal:** `Criar meu perfil`.

**Estado importante:** usuário autenticado deve ser encaminhado ao painel, não ao cadastro.

## 8.2. Entrar

```text
┌──────────────────────────────────────────────┐
│ AI Portfolio                                 │
│                                              │
│ Entre na sua conta                           │
│                                              │
│ E-mail                                       │
│ [__________________________________________] │
│                                              │
│ Senha                                        │
│ [__________________________________________] │
│                                              │
│ [ ] Lembrar acesso                           │
│                                              │
│ [Entrar]                                     │
│                                              │
│ Esqueceu sua senha? [Recuperar acesso]       │
│ Ainda não possui conta? [Criar conta]       │
└──────────────────────────────────────────────┘
```

**Estados:** padrão, validação inválida, credenciais incorretas, carregando e bloqueio temporário.

## 8.3. Criar conta

```text
┌──────────────────────────────────────────────┐
│ AI Portfolio                                 │
│                                              │
│ Crie seu perfil profissional                  │
│                                              │
│ Nome completo                                │
│ [__________________________________________] │
│                                              │
│ E-mail                                       │
│ [__________________________________________] │
│                                              │
│ Senha                                        │
│ [__________________________________________] │
│                                              │
│ [ ] Aceito os termos de uso e a privacidade │
│                                              │
│ [Criar conta]                                │
│                                              │
│ Já possui conta? [Entrar]                    │
└──────────────────────────────────────────────┘
```

Após o cadastro, o usuário deve ser encaminhado para o perfil mínimo ou para o painel com uma tarefa inicial clara.

## 8.4. Recuperar acesso

```text
┌──────────────────────────────────────────────┐
│ Recuperar acesso                             │
│                                              │
│ Informe seu e-mail para receber as instruções│
│                                              │
│ E-mail                                       │
│ [__________________________________________] │
│                                              │
│ [Enviar instruções]                          │
│                                              │
│ [Voltar para entrar]                         │
└──────────────────────────────────────────────┘
```

**Sucesso:** confirmar o envio sem revelar se o e-mail existe na base.

## 8.5. Painel inicial

```text
┌────────────────────────────────────────────────────────────────────┐
│ AI Portfolio                         [Ajuda] [Notificações] [Avatar]│
├───────────────┬────────────────────────────────────────────────────┤
│ Painel        │ Olá, desenvolvedor                                │
│ Perfil        │ Organize seu perfil e prepare sua próxima versão.  │
│ Publicação    │                                                    │
│ Assinatura    │ ┌────────────────────────────────────────────────┐ │
│ Conta         │ │ Perfil                                          │ │
│               │ │ 78% completo                                    │ │
│               │ │ [Continuar preenchimento]                       │ │
│               │ └────────────────────────────────────────────────┘ │
│               │                                                    │
│               │ ┌──────────────────┐ ┌──────────────────────────┐ │
│               │ │ Publicação       │ │ Apresentações             │ │
│               │ │ Não publicado    │ │ 2 disponíveis             │ │
│               │ │ [Publicar]       │ │ [Nova apresentação]       │ │
│               │ └──────────────────┘ └──────────────────────────┘ │
│               │                                                    │
│               │ Atividades recentes                                │
│               │ - Projeto atualizado                               │
│               │ - Perfil salvo                                     │
└───────────────┴────────────────────────────────────────────────────┘
```

**Regra:** o painel deve exibir uma próxima ação prioritária, evitando excesso de indicadores.

## 8.6. Perfil — visão geral

```text
┌────────────────────────────────────────────────────────────────────┐
│ Perfil profissional                              [Salvar alterações]│
├────────────────────────────────────────────────────────────────────┤
│ Completude: 78%                                                    │
│ [Identidade] [Experiência] [Projetos] [Habilidades] [Formação]     │
├────────────────────────────────────────────────────────────────────┤
│ Conteúdo do perfil                                                  │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ Identidade                                                      │ │
│ │ William Mesquita                                               │ │
│ │ Desenvolvedor Full Stack                                       │ │
│ │ [Editar]                                                        │ │
│ └────────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ Próximas melhorias                                              │ │
│ │ Adicione pelo menos um projeto com resultado mensurável.        │ │
│ │ [Adicionar projeto]                                             │ │
│ └────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

## 8.7. Perfil — experiências

```text
┌────────────────────────────────────────────────────────────────────┐
│ Experiência profissional                              [+ Adicionar] │
├────────────────────────────────────────────────────────────────────┤
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ Empresa / Organização                                          │ │
│ │ Cargo                                                          │ │
│ │ Jan 2023 — Atual                                               │ │
│ │ Descrição resumida da atuação e resultados.                    │ │
│ │ [Editar] [Remover]                                             │ │
│ └────────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ Experiência anterior                                           │ │
│ │ Cargo e período                                                │ │
│ │ [Editar] [Remover]                                             │ │
│ └────────────────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

**Regra:** remoção deve exigir confirmação e informar o impacto sobre apresentações existentes.

## 8.8. Perfil — projetos

```text
┌────────────────────────────────────────────────────────────────────┐
│ Projetos                                             [+ Adicionar]  │
├────────────────────────────────────────────────────────────────────┤
│ Filtrar: [Todos ▼]     Buscar [________________________]           │
│                                                                    │
│ ┌──────────────────────────┐ ┌───────────────────────────────────┐ │
│ │ Projeto AI Portfolio     │ │ Sistema de pagamentos             │ │
│ │ Next.js · TypeScript     │ │ Node.js · Pix                     │ │
│ │ Resultado principal      │ │ Resultado principal               │ │
│ │ [Editar] [Visualizar]    │ │ [Editar] [Visualizar]             │ │
│ └──────────────────────────┘ └───────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

## 8.9. Perfil — formulário de projeto

```text
┌────────────────────────────────────────────────────────────────────┐
│ Novo projeto                                      [Salvar projeto]   │
├────────────────────────────────────────────────────────────────────┤
│ Nome do projeto                                                     │
│ [______________________________________________________________]   │
│                                                                    │
│ Descrição                                                          │
│ [______________________________________________________________]   │
│ [______________________________________________________________]   │
│                                                                    │
│ Tecnologias                                                        │
│ [React] [Node.js] [+ Adicionar tecnologia]                         │
│                                                                    │
│ Seu papel                                                          │
│ [______________________________________________________________]   │
│                                                                    │
│ Resultados                                                         │
│ [______________________________________________________________]   │
│                                                                    │
│ Links                                                              │
│ Repositório [_______________________________________________]      │
│ Demo        [_______________________________________________]      │
│                                                                    │
│ Visibilidade                                                       │
│ ( ) Exibir no portfólio público                                    │
│ ( ) Manter somente no perfil privado                               │
└────────────────────────────────────────────────────────────────────┘
```

## 8.10. Publicação e pré-visualização

```text
┌────────────────────────────────────────────────────────────────────┐
│ Publicação                                                          │
├────────────────────────────────────────────────────────────────────┤
│ Estado atual: NÃO PUBLICADO                                        │
│                                                                    │
│ Endereço público                                                    │
│ aiportfolio.dev/p/[identificador]                                  │
│ [Definir identificador]                                            │
│                                                                    │
│ Checklist                                                           │
│ [✓] Nome e título profissional                                     │
│ [✓] Resumo                                                         │
│ [ ] Pelo menos um projeto                                          │
│ [✓] Experiência                                                    │
│                                                                    │
│ [Visualizar prévia]                           [Publicar portfólio]  │
└────────────────────────────────────────────────────────────────────┘
```

**Regra:** publicar deve ficar desabilitado ou explicar claramente os requisitos pendentes.

## 8.11. Definição de identificador público

```text
┌──────────────────────────────────────────────────────────┐
│ Defina seu endereço público                              │
├──────────────────────────────────────────────────────────┤
│ Seu portfólio será acessado por:                         │
│ aiportfolio.dev/p/                                        │
│                                                          │
│ [william-mesquita______________________________]          │
│                                                          │
│ ✓ Identificador disponível                               │
│                                                          │
│ [Cancelar]                         [Confirmar endereço]  │
└──────────────────────────────────────────────────────────┘
```

**Estados:** disponível, já utilizado, formato inválido, reservado e carregando validação.

## 8.12. Portfólio público base

```text
┌────────────────────────────────────────────────────────────────────┐
│ AI Portfolio                                          [Denunciar]   │
├────────────────────────────────────────────────────────────────────┤
│ William Mesquita                                                   │
│ Desenvolvedor Full Stack                                           │
│                                                                    │
│ Construo produtos digitais com foco em clareza, escala e impacto.  │
│                                                                    │
│ [GitHub] [LinkedIn] [Contato]                                      │
├────────────────────────────────────────────────────────────────────┤
│ Experiência                                                        │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ Empresa · Cargo · Período                                       │ │
│ │ Descrição e principais resultados                               │ │
│ └────────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ Projetos                                                           │
│ ┌──────────────────────┐ ┌──────────────────────┐                 │
│ │ Projeto A             │ │ Projeto B             │                 │
│ │ Tecnologias           │ │ Tecnologias           │                 │
│ │ [Ver projeto]         │ │ [Ver projeto]         │                 │
│ └──────────────────────┘ └──────────────────────┘                 │
│                                                                    │
│ [Criar apresentação contextualizada]                              │
└────────────────────────────────────────────────────────────────────┘
```

## 8.13. Contexto do recrutador

```text
┌────────────────────────────────────────────────────────────────────┐
│ Encontre as experiências mais relevantes                            │
├────────────────────────────────────────────────────────────────────┤
│ Responda quatro perguntas para gerar uma apresentação contextual.  │
│                                                                    │
│ Qual é o tipo de oportunidade?                                     │
│ [______________________________________________________________]   │
│                                                                    │
│ Quais competências são mais importantes?                           │
│ [______________________________________________________________]   │
│                                                                    │
│ Qual contexto melhor descreve a oportunidade?                      │
│ ( ) Produto  ( ) Engenharia  ( ) Dados  ( ) Liderança              │
│                                                                    │
│ O que você deseja avaliar neste perfil?                            │
│ [______________________________________________________________]   │
│                                                                    │
│ [Voltar ao perfil]                    [Gerar apresentação]         │
└────────────────────────────────────────────────────────────────────┘
```

## 8.14. Carregamento da apresentação

```text
┌────────────────────────────────────────────────────────────────────┐
│ Preparando apresentação contextualizada                             │
├────────────────────────────────────────────────────────────────────┤
│                                                                    │
│                    [ ícone de processamento ]                      │
│                                                                    │
│ Estamos reorganizando as informações mais relevantes para este     │
│ contexto.                                                          │
│                                                                    │
│ [██████████████████░░░░░░]                                         │
│                                                                    │
│ Analisando experiências...                                         │
│ Priorizando projetos...                                            │
│ Validando a apresentação...                                        │
└────────────────────────────────────────────────────────────────────┘
```

O carregamento deve comunicar progresso sem prometer uma precisão inexistente.

## 8.15. Apresentação contextualizada

```text
┌────────────────────────────────────────────────────────────────────┐
│ Apresentação contextualizada                      [Ver perfil base] │
├────────────────────────────────────────────────────────────────────┤
│ Contexto analisado: Desenvolvedor Full Stack para produto SaaS     │
│                                                                    │
│ Correspondência estimada                                           │
│ [████████████████░░░░] 82%                                         │
│                                                                    │
│ Destaques para esta oportunidade                                   │
│ ┌────────────────────────────────────────────────────────────────┐ │
│ │ Experiência mais relevante                                     │ │
│ │ Conteúdo priorizado conforme o contexto fornecido.             │ │
│ └────────────────────────────────────────────────────────────────┘ │
│                                                                    │
│ Projetos relacionados                                              │
│ [Projeto A] [Projeto C]                                            │
│                                                                    │
│ Competências evidenciadas                                          │
│ [React] [Node.js] [PostgreSQL] [Arquitetura]                       │
│                                                                    │
│ [Compartilhar apresentação]                                        │
└────────────────────────────────────────────────────────────────────┘
```

## 8.16. Falha ou fallback da IA

```text
┌────────────────────────────────────────────────────────────────────┐
│ Não foi possível gerar a apresentação agora                         │
├────────────────────────────────────────────────────────────────────┤
│ O perfil base continua disponível. Você pode tentar novamente ou    │
│ continuar analisando as informações públicas.                      │
│                                                                    │
│ [Tentar novamente]                     [Ver perfil base]            │
└────────────────────────────────────────────────────────────────────┘
```

O fallback não deve parecer uma tela quebrada. Deve preservar o acesso ao portfólio base.

## 8.17. Assinatura e cota

```text
┌────────────────────────────────────────────────────────────────────┐
│ Assinatura                                                          │
├────────────────────────────────────────────────────────────────────┤
│ Plano atual: Essencial                                             │
│                                                                    │
│ Cota de apresentações                                               │
│ [██████████████░░░░░░] 7 de 10 utilizadas                           │
│ Renovação: 30/08/2026                                               │
│                                                                    │
│ ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────────┐ │
│ │ Gratuito          │ │ Essencial         │ │ Profissional          │ │
│ │ 3 apresentações   │ │ 10 apresentações  │ │ Mais recursos         │ │
│ │ [Atual]           │ │ [Assinar]         │ │ [Conhecer plano]      │ │
│ └──────────────────┘ └──────────────────┘ └──────────────────────┘ │
└────────────────────────────────────────────────────────────────────┘
```

## 8.18. Checkout Pix

```text
┌────────────────────────────────────────────────────────────────────┐
│ Confirmar assinatura                                                │
├────────────────────────────────────────────────────────────────────┤
│ Plano selecionado: Essencial                                       │
│ Valor: R$ XX,XX                                                     │
│                                                                    │
│ Pagamento via Pix                                                   │
│ ┌─────────────────────────────┐                                    │
│ │        [QR Code]            │                                    │
│ └─────────────────────────────┘                                    │
│ Código Pix                                                          │
│ [copia e cola.....................................] [Copiar]       │
│                                                                    │
│ Aguardando confirmação...                                          │
│ [Cancelar pagamento]                                               │
└────────────────────────────────────────────────────────────────────┘
```

**Estados:** aguardando, aprovado, expirado, cancelado e erro de comunicação com o provedor.

## 8.19. Conta, exportação e exclusão

```text
┌────────────────────────────────────────────────────────────────────┐
│ Conta                                                               │
├────────────────────────────────────────────────────────────────────┤
│ Dados da conta                                                      │
│ Nome, e-mail e preferências                                        │
│ [Editar dados]                                                      │
│                                                                    │
│ Privacidade                                                         │
│ [Exportar meus dados]                                               │
│                                                                    │
│ Zona de risco                                                       │
│ A exclusão remove seus dados e publicações.                        │
│ [Excluir conta]                                                     │
└────────────────────────────────────────────────────────────────────┘
```

A exclusão deve exigir confirmação explícita e explicar consequências de forma objetiva.

## 8.20. Denúncia de portfólio

```text
┌──────────────────────────────────────────────┐
│ Denunciar conteúdo                            │
├──────────────────────────────────────────────┤
│ Motivo da denúncia                            │
│ ( ) Conteúdo inadequado                       │
│ ( ) Uso indevido de identidade                │
│ ( ) Informação falsa                           │
│ ( ) Outro                                     │
│                                              │
│ Detalhes                                     │
│ [__________________________________________] │
│ [__________________________________________] │
│                                              │
│ [Cancelar]                 [Enviar denúncia] │
└──────────────────────────────────────────────┘
```

Após o envio, exibir confirmação sem revelar dados internos de moderação.

# 9. Estados de interface

Todo fluxo relevante deve documentar pelo menos estes estados:

| Estado | Exemplo |
|---|---|
| Padrão | Perfil com dados existentes. |
| Vazio | Perfil sem projetos ou experiências. |
| Carregando | Geração da apresentação pela IA. |
| Sucesso | Perfil publicado ou dados salvos. |
| Erro | Falha ao salvar ou gerar conteúdo. |
| Incompleto | Perfil sem informações suficientes. |
| Limite atingido | Cota de apresentação consumida. |
| Despublicado | Portfólio removido da visualização pública. |
| Não encontrado | Identificador inexistente ou inválido. |
| Sem correspondência | Contexto sem relação suficiente com o perfil. |

# 10. Responsabilidades de implementação

## 10.1. `src/app`

- compor páginas e layouts;
- definir metadados e navegação;
- conectar rotas a módulos públicos;
- não conter regra de negócio.

## 10.2. `src/shared/ui`

- fornecer componentes base;
- centralizar variantes visuais;
- respeitar tokens do documento `03-fundamentos-visuais-e-ui.md`;
- não conhecer regras específicas de domínio.

## 10.3. `src/modules/*/ui`

- renderizar dados do módulo;
- receber ações por propriedades ou casos de uso;
- representar estados específicos do domínio;
- não acessar diretamente dados de outro módulo.

## 10.4. Testes

Os fluxos devem ser refletidos em testes E2E quando a implementação estiver disponível. Os nomes dos testes devem utilizar os critérios de avaliação correspondentes, conforme a convenção do documento de arquitetura.

# 11. Critérios de aceitação dos wireframes

- Cada rota principal possui objetivo e fluxo documentados.
- Cada tela possui ação primária identificada.
- Fluxos de desenvolvedor e recrutador estão separados.
- O portfólio base funciona sem a IA.
- O fallback da IA está representado.
- Estados vazios, carregando, sucesso e erro estão documentados.
- O fluxo de publicação possui pré-visualização e validação.
- A exclusão de conta e a denúncia possuem confirmação e feedback.
- A estrutura dos wireframes é compatível com os módulos definidos na arquitetura.
- Os rascunhos não introduzem novas regras de negócio sem registro no PRD ou ADR.

# 12. Próximas etapas

1. Validar os fluxos com o PRD e os critérios de avaliação.
2. Confirmar as quatro perguntas do contexto com o ADR-004.
3. Criar os mesmos wireframes em Figma ou ferramenta equivalente.
4. Transformar os elementos repetidos em componentes de `src/shared/ui`.
5. Aplicar a paleta, tipografia e espaçamento do documento visual.
6. Criar protótipo clicável dos fluxos de publicação e contextualização.
7. Realizar validação de usabilidade com pelo menos um desenvolvedor e um recrutador.
8. Atualizar este documento após cada decisão que alterar fluxo ou estrutura.

# 13. O que ainda não existe

- protótipo visual de alta fidelidade;
- testes de usabilidade;
- definição final de conteúdo textual;
- estados detalhados de permissões por perfil de usuário;
- especificação de acessibilidade por componente;
- versões mobile completas;
- regras finais de navegação após autenticação;
- documentação de motion design;
- biblioteca final de componentes implementados.
