import { Children } from 'shared/types'

type Props = {
  children: Children
}

export const Table = ({ children }: Props) => {
  return (
    <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">{children}</table>
        </div>
      </div>
    </div>
  )
}
