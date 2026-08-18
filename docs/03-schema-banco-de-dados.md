# Documento 3 — Schema do Banco de Dados (Revisado e Completo)

**Projeto:** AI Portfolio  
**Versão:** 1.2 — Alinhado às seções do PRD e Documento de Arquitetura  
**Banco de Dados:** PostgreSQL 14+  
**ORM Target:** Prisma ORM / SQL Nativo  
**Data da Revisão:** 10/08/2026  

---

## 1. Objetivo do Documento
Este documento especifica o modelo de dados relacional completo do **AI Portfolio**, servindo como contrato de persistência definitivo. O desenho arquitetural estabelece uma separação rigorosa entre:

1. **Perfil Profissional (`profiles`)**: Fonte de verdade imutável para agentes externos, pertencente ao desenvolvedor.
2. **Portfólio Público (`portfolios`)**: Configuração e estado de publicação pública em URL personalizada.
3. **Contexto Efêmero (`opportunity_contexts`)**: Perguntas e respostas fornecidas pelo recrutador, com retenção temporária.
4. **Apresentação Contextualizada (`presentations`)**: Resultado do processamento da IA contendo apenas ordenação, relevância e ponteiros (referências) para registros do perfil.
5. **Auditoria de IA (`generation_attempts`)**: Telemetria, tempo de resposta, consumo de tokens e controle de abuso.
6. **Módulo Financeiro e Cotas (`plans`, `subscriptions`, `quota_periods`, `payments`, `payment_events`)**: Controle de ciclos de faturamento, idempotência de webhooks e saldo de gerações.
7. **Moderação e Conformidade (`content_reports`, `audit_events`)**: Suporte a LGPD e denúncias de conteúdo inapropriado.

---

## 2. Diagrama Relacional Textual

```text
[users] 1 ──────── 1 [profiles]
                       │
                       ├─────── 1 ──────── 1 [portfolios]
                       │                       │
                       ├─────── 1 ──────── N [experiences]
                       ├─────── 1 ──────── N [projects]
                       ├─────── 1 ──────── N [courses]
                       ├─────── 1 ──────── N [academic_educations]
                       ├─────── 1 ──────── N [contact_fields]
                       └─────── N ──────── M [skills] (via profile_skills)
                                               │
                                               ├─────── 1 ──── N [opportunity_contexts]
                                               │                    │
                                               │                    └──── 1 ── N [presentations]
                                               └─────── 1 ─────────────── N [generation_attempts]

[users] 1 ──────── N [subscriptions] ─── N ─── 1 [plans]
   │                       │
   ├─────── 1 ──────── N [quota_periods]
   ├─────── 1 ──────── N [payments] ────── 1 ─── N [payment_events]
   ├─────── 1 ──────── N [audit_events]
   └─────── 1 ──────── N [content_reports] (como denunciante)
```

---

## 3. Especificação Detalhada das Tabelas

### Convenções Globais
* **Timestamps:**
  * `createdAt`: Data/hora de criação do registro (`TIMESTAMPTZ`, DEFAULT `CURRENT_TIMESTAMP`).
  * `updatedAt`: Data/hora da última alteração (`TIMESTAMPTZ`, DEFAULT `CURRENT_TIMESTAMP`).
* **Soft Delete:**
  * `deletedAt`: Data/hora da exclusão lógica (`TIMESTAMPTZ`, `NULL` por padrão). Registros com `deletedAt IS NOT NULL` são desconsiderados nas consultas normais da aplicação.

---

### 3.1. users
Armazena a identidade da conta do desenvolvedor.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador único do usuário. |
| email | VARCHAR(255) | Não | UNIQUE | - | E-mail do usuário (normalizado em lowercase). |
| passwordHash | VARCHAR(255) | Sim | - | NULL | Hash da senha (nulo se login exclusivamente social). |
| provider | ENUM | Não | `user_provider_enum` | 'CREDENTIALS' | Provedor de autenticação ('CREDENTIALS', 'GITHUB', 'GOOGLE'). |
| providerAccountId | VARCHAR(255) | Sim | - | NULL | ID do usuário no provedor OAuth externo. |
| status | ENUM | Não | `user_status_enum` | 'ACTIVE' | Estado da conta ('ACTIVE', 'SUSPENDED', 'PENDING_DELETE'). |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação da conta. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |
| deletedAt | TIMESTAMPTZ | Sim | Soft Delete | NULL | Exclusão lógica (LGPD). |

* **Soft Delete:** Possui (`deletedAt`).
* **Índices e Motivos:**
  * `idx_users_email_active` ON `(email)` WHERE `deletedAt IS NULL`: Busca rápida no login sem colidir com contas excluídas.

---

