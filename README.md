# Trabalho de Conclusão da Disciplina de CI - PGATS

Este repositório contém a solução do trabalho de conclusão da disciplina de Integração Contínua. O projeto utiliza uma aplicação Node.js simples com testes automatizados e uma pipeline de CI configurada no GitHub Actions.

## Objetivo

Desenvolver uma pipeline de integração contínua para um projeto com testes automatizados, contemplando:

- execução por push;
- execução manual;
- execução agendada;
- execução de testes automatizados;
- geração de relatório de testes em HTML;
- armazenamento/publicação do relatório na pipeline;
- documentação da solução e dos conceitos utilizados.

## Projeto utilizado

O projeto implementa um serviço simples de pagamento em JavaScript.

Arquivo principal:

- `src/servicoDePagamento.js`

A classe `ServicoDePagamento` possui duas responsabilidades principais:

- registrar pagamentos por código de barras, empresa e valor;
- consultar o último pagamento realizado.

Durante o registro do pagamento, o serviço também classifica a categoria do pagamento:

- `cara`: para valores acima de `100.00`;
- `padrão`: para valores de `100.00` ou menos.

## Arquitetura

A estrutura do projeto está organizada da seguinte forma:

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

- `src/`: contém o código fonte da aplicação.
- `test/`: contém os testes automatizados.
- `.github/workflows/`: contém a configuração da pipeline de CI.
- `package.json`: contém scripts e dependências do projeto.

## Tecnologias e ferramentas

- Node.js: ambiente de execução JavaScript.
- Mocha: framework utilizado para execução dos testes automatizados.
- Assert nativo do Node.js: biblioteca utilizada para validações nos testes.
- Mochawesome: reporter utilizado para gerar relatório HTML dos testes.
- GitHub Actions: ferramenta utilizada para configurar e executar a pipeline de integração contínua.

## Testes automatizados

Os testes estão no arquivo:

- `test/servicoDePagamento.test.js`

Cenários cobertos:

- deve classificar como `cara` pagamentos acima de `100.00`;
- deve classificar como `padrão` pagamentos de `100.00` ou menos;
- deve retornar o último pagamento realizado quando houver mais de um pagamento.

Para executar os testes localmente:

```bash
npm test
```

Para executar os testes e gerar o relatório HTML:

```bash
npm run test:report
```

O relatório HTML é gerado em:

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

O script `test:report` executa os testes e gera um relatório HTML utilizando o Mochawesome.

## Pipeline de Integração Contínua

A pipeline está configurada no arquivo:

- `.github/workflows/main.yml`

Nome da pipeline:

```yaml
name: 'CI - PGATS'
```

### Gatilhos de execução

A pipeline contempla os três tipos de execução solicitados.

Execução por push na branch `main`:

```yaml
push:
  branches: [ "main" ]
```

Execução manual:

```yaml
workflow_dispatch:
```

Execução agendada:

```yaml
schedule:
  - cron: '*/5 * * * *'
```

A expressão cron acima agenda a execução a cada 5 minutos. No GitHub Actions, os horários de `schedule` usam UTC.

### Etapas da pipeline

A pipeline possui um job chamado `unit-tests`, executado em ambiente Linux:

```yaml
runs-on: ubuntu-latest
```

Etapas principais:

1. Checkout do código com `actions/checkout@v4`.
2. Configuração do Node.js com `actions/setup-node@v4`.
3. Instalação das dependências com `npm ci`.
4. Execução dos testes e geração do relatório com `npm run test:report`.
5. Publicação do relatório com `actions/upload-artifact@v4`.

## Relatório de testes na pipeline

O relatório HTML é gerado pela etapa:

```yaml
- name: Executando testes e gerando relatório
  run: npm run test:report
```

O Mochawesome gera o arquivo:

```text
test-report/index.html
```

Em seguida, a pasta `test-report` é publicada como artefato da pipeline:

```yaml
- name: Salvando relatórios de testes
  uses: actions/upload-artifact@v4
  if: ${{ always() }}
  with:
    name: Relatório de Testes
    path: test-report
```

O uso de `if: ${{ always() }}` garante que a etapa de publicação seja executada mesmo se os testes falharem, permitindo consultar o relatório da execução.

## Conceitos aplicados

### Integração contínua

A integração contínua permite validar automaticamente o projeto a cada alteração enviada para o repositório. Neste trabalho, a validação ocorre por meio da execução automatizada dos testes na pipeline do GitHub Actions.

### Automação de testes

Os testes automatizados verificam o comportamento esperado do serviço de pagamento. Isso reduz o risco de regressão e aumenta a confiabilidade das alterações feitas no código.

### Pipeline como código

A pipeline foi definida em um arquivo YAML versionado junto com o projeto. Isso permite rastreabilidade, revisão e evolução da configuração da CI junto com o código fonte.

### Relatório de execução

O relatório HTML gerado pelo Mochawesome facilita a análise dos resultados dos testes, mostrando quais cenários foram executados e se passaram ou falharam.

### Artefatos de pipeline

O relatório de testes é armazenado como artefato no GitHub Actions. Dessa forma, a evidência da execução fica disponível na própria pipeline.

## Como executar localmente

Instalar as dependências:

```bash
npm ci
```

Executar os testes:

```bash
npm test
```

Gerar relatório HTML:

```bash
npm run test:report
```

Abrir o relatório gerado:

```text
test-report/index.html
```

## Evidência de execução

Para a entrega do trabalho, devem ser enviados:

- URL do repositório GitHub contendo esta solução;
- evidência de pelo menos uma execução bem-sucedida da pipeline no GitHub Actions.

A evidência pode ser obtida na aba `Actions` do repositório, acessando uma execução concluída com sucesso e verificando o artefato `Relatório de Testes`.
