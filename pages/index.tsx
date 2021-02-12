import { Button } from 'components/Button'
import { Checkbox } from 'components/Checkbox'
import { Filter } from 'components/Filter'
import { Header } from 'components/Header'
import { Heading } from 'components/Heading'
import { Spinner } from 'components/Spinner'
import { Table } from 'components/Table'
import { TableBody } from 'components/TableBody'
import { TableCell } from 'components/TableCell'
import { TableHead } from 'components/TableHead'
import { TableRow } from 'components/TableRow'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Mission, MissionsResponse } from 'shared/types'
import { useQuery } from 'urql'
import useDeepCompareEffect from 'use-deep-compare-effect'
import Link from 'next/link'

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
  const router = useRouter()
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
  const isFirstPage = missions.length === LIMIT
  const hasMoreMissions = Array.isArray(response) && response.length >= LIMIT

  const loadMore = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]

      if (!isFirstPage && target.isIntersecting && hasMoreMissions) {
        !isFetching && setOffset((prevPage) => prevPage + LIMIT)
      }
    },
    [isFirstPage, hasMoreMissions, isFetching],
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
    { id: 'id', label: 'ID', hidden: true },
    { id: 'name', label: 'Mission name', hidden: false },
    { id: 'rocket', label: 'Rocket name', hidden: false },
    { id: 'date', label: 'Launch date', hidden: false },
    { id: 'success', label: 'Success', hidden: false },
  ]

  const [columns, setColumns] = useState<typeof headCells>(headCells)

  const shouldHideColumn = (columnId: string) =>
    columns.some(({ id, hidden }) => columnId === id && hidden)

  const handleToggleColumn = (id: string) =>
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

  return (
    <>
      <Header>
        <Heading component="h1">Space X Missions</Heading>
      </Header>
      <Filter>
        <Heading className="mb-3" component="h3">
          Switch on/off table columns:{' '}
        </Heading>
        <div className="flex justify-between">
          {headCells.map(({ id, label }) => {
            const isChecked = columns.some((column) => column.id === id && !column.hidden)

            return (
              <Checkbox
                key={id}
                checked={isChecked}
                label={label}
                name={id}
                onChange={() => handleToggleColumn(id)}
              />
            )
          })}
        </div>
      </Filter>
      {missions && (
        <Table>
          <TableHead columns={columns} />
          <TableBody>
            {missions.map(({ id, mission_name, rocket, launch_date_local, launch_success }) => (
              <Link key={id} href={`/mission/${id}`}>
                <TableRow>
                  <TableCell hidden={shouldHideColumn('id')}>{id}</TableCell>
                  <TableCell hidden={shouldHideColumn('name')}>{mission_name}</TableCell>
                  <TableCell hidden={shouldHideColumn('rocket')}>{rocket.rocket_name}</TableCell>
                  <TableCell hidden={shouldHideColumn('date')}>{launch_date_local}</TableCell>
                  <TableCell hidden={shouldHideColumn('success')}>
                    {launch_success ? 'Success' : 'Failure'}
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      )}

      <div className="flex justify-center py-4" ref={loader}>
        {isFirstPage && !isFetching && (
          <Button
            icon={
              <svg
                className="-ml-1 mr-2 h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13l-3 3m0 0l-3-3m3 3V8m0 13a9 9 0 110-18 9 9 0 010 18z"
                />
              </svg>
            }
            onClick={() => setOffset((prevOffset) => prevOffset + LIMIT)}
          >
            Load more
          </Button>
        )}
        {isFetching && <Spinner />}
      </div>
    </>
  )
}

export default Home