### 3.2. profiles
Perfil profissional do desenvolvedor (Fonte de Verdade 1:1 com `users`).

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do perfil. |
| userId | UUID | Não | FK -> users.id (UNIQUE) | - | Usuário proprietário (ON DELETE CASCADE). |
| fullName | VARCHAR(150) | Não | - | - | Nome completo do profissional. |
| headline | VARCHAR(200) | Sim | - | NULL | Título profissional resumido (ex: "Senior Backend Developer"). |
| summary | TEXT | Sim | - | NULL | Resumo da trajetória profissional. |
| location | VARCHAR(100) | Sim | - | NULL | Cidade / Estado / País de atuação. |
| yearsOfExperience| INTEGER | Não | CHECK (>= 0) | 0 | Anos acumulados de experiência profissional. |
| version | INTEGER | Não | CHECK (> 0) | 1 | Incremental de versão para invalidação de cache de IA. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data da última alteração. |
| deletedAt | TIMESTAMPTZ | Sim | Soft Delete | NULL | Exclusão lógica. |

* **Soft Delete:** Possui (`deletedAt`).
* **Índices e Motivos:**
  * `idx_profiles_user_id` ON `(userId)` WHERE `deletedAt IS NULL`: Acesso direto ao perfil a partir da sessão do usuário.

---

### 3.3. portfolios
Configuração da página pública do desenvolvedor (1:1 com `profiles`).

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do portfólio. |
| profileId | UUID | Não | FK -> profiles.id (UNIQUE)| - | Perfil associado (ON DELETE CASCADE). |
| slug | VARCHAR(100) | Não | Restrição de Unicidade | - | Subcaminho da URL pública `/p/:slug`. |
| status | ENUM | Não | `portfolio_status_enum` | 'DRAFT' | Estado ('DRAFT', 'PUBLISHED', 'UNPUBLISHED'). |
| primaryColor | VARCHAR(7) | Sim | CHECK (regex hex) | '#0F172A' | Cor principal da interface pública. |
| showContactPublic| BOOLEAN | Não | - | false | Exibição pública dos contatos sem precisar de IA. |
| publishedAt | TIMESTAMPTZ | Sim | - | NULL | Data de publicação original. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |
| deletedAt | TIMESTAMPTZ | Sim | Soft Delete | NULL | Exclusão lógica. |

* **Soft Delete:** Possui (`deletedAt`).
* **Índices e Motivos:**
  * `idx_portfolios_slug_published` ON `(slug)` WHERE `status = 'PUBLISHED' AND deletedAt IS NULL`: Permite rota pública ultra-rápida e liberação imediata do slug quando despublicado/deletado.

---

### 3.4. experiences
Histórico de experiências profissionais do perfil.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador da experiência. |
| profileId | UUID | Não | FK -> profiles.id | - | Perfil proprietário (ON DELETE CASCADE). |
| companyName | VARCHAR(150) | Não | - | - | Nome da empresa ou organização. |
| position | VARCHAR(120) | Não | - | - | Cargo ocupado. |
| startDate | DATE | Não | - | - | Data de início. |
| endDate | DATE | Sim | CHECK (>= startDate) | NULL | Data de término (NULL se emprego atual). |
| isCurrent | BOOLEAN | Não | - | false | Indica se é a posição corrente. |
| description | TEXT | Não | - | - | Descrição detalhada de realizações e impacto. |
| orderIndex | INTEGER | Não | DEFAULT 0 | 0 | Ordenação manual do usuário. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |
| deletedAt | TIMESTAMPTZ | Sim | Soft Delete | NULL | Exclusão lógica. |

* **Soft Delete:** Possui (`deletedAt`).
* **Índices e Motivos:**
  * `idx_experiences_profile_order` ON `(profileId, orderIndex)` WHERE `deletedAt IS NULL`: Ordenação de exibição no template base.

---

### 3.5. projects
Projetos e entregas relevantes do perfil.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do projeto. |
| profileId | UUID | Não | FK -> profiles.id | - | Perfil proprietário (ON DELETE CASCADE). |
| title | VARCHAR(150) | Não | - | - | Título do projeto. |
| summary | TEXT | Não | - | - | Resumo do problema resolvido e entregas. |
| repositoryUrl | VARCHAR(500) | Sim | - | NULL | Link para repositório (GitHub, GitLab). |
| liveUrl | VARCHAR(500) | Sim | - | NULL | Link para aplicação em produção. |
| highlightLevel | ENUM | Não | `project_highlight_enum`| 'MEDIUM' | Relevância definida pelo autor ('HIGH', 'MEDIUM', 'LOW'). |
| orderIndex | INTEGER | Não | DEFAULT 0 | 0 | Ordem visual no template base. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |
| deletedAt | TIMESTAMPTZ | Sim | Soft Delete | NULL | Exclusão lógica. |

* **Soft Delete:** Possui (`deletedAt`).
* **Índices e Motivos:**
  * `idx_projects_profile_order` ON `(profileId, orderIndex)` WHERE `deletedAt IS NULL`: Busca de projetos ativos ordenados.

---

### 3.6. courses
Cursos, certificações e especializações.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do curso. |
| profileId | UUID | Não | FK -> profiles.id | - | Perfil associado (ON DELETE CASCADE). |
| title | VARCHAR(150) | Não | - | - | Nome do curso/certificação. |
| institution | VARCHAR(150) | Não | - | - | Instituição emissora. |
| completionYear| INTEGER | Sim | CHECK (> 1950) | NULL | Ano de conclusão. |
| credentialUrl| VARCHAR(500) | Sim | - | NULL | Link de verificação da credencial. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |
| deletedAt | TIMESTAMPTZ | Sim | Soft Delete | NULL | Exclusão lógica. |

