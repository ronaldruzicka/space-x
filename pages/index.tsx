import { useState } from 'react'
import { MissionsResponse } from 'shared/types'
import { useQuery } from 'urql'

const GET_MISSIONS = `
  query GetMissions($limit: Int = 10, $offset: Int!) {
    launchesPast(limit: $limit, offset: $offset) {
      id
      mission_name
      rocket {
        rocket_name
      }
      launch_date_local
      launch_success
    }
  }
`

const LIMIT = 10

const Home = () => {
  const [offset, setOffset] = useState(0)
  const [result] = useQuery<MissionsResponse>({
    query: GET_MISSIONS,
    variables: {
      limit: LIMIT,
      offset,
    },
  })

  const { data, fetching: isFetching } = result
  const headCells = [
    { id: 'name', label: 'Mission name', hidden: false },
    { id: 'rocket', label: 'Rocket name', hidden: false },
    { id: 'date', label: 'Launch date', hidden: false },
    { id: 'success', label: 'Success', hidden: false },
  ]

  const [columns, setColumns] = useState<typeof headCells>(headCells)

  const shouldHideColumn = (columnId: string) =>
    columns.some(({ id, hidden }) => columnId === id && hidden)

  return (
    <>
      <h1>Space X Missions</h1>
      {isFetching && <p>Loading...</p>}
      <div>
        {headCells.map(({ id, label }) => {
          const isChecked = columns.some((column) => column.id === id && !column.hidden)

          return (
            <label key={id} htmlFor={id}>
              <input
                id={id}
                type="checkbox"
                checked={isChecked}
                onChange={() =>
                  setColumns((prevColumns) =>
                    prevColumns.map((column) =>
                      column.id === id
                        ? {
                            ...column,
                            hidden: !column.hidden,
                          }
                        : column,
                    ),
                  )
                }
              />
              {label}
            </label>
          )
        })}
      </div>
      {data && (
        <table>
          <thead>
            <tr>
              {columns.map(({ id, label }) => (
                <td style={shouldHideColumn(id) ? { display: 'none' } : undefined} key={id}>
                  {label}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.launchesPast.map(
              ({ id, mission_name, rocket, launch_date_local, launch_success }) => (
                <tr key={id}>
                  <td style={shouldHideColumn('name') ? { display: 'none' } : undefined}>
                    {mission_name}
                  </td>
                  <td style={shouldHideColumn('rocket') ? { display: 'none' } : undefined}>
                    {rocket.rocket_name}
                  </td>
                  <td style={shouldHideColumn('date') ? { display: 'none' } : undefined}>
                    {launch_date_local}
                  </td>
                  <td style={shouldHideColumn('success') ? { display: 'none' } : undefined}>
                    {launch_success ? 'Success' : 'Failure'}
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      )}

      <button type="button" onClick={() => setOffset((prevPage) => prevPage - LIMIT)}>
        Prev Page
      </button>
      <button type="button" onClick={() => setOffset((prevPage) => prevPage + LIMIT)}>
        Next Page
      </button>
    </>
  )
}

export default Home
