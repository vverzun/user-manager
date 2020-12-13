import React from 'react';
import { Link } from 'react-router-dom';
import { Card, TextField, Typography, Button } from '@material-ui/core';
import Layout from '../../containers/Layout/Layout';
import BackButton from '../common/BackButton/BackButton';
import style from './style.module.scss';

const SignUp = () => {
  const handleSignUp = () => {
    console.log('SignUp');
  };

  return (
    <Layout>
      <BackButton />
      <Card className={style.wrapper}>
        <Typography variant="h4" className={style.header}>
          Sign up
        </Typography>
        <TextField
          label="First Name"
          variant="outlined"
          className={style.input}
        />
        <TextField
          label="Last Name"
          variant="outlined"
          className={style.input}
        />
        <TextField
          label="Username"
          variant="outlined"
          className={style.input}
        />
        <TextField
          label="Password"
          variant="outlined"
          className={style.input}
        />
        <Button
          variant="contained"
          className={style.button}
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
        <Link to="/login" className={style.link}>
          Already have an account? Login
        </Link>
      </Card>
    </Layout>
  );
};

export default SignUp;
