# AI Portfolio
    Documento: Arquitetura de Pastas
    Versão: 1.0
    Status: Estrutura criada, sem implementação
    Data: 09/08/2026
    Documento de referência: 01-visao-do-produto.md

# 1. Propósito
Este documento define a organização física do código a partir das decisões já registradas no PRD.
Nenhuma lógica foi escrita. Todos os arquivos existem vazios, servindo como contrato de onde cada responsabilidade vive.

A estrutura materializa três decisões do documento anterior:
* a DEC-002, que estabelece monólito modular em vez de serviços separados;
* a seção 19.3, que nomeia os sete módulos de domínio;
* a seção 19.4, que proíbe um módulo de acessar diretamente os dados de outro.

# 2. Princípios de organização
### 2.1. A pasta reflete o domínio, não o framework
Os sete módulos da seção 19.3 aparecem como sete pastas em `src/modules`, com os mesmos nomes usados no PRD.
Quem lê a árvore de diretórios entende o produto antes de entender a tecnologia.

### 2.2. Cada módulo tem uma única porta de entrada
Todo módulo expõe um `index.ts`. Nada fora do módulo pode importar um caminho interno dele.
Essa é a tradução em código da fronteira exigida pela seção 19.4, e é verificável de forma automática,
conforme descrito na seção 5 deste documento.

### 2.3. Quatro camadas dentro de cada módulo
| Camada      | Contém                                                                 | Pode depender de                          |
|-------------|------------------------------------------------------------------------|-------------------------------------------|
| `dominio`   | tipos, regras de negócio puras e invariantes, sem entrada e saída       | nada além de `shared/utils` e validação    |
| `aplicacao` | casos de uso que orquestram o domínio e a infraestrutura                | `dominio`, `infra` e portas de outros módulos |
| `infra`     | acesso ao banco, provedores externos e adaptadores                      | `dominio` e `shared`                       |
| `ui`        | componentes visuais do módulo                                           | `dominio` para tipos, e casos de uso via ação |

A regra prática é simples: a dependência sempre aponta para dentro. O domínio nunca conhece o banco.

### 2.4. O framework fica na borda
`src/app` contém apenas rotas, layouts e composição. Nenhuma regra de negócio mora ali.
Isso é o que sustenta a portabilidade exigida pelo ADR-002: trocar a plataforma de hospedagem
significa mexer na borda, não no núcleo.

