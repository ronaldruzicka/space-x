import { I18n } from 'next-i18next'
import { Children } from 'shared/types'
import { LanguageSelect } from './LanguageSelect'

type Props = {
  children: Children
  i18n: I18n
}

export const PageLayout = ({ children, i18n }: Props) => {
  return (
    <>
      <LanguageSelect i18n={i18n} />
      {children}
    </>
  )
}
