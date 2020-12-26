import './styles.scss'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {

  return <>
      <Head>
        <script src="https://kit.fontawesome.com/07fc634891.js" crossOrigin="anonymous"></script>
      </Head>
      <Component {...pageProps} />
    </>
}

export default MyApp
