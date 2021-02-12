import clsx from 'clsx'
import { TFunction } from 'next-i18next'
import { Column } from 'shared/types'

type Props = {
  columns: Column[]
  t: TFunction
}

export const TableHead = ({ columns, t }: Props) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map(({ id, hidden }) => (
          <th
            key={id}
            scope="col"
            className={clsx(
              'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
              hidden && 'hidden',
            )}
          >
            {t(id)}
          </th>
        ))}
      </tr>
    </thead>
  )
}
