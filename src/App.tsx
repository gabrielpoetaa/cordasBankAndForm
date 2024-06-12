
import './styles/global.css'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const createUserFormSchema = z.object({
  email: z.string()
  .nonempty('Email obrigatorio')
  .email('Formato de e-mail invalido'),
  password: z.string ()
  .min(6, 'A senha deve ter no minimo 6 caracteres'),
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  function createUser (data:any) {
    console.log (data)
  }

  return (
    <main className = "h-screen bg-zinc-50 flex items-center justify-center">
      <form 
        onSubmit={handleSubmit(createUser)}
        className="flex flex-col gap-4 w-full max-w-xs">
        <div className="flex flex-col gap-1">
        <label htmlFor="">E-mail</label>
        <input 
        type="email"
        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
         {...register ('email')}
        />
        {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
        <label htmlFor="">Senha</label>
        <input 
        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
        type="password"
        {...register('password')}
        />
        {errors.password && <span>{errors.password.message}</span>}

        </div>


        <button
         type="submit"
         className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
         >Salvar</button>

      </form>


    </main>
  )
}

export default App
