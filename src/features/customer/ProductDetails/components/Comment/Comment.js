import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Box, Divider, Rating, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import moment from 'moment';
import React, { useState } from 'react';

const DetailRepliesText = styled(Box)(() => ({
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
}));

const Comment = ({
  userName,
  content,
  numOfStars,
  createdAt,
  reply,
  hasLastChild,
}) => {
  const [isHide, setIsHide] = useState(false);
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
            <Typography component="span" fontSize={14}>
              {' '}
              &nbsp; - &nbsp; {moment(createdAt).format('HH:mm:ss, DD/MM/YYYY')}
            </Typography>
            <br />
            <Typography>{content}</Typography>
            <DetailRepliesText
              display="flex"
              alignItems="center"
              onClick={() => {
                setIsHide((prevState) => !prevState);
              }}
            >
              <Typography color="inherit">
                {!isHide ? `${reply?.length} Replies` : 'Hide'}
              </Typography>
              {!isHide ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            </DetailRepliesText>
          </Box>
        </Box>
        <Rating size="small" readOnly value={numOfStars} />
      </Box>
      {isHide && (
        <Box>
          {reply.map((item, index) => (
            <>
              <Box
                key={item?._id}
                ml={4}
                mt={2}
                display="flex"
                justifyContent="space-between"
              >
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
                      {item?.userName}
                    </Typography>
                    <Typography component="span" fontSize={14}>
                      {' '}
                      &nbsp; - &nbsp;{' '}
                      {moment(item?.createdAt).format('HH:mm:ss, DD/MM/YYYY')}
                    </Typography>
                    <br />
                    <Typography>{item?.content}</Typography>
                  </Box>
                </Box>
              </Box>
              {reply.length !== index + 1 && (
                <Divider sx={{ margin: '16px 0' }} />
              )}
            </>
          ))}
        </Box>
      )}
      {!hasLastChild && <Divider sx={{ margin: '16px 0' }} />}
    </>
  );
};

export default Comment;
