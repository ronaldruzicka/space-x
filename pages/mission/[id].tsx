import { useRouter } from 'next/router'
import { LaunchResponse } from 'shared/types'
import { useQuery } from 'urql'
import YouTube from 'react-youtube'
import { compose, split, last } from 'ramda'
import { Button } from 'components/Button'
import { Header } from 'components/Header'
import { Heading } from 'components/Heading'
import { Spinner } from 'components/Spinner'

const GET_LAUNCH = `
  query GetLaunch($id: ID!) {
    launch(id: $id) {
      links {
        video_link
      }
      mission_name
    }
  }
`

const getLastItem = compose(last, split('/'))

const Mission = () => {
  const router = useRouter()
  const [result] = useQuery<LaunchResponse>({
    query: GET_LAUNCH,
    variables: {
      id: router.query.id,
    },
  })

  const { data, fetching: isFetching } = result

  const videoId = data && getLastItem(data.launch.links.video_link)

  return isFetching ? (
    <div className="flex h-screen justify-center items-center">
      <Spinner />
    </div>
  ) : (
    <>
      <Header>
        <Heading component="h1">{data?.launch.mission_name}</Heading>
      </Header>
      <Button
        icon={
          <svg
            className="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        }
        onClick={() => router.back()}
      >
        Back
      </Button>

      {typeof videoId === 'string' && (
        <div className="flex justify-center pt-10">
          <YouTube videoId={videoId} />
        </div>
      )}
    </>
  )
}

export default Mission
