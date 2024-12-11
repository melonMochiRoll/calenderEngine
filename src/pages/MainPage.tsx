import React, { FC, useEffect } from 'react';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import RenderModal from 'Components/modal/RenderModal';
import NestedModal from 'Components/modal/NestedModal';
import useUser from 'Hooks/useUser';

const MainPage: FC = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  const { isNotLogin } = useUser();

  useEffect(() => {
    if (isNotLogin) {
      navigate('/login');
    }
  }, [isNotLogin]);

  useEffect(() => {
    if (matches.length < 2) {
      navigate('/sharedspaces/subscribed');
    }
  }, [matches]);
  
  return (
    <>
      <Outlet />
      <ToastContainer />
      <RenderModal />
      <NestedModal />
    </>
  );
};

export default MainPage;