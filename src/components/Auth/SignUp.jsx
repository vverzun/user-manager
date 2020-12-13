import React, { useState, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Card, TextField, Typography, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Layout from '../../containers/Layout/Layout';
import BackButton from '../common/BackButton/BackButton';
import style from './style.module.scss';
import { loadCreateUser } from '../../store/actions';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  const handleSignUp = () => {
    dispatch(loadCreateUser({ userAuthDTO: formData }, history));
  };

  return (
    <Layout>
      <BackButton />
      <Card className={style.wrapper}>
        <Typography variant="h4" className={style.header}>
          Sign up
        </Typography>
        <TextField
          id="firstName"
          label="First Name"
          variant="outlined"
          className={style.input}
          onChange={handleInputChange}
          value={formData.firstName}
        />
        <TextField
          id="lastName"
          label="Last Name"
          variant="outlined"
          className={style.input}
          onChange={handleInputChange}
          value={formData.lastName}
        />
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          className={style.input}
          onChange={handleInputChange}
          value={formData.username}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          className={style.input}
          onChange={handleInputChange}
          value={formData.password}
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
