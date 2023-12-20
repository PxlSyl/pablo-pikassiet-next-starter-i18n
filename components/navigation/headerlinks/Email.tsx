'use client'
import Image from 'next/image'
import { ContactModal } from '../contact'
import { useContactModal } from '../contact/store'

export const Email = (): JSX.Element => {
  const contactModal = useContactModal()

  const handleContactClick = (): void => {
    contactModal.onOpen()
  }

  return (
    <>
      <Image
        className="cursor-pointer transition duration-500 hover:scale-110"
        src="/Logos/Email.svg"
        alt="email"
        height={32}
        width={32}
        onClick={handleContactClick}
      />
      <ContactModal />
    </>
  )
}
