export type Children = React.ReactNode | React.ReactNode[]

export type Column = {
  id: string
  label: string
  hidden: boolean
}

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

export type LaunchLinks = {
  article_link: string
  flickr_images: [string]
  mission_patch_small: string
  mission_patch: string
  presskit: string
  reddit_campaign: string
  reddit_launch: string
  reddit_media: string
  reddit_recovery: string
  video_link: string
  wikipedia: string
}

export type Launch = {
  id: string
  links: LaunchLinks
  mission_name: string
}

export type LaunchResponse = {
  launch: Launch
}
