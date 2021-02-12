import { I18n } from 'next-i18next'
import { ChangeEvent } from 'react'
import { LANGUAGE_OPTIONS } from 'shared/constants'

type Props = {
  i18n: I18n
}

export const LanguageSelect = ({ i18n }: Props) => {
  return (
    <select
      name="language"
      className="w-28 fixed md:absolute bottom-5 right-10 md:top-4 md:bottom-auto block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={(event: ChangeEvent<HTMLSelectElement>) => i18n.changeLanguage(event.target.value)}
      value={i18n.language}
    >
      {LANGUAGE_OPTIONS.map(({ label, value }) => (
        <option key={value} disabled={value === i18n.language} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}
