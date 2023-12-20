// node ./scripts/musicData.mjs
import fs from 'fs/promises'
import path from 'path'
import mm from 'music-metadata'

async function extractMetadata(filePath) {
  const metadata = await mm.parseFile(filePath)
  const common = {
    title: metadata.common.title || path.basename(filePath, path.extname(filePath)),
    author: metadata.common.artist || '',
    genre: metadata.common.genre ? metadata.common.genre.join(', ') : '',
    album: metadata.common.album || '',
    year: metadata.common.year || '',
    image: metadata.common.picture ? metadata.common.picture[0].data : null,
    url: '',
  }

  return common
}

async function saveImage(song, coverBuffer) {
  if (!coverBuffer) {
    return '/defaultcover/cover.jpg'
  }

  const imageFileName = `song_${song.title}.jpg`
  const imagePath = path.join(process.cwd(), 'public', 'songs_images', imageFileName)
  await fs.writeFile(imagePath, coverBuffer)
  return `/songs_images/${imageFileName}`
}

;(async () => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      const songsPath = path.join(process.cwd(), 'public', 'songs')
      const files = await fs.readdir(songsPath)
      files.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))

      const songsPromises = files.map(async (file, index) => {
        const filePath = path.join(songsPath, file)
        const songData = await extractMetadata(filePath)

        const image = await saveImage(songData, songData.image)

        const songId = index + 1

        return {
          id: songId,
          title: songData.title,
          genre: songData.genre,
          author: songData.author,
          album: songData.album,
          year: songData.year,
          url: `/songs/${file}`,
          image,
        }
      })

      const songs = await Promise.all(songsPromises)
      const totalMP3Files = files.length

      const result = { songs, totalMP3Files }
      await fs.writeFile('./src/config/data/music-data.json', JSON.stringify(result, null, 2))

      console.log(`Results for music-data.json written.`)
    }
  } catch (error) {
    console.error('Error:', error)
  }
})()