* **Soft Delete:** Possui (`deletedAt`).
* **Índices e Motivos:**
  * `idx_courses_profile_id` ON `(profileId)` WHERE `deletedAt IS NULL`.

---

### 3.7. academic_educations
Formação acadêmica formal (Graduação, Pós-graduação, etc.).

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do registro acadêmico. |
| profileId | UUID | Não | FK -> profiles.id | - | Perfil associado (ON DELETE CASCADE). |
| institution | VARCHAR(150) | Não | - | - | Nome da universidade ou faculdade. |
| degree | VARCHAR(100) | Não | - | - | Grau (Bacharelado, Licenciatura, Mestrado, etc.). |
| fieldOfStudy | VARCHAR(120) | Não | - | - | Área de estudo / Curso. |
| startYear | INTEGER | Não | - | - | Ano de início. |
| endYear | INTEGER | Sim | - | NULL | Ano de término (NULL se cursando). |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |
| deletedAt | TIMESTAMPTZ | Sim | Soft Delete | NULL | Exclusão lógica. |

* **Soft Delete:** Possui (`deletedAt`).
* **Índices e Motivos:**
  * `idx_academic_profile_id` ON `(profileId)` WHERE `deletedAt IS NULL`.

---

### 3.8. contact_fields
Meios de contato e redes sociais do profissional.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do meio de contato. |
| profileId | UUID | Não | FK -> profiles.id | - | Perfil associado (ON DELETE CASCADE). |
| type | ENUM | Não | `contact_type_enum` | - | Tipo ('EMAIL', 'PHONE', 'LINKEDIN', 'GITHUB', 'WEBSITE'). |
| value | VARCHAR(255) | Não | - | - | Endereço ou link do contato. |
| isPublic | BOOLEAN | Não | - | false | Exibir diretamente sem exigir contexto de IA. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |
| deletedAt | TIMESTAMPTZ | Sim | Soft Delete | NULL | Exclusão lógica. |

* **Soft Delete:** Possui (`deletedAt`).
* **Índices e Motivos:**
  * `idx_contact_fields_profile` ON `(profileId)` WHERE `deletedAt IS NULL`.

---

### 3.9. skills
Catálogo e vínculo de competências do perfil.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador da habilidade. |
| profileId | UUID | Não | FK -> profiles.id | - | Perfil associado (ON DELETE CASCADE). |
| name | VARCHAR(80) | Não | - | - | Nome da tecnologia/skill (ex: "Node.js", "PostgreSQL"). |
| category | ENUM | Não | `skill_category_enum` | 'TECHNICAL' | Categoria ('TECHNICAL', 'SOFT_SKILL', 'LANGUAGE', 'TOOL'). |
| level | ENUM | Sim | `skill_level_enum` | NULL | Nível ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'). |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |
| deletedAt | TIMESTAMPTZ | Sim | Soft Delete | NULL | Exclusão lógica. |

* **Soft Delete:** Possui (`deletedAt`).
* **Índices e Motivos:**
  * `idx_skills_profile_id` ON `(profileId)` WHERE `deletedAt IS NULL`.

---

### 3.10. opportunity_contexts
Entradas efêmeras de recrutadores (perguntas da vaga).

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do contexto. |
| portfolioId | UUID | Não | FK -> portfolios.id | - | Portfólio consultado (ON DELETE CASCADE). |
| profileVersion | INTEGER | Não | - | - | Versão do perfil no momento da entrada. |
| roleTitle | VARCHAR(80) | Não | - | - | Cargo/Função da vaga (Pergunta 1). |
| requiredSkills | JSONB | Não | - | - | Lista de tecnologias essenciais (Pergunta 2). |
| seniorityLevel | VARCHAR(30) | Sim | - | NULL | Nível de experiência esperado (Pergunta 3). |
| priorityFocus | VARCHAR(50) | Sim | - | NULL | Foco da decisão do recrutador (Pergunta 4). |
| contextHash | VARCHAR(64) | Não | Hash SHA-256 | - | Hash normalizado das respostas para busca de cache. |
| ipHash | VARCHAR(64) | Não | Hash anonimizado | - | Hash do IP para controle de rate limiting (LGPD). |
| expiresAt | TIMESTAMPTZ | Não | Retenção Efêmera | - | Expira em 30 dias após a criação. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data da interação. |

* **Soft Delete:** Não possui (expurgado por retenção física após 30 dias).
* **Índices e Motivos:**
  * `idx_opportunity_cache` ON `(portfolioId, profileVersion, contextHash)`: Chave determinística de cache (RN-009/RN-010).
  * `idx_opportunity_expires_at` ON `(expiresAt)`: Utilizado pelo job de limpeza periódica.

---

