import React, { FC } from 'react';
import styled from '@emotion/styled';
import { SxProps, Tab, Tabs } from '@mui/material';

interface TodoTabsProps {
  todoTab: any;
  onChangeTab: (e: React.SyntheticEvent, newValue: string) => void;
}

const TodoTabs: FC<TodoTabsProps> = ({
  todoTab,
  onChangeTab,
}) => {
  const tabsStyle: SxProps = {
    marginBottom: '20px',
    '& .MuiButtonBase-root': {
      fontSize: '18px',
      fontWeight: 800,
    },
    '& .MuiButtonBase-root.Mui-selected': {
      color: '#2fb765',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: '#2fb765',
    },
  }

  return (
    <Tabs
      value={todoTab}
      onChange={onChangeTab}
      variant="fullWidth"
      sx={tabsStyle}>
      <Tab value='all' label='전체' />
      <Tab value='completed' label='완료' />
      <Tab value='pending' label='진행중' />
    </Tabs>
  );
};

export default TodoTabs;