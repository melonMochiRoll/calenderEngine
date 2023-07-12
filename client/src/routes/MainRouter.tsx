import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainPage from 'Pages/MainPage';

const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
]);

export default MainRouter;