import React from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Layout, Menu, Spin } from 'antd';
const { Header: HeaderComponent } = Layout;
import {
  getNameData,
  getLoginData,
  getPasswordData,
  getConfirmPasswordData,
} from '../../../store/slices/signUp-slice';
import './Sign-up.scss';

const SignUpView = ({
  handleSubmit,
  handleFormSubmit,
  errors,
  register,
  dispatch,
  watch,
  error,
  isLoading,
  t,
  menuItems,
  sticky,
  headerRef,
}) => {
  return (
    <>
      <Layout>
        {isLoading && (
          <Spin tip={t('loading')}>
            <Alert message={t('wait')} description={t('waitDescription')} type="info" />
          </Spin>
        )}
        <HeaderComponent className={`layout-header ${sticky ? 'is-sticky' : ''}`} ref={headerRef}>
          <div style={{ zIndex: 1, width: '100%', margin: '0 auto' }}>
            <Menu
              style={{ background: 'transparent', display: 'flex', justifyContent: 'flex-end' }}
              items={menuItems}
            />
          </div>
        </HeaderComponent>
        <div className="form">
          <h3>{t('signUp')}</h3>
          <form className="form-profile" onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="form-content">
              <label htmlFor="name">{t('name')}</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder={t('enterName')}
                className={` ${errors?.firstName ? 'input error-input' : 'input'}`}
                {...register('firstName', {
                  onChange: (e) => {
                    dispatch(getNameData(e.target.value));
                  },
                  required: t('nameRequired'),
                  minLength: {
                    value: 3,
                    message: t('minimum3Symbols'),
                  },
                })}
              />
              {errors?.firstName && (
                <p className="text-invalid">{`${errors?.firstName.message}`}</p>
              )}
              <label htmlFor="login">{t('login')}</label>
              <input
                name="login"
                placeholder={t('enterLogin')}
                type="text"
                id="login"
                className={`${errors?.login ? 'input error-input' : 'input'}`}
                {...register('login', {
                  onChange: (e) => {
                    dispatch(getLoginData(e.target.value));
                  },
                  required: t('loginIsRequired'),
                  minLength: {
                    value: 4,
                    message: t('minimum4Symbols'),
                  },
                })}
              />
              {errors?.login && <p className="text-invalid">{`${errors?.login.message}`}</p>}
              <label htmlFor="password">{t('password')}</label>
              <input
                name="password"
                type="password"
                id="password"
                placeholder={t('passwordRequired')}
                className={`${errors?.password ? 'input error-input' : 'input'}`}
                {...register('password', {
                  onChange: (e) => {
                    dispatch(getPasswordData(e.target.value));
                  },
                  required: t('passwordIsRequired'),
                  minLength: {
                    value: 8,
                    message: t('minimum8Symbols'),
                  },
                })}
              />
              {errors?.password && <p className="text-invalid">{`${errors?.password.message}`}</p>}
              <label htmlFor="confirm-password">{t('confirmPass')}</label>
              <input
                name="confirm-password"
                placeholder={t('confirmPass')}
                type="password"
                id="confirm-password"
                className={`${errors?.confirmPassword ? 'input error-input' : 'input'}`}
                {...register('confirmPassword', {
                  onChange: (e) => {
                    dispatch(getConfirmPasswordData(e.target.value));
                  },
                  required: t('confirmPass'),
                  validate: (value: string) => {
                    if (watch('password') !== value) {
                      return t('passwordDoesnotMatch');
                    }
                  },
                })}
              />
              {errors?.confirmPassword && (
                <p className="text-invalid">{`${errors?.confirmPassword.message}`}</p>
              )}
              <Link to="/login">
                <div className="account-settings">
                  <p>{t('haveAnAccount')}</p>
                </div>
              </Link>
            </div>
            <div className="button-send">
              <Button type="primary" htmlType="submit">
                {t('submitAccount')}
              </Button>
            </div>
            {error && <p className="text-invalid">{`${error}`}</p>}
          </form>
        </div>
      </Layout>
    </>
  );
};
export default SignUpView;
