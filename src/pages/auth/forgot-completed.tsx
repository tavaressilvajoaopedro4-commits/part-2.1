import { Link } from 'react-router-dom'
import { BackgroundIntro } from '../../components/backgroundIntro'

export function ForgotCompleted() {
  return (
    <main className="auth-shell split-shell">
      <section className="auth-panel left-panel">
        <div className="auth-card auth-form-card centered-content">
          <div className="success-icon">✓</div>
          <h1>Redefinição enviada!</h1>
          <p>
            Boa, agora é só checar o e-mail que foi enviado para você redefinir sua senha e aproveitar os estudos.
          </p>
          <Link to="/sign-in" className="link-button-container">
            <button type="button" className="primary-button">Voltar ao login</button>
          </Link>
        </div>
      </section>
      <BackgroundIntro />
    </main>
  )
}
