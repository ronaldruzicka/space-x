import { Container } from 'components/Container'
import { client } from 'graphql/client'
import type { AppContext, AppProps } from 'next/app'
import App from 'next/app'
import Head from 'next/head'
import { I18nProps } from 'shared/types'
import { Provider } from 'urql'
import { appWithTranslation } from '../i18n'
import '../styles/global.css'

const MyApp = ({ Component, pageProps }: AppProps<I18nProps>) => {
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

MyApp.getInitialProps = async (appContext: AppContext) => ({
  ...(await App.getInitialProps(appContext)),
})

export default appWithTranslation(MyApp)
