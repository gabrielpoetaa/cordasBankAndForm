import './styles/global.css'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'

import NameInput from './Form/PersonalInfo/NameInput';
import EmailInput from './Form/PersonalInfo/EmailInput';
import TelefoneInput from './Form/PersonalInfo/TelefoneInput/TelefoneInput';
import EnderecoForm from './Form/PersonalInfo/EnderecoForm';

import phoneCodes from './Form/PersonalInfo/TelefoneInput/phoneCodes.json'
import CpfInput from './Form/PersonalInfo/CpfInput'

const createUserFormSchema = z.object({
  name: z.string().nonempty('O nome é obrigatório').transform(name => {
    return name.trim().split(' ').map(word => {
      word = word.toLowerCase();
      return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    }).join(' ');
  }),
  email: z.string().nonempty('Email obrigatório').email('Formato de e-mail inválido'),
  telefone: z.string().transform(value => value.replace(/\D/g, '')),
  cpf: z.string().nonempty('CPF é obrigatório'),
  Endereco: z.object({
    cep: z.string().min(8, 'O CEP deve ter oito dígitos'),
    rua: z.string(),
    numero: z.string(),
    complemento: z.string(),
    bairro: z.string(),
    cidade: z.string(),
    estado: z.string(),
  }),
});

type CreateUserFormData = z.infer<typeof createUserFormSchema>

function App() {
  const methods = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  });

  const { handleSubmit, formState: { errors }, setValue, setError } = methods;
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCountry, setSelectedCountry] = useState({ dial: '+55', code: 'BR' });

  useEffect(() => {
    const formattedCountries = phoneCodes.map(country => ({
      name: country.name,
      dial: country.dial,
      code: country.code
    }));
    setCountries(formattedCountries);
  }, []);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const onSubmit = (data: CreateUserFormData) => {
    const fullPhoneNumber = `${selectedCountry.dial}${data.telefone.replace(/\D/g, '')}`; // Remove caracteres não numéricos do telefone
    data.telefone = fullPhoneNumber;
    data.cpf = data.cpf.replace(/\D/g, ''); // Remove todos os caracteres não numéricos do CPF
    console.log(data);
  };

  const handleCepBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, '');
    if (cep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        if (!data.erro) {
          setValue('Endereco.rua', data.logradouro);
          setValue('Endereco.bairro', data.bairro);
          setValue('Endereco.cidade', data.localidade);
          setValue('Endereco.estado', data.uf);
        } else {
          setError('Endereco.cep', {
            type: 'manual',
            message: 'CEP não encontrado',
          });
        }
      } catch (error) {
        setError('Endereco.cep', {
          type: 'manual',
          message: 'Erro ao buscar o CEP',
        });
      }
    } else {
      setError('Endereco.cep', {
        type: 'manual',
        message: 'Formato de CEP inválido',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <div className='bg-zinc-50 w-full pt-10'>
        <main className="h-screen bg-zinc-50 flex items-center justify-center">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-lg">
            <NameInput />
            <EmailInput />
            <TelefoneInput onCountryChange={handleCountryChange} />
            <CpfInput />
            <EnderecoForm handleCepBlur={handleCepBlur} />
            <button type="submit" className="bg-emerald-500 rounded font-semibold text-white h-10 hover:bg-emerald-600">
              Salvar
            </button>
          </form>
        </main>
      </div>
    </FormProvider>
  );
}

export default App;