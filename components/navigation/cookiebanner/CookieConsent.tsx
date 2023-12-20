interface CookieConsentProps {
  t: (key: string) => string
  handleCookiesInfo: () => void
  handleCheckboxChange: () => void
  handleDecline: () => void
  handleAccept: () => void
  isChecked: boolean
}

export const CookieConsent: React.FC<CookieConsentProps> = ({
  t,
  handleCookiesInfo,
  handleCheckboxChange,
  handleDecline,
  handleAccept,
  isChecked,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleCookiesInfo()
    }
  }

  return (
    <div className="fixed left-0 top-0 z-[50] h-full w-full bg-black bg-opacity-50">
      <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-black sm:p-4">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div>
            <div className="m-2 flex flex-col p-2 lg:flex-row">
              <p className="font-bold text-blue-400">{t('common:cookietitle')}</p>
              <div
                className="ml-2 cursor-pointer text-blue-300 underline hover:text-blue-400 hover:underline"
                onClick={handleCookiesInfo}
                onKeyDown={handleKeyDown}
                role="button"
                tabIndex={0}
              >
                {t('common:cookiemore')}
              </div>
            </div>
            <div className="m-2 flex flex-col p-2 lg:flex-row">
              <div className="ml-2">
                <input
                  type="checkbox"
                  name="essentialscookies"
                  id="essentialscookies"
                  value="1"
                  checked={true}
                  readOnly
                />
                <label htmlFor="essentialscookies" className="ml-2">
                  {t('common:decline')}
                </label>
              </div>
              <div className="ml-2">
                <input
                  type="checkbox"
                  name="othercookies"
                  id="othercookies"
                  value="1"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="othercookies" className="ml-2">
                  {t('common:othercookies')}
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <button
              className="rounded-md bg-red-300 p-5 text-black hover:bg-red-400 hover:text-white"
              onClick={handleDecline}
            >
              {t('common:decline')}
            </button>
            <div className="spacersmall" />
            <button
              className="hover-bg-blue-400 rounded-md bg-blue-300 p-5 text-base text-black hover:text-white"
              onClick={handleAccept}
            >
              {t('common:accept')}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
