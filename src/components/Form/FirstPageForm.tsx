import '../../styles/global.css';

import { useEffect, useState } from 'react';

import EmailInput  from './FirstPage/EmailInput';
import TelefoneInput from './FirstPage/TelefoneInput/TelefoneInput';
import EnderecoForm from './FirstPage/EnderecoForm';
import CpfInput from './FirstPage/CpfInput';
import phoneCodes from './FirstPage/TelefoneInput/phoneCodes.json';
import NameInput from './FirstPage/NameInput';

export function FirstPageForm() {

  interface Country {
    dial: string;
    code: string;
    name: string; 
}

const [Country, setCountry] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState({ dial: '+55', code: 'BR' });


  useEffect(() => {
    const formattedCountries = phoneCodes.map(country => ({
      name: country.name,
      dial: country.dial,
      code: country.code,
    }));
    setCountry(formattedCountries);
  }, []);

  const handleCountryChange = (country: Country) => {
    setSelectedCountry(country);
  };

  const onSubmit = (data:any) => {
    const fullPhoneNumber = `${selectedCountry.dial}${data.telefone.replace(/\D/g, '')}`;
    data.telefone = fullPhoneNumber;
    data.cpf = data.cpf.replace(/\D/g, '');
    console.log(data);
  };

  return (
      <main>
        <div className="mt-6 flex items-center w-full flex-col gap-5 font-medium text-zinc-700">
          {/* <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full max-w-lg"> */}
          <div className="flex flex-col gap-4 w-full max-w-lg">
            <NameInput />
            <EmailInput />
            <TelefoneInput onCountryChange={handleCountryChange} />
            <CpfInput />
            <EnderecoForm />
            {/* <button type="submit" className="bg-goldCordas_300 rounded font-semibold text-white h-10 hover:bg-goldCordas_200">
              Próximo
            </button> */}
          </div>
        </div>
      </main>
  )};
  
export default FirstPageForm;
