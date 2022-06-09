import React from 'react';
import { Button } from 'antd';
import Footer from '../../components/Footer/index';
import { Link } from 'react-router-dom';
import './WelcomePage.scss';

const WelcomeView = ({ isLogged, signOutClick, t }) => {
  return (
    <div className="wrapper">
      <header className="welcome-header">
        <div className="welcome-wrapper">
          {isLogged ? (
            <Link to="/main">
              <Button type="primary" className="btn-go">
                {t('mainPage')}
              </Button>
              <Button type="primary" onClick={signOutClick}>
                {t('signOut')}
              </Button>
            </Link>
          ) : (
            <div className="welcome-wrapper">
              <div className="button__log">
                <Link to="/login">
                  <Button type="primary">{t("signIn")}</Button>
                </Link>
              </div>
              <div className="button__sign">
                <Link to="/sign-up">
                  <Button type="primary">{t('signUpTo')}</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
      <div className="welcome">
        <h1 className="welcome-text">{t('welcome')}</h1>
      </div>
      <Footer />
    </div>
  );
};
export default WelcomeView;
