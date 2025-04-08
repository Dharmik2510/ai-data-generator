import React from 'react';
import { TextField, Button, Paper, Typography } from '@mui/material';

const RequirementsInput = ({ inputText, setInputText, handleGenerateSchema, isGeneratingSchema }) => {
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
        Input Requirements
      </Typography>
      
      <TextField
        multiline
        rows={20}
        fullWidth
        variant="outlined"
        sx={{
          '& .MuiInputBase-root': {
            height: '450px',
            fontSize: '16px',
            fontFamily: 'monospace',
            width: '100%',
            '& textarea': {
              height: '100% !important'
            }
          },
          width: '100%'
        }}
        placeholder={`Enter your DDL statements or describe your requirements.\nExample:\n"CREATE TABLE Customer (\n  customer_id INT PRIMARY KEY,\n  name VARCHAR(100),\n  email VARCHAR(100)\n);"`}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      
      <Button
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ mt: 2 }}
        onClick={handleGenerateSchema}
        disabled={isGeneratingSchema || !inputText.trim()}
      >
        {isGeneratingSchema ? 'Generating...' : 'Generate Schema'}
      </Button>
    </Paper>
  );
};

export default RequirementsInput;