import { createTheme, ThemeProvider } from '@mui/material/styles'
import '../styles/globals.css'
import Script from 'next/script'
import styles from '../styles/Home.module.css'
import Image from 'next/image'

function MyApp({ Component, pageProps }) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />
      <Script id='ga-analytics'>
        {
          `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `
        }
      </Script>
      <div className={styles.container}>
        <Component {...pageProps} />
        <footer className={styles.footer}>
          <span>Powered by{' '}</span>
          <Image src="/favicon.png" alt="Logo" width={72} height={72} />
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default MyApp
