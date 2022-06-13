import React from 'react';
import { Layout } from 'antd';
import Header from '../../components/Header';
import CardBoard from './MainComponents/CardBoard';
import './MainPage.scss';

const MainPageView = () => {
  return (
    <>
      <Layout>
        <Header />
        <CardBoard />
      </Layout>
    </>
  );
};
export default MainPageView;
