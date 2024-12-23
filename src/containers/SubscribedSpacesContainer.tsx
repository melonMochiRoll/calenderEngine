import React, { FC, useState } from 'react';
import styled from '@emotion/styled';
import AddIcon from '@mui/icons-material/Add';
import HelpIcon from '@mui/icons-material/HelpRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Menu, MenuItem, Tooltip } from '@mui/material';
import useMenu from 'Hooks/useMenu';
import { privateTooltip } from 'Lib/noticeConstants';
import { SubscribedspacesFilter, TSubscribedspacesFilter } from 'Typings/types';
import SubscribedSpacesResult from 'Components/SubscribedspacesResult';
import { createSharedspace } from 'Api/sharedspacesApi';
import useUser from 'Hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { setFilter } from 'Features/subscribedspacesFilterSlice';

const sortOptions: { text: string, filter: TSubscribedspacesFilter }[] = [
  {
    text: '모든 스페이스',
    filter: SubscribedspacesFilter.ALL,
  },
  {
    text: '소유한 스페이스',
    filter: SubscribedspacesFilter.OWNED,
  },
  {
    text: '소유하지 않은 스페이스',
    filter: SubscribedspacesFilter.UNOWNED,
  }
];

const SubscribedSpacesContainer: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userData, isLogin } = useUser();
  const [ option, setOption ] = useState<typeof sortOptions[0]>(sortOptions[0]);

  const {
    anchorEl,
    open,
    onOpen,
    onClose,
  } = useMenu();
  
  const onMenuClick = (value: typeof sortOptions[0]) => {
    if (option.filter === value.filter) {
      return;
    }
    
    setOption(value);
    dispatch(setFilter({ filter: value.filter }));
    onClose();
  };

  const onCreateSharedspace = async (UserId: number) => {
    const spaceUrl = await createSharedspace(UserId);

    navigate(`/sharedspaces/view/${spaceUrl}`);
  };

  return (
    <>
      <Top>
        <Title>스페이스 목록</Title>
        {
          isLogin &&
          <AddButton onClick={() => onCreateSharedspace(userData?.id)}>
            <AddIcon fontSize='large' sx={{ color: 'var(--blue)' }}/>
            <span>새 스페이스</span>
          </AddButton>
        }
      </Top>
      <Bottom>
        <Body>
        <ItemHead>
          <Tooltip title={privateTooltip} sx={{ fontSize: '24px' }} arrow>
            <ItemPrivate>
              <span>공개 여부</span>
              <HelpIcon fontSize='small' sx={{ color: 'var(--blue)' }} />
            </ItemPrivate>
          </Tooltip>
          <ItemTitle>스페이스 이름</ItemTitle>
          <ItemOwner
            onClick={onOpen}>
            {option.text}
            <ArrowDropDownIcon fontSize='large' />
          </ItemOwner>
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
            }}
            sx={{ marginTop: '10px' }}>
            {
              sortOptions.map((option: { text: string, filter: string }, idx: number) => {
                return (
                  <MenuItem
                    key={option.text}
                    onClick={() => onMenuClick(sortOptions[idx])}>
                    <span>{option.text}</span>
                  </MenuItem>
                );
              })
            }
          </Menu>
          <ItemMoreMenu />
        </ItemHead>
        <SubscribedSpacesResult />
        </Body>
      </Bottom>
    </>
  );
};

export default SubscribedSpacesContainer;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3% 20%;
  border-bottom: 1px solid var(--light-gray);
`;

const Title = styled.h1`
  font-size: 54px;
  color: var(--white);
  margin: 0;
`;

const AddButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  padding-left: 10px;
  padding-right: 15px;
  font-size: 18px;
  font-weight: 600;
  color: var(--white);
  border: 1px solid var(--white);
  border-radius: 25px;
  transition: all 0.3s;
  cursor: pointer;
  gap: 5px;

  &:hover {
    border-color: var(--blue);
  }
`;

const Bottom = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--light-gray);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 70vh;
  padding: 1% 20%;
`;

const ItemHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px 30px;
  color: #fff;
  font-weight: 600;
  border-bottom: 1px solid var(--light-gray);
`;

const ItemPrivate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  font-size: 20px;
  text-align: center;
  cursor: help;
  gap: 5px;
`;

const ItemTitle = styled.div`
  width: 45%;
  margin: 0;
  font-size: 28px;
`;

const ItemOwner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
`;

const ItemMoreMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5%;
  cursor: pointer;
`;