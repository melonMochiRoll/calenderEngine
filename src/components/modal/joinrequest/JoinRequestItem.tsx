import React, { FC } from 'react';
import styled from '@emotion/styled';
import gravatar from 'gravatar';
import useMenu from 'Hooks/useMenu';
import { Divider, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { RoleDictionary, SharedspaceMembersRoles, TJoinRequest } from 'Typings/types';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { GET_JOINREQUEST_KEY, GET_SHAREDSPACE_KEY } from 'Lib/queryKeys';
import { deleteJoinRequest, resolveJoinRequest } from 'Api/joinrequestApi';

const updateRoleOption = [
  {
    text: RoleDictionary.MEMBER,
    roleName: SharedspaceMembersRoles.MEMBER,
  },
  {
    text: RoleDictionary.VIEWER,
    roleName: SharedspaceMembersRoles.VIEWER,
  },
];

const accessOption = [
  {
    text: '거절',
  }
];

interface JoinRequestItemProps {
  request: TJoinRequest,
};

const JoinRequestItem: FC<JoinRequestItemProps> = ({
  request,
}) => {
  const qc = useQueryClient();
  const { url = '' } = useParams();
  const { id, message, Requestor } = request;

  const {
    anchorEl,
    open,
    onOpen,
    onClose,
  } = useMenu();

  const onOpenWithEvent = (e: any) => {
    e.stopPropagation();
    onOpen(e);
  };

  const onRolesUpdateMenuClick = (
    url: string,
    id: number,
    option: typeof updateRoleOption[0],
  ) => {
    resolveJoinRequest(url, id, option.roleName)
      .then(async () => {
        await qc.refetchQueries([GET_JOINREQUEST_KEY]);
        await qc.refetchQueries([GET_SHAREDSPACE_KEY]);
      });
    
    onClose();
  };

  const onDeleteMenuClick = (
    url: string,
    id: number,
  ) => {
    deleteJoinRequest(url, id)
      .then(async () => {
        await qc.refetchQueries([GET_JOINREQUEST_KEY]);
        await qc.refetchQueries([GET_SHAREDSPACE_KEY]);
      });

    onClose();
  };
  
  return (
    <Item>
      <Left>
        <ProfileImg key={Requestor.email} src={gravatar.url(Requestor.email, { s: '35px', d: 'retro' })} />
      </Left>
      <Center>
        <Email>{Requestor.email}</Email>
        <Message>{message}</Message>
      </Center>
      <Right onClick={onOpenWithEvent}>
        <CurrentOption>메뉴</CurrentOption>
        <ArrowDropDownIcon fontSize='large' />
      </Right>
      <Menu
        aria-labelledby='demo-positioned-button'
        anchorEl={anchorEl}
        open={open}
        onClick={onClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}>
        {
          updateRoleOption.map((option: typeof updateRoleOption[0], idx: number) => {
            return (
              <MenuItem
                key={option.text}
                onClick={(e) => {
                  e.stopPropagation();
                  onRolesUpdateMenuClick(url, id, updateRoleOption[idx]);
                }}>
                <span>{option.text}</span>
              </MenuItem>
            );
          })
        }
        <Divider />
        {
          accessOption.map((option: typeof accessOption[0]) => {
            return (
              <MenuItem
                key={option.text}
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteMenuClick(url, id);
                }}>
                <span>{option.text}</span>
              </MenuItem>
            );
          })
        }
      </Menu>
    </Item>
  );
};

export default JoinRequestItem;

const Item = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  color: var(--white);
  list-style: none;
  gap: 15px;
  padding: 10px 15px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 35px;
  cursor: pointer;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
`;

const Email = styled.span`
  font-size: 20px;
`;

const Message = styled.span`
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CurrentOption = styled.span`
  font-size: 22px;
`;