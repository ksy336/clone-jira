import React from 'react';
import './Footer.scss';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="link">
          {t('development')}:
          <a href="https://github.com/ksy336" target="_blank" rel="noreferrer">
            Kseniya Klimova
          </a>
        </div>
        <div>
          <p>2022</p>
        </div>
        <div className="logo">
          <a href="https://rs.school/index.html" target="_blank" rel="noreferrer">
            <img src={require('../../../public/rs_school.svg')} alt="logo" width="80px" />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
