import { useTheme } from 'next-themes'

export default function ThemeChanger() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="fixed flex justify-around w-full gap-2 border-b border-gray-500 bg-gray-50 dark:bg-gray-800">
      The current theme is: {theme}
      <br />
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('system')}>System Default</button>
    </div>
  )
}
