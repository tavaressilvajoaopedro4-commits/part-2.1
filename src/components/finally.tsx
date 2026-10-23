import { Link } from 'react-router-dom'

type FinallyProps = {
  title: string
  subtitle: string
  titleButton: string
  path: string
}

export function Finally({ title, subtitle, titleButton, path }: FinallyProps) {
  return (
    <main className="auth-shell">
      <section className="auth-card centered-card">
        <div className="success-icon">✓</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <Link to={path} className="primary-button link-button">
          {titleButton}
        </Link>
      </section>
    </main>
  )
}
