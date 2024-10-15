import { House, CirclePlay, Video, Clapperboard, Shell, Grid2X2, Globe } from 'lucide-react'

export const navLink = [
  {
    id: 1,
    name: 'TRANG CHỦ',
    path: '/',
    Icon: House,
  },
  {
    id: 2,
    name: 'PHIM BỘ',
    path: '/phim-bo',
    Icon: CirclePlay,
  },
  {
    id: 3,
    name: 'PHIM LẺ',
    path: '/phim-le',
    Icon: Video,
  },
  {
    id: 4,
    name: 'TV SHOWS',
    path: '/tv-shows',
    Icon: Clapperboard,
  },
  {
    id: 5,
    name: 'HOẠT HÌNH',
    path: '/hoat-hinh',
    Icon: Shell,
  },
  {
    id: 6,
    name: 'THỂ LOẠI',
    path: '/the-loai/hanh-dong',
    Icon: Grid2X2,
  },
  {
    id: 7,
    name: 'QUỐC GIA',
    path: '/quoc-gia/trung-quoc',
    Icon: Globe,
  },
]

export const MoviePostTime = [
  {
    id: 1,
    time: "Thời gian đăng",
    filterAttribute: "_id",
  },
  {
    id: 2,
    time: "Năm sản xuất",
    filterAttribute:"year"
  },
  {
    id: 3,
    time: "Thời gian câp nhật",
    filterAttribute:"modified.time"
  },
]

export const ListFilm = [
  {
    id: 1,
    name: 'Phim Lẻ'
  },
  {
    id: 2,
    name: 'Phim Bộ'
  },
  {
    id: 3,
    name: 'Phim Mới'
  },
  {
    id: 4,
    name: 'TV Shows'
  },
  {
    id: 5,
    name: 'Hoạt Hình'
  },
  {
    id: 6,
    name: 'Phim Vietsub'
  },
  {
    id: 7,
    name: 'Phim Thuyết Minh'
  },
  {
    id: 8,
    name: 'Phim Lồng Tiếng'
  },
  {
    id: 9,
    name: 'Phim Bộ Đang Chiếu'
  },
  {
    id: 10,
    name: 'Phim Trọn Bộ'
  },
  {
    id: 11,
    name: 'Phim Sắp Chiếu'
  },
  {
    id: 12,
    name: 'Subteam'
  },
]

export const ListYear = [
  {
    id: 18,
    name: '2010'
  },
  {
    id: 17,
    name: '2011'
  },
  {
    id: 16,
    name: '2012'
  },
  {
    id: 15,
    name: '2013'
  },
  {
    id: 14,
    name: '2014'
  },
  {
    id: 13,
    name: '2015'
  },
  {
    id: 12,
    name: '2016'
  },
  {
    id: 11,
    name: '2017'
  },
  {
    id: 10,
    name: '2018'
  },
  {
    id: 9,
    name: '2019'
  },
  {
    id: 8,
    name: '2020'
  },
  {
    id: 7,
    name: '2021'
  },
  {
    id: 6,
    name: '2022'
  },
  {
    id: 5,
    name: '2023'
  },
  {
    id: 4,
    name: '2024'
  },
  {
    id: 3,
    name: '2025'
  },
  {
    id: 2,
    name: '2026'
  },
  {
    id: 1,
    name: 'Chọn tất cả'
  },
]