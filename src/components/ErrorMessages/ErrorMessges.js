import React from 'react';
import './ErrorMessage.css';

const ErrorMessages = ({ errors }) => {
  if (errors.length === 0) {
    return null;
  }
  return errors.map(error => (
    <li className='error' key={error}>{error}</li>
  ));
};

export default ErrorMessages;
