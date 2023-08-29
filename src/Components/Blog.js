import React from 'react';
import { Typography, ListItemText } from '@mui/material';
import { Card, CardContent } from '@mui/material';

export const Blog = ({ id, title, tags }) => (
  <Card style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', width:'49vh' }}>
    <CardContent className="card-body" style={{ alignItems:'center' }}>
      <ListItemText
        primary={title} />
    </CardContent>
    <Typography variant="body2" color="text.secondary" style={{ marginLeft: 'auto', marginRight: '16px', marginBottom: '8px', marginTop:'-3vh' }}>
      {tags}
    </Typography> 
  </Card>
);

