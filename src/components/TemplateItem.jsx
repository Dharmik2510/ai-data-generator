import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { TableChart } from '@mui/icons-material';

const TemplateItem = ({ template, selected, onClick }) => {
  return (
    <ListItemButton 
      selected={selected} 
      onClick={() => onClick(template.id)}
      sx={{ 
        borderRadius: 1,
        mb: 1,
        backgroundColor: selected ? 'primary.light' : 'background.paper',
        '&:hover': {
          backgroundColor: selected ? 'primary.light' : 'action.hover',
        }
      }}
    >
      <ListItemIcon>
        <TableChart color={selected ? 'primary' : 'action'} />
      </ListItemIcon>
      <ListItemText 
        primary={
          <Typography fontWeight={selected ? 'bold' : 'regular'}>
            {template.name}
          </Typography>
        } 
        secondary={template.description} 
      />
    </ListItemButton>
  );
};

export default TemplateItem;