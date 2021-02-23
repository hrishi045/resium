import { useTheme } from 'next-themes'

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      The current theme is: {theme}
      <br />
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('system')}>System Default</button>
    </div>
  )
}
