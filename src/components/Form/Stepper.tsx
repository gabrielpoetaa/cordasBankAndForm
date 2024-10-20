import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import StepButton from "@mui/material/StepButton";
import { createTheme, ThemeProvider} from "@mui/material";
import Typography from '@mui/material/Typography';

const theme = createTheme({
  palette: {
    background: {
      paper: '#ba8638',
      default:"#eb4034"
    
    },
    text: {
      primary: '#3f3f46',
      secondary: '#46505A',
    },
    action: {
      active: '#ba8638',
    },
    success: {
      main: '#009688',
    }
  },
  typography: {
    button: {
      "fontWeight": 500,
       "textTransform": 'capitalize',
    },
  },
});

type Step = {
  label: string;
  Component: React.ReactNode;
  hasError: boolean;
};

type StepProps = {
  items: Step[];
};

export function Steps({ items }: StepProps) {
  const [activeStep, setActiveStep] = React.useState(0);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const isLastStep = activeStep === items.length - 1;

  return (
    <ThemeProvider theme={theme}>
      <Typography>
          <Box
        sx={{
          // bgcolor: 'background.paper',
          // boxShadow: 1,
          // borderRadius: 2,
          // p: 2,
          // minWidth: 300,
        }}
      >

      <Stepper activeStep={activeStep} nonLinear>
        {items.map(({ label, hasError }, index) => {
          return (
            <Step 
            key={label}
            sx={{
              '.css-15rfbsb-MuiSvgIcon-root-MuiStepIcon-root.Mui-active':{
                color:'#ba8638'
              }

            }}
            >
              <StepButton onClick={() => setActiveStep(index)}>
                <StepLabel  error={hasError}>{label}</StepLabel>
              </StepButton>
            </Step>
          );
        })}
      </Stepper>

      <Box sx={{
          // boxShadow: 1,
          // borderRadius: 2,
          // p: 2,
          // minWidth: 300,
      }}
      minHeight={"30vh"}>{items[activeStep].Component}</Box>

      <Box sx={{ 
        display: "flex", 
        flexDirection: "row", 
        pt: 2, 
        
        }}
        >
        
        {/* // Active button at the bottom */}
        <Button
          color="inherit"
          disabled={activeStep === 0}
          onClick={handleBack}
          sx={{ 
            mr: 1, 
            bgcolor: activeStep === 0 ? 'transparent' : '#d6b56e',
            color: '#f9f6ed',
            fontSize: 16,
            p: 2,
            borderRadius: 3,
            // boxShadow: 1,
          }}
          className="rounded h-10 bg-white hover:bg-goldCordas_200 hover:text-goldCordas_50">
          Voltar
        </Button>

        <Box
        sx=
        {{ 
          flex: "1 1 auto",
          
          }} 
          />
          
        {isLastStep ? (
          <Button key="enviar" type="submit">
            Enviar
          </Button>
        ) : (

          <Button 
          key="proximo" 
          type="button" 
          onClick={handleNext} 
          sx={{ 
            mr: 1, 
            color: '#f9f6ed',
            fontSize: 16,
            p: 2,
            backgroundColor: '#d6b56e',
            borderRadius: 3,
            // boxShadow: 1,
          }}
          className="rounded h-10 hover:bg-goldCordas_200 hover:text-goldCordas_50">
            Próximo
          </Button>
        )}
      </Box>

    </Box>
    </Typography>
    </ThemeProvider>
  );
}