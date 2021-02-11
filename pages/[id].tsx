import { useRouter } from 'next/router'
import { LaunchResponse } from 'shared/types'
import { useQuery } from 'urql'
import YouTube from 'react-youtube'
import { compose, split, last } from 'ramda'

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

  const { data } = result

  const videoId = data && getLastItem(data.launch.links.video_link)

  return (
    <div>
      <button onClick={() => router.back()} type="button">{`<- Back`}</button>
      <h1>{data?.launch.mission_name}</h1>
      {typeof videoId === 'string' && <YouTube videoId={videoId} />}
    </div>
  )
}

export default Mission
