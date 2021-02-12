import { Children } from 'shared/types'

type Props = {
  children: Children
}

export const Filter = ({ children }: Props) => {
  return <div className="p-6 bg-gray-50 shadow mb-5 rounded-lg">{children}</div>
}