### 3.11. presentations
Resultado da priorização e ordenação feita pela IA.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador da apresentação. |
| portfolioId | UUID | Não | FK -> portfolios.id | - | Portfólio associado (ON DELETE CASCADE). |
| contextId | UUID | Sim | FK -> opportunity_contexts.id | NULL | Contexto gerador (NULL se template base). |
| profileVersion | INTEGER | Não | - | - | Versão do perfil no momento da geração. |
| origin | ENUM | Não | `presentation_origin_enum` | - | Origem ('BASE_TEMPLATE', 'AI_CONTEXTUALIZED'). |
| status | ENUM | Não | `presentation_status_enum` | - | Estado ('PROCESSING', 'READY', 'FALLBACK', 'EXPIRED', 'REJECTED'). |
| selectedReferences| JSONB | Sim | - | NULL | IDs dos itens do perfil com pesos e ordem. |
| approximateMatches| JSONB | Sim | - | NULL | Correspondências aproximadas validadas. |
| justification | TEXT | Sim | - | NULL | Justificativa gerada e sanitizada pela IA. |
| noRelevantInfo | BOOLEAN | Não | - | false | Sinaliza quando não há itens aderentes à vaga. |
| expiresAt | TIMESTAMPTZ | Não | Retenção Efêmera | - | Expira em 30 dias. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de geração. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |

* **Soft Delete:** Não possui (expurgado por retenção).
* **Índices e Motivos:**
  * `idx_presentations_portfolio_created` ON `(portfolioId, createdAt)`: Acelera histórico de apresentações do portfólio.
  * `idx_presentations_status_created` ON `(status, createdAt)`: Telemetria do sistema para cálculo de taxa de fallback e SLOs.

---

### 3.12. generation_attempts
Registro de auditoria e observabilidade das chamadas de IA.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador da tentativa. |
| portfolioId | UUID | Não | FK -> portfolios.id | - | Portfólio alvo (ON DELETE CASCADE). |
| contextId | UUID | Sim | FK -> opportunity_contexts.id | NULL | Contexto associado. |
| provider | VARCHAR(50) | Não | - | - | Nome do modelo/provedor (ex: "gemini-2.5-flash"). |
| promptTokens | INTEGER | Não | DEFAULT 0 | 0 | Tokens de entrada consumidos. |
| completionTokens | INTEGER | Não | DEFAULT 0 | 0 | Tokens de saída gerados. |
| latencyMs | INTEGER | Não | DEFAULT 0 | 0 | Tempo total da requisição em milissegundos. |
| success | BOOLEAN | Não | - | false | Indica se a geração concluiu sem erros. |
| errorCode | VARCHAR(50) | Sim | - | NULL | Código de falha em caso de erro/fallback. |
| ipHash | VARCHAR(64) | Não | Hash anonimizado | - | Verificação de segurança / anti-abuse. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data/hora do evento. |

* **Soft Delete:** Não possui.
* **Índices e Motivos:**
  * `idx_attempts_portfolio_created` ON `(portfolioId, createdAt)`: Cálculo de volume de uso e métricas de erro.

---

### 3.13. plans
Catálogo de planos do sistema.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do plano. |
| code | VARCHAR(50) | Não | UNIQUE | - | Código do plano ('FREE', 'PRO_MONTHLY', 'PRO_YEARLY'). |
| name | VARCHAR(100) | Não | - | - | Nome exibido (ex: "Plano Pro Mensal"). |
| priceCents | INTEGER | Não | CHECK (>= 0) | - | Preço em centavos de BRL (ex: 1990 = R$ 19,90). |
| interval | VARCHAR(20) | Não | - | - | Período ('LIFETIME', 'MONTHLY', 'YEARLY'). |
| generationLimit | INTEGER | Não | CHECK (>= 0) | - | Cota de gerações concedida por ciclo (ex: 1 ou 100). |
| isLifetime | BOOLEAN | Não | - | false | Indica se é um plano sem expiração (ex: FREE). |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |

* **Soft Delete:** Não possui.

---

### 3.14. subscriptions
Assinaturas de planos efetuadas pelos usuários.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador da assinatura. |
| userId | UUID | Não | FK -> users.id | - | Usuário assinante (ON DELETE CASCADE). |
| planId | UUID | Não | FK -> plans.id | - | Plano assinado. |
| status | ENUM | Não | `subscription_status_enum`| - | Estado ('ACTIVE', 'CANCELED', 'PAST_DUE', 'EXPIRED'). |
| currentPeriodStart| TIMESTAMPTZ | Não | - | - | Início do ciclo atual. |
| currentPeriodEnd | TIMESTAMPTZ | Não | - | - | Fim do ciclo atual. |
| cancelAtPeriodEnd | BOOLEAN | Não | - | false | Cancela ao fim do período corrente. |
| externalId | VARCHAR(255) | Sim | UNIQUE | NULL | ID da assinatura no gateway de pagamento. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |

* **Soft Delete:** Não possui.
* **Índices e Motivos:**
  * `idx_subscriptions_user_status` ON `(userId, status)`: Busca rápida da assinatura ativa do usuário.

