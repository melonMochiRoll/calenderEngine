import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ModalName, TImages } from 'Typings/types';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { setImagePath } from 'Features/imageViewerSlice';
import { openModal } from 'Features/modalSlice';

interface SingleImageProps {
  image: Pick<TImages, 'id' | 'path'>,
};

const SingleImage: FC<SingleImageProps> = ({
  image,
}) => {
  const dispatch = useAppDispatch();
  const isDevelopment = process.env.NODE_ENV === 'development';
  const server_URL = isDevelopment ? process.env.REACT_APP_DEVELOPMENT_SERVER_ORIGIN : process.env.SERVER_ORIGIN;

  const openImageModal = (e: React.MouseEvent<HTMLImageElement>) => {
    e.preventDefault();

    dispatch(setImagePath(image.path));
    dispatch(openModal(ModalName.IMAGE_VIEWER));
  };

  return (
    <Block>
      <Image
        onClick={openImageModal}
        src={`${server_URL}/${image.path}`}/>
      <Buttons></Buttons>
    </Block>
  );
};

export default SingleImage;

const Block = styled.div`
  position: relative;

  &:hover {
    div {
      display: block;
    }
  }
`;

const Image = styled.img`
  height: 100%;
  max-height: 300px;
  border-radius: 12px;
  object-fit: contain;
  cursor: pointer;
`;

const Buttons = styled.div`
  position: absolute;
  display: none;
  top: 0;
  right: 0;
  padding: 10px;
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  color: var(--gray-5);
  border: none;
  border-radius: 12px;
  background-color: var(--gray-8);
  cursor: pointer;

  &:hover {
    color: var(--white);
    background-color: var(--red);
  }
`;