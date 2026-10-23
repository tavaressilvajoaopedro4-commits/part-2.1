import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { BackgroundIntro } from '../components/backgroundIntro'
import { Button } from '../components/button'
import { Input } from '../components/input'

const forgotFormSchema = z.object({
  email: z.string().trim().email('E-mail inválido')
})

type ForgotFormData = z.infer<typeof forgotFormSchema>

export function Forgot() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotFormSchema),
    mode: 'onChange',
    defaultValues: { email: '' }
  })

  async function onSubmit(data: ForgotFormData) {
    try {
      const response = await fetch('http://localhost:3333/password/forgot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email })
      })

      if (response.ok) {
        toast.success('E-mail de recuperação enviado')
        navigate('/forgot/send-email')
        return
      }

      if (response.status === 404) {
        toast.error('E-mail não cadastrado')
        return
      }

      toast.error('Erro ao enviar o e-mail. Tente novamente.')
    } catch {
      toast.error('Erro de conexão. Verifique a API.')
    } finally {
      reset()
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
            <h1>Eita, esqueceu sua senha?</h1>
            <p>Não esquenta, vamos dar um jeito nisso.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="form-grid">
            <Input
              type="email"
              name="email"
              placeholder="E-mail"
              register={register}
              error={errors.email}
            />

            <Button
              type="submit"
              title={isSubmitting ? 'Enviando...' : 'Enviar'}
              disabled={isSubmitting || !isValid}
            />
          </form>

          <div className="helper-row">
            <span>Já lembra a senha?</span>
            <Link to="/sign-in">Fazer login</Link>
          </div>
        </div>
      </section>

      <BackgroundIntro />
    </main>
  )
}
