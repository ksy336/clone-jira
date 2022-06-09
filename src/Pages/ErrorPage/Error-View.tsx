import React from 'react';
import { Button } from 'antd';

const ErrorView = ({ handleClick, t }) => {
  return (
    <div className="error-content">
      <p>
        {t('page')}
        <Button onClick={handleClick}>{t('comeBack')}</Button>
      </p>
    </div>
  );
};
export default ErrorView;
