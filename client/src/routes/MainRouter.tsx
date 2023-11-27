import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from 'Pages/MainPage';
import LoginPage from 'Pages/LoginPage';
import JoinPage from 'Pages/JoinPage';

const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/join',
    element: <JoinPage />
  },
]);

export default MainRouter;