# AI Portfolio

**Documento:** Fundamentos Visuais e UI  
**Versão:** 1.0  
**Status:** Diretrizes definidas, implementação pendente  
**Data:** 17/08/2026  
**Documento de referência:** `01-visao-do-produto.md`  
**Documento relacionado:** `02-arquitetura-de-pastas.md`

# 1. Propósito

Este documento define os fundamentos visuais, tipográficos e de interface do AI Portfolio.

As diretrizes orientam a implementação dos componentes em `src/shared/ui`, dos componentes específicos em `src/modules/*/ui`, da composição das páginas em `src/app`, do template público em `src/modules/publicacao/ui/template-base` e da estilização global em `src/app/globals.css`.

O AI Portfolio deve ser percebido como uma plataforma profissional, inteligente, clara e confiável, e não apenas como um gerador de currículos.

# 2. Direção de marca

## 2.1. Posicionamento visual

O AI Portfolio ocupa a interseção entre portfólio profissional, currículo adaptável por inteligência artificial, personal branding para desenvolvedores e apresentação contextualizada para recrutadores.

## 2.2. Atributos da marca

- inteligente, mas não artificial;
- profissional, mas não burocrática;
- técnica, mas acessível;
- personalizada, mas consistente;
- eficiente, mas transparente.

## 2.3. Princípio visual central

> Uma única fonte de verdade. Múltiplas apresentações relevantes.

A interface deve comunicar que o perfil central é estável, que os contextos são variações controladas e que a inteligência artificial atua como camada de curadoria, sem substituir silenciosamente o conteúdo original.

# 3. Aplicação na arquitetura

| Local | Responsabilidade visual |
|---|---|
| `src/app/globals.css` | Tokens globais, reset, tipografia base, cores e estilos fundamentais. |
| `src/shared/ui` | Componentes visuais reutilizáveis. |
| `src/modules/perfil/ui` | Editor de perfil, experiências, projetos, habilidades e formações. |
| `src/modules/publicacao/ui/template-base` | Apresentação pública base, independente da IA. |
| `src/modules/contexto/ui` | Formulário de contexto do recrutador. |
| `src/modules/inteligencia/ui` | Apresentação contextualizada, carregamento e sugestões. |
| `src/modules/cobranca/ui` | Planos, assinatura, cota e checkout. |

O template em `src/modules/publicacao/ui/template-base` deve funcionar sem depender do módulo `inteligencia`, garantindo que o portfólio base continue disponível quando a geração contextualizada estiver indisponível.

# 4. Paleta de cores

## 4.1. Cores principais

| Token | Nome | Hexadecimal | Uso | Justificativa |
|---|---|---:|---|---|
| `primary-500` | Azul Inteligência | `#6366F1` | Estados intermediários e destaques. | Assinatura tecnológica do produto. |
| `primary-600` | Azul Inteligência | `#4F46E5` | CTAs, links, foco e navegação ativa. | Comunica tecnologia, competência e inteligência. |
| `primary-700` | Azul Inteligência Escuro | `#4338CA` | Hover e estados pressionados. | Reforça confiança e continuidade. |
| `secondary-500` | Verde Relevância | `#14B8A6` | Compatibilidade, progresso e tags. | Comunica equilíbrio, clareza e evolução. |
| `secondary-700` | Verde Relevância Escuro | `#0F766E` | Hover e textos secundários. | Mantém expressão profissional. |

## 4.2. Status

| Token | Nome | Hexadecimal | Fundo sugerido | Uso |
|---|---|---:|---:|---|
| `success-600` | Sucesso | `#16A34A` | `#DCFCE7` | Perfil publicado e operações concluídas. |
| `error-600` | Erro | `#DC2626` | `#FEE2E2` | Falhas, exclusões e validações inválidas. |
| `warning-600` | Aviso | `#D97706` | `#FEF3C7` | Conteúdo incompleto ou ação pendente. |
| `info-600` | Informação | `#0284C7` | `#E0F2FE` | Dicas e instruções auxiliares. |

A cor não deve ser o único indicador de estado. Todo status deve combinar cor, ícone, texto e alternativa acessível.

## 4.3. Neutros

