import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types/types';

const RequireAuth = ({ isAuth, children }) => {
  const auth = useSelector((state: RootState) => state.signIn.isAuth);
  return !auth ? <Navigate to="/" /> : children;
};
export { RequireAuth };
