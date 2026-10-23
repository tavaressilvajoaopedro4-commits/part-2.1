import { Link } from 'react-router-dom'
import { BackgroundIntro } from '../../components/backgroundIntro'
import { Button } from '../../components/button'

export function FinallyRegister() {
  return (
    <main className="auth-shell split-shell">
      <section className="auth-panel left-panel">
        <div className="auth-card auth-form-card centered-content">
          <div className="success-icon">✓</div>
          <h1>Cadastro finalizado!</h1>
          <p>
            Seu cadastro foi concluído com sucesso. Agora você pode entrar e começar a estudar.
          </p>
          <Link to="/sign-in" className="link-button-container">
            <Button title="Ir para o login" />
          </Link>
        </div>
      </section>
      <BackgroundIntro />
    </main>
  )
}
