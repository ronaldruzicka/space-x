import { NextPageContext } from 'next'
import { TFunction } from 'next-i18next'
import { withTranslation } from '../i18n'

type Props = {
  statusCode: number
  t: TFunction
}

const Error = ({ statusCode, t }: Props) => (
  <p>{statusCode ? t('errorWithStatus', { statusCode }) : t('error')}</p>
)

Error.getInitialProps = async ({ res, err }: NextPageContext) => {
  let statusCode = null

  if (res) {
    ;({ statusCode } = res)
  } else if (err) {
    ;({ statusCode } = err)
  }

  return {
    namespacesRequired: ['common'],
    statusCode,
  }
}

export default withTranslation('common')(Error)
