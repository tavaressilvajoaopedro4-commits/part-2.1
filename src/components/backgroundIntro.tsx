type BackgroundIntroProps = {
  title?: string
  subtitle?: string
}

export function BackgroundIntro({
  title = 'Estude com foco.',
  subtitle = 'Aprenda, programe e avance em cada etapa do seu caminho.'
}: BackgroundIntroProps) {
  return (
    <aside className="intro-panel">
      <div className="intro-card">
        <p className="intro-kicker">Part 2.1</p>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </aside>
  )
}
