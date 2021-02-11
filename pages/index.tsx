import { useCallback, useEffect, useRef, useState } from 'react'
import { Mission, MissionsResponse } from 'shared/types'
import { useQuery } from 'urql'
import useDeepCompareEffect from 'use-deep-compare-effect'

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
  const loader = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  const [result] = useQuery<MissionsResponse>({
    query: GET_MISSIONS,
    variables: {
      limit: LIMIT,
      offset,
    },
  })

  const { data, fetching: isFetching } = result
  const [missions, setMissions] = useState<Mission[]>([])
  const response = data?.launchesPast || []
  const hasMoreMissions = Array.isArray(response) && response.length >= LIMIT

  const loadMore = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]

      if (target.isIntersecting && hasMoreMissions) {
        !isFetching && setOffset((prevPage) => prevPage + LIMIT)
      }
    },
    [hasMoreMissions, isFetching],
  )

  // Merge new missions with previous ones
  useDeepCompareEffect(() => {
    setMissions((prevMissions) => [...prevMissions, ...response])
  }, [response])

  // Use intersection observer for infinite scrolling
  useEffect(() => {
    const element = loader?.current
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    }

    const observer = new IntersectionObserver(loadMore, options)

    if (element) {
      observer.observe(element)
    }

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [loadMore])

  const headCells = [
    { id: 'id', label: 'ID', hidden: false },
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
      {missions && (
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
            {missions.map(({ id, mission_name, rocket, launch_date_local, launch_success }) => (
              <tr key={id}>
                <td style={shouldHideColumn('id') ? { display: 'none' } : undefined}>{id}</td>
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
            ))}
          </tbody>
        </table>
      )}

      <p ref={loader}>{isFetching && 'Loading...'}</p>
      {!hasMoreMissions && (
        <p>
          <strong>No more missions</strong>
        </p>
      )}
    </>
  )
}

export default Home
