import React from 'react';
import { Alert } from 'reactstrap';

const LogoutAlert = ({ isOpen, message }) => {
  return (
    <Alert color="info" isOpen={isOpen}>
      {message}
    </Alert>
  );
};

export default LogoutAlert;
