# AI Portfolio

# Glossário

| Siglas | Nome para sigla         | O que significa                                         |
|--------|-------------------------|---------------------------------------------------------|
| RF     | Requisito Funcional     | O que o sistema deve fazer                              |
| RN     | Regra de Negócio        | Regras que restringem ou orientam o comportamento       |
| RNF    | Requisito Não Funcional | Qualidade, segurança, desempenho, disponibilidade etc.  |
| CA     | Critério de Avaliação   | Como saberemos que o requisito foi cumprido             |
| DEC    | Decisão de Engenharia   | Escolha técnica registrada, com contexto e consequência |
| ADR    | Registro de Decisão     | Decisão arquitetural relevante e suas alternativas      |
| RT     | Risco Técnico           | Ameaça de origem técnica ao produto ou ao prazo         |
| EN     | Entrega                 | Bloco entregável de valor dentro do roadmap             |
| SLO    | Objetivo de Serviço     | Meta mensurável de qualidade em produção                |

# 1 Visão do Produto
        Versão: 1.1
        Status: Escopo fechado para o MVP
        Autor: William Mesquita
        Última atualização: 08/08/2026

# 2. Resumo Executivo
### 2.1 O que é o AI Portfolio?
    O AI Portfolio é uma plataforma inteligente de apresentação profissional que permite que desenvolvedores mantenham um único perfil profissional e apresentem automaticamente versões contextualizadas desse perfil para diferentes oportunidades de trabalho.

    Por meio de inteligência artificial, a plataforma reorganiza e prioriza experiências, habilidades, projetos e formações com base no contexto informado pelo recrutador, reduzindo o tempo de análise e aumentando a relevância das informações apresentadas.

# 3. Problema de Mercado
### 3.1 Problema do Recrutador
    Recrutadores recebem um grande volume de currículos e portfólios para cada vaga.

    As principais dificuldades incluem:
        * excesso de informação;
        * tempo limitado para análise;
        * baixa padronização dos currículos;
        * dificuldade para identificar compatibilidade rapidamente.

    Como consequência, candidatos potencialmente adequados podem ser descartados por falta de visibilidade de suas competências mais relevantes.

### 3.2 Problema do Desenvolvedor
    Desenvolvedores frequentemente precisam:
        * adaptar currículos;
        * alterar portfólios;
        * reorganizar projetos;
        * destacar experiências específicas.

    Esse processo consome tempo e normalmente gera versões diferentes da mesma informação.

### 3.3 Oportunidade
    Existe uma oportunidade de conectar recrutadores e desenvolvedores através de uma apresentação profissional dinâmica, contextualizada e personalizada para cada oportunidade.

# 4. Produto
    Permitir que cada desenvolvedor possua um único perfil profissional capaz de se adaptar automaticamente a diferentes contextos de recrutamento, entregando aos recrutadores as informações mais relevantes para cada oportunidade.

# 5. Proposta de Valor
### 5.1 Para Desenvolvedores
    Mantenha suas informações profissionais em um único lugar e deixe que a plataforma personalize sua apresentação para diferentes oportunidades.

    Benefícios
        * menos tempo editando currículos;
        * perfil centralizado;
        * apresentação profissional consistente;
        * destaque contextual de competências.

### 5.2 Para Recrutadores
    Receba uma versão contextualizada do perfil profissional do candidato alinhada à necessidade da vaga.

    Benefícios
        * análise mais rápida;
        * redução de ruído;
        * identificação facilitada de competências;
        * melhor tomada de decisão.

# 6. Diferencial Competitivo

| Solução       | Perfil Único | IA Contextual | Adaptação por Vaga |
| ------------- | ------------ | ------------- | ------------------ |
| Currículo PDF | Não          | Não           | Manual             |
| Canva         | Não          | Não           | Manual             |
| LinkedIn      | Parcial      | Não           | Não                |
| AI Portfolio  | Sim          | Sim           | Automática         |

# 7. Personas
### 7.1 José Oliveira
    Recrutador
    Idade: 45 anos
    Objetivos:
        encontrar candidatos rapidamente;
        reduzir tempo de triagem;
        melhorar assertividade das contratações.

    Dores:
        excesso de currículos;
        pouco tempo;
        dificuldade de comparação.

### 7.2 Isaac Silva
    Desenvolvedor Júnior
    Idade: 30 anos
    Objetivos:
        conquistar a primeira vaga relevante;
        demonstrar potencial técnico;
        tornar seu perfil mais visível.

    Dores:
        criar currículos diferentes;
        organizar experiências;
        destacar competências.

### 7.3 Fernanda Costa
    Desenvolvedora Sênior
    Idade: 38 anos
    Objetivos:
        consolidar toda trajetória profissional;
        destacar experiência estratégica;
        otimizar participação em processos seletivos.

    Dores:
        excesso de experiências;
        dificuldade de sintetização;
        diferentes contextos para cada oportunidade.

# 8. Objetivos do Produto
### 8.1 Objetivos Estratégicos
- melhorar a experiência de recrutamento;
- aumentar a relevância das informações apresentadas;
- reduzir esforço do desenvolvedor;
- tornar a avaliação mais eficiente.

### 8.2 Metas do MVP
- reduzir em 30% o tempo médio de triagem;
- alcançar satisfação mínima de 4/5 dos recrutadores;
- permitir geração de apresentação contextualizada em menos de 10 segundos, conforme detalhado no RNF-004;
- disponibilizar portfólio sem necessidade de cadastro do recrutador.

# 9. Escopo do MVP
### 9.1. Dentro do MVP
* conta do desenvolvedor com autenticação por e-mail e senha e por provedor social;
* cadastro e gerenciamento de perfil, experiências, projetos, cursos, habilidades e formação;
* publicação do portfólio em endereço público com identificador escolhido pelo desenvolvedor;
* template base determinístico, funcionando sem qualquer chamada de IA;
* coleta de contexto do recrutador com no máximo quatro perguntas;
* apresentação contextualizada gerada por IA, com priorização e destaque de evidências;
* sinalização explícita de correspondência aproximada;
* apresentação integral quando não houver informação relevante;
* fallback automático para o template base;
* planos, cota, upgrade, downgrade e cobrança recorrente;
* pagamento por cartão de crédito e por PIX com QR Code;
* rate limiting por portfólio e por endereço de origem;
* exportação e exclusão de dados pessoais para atendimento à LGPD.

### 9.2. Fora do MVP, com prioridade para a versão seguinte
* importação automática do GitHub;
* exportação em PDF;
* analytics de acesso ao portfólio para o desenvolvedor;
* múltiplos temas visuais de portfólio;
* extensão paga do prazo de retenção de apresentações, conforme ADR-005.

### 9.3. Fora do MVP, sem prazo definido
* aplicativo mobile nativo;
* sistema de mensagens entre recrutador e desenvolvedor;
* integração com sistemas de recrutamento de terceiros;
* conta e painel para recrutadores;
* suporte a outros idiomas.

### 9.4 Definição de pronto
Um requisito só é considerado concluído quando cumpre todos os itens abaixo.
* o critério de avaliação correspondente está automatizado em teste;
* o comportamento funciona com a camada de IA indisponível, quando aplicável;
* o requisito respeita as regras de integridade da seção 11;
* erros previsíveis possuem mensagem clara para o usuário final;
* a tela funciona em largura de 360 pixels e em navegação por teclado;
* eventos relevantes de negócio e de erro estão instrumentados.

# 10. Priorização do que ficou fora do MVP
    Esta seção classifica por prioridade o que a seção 9 declarou fora do escopo, orientando o planejamento das versões seguintes.

    Deve ter
    * importação automática do GitHub;
    * exportação em PDF.

    Pode ter
    * analytics de acesso ao portfólio;
    * múltiplos temas visuais;
    * extensão paga do prazo de retenção.

    Não terá no MVP
    * aplicativo mobile nativo;
    * sistema de mensagens entre recrutador e desenvolvedor;
    * integração com sistemas de recrutamento de terceiros;
    * painel para recrutadores;
    * suporte a outros idiomas.

    Observação: pagamentos não constam mais nesta lista. A cobrança passou a integrar o MVP por força da decisão DEC-001,
    registrada na seção 19.2, uma vez que a cota de IA descrita na RN-007 não faz sentido sem um mecanismo de upgrade real.

# 11. Regras de Negócio
### 11.1 Integridade dos Dados
    RN-001 — Fidelidade das Informações
    A camada de IA atuará selecionando, ordenando e classificando registros já cadastrados pelo desenvolvedor.
    Não caberá à camada de IA redigir descrições de experiências, projetos, cursos ou habilidades.
    O mecanismo que torna esta regra verificável está definido na seção 18.

### 11.2 Contextualização
    RN-002 — Limite de Perguntas
    A interação inicial da IA deverá possuir no máximo quatro perguntas direcionadas ao recrutador.
    O conjunto dessas perguntas está definido no ADR-004, na seção 26.

    RN-003 — Compatibilidade Parcial
    Quando houver relação entre uma competência solicitada e uma competência cadastrada, o sistema poderá apresentar essa relação,
    desde que deixe clara a natureza aproximada da correspondência.

    RN-004 — Apresentação Integral
    Quando não forem identificadas informações relevantes para o contexto informado, o sistema deverá apresentar o portfólio completo ao recrutador.

### 11.3 Estrutura do Perfil
    RN-005 — Cadastro Centralizado
    O desenvolvedor deverá manter um único perfil profissional, utilizado como fonte de informação para a plataforma.

    RN-006 — Informações Profissionais Não Obrigatórias
    Nenhuma informação profissional específica será obrigatória para a criação e utilização do portfólio.
    A completude da apresentação dependerá das informações fornecidas pelo desenvolvedor.