# 3. Árvore de diretórios
    ai-portfolio/
    │
    ├── .github/
    │   └── workflows/                    # pipelines de integração contínua, exigidos pela seção 21.2
    │       └── ci.yml
    │
    ├── docs/                             # documentação viva do produto, mitigação do risco RT-010
    │   ├── 01-visao-do-produto.md
    │   ├── 02-arquitetura-de-pastas.md
    │   ├── pesquisa-precos-modelos-ia.md
    │   └── pesquisa-pagamentos-pix.md
    │
    ├── drizzle/                          # migrações versionadas geradas, pré-requisito do RF-005
    │   └── meta/                         # metadados de controle das migrações, gerados pela ferramenta
    │
    ├── public/                           # arquivos servidos estaticamente, sem processamento
    │   ├── fontes/                       # fontes locais, evitando dependência externa no carregamento
    │   ├── imagens/                      # imagens estáticas da interface e do material institucional
    │   ├── favicon.ico
    │   └── robots.txt                    # bloqueio de indexação por padrão, exigido pela RN-015
    │
    ├── scripts/                          # utilitários de linha de comando, fora do ciclo de requisição
    │   ├── verificar-fronteiras.ts       # valida que nenhum módulo importa caminho interno de outro
    │   └── migrar.ts                     # aplica migrações em ambiente de pré-produção e produção
    │
    ├── src/
    │   │
    │   ├── app/                          # borda do framework: rotas, layouts e composição, sem regra de negócio
    │   │   │
    │   │   ├── (marketing)/              # páginas públicas institucionais, acessíveis sem conta
    │   │   │   ├── precos/               # apresentação dos planos definidos no ADR-001
    │   │   │   ├── termos/               # termos de uso, exigidos pela decisão do ADR-007
    │   │   │   ├── privacidade/          # política de privacidade, exigida pela seção 22
    │   │   │   ├── layout.tsx
    │   │   │   └── page.tsx
    │   │   │
    │   │   ├── (auth)/                   # fluxos de entrada e recuperação, isolados do restante da navegação
    │   │   │   ├── entrar/
    │   │   │   ├── criar-conta/
    │   │   │   ├── recuperar-acesso/     # atende ao RF-036
    │   │   │   └── layout.tsx
    │   │   │
    │   │   ├── (painel)/                 # área autenticada do desenvolvedor, protegida pelo middleware
    │   │   │   ├── painel/
    │   │   │   │   ├── perfil/           # gerenciamento das informações profissionais, entrega EN-02
    │   │   │   │   ├── publicacao/       # publicação, endereço público e pré-visualização, entrega EN-03
    │   │   │   │   ├── assinatura/       # planos, cota consumida e pagamento, entrega EN-05
    │   │   │   │   ├── conta/            # exportação e exclusão de dados, atende RF-034 e RF-035
    │   │   │   │   └── page.tsx
    │   │   │   └── layout.tsx
    │   │   │
    │   │   ├── (publico)/                # o que o recrutador enxerga, sem exigência de cadastro, RF-023
    │   │   │   ├── p/
    │   │   │   │   └── [identificador]/  # portfólio público endereçado pelo identificador único, RF-011
    │   │   │   │       ├── contexto/     # as quatro perguntas definidas no ADR-004
    │   │   │   │       ├── page.tsx      # renderiza o template base no servidor, garantindo o RNF-004
    │   │   │   │       ├── loading.tsx
    │   │   │   │       ├── not-found.tsx # portfólio despublicado ou inexistente, CA-040
    │   │   │   │       └── opengraph-image.tsx
    │   │   │   └── layout.tsx
    │   │   │
    │   │   ├── api/                      # endpoints que não são páginas
    │   │   │   ├── apresentacao/         # geração contextualizada com streaming, conforme DEC-004
    │   │   │   ├── webhooks/
    │   │   │   │   └── pagamento/        # recebe eventos do provedor, com idempotência do RNF-017
    │   │   │   ├── cron/
    │   │   │   │   └── expurgo-retencao/ # rotina periódica de expurgo, atende RN-021 e CA-050
    │   │   │   └── saude/                # verificação de disponibilidade para o monitoramento do RNF-005
    │   │   │
    │   │   ├── layout.tsx                # layout raiz, idioma e metadados globais
    │   │   ├── globals.css
    │   │   ├── not-found.tsx
    │   │   └── error.tsx
    │   │
    │   ├── middleware.ts                 # proteção de rotas autenticadas e primeiro filtro de rate limiting
    │   │
    │   ├── modules/                      # os sete módulos de domínio da seção 19.3
    │   │   │
    │   │   ├── identidade/               # cadastro, autenticação, sessão e exclusão de conta
    │   │   │   ├── dominio/              # o que é uma conta e quais regras de acesso ela obedece
    │   │   │   ├── aplicacao/            # casos de uso: criar conta, autenticar, recuperar, excluir
    │   │   │   ├── infra/                # repositório de contas e adaptador do provedor de autenticação
    │   │   │   ├── ui/                   # formulários de cadastro e de entrada
    │   │   │   └── index.ts              # fronteira pública do módulo
    │   │   │
    │   │   ├── perfil/                   # informações profissionais e integridade dos registros
    │   │   │   ├── dominio/              # registro profissional, versionamento e invariantes da seção 16.2
    │   │   │   ├── aplicacao/            # adicionar, editar, remover, exportar e obter catálogo
    │   │   │   ├── infra/                # persistência dos registros profissionais
    │   │   │   ├── ui/                   # editor de perfil e controle de visibilidade de contato, RF-040
    │   │   │   └── index.ts              # expõe o catálogo somente leitura consumido pela inteligência
    │   │   │
    │   │   ├── publicacao/               # estados do portfólio, endereço público e template base
    │   │   │   ├── dominio/              # estado do portfólio e regras do identificador único
    │   │   │   ├── aplicacao/            # publicar, despublicar, definir identificador, montar template
    │   │   │   ├── infra/                # persistência do estado de publicação
    │   │   │   ├── ui/
    │   │   │   │   └── template-base/    # renderização padrão, independente de IA, sustenta o RF-020
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── contexto/                 # coleta, normalização e guarda efêmera das respostas do recrutador
    │   │   │   ├── dominio/              # questionário do ADR-004, normalização e chave de cache da seção 19.5
    │   │   │   ├── aplicacao/            # registrar contexto e expurgar contextos vencidos
    │   │   │   ├── infra/                # persistência com prazo de retenção
    │   │   │   ├── ui/                   # formulário do recrutador, com perguntas abertas e de opção única
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── inteligencia/             # orquestração dos modelos, contrato de saída, validação e fallback
    │   │   │   ├── dominio/
    │   │   │   │   └── prompts/          # instrução do sistema e montagem do catálogo enviado ao modelo
    │   │   │   ├── aplicacao/            # gerar apresentação, validar resposta e acionar fallback
    │   │   │   ├── infra/
    │   │   │   │   └── provedores/       # interface comum, Gemini, Mistral e seletor, atende RNF-010
    │   │   │   ├── ui/                   # apresentação contextualizada e estado de carregamento
    │   │   │   └── index.ts
    │   │   │
    │   │   ├── cobranca/                 # planos, assinatura, cota e integração de pagamento
    │   │   │   ├── dominio/              # plano, assinatura, cota e período de tolerância do CA-044
    │   │   │   ├── aplicacao/            # consultar e consumir cota, contratar, cancelar, processar evento
    │   │   │   ├── infra/
    │   │   │   │   └── provedores/       # interface comum, AbacatePay e Asaas, conforme ADR-003
    │   │   │   ├── ui/                   # tabela de planos, checkout PIX e painel de assinatura
    │   │   │   └── index.ts              # única fonte de verdade sobre cota, conforme seção 19.4
    │   │   │
    │   │   └── protecao/                 # limites de requisição, auditoria e denúncias
    │   │       ├── dominio/              # política de limite e regras da denúncia do ADR-007
    │   │       ├── aplicacao/            # verificar limite, registrar auditoria, registrar denúncia
    │   │       ├── infra/                # armazenamento de contadores e registro de auditoria do RF-037
    │   │       ├── ui/                   # formulário de denúncia exibido no portfólio público
    │   │       └── index.ts
    │   │
    │   └── shared/                       # núcleo comum, sem regra de negócio de nenhum módulo específico
    │       ├── db/
    │       │   ├── schema/               # um arquivo de tabelas por módulo, preservando a fronteira de dados
    │       │   ├── cliente.ts            # conexão única com o banco
    │       │   └── seed.ts               # dados fictícios para o ambiente de pré-produção da seção 19.6
    │       ├── ui/                       # componentes base reutilizados por todos os módulos
    │       ├── config/                   # ambiente, definição dos planos e limites, valores do ADR-001
    │       ├── erros/                    # erros de domínio tipados e tratador central
    │       ├── observabilidade/          # logger, eventos de negócio e métricas da seção 23.2
    │       ├── email/
    │       │   └── modelos/              # mensagens transacionais de acesso e cobrança
    │       ├── validacao/                # esquemas compartilhados de validação em tempo de execução
    │       └── utils/                    # funções puras de data, texto e tipo de resultado
    │
    ├── tests/
    │   ├── unitarios/                    # regras de domínio isoladas, sem banco e sem rede
    │   ├── integracao/                   # casos de uso contra banco real de teste
    │   ├── e2e/                          # cenários de ponta a ponta traduzidos dos CA's da seção 20
    │   ├── fixtures/                     # perfis e contextos de referência usados pelos testes
    │   └── setup.ts
    │
    ├── .env.example                      # nomes das variáveis de ambiente, sem valores, atende RNF-014
    ├── .gitignore
    ├── .prettierrc
    ├── drizzle.config.ts
    ├── eslint.config.mjs                 # inclui as regras de fronteira entre módulos
    ├── next.config.ts
    ├── package.json
    ├── playwright.config.ts
    ├── postcss.config.mjs
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── vitest.config.ts
    └── README.md

