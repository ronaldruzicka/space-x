import clsx from 'clsx'
import { Children } from 'shared/types'

type HeadingTag = 'h1' | 'h2' | 'h3'

type Props = {
  children: Children
  className?: string
  component: HeadingTag
  variant?: HeadingTag
}

const variants = {
  h1: 'text-3xl md:text-5xl',
  h2: 'text-2xl md:text-3xl',
  h3: 'text-lg md:text-xl',
}

export const Heading = ({
  children,
  className,
  component: Component,
  variant = Component,
}: Props) => (
  <Component
    className={clsx('font-extrabold leading-7 text-gray-900', variants[variant], className)}
  >
    {children}
  </Component>
)