### 11.4 Planos e Cotas
    RN-007 — Definição dos Planos
    A plataforma possuirá dois planos no MVP. O plano Gratuito concede uma única geração por IA em toda a vida da conta.
    O plano Pro concede um limite mensal de gerações por IA, renovado a cada ciclo de cobrança.
    Os valores e a cota estão definidos no ADR-001, na seção 26.

    RN-008 — Consumo da Cota
    Uma geração é contabilizada apenas quando a apresentação contextualizada é produzida com sucesso pela camada de IA.
    Falhas, indisponibilidade, tempo excedido e respostas rejeitadas pela validação não consomem cota.

    RN-009 — Reaproveitamento de Contexto
    Contextos equivalentes informados para o mesmo portfólio, dentro da janela de validade do cache, não consomem cota adicional.
    A equivalência é determinada pelo conteúdo normalizado das respostas do recrutador e pela versão vigente do perfil.

    RN-010 — Invalidação por Alteração de Perfil
    Qualquer alteração nas informações profissionais do desenvolvedor invalida as apresentações contextualizadas já armazenadas em cache para aquele portfólio.

    RN-011 — Efeito do Downgrade
    O downgrade não remove informações do perfil nem despublica o portfólio.
    A partir do fim do ciclo pago, o portfólio passa a ser apresentado pelo template base, salvo se ainda restar cota gratuita não consumida.

    RN-012 — Efeito da Falha de Pagamento
    Quando o pagamento recorrente falhar, o plano Pro permanece ativo por um período de tolerância de sete dias.
    Encerrada a tolerância sem regularização, a conta retorna ao comportamento do plano Gratuito.

### 11.5 Publicação e Acesso
    RN-013 — Estados do Portfólio
    O portfólio possuirá os estados rascunho, publicado e despublicado.
    Somente o estado publicado responde ao endereço público.
    Nos demais estados o acesso retorna uma página informando indisponibilidade, sem expor dados do desenvolvedor.

    RN-014 — Identificador Público
    Cada portfólio possuirá um identificador público único, escolhido pelo desenvolvedor e imutável enquanto o portfólio estiver publicado.
    Identificadores reservados pela plataforma não poderão ser utilizados.

    RN-015 — Ausência de Indexação Sem Consentimento
    O portfólio não será indexado por mecanismos de busca, salvo autorização explícita do desenvolvedor nas configurações.

    RN-016 — Contexto Efêmero do Recrutador
    As respostas do recrutador serão utilizadas exclusivamente para gerar a apresentação e alimentar o cache.
    Não haverá associação dessas respostas a pessoa identificável nem uso para qualquer outra finalidade.

### 11.6 Integridade e Comportamento da IA
    RN-017 — Rejeição de Resposta Inválida
    Toda resposta da camada de IA que referencie registro inexistente, altere conteúdo original ou não obedeça ao formato esperado será rejeitada.
    Após a rejeição, o sistema utilizará o template base, conforme o RF-020, sem consumo de cota.

    RN-018 — Limite de Extensão do Contexto
    As respostas do recrutador possuirão limite de extensão por campo, e conteúdo excedente será truncado antes do envio à camada de IA.

    RN-019 — Neutralidade na Triagem
    A camada de IA não poderá utilizar idade, gênero, origem, estado civil, aparência ou qualquer característica pessoal como critério de priorização.
    A priorização considerará exclusivamente compatibilidade técnica e de experiência.

### 11.7 Visibilidade e Retenção
    RN-020 — Visibilidade dos Dados de Contato
    O desenvolvedor definirá, por campo de contato, se o dado será exibido no portfólio público.
    O padrão para novos campos de contato será não exibir, cabendo ao desenvolvedor liberar a exibição.

    RN-021 — Prazo de Retenção das Apresentações
    As apresentações contextualizadas e os contextos que as originaram serão retidos por trinta dias a partir da geração.
    Encerrado esse prazo, serão removidos automaticamente, preservados apenas os registros de auditoria previstos no RF-037,
    que não contêm o conteúdo da apresentação.

    RN-022 — Moderação de Conteúdo Publicado
    O conteúdo cadastrado pelo desenvolvedor é de sua responsabilidade e não passará por revisão prévia.
    A plataforma poderá despublicar portfólios que violem os termos de uso após denúncia, notificando o desenvolvedor.

# 12 Requisitos Funcionais
    RF-001 — Atualização do Perfil
    O sistema deverá permitir que o desenvolvedor atualize suas informações profissionais por meio de sua conta.

    RF-002 — Compartilhamento do Perfil
    O sistema deverá disponibilizar um endereço público compartilhável para acesso ao perfil profissional do desenvolvedor.

    RF-003 — Cadastro de Informações Profissionais
    O sistema deverá permitir o cadastro de informações profissionais, incluindo formação acadêmica, formação técnica, cursos, habilidades, experiências profissionais e projetos.

    RF-004 — Gerenciamento das Informações
    O sistema deverá permitir que o desenvolvedor adicione, edite e remova informações de seu perfil profissional.

    RF-005 — Persistência das Informações
    O sistema deverá armazenar as informações cadastradas pelo desenvolvedor para que possam ser utilizadas em futuras apresentações e atualizações do perfil.

    RF-006 — Geração da Apresentação
    O sistema deverá gerar uma apresentação profissional com base nas informações cadastradas pelo desenvolvedor.

    RF-007 — Organização das Informações
    O sistema deverá apresentar as informações profissionais de maneira organizada e compreensível.

    RF-008 — Personalização da Apresentação
    O sistema deverá adaptar a apresentação profissional conforme o contexto e os requisitos identificados na oportunidade informada pelo recrutador.

    RF-009 — Publicação e Despublicação
    O sistema deverá permitir que o desenvolvedor publique e despublique seu portfólio a qualquer momento.

    RF-010 — Acesso por Link Público
    O sistema deverá permitir que o recrutador acesse o perfil profissional por meio de um endereço público compartilhado pelo desenvolvedor.

    RF-011 — Acesso sem Cadastro
    O recrutador deverá conseguir visualizar o portfólio sem necessidade de criar uma conta na plataforma.

    RF-012 — Coleta de Contexto
    A IA deverá realizar perguntas ao recrutador para identificar o contexto e os requisitos da oportunidade.

    RF-013 — Contextualização
    O sistema deverá utilizar as respostas fornecidas pelo recrutador para contextualizar a apresentação do perfil profissional.

    RF-014 — Interpretação da Oportunidade
    O sistema deverá interpretar as informações fornecidas pelo recrutador sobre a oportunidade.

    RF-015 — Identificação de Requisitos
    O sistema deverá identificar habilidades, tecnologias, experiências e demais requisitos relevantes informados pelo recrutador.

    RF-016 — Priorização das Informações
    O sistema deverá priorizar inicialmente as informações profissionais mais relevantes para o contexto identificado.

    RF-017 — Destaque de Evidências Profissionais
    O sistema deverá destacar experiências, projetos e habilidades que apresentem maior relação com o contexto identificado.

    RF-018 — Identificação de Ausência de Informações Relevantes
    Quando não houver informações relevantes para a oportunidade, o sistema deverá identificar a ausência de informações relevantes entre o perfil profissional e o contexto informado.

    RF-019 — Template Base
    O sistema deverá possuir uma estrutura padrão para apresentação das informações profissionais do desenvolvedor.

    RF-020 — Fallback para Template Base
    Quando a camada de IA estiver indisponível, o sistema deverá utilizar automaticamente o template base para apresentação das informações profissionais.

    RF-021 — Gestão de Plano
    O sistema deverá permitir que o desenvolvedor faça upgrade ou downgrade de plano.

    RF-022 — Apresentação Condicionada ao Plano
    O sistema deverá exibir apresentação gerada por IA apenas para desenvolvedores com plano ativo compatível; caso contrário, utilizar o template base.

    RF-023 — Definição do Identificador Público
    O sistema deverá permitir que o desenvolvedor escolha o identificador que compõe o endereço público do seu portfólio, validando unicidade e formato.

    RF-024 — Pré-visualização
    O sistema deverá permitir que o desenvolvedor visualize seu portfólio exatamente como o recrutador o verá, tanto no template base quanto em uma apresentação contextualizada de exemplo.

    RF-025 — Ordenação Manual
    O sistema deverá permitir que o desenvolvedor defina manualmente a ordem padrão dos registros dentro de cada seção, utilizada pelo template base.

    RF-026 — Indicação de Origem da Apresentação
    O sistema deverá indicar ao recrutador, de forma discreta e legível, se a apresentação exibida foi contextualizada por IA ou corresponde ao template base.

    RF-027 — Justificativa da Priorização
    O sistema deverá apresentar ao recrutador uma justificativa curta da priorização aplicada, referenciando apenas informações cadastradas pelo desenvolvedor.

    RF-028 — Reinício do Contexto
    O sistema deverá permitir que o recrutador reinicie a coleta de contexto e obtenha uma nova apresentação, respeitando a cota e o rate limiting.

    RF-029 — Visualização do Portfólio Integral
    O sistema deverá permitir que o recrutador acesse a versão integral do portfólio a partir da apresentação contextualizada, sem nova interação com a IA.

    RF-030 — Consulta de Cota
    O sistema deverá exibir ao desenvolvedor a cota disponível, a cota consumida e a data de renovação do seu plano.

    RF-031 — Contratação de Plano
    O sistema deverá permitir a contratação do plano pago por meio de provedor externo de pagamento, com ativação automática após confirmação.

    RF-032 — Cancelamento de Plano
    O sistema deverá permitir o cancelamento do plano pago pelo próprio desenvolvedor, sem necessidade de contato com suporte.

    RF-033 — Histórico de Cobranças
    O sistema deverá disponibilizar ao desenvolvedor o histórico de cobranças e os respectivos comprovantes.

    RF-034 — Exportação de Dados Pessoais
    O sistema deverá permitir que o desenvolvedor exporte todas as suas informações cadastradas em formato legível por máquina.

    RF-035 — Exclusão de Conta
    O sistema deverá permitir que o desenvolvedor solicite a exclusão da sua conta e dos seus dados, despublicando imediatamente o portfólio.

    RF-036 — Recuperação de Acesso
    O sistema deverá permitir que o desenvolvedor recupere o acesso à sua conta por meio de verificação de e-mail.

    RF-037 — Registro de Auditoria de Geração
    O sistema deverá registrar cada tentativa de geração por IA, com portfólio, momento, resultado, latência e origem da apresentação entregue.

    RF-038 — Bloqueio por Excesso de Requisições
    O sistema deverá bloquear temporariamente novas gerações quando os limites de requisição forem excedidos, mantendo o portfólio acessível pelo template base.

    RF-039 — Pagamento por PIX
    O sistema deverá permitir o pagamento do plano por PIX com apresentação de QR Code e código copia e cola, com ativação automática após a confirmação do recebimento.

    RF-040 — Controle de Visibilidade de Contato
    O sistema deverá permitir que o desenvolvedor defina, por campo de contato, se o dado será exibido no portfólio público.

    RF-041 — Denúncia de Conteúdo
    O sistema deverá disponibilizar, no portfólio público, um meio de denunciar conteúdo que viole os termos de uso.

