import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { ProfileProvider } from './context/ProfileContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ProfileProvider>
          <App />
        </ProfileProvider>
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
