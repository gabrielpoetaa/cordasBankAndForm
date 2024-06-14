import './styles/global.css'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

import phonesCodes from './phoneCodes.json'; // Certifique-se de que o caminho para o arquivo JSON está correto

const createUserFormSchema = z.object({
  name: z.string()
    .nonempty('O nome é obrigatório')
    .transform(name => {
      return name.trim().split(' ').map(word => {
        word = word.toLowerCase();
        return word.charAt(0).toLocaleUpperCase() + word.slice(1);
      }).join(' ');
    }),
  email: z.string()
    .nonempty('Email obrigatório')
    .email('Formato de e-mail inválido'),
  telefone: z.string()
    // .refine(value => /^\+\d{1,3}\d{10,11}$/.test(value), {
    //   message: 'Telefone inválido. Deve começar com "+" seguido pelo código do país e ter entre 10 e 11 dígitos numéricos.',
    // })
    .transform(value => value.replace(/\D/g, '')), // Remove todos os não-dígitos
  Endereco: z.object({
    cep: z.string()
      .min(8, 'O CEP deve ter oito dígitos'),
    rua: z.string(),
    numero: z.string(), // Novo campo número
    complemento: z.string(), // Novo campo complemento
    bairro: z.string(),
    cidade: z.string(),
    estado: z.string(),
  }),
});
// password: z.string()
//   .min(6, 'A senha deve ter no mínimo 6 caracteres'),

type CreateUserFormData = z.infer<typeof createUserFormSchema>

interface FormData {
  name: string;
  email: string;
  telefone: string;
  Endereco: {
    cep: string;
    numero: string;
    complemento: string;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
  };
}

interface Country {
  name: string;
  dial: string;
  code: string;
}

function App() {

  const { register, handleSubmit, formState: { errors }, setValue, setError } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })
  const [countries, setCountries] = useState<Country[]>([]); // Estado inicial vazio
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState({ dial: '+55', code: 'BR' });


  useEffect(() => {
    // Mapear os dados para usar a chave correta
    const formattedCountries = phonesCodes.map(country => ({
      name: country.name,
      dial: country.dial,
      code: country.code
    }));
    setCountries(formattedCountries);
  }, []);

  const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const country = countries.find(c => c.code === event.target.value);
    if (country) {
      setSelectedCountry(country);
    }
  };

  const onSubmit = (data: FormData) => {
    const fullPhoneNumber = `${selectedCountry.dial}${data.telefone}`; // Removido o espaço extra aqui
    data.telefone = fullPhoneNumber; // Atualiza o número de telefone no formulário com o código do país
    console.log(data);
    // Aqui você pode enviar os dados para o servidor ou processá-los conforme necessário
  };

  // Função de busca do CEP 
  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          // Atualizar os valores do formulário com os dados do CEP
          // Aqui estamos usando setValue do react-hook-form
          // Certifique-se de importar corretamente essa função
          setValue('Endereco.rua', data.logradouro);
          setValue('Endereco.bairro', data.bairro);
          setValue('Endereco.cidade', data.localidade);
          setValue('Endereco.estado', data.uf);
        } else {
          // CEP não encontrado, exibir mensagem de erro
          setError('Endereco.cep', {
            type: 'manual',
            message: 'CEP não encontrado',
          });
        }
      } catch (error) {
        console.error('Erro ao buscar o CEP:', error);
        // Tratar o erro ao buscar o CEP
        // Exemplo: exibir uma mensagem de erro genérica
        setError('Endereco.cep', {
          type: 'manual',
          message: 'Erro ao buscar o CEP',
        });
      }
    } else {
      // CEP inválido, exibir mensagem de erro
      setError('Endereco.cep', {
        type: 'manual',
        message: 'Formato de CEP inválido',
      });
    }
  };

  return (
    <div className='bg-zinc-50 w-full pt-10'>
    <main className="h-screen bg-zinc-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-lg">


        <div className="flex flex-col gap-1">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('name')}
          />
          {errors.name && <span>{errors.name.message}</span>}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('email')}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>


        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="telefone">Telefone</label>
          <div className="flex gap-2">
            <select
              className="w-20 border border-zinc-200 shadow-sm rounded-l h-10 px-3 max-h-40 overflow-y-auto"
              onChange={handleCountryChange}
            >
              <option value="BR">+55 (Brasil)</option>
              {countries.map((country, index) => (
                <option key={index} value={country.code}>
                  {country.dial} ({country.name})
                </option>
              ))}
            </select>
            <input
              type="text"
              className="border w-60 border-zinc-200 shadow-sm rounded-r h-10 px-3"
              placeholder="DDD e número de telefone"
              {...register('telefone')}
            />
          </div>
        </div>



        <div className="flex flex-col gap-1 w-full md:w-1/2">
          <label htmlFor="cep">CEP</label>
          <input
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('Endereco.cep', {
              required: 'CEP é obrigatório',
              minLength: { value: 8, message: 'O CEP deve ter oito dígitos' },
            })}
            onBlur={handleCepBlur} // Aqui associamos o onBlur ao handleCepBlur
          />
          {errors?.Endereco?.cep && <span>{errors.Endereco.cep.message}</span>}
        </div>

        <div className="flex flex-col md:flex-row md:gap-4">
        <div className="flex flex-col gap-1 w-full md:w-1/2">
            <label htmlFor="numero">Número</label>
            <input
              type="text"
              className="border border-zinc-200 shadow-sm rounded h-10 px-3"
              {...register('Endereco.numero')}
            />
          </div>

          <div className="flex flex-col gap-1 w-full md:w-1/2">
            <label htmlFor="complemento">Complemento</label>
            <input
              type="text"
              className="border border-zinc-200 shadow-sm rounded h-10 px-3"
              {...register('Endereco.complemento')}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rua">Rua</label>
          <input
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('Endereco.rua')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="bairro">Bairro</label>
          <input
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('Endereco.bairro')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cidade">Cidade</label>
          <input
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('Endereco.cidade')}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('Endereco.estado')}
          />
        </div>

        {/* <div className="flex flex-col gap-1">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            className="border border-zinc-200 shadow-sm rounded h-10 px-3"
            {...register('password')}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div> */}

        <button
          type="submit"
          className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600"
        >
          Salvar
          
        </button>

      </form>

    </main>
    <div className='bg-zinc-50 w-full pt-10'></div>

    </div>

  )
}

export default App
