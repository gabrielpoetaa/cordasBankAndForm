import '../styles/global.css';
import { useForm, FormProvider } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';

import { InputRoot, InputControl, InputPrefix } from '../components/input';
import EmailInput from '../components/Form/PersonalInfo/EmailInput';
import TelefoneInput from '../components/Form/PersonalInfo/TelefoneInput/TelefoneInput';
import EnderecoForm from '../components/Form/PersonalInfo/EnderecoForm';
import CpfInput from '../components/Form/PersonalInfo/CpfInput';

import phoneCodes from '../components/Form/PersonalInfo/TelefoneInput/phoneCodes.json';
import NameInput from '../components/Form/PersonalInfo/NameInput';

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

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

export function FormPersonal() {
  const methods = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const { handleSubmit, formState: { errors }, register, setValue, setError } = methods;
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState({ dial: '+55', code: 'BR' });

  useEffect(() => {
    const formattedCountries = phoneCodes.map(country => ({
      name: country.name,
      dial: country.dial,
      code: country.code,
    }));
    setCountries(formattedCountries);
  }, []);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const onSubmit = (data: CreateUserFormData) => {
    const fullPhoneNumber = `${selectedCountry.dial}${data.telefone.replace(/\D/g, '')}`;
    data.telefone = fullPhoneNumber;
    data.cpf = data.cpf.replace(/\D/g, '');
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

  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;
    if (typeof error.message === 'string') return error.message;
    return 'Erro inválido';
  };

  return (
    <FormProvider {...methods}>
      <main>
        <div className="mt-6 flex items-center w-full flex-col gap-5 font-semibold text-zinc-700">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-lg">
            <NameInput />
            <EmailInput />
            <TelefoneInput onCountryChange={handleCountryChange} />
            <CpfInput />
            <EnderecoForm handleCepBlur={handleCepBlur} />
            <button type="submit" className="bg-goldCordas_300 rounded font-semibold text-white h-10 hover:bg-goldCordas_200">
              Salvar
            </button>
          </form>
        </div>
      </main>
    </FormProvider>
  );
}

export default FormPersonal;