# 4. Decisões de estrutura que merecem justificativa
### 4.1. Por que os módulos não viram pastas dentro de `app`
Agrupar por rota faria a regra de negócio se espalhar pelas páginas e amarraria o domínio ao roteador do framework.
Manter `modules` separado de `app` é o que permite trocar o destino de deploy sem reescrita, conforme o ADR-002.

### 4.2. Por que o template base vive em `publicacao`, e não em `inteligencia`
Essa separação é a razão pela qual o fallback do RF-020 é estrutural e não um caminho de exceção.
O módulo de publicação renderiza o portfólio completo sem nunca importar o módulo de inteligência.
Se a camada de IA for removida inteira do projeto, o produto continua funcionando.

### 4.3. Por que o schema do banco fica em `shared`, e não dentro de cada módulo
As migrações precisam de uma visão única do banco para serem geradas de forma consistente.
A fronteira de dados é preservada por convenção e por verificação automática: cada módulo só acessa o arquivo
de schema que corresponde ao seu nome. O compartilhamento é da ferramenta, não do acesso.

### 4.4. Por que existe uma pasta `provedores` em dois módulos
Tanto a camada de IA quanto a de pagamento dependem de fornecedores externos cuja troca é provável.
Em ambos, a pasta contém primeiro a interface e depois as implementações.
No caso da inteligência isso atende ao RNF-010. No caso da cobrança atende à consequência registrada no ADR-003,
já que o provedor de pagamento recomendado ainda não é definitivo.

