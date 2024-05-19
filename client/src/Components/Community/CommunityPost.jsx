import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const CommunityPost = ({ posts }) => {
  return (
    <Box>
      {posts.map((item, index) => (
        <Card key={index} sx={{ marginBottom: 2 }}>
          <CardContent>
            {item.cover && (
              <CardMedia
                component="img"
                height="140"
                image={item.cover}
                alt="Post image"
                sx={{ marginTop: 2 }}
              />
            )}
            <Typography variant="body1" component="p">
              {item.description}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default CommunityPost;
