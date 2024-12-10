import React, { FC } from 'react';
import styled from '@emotion/styled';
import { TChatList } from 'Typings/types';
import ProfileImage from 'Components/ProfileImage';
import dayjs from 'dayjs';

interface ChatProps {
  chat: TChatList,
};

const Chat: FC<ChatProps> = ({
  chat,
}) => {
  return (
    <Block>
      <Left>
        <ProfileImage
          email={chat.Sender.email}
          size={'large'} />
      </Left>
      <Right>
        <Top>
          <ProfileName>{chat.Sender.email}</ProfileName>
          <Timestamp>{dayjs(chat.createdAt).format('A hh:mm')}</Timestamp>
        </Top>
        <Bottom>
          <Content>{chat.content}</Content>
        </Bottom>
      </Right>
    </Block>
  );
};

export default Chat;

const Block = styled.li`
  display: flex;
  padding: 5px 20px;
  gap: 15px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Left = styled.div`
  display: flex;
  justify-content: center;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;
`;

const Top = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  gap: 10px;
`;

const Bottom = styled.div`
  display: flex;
  width: 90%;
`;

const ProfileName = styled.span`
  color: var(--white);
  font-size: 20px;
  font-weight: 600;
`;

const Timestamp = styled.span`
  color: var(--gray-5);
  font-size: 16px;
`;

const Content = styled.p`
  width: 100%;
  color: var(--white);
  font-size: 18px;
  font-weight: 500;
  padding: 0;
  margin: 0;
  white-space: normal;
  word-wrap: break-word;
  word-break: normal;
  overflow-y: auto;
`;