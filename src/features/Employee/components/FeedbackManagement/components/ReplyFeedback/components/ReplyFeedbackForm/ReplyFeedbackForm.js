import { Box, Divider, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';

export default function ReplyFeedbackForm({ feedback }) {
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
              {feedback?.userName}
            </Typography>
            <Typography component="span" fontSize={14}>
              {' '}
              &nbsp; - &nbsp;{' '}
              {moment(feedback?.createdAt).format('HH:mm:ss, DD/MM/YYYY')}
            </Typography>
            <br />
            <Typography>{feedback?.content}</Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ margin: '16px 0' }} />
    </>
  );
}
