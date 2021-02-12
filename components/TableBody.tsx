import { Children } from 'shared/types'

type Props = {
  children: Children
}

export const TableBody = ({ children }: Props) => {
  return <tbody className="bg-white divide-y divide-gray-200">{children}</tbody>
}
