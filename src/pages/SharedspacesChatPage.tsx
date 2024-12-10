import React, { FC, Fragment, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import useSocket from 'Hooks/useSocket';
import SendIcon from '@mui/icons-material/Send';
import Chat from 'Components/chat/Chat';
import { TChatList, TChats } from 'Typings/types';
import DateSeparator from 'Components/chat/DateSeparator';
import dayjs from 'dayjs';
import useChats from 'Hooks/useChats';
import SkeletonChatList from 'Components/skeleton/SkeletonChatList';
import { createSharedspaceChats, getSharedspaceChats } from 'Api/sharedspacesApi';
import { useParams } from 'react-router-dom';
import useInput from 'Hooks/useInput';
import { useQueryClient } from '@tanstack/react-query';
import { GET_SHAREDSPACE_CHATS_KEY } from 'Lib/queryKeys';
import { throttle } from 'lodash';

const SharedspacesChatPage: FC = () => {
  const { url } = useParams();
  const qc = useQueryClient();
  const { socket } = useSocket();
  const { data: chatList, isLoading, offset, setOffset } = useChats();
  const [ chat, onChangeChat, setChat ] = useInput('');
  const scrollbarRef = useRef<HTMLUListElement>(null);

  const onScroll = throttle(() => {
    if (scrollbarRef.current) {
      const isTop = scrollbarRef.current.scrollHeight - 100 < scrollbarRef.current.clientHeight - scrollbarRef.current.scrollTop;
      if (isTop && chatList.hasMoreData) {
        scrollbarRef?.current?.scrollTo(0, -200);
        
        getSharedspaceChats(url, offset + 1)
          .then((res) => {
            qc.setQueryData([GET_SHAREDSPACE_CHATS_KEY], (prev?: TChats) => {
              if (prev) {
                return { chats: [ ...prev?.chats, ...res.chats ], hasMoreData: res?.hasMoreData };
              }
            });
            setOffset(prev => prev + 1);
          })
          .catch(() => {
            qc.invalidateQueries([GET_SHAREDSPACE_CHATS_KEY]);
          });
      }
    }
  }, 300);
    
  const listener = (data: TChatList) => {
    if (!data) return;

    qc.setQueryData([GET_SHAREDSPACE_CHATS_KEY], (prev?: TChats) => {
      if (!prev || !Array.isArray(prev.chats)) {
        return { chats: [ data ], hasMoreData: prev?.hasMoreData || false };
      }

      return { chats: [ data, ...prev?.chats ], hasMoreData: prev?.hasMoreData };
    });
  };

  useEffect(() => {
    socket?.on('publicChats', listener);

    return () => {
      socket?.off('publicChats', listener);
    };
  }, [socket, listener]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    createSharedspaceChats(url, chat.trim())
      .then(() => {
        setChat('');
        scrollbarRef?.current?.scrollTo(0, 0);
      });
  };
  
  return (
    <Block>
      <ChatDiv>
        <ChatList
          ref={scrollbarRef}
          onScroll={onScroll}>
          {!isLoading ?
            chatList?.chats.map((chat: TChatList, idx: number) => {

              const hasDateSeparator =
                (idx >= chatList.chats.length - 1 && !chatList.hasMoreData) ||
                (idx < chatList.chats.length - 1 && dayjs(chat.createdAt).format('DD') !== dayjs(chatList.chats[idx + 1].createdAt).format('DD'));

              if (hasDateSeparator) {
                return (
                  <Fragment key={chat.id}>
                    <Chat
                      key={chat.id}
                      chat={chat} />
                    <DateSeparator date={chat.createdAt} />
                  </Fragment>
                );
              }

              return <Chat
                key={chat.id}
                chat={chat} />;
            }) :
            <SkeletonChatList />
          }
        </ChatList>
        <SidePadding>
          <Form onSubmit={onSubmit}>
            <ChatInput
              value={chat}
              onChange={onChangeChat}
              placeholder='메시지 보내기' />
            <IconButton
              type='button'>
              <SendIcon fontSize='large' />
            </IconButton>
          </Form>
        </SidePadding>
      </ChatDiv>
    </Block>
  );
};

export default SharedspacesChatPage;

const Block = styled.div`
  display: flex;
  justify-content: center;
  width: 70%;
`;

const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 1000px;
  height: 100%;
  background-color: var(--dark-gray);
`;

const ChatList = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  height: 80%;
  padding: 0;
  padding-bottom: 30px;
  margin: 0;
  gap: 20px;
  overflow-y: scroll;
`;

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 15px;
  background-color: var(--light-gray);
  border-radius: 8px;
  gap: 10px;
`;

const ChatInput = styled.input`
  width: 100%;
  color: var(--white);
  font-size: 20px;
  background-color: var(--light-gray);
  border: none;
  outline: none;
`;

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  color: var(--white);
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const SidePadding = styled.div`
  padding: 0 20px;
`;