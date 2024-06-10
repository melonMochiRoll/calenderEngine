import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { GlobalStyle } from 'Styles/GlobalStyle';
import MainRouter from 'Routes/MainRouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootNode = document.getElementById('root') as HTMLElement;
const queryClient = new QueryClient();

createRoot(rootNode).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <RouterProvider router={MainRouter} />
    </QueryClientProvider>
  </React.StrictMode>
);