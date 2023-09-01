import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'

function RegisterPage () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { signUp, isAuthenticated, errors: registerErrors } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/login')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signUp(values)
  })

  return (
    <section className='h-[95.7vh] w-full bg-zinc-800 flex flex-col items-center justify-center'>
      <div className='bg-zinc-900 min-w-[500px] flex justify-center items-center flex-col gap-4 mb-32 p-5 rounded-lg'>
        {registerErrors?.map((error, i) => (
          <div key={i} className='bg-red-500 p-2 text-white'>
            {error}
          </div>
        ))}
        <form
          className='flex flex-col gap-5 w-full'
          onSubmit={onSubmit}
        >
          <input
            type='text'
            {...register('username', { required: true })}
            className='w-2/3 h-12 mx-auto bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none'
            placeholder='username'
            autoComplete='user'
          />
          {errors.username && <p className='text-red-500'>Username  is required</p>}

          <input
            type='email'
            {...register('email', { required: true })}
            className='w-2/3 h-12 mx-auto bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none'
            placeholder='email'
            autoComplete='email'
          />
          {errors.email && <p className='text-red-500'>Email  is required</p>}

          <input
            type='password'
            {...register('password', { required: true })}
            className='w-2/3 h-12 mx-auto bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none'
            placeholder='password'
            autoComplete='current-password'
          />
          {errors.password && <p className='text-red-500'>Password  is required</p>}

          <button
            type='submit'
            className='bg-zinc-700 w-2/4 mx-auto text-white h-10 rounded-md text-lg'
          >Registrar
          </button>
        </form>
      </div>
      <div>
        <p className='text-white text-lg'>¿Ya tienes una cuenta? <Link to='/login' className='text-blue-500'>Ingresa aquí!</Link></p>
      </div>
    </section>

  )
}

export default RegisterPage
