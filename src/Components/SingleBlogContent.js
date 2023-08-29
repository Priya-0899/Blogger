import React from 'react';
import { ListItemText,Typography } from '@mui/material';
import { Card, CardContent } from '@mui/material';

export const SingleBlogContent = ({ id, title, body }) => (
    <Card style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', width:'49vh' }}>
      <CardContent className="card-body" style={{ alignItems:'center' }}>
        <ListItemText
          primary={title} />
      </CardContent>
      <Typography variant="body1" color="text.secondary" style={{ marginLeft: '16px', marginBottom: '8px', marginTop:'-1vh' }}>
        {body}
      </Typography>  
  </Card>
);