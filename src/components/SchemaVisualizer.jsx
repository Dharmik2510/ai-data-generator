import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import MermaidDiagram from './MermaidDiagram';
import ErrorBoundary from './ErrorBoundry'

const SchemaVisualizer = ({ schema, dataGenerated }) => {
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
        Schema Visualization
      </Typography>
      
      <Box sx={{ 
        minHeight: '450px',
        border: '1px solid #eee', 
        borderRadius: '4px', 
        padding: '16px',
        overflow: 'auto',
        width: '100%'
      }}>
        <ErrorBoundary>
          <MermaidDiagram definition={schema} />
        </ErrorBoundary>
      </Box>
      
      {dataGenerated && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Data Preview
          </Typography>
          <Typography variant="body2">
            Generated 100 sample rows based on the schema
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default SchemaVisualizer;