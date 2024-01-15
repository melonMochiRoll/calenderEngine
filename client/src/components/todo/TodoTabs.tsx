import React, { FC } from 'react';
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
    '& .MuiTabs-flexContainer': {
      border: '1px solid #2f323b',
      padding: '4px',
      borderRadius: '10px',
    },
    '& .MuiButtonBase-root': {
      borderRadius: '10px',
      fontSize: '16px',
      fontWeight: 800,
      color: '#dedee3',
    },
    '& .MuiButtonBase-root.Mui-selected': {
      color: '#dedee3',
      backgroundColor: '#6c5dd3',
    },
    '& .MuiTabs-indicator': {
      backgroundColor: 'rgba(0, 0, 0, 0)',
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