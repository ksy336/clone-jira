import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchStore, RootState } from '../../../types/types';
import LoginView from './Login-View';
import React, { useEffect } from 'react';
import { sendingSignInData } from '../../../store/actions/signIn-actions';
import { useForm } from 'react-hook-form';
import { LoginState } from './Login-Types';
import { useTranslation } from 'react-i18next';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import useSticky from '../../../hooks/useSticky';
import SwitchLanguage from '../../../components/Switch/Switch';

const LoginContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { sticky, headerRef } = useSticky();
  const { error } = useSelector((state: RootState) => state.signUp);
  const { login, password, isLoading, isAuth } = useSelector((state: RootState) => state.signIn);

  const menuItems: ItemType[] = [
    {
      key: 'switch',
      icon: <SwitchLanguage />,
    },
  ];

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
      t={t}
      menuItems={menuItems}
      sticky={sticky}
      headerRef={headerRef}
    />
  );
};
export default LoginContainer;
