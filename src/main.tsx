import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { ThemeProvider } from '@mui/material/styles';
import './index.css'
// import theme from './theme';
import App from './App.tsx'
// import { CssBaseline } from '@mui/material';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
