import { createClient } from 'urql'

export const client = createClient({
  url: 'https://api.spacex.land/graphql/',
})
