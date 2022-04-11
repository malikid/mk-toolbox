import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>

      <Head>
        <title>MK Toolbox</title>
        <meta name="description" content="Welcome to MK's Toolbox!" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to MK&apos;s Toolbox!
        </h1>

        <div className={styles.grid}>
          <Link href="/get-funda-floor-plan">
            <a className={styles.card}>
              <h2>Get Floor Plan from Funda &rarr;</h2>
              <p>Find in-depth information.</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  )
}