| Token | Hexadecimal | Uso |
|---|---:|---|
| `neutral-0` | `#FFFFFF` | Superfícies principais e cards. |
| `neutral-50` | `#F8FAFC` | Background geral do painel. |
| `neutral-100` | `#F1F5F9` | Áreas secundárias e inputs suaves. |
| `neutral-200` | `#E2E8F0` | Bordas e divisores. |
| `neutral-500` | `#64748B` | Texto auxiliar e metadados. |
| `neutral-700` | `#334155` | Texto secundário. |
| `neutral-900` | `#0F172A` | Títulos e texto principal. |

# 5. Tipografia

## 5.1. Fontes adotadas

- **Títulos:** Plus Jakarta Sans, Google Fonts, pesos `600`, `700` e `800`.
- **Corpo:** Inter, Google Fonts, pesos `400`, `500`, `600` e `700`.

```css
:root {
  --font-heading: "Plus Jakarta Sans", sans-serif;
  --font-body: "Inter", sans-serif;
}
```

## 5.2. Escala tipográfica

| Token | Desktop | Mobile | Peso | Line-height | Aplicação |
|---|---:|---:|---:|---:|---|
| `text-h1` | 40px | 32px | 700 | 1.15 | Título principal. |
| `text-h2` | 32px | 24px | 700 | 1.2 | Seções principais. |
| `text-h3` | 24px | 20px | 600 | 1.25 | Subseções e cards. |
| `text-h4` | 18px | 18px | 600 | 1.3 | Títulos de componentes. |
| `text-body` | 16px | 16px | 400 | 1.5 | Texto padrão. |
| `text-body-small` | 14px | 14px | 400 | 1.45 | Labels e auxiliares. |
| `text-caption` | 12px | 12px | 500 | 1.4 | Metadados e timestamps. |
| `text-button` | 14px | 14px | 600 | 1 | Botões e controles. |

Cada tela deve possuir somente um `H1`. Títulos utilizam Plus Jakarta Sans; textos longos utilizam Inter.

# 6. Grid e espaçamento

O projeto deve utilizar um sistema baseado em 8pt grid.

| Token | Valor | Uso |
|---|---:|---|
| `space-1` | 4px | Microalinhamentos. |
| `space-2` | 8px | Espaçamento compacto. |
| `space-3` | 12px | Labels e badges. |
| `space-4` | 16px | Padding padrão. |
| `space-5` | 20px | Elementos relacionados. |
| `space-6` | 24px | Padding de cards. |
| `space-8` | 32px | Separação entre grupos. |
| `space-10` | 40px | Blocos internos. |
| `space-12` | 48px | Seções. |
| `space-16` | 64px | Seções de página. |
| `space-20` | 80px | Áreas institucionais. |

Na área autenticada, utilizar container máximo de `1440px`, sidebar entre `240px` e `280px` e gutter de `24px`. Na área pública, utilizar container de leitura entre `720px` e `820px`, com largura de parágrafo próxima de `70ch`.

# 7. Bordas e elevação

| Token | Valor | Uso |
|---|---:|---|
| `radius-sm` | 6px | Controles compactos. |
| `radius-md` | 10px | Botões e inputs. |
| `radius-lg` | 16px | Cards e painéis. |
| `radius-xl` | 24px | Hero e containers institucionais. |
| `radius-full` | 9999px | Avatares, pills e indicadores. |

O arredondamento moderado comunica modernidade e proximidade sem retirar a seriedade profissional do produto.

- Borda padrão: `1px solid #E2E8F0`.
- Borda de destaque: `1px solid #CBD5E1`.
- Card: padding de `24px`, radius de `16px`.
- Botão: altura padrão de `44px`, radius de `10px`.
- Preferir bordas e espaçamento antes de sombras fortes.

# 8. Iconografia

A biblioteca padrão será **Lucide Icons**.

| Propriedade | Regra |
|---|---|
| Estilo | Outline |
| Espessura padrão | `1.75px` |
| Espessura crítica | `2px` |
| Tamanho pequeno | 16px |
| Tamanho padrão | 20px |
| Tamanho destacado | 24px |
| Área mínima de interação | `44px × 44px` |

