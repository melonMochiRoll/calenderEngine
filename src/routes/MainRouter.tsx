import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from 'Pages/LoginPage';
import JoinPage from 'Pages/JoinPage';
import NotFoundPage from 'Pages/NotFoundPage';
import SubscribedSpacesPage from 'Pages/SubscribedSpacesPage';
import MainPage from 'Pages/MainPage';
import SharedspacesViewPage from 'Pages/SharedspacesViewPage';
import SharedspacesPage from 'Pages/SharedspacesPage';

const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/join',
    element: <JoinPage />,
  },
  {
    path: '/sharedspaces',
    element: <SharedspacesPage />,
    children: [
      {
        path: 'subscribed',
        element: <SubscribedSpacesPage />,
      },
      {
        path: 'view/:url',
        element: <SharedspacesViewPage />
      },
    ],
  },
  {
    path: 'not-found',
    element: <NotFoundPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  }
]);

export default MainRouter;