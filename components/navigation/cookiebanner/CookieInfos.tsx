import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'

interface CookieInfosProps {
  t: (key: string) => string
  hideCookiesInfo: () => void
}

export const CookieInfos: React.FC<CookieInfosProps> = ({ t, hideCookiesInfo }) => {
  return (
    <div className="fixed left-0 top-0 z-[50] h-full w-full bg-black bg-opacity-50">
      <div className="fixed bottom-0 left-0 right-0 z-[99999] bg-black sm:p-4">
        <div className="flex flex-col p-4">
          <p className="mb-2 ml-4 mt-5 text-sm font-bold uppercase text-blue-400 underline">
            {t('common:cookiepolicy')}:
          </p>
          <p className="ml-4 text-sm">{t('common:cookietext1')}</p>
          <p className="ml-4 text-sm">{t('common:cookietext2')}</p>
          <Accordion allowZeroExpanded>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton className="mb-1 ml-4">
                  <p className="text-sm font-bold text-blue-300 underline">
                    {t('common:cookietext3')}
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="text-sm">{t('common:cookietext3sub')}</p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton className="mb-1 ml-4">
                  <p className="text-sm font-bold text-blue-300 underline">
                    {t('common:cookietext4')}
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="text-sm">{t('common:cookietext4sub')}</p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton className="mb-1 ml-4">
                  <p className="text-sm font-bold text-blue-300 underline">
                    {t('common:cookietext5')}
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="text-sm">{t('common:cookietext5sub')}</p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton className="ml-4">
                  <p className="text-sm font-bold text-blue-300 underline">
                    {' '}
                    {t('common:cookietext6')}
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="text-sm">{t('common:cookietext7')}</p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton className="ml-4">
                  <p className="text-sm font-bold text-blue-300 underline">
                    {t('common:cookietext8')}
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="text-sm">{t('common:cookietext9')}</p>
              </AccordionItemPanel>
            </AccordionItem>
            <AccordionItem>
              <AccordionItemHeading>
                <AccordionItemButton className="ml-4">
                  <p className="text-sm font-bold text-blue-300 underline">
                    {t('common:cookietext10')}
                  </p>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <p className="text-sm">{t('common:cookietext11')}</p>
              </AccordionItemPanel>
            </AccordionItem>
          </Accordion>
          <button
            className="mb-10 mt-10 rounded-md bg-white p-2 text-lg font-bold text-black hover:bg-blue-300 hover:text-white"
            onClick={hideCookiesInfo}
          >
            {t('common:iunderstand')}
          </button>
        </div>
      </div>
    </div>
  )
}
