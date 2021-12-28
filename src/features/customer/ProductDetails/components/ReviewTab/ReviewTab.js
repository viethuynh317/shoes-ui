import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Grid,
  Rating,
  TextField,
  Typography,
} from '@mui/material';
import React, { useLayoutEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import Notification from '../../../../../components/Notification';
import { createFeedback, getFeedbacks } from '../../../customerSlice';
import Comment from '../Comment/Comment';

const schema = yup.object().shape({}).required();

const ReviewTab = ({ shoe: { _id } }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const dispatch = useDispatch();
  const { register, handleSubmit, control, setValue } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    const {
      payload: { status },
    } = await dispatch(createFeedback({ ...data, shoeId: _id }));
    setNotify({
      isOpen: true,
      message: 'Add new feedback successfully!',
      type:
        status === 200 ||
        status === 201 ||
        status === 202 ||
        status === 203 ||
        status === 204
          ? 'success'
          : 'error',
    });
    setRating(0);
    setContent('');
    const { payload } = await dispatch(getFeedbacks(_id));
    setFeedbacks(payload?.feedbacks);
  };

  useLayoutEffect(() => {
    const fetchAllFeedbacks = async () => {
      try {
        const { payload } = await dispatch(getFeedbacks(_id));
        setFeedbacks(payload?.feedbacks);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllFeedbacks();
  }, [dispatch, _id]);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item sm={12} md={6}>
          {feedbacks.map((item) => (
            <Comment key={item._id} {...item} />
          ))}
        </Grid>
        <Grid item sm={12} md={6}>
          <Box
            component="form"
            sx={{ textAlign: 'left' }}
            display="flex"
            flexDirection="column"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <Typography variant="button" fontWeight={600}>
              add a new review
            </Typography>
            <Typography sx={{ margin: '16px 0' }} component="span">
              Your rating
            </Typography>
            <Controller
              name="numOfStars"
              control={control}
              {...register('numOfStars')}
              render={(props) => (
                <Rating
                  name="numOfStars"
                  sx={{ marginBottom: '16px' }}
                  value={rating}
                  onChange={(_, value) => {
                    setRating(+value);
                    setValue('numOfStars', +value);
                  }}
                />
              )}
            />
            <Typography component="span" sx={{ marginBottom: '16px' }}>
              Your review
            </Typography>
            <TextField
              value={content}
              multiline
              rows={5}
              sx={{ marginBottom: '16px' }}
              name="content"
              {...register('content')}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <Button type="submit" variant="outlined" sx={{ maxWidth: '100px' }}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default ReviewTab;
