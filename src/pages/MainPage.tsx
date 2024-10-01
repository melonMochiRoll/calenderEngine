import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/sharedspaces/subscribed');
  }, []);
  
  return <></>;
};

export default MainPage;