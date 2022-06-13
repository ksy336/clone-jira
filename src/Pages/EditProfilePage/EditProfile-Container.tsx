import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from 'typescript-cookie';
import { editProfileData } from '../../store/actions/edit-actions';
import { dispatchStore, RootState } from '../../types/types';
import { deleteUserProfile } from '../../store/actions/deleteUser-actions';
import EditProfileView from './EditProfile-View';
import { deleteUser } from '../../store/slices/deleteUser-slice';
import { getAuth } from '../../store/slices/signin-slice';
import { getUserData } from '../../store/slices/signUp-slice';
import { useTranslation } from 'react-i18next';

const EditProfileContainer = () => {
  const [showModal, setShowModal] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = getCookie('id');
  const { name, login, password } = useSelector((state: RootState) => state.edit);

  const onFinish = () => {
    const userData = {
      name,
      login,
      password,
    };
    dispatchStore(editProfileData(userData, userId));
  };
  const deleteUserModalHandler = () => {
    dispatchStore(deleteUserProfile(userId));
    dispatch(deleteUser(userId));
    dispatch(getUserData({}));
    dispatch(getAuth(false));
    navigate('/');
  };

  const deleteClickHandler = () => {
    setShowModal(true);
  };

  const modalHandler = () => {
    setShowModal(false);
  };

  return (
    <EditProfileView
      onFinish={onFinish}
      dispatch={dispatch}
      deleteClickHandler={deleteClickHandler}
      modalHandler={modalHandler}
      showModal={showModal}
      deleteUserModalHandler={deleteUserModalHandler}
      t={t}
    />
  );
};

export default EditProfileContainer;
