import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Card } from 'primereact/card'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { SelectButton } from 'primereact/selectbutton'
import { Message } from 'primereact/message'
import { Checkbox } from 'primereact/checkbox'
import { loginSuccess, setRemember } from '../slices/authSlice'
import { login } from '../services/api'

const LoginView = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [message, setMessage] = useState({ show: false, type: 'success', text: '' })

  // Steps
  const [step, setStep] = useState('company')
  const [goingForward, setGoingForward] = useState(true)

  const transitionName = useMemo(() => (goingForward ? 'slide-left' : 'slide-right'), [goingForward])

  // Step 1: Company Identifier
  const identifierTypeOptions = [
    { label: 'Workspace Handle', value: 'name' },
    { label: 'Company Email', value: 'email' },
  ]
  const [identifierType, setIdentifierType] = useState('name')
  const [identifier, setIdentifier] = useState('')
  const [touchedCompany, setTouchedCompany] = useState(false)

  const companyError = useMemo(() => {
    if (!touchedCompany) return ''
    if (!identifier) return identifierType === 'email'
      ? 'Enter the company email.'
      : 'Enter the workspace handle.'
    if (identifierType === 'email') {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!re.test(identifier)) return 'Enter a valid email.'
    } else {
      if (identifier.trim().length < 2) return 'Workspace Handle is too short.'
    }
    return ''
  }, [touchedCompany, identifier, identifierType])

  // Step 2: Auth (Technician)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRememberState] = useState(false)
  const [loading, setLoading] = useState(false)
  const [touchedAuth, setTouchedAuth] = useState({ username: false, password: false })

  const usernameError = useMemo(() => (touchedAuth.username && !username ? 'Provide your username.' : ''), [touchedAuth.username, username])
  const passwordError = useMemo(() => (touchedAuth.password && !password ? 'Provide your password.' : ''), [touchedAuth.password, password])
  const formValid = useMemo(() => !!username && !!password, [username, password])

  // Banner
  const showBanner = useMemo(() => {
    if (step === 'company') return touchedCompany && !!companyError
    return (touchedAuth.username || touchedAuth.password) && !formValid
  }, [step, touchedCompany, companyError, touchedAuth, formValid])

  const bannerText = useMemo(() => {
    if (step === 'company') return companyError || 'Please fill the required field.'
    const msgs = []
    if (touchedAuth.username && !username) msgs.push('Username is required.')
    if (touchedAuth.password && !password) msgs.push('Password is required.')
    return msgs.join(' ')
  }, [step, companyError, touchedAuth, username, password])

  // Handlers
  const goCompanyNext = async () => {
    setTouchedCompany(true)
    if (companyError) return
    setGoingForward(true)
    setStep('auth')
  }

  const goBackToCompany = () => {
    setGoingForward(false)
    setStep('company')
  }

  const onSubmitCompany = (e) => {
    e.preventDefault()
    goCompanyNext()
  }

  const onSubmitAuth = async (e) => {
    e.preventDefault()
    setTouchedAuth({ username: true, password: true })
    if (!formValid || loading) return
    setLoading(true)
    try {
      const { access_token, user } = await login(username, password)
      dispatch(loginSuccess({ token: access_token, user }))
      dispatch(setRemember(remember))
      setMessage({ show: true, type: 'success', text: 'Welcome!' })
      setTimeout(() => navigate('/'), 1000)
    } catch (err) {
      const detail = err?.response?.data?.detail || 'Invalid credentials.'
      setMessage({ show: true, type: 'error', text: detail })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-shell">
      <div className="flex flex-column align-items-center justify-content-center gap-4 p-3 w-full">
        <div className="logo-auth w-auto h-4rem md:h-5rem flex align-items-center justify-content-center">
          <h1 className="text-3xl font-bold text-primary">Carbon Overde</h1>
        </div>
        {message.show && (
          <Message severity={message.type} closable={false} className="w-full">
            {message.text}
          </Message>
        )}

        <Card className="auth-card shadow-2 w-11/12 sm:w-40rem md:w-48rem lg:w-56rem">
          <div className="text-center text-2xl font-semibold mb-4">
            {step === 'company' ? 'Identify Your Company' : 'Access Workspace'}
          </div>

          <div className="card-content">
            {/* Banner compacto no topo (sem deformar) */}
            <div className="form-alert">
              {showBanner && (
                <Message severity="warn" closable={false} className="w-full">
                  {bannerText || 'Please check the highlighted fields.'}
                </Message>
              )}
            </div>

            {/* Transição entre passos */}
            <div className={`transition-container ${transitionName}`}>
              {/* Step 1: Company */}
              {step === 'company' && (
                <form
                  key="company"
                  className="flex flex-column gap-4"
                  onSubmit={onSubmitCompany}
                  noValidate
                >
                  <div className="flex flex-column gap-2 align-items-center">
                    <label className="text-sm font-medium text-center">Choose an identifier</label>
                    <SelectButton
                      value={identifierType}
                      onChange={(e) => setIdentifierType(e.value)}
                      options={identifierTypeOptions}
                      optionLabel="label"
                      optionValue="value"
                    />
                  </div>

                  <div className="step-inner flex flex-column gap-4">
                    <div className="flex flex-column gap-2">
                      <label htmlFor="identifier" className="text-sm font-medium">
                        {identifierType === 'email' ? 'Company Email' : 'Workspace Handle'}
                      </label>
                      <InputText
                        id="identifier"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        className="w-full ctl-input"
                        invalid={!!companyError}
                        placeholder={identifierType === 'email' ? 'acme@company.com' : 'Acme Corp'}
                        onInput={() => setTouchedCompany(true)}
                        onBlur={() => setTouchedCompany(true)}
                        autoComplete="organization"
                      />
                    </div>

                    <div className="flex gap-2 justify-content-end">
                      <Button
                        type="submit"
                        label="Continue"
                        icon="pi pi-arrow-right"
                        iconPos="right"
                        className="custom-login-btn"
                      />
                    </div>

                    {/* linha de suporte */}
                    <div className="text-center text-sm support-line">
                      Having trouble with technician access?
                      <a className="support-link" href="mailto:support@carbonoverde.com">Contact your administrator</a>.
                    </div>
                  </div>
                </form>
              )}

              {/* Step 2: Auth */}
              {step === 'auth' && (
                <form
                  key="auth"
                  className="flex flex-column gap-4"
                  onSubmit={onSubmitAuth}
                  noValidate
                >
                  <div className="flex justify-content-between align-items-center">
                    <Button
                      type="button"
                      label="Change company"
                      icon="pi pi-arrow-left"
                      className="p-button-text"
                      onClick={goBackToCompany}
                    />
                  </div>

                  <div className="flex flex-column gap-2">
                    <label htmlFor="username" className="text-sm font-medium">Technician</label>
                    <InputText
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full ctl-input"
                      invalid={touchedAuth.username && !!usernameError}
                      onInput={() => setTouchedAuth(prev => ({ ...prev, username: true }))}
                      onBlur={() => setTouchedAuth(prev => ({ ...prev, username: true }))}
                      placeholder="your_technician_username"
                      autoComplete="username"
                      autoFocus
                    />
                  </div>

                  <div className="flex flex-column gap-2">
                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                    <Password
                      inputId="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      feedback={false}
                      toggleMask
                      className="w-full"
                      invalid={touchedAuth.password && !!passwordError}
                      inputProps={{
                        className: 'w-full ctl-input',
                        placeholder: '••••••••',
                        autoComplete: 'current-password',
                        onInput: () => setTouchedAuth(prev => ({ ...prev, password: true })),
                        onBlur: () => setTouchedAuth(prev => ({ ...prev, password: true }))
                      }}
                    />
                  </div>

                  <div className="flex align-items-center justify-content-between">
                  <div className="flex align-items-center gap-2">
                    <Checkbox inputId="remember" checked={remember} onChange={(e) => setRememberState(e.checked)} />
                    <label htmlFor="remember" className="text-sm">Remember me</label>
                  </div>
                    <a className="text-sm cursor-pointer link-muted">Forgot password?</a>
                  </div>

                  <Button
                    type="submit"
                    label="Unlock"
                    icon="pi pi-unlock"
                    className="w-full ctl-btn custom-login-btn"
                    loading={loading}
                    disabled={!formValid}
                  />

                  {/* linha de suporte */}
                  <div className="text-center text-sm support-line">
                    Having trouble with technician access?
                    <a className="support-link" href="mailto:support@carbonoverde.com">Contact your administrator</a>.
                  </div>
                </form>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default LoginView