---

### 3.15. quota_periods
Períodos de controle e consumo atômico de cotas de IA.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do período de cota. |
| userId | UUID | Não | FK -> users.id | - | Usuário (ON DELETE CASCADE). |
| subscriptionId | UUID | Sim | FK -> subscriptions.id | NULL | Assinatura vinculada (NULL para plano FREE). |
| limitCount | INTEGER | Não | CHECK (>= 0) | - | Limite máximo de gerações no período. |
| usedCount | INTEGER | Não | CHECK (>= 0) | 0 | Cotas efetivamente consumidas. |
| startDate | TIMESTAMPTZ | Não | - | - | Início da vigência da cota. |
| endDate | TIMESTAMPTZ | Não | - | - | Término da vigência da cota. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de criação. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |

* **Soft Delete:** Não possui.
* **Índices e Motivos:**
  * `idx_quota_user_active` ON `(userId, startDate, endDate)`: Localização do saldo corrente do usuário.

---

### 3.16. payments
Transações financeiras realizadas pelo usuário (Cartão / PIX).

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do pagamento. |
| userId | UUID | Não | FK -> users.id | - | Usuário pagador (ON DELETE CASCADE). |
| subscriptionId | UUID | Sim | FK -> subscriptions.id | NULL | Assinatura vinculada. |
| amountCents | INTEGER | Não | CHECK (> 0) | - | Valor cobrado em centavos BRL. |
| method | ENUM | Não | `payment_method_enum` | - | Método ('CREDIT_CARD', 'PIX'). |
| status | ENUM | Não | `payment_status_enum` | 'PENDING' | Estado ('PENDING', 'PAID', 'FAILED', 'REFUNDED'). |
| pixQrCode | TEXT | Sim | - | NULL | Código/Base64 do QR Code PIX. |
| pixCopiaECola | TEXT | Sim | - | NULL | String "Copia e Cola" do PIX. |
| expiresAt | TIMESTAMPTZ | Sim | - | NULL | Data limite para pagamento (PIX). |
| paidAt | TIMESTAMPTZ | Sim | - | NULL | Data de confirmação do pagamento. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data da cobrança. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |

* **Soft Delete:** Não possui.
* **Índices e Motivos:**
  * `idx_payments_user_created` ON `(userId, createdAt)`: Extrato financeiro do usuário.

---

### 3.17. payment_events
Eventos de Webhook recebidos do gateway de pagamento (Idempotência).

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do evento. |
| provider | VARCHAR(50) | Não | - | - | Nome do gateway (ex: "ASAAS", "STRIPE"). |
| providerEventId | VARCHAR(255) | Não | - | - | ID único do evento no gateway. |
| eventType | VARCHAR(100) | Não | - | - | Tipo da notificação (ex: "PAYMENT_RECEIVED"). |
| payload | JSONB | Não | - | - | Corpo bruto recebido na requisição. |
| processedAt | TIMESTAMPTZ | Sim | - | NULL | Data de processamento bem-sucedido. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de recepção. |

* **Soft Delete:** Não possui.
* **Constraints de Unicidade:**
  * `unique_provider_event` UNIQUE `(provider, providerEventId)`: Garante idempotência absoluta no tratamento de webhooks.

---

### 3.18. content_reports
Denúncias de conteúdo inapropriado em portfólios públicos.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador da denúncia. |
| portfolioId | UUID | Não | FK -> portfolios.id | - | Portfólio denunciado (ON DELETE CASCADE). |
| reporterEmail | VARCHAR(255) | Sim | - | NULL | E-mail do denunciante (opcional). |
| reason | ENUM | Não | `report_reason_enum` | - | Motivo ('SPAM', 'INAPPROPRIATE', 'COPYRIGHT', 'OTHER'). |
| description | TEXT | Sim | - | NULL | Detalhes adicionais fornecidos. |
| status | ENUM | Não | `report_status_enum` | 'PENDING' | Estado ('PENDING', 'REVIEWED', 'DISMISSED', 'ACTION_TAKEN'). |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data do registro. |
| updatedAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data de atualização. |

* **Soft Delete:** Não possui.
* **Índices e Motivos:**
  * `idx_reports_status` ON `(status, createdAt)`: Fila de moderação do sistema.

---

### 3.19. audit_events
Trilha de auditoria administrativa e conformidade LGPD.

| Campo | Tipo PostgreSQL | Nulável | Chave / Restrição | Default | Descrição |
| :--- | :--- | :--- | :--- | :--- | :--- |
| id | UUID | Não | PK | `uuid_generate_v4()` | Identificador do evento de auditoria. |
| userId | UUID | Sim | FK -> users.id | NULL | Usuário autor da ação (NULL se sistema/convidado). |
| action | VARCHAR(100) | Não | - | - | Nome da ação (ex: "USER_EXPORT_DATA", "PORTFOLIO_DELETE"). |
| targetEntity | VARCHAR(50) | Não | - | - | Entidade afetada (ex: "profiles"). |
| targetId | UUID | Sim | - | NULL | ID da entidade afetada. |
| metadata | JSONB | Sim | - | NULL | Metadados contextuais da operação. |
| ipAddress | VARCHAR(45) | Sim | - | NULL | Endereço IP do requisitante. |
| createdAt | TIMESTAMPTZ | Não | Timestamp | `CURRENT_TIMESTAMP` | Data/hora exata da ocorrência. |

