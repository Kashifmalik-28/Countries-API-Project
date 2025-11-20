import { Outlet } from 'react-router-dom'
import Header from './components/Header.jsx' // ← Import Header
import './App.css'
import { ThemeProvider } from './context/ThemeContext.jsx'

function App() {
  return (
    <ThemeProvider>
      <Header /> {/* ← Add Header at the top */}
      <Outlet />
    </ThemeProvider>
  )
}

export default App
