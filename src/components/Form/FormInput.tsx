import { Controller, useFormContext } from 'react-hook-form';
import TextField from '@mui/material/TextField';

type FormInputProps = {
  name: string; // estado interno
  label: string; // display
  onChange?: (value: string) => void; // nova prop
}

export const FormInput = ({ name, label, onChange }: FormInputProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name} // type
      control={control}
      render={({ field, fieldState }) => (
        <TextField
          label={label}
          error={Boolean(fieldState.error)}
          {...field} // Isso espalha todas as propriedades do field, incluindo onChange
          onChange={(e) => {
            field.onChange(e); // Chama a função do react-hook-form
            if (onChange) onChange(e.target.value); // Chama a função onChange recebida
          }}
        />
      )}
    />
  );
}
