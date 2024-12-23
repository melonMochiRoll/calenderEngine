import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

const MainPage = React.lazy(() => import('../pages/MainPage'));
const SubscribedSpacesPage = React.lazy(() => import('../pages/SubscribedSpacesPage'));
const LoginPage = React.lazy(() => import('../pages/LoginPage'));
const JoinPage = React.lazy(() => import('../pages/JoinPage'));
const SharedspacesPage = React.lazy(() => import('../pages/SharedspacesPage'));
const SharedspacesViewPage = React.lazy(() => import('../pages/SharedspacesViewPage'));
const SharedspacesChatPage = React.lazy(() => import('../pages/SharedspacesChatPage'));
const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const InternalServerErrorPage = React.lazy(() => import('../pages/InternalServerErrorPage'));
const ForbiddenPage = React.lazy(() => import('../pages/ForbiddenPage'));

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