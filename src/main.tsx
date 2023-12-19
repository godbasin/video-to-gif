import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import NaveBar from './components/NaveBar.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NaveBar />
    <App />
  </React.StrictMode>,
)
