import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { ProgressProvider } from './context/ProgressContext.jsx'
import { ToastProvider } from './context/ToastContext.jsx'
import './index.css'

// Đăng ký service worker (chỉ ở bản production để không cản trở dev/HMR).
if (import.meta.env.PROD && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {})
  })
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <ProgressProvider>
          <App />
        </ProgressProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
