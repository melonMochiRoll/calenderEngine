import React, { FC } from 'react';
import styled from '@emotion/styled';
import gravatar from 'gravatar';

interface ProfileImageProps {
  profileImage?: string,
  email?: string,
  size?: 'large',
};

const ProfileImage: FC<ProfileImageProps> = ({
  profileImage,
  email = 'unknown@gmail.com',
  size,
}) => {

  return (
    <Img
      size={size}
      alt='ProfileImg'
      src={profileImage ? profileImage : gravatar.url(email, { s: '25px', d: 'retro' })} />
  );
};

export default ProfileImage;

const Img = styled.img<{ size?: string }>`
  width: ${({ size }) => size === 'large' ? '50px' : '35px'};
  height: ${({ size }) => size === 'large' ? '50px' : '35px'};
  border-radius: 35px;
  object-fit: cover;
  cursor: pointer;
`;