import clsx from 'clsx'
import { Column } from 'shared/types'

type Props = {
  columns: Column[]
}

export const TableHead = ({ columns }: Props) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map(({ id, label, hidden }) => (
          <th
            key={id}
            scope="col"
            className={clsx(
              'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
              hidden && 'hidden',
            )}
          >
            {label}
          </th>
        ))}
      </tr>
    </thead>
  )
}
