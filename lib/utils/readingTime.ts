// content reading
const readingTime = (content: string): string => {
  const WPS = 275 / 60

  let images = 0
  const regex = /\w/

  const words = content.split(' ').filter((word) => {
    if (word.includes('<img')) {
      images += 1
    }
    return regex.test(word)
  }).length

  const imageAdjust = images * 4
  let imageSecs = 0
  let imageFactor = 12

  while (images) {
    imageSecs += imageFactor
    if (imageFactor > 3) {
      imageFactor -= 1
    }
    images -= 1
  }

  const minutes = Math.ceil(((words - imageAdjust) / WPS + imageSecs) / 60)

  if (minutes < 2) {
    return minutes + ` Minute`
  } else {
    return minutes + ` Minutes`
  }
}

export default readingTime
