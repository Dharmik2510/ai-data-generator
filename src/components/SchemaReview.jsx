import React from 'react';
import { Button, Box, Paper, Typography } from '@mui/material';

const SchemaReview = ({ handleReset, handleConfirmSchema }) => {
  return (
    <Paper 
      sx={{ 
        p: 3,
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        boxShadow: 3
      }}
    >
      <Typography variant="h6" gutterBottom>
        Review Schema
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        Please review the generated schema and confirm if it looks correct.
      </Typography>
      
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          size="large"
          onClick={handleReset}
        >
          Back to Requirements
        </Button>
        
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={handleConfirmSchema}
        >
          Confirm Schema
        </Button>
      </Box>
    </Paper>
  );
};

export default SchemaReview;