# 13 Requisitos Não Funcionais
    RNF-001 — Conformidade com a LGPD
    As informações pessoais e profissionais do desenvolvedor deverão ser armazenadas e tratadas em conformidade com a Lei Geral de Proteção de Dados.

    RNF-002 — Experiência Simplificada
    A experiência de acesso e visualização do portfólio deverá priorizar simplicidade, objetividade e baixo atrito para o recrutador.

    RNF-003 — Objetividade da Interação
    A interação inicial deverá ser curta e objetiva, evitando conversas desnecessárias que afastem o recrutador do portfólio.

    RNF-004 — Desempenho por Etapa
    A primeira resposta visível da camada de IA deverá ocorrer em até 5 segundos para 95% das requisições.
    A apresentação contextualizada completa deverá estar disponível em até 10 segundos para 95% das requisições.
    O template base deverá ser exibido em até 2 segundos para 95% dos acessos.

    RNF-005 — Disponibilidade
    O sistema deverá manter disponibilidade mínima de 99% mensal para acesso aos portfólios.

    RNF-006 — Confiabilidade
    As informações apresentadas devem corresponder aos dados fornecidos pelo desenvolvedor.

    RNF-007 — Transparência
    A plataforma não deve apresentar uma relação aproximada entre competências como se fosse uma competência efetivamente declarada pelo desenvolvedor.

    RNF-008 — Limite de Taxa
    O sistema deverá aplicar rate limiting às chamadas de IA por portfólio e por IP, prevenindo uso indevido.

    RNF-009 — Custo Unitário
    O custo médio de cada geração por IA deverá permanecer abaixo do valor definido como limite pelo modelo de negócio, monitorado continuamente.
    O limite vigente está definido no ADR-001, na seção 26.

    RNF-010 — Portabilidade de Provedor
    A substituição do provedor de modelo de linguagem não deverá exigir alteração nas regras de negócio nem na camada de dados.

    RNF-011 — Acessibilidade
    As interfaces públicas deverão atender aos critérios de nível AA das diretrizes de acessibilidade para conteúdo web,
    incluindo contraste, navegação por teclado e leitura por leitor de tela.

    RNF-012 — Responsividade
    As interfaces deverão funcionar adequadamente a partir de 360 pixels de largura.

    RNF-013 — Observabilidade
    O sistema deverá registrar erros, latências e eventos de negócio de forma consultável,
    permitindo diagnosticar falhas sem acesso ao banco de produção.

    RNF-014 — Segurança de Credenciais
    Segredos e chaves de provedores externos não poderão ser expostos ao cliente e deverão ser mantidos exclusivamente no ambiente de servidor.

    RNF-015 — Isolamento de Dados
    O acesso às informações profissionais deverá ser restrito ao respectivo proprietário na camada de dados, e não apenas na camada de aplicação.

    RNF-016 — Retenção de Contexto
    Os contextos informados por recrutadores e as apresentações em cache deverão possuir prazo de retenção definido,
    com expurgo automático após esse prazo, conforme a RN-021.

    RNF-017 — Idempotência de Cobrança
    O processamento de eventos do provedor de pagamento deverá ser idempotente,
    de modo que a reentrega de um mesmo evento não conceda cota nem cobrança em duplicidade.

# 14 Riscos e Premissas
### 14.1 Premissas
* recrutadores responderão às perguntas iniciais;
* desenvolvedores manterão seus perfis atualizados;
* a IA conseguirá interpretar requisitos da vaga.

### 14.2 Riscos
* baixa qualidade dos dados cadastrados;
* interpretações incorretas da IA;
* rejeição da etapa de contextualização;
* indisponibilidade do provedor de IA.

    Os riscos de natureza técnica estão detalhados, com mitigação, na seção 25.

# 15 Métricas de Sucesso
### 15.1 Produto
* número de perfis criados;
* número de apresentações geradas;
* taxa de compartilhamento.

### 15.2 Recrutadores
* tempo médio de análise;
* taxa de conclusão da contextualização;
* satisfação.

### 15.3 Desenvolvedores
* atualização de perfil;
* quantidade de links compartilhados;
* satisfação.

    A fonte de coleta de cada métrica está definida na seção 23.2.

# 16. Modelo de Domínio
### 16.1. Entidades principais

| Entidade                 | Responsabilidade                                                     | Relação                                    |
|--------------------------|----------------------------------------------------------------------|--------------------------------------------|
| Desenvolvedor            | Identidade autenticável e dono de todas as informações profissionais | Possui um Perfil e uma Assinatura          |
| Perfil                   | Dados de apresentação pessoal e profissional de nível superior       | Pertence a um Desenvolvedor                |
| Experiência              | Vínculo profissional com período, empresa, cargo e descrição         | Pertence a um Perfil                       |
| Projeto                  | Trabalho realizado, com descrição, papel e tecnologias utilizadas    | Pertence a um Perfil                       |
| Habilidade               | Competência declarada, com nível e tempo de uso                      | Pertence a um Perfil                       |
| Curso                    | Formação complementar, com instituição e carga horária               | Pertence a um Perfil                       |
| Formação Acadêmica       | Formação formal, com instituição, curso e período                    | Pertence a um Perfil                       |
| Portfólio                | Publicação do Perfil em endereço público, com estado e identificador | Pertence a um Perfil                       |
| Contexto de Oportunidade | Conjunto normalizado de respostas do recrutador                      | Referencia um Portfólio                    |
| Apresentação             | Resultado da priorização, com origem, ordenação e justificativa      | Deriva de um Contexto e de um Portfólio    |
| Plano                    | Definição comercial de cota e preço                                  | Referenciado por Assinatura                |
| Assinatura               | Vínculo do Desenvolvedor a um Plano, com estado e ciclo              | Pertence a um Desenvolvedor                |
| Registro de Geração      | Auditoria de cada tentativa de geração                               | Referencia um Portfólio                    |

### 16.2 Invariantes do domínio
* todo registro profissional pertence a exatamente um Perfil e é imutável para qualquer agente que não seja o seu proprietário;
* uma Apresentação só pode referenciar identificadores de registros pertencentes ao Portfólio de origem;
* a Apresentação não armazena texto descritivo copiado, e sim referências, ordenação e classificação de relevância;
* o consumo de cota é registrado de forma atômica junto ao resultado bem-sucedido da geração;
* a exclusão de um registro profissional invalida imediatamente qualquer Apresentação em cache que o referencie.

# 17. Fluxos Principais
### 17.1. Fluxo do Desenvolvedor
1. cria a conta e confirma o e-mail;
2. preenche as informações profissionais que desejar, sem obrigatoriedade de completude;
3. define o identificador público e pré-visualiza o portfólio;
4. publica o portfólio e compartilha o endereço;
5. acompanha a cota disponível e, quando necessário, contrata o plano pago.

### 17.2. Fluxo do Recrutador
1. acessa o endereço público recebido, sem qualquer cadastro;
2. visualiza imediatamente o template base já renderizado;
3. opcionalmente inicia a contextualização e responde até quatro perguntas;
4. acompanha a apresentação sendo reorganizada em tempo real;
5. lê a justificativa da priorização e, se desejar, abre o portfólio integral.

### 17.3. Fluxo de degradação
Quando a camada de IA falhar, exceder o tempo limite ou devolver resposta inválida, o sistema exibirá o template base
com aviso discreto de que a contextualização não está disponível no momento. Nenhuma cota é consumida e nenhum dado é alterado.
O recrutador permanece na mesma página, sem erro visível de sistema.

# 18. Contrato da Camada de IA
### 18.1. Princípio central
A garantia de integridade exigida pela RN-001 não pode depender da boa vontade do modelo.
Por isso a camada de IA opera sob um contrato fechado, no qual ela nunca recebe permissão para escrever fatos.

Entrada fornecida ao modelo
* o contexto normalizado informado pelo recrutador;
* um catálogo dos registros do portfólio, contendo identificador, tipo e um resumo curto gerado pelo próprio dado cadastrado.

Saída aceita do modelo
* lista ordenada de identificadores considerados relevantes;
* classificação de relevância por identificador;
* marcação de correspondência aproximada, quando aplicável, com indicação da competência solicitada e da competência cadastrada relacionada;
* uma justificativa curta da priorização;
* indicador de ausência de informações relevantes.

Toda a renderização de conteúdo factual é feita pela aplicação, a partir do banco de dados, usando apenas os identificadores devolvidos.

### 18.2. Validações obrigatórias antes de exibir
* o formato da resposta é validado contra um esquema estrito;
* todo identificador devolvido é confrontado com os identificadores realmente pertencentes ao portfólio;
* identificadores desconhecidos invalidam a resposta inteira;
* marcações de correspondência aproximada sem competência cadastrada correspondente são descartadas;
* a justificativa passa por verificação de menção a tecnologias não cadastradas;
* resposta invalidada aciona o fallback do RF-020 sem consumo de cota.

