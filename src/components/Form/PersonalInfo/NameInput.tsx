import React from 'react';
import { useFormContext } from 'react-hook-form';
import { InputRoot, InputControl, InputPrefix } from '../../input';

const NameInput: React.FC = () => {
  const { register, formState: { errors } } = useFormContext();

  // Extrair a mensagem de erro corretamente
  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;
    if (typeof error.message === 'string') return error.message;
    return 'Erro inválido';
  };

  return (
    <div className="flex flex-col gap-1">
    <label htmlFor="name">Nome</label>
    <InputRoot>
      <InputPrefix>
        {/* Adicione qualquer prefixo de input aqui, se necessário */}
      </InputPrefix>
      <InputControl
        type="text"
        id="name"
        {...register('name')}
      />
    </InputRoot>
    {errors.name && <span>{getErrorMessage(errors.name)}</span>}
  </div>
  );
};

export default NameInput;
