import { create } from 'zustand'

interface CookieConsentStore {
  isChecked: boolean
  showCookieConsent: boolean
  showCookieInfo: boolean
  handleCookiesInfo: () => void
  hideCookiesInfo: () => void
  handleAccept: () => void
  handleDecline: () => void
  cookiesAccepted: boolean
  init: () => void
  handleCheckboxChange: () => void
}

export const useCookieConsentStore = create<CookieConsentStore>((set) => {
  return {
    showCookieConsent: false,
    showCookieInfo: false,
    cookiesAccepted: false,
    isChecked: false,
    handleCookiesInfo: () => {
      set(() => ({ showCookieConsent: false, showCookieInfo: true }))
    },
    hideCookiesInfo: () => {
      set(() => ({ showCookieInfo: false, showCookieConsent: true }))
    },
    handleAccept: () => {
      localStorage.setItem('cookieConsent', 'true')
      set(() => ({ cookiesAccepted: true, showCookieConsent: false }))
    },
    handleDecline: () => {
      localStorage.setItem('cookieConsent', 'false')
      set(() => ({ cookiesAccepted: false, showCookieConsent: false }))
    },
    init: () => {
      const cookiesAcceptedValue = localStorage.getItem('cookieConsent')
      if (cookiesAcceptedValue === null) {
        set(() => ({ cookiesAccepted: false, showCookieConsent: true }))
      } else {
        set(() => ({ cookiesAccepted: cookiesAcceptedValue === 'true', showCookieConsent: false }))
      }
    },
    handleCheckboxChange: () => {
      set((state) => ({ isChecked: !state.isChecked }))
    },
  }
})
