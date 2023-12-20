import { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useCookieConsentStore } from './hook/useCookieConsentStore'
import { CookieConsent } from './CookieConsent'
import { CookieInfos } from './CookieInfos'

export const CookieBanner: React.FC = () => {
  const { t } = useTranslation()
  const {
    showCookieConsent,
    showCookieInfo,
    handleCookiesInfo,
    hideCookiesInfo,
    handleAccept,
    handleDecline,
    cookiesAccepted,
    init,
    handleCheckboxChange,
    isChecked,
  } = useCookieConsentStore()

  useEffect(() => {
    init()
  }, [init])

  return (
    <>
      {showCookieConsent && !cookiesAccepted && (
        <CookieConsent
          t={t}
          handleCookiesInfo={handleCookiesInfo}
          handleCheckboxChange={handleCheckboxChange}
          handleDecline={handleDecline}
          handleAccept={handleAccept}
          isChecked={isChecked}
        />
      )}
      {showCookieInfo && <CookieInfos t={t} hideCookiesInfo={hideCookiesInfo} />}
    </>
  )
}
