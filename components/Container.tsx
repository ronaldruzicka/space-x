import { Children } from 'shared/types'

type Props = {
  children: Children
}

export const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-4">{children}</div>
}
