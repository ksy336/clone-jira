import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Spin, Alert, Menu, Layout } from 'antd';
const { Header: HeaderComponent } = Layout;
import { getLoginForSignIn, getPasswordForSignIn } from '../../../store/slices/signin-slice';
import '../SignUpPage/Sign-up.scss';

const LoginView = ({
  dispatch,
  handleSubmit,
  handleFormSubmit,
  errors,
  register,
  error,
  isLoading,
  t,
  menuItems,
  sticky,
  headerRef,
}) => {
  return (
    <>
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
        <h3>{t('loginToAccount')}</h3>
        <form className="form-profile" onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-content">
            <label htmlFor="login">{t('login')}</label>
            <input
              name="login"
              placeholder={t('enterLogin')}
              type="text"
              className={`${errors?.login ? 'input error-input' : 'input'}`}
              {...register('login', {
                onChange: (e) => {
                  dispatch(getLoginForSignIn(e.target.value));
                },
                required: t('loginIsRequired'),
                minLength: {
                  value: 4,
                  message: t('minimumLoginRequired'),
                },
              })}
            />
            {errors?.login && <p className="text-invalid">{`${errors?.login?.message}`}</p>}
            <label htmlFor="password">{t('password')}</label>
            <input
              name="password"
              placeholder={t('passwordRequired')}
              type="password"
              id="password"
              className={`${errors?.password ? 'input error-input' : 'input'}`}
              {...register('password', {
                onChange: (e) => {
                  dispatch(getPasswordForSignIn(e.target.value));
                },
                required: t('passwordIsRequired'),
                minLength: {
                  value: 8,
                  message: t('minimum8Symbols'),
                },
              })}
            />
            {errors?.password && <p className="text-invalid">{`${errors?.password.message}`}</p>}
            {error && <p className="text-invalid">{`${error}`}</p>}
            <Link to="/sign-up">
              <div className="account-settings">
                <p>{t('dontHaveAnAccount')}</p>
              </div>
            </Link>
          </div>
          <div className="button-send">
            <Button type="primary" htmlType="submit">
              {t('submit')}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};
export default LoginView;
