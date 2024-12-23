import React, { FC } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from 'Hooks/reduxHooks';

const ImageViewer: FC = () => {
  const { path } = useAppSelector(state => state.imageViewer);
  const isDevelopment = process.env.NODE_ENV === 'development';
  const server_URL = isDevelopment ? process.env.REACT_APP_DEVELOPMENT_SERVER_ORIGIN : process.env.SERVER_ORIGIN;

  return (
    <Block>
      <Img
        src={`${server_URL}/${path}`}
        alt={path} />
    </Block>
  );
};

export default ImageViewer;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  background-color: var(--black);
  box-shadow: 1px 1px 10px 2px #000;
`;

const Img = styled.img`
  max-height: 600px;
  object-fit: contain;
  cursor: pointer;
`;