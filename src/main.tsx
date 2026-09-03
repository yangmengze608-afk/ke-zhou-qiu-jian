import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import './flow.css'
import './living-river.css'
import './v6.css'
import './revival-score.css'
import './ttplayer-concept.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>,
)
