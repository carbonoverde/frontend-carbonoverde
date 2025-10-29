import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'
import { Checkbox } from 'primereact/checkbox'
import { Toast } from 'primereact/toast'
import { useRef } from 'react'
import { registerUser } from '../services/api'

const OrdersView = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const toast = useRef(null)
  const [loading, setLoading] = useState(false)
  const [remember, setRememberState] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    city: '',
    role: 'ADMIN'
  })
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    city: '',
    password: ''
  })

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'name é obrigatório'
    if (!formData.username.trim()) newErrors.username = 'name técnico é obrigatório'
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
      await registerUser(formData)

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
    <div className="p-5">
      <Toast ref={toast} />
      <div className="flex flex-column align-items-center justify-content-center gap-4 p-3">
        <div className="logo-auth w-auto h-4rem md:h-5rem flex align-items-center justify-content-center">
          <h1 className="text-6xl font-bold text-primary">Prefeitura de Joinville</h1>
        </div>

        <form
          key="auth"
          className="flex flex-column gap-4 "
          onSubmit={onSubmitAuth}
          noValidate
        >
          <div className="flex justify-center align-items-center">
            <h2 className='text-xl font-semibold'>Registrar usuário</h2>
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="name" className="text-sm font-medium">Nome Completo</label>
            <InputText
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`w-full ctl-input ${errors.name && 'p-invalid'}`}
              placeholder="Ex: Pedro Francisco"
            />
            {errors.name && <Message severity="error" text={errors.name} />}
          </div>

          <div className="flex flex-column gap-2">
            <label htmlFor="username" className="text-sm font-medium">Nome técnico</label>
            <InputText
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className={`w-full ctl-input ${errors.username && 'p-invalid'}`}
              placeholder="Técnico responsável"
            />
            {errors.username && <Message severity="error" text={errors.username} />}
          </div>
          <div className="flex flex-column gap-2">
            <label htmlFor="city" className="text-sm font-medium">Cidade</label>
            <InputText
              id="city"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              className={`w-full ctl-input ${errors.city && 'p-invalid'}`}
              placeholder="Ex: Joinville"
            />
            {errors.city && <Message severity="error" text={errors.city} />}
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

export default OrdersView
