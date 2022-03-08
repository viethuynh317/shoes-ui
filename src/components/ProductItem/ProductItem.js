import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import { makeStyles, styled } from '@mui/styles';
import moment from 'moment';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BrandTypo = styled(Typography)(({ theme }) => ({
  fontSize: 8,
  fontWeight: 600,
  fontFamily: 'Permanent Marker, cursive',
  color: '#fff',
}));

export default function ProductItem({ product }) {
  const classes = useStyles();
  const history = useHistory();
  const hasAdmin = history.location.pathname.split('/')[1] === 'admin';
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <BrandTypo>V-SHOES</BrandTypo>
          </Avatar>
        }
        title={product.name}
        subheader={moment(product?.createdAt).format('HH:mm:ss, DD/MM/YYYY')}
      />
      <CardMedia
        className={classes.media}
        image={product.imageUrl}
        title={product.name}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {/* {product.description} */}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className={classes.footer}>
        <div className={classes.priceCard}>
          <label>Giá: {product.unitPrice} VND</label>
        </div>
        <div className={classes.detail}>
          {/* <Link
            to={`/${+localStorage.getItem('roleId') === 0 ? 'admin' : 'employee'}/shoes/${
              product._id
            }`}
          > */}
          <Link to={`/${hasAdmin ? 'admin' : 'employee'}/shoes/${product._id}`}>
            Xem chi tiết {'>'}{' '}
          </Link>
        </div>
      </CardActions>
    </Card>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    width: '300px',
    minWidth: '300px',
    minHeight: '320px',
    maxHeight: '340px',
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
  },
  detail: {
    float: 'right',
    fontSize: '14px',
  },

  logo: {
    width: '100%',
  },
}));
