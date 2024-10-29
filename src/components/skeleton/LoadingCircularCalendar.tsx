import React, { FC } from 'react';
import styled from '@emotion/styled';
import { CircularProgress } from '@mui/material';

const LoadingCircularCalendar: FC = () => {
  return (
    <Block>
      <CircularProgress size={100}/>
    </Block>
  );
};

export default LoadingCircularCalendar;

const Block = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;