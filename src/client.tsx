import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from 'Styles/GlobalStyle';
import MainRouter from 'Routes/MainRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux'
import { reduxStore } from './store';

const rootNode = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();

createRoot(rootNode).render(
  <React.StrictMode>
    <Provider store={reduxStore}>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={MainRouter} />
    </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);