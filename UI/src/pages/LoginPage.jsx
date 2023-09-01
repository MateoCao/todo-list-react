import { useAuth } from '../context/AuthContext'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function LoginPage () {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { errors: loginErrors, signIn, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/tasks')
  }, [isAuthenticated])

  const onSubmit = handleSubmit((values) => {
    signIn(values)
  })

  return (
    <section className='h-[95.7vh] w-full bg-zinc-800 flex flex-col items-center justify-center'>
      <div className='bg-zinc-900 min-w-[500px] flex justify-center items-center flex-col gap-4 mb-32 p-5 rounded-lg'>
        {loginErrors?.map((error, i) => (
          <div key={i} className='bg-red-500 p-2 text-white'>
            {error}
          </div>
        ))}
        <form
          className='flex flex-col gap-5 w-full'
          onSubmit={onSubmit}
        >
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
          >Ingresar
          </button>
        </form>
      </div>
      <div>
        <p className='text-white text-lg'>¿No tienes una cuenta? <Link to='/register' className='text-blue-500'>¡Registrate aquí!</Link></p>
      </div>
    </section>
  )
}

export default LoginPage