### 18.3. Comportamento diante de ausência de informação
Quando o modelo indicar ausência de informações relevantes, o sistema exibirá o portfólio integral, conforme RN-004,
acompanhado de uma nota objetiva informando que não foram identificadas evidências diretamente relacionadas ao contexto informado.
Essa nota é gerada pela aplicação, não pelo modelo.

### 18.4. Defesa contra injeção de instrução
As respostas do recrutador são dados, nunca instruções.
Além do truncamento previsto na RN-018, o contexto é transportado em campo separado da instrução do sistema,
e o contrato de saída impede que qualquer tentativa de injeção produza texto factual exibido ao recrutador.
Na pior hipótese, uma tentativa de injeção resulta em resposta rejeitada pela validação e em exibição do template base.

# 19. Arquitetura da Solução
### 19.1. Estilo arquitetural
Monólito modular executado em ambiente serverless, com fronteiras internas explícitas por domínio.
A escolha considera a decisão DEC-002, de equipe composta por uma única pessoa, e a necessidade de manter custo fixo próximo de zero.
A modularização interna preserva a possibilidade de extrair a camada de IA como serviço independente caso o volume justifique.

### 19.2. Decisões de engenharia registradas
| ID      | Decisão                                                                     | Justificativa                                                                                                    |
|---------|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| DEC-001 | Cobrança real no MVP, com cota gratuita de uma geração                        | Valida disposição a pagar já na primeira versão e cria controle comercial sobre o acesso à IA                       |
| DEC-002 | Produto construído por um único desenvolvedor                                  | Define monólito modular em vez de serviços separados, reduzindo custo de coordenação e de infraestrutura            |
| DEC-003 | Infraestrutura em camada gratuita durante o desenvolvimento                    | Custo fixo próximo de zero até existir receita, com caminho de migração previsto e sem reescrita                     |
| DEC-004 | Geração síncrona com streaming e cache determinístico por contexto             | Atende à percepção de velocidade exigida pelo recrutador e reduz consumo de cota em acessos repetidos               |
| DEC-005 | A IA nunca produz texto factual, apenas seleciona e ordena identificadores      | Torna a RN-001 verificável por código em vez de depender da obediência do modelo                                     |
| DEC-006 | Camada de IA acessada por interface abstrata com dois provedores                | Viabiliza o RF-020 de forma real, com troca de provedor sem alteração de regra de negócio                            |
| DEC-007 | Aplicação web responsiva, sem aplicativo nativo                                | O recrutador acessa por link recebido em e-mail ou mensagem, cenário em que a web tem menor atrito                   |
| DEC-008 | Idioma único no MVP, português do Brasil                                       | Internacionalização multiplica esforço de conteúdo e de prompt sem validar a hipótese central do produto             |
| DEC-009 | Pagamento por PIX com QR Code, além de cartão                                   | PIX é o meio dominante no Brasil e possui custo por transação menor e previsível, conforme apurado no ADR-003        |
| DEC-010 | Cota dimensionada por controle de acesso e abuso, não por custo de inferência   | O custo de inferência por geração é irrisório, conforme demonstrado no ADR-001; a cota existe para sustentar o plano  |

### 19.3. Módulos
| Módulo       | Responsabilidade                                                                            |
|--------------|----------------------------------------------------------------------------------------------|
| identidade   | cadastro, autenticação, sessão, recuperação de acesso e exclusão de conta                     |
| perfil       | operações sobre informações profissionais e regras de integridade dos registros               |
| publicacao   | estados do portfólio, identificador público, pré-visualização e renderização do template base |
| contexto     | coleta, normalização, limitação e persistência efêmera das respostas do recrutador             |
| inteligencia | orquestração dos provedores de modelo, contrato de saída, validação e fallback                 |
| cobranca     | planos, assinatura, cota, integração com o provedor de pagamento e processamento de webhooks   |
| protecao     | rate limiting, auditoria de gerações e registros de acesso                                    |

### 19.4. Fronteiras e dependências
* o módulo de inteligência depende de perfil apenas por meio de um catálogo somente leitura, nunca escrevendo dados profissionais;
* o módulo de publicação renderiza o template base sem qualquer dependência do módulo de inteligência, o que torna o RF-020 estrutural;
* o módulo de cobrança é a única fonte de verdade sobre cota, consultado pelo módulo de inteligência antes de cada geração;
* o módulo de proteção intercepta as requisições públicas antes de qualquer custo variável ser incorrido;
* nenhum módulo acessa diretamente as tabelas de outro módulo.

### 19.5. Estratégia de cache e cota
Cada contexto informado gera uma chave determinística composta pelo identificador do portfólio, pela versão corrente do perfil
e pelo conteúdo normalizado das respostas do recrutador. Apresentações são armazenadas sob essa chave pelo prazo da RN-021.
Acessos subsequentes com chave idêntica são servidos do cache, sem custo de modelo e sem consumo de cota, conforme RN-009.
Qualquer alteração no perfil incrementa a versão e invalida as chaves anteriores, conforme RN-010.

    A normalização que produz a chave é parte do contrato e precisa ser estável:
    * texto convertido para minúsculas, sem acentuação e sem pontuação de borda;
    * espaços múltiplos colapsados;
    * listas de tecnologias ordenadas alfabeticamente antes da composição da chave;
    * campos de resposta fechada representados pelo código da opção, não pelo rótulo exibido.

### 19.6. Ambientes
* desenvolvimento local com banco isolado;
* pré-produção com dados fictícios, usada para validar os critérios de avaliação da seção 20;
* produção com segredos próprios, sem compartilhamento de chaves entre ambientes.

