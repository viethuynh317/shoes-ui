import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
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

const schema = yup
  .object()
  .shape({
    content: yup.string().required('This field is required'),
  })
  .required();

const ReviewTab = ({ shoe: { _id } }) => {
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const perPage = 5;

  const [notify, setNotify] = useState({
    isOpen: false,
    message: '',
    type: '',
  });

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    const {
      payload: { status },
    } = await dispatch(
      createFeedback({
        ...data,
        shoeId: _id,
      })
    );
    setNotify({
      isOpen: true,
      message:
        status === 200 ||
        status === 201 ||
        status === 202 ||
        status === 203 ||
        status === 204
          ? 'Add new feedback successfully!'
          : 'Add new feedback failed!',
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
    const { payload } = await dispatch(
      getFeedbacks({ id: _id, page, perPage })
    );
    setFeedbacks(payload?.feedbacks);
  };

  const loadMore = () => {
    setPage((page) => page + 1);
  };

  useLayoutEffect(() => {
    setIsLoading(true);
    const fetchAllFeedbacks = async () => {
      try {
        const { payload } = await dispatch(
          getFeedbacks({ id: _id, page, perPage: 5 })
        );
        setFeedbacks((prevState) => [...prevState, ...payload?.feedbacks]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllFeedbacks();
  }, [dispatch, _id, page]);

  return (
    <>
      <Grid container spacing={5}>
        <Grid item sm={12} md={6}>
          {feedbacks.map((item, index) => (
            <Comment
              key={item?._id}
              {...item}
              hasLastChild={feedbacks?.length === index + 1}
            />
          ))}
          {Math.floor(feedbacks.length / (page * perPage)) > 0 && (
            <Box mt={2}>
              <LoadingButton
                loading={isLoading}
                loadingPosition="start"
                onClick={loadMore}
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </LoadingButton>
            </Box>
          )}
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
              error={!!errors?.content}
              helperText={errors?.content?.message}
            />
            <Box>
              <Button variant="outlined" type="submit">
                Submit
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Notification notify={notify} setNotify={setNotify} />
    </>
  );
};

export default ReviewTab;
