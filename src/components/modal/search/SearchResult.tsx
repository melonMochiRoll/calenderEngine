import React, { FC } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '@mui/icons-material/SearchRounded';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import { CircularProgress } from '@mui/material';
import { useAppDispatch } from 'Hooks/reduxHooks';
import { closeModal } from 'Features/modalSlice';
import { setCalendarTime } from 'Features/calendarTimeSlice';
import { setTodoTime } from 'Features/todoTimeSlice';
import { TQueryStatus, TTodo } from 'Typings/types';

interface SearchResultProps {
  query: string,
  todos: TTodo[],
  status: TQueryStatus,
}; 

const SearchResult: FC<SearchResultProps> = ({
  query,
  todos,
  status,
}) => {
  const dispatch = useAppDispatch();

  if (!query) {
    return (
      <Main>
        <SearchIcon sx={{ color: 'var(--light-gray)', fontSize: '250px' }} />
      </Main>
    );
  }

  if (status === 'loading') {
    return (
      <Main>
        <CircularProgress size={70} />
      </Main>
    );
  }

  const onClickTodo = (date: string) => {
    dispatch(setCalendarTime(date));
    dispatch(setTodoTime(date));
    dispatch(closeModal());
  };

  return (
    <Main>
      {
        todos?.length ?
        <Ul>
          {
            todos.map((ele: TTodo) => {
              const { id, contents, date } = ele;
              const strDate = String(date);

              return (
                <Li
                  key={id}
                  onClick={() => onClickTodo(strDate)}>
                  <Date>{strDate}</Date>
                  <WhiteSpan>{contents}</WhiteSpan>
                </Li>
              );
            })
          }
        </Ul> :
        <>
          <ErrorIcon sx={ErrorInlineStyle} />
          <WhiteSpan>{`"${query}" 에 대한 검색 결과가 없습니다.`}</WhiteSpan>
        </>
      }
    </Main>
  );
};

export default SearchResult;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 80%;
`;

const Ul = styled.ul`
  color: #000;
  width: 100%;
  height: 100%;
  padding: 10px;
  margin: 0;
  list-style: none;
  overflow: auto;
`;

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
  color: var(--white);
  border: 1px solid var(--light-gray);
  border-radius: 15px;
  cursor: pointer;
  user-select: none;
  transition: all 0.1s linear;

  &:hover {
    border-color: var(--white);
  }
`;

const Date = styled.div`
  display: flex;
  align-items: center;
  color: #0d47a1;
  font-size: 14px;
  font-weight: 600;
  border-radius: 25px;
  padding: 8px 15px;
  background-color: #d2f7ff;
`;

const ErrorInlineStyle = {
  color: 'var(--white)',
  fontSize: '64px',
  paddingBottom: '15px',
};

const WhiteSpan = styled.span`
  color: var(--white);
  font-size: 20px;
  font-weight: 600;
`;