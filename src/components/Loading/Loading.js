import React from 'react';
import loadingImage from '../../logo.svg';

export const Loading = () => {
  return (
    <div className="Loading">
      <img src={loadingImage} className="Loading-logo" alt="loading" />
    </div>
  )
}
