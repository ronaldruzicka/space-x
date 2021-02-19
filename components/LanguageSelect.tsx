import useTranslation from 'next-translate/useTranslation'
import Router from 'next/router'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { LANGUAGE_OPTIONS } from 'shared/constants'

export const LanguageSelect = () => {
  const { lang } = useTranslation()
  const [language, setLanguage] = useState(lang)
  const prevLang = useRef<string>()

  useEffect(() => {
    const { router } = Router

    if (prevLang.current !== language && router) {
      Router.push(router.asPath, undefined, { locale: language })
    }

    prevLang.current = language
  }, [language])

  return (
    <select
      name="language"
      className="w-28 fixed md:absolute bottom-5 right-10 md:top-4 md:bottom-auto block py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      onChange={(event: ChangeEvent<HTMLSelectElement>) => setLanguage(event.target.value)}
      value={language}
    >
      {LANGUAGE_OPTIONS.map(({ label, value }) => (
        <option key={value} disabled={value === language} value={value}>
          {label}
        </option>
      ))}
    </select>
  )
}
