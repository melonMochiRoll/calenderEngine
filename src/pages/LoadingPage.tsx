import React, { FC } from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const LoadingPage: FC = () => {
  return (
    <Block>
      <LoadingBox>
        <CircularProgress size={100} />
      </LoadingBox>
    </Block>
  );
};

export default LoadingPage;

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--black);
`;

const LoadingBox = styled.div`
  padding-top: 50px;
`;