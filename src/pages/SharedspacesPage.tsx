import React, { useEffect } from 'react';
import { Outlet, useMatches, useNavigate } from 'react-router-dom';

const SharedspacesPage = () => {
  const navigate = useNavigate();
  const matches = useMatches();
  
  useEffect(() => {
    if (matches.length < 2) {
      navigate('/sharedspaces/subscribed');
    }
  }, [matches]);
  
  return <Outlet />;
};

export default SharedspacesPage;