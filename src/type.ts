import { z, ZodType } from 'zod' // Add new import

export interface CategoryAndCountry {
  _id: string
  name: string
  path?: string
  slug: string
}

export type Categories = {
  items: CategoryAndCountry[]
}

export type Breadcrumb = {
  name: string
  slug?: string
  isCurrent: boolean
  position: number
}[]

export type Episodes = {
  name: string
  slug: string
  link_m3u8: string
  link_embed: string
  filename: string
}

export type voteFilm = {
  id: string
  season: string
  type: string
  vote_average: number
  vote_count: number
}
export interface HomeListFilm {
  category: CategoryAndCountry[]
  content: string
  country: CategoryAndCountry[]
  actor: string[]
  director: string[]
  episode_current: string
  episode_total: string
  episodes: {
    server_name: string
    server_data: Episodes[]
  }[]
  lang: string
  name: string
  origin_name: string
  poster_url: string
  quality: string
  sub_docquyen: boolean
  thumb_url: string
  time: string
  slug: string
  trailer_url: string
  view?: string
  year: string
  _id: string
  tmdb: voteFilm[]
  type: string
}

export type ParamsTypes = {
  itemsUpdateInDay:number,
  pagination: {
    currentPage: number,
    pageRanges: number,
    totalItems: number,
    totalItemsPerPage: number
  }
}

export type SEOOnPage = {
  descriptionHead: string,
  og_image: string[],
  og_type: string,
  titleHead: string,
}

export type ListDataTypes = {
  APP_DOMAIN_CDN_IMAGE: string,
  APP_DOMAIN_FRONTEND: string,
  breadCrumb: Breadcrumb,
  items: HomeListFilm[],
  params: ParamsTypes,
  seoOnPage: SEOOnPage,
  titlePage: string
  type_list: string
}

export type DetailFilmType = {
  breadCrumb: Breadcrumb,
  item: HomeListFilm,
}
export type FormData = {
  email: string
  password: string
  confirmPassword?: string
}

export const UserSchema: ZodType<FormData> = z.object({
  email: z.string().min(6, { message: 'Username is too short' }).max(30, { message: 'Username is too long' }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/),
})
