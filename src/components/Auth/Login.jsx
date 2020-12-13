import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Card, TextField, Typography, Button } from '@material-ui/core';
import Layout from '../../containers/Layout/Layout';
import BackButton from '../common/BackButton/BackButton';
import style from './style.module.scss';
import { loadLoginUser } from '../../store/actions';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = useCallback(event => {
    event.persist();
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.id]: event.target.value
    }));
  }, [formData]);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = () => {
    dispatch(loadLoginUser(formData, history));
  };

  return (
    <Layout>
      <BackButton />
      <Card className={style.wrapper}>
        <Typography variant="h4" className={style.header}>
          Login
        </Typography>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          className={style.input}
          value={formData.username}
          onChange={handleInputChange}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          className={style.input}
          value={formData.password}
          onChange={handleInputChange}
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
