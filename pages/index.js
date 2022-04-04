import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>MK Toolbox</title>
        <meta name="description" content="Welcome to MK's Toolbox!" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to MK&apos;s Toolbox!
        </h1>

        <p className={styles.description}>
          Get started by
        </p>

        <div className={styles.grid}>
          <a href="#" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information.</p>
          </a>

          <a href="#" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about @#$%$^!</p>
          </a>

          <a
            href="#"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and ...</p>
          </a>

          <a
            href="#"
            className={styles.card}
          >
            <h2>Others &rarr;</h2>
            <p>
              ABC.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <span>Powered by{' '}</span>
          <Image src="/favicon.png" alt="Logo" width={72} height={72} />
      </footer>
    </div>
  )
}
