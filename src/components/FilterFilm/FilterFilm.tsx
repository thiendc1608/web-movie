import SlideFilm from '@/components/Home/SlideFilm/SlideFilm'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ListFilm, ListYear, MoviePostTime } from '@/utils/constants'
import { Categories, CategoryAndCountry, ListDataTypes } from '@/type'
import { useAllDataGetApi } from '@/stores/useAllDataGetApi'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { _formatString } from '@/utils/utils'
import { useFilterStatus } from '@/stores/useFilterStatus'

const FormSchema = z.object({
  sort_field: z.string({
    required_error: 'Please select an time.',
  }),
  listFilm: z.string({
    required_error: 'Please select an list film.',
  }),
  category: z.string({
    required_error: 'Please select an category film.',
  }),
  country: z.string({
    required_error: 'Please select an country.',
  }),
  year: z.string({
    required_error: 'Please select an year post film.',
  }),
})

interface FilterFilmProps {
  data: ListDataTypes
  isNotShowSeeAll: boolean
  isLoading: boolean
}

const FilterFilm = ({ data, isNotShowSeeAll, isLoading }: FilterFilmProps) => {
  const navigate = useNavigate()

  const { isCheckFilter, setIsCheckFilter, setTimePost, setListMovie, setListCategory, setListCountry, setListYear } =
    useFilterStatus()
  const { dataCategory, dataCountry } = useAllDataGetApi()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(dataSubmit: z.infer<typeof FormSchema>) {
    setTimePost(dataSubmit.sort_field)
    setListMovie(dataSubmit.listFilm)
    setListCategory(dataSubmit.category)
    setListCountry(dataSubmit.country)
    setListYear(dataSubmit.year)

    let arr = Object.entries(dataSubmit)
    arr.map((el) => (el[1] === 'Chọn tất cả' ? (el[1] = '') : el[1]))
    const arrData = arr[0]

    arr = arr.filter((item) => item[0] !== 'sort_field').map((el) => [el[0], _formatString(el[1])])
    arr.unshift(arrData)

    const newArr = arr.filter((item) => item[0] !== 'listFilm')

    const objData = Object.fromEntries(newArr)

    navigate({
      pathname: `/sort/${_formatString(dataSubmit.listFilm)}`,
      search: createSearchParams(objData).toString(),
    })
  }

  return (
    <>
      <div className="bg-[#fef5c4] border-[1px] border-[#fadf98] p-[5px] overflow-hidden text-center text-[10px] md:text-[11px] lg:text-[13px] leading-[1.6] rounded-t-sm">
        <strong>– CHÚ Ý: NẾU KHÔNG TẢI ĐƯỢC NỘI DUNG,HÃY BẤM F5 HOẶC BẤM TẢI LẠI TRANG 1 HOẶC 2 LẦN BẠN NHÉ .</strong>
      </div>
      {isNotShowSeeAll && <SlideFilm data={data} isLoading={isLoading} />}
      <div className="flex justify-end items-center mt-3 mb-3 font-bold gap-3">
        <Label
          htmlFor="filter-film"
          className="text-[16px] underline cursor-pointer hover:text-yellow-400 text-[#9a5b13]"
        >
          Lọc phim
        </Label>
        <Switch id="filter-film" checked={isCheckFilter} onClick={() => setIsCheckFilter(!isCheckFilter)} />
      </div>
      {isCheckFilter && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-2 min-[375px]:grid-cols-2 min-[540px]:grid-cols-3 md:grid-cols-5 md:grid-rows-2 min-[900px]:grid-cols-6 min-[900px]:grid-rows-1">
              <FormField
                control={form.control}
                name="sort_field"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="w-[200px] h-[36px] bg-[#555E68] text-white border-none">
                            <SelectValue placeholder={'Chọn thời gian'} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-[#555E68] text-white border-none">
                          {MoviePostTime?.map((item, idx) => (
                            <SelectItem key={idx} value={item.filterAttribute}>
                              {item.time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="listFilm"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[200px] h-[36px] bg-[#555E68] text-white border-none">
                          <SelectValue placeholder={'Chọn danh sách'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#555E68] text-white border-none">
                        {ListFilm?.map((item, idx) => (
                          <SelectItem key={idx} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[200px] h-[36px] bg-[#555E68] text-white border-none">
                          <SelectValue placeholder={'Chọn thể loại'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#555E68] text-white border-none">
                        <SelectItem value="Chọn tất cả">Chọn tất cả</SelectItem>
                        {dataCategory.items?.map((item: CategoryAndCountry, idx: number) => (
                          <SelectItem key={idx} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[200px] h-[36px] bg-[#555E68] text-white border-none">
                          <SelectValue placeholder={'Chọn quốc gia'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#555E68] text-white border-none">
                        <SelectItem value="Chọn tất cả">Chọn tất cả</SelectItem>
                        {dataCountry?.items?.map((item: CategoryAndCountry, idx: number) => (
                          <SelectItem key={idx} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[200px] h-[36px] bg-[#555E68] text-white border-none">
                          <SelectValue placeholder={'Tất cả năm'} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-[#555E68] text-white border-none">
                        {ListYear.reverse().map((item, idx) => (
                          <SelectItem key={idx} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="h-[36px] bg-blue-600 hover:opacity-80" type="submit">
                Lọc phim
              </Button>
            </div>
          </form>
        </Form>
      )}
    </>
  )
}

export default FilterFilm
