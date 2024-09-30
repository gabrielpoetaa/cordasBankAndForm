import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';
// import { InputRoot, InputControl, InputPrefix } from '../../input';

export const NameInput = () => {
  const {  control  } = useFormContext();

  // Extrair a mensagem de erro corretamente
  const getErrorMessage = (error: any): string | null => {
    if (!error) return null;
    if (typeof error.message === 'string') return error.message;
    return 'Erro inválido';
  };

  return (
    <div className="flex flex-col gap-1">
    {/* <label htmlFor="name">Nome</label> */}
    <Controller
      name="name" // type
      control={control}
      render={({ field, fieldState }) => 
      <TextField 
      label="Nome" 
      error={Boolean(fieldState.error)} 
      {...field} 
      />}
      />
    {/* {errors.name && <span>{getErrorMessage(errors.name)}</span>} */}
  </div>
  );
};
