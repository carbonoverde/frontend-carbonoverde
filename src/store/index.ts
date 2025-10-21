import { configureStore } from '@reduxjs/toolkit'
import tabsReducer from '../slices/tabsSlice'
import authReducer from '../slices/authSlice'

export const store = configureStore({
  reducer: {
    tabs: tabsReducer,
    auth: authReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
