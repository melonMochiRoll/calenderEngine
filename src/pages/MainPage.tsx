import React, { FC, useEffect } from 'react';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const MainPage: FC = () => {
  const navigate = useNavigate();
  const matches = useMatches();

  useEffect(() => {
    if (matches.length < 2) {
      navigate('/sharedspaces/subscribed');
    }
  }, []);
  
  return (
    <>
      <Outlet />
      <ToastContainer />
    </>
  );
};

export default MainPage;