Ícones sugeridos:

| Situação | Ícone |
|---|---|
| Sucesso | `CheckCircle2` |
| Erro | `AlertCircle` |
| Aviso | `TriangleAlert` |
| Informação | `Info` |
| Assistência de IA | `Sparkles` |
| Publicação | `Globe2` |
| Perfil | `UserRound` |
| Projetos | `FolderKanban` |
| Configurações | `Settings2` |

Não misturar bibliotecas de ícones na mesma tela. Ícones icon-only devem possuir tooltip e nome acessível.

# 9. Componentes fundamentais

## 9.1. Botões

### Primário

- Background: `#4F46E5`.
- Texto: `#FFFFFF`.
- Hover: `#4338CA`.
- Peso: `600`.
- Altura: `44px`.
- Border-radius: `10px`.

### Secundário

- Background: `#FFFFFF`.
- Texto: `#4338CA`.
- Borda: `#C7D2FE`.
- Hover: `#EEF2FF`.

### Terciário

- Background transparente.
- Texto: `#475569`.
- Hover: `#F1F5F9`.

## 9.2. Cards

- Background: `#FFFFFF`.
- Borda: `1px solid #E2E8F0`.
- Padding: `24px`.
- Border-radius: `16px`.
- Metadados: `Body small` ou `Caption`.

Aplicações: experiências, projetos, habilidades, formações, versões contextualizadas e análises de compatibilidade.

## 9.3. Componentes de inteligência

A IA deve utilizar o ícone `Sparkles`, fundo suave `#EEF2FF`, borda opcional `#C7D2FE` e textos como “Sugestão da IA” ou “Gerado com base no contexto”. Deve sempre oferecer ações para aceitar, editar e descartar.

## 9.4. Indicador de relevância

O indicador deve apresentar percentual ou classificação, explicação textual, competências consideradas e lacunas identificadas.

```text
82% de correspondência

7 competências relevantes identificadas
2 competências importantes ainda não evidenciadas
```

# 10. Tokens globais

```css
:root {
  --font-heading: "Plus Jakarta Sans", sans-serif;
  --font-body: "Inter", sans-serif;

  --color-primary-500: #6366f1;
  --color-primary-600: #4f46e5;
  --color-primary-700: #4338ca;
  --color-secondary-500: #14b8a6;
  --color-secondary-700: #0f766e;

  --color-success-600: #16a34a;
  --color-error-600: #dc2626;
  --color-warning-600: #d97706;
  --color-info-600: #0284c7;

  --color-bg-app: #f8fafc;
  --color-bg-surface: #ffffff;
  --color-bg-subtle: #f1f5f9;
  --color-text-primary: #0f172a;
  --color-text-secondary: #334155;
  --color-text-muted: #64748b;
  --color-border-default: #e2e8f0;
  --color-border-strong: #cbd5e1;

  --radius-sm: 0.375rem;
  --radius-md: 0.625rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-full: 9999px;

  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
}
```

# 11. Critérios de aceitação visual

- Todas as telas devem utilizar os tokens definidos neste documento.
- Componentes reutilizáveis devem ser concentrados em `src/shared/ui`.
- Componentes específicos devem permanecer no módulo correspondente.
- A área pública deve funcionar sem dependência obrigatória da IA.
- Conteúdo original, sugestão da IA e versão contextualizada devem ser distinguíveis.
- Estados de sucesso, erro e aviso devem conter cor, ícone e texto.
- O sistema de espaçamento deve seguir o grid de 8pt.
- Componentes devem possuir estados de foco acessíveis.
- Contraste e navegação por teclado devem atender à WCAG 2.2 AA.
- O template base não deve parecer um caminho de exceção quando a IA estiver indisponível.

# 12. O que ainda não existe nesta definição

- identidade completa de marca, incluindo logotipo;
- ilustrações proprietárias;
- biblioteca de motion design;
- tema escuro;
- internacionalização;
- guidelines detalhados para e-mails;
- testes automatizados de regressão visual;
- tokens específicos para múltiplos templates públicos;
- analytics visual do recrutador.

Esses itens devem ser adicionados somente quando houver requisito funcional ou necessidade comprovada de implementação.
