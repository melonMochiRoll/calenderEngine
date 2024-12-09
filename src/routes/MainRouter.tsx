import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LoginPage from 'Pages/LoginPage';
import JoinPage from 'Pages/JoinPage';
import NotFoundPage from 'Pages/NotFoundPage';
import SubscribedSpacesPage from 'Pages/SubscribedSpacesPage';
import MainPage from 'Pages/MainPage';
import SharedspacesViewPage from 'Pages/SharedspacesViewPage';
import SharedspacesPage from 'Pages/SharedspacesPage';
import InternalServerErrorPage from 'Pages/InternalServerErrorPage';
import ForbiddenPage from 'Pages/ForbiddenPage';
import SharedspacesChatPage from 'Pages/SharedspacesChatPage';

const MainRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/join',
        element: <JoinPage />,
      },
      {
        path: '/sharedspaces/subscribed',
        element: <SubscribedSpacesPage />,
      },
      {
        path: '/sharedspaces',
        element: <SharedspacesPage />,
        children: [
          {
            path: 'view/:url',
            element: <SharedspacesViewPage />
          },
          {
            path: 'chat/:url',
            element: <SharedspacesChatPage />
          },
        ],
      },
      {
        path: 'forbidden',
        element: <ForbiddenPage />,
      },
      {
        path: 'not-found',
        element: <NotFoundPage />,
      },
      {
        path: 'internal',
        element: <InternalServerErrorPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      }
    ],
  },
]);

export default MainRouter;