import fs from 'fs'
import { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'
import path from 'path'

interface GetImages {
  src: string
}

async function getImages(
  folder: string,
  extensions: string[] = ['gif', 'png']
): Promise<GetImages[]> {
  const images: GetImages[] = []
  const folderPath = path.join(process.cwd(), 'public', 'Images', 'Pixelart', folder)

  const files = await fs.promises.readdir(folderPath)

  for (const file of files) {
    for (const extension of extensions) {
      const filePath = path.join(folderPath, file)
      const stat = await fs.promises.stat(filePath)

      if (file.endsWith(`.${extension}`) && stat.isFile()) {
        const src = await fs.promises.readFile(filePath, 'base64')
        images.push({
          src,
        })
      }
    }
  }
  return images
}

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req
  const folder = query.folder ?? ''
  const folderValue = folder[0] ?? ''
  if (!folderValue) throw new Error('Missing folder query parameter')

  const images = await getImages(folderValue)
  const relativeImages = images.map((img) => ({
    src: `/${path.relative(path.join(process.cwd(), 'public'), img.src)}`.replace(/\\/g, '/'),
  }))

  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  res.statusCode = 200
  return NextResponse.json(relativeImages)
}
