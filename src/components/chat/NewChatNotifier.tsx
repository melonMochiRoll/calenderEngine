import React, { FC } from 'react';
import styled from '@emotion/styled';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownwardRounded';
import ProfileImage from 'Components/ProfileImage';

interface NewChatNotifierProps {
  chat: string,
  email?: string,
  profileImage?: string,
  onClick?: () => void,
};

const NewChatNotifier: FC<NewChatNotifierProps> = ({
  chat,
  email,
  profileImage,
  onClick,
}) => {
  return (
    <Block onClick={onClick}>
      <ProfileImage
        size='small'
        email={email} 
        profileImage={profileImage} />
      {chat.length > 15 ?
        <Span>{`${chat?.slice(0, 15)}...`}</Span> :
        <Span>{chat}</Span>
      }
      <ArrowDownwardIcon sx={{ color: 'var(--white)' }} />
    </Block>
  );
};

export default NewChatNotifier;

const Block = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 0;
  padding: 7px 10px;
  margin-top: 35px;
  border-radius: 10px;
  transform: translate(-50%, -50%);
  background-color: var(--gray-7);
  cursor: pointer;
  gap: 10px;
`;

const Span = styled.span`
  color: var(--white);
  text-align: center;
`;