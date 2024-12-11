import React, { FC } from 'react';
import styled from '@emotion/styled';
import gravatar from 'gravatar';

interface ProfileImageProps {
  profileImage?: string,
  email?: string,
  size?: 'large' | 'small',
};

const ProfileImage: FC<ProfileImageProps> = ({
  profileImage,
  email = 'unknown@gmail.com',
  size,
}) => {

  if (size === 'large') {
    return <Img
      size={'50px'}
      alt='ProfileImg'
      src={profileImage ? profileImage : gravatar.url(email, { s: '25px', d: 'retro' })} />;
  }

  if (size === 'small') {
    return <Img
      size={'25px'}
      alt='ProfileImg'
      src={profileImage ? profileImage : gravatar.url(email, { s: '25px', d: 'retro' })} />;
  }

  return (
    <Img
      size={'35px'}
      alt='ProfileImg'
      src={profileImage ? profileImage : gravatar.url(email, { s: '25px', d: 'retro' })} />
  );
};

export default ProfileImage;

const Img = styled.img<{ size?: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: 35px;
  object-fit: cover;
  cursor: pointer;
`;