# 20. Critérios de Avaliação (CA's)
    CA-001 — Atualização
        Dado que existe uma informação profissional cadastrada;
        Quando o desenvolvedor alterar essa informação e salvar;
        Então a informação deverá ser atualizada no perfil.
    CA-002 — Persistência
        Dado que o desenvolvedor alterou e salvou uma informação;
        Quando o desenvolvedor acessar o perfil;
        Então a informação atualizada deverá permanecer disponível.
    CA-003 — Disponibilização
        Dado: o desenvolvedor possui um perfil.
        Quando: o perfil estiver disponível para compartilhamento.
        Então: a plataforma deverá disponibilizar um endereço público para esse perfil.
    CA-004 — Acesso
        Dado: existe um endereço público válido.
        Quando: uma pessoa acessar esse endereço.
        Então: ela deverá conseguir acessar o perfil profissional do desenvolvedor.
    CA-005 — Tipos de Informação Profissional
        Dado: o desenvolvedor acessa a área de cadastro;
        Quando: ele cadastrar diferentes informações profissionais;
        Então: todas as informações, ao acessar a área de cadastro, deverão estar organizadas nos seus devidos locais.
    CA-006 — Adicionar
        Dado: o desenvolvedor já possui um perfil;
        Quando: ele decide acrescentar uma nova informação;
        Então: essa informação estará disponível no perfil do desenvolvedor.
    CA-007 — Editar
        Dado: o desenvolvedor possui uma informação cadastrada;
        Quando: ele altera essa informação;
        Então: essa informação estará atualizada no perfil do desenvolvedor, substituindo a anterior.
    CA-008 — Remover
        Dado: o desenvolvedor possui uma informação cadastrada;
        Quando: ele decide removê-la;
        Então: a informação não aparece mais nos dados do seu perfil.
    CA-009 — Salvar Informações
        Dado: o desenvolvedor entra no perfil;
        Quando: ele cadastrar suas informações;
        Então: essa informação deverá permanecer persistida na plataforma para acessos futuros.
    CA-010 — Apresentação
        Dado: as informações cadastradas no perfil do desenvolvedor;
        Quando: a plataforma gera a visualização do perfil;
        Então: é gerada uma apresentação das informações do desenvolvedor na plataforma.
    CA-011 — Organização
        Dado: a apresentação gerada pela plataforma;
        Quando: o recrutador acessar o link da apresentação;
        Então: a apresentação estará organizada de acordo com as informações do perfil do desenvolvedor.
    CA-012 — Acesso
        Dado: o recrutador com o link de acesso da plataforma;
        Quando: ele acessa a plataforma pelo link e apresenta o contexto da vaga;
        Então: a plataforma deverá adaptar a apresentação do desenvolvedor de acordo com o contexto apresentado pelo recrutador.
    CA-013 — Integridade das Informações
        Dado: as informações profissionais do desenvolvedor;
        Quando: o sistema gerar a apresentação;
        Então: a apresentação deverá conter somente informações fornecidas pelo desenvolvedor.
    CA-014 — Acesso sem Cadastro
        Dado: o recrutador recebe um link público;
        Quando: ele acessa a plataforma com o link;
        Então: o recrutador deverá conseguir visualizar o portfólio sem criar ou possuir uma conta.
    CA-015 — Experiência Simplificada
        Dado: o recrutador possui e acessa o link público;
        Quando: ele acessa o link;
        Então: consegue visualizar o portfólio sem precisar realizar cadastro ou passar por etapas desnecessárias.
    CA-016 — Experiência Objetiva
        Dado: o recrutador acessou o portfólio e iniciou a interação com a IA;
        Quando: a IA realiza a interação inicial;
        Então: a IA deverá realizar somente as perguntas necessárias para compreender o contexto, respeitando o limite estabelecido.
    CA-017 — Perguntas
        Dado: a interação da IA com o recrutador;
        Quando: o recrutador inicia a interação;
        Então: a IA deverá realizar no máximo quatro perguntas durante a interação inicial.
    CA-018 — Contexto
        Dado: o recrutador iniciou a interação;
        Quando: a IA realizar as perguntas iniciais;
        Então: a IA deverá identificar o contexto e os requisitos informados pelo recrutador.
    CA-019 — Contextualização
        Dado: o contexto apresentado pelo recrutador;
        Quando: o sistema identificar o contexto da oportunidade;
        Então: é gerada uma apresentação baseada no contexto.
    CA-020 — Interpretação
        Dado: a identificação do contexto pela IA;
        Quando: o sistema gerar a apresentação;
        Então: o sistema deverá compreender a oportunidade informada pelo recrutador.
    CA-021 — Requisitos
        Dado: o contexto do recrutador;
        Quando: o sistema interpretar o contexto;
        Então: o sistema deverá identificar as habilidades, tecnologias, experiências e demais requisitos relevantes para a oportunidade.
    CA-022 — Priorização
        Dado: informações profissionais disponíveis;
        Quando: o contexto da oportunidade for interpretado;
        Então: as informações mais relevantes e compatíveis com esse contexto serão priorizadas.
    CA-023 — Evidências Profissionais
        Dado: as informações profissionais disponíveis;
        Quando: o contexto for interpretado pelo sistema;
        Então: o sistema deverá destacar as experiências, projetos e habilidades mais importantes do desenvolvedor que apresentem maior relação com o contexto identificado.
    CA-024 — Integridade
        Dado: informações profissionais cadastradas;
        Quando: o sistema priorizar ou reorganizar essas informações;
        Então: o conteúdo original deverá permanecer inalterado.
    CA-025 — Compatibilidade Parcial
        Dado: existir uma competência cadastrada e uma competência solicitada pelo recrutador;
        Quando: o sistema identificar uma relação entre elas;
        Então: o sistema poderá apresentar essa relação, mas deverá deixar claro que é uma correspondência aproximada, e não uma competência efetivamente cadastrada.
    CA-026 — Ausência de Informações Relevantes
        Dado: informações e competências profissionais cadastradas;
        Quando: o sistema analisar essas informações em relação ao contexto da vaga;
        Então: o sistema deverá identificar que não existem informações relevantes relacionadas à oportunidade.
    CA-027 — Apresentação Integral
        Dado: o sistema identificou ausência de informações relevantes;
        Quando: essa condição ocorrer;
        Então: o sistema deverá mostrar ao recrutador a apresentação completa do portfólio do desenvolvedor.
    CA-028 — Template Base
        Dado: informações profissionais cadastradas;
        Quando: o sistema gerar a apresentação utilizando a estrutura padrão;
        Então: o portfólio deverá ser apresentado conforme o template base.
    CA-029 — Fallback
        Dado: a IA está indisponível;
        Quando: o recrutador acessar o portfólio;
        Então: o sistema deverá utilizar automaticamente o template base para apresentação das informações profissionais.
    CA-030 — LGPD
        Dado: existem informações pessoais e profissionais cadastradas pelo desenvolvedor;
        Quando: o desenvolvedor acessar o gerenciamento do perfil;
        Então: o desenvolvedor deverá conseguir acessar somente as próprias informações, mediante autenticação.
    CA-031 — Rapidez
        Dado: o recrutador iniciou a interação;
        Quando: a camada de IA processar o contexto informado;
        Então: a primeira resposta visível deverá ocorrer em até 5 segundos, conforme o RNF-004.
    CA-032 — Fidelidade
        Dado: um perfil profissional cadastrado;
        Quando: a IA gerar uma apresentação contextualizada;
        Então: todas as informações exibidas deverão estar presentes nos dados fornecidos pelo desenvolvedor.
    CA-033 — Autenticação
        Dado: um desenvolvedor autenticado;
        Quando: ele atualizar seu perfil;
        Então: a alteração deverá refletir em todas as futuras apresentações geradas.
    CA-034 — Disponibilização de Portfólio
        Dado: um desenvolvedor com apenas parte do perfil preenchido;
        Quando: ele publicar seu portfólio;
        Então: o sistema deverá permitir a disponibilização normalmente.
    CA-035 — Preservação dos Dados na Falha
        Dado: indisponibilidade da camada de IA;
        Quando: um recrutador acessar o perfil;
        Então: nenhum dado cadastrado pelo desenvolvedor deverá ser alterado ou perdido.
    CA-036 — Rejeição de Informação Inexistente
        Dado: a camada de IA retorna um identificador que não pertence ao portfólio;
        Quando: o sistema validar a resposta;
        Então: a resposta deverá ser rejeitada e o template base deverá ser exibido, sem consumo de cota.
    CA-037 — Cota Gratuita Esgotada
        Dado: um desenvolvedor no plano gratuito que já consumiu sua única geração;
        Quando: um recrutador informar um novo contexto;
        Então: o sistema deverá exibir o template base, sem chamada à camada de IA.
    CA-038 — Reaproveitamento de Contexto
        Dado: um contexto equivalente já processado para o mesmo portfólio e a mesma versão de perfil;
        Quando: um recrutador informar esse contexto novamente dentro da janela de retenção;
        Então: o sistema deverá reutilizar a apresentação armazenada, sem consumir cota adicional.
    CA-039 — Invalidação por Alteração de Perfil
        Dado: uma apresentação armazenada em cache;
        Quando: o desenvolvedor alterar qualquer informação profissional;
        Então: a apresentação armazenada deverá ser invalidada e uma nova geração deverá ser necessária.
    CA-040 — Portfólio Despublicado
        Dado: um portfólio no estado despublicado;
        Quando: alguém acessar o endereço público;
        Então: o sistema deverá informar indisponibilidade sem expor qualquer informação do desenvolvedor.
    CA-041 — Identificador Público Único
        Dado: um identificador público já está em uso;
        Quando: outro desenvolvedor tentar utilizá-lo;
        Então: o sistema deverá recusar a operação e informar o motivo.
    CA-042 — Bloqueio por Excesso de Requisições
        Dado: os limites de requisição de um portfólio foram excedidos;
        Quando: uma nova contextualização for solicitada;
        Então: o sistema deverá recusar a geração e manter o portfólio acessível pelo template base.
    CA-043 — Indicação de Origem
        Dado: uma apresentação exibida ao recrutador;
        Quando: ela for renderizada;
        Então: o sistema deverá indicar se a apresentação foi contextualizada por IA ou corresponde ao template base.
    CA-044 — Falha de Pagamento
        Dado: uma assinatura ativa cujo pagamento falhou;
        Quando: o período de tolerância de sete dias se encerrar sem regularização;
        Então: a conta deverá retornar ao comportamento do plano gratuito, sem perda de informações cadastradas.
    CA-045 — Exclusão de Conta
        Dado: um desenvolvedor que solicita a exclusão da conta;
        Quando: a solicitação for confirmada;
        Então: o portfólio deverá ficar imediatamente indisponível e os dados pessoais deverão ser removidos.
    CA-046 — Neutralidade na Priorização
        Dado: um perfil que contenha informações pessoais como idade ou localidade;
        Quando: o sistema priorizar as informações para um contexto;
        Então: essas características não poderão influenciar a ordenação apresentada.
    CA-047 — Portabilidade de Provedor
        Dado: o provedor primário de modelo está indisponível;
        Quando: uma contextualização for solicitada;
        Então: o sistema deverá utilizar o provedor secundário e, na falha deste, o template base.
    CA-048 — Pagamento por PIX
        Dado: um desenvolvedor que escolheu pagar por PIX;
        Quando: o pagamento for confirmado pelo provedor;
        Então: o plano deverá ser ativado automaticamente, sem intervenção manual.
    CA-049 — Visibilidade de Contato
        Dado: um campo de contato marcado como não exibido;
        Quando: o recrutador acessar o portfólio público;
        Então: esse campo não deverá aparecer em nenhuma versão da apresentação.
    CA-050 — Expurgo por Retenção
        Dado: uma apresentação gerada há mais de trinta dias;
        Quando: a rotina de expurgo for executada;
        Então: a apresentação e o contexto que a originou deverão ser removidos, preservando apenas o registro de auditoria.
    CA-051 — Idempotência de Cobrança
        Dado: um evento de pagamento já processado;
        Quando: o provedor reenviar o mesmo evento;
        Então: o sistema não deverá conceder cota nem registrar cobrança em duplicidade.
    CA-052 — Isolamento entre Contas
        Dado: dois desenvolvedores distintos com perfis cadastrados;
        Quando: um deles tentar acessar registros do outro por qualquer caminho da aplicação;
        Então: o acesso deverá ser negado na camada de dados.
    CA-053 — Tentativa de Injeção de Instrução
        Dado: um recrutador que insere instruções maliciosas nas respostas de contexto;
        Quando: o sistema processar esse contexto;
        Então: nenhuma informação não cadastrada deverá ser exibida, e a resposta deverá ser rejeitada ou renderizada apenas com identificadores válidos.

# 21. Stack Recomendada
### 21.1. Critérios de escolha
A recomendação foi construída a partir de quatro restrições já decididas.
* um único desenvolvedor, o que penaliza qualquer stack que exija manter dois repositórios e dois ciclos de deploy;
* custo próximo de zero até existir receita, o que exclui infraestrutura gerenciada por hora;
* cobrança real desde o MVP, o que impõe atenção às condições de uso comercial das camadas gratuitas;
* requisito estrutural de fallback sem IA, o que exige que a renderização não dependa do provedor de modelo.

