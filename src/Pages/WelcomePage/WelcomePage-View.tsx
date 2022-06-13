import React from 'react';
import type { RadioChangeEvent } from 'antd';
import { Carousel, Radio } from 'antd';
import type { DotPosition } from 'antd/lib/carousel';
import { Button, Layout } from 'antd';
const {Content} = Layout;
import Footer from '../../components/Footer/index';
import { Link } from 'react-router-dom';
import './WelcomePage.scss';

const contentStyle: React.CSSProperties = {
  height: '260px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const WelcomeView = ({ isLogged, signOutClick, t }) => {
  const onChange = (currentSlide: number) => {
  };

  return (
    <Layout>
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
                    <Button type="primary">{t('signIn')}</Button>
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
      <Content className="main-content">
        <Carousel afterChange={onChange}>
          <div>
            <h3 style={contentStyle}>{t('welcome')}</h3>
          </div>
          <div>
            <h3 style={contentStyle}>{t('welcome')}</h3>
          </div>
          <div>
            <h3 style={contentStyle}>{t('welcome')}</h3>
          </div>
        </Carousel>
      </Content>
        <Footer />
    </Layout>
  );
};
export default WelcomeView;
