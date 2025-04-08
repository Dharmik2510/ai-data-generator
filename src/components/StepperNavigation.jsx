import React from 'react';
import { Stepper, Step, StepLabel } from '@mui/material';

const StepperNavigation = ({ activeStep, steps }) => {
  return (
    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperNavigation;