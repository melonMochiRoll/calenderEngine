import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from 'Pages/MainPage';
import LoginPage from 'Pages/LoginPage';

const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />
  }
]);

export default MainRouter;