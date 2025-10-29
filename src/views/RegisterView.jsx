import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { loginSuccess, setRemember } from '../slices/authSlice'
import { login } from '../services/api'
import { useRef } from 'react'

const RegisterView = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useRef(null)
  const [loading, setLoading] = useState(false)
  const [remember, setRememberState] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    userName: '',
    email: '',
    password: '',
    role: 'ADMIN'
  })
  const [errors, setErrors] = useState({
    nome: '',
    userName: '',
    email: '',
    password: ''
  })

  const validate = () => {
    const newErrors = {}
    if (!formData.nome.trim()) newErrors.nome = 'Nome é obrigatório'
    if (!formData.userName.trim()) newErrors.userName = 'Nome técnico é obrigatório'
    if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'E-mail inválido'
    if (!formData.password.trim()) newErrors.password = 'Senha é obrigatória'
    else if (formData.password.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const onSubmitAuth = async (e) => {
    e.preventDefault()
    if (loading) return
    if (!validate()) return

    setLoading(true)
    try {
      // const response = await api.post('/auth/register', formData)
      // simulação:
      await new Promise(r => setTimeout(r, 800))

      dispatch(loginSuccess({
        token: 'fake-token',
        user: {
          username: formData.userName,
          role: 'ADMIN',
          clientName: 'Prefeitura de Joinville'
        }
      }))
      dispatch(setRemember(remember))

      toast.current.show({
        severity: 'success',
        summary: 'Sucesso',
        detail: 'Usuário registrado com sucesso!',
        life: 2000
      })
      setTimeout(() => navigate('/'), 1500)
    } catch (err) {
      toast.current.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao registrar. Tente novamente.',
        life: 2500
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center justify-content-center gap-4 p-3 w-full">
        <div className="logo-auth w-auto h-4rem md:h-5rem flex align-items-center justify-content-center">
          <h1 className="text-6xl font-bold text-primary">Carbono Verde</h1>
        </div>

        <form
          key="auth"
          className="flex flex-column gap-4 border-1 shadow-2xl p-10 rounded-lg"
          onSubmit={onSubmitAuth}
          noValidate
        >
          <div className="flex justify-center align-items-center">
            <h2 className='text-xl font-semibold'>Registrar usuário</h2>
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="nome" className="text-sm font-medium">Nome Completo</label>
            <InputText
              id="nome"
              value={formData.nome}
              onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              className={`w-full ctl-input ${errors.nome && 'p-invalid'}`}
              placeholder="Ex: Pedro Francisco"
            />
            {errors.nome && <Message severity="error" text={errors.nome} />}
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="userName" className="text-sm font-medium">Nome técnico</label>
            <InputText
              id="userName"
              value={formData.userName}
              onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
              className={`w-full ctl-input ${errors.userName && 'p-invalid'}`}
              placeholder="Técnico responsável"
            />
            {errors.userName && <Message severity="error" text={errors.userName} />}
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email</label>
            <InputText
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full ctl-input ${errors.email && 'p-invalid'}`}
              placeholder="email@dominio.com"
            />
            {errors.email && <Message severity="error" text={errors.email} />}
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="password" className="text-sm font-medium">Senha</label>
            <Password
              inputId="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              feedback={false}
              toggleMask
              className={`w-full ${errors.password && 'p-invalid'}`}
              inputProps={{
                className: 'w-full',
                placeholder: '••••••••',
                autoComplete: 'new-password'
              }}
            />
            {errors.password && <Message severity="error" text={errors.password} />}
          </div>

          <div className="flex align-items-center justify-content-between">
            <div className="flex align-items-center gap-1">
              <Checkbox inputId="remember" checked={remember} onChange={(e) => setRememberState(e.checked)} />
              <label htmlFor="remember" className="text-sm remenber">Remember me</label>
            </div>
          </div>

          <Button
            type="submit"
            label="Registrar"
            icon="pi pi-user-plus"
            className="w-full ctl-btn custom-login-btn"
            loading={loading}
          />

          <div className="text-center text-sm support-line">
            Having trouble with technician access?{' '}
            <a className="support-link" href="mailto:support@carbonoverde.com">
              Contact your administrator
            </a>.
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterView
