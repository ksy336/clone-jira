import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchStore, RootState } from '../../../types/types';
import LoginView from './Login-View';
import React, { useEffect } from 'react';
import { sendingSignInData } from '../../../store/actions/signIn-actions';
import { useForm } from 'react-hook-form';
import { LoginState } from './Login-Types';

const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.signUp);
  const { login, password, isLoading, isAuth } = useSelector((state: RootState) => state.signIn);

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<LoginState>({ mode: 'onChange' });

  useEffect(() => {
    if (isAuth) navigate('/main');
  }, [isAuth]);

  let formSignInData = {};
  const handleFormSubmit = () => {
    reset();
    formSignInData = {
      login,
      password,
    };
    dispatchStore(sendingSignInData(formSignInData));
  };
  return (
    <LoginView
      dispatch={dispatch}
      error={error}
      errors={errors}
      handleFormSubmit={handleFormSubmit}
      handleSubmit={handleSubmit}
      register={register}
      isLoading={isLoading}
    />
  );
};
export default LoginContainer;
