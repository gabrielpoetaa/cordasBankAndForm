import React from 'react';
import { useFormContext } from 'react-hook-form';

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
      <input
        type="text"
        className="border border-zinc-200 shadow-sm rounded h-10 px-3"
        {...register('name')}
      />
      {errors.name && <span>{getErrorMessage(errors.name)}</span>}
    </div>
  );
};

export default NameInput;
