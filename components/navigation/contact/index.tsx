'use client'

import 'react-toastify/dist/ReactToastify.css'
import { useState, useEffect } from 'react'
import { useForm, ValidationError } from '@formspree/react'
import { useContactModal } from './store'

import { ToastContainer, toast } from 'react-toastify'
import { CModal } from './CModal'

import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

export const ContactModal = (): JSX.Element => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'contact')
  const contactModal = useContactModal()
  const [state, handleSubmit, reset] = useForm('xdojkndq')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (state.succeeded && !state.submitting) {
      toast.success<unknown>(t('thanks'), {
        position: 'bottom-right',
      })
      setTimeout(() => {
        setName('')
        setEmail('')
        setMessage('')
        reset()
      }, 2000)
    }
    if (state.errors && Object.keys(state.errors).length > 0) {
      toast.error<unknown>(t('error'))
    }
  }, [state, reset, t])

  const handleNameChange = (e: any): void => {
    setName(e.target.value)
  }

  const handleEmailChange = (e: any): void => {
    setEmail(e.target.value)
  }

  const handleMessageChange = (e: any): void => {
    setMessage(e.target.value)
  }

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit} autoComplete="on">
        <input
          required
          autoComplete="name"
          id="fullName"
          type="text"
          name="fullName"
          placeholder={t('name')}
          value={name}
          onChange={handleNameChange}
          className="bg-gradient mb-2 w-full rounded-md p-2 text-black outline-none transition focus:ring-highlighted disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:text-white  dark:focus:ring-darkmode-highlighted"
        />
        <input
          required
          autoComplete="email"
          id="email"
          type="email"
          name="email"
          placeholder={t('mail')}
          value={email}
          onChange={handleEmailChange}
          className="bg-gradient mb-2 w-full rounded-md p-2 text-base text-black outline-none transition focus:ring-highlighted disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:text-white dark:focus:ring-darkmode-highlighted"
        />
        <ValidationError prefix="Email" field="email" errors={state.errors} />
        <textarea
          required
          id="message"
          name="message"
          placeholder={t('message')}
          value={message}
          onChange={handleMessageChange}
          className="bg-gradient mb-2 w-full rounded-md p-2 text-base text-black outline-none transition focus:ring-highlighted disabled:cursor-not-allowed disabled:bg-neutral-900 disabled:opacity-70 dark:border-white dark:text-white dark:focus:ring-darkmode-highlighted"
        />
        <ValidationError prefix="Message" field="message" errors={state.errors} />
        <button
          type="submit"
          disabled={state.submitting || !name || !email || !message}
          data-te-ripple-init
          data-te-ripple-color="light"
          className="text-md w-full rounded-full border-2 bg-highlighted px-4 py-2 font-semibold text-white transition hover:opacity-80 dark:bg-darkmode-highlighted"
        >
          {t('button')}
        </button>
      </form>
    </div>
  )

  return (
    <>
      <CModal
        title={t('title')}
        arialabel={t('title')}
        isOpen={contactModal.isOpen}
        onClose={contactModal.onClose}
        body={bodyContent}
      />
      <ToastContainer autoClose={2000} />
    </>
  )
}
