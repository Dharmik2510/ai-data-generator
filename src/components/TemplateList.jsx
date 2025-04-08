import React from 'react';
import { Box, List, Typography, Paper } from '@mui/material';
import TemplateItem from './TemplateItem';

const TemplateList = ({ templates, selectedTemplateId, handleSelectTemplate }) => {
  return (
    <Paper sx={{ p: 2, height: '100%', boxShadow: 3 }}>
      <Typography variant="h6" gutterBottom>
        Schema Templates
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Select a template to quickly generate a schema
      </Typography>
      
      <List sx={{ width: '100%', bgcolor: 'background.paper', overflowY: 'auto', maxHeight: '400px' }}>
        {templates.map((template) => (
          <TemplateItem
            key={template.id}
            template={template}
            selected={selectedTemplateId === template.id}
            onClick={handleSelectTemplate}
          />
        ))}
      </List>
    </Paper>
  );
};

export default TemplateList;