import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Home from './pages/Home'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  CarToon,
  CountryFilm,
  DetailFilm,
  FilmCategory,
  FilmSeries,
  FilterFilmPage,
  TVShows,
  WatchFilm,
} from './pages/index'
import { SkeletonTheme } from 'react-loading-skeleton'
import './index.css'
import { path } from './utils/path'
import { ToastContainer } from 'react-toastify'
import Movie from './pages/Movie'

// Create a client
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: `${path.HOME}`,
        element: <Home />,
      },
      {
        path: `${path.PHIM_BO}`,
        element: <FilmSeries />,
      },
      {
        path: `${path.PHIM_LE}`,
        element: <Movie />,
      },
      {
        path: `${path.TV_SHOWS}`,
        element: <TVShows />,
      },
      {
        path: `${path.CAR_TOON}`,
        element: <CarToon />,
      },
      {
        path: `${path.THE_LOAI_PHIM}`,
        element: <FilmCategory />,
      },
      {
        path: `${path.DETAIL_FILM}`,
        element: <DetailFilm />,
      },
      {
        path: `${path.COUNTRY_FILM}`,
        element: <CountryFilm />,
      },
      {
        path: `${path.WATCH_FILM}`,
        element: <WatchFilm />,
      },
      {
        path: `${path.FILTER_FILM}`,
        element: <FilterFilmPage />,
      },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <SkeletonTheme baseColor="#313131" highlightColor="#525252">
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    <ToastContainer
      position="top-right"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="colored"
    />
  </SkeletonTheme>
  // </StrictMode>
)
