import { Children } from 'shared/types'

type Props = {
  children: Children
  icon?: React.ReactNode
  onClick: () => void
}

export const Button = ({ children, icon, onClick }: Props) => {
  return (
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-800"
      onClick={onClick}
    >
      {icon}
      {children}
    </button>
  )
}
