export type Rocket = {
  rocket_name: string
}

export type Mission = {
  id: string
  mission_name: string
  rocket: Rocket
  launch_date_local: string
  launch_success: boolean
}

export type MissionsResponse = {
  launchesPast: Mission[]
}
