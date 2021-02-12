import { client } from 'graphql/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider } from 'urql'
import 'tailwindcss/tailwind.css'
import { Container } from 'components/Container'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={client}>
      <Head>
        <title>Space X Launches</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container>
        <Component {...pageProps} />
      </Container>
    </Provider>
  )
}

export default MyApp