### 21.2. Recomendação por camada
| Camada                | Recomendação                                                            | Por que                                                                                                                                       |
|-----------------------|-------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| Linguagem             | TypeScript                                                              | Tipagem única do banco à interface, o que reduz erro de integração em um time de uma pessoa                                                      |
| Aplicação             | Next.js com App Router                                                  | Front e back no mesmo projeto e no mesmo deploy; renderização no servidor entrega o template base rápido, atendendo ao RNF-004                   |
| Interface             | Tailwind CSS com biblioteca de componentes acessíveis                   | Velocidade de construção sem sacrificar o RNF-011, já que os componentes acessíveis trazem semântica e navegação por teclado prontas             |
| Banco de dados        | PostgreSQL gerenciado                                                   | Modelo relacional se ajusta às entidades da seção 16; transações garantem o consumo atômico de cota exigido pela RN-008                          |
| Acesso a dados        | ORM tipado com migrações versionadas                                    | Migração versionada é pré-requisito para evoluir o schema sem perder dados, o que sustenta o RF-005                                              |
| Autenticação          | Serviço de autenticação integrado ao banco                              | Evita construir sessão e recuperação de senha do zero, e permite aplicar isolamento na camada de dados, atendendo ao RNF-015                     |
| Validação             | Biblioteca de esquemas em tempo de execução                             | O mesmo esquema valida formulário, requisição e resposta do modelo, o que operacionaliza a RN-017                                                |
| Camada de IA          | Biblioteca de abstração de provedores com streaming e saída estruturada  | Troca de provedor sem alterar regra de negócio, atendendo ao RNF-010, e streaming necessário para a DEC-004                                      |
| Modelo primário       | Gemini 2.5 Flash-Lite                                                   | Menor custo entre os modelos com JSON Schema garantido e o único com camada gratuita real de API, conforme apurado no ADR-001                    |
| Modelo secundário     | Mistral Small 4 ou GPT da linha nano                                    | Provedor único é o risco mais provável de indisponibilidade citado na seção 14.2; ambos suportam saída estruturada estrita                       |
| Cache e rate limiting | Armazenamento chave-valor gerenciado, com fallback no próprio banco     | Rate limiting precisa ser rápido e barato; manter fallback no banco evita indisponibilidade por dependência acessória                            |
| Pagamentos            | Provedor brasileiro com PIX, cartão e recorrência                       | PIX com QR Code é requisito do RF-039, e provedores globais ainda tratam PIX como recurso restrito, conforme apurado no ADR-003                  |
| E-mail transacional   | Serviço de envio com camada gratuita                                    | Necessário para o RF-036 e para avisos de cobrança                                                                                              |
| Monitoramento         | Captura de erros e métricas com camada gratuita                         | Requisito direto do RNF-013 e condição para medir o RNF-004                                                                                     |
| Testes                | Testes unitários e de integração, mais testes de ponta a ponta          | Os critérios de avaliação da seção 20 são naturalmente traduzíveis em cenários automatizados                                                     |
| Integração contínua   | Pipeline no próprio repositório                                         | Impede que uma regressão de integridade chegue à produção sem revisão                                                                           |

### 21.3. Alternativas avaliadas e descartadas
| Alternativa                                        | Motivo do descarte                                                                                                        |
|----------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| API separada em outra linguagem                     | Dobra o custo de manutenção e deploy sem benefício técnico no volume esperado do MVP                                         |
| Banco de dados orientado a documentos               | As invariantes da seção 16.2 dependem de integridade referencial e transação, que o modelo relacional entrega naturalmente   |
| Busca vetorial para casar contexto e perfil         | O volume de registros por portfólio é pequeno; o custo e a complexidade não se justificam antes de existirem dados de uso     |
| Chamada direta ao provedor de modelo pelo cliente   | Exporia chaves, violando o RNF-014, e impossibilitaria o controle de cota exigido pela RN-007                                |
| Modelo de raciocínio avançado como primário         | Latência incompatível com o RNF-004 e custo unitário desnecessário para uma tarefa de classificação e ordenação              |
| Arquitetura de microsserviços                       | Contraria a DEC-002 e introduz custo operacional sem demanda de escala que o justifique                                      |
| Provedor global de pagamento como único meio        | PIX fica indisponível ou restrito, o que contraria o RF-039 em um mercado onde PIX é o meio dominante                        |

