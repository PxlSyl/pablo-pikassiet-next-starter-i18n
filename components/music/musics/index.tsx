import { MusicCard } from './musiccard'

type Props = {
  img: string
  title: string
  author: string
  audio: string
  musicId: number
  id: number
  isFull: boolean
  genre: string
  genres: string
  isSearch: boolean
  search: string
  windowWidth: number
  setId: (e: number) => void
}

export const Musics = (props: Props): JSX.Element | null => {
  const {
    img,
    title,
    author,
    audio,
    musicId,
    isFull,
    id,
    genre,
    genres,
    isSearch,
    search,
    windowWidth,
    setId,
  } = props

  if (isSearch) {
    if (
      search.toLowerCase() === title?.toLowerCase() ||
      search === author?.toLowerCase() ||
      search === genre?.toLowerCase()
    ) {
      return (
        <>
          <MusicCard img={img} title={title} author={author} setId={setId} musicId={musicId} />
          <audio src={audio} />
        </>
      )
    }
  } else if (genres !== '') {
    if (genre === genres) {
      return (
        <>
          <MusicCard img={img} title={title} author={author} setId={setId} musicId={musicId} />
          <audio src={audio} />
        </>
      )
    }
  } else if (isFull === false && windowWidth <= 830) {
    if (musicId === id) {
      return (
        <div className="w-95vw h-1/2 ">
          <MusicCard img={img} title={title} author={author} setId={setId} musicId={musicId} />
        </div>
      )
    }
  } else {
    return (
      <>
        <MusicCard img={img} title={title} author={author} setId={setId} musicId={musicId} />
        <audio src={audio} />
      </>
    )
  }

  return null
}
