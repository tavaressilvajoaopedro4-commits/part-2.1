# Part 2.1

Projeto: Part 2.1

Este repositório contém a implementação referente à parte 2.1 do curso, com foco no fluxo de autenticação e recuperação de senha.

## Descrição

A aplicação inclui as telas e rotas relacionadas a:

- Login
- Cadastro
- Finalização de cadastro
- Recuperação de senha
- Confirmação de envio do e-mail de recuperação

## Funcionalidades implementadas

- Tela de login em `/sign-in`
- Tela de cadastro em `/sign-up`
- Página de confirmação de cadastro em `/sign-up/finally-register`
- Tela de recuperação de senha em `/forgot`
- Página de confirmação de envio em `/forgot/send-email`

## Fluxo de recuperação de senha

Ao preencher o e-mail na tela de recuperação, a aplicação envia uma requisição para a API:

```ts
fetch("http://localhost:3333/password/forgot", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: data.email })
})
```

Se a resposta for bem-sucedida, o usuário é redirecionado para a tela de confirmação. Caso o e-mail não esteja cadastrado, é exibido um erro.

## Stack principal

- React
- TypeScript
- React Router
- React Hook Form
- Zod
- Sonner

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Inicie o projeto:

```bash
npm run dev
```

3. Acesse no navegador:

```bash
http://localhost:5173
```

> Observação: a aplicação consome a API de autenticação na porta `3333`, então o backend deve estar em execução localmente.

## Observações

Este repositório foi deixado público para facilitar o acesso do professor e da avaliação.

Além disso, o texto do README foi atualizado para documentar melhor o projeto e facilitar a execução e compreensão do fluxo implementado.