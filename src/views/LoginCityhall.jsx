import React, { useState } from 'react'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Checkbox } from 'primereact/checkbox'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'

const LoginCityhall = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ show: false, type: '', text: '' })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ show: false, type: '', text: '' })

    if (!username || !password) {
      setMessage({
        show: true,
        type: 'warn',
        text: 'Preencha todos os campos antes de continuar.'
      })
      return
    }

    setLoading(true)
    try {
      // simula login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setMessage({ show: true, type: 'success', text: 'Login realizado com sucesso!' })
      // ex: navigate('/dashboard-cityhall')
    } catch {
      setMessage({ show: true, type: 'error', text: 'Erro ao realizar login.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="flex flex-column align-items-center justify-content-center gap-4 p-3 w-full">
        <div className="logo-auth w-auto h-4rem md:h-5rem flex align-items-center justify-content-center">
          <h1 className="text-6xl font-bold text-primary">Carbon Overde</h1>
        </div>

        {message.show && (
          <Message severity={message.type} closable={false} className="w-full">
            {message.text}
          </Message>
        )}

        <Card className="auth-card shadow-2 w-11/12 sm:w-40rem md:w-48rem lg:w-56rem">
          <div className="text-center text-2xl font-semibold mb-4">Login da Prefeitura</div>

          <form className="flex flex-column gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-column gap-2">
              <label htmlFor="username" className="text-sm font-medium">Usuário</label>
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full ctl-input"
                placeholder="Digite seu usuário"
                autoComplete="username"
              />
            </div>

            <div className="flex flex-column gap-2">
              <label htmlFor="password" className="text-sm font-medium">Senha</label>
              <Password
                inputId="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                feedback={false}
                toggleMask
                inputProps={{
                  className: 'w-full',
                  placeholder: '••••••••',
                  autoComplete: 'current-password',
                }}
              />
            </div>

            <div className="flex align-items-center justify-content-between">
              <div className="flex align-items-center gap-1">
                <Checkbox
                  inputId="remember"
                  checked={remember}
                  onChange={(e) => setRemember(e.checked)}
                />
                <label htmlFor="remember" className="text-sm remenber">Lembrar de mim</label>
              </div>
              <a className="text-sm cursor-pointer link-muted">Esqueceu a senha?</a>
            </div>

            <Button
              type="submit"
              label="Entrar"
              icon="pi pi-unlock"
              className="w-full ctl-btn custom-login-btn"
              loading={loading}
            />

            <div className="text-center text-sm support-line">
              Está com problemas no acesso?
              <a className="support-link" href="mailto:support@carbonoverde.com"> Contate o suporte</a>.
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default LoginCityhall