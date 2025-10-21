import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem('token'),
  remember: localStorage.getItem('remember') === '1'
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      const { token, user } = action.payload
      state.isAuthenticated = true
      state.user = user
      state.token = token
      localStorage.setItem('token', token)
    },
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      localStorage.removeItem('token')
      localStorage.removeItem('remember')
    },
    setRemember: (state, action) => {
      state.remember = action.payload
      if (action.payload) {
        localStorage.setItem('remember', '1')
      } else {
        localStorage.removeItem('remember')
      }
    }
  }
})

export const { loginSuccess, logout, setRemember } = authSlice.actions
export default authSlice.reducer
