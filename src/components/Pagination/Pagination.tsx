import { usePagination } from '@/hooks/usePagination'
import { cn } from '@/lib/utils'
import React from 'react'
import { ChevronLeft, Ellipsis, ChevronRight, ChevronsRight, ChevronsLeft } from 'lucide-react'
interface PaginationProps {
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  setPageCurrent: React.Dispatch<React.SetStateAction<number>>
}

const Pagination = ({ totalCount, siblingCount = 1, currentPage, pageSize, setPageCurrent }: PaginationProps) => {
  const DOTS = '...'
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) as (string | number)[]

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null
  }

  const lastPage = paginationRange[paginationRange?.length - 1]

  return (
    <ul className="absolute bottom-0 bg-black/75 z-10 flex text-white cursor-pointer right-[50%]">
      <li
        onClick={() => setPageCurrent(1)}
        className={cn(
          'w-[32px] h-[32px] flex items-center justify-center mx-[3px]',
          currentPage === 1 ? 'opacity-30 pointer-events-none cursor-default' : ''
        )}
      >
        <ChevronsLeft />
      </li>
      <li
        onClick={() => setPageCurrent(currentPage - 1)}
        className={cn(
          'w-[32px] h-[32px] flex items-center justify-center mx-[3px]',
          currentPage === 1 ? 'opacity-30 pointer-events-none cursor-default' : ''
        )}
      >
        <ChevronLeft />
      </li>
      {paginationRange.map((pageNumber, idx) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (typeof pageNumber === 'string' && pageNumber === DOTS) {
          return (
            <li key={idx} className="w-[32px] h-[32px] flex items-end justify-center cursor-default mx-[3px]">
              <Ellipsis />
            </li>
          )
        }
        return (
          <li
            key={idx}
            className={cn(
              'w-[32px] h-[32px] flex items-center justify-center rounded-md mx-[3px]',
              pageNumber === currentPage && 'bg-[#9c27b0]'
            )}
            onClick={() => setPageCurrent(pageNumber as number)}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        onClick={() => setPageCurrent(currentPage + 1)}
        className={cn(
          'w-[32px] h-[32px] flex items-center justify-center mx-[3px]',
          currentPage === lastPage ? 'opacity-30 pointer-events-none cursor-default' : ''
        )}
      >
        <ChevronRight />
      </li>
      <li
        onClick={() => setPageCurrent(currentPage + 1)}
        className={cn(
          'w-[32px] h-[32px] flex items-center justify-center mx-[3px]',
          currentPage === lastPage ? 'opacity-30 pointer-events-none cursor-default' : ''
        )}
      >
        <ChevronsRight />
      </li>
    </ul>
  )
}

export default Pagination
