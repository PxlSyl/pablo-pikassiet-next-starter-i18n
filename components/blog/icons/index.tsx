'use client'

import { useDarkMode } from '@/hooks/useDarkmode'

export const User = ({ className }: { className?: string }): JSX.Element => {
  const { theme, mounted } = useDarkMode()
  if (!mounted) return null
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        fill={`${theme === 'light' ? '#000000' : ' #ffffff'}`}
        viewBox="0 0 512 512"
      >
        <path d="M406.5 399.6C387.4 352.9 341.5 320 288 320H224c-53.5 0-99.4 32.9-118.5 79.6C69.9 362.2 48 311.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208c0 55.7-21.9 106.2-57.5 143.6zm-40.1 32.7C334.4 452.4 296.6 464 256 464s-78.4-11.6-110.5-31.7c7.3-36.7 39.7-64.3 78.5-64.3h64c38.8 0 71.2 27.6 78.5 64.3zM256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-272a40 40 0 1 1 0-80 40 40 0 1 1 0 80zm-88-40a88 88 0 1 0 176 0 88 88 0 1 0 -176 0z" />
      </svg>
    </div>
  )
}

export const Folder = ({ className }: { className?: string }): JSX.Element => {
  const { theme, mounted } = useDarkMode()
  if (!mounted) return null
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        fill={`${theme === 'light' ? '#000000' : ' #ffffff'}`}
        viewBox="0 0 576 512"
      >
        <path d="M88.7 223.8L0 375.8V96C0 60.7 28.7 32 64 32H181.5c17 0 33.3 6.7 45.3 18.7l26.5 26.5c12 12 28.3 18.7 45.3 18.7H416c35.3 0 64 28.7 64 64v32H144c-22.8 0-43.8 12.1-55.3 31.8zm27.6 16.1C122.1 230 132.6 224 144 224H544c11.5 0 22 6.1 27.7 16.1s5.7 22.2-.1 32.1l-112 192C453.9 474 443.4 480 432 480H32c-11.5 0-22-6.1-27.7-16.1s-5.7-22.2 .1-32.1l112-192z" />
      </svg>
    </div>
  )
}

export const Tags = ({ className }: { className?: string }): JSX.Element => {
  const { theme, mounted } = useDarkMode()
  if (!mounted) return null
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        fill={`${theme === 'light' ? '#000000' : ' #ffffff'}`}
        viewBox="0 0 512 512"
      >
        <path d="M345 39.1L472.8 168.4c52.4 53 52.4 138.2 0 191.2L360.8 472.9c-9.3 9.4-24.5 9.5-33.9 .2s-9.5-24.5-.2-33.9L438.6 325.9c33.9-34.3 33.9-89.4 0-123.7L310.9 72.9c-9.3-9.4-9.2-24.6 .2-33.9s24.6-9.2 33.9 .2zM0 229.5V80C0 53.5 21.5 32 48 32H197.5c17 0 33.3 6.7 45.3 18.7l168 168c25 25 25 65.5 0 90.5L277.3 442.7c-25 25-65.5 25-90.5 0l-168-168C6.7 262.7 0 246.5 0 229.5zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z" />
      </svg>
    </div>
  )
}

export const Calendar = ({ className }: { className?: string }): JSX.Element => {
  const { theme, mounted } = useDarkMode()
  if (!mounted) return null
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        fill={`${theme === 'light' ? '#000000' : ' #ffffff'}`}
        viewBox="0 0 448 512"
      >
        <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
      </svg>
    </div>
  )
}

export const Clock = ({ className }: { className?: string }): JSX.Element => {
  const { theme, mounted } = useDarkMode()
  if (!mounted) return null
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        fill={`${theme === 'light' ? '#000000' : ' #ffffff'}`}
        viewBox="0 0 512 512"
      >
        <path d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120V256c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2V120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
      </svg>
    </div>
  )
}

export const ArrowLeft = ({ className }: { className?: string }): JSX.Element => {
  const { theme, mounted } = useDarkMode()
  if (!mounted) return null
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        fill={`${theme === 'light' ? '#000000' : ' #ffffff'}`}
        viewBox="0 0 512 512"
      >
        <path d="M48 256a208 208 0 1 1 416 0A208 208 0 1 1 48 256zm464 0A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM217.4 376.9c4.2 4.5 10.1 7.1 16.3 7.1c12.3 0 22.3-10 22.3-22.3V304h96c17.7 0 32-14.3 32-32V240c0-17.7-14.3-32-32-32H256V150.3c0-12.3-10-22.3-22.3-22.3c-6.2 0-12.1 2.6-16.3 7.1L117.5 242.2c-3.5 3.8-5.5 8.7-5.5 13.8s2 10.1 5.5 13.8l99.9 107.1z" />
      </svg>
    </div>
  )
}

export const ArrowRight = ({ className }: { className?: string }): JSX.Element => {
  const { theme, mounted } = useDarkMode()
  if (!mounted) return null
  return (
    <div className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16"
        width="16"
        fill={`${theme === 'light' ? '#000000' : ' #ffffff'}`}
        viewBox="0 0 512 512"
      >
        <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM294.6 135.1c-4.2-4.5-10.1-7.1-16.3-7.1C266 128 256 138 256 150.3V208H160c-17.7 0-32 14.3-32 32v32c0 17.7 14.3 32 32 32h96v57.7c0 12.3 10 22.3 22.3 22.3c6.2 0 12.1-2.6 16.3-7.1l99.9-107.1c3.5-3.8 5.5-8.7 5.5-13.8s-2-10.1-5.5-13.8L294.6 135.1z" />
      </svg>
    </div>
  )
}
