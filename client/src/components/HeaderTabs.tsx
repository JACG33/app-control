import { MenuBars } from './svg'
import { useThemeContex } from '../hooks/useThemeProvider'

const HeaderTabs = () => {
  const { hldToggleAside } = useThemeContex()

  return (
    <header className='header__tabs'>
      <div className='header__tabs__wrapper'>
        <button type='button' className='header__tab__btn' onClick={hldToggleAside} title='Mostar/Oculatar barra lateral navegacion'>
          <MenuBars />
        </button>
      </div>
    </header>
  )
}

export default HeaderTabs