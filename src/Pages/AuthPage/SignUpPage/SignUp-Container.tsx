import React, { useEffect } from 'react';
import SignUpView from './SignUp-View';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchStore, RootState } from '../../../types/types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { sendingFormSignUp } from '../../../store/actions/signUp-actions';
import { FormState } from './SignUp-Types';
let formData;

const SignUpContainer = () => {
  const { name, login, password, error, isLoading } = useSelector(
    (state: RootState) => state.signUp
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state: RootState) => state.signIn);
  console.log(isAuth, isLoading, error);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    watch,
  } = useForm<FormState>({ mode: 'onChange' });

  const handleFormSubmit = () => {
    reset();
    formData = {
      name,
      login,
      password,
    };
    dispatchStore(sendingFormSignUp(formData));
  };
  console.log(formData);

  useEffect(() => {
    if (formData) navigate('/login');
  }, [isSubmitSuccessful]);

  return (
    <SignUpView
      handleSubmit={handleSubmit}
      handleFormSubmit={handleFormSubmit}
      register={register}
      errors={errors}
      error={error}
      watch={watch}
      dispatch={dispatch}
      isLoading={isLoading}
    />
  );
};
export default SignUpContainer;
