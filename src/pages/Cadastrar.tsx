import { FormProvider, useForm } from "react-hook-form";
import { Steps } from "./../components/Form/Stepper.tsx" 
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {FirstPageForm} from "../components/Form/FirstPageForm";


const createUserFormSchema = z.
object({
  name: z.string().nonempty('O nome é obrigatório').transform(name => {
    return name.trim().split(' ').map(word => {
      word = word.toLowerCase();
      return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    }).join(' ');
  }),
  email: z.string().nonempty('Email obrigatório').email('Formato de e-mail inválido'),
  telefone: z.string().min(8).transform(value => value.replace(/\D/g, '')),
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
})
.required();

type CreateUserFormData = z.infer<typeof createUserFormSchema>;

const sourceSteps = [
  {
    label: "Dados Pessoais",
    Component: <FirstPageForm/>,
    hasError: false,
  },
  {
    label: "Dados de Endereço",
    Component: <p>Passo 2</p>,
    hasError: false,
  },
  {
    label: "Dados de Contato",
    Component: <p>Passo 3</p>,
    hasError: false,
  },
];

export function Cadastrar() {
  
  const methods = useForm({
    resolver: zodResolver(createUserFormSchema),
    criteriaMode: "all",
    mode: "all",
    defaultValues: {
      name: "",
      email: "",
      telefone: "",
      cpf: "",
      endereco: "",

    },
  });

  if (methods.formState.isSubmitSuccessful) {
    return (
      <Box>
        <Typography variant="h2">Formulário enviado com sucesso!</Typography>
        <Button onClick={() => methods.reset()}>
          Clique aqui para enviar um novo cadastro
        </Button>
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit((data) => console.log(data))}>
        <Steps items={sourceSteps} />
      </form>
    </FormProvider>
  );
}