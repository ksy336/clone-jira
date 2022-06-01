import React from 'react';
import { Button } from 'antd';

const ErrorView = ({ handleClick }) => {
  return (
    <div className="error-content">
      <p>
        Page is not found
        <Button onClick={handleClick}>Come back to welcome page</Button>
      </p>
    </div>
  );
};
export default ErrorView;
