import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorView from './Error-View';
import { useTranslation } from 'react-i18next';

const ErrorContainer = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const handleClick = () => {
    navigate('/', { replace: true });
  };
  return <ErrorView handleClick={handleClick} t={t} />;
};

export default ErrorContainer;