### 21.4. Alerta sobre hospedagem e uso comercial
Existe um conflito direto entre a decisão de cobrar desde o MVP e a intenção de operar em camada gratuita de hospedagem.
A política de uso justo da Vercel restringe o plano Hobby a uso pessoal e não comercial, e classifica explicitamente como uso comercial
qualquer implantação que solicite ou processe pagamento de visitantes, exigindo plano Pro ou Enterprise nesses casos.

    Encaminhamento decidido, conforme ADR-002
        * durante o desenvolvimento e a validação, sem cobrança ativa, a camada gratuita atende;
        * no momento em que a cobrança for ativada, migrar para o plano pago da própria plataforma;
        * manter a aplicação livre de recursos proprietários da plataforma, para que a migração seja uma troca de destino de deploy e não uma reescrita.

    Fontes: [Vercel Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines) e [Vercel Hobby plan](https://vercel.com/docs/plans/hobby).

### 21.5. Custos previstos
| Fase                          | Custo fixo esperado                       | Custo variável                                              |
|-------------------------------|-------------------------------------------|--------------------------------------------------------------|
| Desenvolvimento               | próximo de zero                            | consumo de modelo em testes, coberto pela camada gratuita     |
| Lançamento com cobrança ativa | plano de hospedagem comercial e domínio    | consumo de modelo por geração e taxa por transação            |
| Crescimento                   | banco e hospedagem escalonados             | consumo de modelo proporcional às gerações                    |

O custo fixo de hospedagem é o item dominante, e não a inferência.
A demonstração numérica está no ADR-001. O custo variável é contido por três mecanismos já previstos:
cota por plano, cache determinístico e rate limiting.

# 22. Segurança, Privacidade e LGPD
### 22.1. Princípios
* o desenvolvedor é o titular dos dados e controla publicação, despublicação e exclusão;
* o portfólio publicado expõe apenas o que o desenvolvedor cadastrou e optou por publicar;
* dados de contato são exibidos somente conforme a escolha registrada na RN-020;
* as respostas do recrutador são tratadas como dados de contexto, sem identificação pessoal, conforme RN-016.

### 22.2. Controles técnicos
* isolamento de leitura e escrita na camada de dados por proprietário, conforme RNF-015;
* segredos apenas no servidor, conforme RNF-014;
* expurgo automático de contextos e apresentações, conforme RN-021 e RNF-016;
* registro de auditoria das gerações, conforme RF-037;
* proteção contra abuso por rate limiting, conforme RNF-008 e RF-038;
* ausência de indexação por padrão, conforme RN-015;
* idempotência no processamento de eventos de pagamento, conforme RNF-017.

### 22.3. Direitos do titular
Exportação completa pelo RF-034 e exclusão pelo RF-035, ambos executáveis pelo próprio desenvolvedor,
sem intermediação de suporte e com efeito imediato sobre a disponibilidade pública do portfólio.

# 23. Observabilidade e Objetivos de Serviço
### 23.1. Objetivos de serviço
| SLO                                       | Meta                            | Origem              |
|-------------------------------------------|---------------------------------|----------------------|
| Disponibilidade mensal do portfólio       | igual ou superior a 99%          | RNF-005             |
| Primeira resposta da IA no percentil 95   | até 5 segundos                   | RNF-004             |
| Apresentação completa no percentil 95     | até 10 segundos                  | RNF-004 e meta 8.2  |
| Exibição do template base no percentil 95 | até 2 segundos                   | RNF-004             |
| Taxa de fallback acionado                 | abaixo de 5% das tentativas      | RF-020              |
| Taxa de resposta rejeitada na validação   | abaixo de 2% das tentativas      | RN-017              |
| Custo médio por geração                   | abaixo do limite do ADR-001      | RNF-009             |

### 23.2. Eventos de negócio instrumentados
Esta seção define a fonte de coleta das métricas declaradas na seção 15.

| Métrica da seção 15                     | Evento que a alimenta                                              |
|-----------------------------------------|---------------------------------------------------------------------|
| número de perfis criados                | conta criada e perfil criado                                        |
| número de apresentações geradas         | apresentação entregue, segmentada por origem                        |
| taxa de compartilhamento                | portfólio publicado e primeiro acesso externo ao endereço público    |
| tempo médio de análise                  | duração da sessão do recrutador entre acesso e saída                 |
| taxa de conclusão da contextualização   | contextualização iniciada e contextualização concluída               |
| satisfação do recrutador                | avaliação opcional exibida ao final da apresentação                  |
| atualização de perfil                   | perfil atualizado                                                   |
| quantidade de links compartilhados      | acessos distintos ao endereço público                                |
| satisfação do desenvolvedor             | avaliação opcional no painel                                        |

    Eventos adicionais necessários para operação, não vinculados às métricas de produto:
    * cota consumida e cota esgotada;
    * plano contratado, cancelado e pagamento falhado;
    * fallback acionado, com motivo;
    * resposta rejeitada pela validação, com tipo de violação.

# 24. Roadmap de Entrega
### 24.1. Sequência
| Entrega | Conteúdo                                                              | Requisitos cobertos                                          |
|---------|-----------------------------------------------------------------------|---------------------------------------------------------------|
| EN-01   | Fundação, identidade e modelo de dados                                 | RF-005, RF-036, RNF-014, RNF-015, CA-030, CA-052              |
| EN-02   | Gerenciamento completo do perfil profissional                          | RF-001, RF-003, RF-004, RF-025, RF-040, CA-001 a CA-009       |
| EN-03   | Publicação, endereço público e template base                           | RF-002, RF-007, RF-009 a RF-011, RF-019, RF-023, RF-024       |
| EN-04   | Coleta de contexto, camada de IA, validação e fallback                 | RF-006, RF-008, RF-012 a RF-018, RF-020, RF-026 a RF-029      |
| EN-05   | Planos, cota, cobrança por cartão e PIX, e proteção contra abuso       | RF-021, RF-022, RF-030 a RF-033, RF-038, RF-039, RNF-008      |
| EN-06   | LGPD, observabilidade, acessibilidade e endurecimento para lançamento  | RF-034, RF-035, RF-037, RF-041, RNF-011 a RNF-013, RNF-016    |

### 24.2. Racional da ordem
A entrega EN-03 conclui um produto utilizável sem qualquer dependência de IA.
Isso é deliberado: garante que o fallback exigido pelo RF-020 seja consequência da arquitetura e não um caminho de exceção
construído às pressas depois. Também permite validar com recrutadores reais antes de incorrer em custo variável.

A entrega EN-05 vem depois de EN-04 porque a cota só faz sentido quando existe algo a ser limitado,
e porque a decisão de hospedagem descrita em 21.4 precisa estar executada antes de a cobrança ser ativada.

### 24.3. Marcos de validação
* ao final de EN-03, medir o tempo de compreensão do portfólio por recrutadores reais, estabelecendo a linha de base da meta de redução de 30%;
* ao final de EN-04, medir taxa de conclusão da contextualização, taxa de fallback e taxa de rejeição na validação;
* ao final de EN-05, medir conversão do plano gratuito para o pago e custo médio por geração.

# 25. Riscos Técnicos
| ID     | Risco                                                        | Impacto | Mitigação                                                                                   |
|--------|--------------------------------------------------------------|---------|----------------------------------------------------------------------------------------------|
| RT-001 | Modelo referenciar informação inexistente                     | Alto    | Contrato de saída por identificadores e validação obrigatória, conforme seção 18              |
| RT-002 | Indisponibilidade do provedor de modelo                       | Alto    | Provedor secundário e template base independente, conforme RNF-010 e RF-020                   |
| RT-003 | Custo de modelo acima do previsto                             | Baixo   | Cota por plano, cache determinístico e rate limiting, com monitoramento do RNF-009            |
| RT-004 | Latência acima do exigido pelo RNF-004                        | Médio   | Streaming, catálogo enxuto enviado ao modelo e template base renderizado no servidor           |
| RT-005 | Uso comercial em camada gratuita de hospedagem                | Alto    | Migração decidida no ADR-002, executada antes da ativação da cobrança                          |
| RT-006 | Abandono do recrutador na etapa de contextualização           | Médio   | Portfólio já visível antes das perguntas e contextualização como passo opcional                |
| RT-007 | Perfis com poucos dados gerando apresentação pobre            | Médio   | RN-004 e RF-018, mais orientação ativa de preenchimento no painel do desenvolvedor             |
| RT-008 | Vazamento de dados entre contas                               | Alto    | Isolamento na camada de dados exigido pelo RNF-015, verificado pelo CA-052                     |
| RT-009 | Injeção de instrução pelas respostas do recrutador            | Médio   | Defesa descrita em 18.4, verificada pelo CA-053                                                |
| RT-010 | Dependência de uma única pessoa para todo o desenvolvimento   | Médio   | Documentação viva, testes automatizados dos critérios de avaliação e ausência de conhecimento tácito |
| RT-011 | Alteração de preço ou descontinuação do modelo escolhido      | Médio   | Abstração de provedor pelo RNF-010 e monitoramento contínuo do custo unitário                   |
| RT-012 | Reentrega de evento de pagamento gerando cota em duplicidade   | Médio   | Idempotência exigida pelo RNF-017, verificada pelo CA-051                                       |

O risco RT-003 foi reclassificado de Alto para Baixo após a apuração de custo do ADR-001.

# 26. Decisões Arquiteturais
### 26.1. ADR-001 — Preço do plano pago e tamanho da cota
    Contexto
    Era necessário definir o valor do plano Pro e a cota mensal de gerações. A premissa inicial era que o custo de inferência
    seria o fator determinante do preço. A apuração mostrou que essa premissa estava errada.

    Custo apurado por geração
    O contrato da seção 18 envia ao modelo o contexto normalizado e um catálogo compacto do portfólio, e recebe de volta
    identificadores, classificação e uma justificativa curta. Isso resulta em aproximadamente 2.100 tokens de entrada
    e 450 tokens de saída por geração. Aplicando os preços vigentes de agosto de 2026:

| Modelo                | Entrada — US$/1M | Saída — US$/1M | Custo por geração | Custo de 100 gerações |
|-----------------------|-----------------:|---------------:|------------------:|----------------------:|
| Gemini 2.5 Flash-Lite | 0,10             | 0,40           | US$ 0,00039        | R$ 0,20               |
| Ministral 3 8B        | 0,15             | 0,15           | US$ 0,00038        | R$ 0,20               |
| DeepSeek V4 Flash     | 0,14             | 0,28           | US$ 0,00042        | R$ 0,21               |
| Mistral Small 4       | 0,15             | 0,60           | US$ 0,00059        | R$ 0,30               |
| GPT linha nano        | 0,20             | 1,25           | US$ 0,00098        | R$ 0,50               |
| Gemini 2.5 Flash      | 0,30             | 2,50           | US$ 0,00176        | R$ 0,90               |
| Claude Haiku 4.5      | 1,00             | 5,00           | US$ 0,00435        | R$ 2,22               |

    Preços de entrada e saída conforme as páginas oficiais de cada fornecedor:
    [Google Gemini](https://ai.google.dev/gemini-api/docs/pricing),
    [Mistral](https://mistral.ai/pricing/api/),
    [DeepSeek](https://api-docs.deepseek.com/quick_start/pricing),
    [OpenAI](https://developers.openai.com/api/docs/pricing) e
    [Anthropic](https://platform.claude.com/docs/en/about-claude/pricing).
    Conversão pela cotação de aproximadamente R$ 5,10 por dólar em 07/08/2026, conforme [Bloomberg Línea](https://www.bloomberglinea.com.br/quote/USDBRL:CUR/).

    Conclusão determinante
    Cem gerações no modelo recomendado custam cerca de vinte centavos de real.
    O custo de inferência é, portanto, irrelevante na formação do preço.
    Os custos que realmente importam são a hospedagem comercial, em torno de R$ 102 por mês no plano pago da Vercel,
    e a taxa por transação do provedor de pagamento.

    Decisão
| Item                          | Definição                                                                                         |
|-------------------------------|----------------------------------------------------------------------------------------------------|
| Plano Gratuito                | R$ 0. Uma geração por IA em toda a vida da conta. Template base ilimitado. Retenção de trinta dias  |
| Plano Pro mensal              | R$ 19,90 por mês, com 100 gerações por IA por mês                                                   |
| Plano Pro anual               | R$ 199,00 por ano, equivalente a dois meses gratuitos, com a mesma cota mensal                      |
| Modelo primário               | Gemini 2.5 Flash-Lite                                                                              |
| Limite de custo do RNF-009    | R$ 0,05 por geração, que representa vinte e cinco vezes o custo estimado e serve como alarme         |

    Justificativa do preço
    O valor de R$ 19,90 não deriva do custo, e sim de três fatores: é um patamar de assinatura de baixa fricção no mercado
    brasileiro, deixa margem confortável sobre a taxa de transação, e exige apenas cerca de seis assinantes para cobrir
    integralmente o custo fixo de hospedagem. A cota de 100 gerações é generosa para o uso real de um candidato em processo
    seletivo e, ao mesmo tempo, funciona como teto contra abuso, cumprindo a finalidade registrada na DEC-010.

    Consequência
    A cota deixa de ser um instrumento de contenção de custo e passa a ser um instrumento de posicionamento comercial
    e de proteção contra abuso. Isso está formalizado na DEC-010 e justifica a reclassificação do risco RT-003.

### 26.2. ADR-002 — Plataforma de hospedagem após a ativação da cobrança
    Contexto
    A camada gratuita da plataforma de hospedagem escolhida proíbe uso comercial, e o produto passará a processar pagamentos.

    Decisão
    Desenvolver e validar na camada gratuita e migrar para o plano pago da mesma plataforma no momento da ativação da cobrança,
    mantendo a aplicação portável, sem dependência de recursos proprietários da plataforma.

    Consequência
    Surge um custo fixo de aproximadamente R$ 102 por mês a partir do lançamento comercial,
    já considerado no dimensionamento do plano pago no ADR-001. A execução dessa migração é pré-requisito da entrega EN-05.

### 26.3. ADR-003 — Meios de pagamento
    Contexto
    Era necessário decidir se o MVP aceitaria apenas cartão ou também PIX, e qual provedor usar.
    A pergunta original sobre pagamento instantâneo local referia-se exatamente a PIX.

    Apuração
    O PIX Automático, modalidade de cobrança recorrente nativa do sistema PIX, foi lançado em junho de 2025 e tornou-se
    obrigatório para pagamentos recorrentes entre instituições diferentes em outubro de 2025, conforme o
    [Banco Central](https://www.bcb.gov.br/estabilidadefinanceira/pix-automatico) e a
    [cobertura da obrigatoriedade](https://g1.globo.com/economia/noticia/2025/09/26/pagamentos-recorrentes-entre-bancos-distintos-devera-ser-feito-com-pix-automatico-define-bc.ghtml).
    A adoção entre provedores, no entanto, é desigual.

| Provedor      | Taxa PIX                          | Taxa cartão à vista     | Recorrência com PIX             | Portal do cliente pronto |
|---------------|-----------------------------------|-------------------------|----------------------------------|---------------------------|
| AbacatePay    | R$ 0,80 fixo                      | 3,5% + R$ 0,60          | Sim                              | Não                       |
| Asaas         | R$ 0,99 promocional, R$ 1,99 padrão | R$ 0,49 + 2,99%       | Sim, em disponibilização         | Não                       |
| Mercado Pago  | 0,99%                             | 3,99% a 4,98%           | Sim                              | Sim                       |
| Efí           | 1,19%, e R$ 3,50 no PIX Automático | 3,49%                  | Sim                              | Não confirmado            |
| Stripe        | 1,19%, liberado por convite       | 3,99% + R$ 0,39         | Recente e ainda incerto no Brasil | Sim                       |
| Pagar.me      | 1,19%                             | 4,39% a 5,59%           | Não para PIX Automático          | Sim                       |

    Taxas conforme as páginas oficiais de
    [AbacatePay](https://www.abacatepay.com/pricing),
    [Asaas](https://www.asaas.com/precos-e-taxas),
    [Mercado Pago](https://www.mercadopago.com.br/blog/quanto-custa-vender-on-line-com-mercado-pago),
    [Efí](https://sejaefi.com.br/tarifas),
    [Stripe](https://stripe.com/br/pricing) e
    [Pagar.me](https://www.pagar.me/ofertas).

    Decisão
    O MVP aceitará cartão de crédito e PIX com QR Code e código copia e cola, conforme o RF-039.
    O provedor recomendado é a AbacatePay como opção primária, pela taxa fixa de R$ 0,80 por PIX, que é a mais previsível
    e a mais vantajosa em um ticket de R$ 19,90, e pelo posicionamento explícito para produtos de assinatura.
    O Asaas fica como segunda opção equivalente. O Stripe está descartado nesta fase porque o PIX depende de convite
    e de sessenta dias de histórico de processamento, o que é inviável para um produto que está nascendo.

    Consequência
    Nenhum dos dois provedores recomendados entrega um portal de autoatendimento pronto para o cliente final.
    Os requisitos RF-032 e RF-033 precisarão ser construídos como tela própria dentro do produto, consumindo a API do provedor.
    Isso está previsto na entrega EN-05.
    A camada de cobrança deve ser isolada atrás de uma interface própria, para que a troca de provedor não contamine o domínio.

### 26.4. ADR-004 — Conjunto das quatro perguntas de contextualização
    Contexto
    A RN-002 limita a interação a quatro perguntas, mas o conjunto não estava definido.
    O desenho precisa equilibrar três forças: obter sinal suficiente para priorizar, minimizar atrito para o recrutador
    e produzir respostas normalizáveis, já que elas compõem a chave de cache descrita em 19.5.

    Decisão
| Nº | Pergunta                                                          | Formato                                                                                                    | Obrigatória |
|----|-------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|-------------|
| 1  | Qual é o cargo ou a função da vaga?                                | Texto curto, com limite de 80 caracteres                                                                    | Sim         |
| 2  | Quais tecnologias ou ferramentas são essenciais?                    | Lista de termos, com limite de dez itens                                                                    | Sim         |
| 3  | Qual nível de experiência você espera?                              | Opção única: júnior, pleno, sênior, indiferente                                                             | Não         |
| 4  | O que pesa mais na sua decisão?                                     | Opção única: experiência prática, projetos entregues, formação e certificações, autonomia e liderança        | Não         |

    Racional
    * as duas primeiras perguntas são abertas porque carregam o sinal semântico que orienta a priorização;
    * as duas últimas são de opção única, o que reduz o esforço do recrutador para dois cliques e produz valores
      perfeitamente normalizáveis para a chave de cache, aumentando a taxa de reaproveitamento prevista na RN-009;
    * apenas duas perguntas são obrigatórias, o que permite gerar a apresentação com o mínimo de atrito e mitiga o risco RT-006;
    * a pergunta 4 define o critério de desempate da ordenação, e não o filtro de relevância,
      o que impede que uma preferência do recrutador esconda evidências pertinentes;
    * nenhuma pergunta captura dado que identifique o recrutador ou a empresa, preservando a RN-016.

    Consequência
    O conjunto deve ser tratado como versionado. Alterar as perguntas altera a semântica da chave de cache,
    exigindo invalidação das apresentações armazenadas sob o conjunto anterior.

### 26.5. ADR-005 — Retenção das apresentações e extensão paga
    Contexto
    Era necessário definir por quanto tempo apresentações e contextos ficam armazenados.
    Prazo curto reduz exposição de dados e custo de armazenamento; prazo longo aumenta reaproveitamento de cache
    e abre espaço para um recurso de histórico.

    Decisão
    O prazo padrão de retenção é de trinta dias, para todos os planos, conforme a RN-021.
    Encerrado o prazo, apresentação e contexto são removidos, preservando apenas o registro de auditoria do RF-037,
    que guarda metadados e não conteúdo.

    Extensão paga, prevista para a versão seguinte ao MVP
    O complemento Histórico de Apresentações estende a retenção para doze meses e entrega ao desenvolvedor
    uma linha do tempo das contextualizações recebidas: qual cargo foi consultado, quais tecnologias foram pedidas,
    quais registros do perfil foram priorizados e quantas vezes cada contexto se repetiu.

    O valor desse complemento não está no armazenamento, que é barato, e sim na inteligência que ele devolve ao desenvolvedor:
    ele passa a saber quais competências o mercado está pedindo e onde seu perfil está sendo considerado fraco.
    Isso transforma um custo de retenção em um recurso de produto e converge com o item de analytics já previsto na seção 9.2.

    Preço sugerido: R$ 9,90 por mês como complemento do plano Pro, ou inclusão no futuro plano anual como diferencial.

    Restrição de privacidade
    A extensão do prazo não pode enfraquecer a RN-016. O histórico exibirá exclusivamente o conteúdo do contexto,
    nunca identificação de pessoa ou empresa, porque esse dado simplesmente não é coletado.
    Por isso a extensão de retenção é juridicamente segura: prolonga a guarda de dados que nunca foram pessoais.

    Consequência
    A rotina de expurgo precisa ler o prazo aplicável a cada portfólio, e não usar uma constante,
    para suportar planos com retenções diferentes. O CA-050 verifica o comportamento padrão.

### 26.6. ADR-006 — Exibição dos dados de contato
    Contexto
    Era necessário decidir se o portfólio público exibe telefone, e-mail e demais contatos do desenvolvedor.

    Decisão
    A escolha é do desenvolvedor, campo por campo, conforme a RN-020 e o RF-040.
    O padrão para novos campos é não exibir, cabendo ao desenvolvedor liberar explicitamente cada um.

    Racional
    O padrão restritivo protege quem publica sem revisar as configurações e é coerente com a RNF-001.
    A escolha por campo, em vez de uma chave única para todos os contatos, permite o caso comum de exibir e-mail profissional
    e ocultar telefone pessoal.

    Consequência
    A renderização precisa aplicar o filtro de visibilidade tanto no template base quanto na apresentação contextualizada,
    e o catálogo enviado ao modelo não deve conter campos ocultos. O CA-049 verifica esse comportamento.

### 26.7. ADR-007 — Moderação de conteúdo
    Contexto
    A pergunta original não estava clara, então cabe explicá-la antes da decisão.
    Moderação de conteúdo é decidir se a plataforma revisa o que o desenvolvedor cadastra antes de aquilo ficar público.
    O problema existe porque o produto publica páginas na internet aberta em nome de terceiros.
    Sem qualquer política, alguém pode usar a plataforma para publicar ofensa, conteúdo ilegal,
    ou se passar por outra pessoa usando nome e trajetória alheios. Nesse cenário a responsabilidade recai sobre a plataforma,
    e não apenas sobre o autor.

    Alternativas
    * revisão prévia de todo portfólio antes da publicação, o que é inviável para um desenvolvedor solo e destrói a experiência;
    * nenhuma política, o que deixa a plataforma exposta;
    * moderação reativa, acionada por denúncia, com termos de uso claros.

    Decisão
    Moderação reativa, formalizada na RN-022. Não há revisão prévia.
    O conteúdo é de responsabilidade do desenvolvedor, declarada nos termos de uso aceitos no cadastro.
    O portfólio público oferece um meio de denúncia, conforme o RF-041.
    Diante de denúncia procedente, a plataforma despublica o portfólio e notifica o desenvolvedor.

    Racional
    É a única alternativa compatível com a DEC-002 que ainda assim estabelece um procedimento defensável.
    A ausência de indexação por padrão, prevista na RN-015, reduz materialmente o incentivo ao uso abusivo,
    já que o alcance de um portfólio não indexado é limitado a quem recebe o link.

    Consequência
    São necessários termos de uso publicados antes do lançamento e um fluxo mínimo de recebimento e triagem de denúncias.
    Ambos entram na entrega EN-06.

# 27. Histórico de Revisões
### 27.1. Correções aplicadas na versão 1.1
* a contradição entre a seção 10 e as regras de plano foi resolvida: pagamento passa a integrar o MVP pela DEC-001,
  e a seção 10 foi convertida em priorização do que ficou fora, sem duplicar a seção 9;
* a divergência de desempenho entre a meta 8.2 e o requisito de tempo de resposta foi resolvida no RNF-004,
  que passa a definir três metas distintas por etapa, e o CA-031 foi ajustado para referenciá-lo;
* a numeração dos requisitos não funcionais estava descontínua, com salto de RNF-013 para RNF-015;
  a sequência foi corrigida e agora vai de RNF-001 a RNF-017;
* referências à regra de fallback apontavam para o RF-019, que é o template base;
  foram corrigidas para o RF-020, que é o fallback, na RN-017 e na seção 18.2;
* a referência à DEC-002 na seção 19.1 apontava para uma decisão que não existia no documento;
  as decisões de engenharia foram incorporadas na seção 19.2;
* as regras RN-001, RN-003 e RN-004 ganharam mecanismo de verificação na seção 18, deixando de ser apenas declarativas;
* as métricas da seção 15 ganharam fonte de coleta definida na seção 23.2;
* as sete decisões em aberto foram resolvidas e registradas como ADR na seção 26.

### 27.2. Fontes consultadas
    Preços de modelos de linguagem:
    https://ai.google.dev/gemini-api/docs/pricing
    https://mistral.ai/pricing/api/
    https://api-docs.deepseek.com/quick_start/pricing
    https://developers.openai.com/api/docs/pricing
    https://platform.claude.com/docs/en/about-claude/pricing

    Meios de pagamento e PIX:
    https://www.bcb.gov.br/estabilidadefinanceira/pix-automatico
    https://www.abacatepay.com/pricing
    https://www.asaas.com/precos-e-taxas
    https://sejaefi.com.br/tarifas
    https://stripe.com/br/pricing
    https://www.pagar.me/ofertas
    https://www.mercadopago.com.br/blog/quanto-custa-vender-on-line-com-mercado-pago

    Hospedagem e uso comercial:
    https://vercel.com/docs/limits/fair-use-guidelines
    https://vercel.com/docs/plans/hobby

    Câmbio de referência:
    https://www.bloomberglinea.com.br/quote/USDBRL:CUR/
