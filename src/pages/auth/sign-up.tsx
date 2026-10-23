import { Link, useNavigate } from 'react-router-dom'
import { BackgroundIntro } from '../../components/backgroundIntro'
import { Button } from '../../components/button'
import { Input } from '../../components/input'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'

const signUpSchema = z.object({
  name: z.string().min(2, 'Nome obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres')
})

type SignUpFormData = z.infer<typeof signUpSchema>

export function SignUp() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange'
  })

  async function onSubmit(data: SignUpFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      toast.success('Cadastro realizado com sucesso!')
      navigate('/sign-up/finally-register')
      console.log(data)
    } catch {
      toast.error('Não foi possível concluir o cadastro.')
    }
  }

  return (
    <main className="auth-shell split-shell">
      <section className="auth-panel left-panel">
        <div className="auth-card auth-form-card">
          <button className="back-button" type="button" onClick={() => navigate(-1)}>
            ←
          </button>

          <div className="form-header">
            <h1>Crie sua conta</h1>
            <p>Vamos começar sua jornada de estudos.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
            <Input name="name" placeholder="Nome completo" register={register} error={errors.name} />
            <Input name="email" type="email" placeholder="E-mail" register={register} error={errors.email} />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              register={register}
              error={errors.password}
            />

            <Button type="submit" title={isSubmitting ? 'Cadastrando...' : 'Cadastrar'} disabled={isSubmitting} />
          </form>

          <div className="helper-row">
            <span>Já tem conta?</span>
            <Link to="/sign-in">Entrar</Link>
          </div>
        </div>
      </section>

      <BackgroundIntro />
    </main>
  )
}
