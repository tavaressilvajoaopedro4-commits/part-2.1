type ButtonProps = {
  title: string
  type?: 'button' | 'submit' | 'reset'
  onClick?: () => void
  disabled?: boolean
}

export function Button({ title, type = 'button', onClick, disabled = false }: ButtonProps) {
  return (
    <button type={type} onClick={onClick} disabled={disabled} className="primary-button">
      {title}
    </button>
  )
}
