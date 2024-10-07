import React, { FC } from 'react';
import styled from '@emotion/styled';
import { TSubscribedspaces } from 'Typings/types';
import LockIcon from '@mui/icons-material/Lock';
import UnlockIcon from '@mui/icons-material/LockOpen';
import { CircularProgress } from '@mui/material';
import { emptyspaces } from 'Lib/noticeConstants';
import { useNavigate } from 'react-router-dom';

interface TSubscribedspacesResultProps {
  subscribedspaceData: TSubscribedspaces[],
  isLoading: boolean,
};

const SubscribedspacesResult: FC<TSubscribedspacesResultProps> = ({
  subscribedspaceData,
  isLoading,
}) => {
  const navigate = useNavigate();

  if (isLoading) {
    return <CircularProgress size={100} sx={{ marginTop: '100px' }}/>;
  }

  if (!subscribedspaceData || !subscribedspaceData.length) {
    return (
      <EmptyResult>
        <h2>{emptyspaces}</h2>
      </EmptyResult>
    );
  }
  
  return (
    <>
      {
        subscribedspaceData?.map((e: TSubscribedspaces) => {
          const { name, url, private: privateBool, Owner } = e.Sharedspace;
          
          return (
            <Item
              key={name}
              onClick={() => navigate(`/sharedspaces/view/${url}`)}>
              <ItemPrivate>{privateBool ? <LockIcon /> : <UnlockIcon />}</ItemPrivate>
              <ItemTitle>{name}</ItemTitle>
              <ItemOwner>{Owner.email}</ItemOwner>
            </Item>
          );
        })
      }
    </>
  );
};

export default SubscribedspacesResult;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  color: var(--white);
  border-bottom: 1px solid var(--light-gray);
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: var(--light-gray);
  }
`;

const ItemPrivate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: 20px;
  text-align: center;
  gap: 5px;
`;

const ItemTitle = styled.div`
  width: 45%;
  margin: 0;
  font-size: 28px;
`;

const ItemOwner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
`;

const EmptyResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid var(--light-gray);

  h2 {
    color: var(--white);
    font-size: 28px;
    font-weight: 600;
    margin: 100px 0;
  }
`;