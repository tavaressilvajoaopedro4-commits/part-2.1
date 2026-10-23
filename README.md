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

## Rotas principais

```tsx
import { createBrowserRouter } from 'react-router'
import { SignIn } from './src/pages/auth/sign-in'
import { SignUp } from './src/pages/auth/sign-up'
import { FinallyRegister } from './src/pages/auth/finally-register'
import { Forgot } from './src/pages/auth/forgot'
import { ForgotCompleted } from './src/pages/auth/forgot-completed'

export const router = createBrowserRouter([
  { path: '/sign-in', element: <SignIn /> },
  { path: '/sign-up', element: <SignUp /> },
  { path: '/sign-up/finally-register', element: <FinallyRegister /> },
  { path: '/forgot', element: <Forgot /> },
  { path: '/forgot/send-email', element: <ForgotCompleted /> }
])
```

## Fluxo de recuperação de senha

A tela de recuperação valida o e-mail e envia a requisição para a API:

```tsx
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

const forgotForm = z.object({
  email: z.string().email('E-mail inválido')
})

type ForgotForm = z.infer<typeof forgotForm>

export function Forgot() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid }
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotForm),
    mode: 'onChange'
  })

  async function handleForgot(data: ForgotForm) {
    try {
      const res = await fetch('http://localhost:3333/password/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email })
      })

      if (res.ok) {
        toast.success('E-mail de recuperação enviado')
        navigate('/forgot/send-email')
      } else if (res.status === 404) {
        toast.error('E-mail não cadastrado')
      } else {
        toast.error('Erro ao enviar o e-mail. Tente novamente.')
      }
    } catch (err) {
      toast.error('Erro de conexão. Verifique a API.')
    } finally {
      reset()
    }
  }

  return <form onSubmit={handleSubmit(handleForgot)}>{/* ... */}</form>
}
```

## Tela de confirmação após envio

```tsx
import { Finally } from '../../components/finally'

export function ForgotCompleted() {
  return (
    <Finally
      title="Redefinição enviada!"
      subtitle={`Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.`}
      titleButton="Voltar ao login"
      path="/sign-in"
    />
  )
}
```

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

O projeto foi desenvolvido com foco em autenticação e recuperação de senha, seguindo o fluxo de validação, envio de e-mail e confirmação visual para o usuário.