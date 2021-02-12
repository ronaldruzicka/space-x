import { forwardRef, Ref } from 'react'
import { Children } from 'shared/types'

type Props = {
  children: Children
  onClick?: () => void
}

export const TableRow = forwardRef(
  ({ children, onClick }: Props, ref: Ref<HTMLTableRowElement>) => {
    return (
      <tr
        ref={ref}
        onClick={onClick}
        className="transition-colors cursor-pointer hover:bg-indigo-50"
      >
        {children}
      </tr>
    )
  },
)
