import clsx from 'clsx'
import { Children } from 'shared/types'

type Props = {
  children: Children
  hidden: boolean
}

export const TableCell = ({ children, hidden }: Props) => {
  return <td className={clsx('px-6 py-4 whitespace-nowrap', hidden && 'hidden')}>{children}</td>
}
