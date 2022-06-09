import React, { useEffect } from 'react';
import SignUpView from './SignUp-View';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchStore, RootState } from '../../../types/types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { sendingFormSignUp } from '../../../store/actions/signUp-actions';
import { FormState } from './SignUp-Types';
import { useTranslation } from 'react-i18next';
import useSticky from '../../../hooks/useSticky';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import SwitchLanguage from '../../../components/Switch/Switch';
import LoginView from '../LoginPage/Login-View';
let formData;

const SignUpContainer = () => {
  const { name, login, password, error, isLoading } = useSelector(
    (state: RootState) => state.signUp
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sticky, headerRef } = useSticky();
  const menuItems: ItemType[] = [
    {
      key: 'switch',
      icon: <SwitchLanguage />,
    },
  ];
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
      t={t}
      menuItems={menuItems}
      sticky={sticky}
      headerRef={headerRef}
    />
  );
};
export default SignUpContainer;
