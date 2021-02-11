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
  const headCells = ['Názov misie', 'Názov rakety', 'Dátum vzletu', 'Úspešnosť']

  return (
    <>
      <h1>Missions</h1>
      {isFetching && <p>Loading...</p>}
      {data && (
        <table>
          <thead>
            <tr>
              {headCells.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.launchesPast.map(
              ({ id, mission_name, rocket, launch_date_local, launch_success }) => (
                <tr key={id}>
                  <td>{mission_name}</td>
                  <td>{rocket.rocket_name}</td>
                  <td>{launch_date_local}</td>
                  <td>{launch_success ? 'Success' : 'Failure'}</td>
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
