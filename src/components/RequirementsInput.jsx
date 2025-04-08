import React from 'react';
import { TextField, Button, Paper, Typography, Box, Grid } from '@mui/material';
import TemplateList from './TemplateList';

const RequirementsInput = ({ 
  inputText, 
  setInputText, 
  handleGenerateSchema, 
  isGeneratingSchema,
  templates,
  selectedTemplateId,
  handleSelectTemplate
}) => {
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
      
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        {/* Template List on Left Side */}
        <Grid item xs={12} md={4}>
          <TemplateList 
            templates={templates}
            selectedTemplateId={selectedTemplateId}
            handleSelectTemplate={handleSelectTemplate}
          />
        </Grid>
        
        {/* Text Input on Right Side */}
        <Grid item xs={12} md={8}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="body2" gutterBottom>
              Edit your schema definition or use a template as starting point:
            </Typography>
            
            <TextField
              multiline
              rows={18}
              fullWidth
              variant="outlined"
              sx={{
                flexGrow: 1,
                '& .MuiInputBase-root': {
                  height: '100%',
                  fontSize: '16px',
                  fontFamily: 'monospace',
                  '& textarea': {
                    height: '100% !important'
                  }
                }
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
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default RequirementsInput;