### 4.5. Por que a rota pública usa o prefixo `p`
Reservar um prefixo curto impede colisão entre um identificador escolhido pelo desenvolvedor e uma rota do sistema.
Sem isso, alguém poderia reivindicar o identificador `painel` ou `precos` e quebrar a navegação.

### 4.6. Por que o expurgo é uma rota, e não um processo de fundo
Em ambiente serverless não existe processo residente. A rotina de retenção da RN-021 é acionada por agendador externo
chamando a rota protegida, o que mantém a decisão DEC-003 de custo próximo de zero.

# 5. Regra de fronteira aplicada por ferramenta
A proibição da seção 19.4 não pode depender de disciplina. Ela será aplicada por configuração de linter, com três regras:
* nenhum arquivo em `src/modules/<a>` pode importar `src/modules/<b>/` em qualquer caminho que não seja o `index.ts`;
* nenhum arquivo em `src/modules/*/dominio` pode importar de `infra`, de `ui` ou de bibliotecas de acesso a dados;
* nenhum arquivo em `src/app` pode importar caminho interno de módulo, apenas a fronteira pública.

O script `scripts/verificar-fronteiras.ts` roda no pipeline de integração contínua e falha a construção quando qualquer
uma dessas regras é violada. A fronteira arquitetural passa a ser uma condição de merge, e não uma recomendação.

# 6. Convenções adotadas
* nomes de pasta e de arquivo em português, minúsculas, separados por hífen, coerentes com o vocabulário do PRD;
* nomes de pasta no singular quando representam um conceito, e no plural quando representam uma coleção de itens equivalentes;
* arquivos de componente com extensão `.tsx`, os demais com `.ts`;
* um caso de uso por arquivo em `aplicacao`, nomeado por verbo no infinitivo;
* o `index.ts` de cada módulo apenas reexporta, nunca contém implementação;
* testes de ponta a ponta nomeados pelo identificador do critério de avaliação que verificam, o que torna a cobertura da seção 20 auditável.

# 7. O que ainda não existe nesta estrutura
Estes itens foram deliberadamente deixados de fora até serem necessários, para não criar estrutura sem uso:
* pasta de internacionalização, dispensada pela DEC-008;
* pasta de aplicativo móvel, dispensada pela DEC-007;
* camada de eventos assíncronos ou fila, desnecessária enquanto a geração for síncrona pela DEC-004;
* módulo de analytics do desenvolvedor, previsto apenas para o complemento descrito no ADR-005.
