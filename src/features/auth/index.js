import { makeStyles } from '@material-ui/core';
import React, { Suspense } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const Auth = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <main className={classes.content}>
        <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
      </main>
    </div>
  );
};
Auth.propTypes = {};

export default Auth;
