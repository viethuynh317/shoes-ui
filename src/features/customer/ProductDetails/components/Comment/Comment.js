import { Box, Divider, Rating, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

const Comment = ({ userName, content, numOfStars, createdAt }) => {
  return (
    <>
      <Box display="flex" justifyContent="space-between">
        {' '}
        <Box display="flex">
          <img
            src="https://secure.gravatar.com/avatar/b26407fdbb151a3a44fceda692c92874?s=60&d=mm&r=g"
            height="60"
            width="60"
            alt="avatar"
          />
          <Box ml={2} sx={{ textAlign: 'left' }}>
            <Typography fontWeight={600} component="span">
              {userName}
            </Typography>
            <Typography component="span">
              {' '}
              &nbsp; - &nbsp; {moment(createdAt).format('DD/MM/YYYY')}
            </Typography>
            <br />
            <Typography>{content}</Typography>
          </Box>
        </Box>
        <Rating size="small" readOnly value={numOfStars} />
      </Box>
      <Divider sx={{ margin: '16px 0' }} />
    </>
  );
};

export default Comment;
