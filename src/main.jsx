import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './context/ThemeContext'
import { CmsProvider } from './context/CmsContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <CmsProvider>
        <App />
      </CmsProvider>
    </ThemeProvider>
  </StrictMode>,
)

