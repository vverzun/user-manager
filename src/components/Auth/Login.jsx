import React from 'react';
import { Link } from 'react-router-dom';
import { Card, TextField, Typography, Button } from '@material-ui/core';
import Layout from '../../containers/Layout/Layout';
import BackButton from '../common/BackButton/BackButton';
import style from './style.module.scss';

const Login = () => {
  const handleLogin = () => {
    console.log('handle login');
  };

  return (
    <Layout>
      <BackButton />
      <Card className={style.wrapper}>
        <Typography variant="h4" className={style.header}>
          Login
        </Typography>
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
          onClick={handleLogin}
        >
          Login
        </Button>
        <Link to="/sign-up" className={style.link}>
          Don&apos;t have an account? Sign up
        </Link>
      </Card>
    </Layout>
  );
};

export default Login;
