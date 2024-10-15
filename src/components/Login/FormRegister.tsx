import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { FormData, UserSchema } from '@/type'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase'
import { toast } from 'react-toastify'
import { useSelectTab } from '@/stores/useShowModal'
import { ref, set } from 'firebase/database'

const FormRegister = () => {
  const { setSelectTab } = useSelectTab()
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
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user
        if (user.email) {
          toast.success('User is created successfully')
          setSelectTab('Login')
          set(ref(db, 'users/' + user.uid), {
            email: user?.email,
          })
        }

        // ...
      })
      .catch((error) => {
        if (error.code == 'auth/email-already-in-use') {
          toast.error('The email address is already in use')
        } else if (error.code == 'auth/invalid-email') {
          toast.error('The email address is not valid.')
        } else if (error.code == 'auth/operation-not-allowed') {
          toast.error('Operation not allowed.')
        } else if (error.code == 'auth/weak-password') {
          toast.error('The password is too weak.')
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
        <label htmlFor="email">Username</label>
        <input
          id="username"
          placeholder="Email"
          value={watch('email')}
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
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
          placeholder="Password"
          {...register('password')}
        />
        {errors?.password?.ref?.value === '' ? (
          <span className="text-sm text-[#f87171]">This field is required</span>
        ) : (
          <span className="text-sm text-[#f87171]">{errors.password?.message}</span>
        )}
      </div>
      <Button type="submit" className="w-full bg-[#2563eb] hover:bg-[#2563eb]/50">
        Register
      </Button>
    </form>
  )
}

export default FormRegister
