import { Children } from 'shared/types'

type Props = {
  children: Children
}

export const Header = ({ children }: Props) => {
  return <header className="py-4 md:py-7 text-center">{children}</header>
}
