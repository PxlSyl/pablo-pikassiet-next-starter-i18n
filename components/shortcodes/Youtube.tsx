'use client'

type YoutubeProps = {
  id: string
  title: string
  [key: string]: any
}

import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const Youtube = ({ id, title, ...rest }: YoutubeProps) => {
  return <LiteYouTubeEmbed wrapperClass="yt-lite rounded-lg" id={id} title={title} {...rest} />
}

export default Youtube
