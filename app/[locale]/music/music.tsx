'use client'

import musicData from '../../../config/data/music-data.json'

import React, { useCallback, useEffect, useState } from 'react'

import { Player } from '@/components/music/player'
import { Musics } from '@/components/music/musics'
import { MusicCardPlaying } from '@/components/music/musics/musiccardPlaying'
import { Sidebar } from '@/components/music/sidebar'
import { Search } from '@/components/music/search'

interface Music {
  id: number
  image: string
  title: string
  genre: string
  author: string
  album: string
  year: string
  url: string
}

const MemoizedMusics = React.memo(Musics)

export default function MusicPlayer(): JSX.Element {
  const [id, setId] = useState<number>(0)
  const [isFull, setIsFull] = useState<boolean>(false)
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [genre, setGenre] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const [windowWidth, setWindowWidth] = useState<number>(
    typeof window !== 'undefined' ? window.innerWidth : 0
  )

  const [musics, setMusics] = useState<Music[]>([])
  const [totalMusicFiles, setTotalMusicFiles] = useState<number>(0)
  const [isLoading, setIsLoading] = useState(true)

  const handleSearchChange = useCallback((e: any) => {
    setSearch(e.target.value)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth)
      window.addEventListener('resize', handleResize)
    }

    return (): void => window.removeEventListener('resize', handleResize)
  }, [])

  const handleResize = (): void => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    setMusics(musicData.songs)
    setTotalMusicFiles(musicData.totalMP3Files)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div
          className="loader-spin inline-block h-12 w-12 rounded-full border-[3px] border-current border-t-transparent text-blue-400"
          role="status"
          aria-label="loading"
        />
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto mt-10 max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
        <div className="mb-10 flex flex-wrap justify-center">
          {musics &&
            musics.map((music) => (
              <MusicCardPlaying
                key={music.id}
                id={id}
                musicId={music.id}
                img={music.image}
                title={music.title}
                author={music.author}
                genre={music.genre}
                album={music.album}
                year={music.year}
                audio={music.url}
              />
            ))}
        </div>
        <div>
          <Search isSearch={isSearch} handleSearchChange={handleSearchChange} />
        </div>
        <div className="mb-20 mt-10 flex flex-wrap justify-center">
          {musics &&
            musics.map((music) => (
              <MemoizedMusics
                key={music.id}
                img={music.image}
                title={music.title}
                author={music.author}
                audio={music.url}
                genre={music.genre}
                setId={setId}
                musicId={music.id}
                id={id}
                isFull={isFull}
                genres={genre}
                isSearch={isSearch}
                search={search}
                windowWidth={windowWidth}
              />
            ))}
        </div>
      </div>
      <Sidebar
        setGenre={setGenre}
        setIsSearch={setIsSearch}
        setIsFull={setIsFull}
        musics={musics}
      />
      <Player
        musicData={musics}
        id={id}
        setId={setId}
        isFull={isFull}
        windowWidth={windowWidth}
        totalMusicFiles={totalMusicFiles}
      />
    </>
  )
}
