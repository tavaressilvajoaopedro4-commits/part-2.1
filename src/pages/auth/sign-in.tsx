import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { BackgroundIntro } from '../../components/backgroundIntro'
import { Button } from '../../components/button'
import { Input } from '../../components/input'

const signInSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha inválida')
})

type SignInFormData = z.infer<typeof signInSchema>

export function SignIn() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onChange'
  })

  async function onSubmit(data: SignInFormData) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log(data)
      toast.success('Login realizado com sucesso!')
      navigate('/sign-up/finally-register')
    } catch {
      toast.error('Credenciais inválidas.')
    }
  }

  return (
    <main className="auth-shell split-shell">
      <section className="auth-panel left-panel">
        <div className="auth-card auth-form-card">
          <div className="form-header">
            <h1>Bem-vindo de volta</h1>
            <p>Entre para continuar seus estudos.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
            <Input name="email" type="email" placeholder="E-mail" register={register} error={errors.email} />
            <Input
              name="password"
              type="password"
              placeholder="Senha"
              register={register}
              error={errors.password}
            />

            <div className="form-link-right">
              <Link to="/forgot">Esqueci minha senha</Link>
            </div>

            <Button type="submit" title={isSubmitting ? 'Entrando...' : 'Entrar'} disabled={isSubmitting} />
          </form>

          <div className="helper-row">
            <span>Ainda não tem conta?</span>
            <Link to="/sign-up">Criar conta</Link>
          </div>
        </div>
      </section>

      <BackgroundIntro />
    </main>
  )
}
