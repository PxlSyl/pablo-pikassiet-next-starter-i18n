import React from 'react'
import Link from 'next/link'
import { LocaleTypes } from '@/app/[locale]/i18n/settings'

const Pagination = ({
  section,
  currentPage,
  totalPages,
  params: { locale },
}: {
  section: string
  currentPage: number
  totalPages: number
  params: { locale: LocaleTypes }
}) => {
  const hasPrevPage = currentPage > 1
  const hasNextPage = totalPages > currentPage

  const pageList = []
  if (hasPrevPage) {
    pageList.push(currentPage - 1)
  }
  pageList.push(currentPage)
  if (hasNextPage) {
    pageList.push(currentPage + 1)
  }

  return (
    <>
      {totalPages > 1 && (
        <nav className="flex items-center justify-center space-x-3" aria-label="Pagination">
          {/* previous */}
          {hasPrevPage ? (
            <Link
              href={
                currentPage === 2
                  ? `/${locale}${section ? '/' + section : '/'}`
                  : `/${locale}${section ? '/' + section : ''}/page/${currentPage - 1}`
              }
              className="rounded px-2 py-1.5 text-dark hover:bg-theme-light dark:text-darkmode-dark dark:hover:bg-darkmode-theme-light"
            >
              <span className="sr-only">Previous</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="30"
                width="30"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <span className="rounded px-2 py-1.5 text-light">
              <span className="sr-only">Previous</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="30"
                width="30"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}

          {/* page index */}
          {pageList.map((pagination, i) => (
            <React.Fragment key={`page-${i}`}>
              {pagination === currentPage ? (
                <span
                  aria-current="page"
                  className="rounded bg-highlighted px-4 py-2 text-white dark:bg-darkmode-highlighted"
                >
                  {pagination}
                </span>
              ) : (
                <Link
                  href={
                    i === 0
                      ? `/${locale}${section ? '/' + section : '/'}`
                      : `/${locale}${section ? '/' + section : ''}/page/${pagination}`
                  }
                  passHref
                  aria-current="page"
                  className="rounded px-4 py-2 text-dark hover:bg-theme-light dark:text-darkmode-dark dark:hover:bg-darkmode-theme-light"
                >
                  {pagination}
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* next page */}
          {hasNextPage ? (
            <Link
              href={`/${locale}${section ? '/' + section : ''}/page/${currentPage + 1}`}
              className="rounded px-2 py-1.5 text-dark hover:bg-theme-light dark:text-darkmode-dark dark:hover:bg-darkmode-theme-light"
            >
              <span className="sr-only">Next</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="30"
                width="30"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          ) : (
            <span className="rounded px-2 py-1.5 text-light">
              <span className="sr-only">Next</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                height="30"
                width="30"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          )}
        </nav>
      )}
    </>
  )
}

export default Pagination
