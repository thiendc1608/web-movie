import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, SubmitHandler } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormData, UserSchema } from '@/type'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { toast } from 'react-toastify'
import { useShowModal } from '@/stores/useShowModal'
import { UserStore, useUserStore } from '@/stores/useUserStore'

interface UseShowModalReturn {
  setIsShowModal: (isShowModal: boolean, contentModal: React.ReactNode) => void
}

const FormLogin = () => {
  const { setIsShowModal } = useShowModal() as UseShowModalReturn
  const { setUser, setIsLogin, setToken } = useUserStore() as UserStore
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(UserSchema), // Apply the zodResolver
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const auth = getAuth()
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential)
        const user = userCredential.user
        console.log(user)

        if (user.email) {
          toast.success('Login successfully')
          setIsShowModal(false, null)
          setIsLogin(true)
          setUser(user.email.split('@')[0])
          setToken(user?.accessToken)
        }

        // ...
      })
      .catch((error) => {
        if (error.code == 'auth/invalid-credential') {
          toast.error('invalid-credential. Please check your email or password')
        }
      })
      .finally(() => {
        reset({
          email: '',
          password: '',
        })
      })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-2/3 flex flex-col gap-4">
      {/* register your input into the hook by invoking the "register" function */}
      <div className="flex flex-col gap-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="Email"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          {...register('email', { required: true })}
        />
        {errors?.email?.ref?.value === '' ? (
          <span className="text-sm text-[#f87171]">This field is required</span>
        ) : (
          <span className="text-sm text-[#f87171]">{errors.email?.message}</span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          value={watch('password')}
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          placeholder="Password"
          {...register('password', { required: true })}
        />
        {errors?.password?.ref?.value === '' ? (
          <span className="text-sm text-[#f87171]">This field is required</span>
        ) : (
          <span className="text-sm text-[#f87171]">{errors.password?.message}</span>
        )}
      </div>

      <div>
        <span className="cursor-pointer hover:text-yellow-500 select-none font-bold text-[13px] px-[6px] py-[8px]">
          Forget password?
        </span>
      </div>
      <Button type="submit" className="w-full bg-[#2563eb] hover:bg-[#2563eb]/50">
        Login
      </Button>
    </form>
  )
}

export default FormLogin
