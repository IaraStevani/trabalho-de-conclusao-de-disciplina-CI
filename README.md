# Trabalho de Conclusao da Disciplina de CI - PGATS

Este repositorio contem a solucao do trabalho de conclusao da disciplina de Integracao Continua. O projeto utiliza uma aplicacao Node.js simples com testes automatizados e uma pipeline de CI configurada no GitHub Actions.

## Objetivo

Desenvolver uma pipeline de integracao continua para um projeto com testes automatizados, contemplando:

- execucao por push;
- execucao manual;
- execucao agendada;
- execucao de testes automatizados;
- geracao de relatorio de testes em HTML;
- armazenamento/publicacao do relatorio na pipeline;
- documentacao da solucao e dos conceitos utilizados.

## Projeto utilizado

O projeto implementa um servico simples de pagamento em JavaScript.

Arquivo principal:

- `src/servicoDePagamento.js`

A classe `ServicoDePagamento` possui duas responsabilidades principais:

- registrar pagamentos por codigo de barras, empresa e valor;
- consultar o ultimo pagamento realizado.

Durante o registro do pagamento, o servico tambem classifica a categoria do pagamento:

- `cara`: para valores acima de `100.00`;
- `padrao`: para valores de `100.00` ou menos.

## Arquitetura

A estrutura do projeto esta organizada da seguinte forma:

```text
.
├── .github/
│   └── workflows/
│       └── main.yml
├── src/
│   └── servicoDePagamento.js
├── test/
│   └── servicoDePagamento.test.js
├── package.json
├── package-lock.json
└── README.md
```

Principais responsabilidades:

- `src/`: contem o codigo fonte da aplicacao.
- `test/`: contem os testes automatizados.
- `.github/workflows/`: contem a configuracao da pipeline de CI.
- `package.json`: contem scripts e dependencias do projeto.

## Tecnologias e ferramentas

- Node.js: ambiente de execucao JavaScript.
- Mocha: framework utilizado para execucao dos testes automatizados.
- Assert nativo do Node.js: biblioteca utilizada para validacoes nos testes.
- Mochawesome: reporter utilizado para gerar relatorio HTML dos testes.
- GitHub Actions: ferramenta utilizada para configurar e executar a pipeline de integracao continua.

## Testes automatizados

Os testes estao no arquivo:

- `test/servicoDePagamento.test.js`

Cenarios cobertos:

- deve classificar como `cara` pagamentos acima de `100.00`;
- deve classificar como `padrao` pagamentos de `100.00` ou menos;
- deve retornar o ultimo pagamento realizado quando houver mais de um pagamento.

Para executar os testes localmente:

```bash
npm test
```

Para executar os testes e gerar o relatorio HTML:

```bash
npm run test:report
```

O relatorio HTML e gerado em:

```text
test-report/index.html
```

## Scripts configurados

No `package.json`, foram configurados os seguintes scripts:

```json
"scripts": {
  "test": "mocha \"test/**/*.js\"",
  "test:report": "mocha \"test/**/*.js\" --reporter mochawesome --reporter-options reportDir=test-report,reportFilename=index,html=true,json=false"
}
```

O script `test` executa os testes no terminal.

O script `test:report` executa os testes e gera um relatorio HTML utilizando o Mochawesome.

## Pipeline de Integracao Continua

A pipeline esta configurada no arquivo:

- `.github/workflows/main.yml`

Nome da pipeline:

```yaml
name: 'CI - PGATS'
```

### Gatilhos de execucao

A pipeline contempla os tres tipos de execucao solicitados.

Execucao por push na branch `main`:

```yaml
push:
  branches: [ "main" ]
```

Execucao manual:

```yaml
workflow_dispatch:
```

Execucao agendada:

```yaml
schedule:
  - cron: '*/5 * * * *'
```

A expressao cron acima agenda a execucao a cada 5 minutos. No GitHub Actions, os horarios de `schedule` usam UTC.

### Etapas da pipeline

A pipeline possui um job chamado `unit-tests`, executado em ambiente Linux:

```yaml
runs-on: ubuntu-latest
```

Etapas principais:

1. Checkout do codigo com `actions/checkout@v4`.
2. Configuracao do Node.js com `actions/setup-node@v4`.
3. Instalacao das dependencias com `npm ci`.
4. Execucao dos testes e geracao do relatorio com `npm run test:report`.
5. Publicacao do relatorio com `actions/upload-artifact@v4`.

## Relatorio de testes na pipeline

O relatorio HTML e gerado pela etapa:

```yaml
- name: Executando testes e gerando relatorio
  run: npm run test:report
```

O Mochawesome gera o arquivo:

```text
test-report/index.html
```

Em seguida, a pasta `test-report` e publicada como artefato da pipeline:

```yaml
- name: Salvando relatorios de testes
  uses: actions/upload-artifact@v4
  if: ${{ always() }}
  with:
    name: Relatorio de Testes
    path: test-report
```

O uso de `if: ${{ always() }}` garante que a etapa de publicacao seja executada mesmo se os testes falharem, permitindo consultar o relatorio da execucao.

## Conceitos aplicados

### Integracao continua

A integracao continua permite validar automaticamente o projeto a cada alteracao enviada para o repositorio. Neste trabalho, a validacao ocorre por meio da execucao automatizada dos testes na pipeline do GitHub Actions.

### Automacao de testes

Os testes automatizados verificam o comportamento esperado do servico de pagamento. Isso reduz o risco de regressao e aumenta a confiabilidade das alteracoes feitas no codigo.

### Pipeline como codigo

A pipeline foi definida em um arquivo YAML versionado junto com o projeto. Isso permite rastreabilidade, revisao e evolucao da configuracao da CI junto com o codigo fonte.

### Relatorio de execucao

O relatorio HTML gerado pelo Mochawesome facilita a analise dos resultados dos testes, mostrando quais cenarios foram executados e se passaram ou falharam.

### Artefatos de pipeline

O relatorio de testes e armazenado como artefato no GitHub Actions. Dessa forma, a evidencia da execucao fica disponivel na propria pipeline.

## Como executar localmente

Instalar as dependencias:

```bash
npm ci
```

Executar os testes:

```bash
npm test
```

Gerar relatorio HTML:

```bash
npm run test:report
```

Abrir o relatorio gerado:

```text
test-report/index.html
```

## Evidencia de execucao

Para a entrega do trabalho, devem ser enviados:

- URL do repositorio GitHub contendo esta solucao;
- evidencia de pelo menos uma execucao bem-sucedida da pipeline no GitHub Actions.

A evidencia pode ser obtida na aba `Actions` do repositorio, acessando uma execucao concluida com sucesso e verificando o artefato `Relatorio de Testes`.
