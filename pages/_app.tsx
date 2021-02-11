import { client } from 'graphql/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'urql'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={client}>
      <Head>
        <title>Space X Launches</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
