import '../styles/tailwind.css'
import '../styles/global.css'
import { ThemeProvider } from 'next-themes'

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      storageKey="resium-color-mode"
      defaultTheme="system" // default "light"
    >
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
