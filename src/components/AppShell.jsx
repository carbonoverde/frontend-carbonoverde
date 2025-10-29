import React, { useState, useEffect, useRef, useMemo } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addTab, activateTab, closeTab, reorderTabs, setDensity, loadTabs } from '../slices/tabsSlice'
import HomeView from '../views/HomeView'
import OperationsView from '../views/OperationsView'
import OrdersView from '../views/OrdersView'

// Sortable Tab Component
const SortableTab = ({ tab, isActive, onActivate, onClose }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tab.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <li
      ref={setNodeRef}
      style={style}
      className={`tab-item ${isActive ? 'active' : ''} ${isDragging ? 'tab-drag' : ''}`}
      role="presentation"
    >
      <button
        className="tab-btn"
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        onClick={() => onActivate(tab.id)}
        title={tab.title}
      >
        <span
          className="tab-handle"
          title="Drag tab"
          {...attributes}
          {...listeners}
        >
          <FontAwesomeIcon icon={['fas', 'grip-vertical']} />
        </span>

        <span className="tab-title">{tab.title}</span>

        <span
          className={`tab-x ${!tab.closable ? 'disabled' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            if (tab.closable) onClose(tab.id)
          }}
          aria-label="Close tab"
        >
          <FontAwesomeIcon icon={['fas', 'xmark']} />
        </span>
      </button>
    </li>
  )
}

const AppShell = () => {
  const dispatch = useDispatch()
  const { tabs, activeId, density } = useSelector(state => state.tabs)
  const tabListRef = useRef(null)
  const [langMenuOpen, setLangMenuOpen] = useState(false)
  const [currentLang, setCurrentLang] = useState({ code: 'en', cc: 'us', label: 'English' })

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const langs = [
    { code: 'en', cc: 'us', label: 'English' },
    { code: 'es', cc: 'es', label: 'Español' },
    { code: 'de', cc: 'de', label: 'Deutsch' }
  ]

  const toggleLangMenu = () => setLangMenuOpen(!langMenuOpen)
  const setLang = (l) => { setCurrentLang(l); setLangMenuOpen(false) }

  /** Ícones da sidebar (apenas um por "seção" de alto nível) */
  const sideItems = [
    { header: 'Main' },
    { key: 'home', label: 'Home', icon: ['fas', 'house'] },
    { key: 'operations', label: 'Gerenciar Empresas', icon: ['fas', 'map'] },
    { key: 'orders', label: 'Criar novo usuario', icon: ['fas', 'clipboard-list']},
    { key: 'technicians', label: 'Technicians', icon: ['fas', 'users'] },
    { key: 'clients', label: 'Clients', icon: ['fas', 'user-group'] },

    { header: 'Analytics' },
    { key: 'kpi', label: 'KPI Detail', icon: ['fas', 'chart-line'] },

    { header: 'Admin' },
    { key: 'audit', label: 'Audit Logs', icon: ['fas', 'clock-rotate-left'] },
    { key: 'settings', label: 'Settings', icon: ['fas', 'gear'] },

    { header: 'Account' },
    { key: 'logout', label: 'Logout', icon: ['fas', 'arrow-right-from-bracket'], danger: true },
  ]

  /** Pedaços de UI (demos). Em prod, troque por imports de componentes reais. */
  const panes = {
    HomePane: HomeView,
    OrdersPane: OrdersView,
    ClientsPane: () => <div className="pane"><h2>Clients</h2><p>Lista/gestão de clientes.</p></div>,
    SettingsPane: () => <div className="pane"><h2>Settings</h2><p>Preferências do sistema.</p></div>,
    OperationsPane: OperationsView,
  }

  const activeKey = useMemo(() => tabs.find(t => t.id === activeId)?.key, [tabs, activeId])
  const activeComponent = useMemo(() => {
    const tab = tabs.find(t => t.id === activeId)
    return tab ? panes[tab.component] : null
  }, [tabs, activeId])

  /** Abre/ativa aba a partir da sidebar (deduplica por key) */
  const openFromSidebar = (key) => {
    const exists = tabs.find(t => t.key === key)
    if (exists) return dispatch(activateTab(exists.id))

    const cfg = {
      home: { title: 'Home', icon: 'pi pi-home', component: 'HomePane', closable: false },
      operations: { title: 'Gerenciar Empresas', icon: 'pi pi-home', component: 'OperationsPane', closable: true },
      orders: { title: 'Work Orders', icon: 'pi pi-clipboard', component: 'OrdersPane', closable: true },
      technicians: { title: 'Technicians', icon: 'pi pi-users', component: 'TechniciansPane', closable: true },
      kpi: { title: 'KPI Details', icon: 'pi pi-users', component: 'TechniciansPane', closable: true },
      clients: { title: 'Clients', icon: 'pi pi-users', component: 'ClientsPane', closable: true },
      audit: { title: 'Audit Logs', icon: 'pi pi-users', component: 'ClientsPane', closable: true },
      settings: { title: 'Settings', icon: 'pi pi-cog', component: 'SettingsPane', closable: true },
    }[key]
    if (!cfg) return

    const id = `${key}-${Math.random().toString(36).slice(2, 7)}`
    dispatch(addTab({ id, key, ...cfg }))
    dispatch(activateTab(id))
  }

  /** Ativa aba pelo id */
  const activate = (id) => {
    dispatch(activateTab(id))
  }

  /** Fecha aba e escolhe a próxima ativa de forma inteligente */
  const closeTabHandler = (id) => {
    dispatch(closeTab(id))
  }

  /** (Opcional) exemplo para abrir "documentos" em abas (multi-instâncias) */
  const openDoc = (type, id, title) => {
    const tabId = `${type}:${id}`
    const exists = tabs.find(t => t.id === tabId)
    if (exists) return activate(tabId)
    const component = () => <div className="pane"><h2>{title}</h2><p>{type} #{id}</p></div>
    dispatch(addTab({ id: tabId, key: type, title, icon: 'pi pi-file', closable: true, component: 'DocPane' }))
    activate(tabId)
  }

  const openDocs = () => {
    const tabId = 'docs:main'
    const exists = tabs.find(t => t.id === tabId)
    if (exists) return activate(tabId)

    dispatch(addTab({
      id: tabId,
      key: 'docs',
      title: 'Documentation',
      icon: null,
      closable: true,
      component: 'DocsPane'
    }))
    activate(tabId)
  }

  const getStripEl = () => tabListRef.current
  const computeOverflow = (el) => el.scrollWidth > el.clientWidth + 1

  const recomputeDensity = async () => {
    const el = getStripEl()
    if (!el) return
    for (let lvl = 0; lvl <= 3; lvl++) {
      dispatch(setDensity(lvl))
      await new Promise(resolve => setTimeout(resolve, 0))
      if (!computeOverflow(el)) return
    }
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id !== over.id) {
      const oldIndex = tabs.findIndex(tab => tab.id === active.id)
      const newIndex = tabs.findIndex(tab => tab.id === over.id)
      
      dispatch(reorderTabs(arrayMove(tabs, oldIndex, newIndex)))
      recomputeDensity()
    }
  }

  useEffect(() => {
    const el = getStripEl()
    if (el && 'ResizeObserver' in window) {
      const ro = new ResizeObserver(() => recomputeDensity())
      ro.observe(el)
      recomputeDensity()
      return () => ro.disconnect()
    }
  }, [])

  useEffect(() => {
    recomputeDensity()
  }, [tabs, activeId])

  // Load tabs from localStorage on mount
  useEffect(() => {
    const TAB_LIMIT = 10
    const TENANT = localStorage.getItem('workspace_handle') || 'default'
    const STORAGE_KEY = `app:tabs:v1:${TENANT}`

    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const data = JSON.parse(raw)
      if (!data?.tabs?.length) return

      const keyToComp = {
        home: 'HomePane',
        operations: 'OperationsPane',
        orders: 'OrdersPane',
        technicians: 'TechniciansPane',
        clients: 'ClientsPane',
        kpi: 'KpiPane',
        audit: 'AuditPane',
        settings: 'SettingsPane',
        docs: 'DocsPane',
      }

      const restored = []
      for (const t of data.tabs.slice(0, TAB_LIMIT)) {
        const comp = keyToComp[t.key]
        if (!comp) continue
        restored.push({ ...t, component: comp })
      }
      if (!restored.length) return

      // Ensure Home present and not closable
      if (!restored.some(tt => tt.key === 'home')) {
        restored.unshift({
          id: 'home',
          key: 'home',
          title: 'Home',
          closable: false,
          component: 'HomePane'
        })
      } else {
        const h = restored.find(tt => tt.key === 'home')
        h.closable = false
      }

      dispatch(loadTabs({ tabs: restored, activeId: data.activeId }))
    } catch (e) {
      console.warn('Tab restore failed', e)
    }
  }, [dispatch])

  // Save tabs to localStorage
  useEffect(() => {
    const TAB_LIMIT = 10
    const TENANT = localStorage.getItem('workspace_handle') || 'default'
    const STORAGE_KEY = `app:tabs:v1:${TENANT}`

    const payload = {
      v: 1,
      ts: Date.now(),
      tabs: tabs.slice(0, TAB_LIMIT).map(({ id, key, title, closable }) => ({
        id, key, title, closable
      })),
      activeId
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    } catch (e) {
      console.warn('Tab save failed', e)
    }
  }, [tabs, activeId])

  return (
    <div className="app-shell">
      {/* TOPBAR atravessa toda a largura */}
      <header className="topbar">
        <div className="top-left">
        </div>

        {/* Abas estilo navegador no centro */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tabs.map(tab => tab.id)} strategy={verticalListSortingStrategy}>
            <ul
              ref={tabListRef}
              className={`tab-list density-${density}`}
            >
              {tabs.map((t) => (
                <SortableTab
                  key={t.id}
                  tab={t}
                  isActive={t.id === activeId}
                  onActivate={activate}
                  onClose={closeTabHandler}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>

        <div className="top-actions">
          <button className="help-btn" type="button" onClick={openDocs} title="Open documentation">
            <FontAwesomeIcon icon={['fas', 'circle-question']} className="icn" />
            <span className="label">Help</span>
          </button>
          <div className="lang-switch" onKeyDown={(e) => e.key === 'Escape' && setLangMenuOpen(false)}>
            <button className="lang-btn" type="button" onClick={toggleLangMenu}>
                <span className={`fi fi-${currentLang.cc}`}></span>
              <span className="lang-code">{currentLang.code.toUpperCase()}</span>
              <FontAwesomeIcon icon={['fas', 'angle-down']} className="caret" />
            </button>

            {langMenuOpen && (
              <ul className="lang-menu">
                {langs.map((l) => (
                  <li
                    key={l.code}
                    className={l.code === currentLang.code ? 'active' : ''}
                    onClick={() => setLang(l)}
                  >
                      <span className={`fi fi-${l.cc}`}></span>
                    <span className="label">{l.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </header>

      {/* SIDEBAR fica abaixo da topbar, à esquerda */}
      <aside className="sidebar">
        <nav className="side-icons" aria-label="Primary navigation">
          {sideItems.map((it, index) => (
            <React.Fragment key={it.header || it.key || index}>
              {it.header ? (
                <div className="side-header">{it.header}</div>
              ) : (
                <button
                  className={`icon-btn ${activeKey === it.key ? 'active' : ''} ${it.danger ? 'danger' : ''}`}
                  onClick={() => openFromSidebar(it.key)}
                  title={it.label}
                >
                  <FontAwesomeIcon icon={it.icon || ['fas', 'circle']} fixedWidth className="fa" />
                  <span className="icon-label">{it.label}</span>
                  {it.badge && <span className="badge">{it.badge}</span>}
                </button>
              )}
            </React.Fragment>
          ))}
        </nav>
      </aside>

      {/* CONTEÚDO à direita da sidebar */}
      <main className="content">
        <div className="canvas" aria-live="polite">
          <div className="square-frame">
            {activeComponent && React.createElement(activeComponent)}
          </div>
        </div>
      </main>
    </div>
  )
}

export default AppShell
