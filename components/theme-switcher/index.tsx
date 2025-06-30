import Image from 'next/image'
import { Container } from './styles'
import Switch from 'react-switch'
import { useTheme } from '@/providers/theme-provider'

export function ThemeSwitcher() {
  const { isDarkTheme, toggleTheme } = useTheme()

  return (
    <Container>
      <Image src={'/light-sun.png'} alt="sun" height={30} width={30} />
      <Switch
        checked={isDarkTheme}
        onChange={toggleTheme}
        onColor="#86d3ff"
        onHandleColor="#2693e6"
        handleDiameter={30}
        uncheckedIcon={false}
        checkedIcon={false}
        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
        height={20}
        width={50}
        className="react-switch"
        id="material-switch"
      />
      <Image src={'/light-moon.png'} alt="moon" height={30} width={30} />
    </Container>
  )
}
