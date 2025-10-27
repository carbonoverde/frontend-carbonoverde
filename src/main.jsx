import React from 'react'
import ReactDOM from 'react-dom/client'
import './style.css'
import { PrimeReactProvider } from 'primereact/api'
import Aura from '@primeuix/themes/aura'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './assets/base.css'
import '@fontsource-variable/inter'
import 'flag-icons/css/flag-icons.min.css'
import 'leaflet/dist/leaflet.css';

// FontAwesome icons
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faGripVertical, faXmark, faHouse, faClipboardList, faUsers, faGear,
  faMap, faUserGroup, faChartLine, faClockRotateLeft, faArrowRightFromBracket,
  faAngleDown, faBook, faCircleQuestion
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faGripVertical, faXmark, faHouse, faClipboardList, faUsers, faGear,
  faMap, faUserGroup, faChartLine, faClockRotateLeft, faArrowRightFromBracket,
  faAngleDown, faBook, faCircleQuestion
)

const root = ReactDOM.createRoot(document.getElementById('app'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <PrimeReactProvider value={{ theme: { preset: Aura } }}>
          <App />
        </PrimeReactProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)