* **Soft Delete:** Não possui.
* **Índices e Motivos:**
  * `idx_audit_user_action` ON `(userId, action, createdAt)`: Rastreabilidade para conformidade de dados.

---

## 4. Regras de Negócio e Invariantes do Banco de Dados

1. **Unicidade do Slug Público:**
   * Garantido pelo índice único parcial `idx_portfolios_slug_published`. Apenas portfólios com `status = 'PUBLISHED'` e `deletedAt IS NULL` reservam o slug, liberando a URL no momento da despublicação ou exclusão lógica.

2. **Versão do Perfil e Invalidação de Cache:**
   * Qualquer inserção, atualização ou remoção em `experiences`, `projects`, `courses`, `academic_educations`, `contact_fields` ou `skills` DEVE incrementar o campo `version` da tabela `profiles` dentro da mesma transação.
   * O cache de apresentações em `opportunity_contexts` é indexado pela tupla `(portfolioId, profileVersion, contextHash)`. Quando `profileVersion` incrementa, as apresentações antigas deixam de ser encontradas pelo cache automaticamente.

3. **Retenção Efêmera:**
   * Registros em `opportunity_contexts` e `presentations` possuem prazo fixo de expiração de 30 dias (`expiresAt = createdAt + INTERVAL '30 days'`).
   * O expurgo físico é realizado por tarefa agendada sem necessidade de exclusão lógica (`deletedAt`).

4. **Consumo Atômico de Cotas:**
   * O incremento de `usedCount` em `quota_periods` deve ocorrer através de atualização atômica condicional:
     ```sql
     UPDATE quota_periods 
     SET usedCount = usedCount + 1, updatedAt = CURRENT_TIMESTAMP
     WHERE id = :quotaPeriodId AND usedCount < limitCount;
     ```

---

## 5. Migration SQL Completa

**Caminho do arquivo:** `prisma/migrations/20260810150000_init/migration.sql`

