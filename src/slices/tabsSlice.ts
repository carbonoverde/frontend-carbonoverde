import { createSlice } from '@reduxjs/toolkit'

const TAB_LIMIT = 10
const TENANT = localStorage.getItem('workspace_handle') || 'default'
const STORAGE_KEY = `app:tabs:v1:${TENANT}`

const initialState = {
  tabs: [
    { id: 'home', key: 'home', title: 'Home', icon: 'pi pi-home', closable: false, component: 'HomePane' }
  ],
  activeId: 'home',
  density: 0
}

const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    addTab: (state, action) => {
      const { id, key, title, icon, closable, component } = action.payload
      const exists = state.tabs.find(t => t.id === id)
      if (!exists) {
        state.tabs.push({ id, key, title, icon, closable, component })
      }
    },
    activateTab: (state, action) => {
      state.activeId = action.payload
    },
    closeTab: (state, action) => {
      const id = action.payload
      const idx = state.tabs.findIndex(t => t.id === id)
      if (idx === -1) return
      
      const wasActive = state.tabs[idx].id === state.activeId
      state.tabs.splice(idx, 1)

      if (!state.tabs.length) {
        // Ensure at least one tab (Home)
        state.tabs.push({ id: 'home', key: 'home', title: 'Home', icon: 'pi pi-home', closable: false, component: 'HomePane' })
        state.activeId = 'home'
        return
      }
      
      if (wasActive) {
        const next = state.tabs[idx] || state.tabs[idx - 1] || state.tabs[0]
        state.activeId = next.id
      }
    },
    reorderTabs: (state, action) => {
      state.tabs = action.payload
    },
    setDensity: (state, action) => {
      state.density = action.payload
    },
    loadTabs: (state, action) => {
      const { tabs, activeId } = action.payload
      if (tabs && tabs.length > 0) {
        state.tabs = tabs
        state.activeId = activeId || tabs[0].id
      }
    }
  }
})

export const { addTab, activateTab, closeTab, reorderTabs, setDensity, loadTabs } = tabsSlice.actions
export default tabsSlice.reducer
