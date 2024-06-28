import { ComponentProps } from 'react';

export interface InputProps {}

interface InputPrefixProps extends ComponentProps<'div'> {}

export function InputPrefix(props: InputPrefixProps) {
  return (
    <div {...props} />
  );
}

interface InputControlProps extends ComponentProps<'input'> {}

export function InputControl(props: InputControlProps) {
  return (
    <input 
      className="border-0 w-full rounded h-8 px-3"
      {...props}
    />
  );
}

export type InputRootProps = ComponentProps<'div'>;

export function InputRoot(props: InputRootProps) {
  return (
    <div 
      className="mx-1 flex w-full items-center gap-2 rounded-lg border border-zinc-300 px-3 py-2 shadow-sm"
      {...props}
    />
  );
}