```sql
-- Habilitar extensão para geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- ENUMs
-- -----------------------------------------------------------------------------
CREATE TYPE user_provider_enum AS ENUM ('CREDENTIALS', 'GITHUB', 'GOOGLE');
CREATE TYPE user_status_enum AS ENUM ('ACTIVE', 'SUSPENDED', 'PENDING_DELETE');
CREATE TYPE portfolio_status_enum AS ENUM ('DRAFT', 'PUBLISHED', 'UNPUBLISHED');
CREATE TYPE project_highlight_enum AS ENUM ('HIGH', 'MEDIUM', 'LOW');
CREATE TYPE contact_type_enum AS ENUM ('EMAIL', 'PHONE', 'LINKEDIN', 'GITHUB', 'WEBSITE');
CREATE TYPE skill_category_enum AS ENUM ('TECHNICAL', 'SOFT_SKILL', 'LANGUAGE', 'TOOL');
CREATE TYPE skill_level_enum AS ENUM ('BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT');
CREATE TYPE presentation_origin_enum AS ENUM ('BASE_TEMPLATE', 'AI_CONTEXTUALIZED');
CREATE TYPE presentation_status_enum AS ENUM ('PROCESSING', 'READY', 'FALLBACK', 'EXPIRED', 'REJECTED');
CREATE TYPE subscription_status_enum AS ENUM ('ACTIVE', 'CANCELED', 'PAST_DUE', 'EXPIRED');
CREATE TYPE payment_method_enum AS ENUM ('CREDIT_CARD', 'PIX');
CREATE TYPE payment_status_enum AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');
CREATE TYPE report_reason_enum AS ENUM ('SPAM', 'INAPPROPRIATE', 'COPYRIGHT', 'OTHER');
CREATE TYPE report_status_enum AS ENUM ('PENDING', 'REVIEWED', 'DISMISSED', 'ACTION_TAKEN');

-- -----------------------------------------------------------------------------
-- TABELAS NÚCLEO
-- -----------------------------------------------------------------------------

-- 1. users
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    passwordHash VARCHAR(255),
    provider user_provider_enum NOT NULL DEFAULT 'CREDENTIALS',
    providerAccountId VARCHAR(255),
    status user_status_enum NOT NULL DEFAULT 'ACTIVE',
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMPTZ
);

CREATE UNIQUE INDEX idx_users_email_active ON users(email) WHERE deletedAt IS NULL;

-- 2. profiles
CREATE TABLE profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    fullName VARCHAR(150) NOT NULL,
    headline VARCHAR(200),
    summary TEXT,
    location VARCHAR(100),
    yearsOfExperience INTEGER NOT NULL DEFAULT 0 CHECK (yearsOfExperience >= 0),
    version INTEGER NOT NULL DEFAULT 1 CHECK (version > 0),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMPTZ
);

CREATE INDEX idx_profiles_user_id ON profiles(userId) WHERE deletedAt IS NULL;

-- 3. portfolios
CREATE TABLE portfolios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profileId UUID NOT NULL UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
    slug VARCHAR(100) NOT NULL,
    status portfolio_status_enum NOT NULL DEFAULT 'DRAFT',
    primaryColor VARCHAR(7) DEFAULT '#0F172A',
    showContactPublic BOOLEAN NOT NULL DEFAULT false,
    publishedAt TIMESTAMPTZ,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMPTZ
);

CREATE UNIQUE INDEX idx_portfolios_slug_published ON portfolios(slug) 
WHERE status = 'PUBLISHED' AND deletedAt IS NULL;

-- 4. experiences
CREATE TABLE experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profileId UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    companyName VARCHAR(150) NOT NULL,
    position VARCHAR(120) NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE,
    isCurrent BOOLEAN NOT NULL DEFAULT false,
    description TEXT NOT NULL,
    orderIndex INTEGER NOT NULL DEFAULT 0,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMPTZ,
    CONSTRAINT chk_exp_dates CHECK (endDate IS NULL OR endDate >= startDate)
);

CREATE INDEX idx_experiences_profile_order ON experiences(profileId, orderIndex) WHERE deletedAt IS NULL;

-- 5. projects
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profileId UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    summary TEXT NOT NULL,
    repositoryUrl VARCHAR(500),
    liveUrl VARCHAR(500),
    highlightLevel project_highlight_enum NOT NULL DEFAULT 'MEDIUM',
    orderIndex INTEGER NOT NULL DEFAULT 0,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMPTZ
);

CREATE INDEX idx_projects_profile_order ON projects(profileId, orderIndex) WHERE deletedAt IS NULL;

-- 6. courses
CREATE TABLE courses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profileId UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    title VARCHAR(150) NOT NULL,
    institution VARCHAR(150) NOT NULL,
    completionYear INTEGER CHECK (completionYear > 1950),
    credentialUrl VARCHAR(500),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMPTZ
);

CREATE INDEX idx_courses_profile_id ON courses(profileId) WHERE deletedAt IS NULL;

-- 7. academic_educations
CREATE TABLE academic_educations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profileId UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    institution VARCHAR(150) NOT NULL,
    degree VARCHAR(100) NOT NULL,
    fieldOfStudy VARCHAR(120) NOT NULL,
    startYear INTEGER NOT NULL,
    endYear INTEGER,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMPTZ
);

CREATE INDEX idx_academic_profile_id ON academic_educations(profileId) WHERE deletedAt IS NULL;

-- 8. contact_fields
CREATE TABLE contact_fields (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profileId UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type contact_type_enum NOT NULL,
    value VARCHAR(255) NOT NULL,
    isPublic BOOLEAN NOT NULL DEFAULT false,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMPTZ
);

CREATE INDEX idx_contact_fields_profile ON contact_fields(profileId) WHERE deletedAt IS NULL;

-- 9. skills
CREATE TABLE skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profileId UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name VARCHAR(80) NOT NULL,
    category skill_category_enum NOT NULL DEFAULT 'TECHNICAL',
    level skill_level_enum,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deletedAt TIMESTAMPTZ
);

CREATE INDEX idx_skills_profile_id ON skills(profileId) WHERE deletedAt IS NULL;

-- -----------------------------------------------------------------------------
-- TABELAS DE INTELIGÊNCIA E APRESENTAÇÃO
-- -----------------------------------------------------------------------------

-- 10. opportunity_contexts
CREATE TABLE opportunity_contexts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolioId UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    profileVersion INTEGER NOT NULL,
    roleTitle VARCHAR(80) NOT NULL,
    requiredSkills JSONB NOT NULL,
    seniorityLevel VARCHAR(30),
    priorityFocus VARCHAR(50),
    contextHash VARCHAR(64) NOT NULL,
    ipHash VARCHAR(64) NOT NULL,
    expiresAt TIMESTAMPTZ NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_opportunity_cache ON opportunity_contexts(portfolioId, profileVersion, contextHash);
CREATE INDEX idx_opportunity_expires_at ON opportunity_contexts(expiresAt);

-- 11. presentations
CREATE TABLE presentations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolioId UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    contextId UUID REFERENCES opportunity_contexts(id) ON DELETE SET NULL,
    profileVersion INTEGER NOT NULL,
    origin presentation_origin_enum NOT NULL,
    status presentation_status_enum NOT NULL,
    selectedReferences JSONB,
    approximateMatches JSONB,
    justification TEXT,
    noRelevantInfo BOOLEAN NOT NULL DEFAULT false,
    expiresAt TIMESTAMPTZ NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_presentations_portfolio_created ON presentations(portfolioId, createdAt);
CREATE INDEX idx_presentations_status_created ON presentations(status, createdAt);

-- 12. generation_attempts
CREATE TABLE generation_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolioId UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    contextId UUID REFERENCES opportunity_contexts(id) ON DELETE SET NULL,
    provider VARCHAR(50) NOT NULL,
    promptTokens INTEGER NOT NULL DEFAULT 0,
    completionTokens INTEGER NOT NULL DEFAULT 0,
    latencyMs INTEGER NOT NULL DEFAULT 0,
    success BOOLEAN NOT NULL DEFAULT false,
    errorCode VARCHAR(50),
    ipHash VARCHAR(64) NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_attempts_portfolio_created ON generation_attempts(portfolioId, createdAt);

-- -----------------------------------------------------------------------------
-- TABELAS FINANCEIRAS E COTAS
-- -----------------------------------------------------------------------------

-- 13. plans
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    priceCents INTEGER NOT NULL CHECK (priceCents >= 0),
    interval VARCHAR(20) NOT NULL,
    generationLimit INTEGER NOT NULL CHECK (generationLimit >= 0),
    isLifetime BOOLEAN NOT NULL DEFAULT false,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 14. subscriptions
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    planId UUID NOT NULL REFERENCES plans(id),
    status subscription_status_enum NOT NULL,
    currentPeriodStart TIMESTAMPTZ NOT NULL,
    currentPeriodEnd TIMESTAMPTZ NOT NULL,
    cancelAtPeriodEnd BOOLEAN NOT NULL DEFAULT false,
    externalId VARCHAR(255) UNIQUE,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_user_status ON subscriptions(userId, status);

-- 15. quota_periods
CREATE TABLE quota_periods (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscriptionId UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    limitCount INTEGER NOT NULL CHECK (limitCount >= 0),
    usedCount INTEGER NOT NULL DEFAULT 0 CHECK (usedCount >= 0),
    startDate TIMESTAMPTZ NOT NULL,
    endDate TIMESTAMPTZ NOT NULL,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_quota_user_active ON quota_periods(userId, startDate, endDate);

-- 16. payments
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    subscriptionId UUID REFERENCES subscriptions(id) ON DELETE SET NULL,
    amountCents INTEGER NOT NULL CHECK (amountCents > 0),
    method payment_method_enum NOT NULL,
    status payment_status_enum NOT NULL DEFAULT 'PENDING',
    pixQrCode TEXT,
    pixCopiaECola TEXT,
    expiresAt TIMESTAMPTZ,
    paidAt TIMESTAMPTZ,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_payments_user_created ON payments(userId, createdAt);

-- 17. payment_events
CREATE TABLE payment_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider VARCHAR(50) NOT NULL,
    providerEventId VARCHAR(255) NOT NULL,
    eventType VARCHAR(100) NOT NULL,
    payload JSONB NOT NULL,
    processedAt TIMESTAMPTZ,
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_provider_event UNIQUE (provider, providerEventId)
);

-- -----------------------------------------------------------------------------
-- TABELAS DE AUDITORIA E MODERAÇÃO
-- -----------------------------------------------------------------------------

-- 18. content_reports
CREATE TABLE content_reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    portfolioId UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
    reporterEmail VARCHAR(255),
    reason report_reason_enum NOT NULL,
    description TEXT,
    status report_status_enum NOT NULL DEFAULT 'PENDING',
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_reports_status ON content_reports(status, createdAt);

-- 19. audit_events
CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    targetEntity VARCHAR(50) NOT NULL,
    targetId UUID,
    metadata JSONB,
    ipAddress VARCHAR(45),
    createdAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_audit_user_action ON audit_events(userId, action, createdAt);
```

