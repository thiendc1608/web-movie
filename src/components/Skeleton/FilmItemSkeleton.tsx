import React from 'react'
import './Skeleton.css'
import Skeleton from 'react-loading-skeleton'

interface FilmItemSkeletonProps {
  cards: number
}
const FilmItemSkeleton = ({ cards }: FilmItemSkeletonProps) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <Skeleton height={270.83} width={198.33} containerClassName="flex-1" />
        </div>
        <div>
          <Skeleton height={47} width={198.33} containerClassName="flex-1" />
        </div>
      </div>
    ))
}

export default FilmItemSkeleton
