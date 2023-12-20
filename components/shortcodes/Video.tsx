type VideoProps = {
  title: string
  width: number
  height: number | 'auto'
  src: string
  [key: string]: any
}

function Video({ title, width = 500, height = 'auto', src, ...rest }: VideoProps) {
  return (
    <video className="overflow-hidden rounded-lg" width={width} height={height} controls {...rest}>
      <source src={src.match(/^http/) ? src : `/videos/${src}`} type="video/mp4" />
      {title}
    </video>
  )
}

export default Video