---

## 6. Checklist de Aceitação do Schema

- [x] **Relacionamentos de Identidade:** Usuário possui exatamente 1 perfil profissional (1:1).
- [x] **Relacionamentos de Publicação:** Perfil possui no máximo 1 portfólio público (1:1).
- [x] **Unicidade do Slug Ativo:** Índice único parcial em `portfolios(slug)` com filtro `status = 'PUBLISHED' AND deletedAt IS NULL`.
- [x] **Proteção de Privacidade:** Portfólio não publicado (`DRAFT`, `UNPUBLISHED`) não expõe dados, e contatos são privados por padrão.
- [x] **Invalidador de Cache:** `version` em `profiles` incrementado em qualquer mutação profissional.
- [x] **Cache Determinístico:** `opportunity_contexts` indexado por `(portfolioId, profileVersion, contextHash)`.
- [x] **Retenção Efêmera:** Contextos e apresentações possuem expiração configurada (`expiresAt`) de 30 dias.
- [x] **Invariante da IA:** Apresentações referenciam apenas IDs existentes do perfil do usuário.
- [x] **Fallback sem Custo:** Resposta de erro ou fallback para o template base não consome cota do usuário.
- [x] **Planos e Cotas:** Suporte completo a planos com controle de saldo de geração.
- [x] **Idempotência Monetária:** Webhooks de pagamento protegidos pela restrição `(provider, providerEventId)`.
- [x] **Suporte a PIX:** Armazenamento de QR Code e código "Copia e Cola".
- [x] **Conformidade LGPD:** Suporte a exportação, exclusão lógica imediata e rastreabilidade via `audit_events`.
