import React, { FC } from 'react';
import styled from '@emotion/styled';
import gravatar from 'gravatar';
import useMenu from 'Hooks/useMenu';
import { Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { RoleDictionary, SharedspaceMembersRoles, TSearchUsers, TSharedspaceMetaData } from 'Typings/types';
import { GET_SHAREDSPACE_KEY } from 'Lib/queryKeys';
import { useQueryClient } from '@tanstack/react-query';
import { createSharedspaceMembers } from 'Api/sharedspacesApi';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { clearQuery } from 'Features/searchUsersSlice';

const createRoleOption = [
  {
    text: RoleDictionary.MEMBER,
    role: SharedspaceMembersRoles.MEMBER,
  },
  {
    text: RoleDictionary.VIEWER,
    role: SharedspaceMembersRoles.VIEWER,
  },
];

interface UserItemProps {
  spaceData: TSharedspaceMetaData,
  searchUserData: TSearchUsers,
};

const UserItem: FC<UserItemProps> = ({
  spaceData,
  searchUserData,
}) => {
  const qc = useQueryClient();
  const dispatch = useAppDispatch();
  const { url = '' } = useParams();
  const { id: UserId, email, Sharedspacemembers } = searchUserData;

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

  const onCreateRoleMenuClick = async (e: any, option: typeof createRoleOption[0]) => {
    e.stopPropagation();

    dispatch(clearQuery());
    await createSharedspaceMembers(url, UserId, option.role);
    await qc.refetchQueries([GET_SHAREDSPACE_KEY]);
    onClose();
  };
  
  return (
    <Item>
      <Left>
        <ProfileImg key={email} src={gravatar.url(email, { s: '35px', d: 'retro' })} />
      </Left>
      <Center>
        <Email>{email}</Email>
      </Center>
      {
        Sharedspacemembers.find((ele: any) => ele.SharedspaceId === spaceData.id) ?
        <DisableRight>
          <CurrentOption>이미 속한 유저</CurrentOption>
        </DisableRight>
        :
        <Right onClick={onOpenWithEvent}>
          <CurrentOption>초대</CurrentOption>
          <ArrowDropDownIcon fontSize='large' />
        </Right>
      }
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
          createRoleOption.map((option: typeof createRoleOption[0], idx: number) => {
            return (
              <MenuItem
                key={option.text}
                onClick={(e) => onCreateRoleMenuClick(e, createRoleOption[idx])}>
                <span>{option.text}</span>
              </MenuItem>
            );
          })
        }
      </Menu>
    </Item>
  );
};

export default UserItem;

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

const DisableRight = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  color: #828282;
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
  font-size: 20px;
`;