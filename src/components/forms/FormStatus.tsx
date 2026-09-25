import { AlertCircle, CheckCircle2, LoaderCircle } from 'lucide-react'

type FormStatusProps = {
  state: 'idle' | 'submitting' | 'success' | 'error'
  message?: string
}

export function FormStatus({ state, message }: FormStatusProps) {
  if (state === 'idle') return null

  return (
    <div className={`form-status form-status--${state}`} role={state === 'error' ? 'alert' : 'status'}>
      {state === 'submitting' ? <LoaderCircle className="spin" aria-hidden="true" size={19} /> : null}
      {state === 'success' ? <CheckCircle2 aria-hidden="true" size={19} /> : null}
      {state === 'error' ? <AlertCircle aria-hidden="true" size={19} /> : null}
      <span>{message || (state === 'submitting' ? 'Sending your message…' : '')}</span>
    </div>
  )
}
