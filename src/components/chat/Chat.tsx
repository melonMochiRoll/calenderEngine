import React, { FC } from 'react';
import styled from '@emotion/styled';
import { ModalName, TChatList, TChats } from 'Typings/types';
import ProfileImage from 'Components/ProfileImage';
import dayjs from 'dayjs';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import useMenu from 'Hooks/useMenu';
import { muiMenuDefaultSx } from 'Lib/noticeConstants';
import { Menu, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { useParams } from 'react-router-dom';
import { deleteSharedspaceChat } from 'Api/sharedspacesApi';
import { useQueryClient } from '@tanstack/react-query';
import { GET_SHAREDSPACE_CHATS_KEY } from 'Lib/queryKeys';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { openModal } from 'Features/modalSlice';
import { setImagePath } from 'Features/imageViewerSlice';

interface ChatProps {
  chat: TChatList,
  idx: number,
};

const Chat: FC<ChatProps> = ({
  chat,
  idx,
}) => {
  const { url } = useParams();
  const qc = useQueryClient();
  const dispatch = useAppDispatch();
  const {
    anchorEl,
    open,
    onOpen,
    onClose,
  } = useMenu();

  const hoverMenuId = 'hoverMenu';

  const openImageModal = (path: string) => {
    dispatch(setImagePath(path));
    dispatch(openModal(ModalName.IMAGE_VIEWER));
  };

  const onDeleteChat = (url: string | undefined, chatId: number, idx: number) => {
    deleteSharedspaceChat(url, chatId)
      .then(() => {
        qc.setQueryData([GET_SHAREDSPACE_CHATS_KEY], (prev?: TChats) => {
          if (prev) {
            const head = prev.chats.slice(0, idx);
            const tail = prev.chats.slice(idx + 1, prev.chats.length);
            return { chats: [ ...head, ...tail ], hasMoreData: prev.hasMoreData };
          }
        });
      })
      .catch(() => {});
  };

  return (
    <Block hoverMenuId={hoverMenuId}>
      <Left>
        <ProfileImage
          profileImage={chat.Sender.profileImage}
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
          <Images>
            {
              chat.Images.map((image, idx) => {
                const server_URL = process.env.REACT_APP_SERVER_ORIGIN;

                if (chat.Images.length === 1) {
                  return <SingleImage
                    key={idx}
                    onClick={() => openImageModal(image.path)}
                    src={`${server_URL}/${image.path}`} />
                }

                return <MultipleImage
                  key={idx}
                  onClick={() => openImageModal(image.path)}
                  src={`${server_URL}/${image.path}`} />
              })
            }
          </Images>
        </Bottom>
      </Right>
      <HoverMenu id={hoverMenuId}>
        <Item onClick={onOpen}>
          <MoreIcon fontSize='large' />
        </Item>
      </HoverMenu>
      <Menu
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClick={onClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        sx={muiMenuDefaultSx}>
          <MenuItem
            onClick={() => onDeleteChat(url, chat.id, idx)}
            sx={{ gap: '5px', color: 'var(--red)' }}>
            <DeleteIcon />
            <span>메시지 삭제</span>
          </MenuItem>
      </Menu>
    </Block>
  );
};

export default Chat;

const Block = styled.li<{ hoverMenuId?: string }>`
  position: relative;
  display: flex;
  padding: 5px 20px;
  gap: 15px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);

    #${({hoverMenuId}) => hoverMenuId} {
      visibility: visible;
    }
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
  flex-direction: column;
  width: 90%;
  gap: 10px;
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

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;

const SingleImage = styled.img`
  height: 100%;
  max-height: 300px;
  border-radius: 12px;
  object-fit: contain;
  cursor: pointer;
`;

const MultipleImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 12px;
  object-fit: cover;
  cursor: pointer;
`;

const HoverMenu = styled.div`
  position: absolute;
  visibility: hidden;
  top: 0;
  right: 0;
  padding: 10px;
`;

const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--gray-3);
  border-radius: 12px;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;