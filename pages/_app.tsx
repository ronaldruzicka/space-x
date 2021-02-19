import { Container } from 'components/Container'
import { LanguageSelect } from 'components/LanguageSelect'
import { client } from 'graphql/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import 'styles/global.css'
import { Provider } from 'urql'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider value={client}>
      <Head>
        <title>Space X Launches</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container>
        <LanguageSelect />
        <Component {...pageProps} />
      </Container>
    </Provider>
  )
}

export default MyApp
