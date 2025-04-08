import React from 'react';
import { Button, Box, Paper, Typography, Alert } from '@mui/material';
import { InsertDriveFile } from '@mui/icons-material';

const DataGeneration = ({ handleGenerateData, isGeneratingData, dataGenerated, handleReset }) => {
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
        Data Generation
      </Typography>
      
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <InsertDriveFile fontSize="small" sx={{ mr: 1 }} />
        <Typography>Output Format: Excel File</Typography>
      </Box>
        
      {!dataGenerated ? (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          sx={{ mt: 2 }}
          onClick={handleGenerateData}
          disabled={isGeneratingData}
        >
          {isGeneratingData ? 'Generating Data...' : 'Generate Data'}
        </Button>
      ) : (
        <>
          <Alert severity="success" sx={{ mb: 2 }}>
            Data generation complete!
          </Alert>
          <Button
            variant="contained"
            color="success"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Download Excel File
          </Button>
          <Button
            variant="outlined"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
            onClick={handleReset}
          >
            Start New Project
          </Button>
        </>
      )}
    </Paper>
  );
};

export default DataGeneration;