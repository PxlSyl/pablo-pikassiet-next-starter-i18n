/* eslint-disable jsx-a11y/alt-text */
'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const ImageFallback = (props: any) => {
  const { src, fallback, ...rest } = props
  const [imgSrc, setImgSrc] = useState(src)

  useEffect(() => {
    setImgSrc(src)
  }, [src])

  return (
    <Image
      {...rest}
      src={imgSrc}
      onError={() => {
        setImgSrc(fallback)
      }}
    />
  )
}

export default ImageFallback
