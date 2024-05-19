import React, { useEffect, useState } from 'react';
import { Paper, IconButton, CardMedia, Typography, Box } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import axios from 'axios';
import API_URL from '../Util/backend';

const CommunityPost = ({ posts }) => {
  
  const [likes, setLikes] = useState(); // Track likes for each post
  const [comments, setComments] = useState(posts.map(() => [])); // Track comments for each post
  
  console.log(likes)

  const handleLike = async(id) => {
    try {
      console.log(id);
      const response = await axios.post(`${API_URL}/like/${id}`);
      setLikes(response.data.like);
    } catch (error) {
      
    }
  };


  const handleComment = (index) => {
    const comment = prompt('Enter your comment:');
    if (comment) {
      const newComments = [...comments];
      newComments[index].push(comment);
      setComments(newComments);
    }
  };


  return (
    <Box>
      {posts.map((post, index) => (
        <Paper key={index} sx={{ padding: 2, marginBottom: 2 }}>
          {post.cover && (
            <Box sx={{ marginTop: 2, textAlign: 'center' }}>
              <img src={post.cover} alt="Post" style={{ maxWidth: '100%' }} />
            </Box>
          )}
          <Typography variant="body1">{post.description}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="body2" sx={{ marginLeft: 1 }}>
                {post.like}
              </Typography>
              <IconButton aria-label="like" onClick={() => handleLike(post._id)}>
                <ThumbUpIcon />
              </IconButton>
              <IconButton aria-label="comment" onClick={() => handleComment(index)}>
                <CommentIcon />
              </IconButton>
            </Box>
          </Box>
          {comments[index] > 0 && (
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="body2">Comments:</Typography>
              {comments[index].map((comment, commentIndex) => (
                <Typography key={commentIndex} variant="body2" sx={{ marginLeft: 2 }}>
                  {comment}
                </Typography>
              ))}
            </Box>
          )}
        </Paper>
      ))}
    </Box>
  );
};

export default CommunityPost;

      