import { Outlet } from 'react-router-dom'
import './privatelayout.css'
import HeaderTabs from '../components/HeaderTabs'
import AsideNavBar from '../components/asidenavbar'
import { useThemeContex } from '../hooks/useThemeProvider'
import { ThemeProvider } from '../context/ThemeProvider'

const PrivateLayout = () => {
  return (
    <ThemeProvider>
      <Layout />
    </ThemeProvider>
  )
}

const Layout = () => {
  const { toggleAside } = useThemeContex()
  return (
    <div className={`layout__admin ${toggleAside ? "layout__admin--toggle" : ""}`}>
      <AsideNavBar />
      <main className='main__area'>
        <HeaderTabs />
        <div style={{ height: "calc(100dvh - 60px)", overflowY: "auto" }}>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default PrivateLayout