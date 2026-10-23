import type { InputHTMLAttributes } from 'react'
import type { FieldError, UseFormRegister } from 'react-hook-form'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: FieldError
  register?: UseFormRegister<any>
}

export function Input({ label, error, register, name, ...props }: InputProps) {
  const hasError = Boolean(error)

  return (
    <div style={{ display: 'grid', gap: '0.5rem' }}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        aria-invalid={hasError}
        {...(register && name ? register(name) : {})}
        {...props}
        className={hasError ? 'input input-error' : 'input'}
      />
      {hasError && <span className="error-text">{error?.message}</span>}
    </div>
  )
}
